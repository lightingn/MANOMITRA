// supabase/functions/analyze-input/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2';
import { GoogleGenerativeAI } from 'npm:@google/generative-ai@0.2.1';

// This function converts a file URL from Supabase Storage into the Base64 format Gemini needs.
async function urlToGenerativePart(url: string, mimeType: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch media: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

Deno.serve(async (req) => {
  try {
    const { submissionId, mimeType } = await req.json();

    const serviceRoleClient = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 1. Fetch the submission details from your database table
    const { data: submission, error: fetchError } = await serviceRoleClient
      .from('submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError) throw fetchError;
    
    const { parent_concerns_text, media_url } = submission;

    // 2. Initialize the Gemini AI model with your secret key
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY')!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // 3. Prepare the prompt and any media for Gemini
    const prompt = `
      You are a helpful assistant for parents concerned about their child's neurological development. 
      Analyze the following information and provide a gentle, reassuring, and clear summary. 
      DO NOT PROVIDE A DIAGNOSIS. 
      Instead, identify potential areas of concern based on the input, suggest if the behavior could be normal, 
      and recommend whether they should consider speaking to a pediatrician.
      
      Parent's Concern: "${parent_concerns_text}"
    `;
    
    let analysisResultText;
    
    if (media_url && mimeType) {
      const imagePart = await urlToGenerativePart(media_url, mimeType);
      const result = await model.generateContent([prompt, imagePart]);
      analysisResultText = result.response.text();
    } else {
      const result = await model.generateContent(prompt);
      analysisResultText = result.response.text();
    }
    
    // 4. Update the original submission record with the AI's analysis
    const { error: updateError } = await serviceRoleClient
      .from('submissions')
      .update({
        analysis_result: { summary: analysisResultText },
        status: 'completed',
      })
      .eq('id', submissionId);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ message: 'Analysis complete!' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // If anything goes wrong, update the status to 'failed'
    const { submissionId } = await req.json();
    if(submissionId) {
        const serviceRoleClient = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        await serviceRoleClient.from('submissions').update({ status: 'failed' }).eq('id', submissionId);
    }
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});