// src/components/KnowYourChild.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Upload, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { supabase } from '../supabaseClient';

// --- FULL DATA STRUCTURE WITH RED FLAG LOGIC ---
const questionnaireData = [
  {
    title: "0-6 Months",
    sections: [
      { category: "Motor Milestones", questions: [
        { text: "Does your baby hold up their head steadily during tummy time (by ~3-4 months)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "By 6 months, does your baby roll over (tummy to back and back to tummy)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "How well does your baby reach and grasp toys?", type: 'rating', labels: ["Rarely Reaches", "Grabs Easily"], redFlagCondition: { type: 'lessThan', value: 3 } },
        { text: "When supported under the arms, how floppy vs. stiff does your baby feel?", type: 'rating', labels: ["Very Floppy", "Very Stiff"], redFlagCondition: { type: 'extreme', values: [1, 5] } },
      ]},
      { category: "Speech/Language Milestones", questions: [
        { text: "Does your baby coo, make babbling sounds (like 'ooh', 'aah', 'baba')?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Does your baby laugh, squeal or respond to your voice?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "How often does your baby smile or laugh when you play together?", type: 'rating', labels: ["Never", "Very Often"], redFlagCondition: { type: 'lessThan', value: 2 } },
      ]},
      { category: "Cognitive (Learning) Milestones", questions: [
        { text: "Does your baby follow moving objects with their eyes, or turn head toward sounds?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Does your baby bring hands to mouth and explore with fingers/mouth?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Does your baby search for a toy dropped partly out of sight?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
      ]},
      { category: "Social/Emotional Milestones", questions: [
        { text: "Does your baby smile at familiar people (social smile)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "How often does your baby seem delighted or engaged when you talk or play?", type: 'rating', labels: ["Rarely", "Very Often"], redFlagCondition: { type: 'lessThan', value: 2 } },
        { text: "Does your baby show any stranger anxiety or wariness by 6 months?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
      ]},
      { category: "Observable Atypical Behaviors", questions: [
        { text: "Does your baby not respond to loud noises or their name?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Are your baby's arm and leg movements asymmetrical (one side weaker or less used)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Does your baby seem very stiff or very floppy overall?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Do you ever see unusual movements or blank staring episodes?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
      ]},
    ],
  },
  {
    title: "6-12 Months",
    sections: [
        { category: "Motor Milestones", questions: [
        { text: "Can your baby sit without support for at least a minute?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Does your baby push up on arms (hands and knees) or crawl by 12 months?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Can your baby transfer toys hand-to-hand smoothly?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "How steady is your baby when sitting or pulling to stand?", type: 'rating', labels: ["Very Wobbly", "Very Stable"], redFlagCondition: { type: 'lessThan', value: 3 } },
      ]},
      { category: "Speech/Language Milestones", questions: [
        { text: "Does your baby babble with consonants (like 'mamama', 'bababa')?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "By 12 months, does your baby say 'mama' and 'dada' (specifically for parents)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Does your baby respond when you say their name or simple words?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
      ]},
       { category: "Observable Atypical Behaviors", questions: [
        { text: "Does your baby not babble or make any gestures by 12 months?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Does your baby not respond to their name or to simple requests?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Are movements noticeably one-sided or delayed (not crawling/sitting)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Any staring spells, sudden jerks, or episodes of 'blanking out'?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
      ]},
    ],
  },
  {
    title: "1-2 Years",
    sections: [
        { category: "Motor Milestones", questions: [
        { text: "By 18 months, is your child walking independently?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Can your child stoop to pick up a toy from the floor without falling over?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "How would you rate your child's running or climbing skills?", type: 'rating', labels: ["Barely Walking", "Runs Easily"], redFlagCondition: { type: 'lessThan', value: 3 } },
      ]},
      { category: "Speech/Language Milestones", questions: [
        { text: "Does your child say at least 5-10 words (besides 'mama/dada')?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "By 2 years, does your child combine words into simple phrases (e.g. 'more milk')?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
        { text: "Does your child follow simple instructions ('sit down', 'give me the ball')?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'No' } },
      ]},
      { category: "Observable Atypical Behaviors", questions: [
        { text: "By 2 years, does your child have fewer than 5 words?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Does your child not point or wave at all?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Is your child still toe-walking all the time (not just occasionally)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
        { text: "Have you noticed any loss of skills (e.g. used words and then stopped)?", type: 'yes/no', redFlagCondition: { type: 'exact', value: 'Yes' } },
      ]},
    ],
  },
];

// Helper function to convert file to a format Gemini can understand
const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

const KnowYourChild = () => {
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<any | null>(null);
  const [questionnaire, setQuestionnaire] = useState<Record<string, Record<string, Record<number, string>>>>({});
  
  // States for the 'Share & Analyze' tab
  const [shareConcerns, setShareConcerns] = useState('');
  const [shareFile, setShareFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // General state for loading and results
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any | null>(null);

  const handleQuestionResponse = (ageTitle: string, category: string, questionIndex: number, response: string) => {
    setQuestionnaire(prev => ({ ...prev, [ageTitle]: { ...prev[ageTitle], [category]: { ...prev[ageTitle]?.[category], [questionIndex]: response } } }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setShareFile(selectedFile);
        setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  // --- NEW: Local analysis for the questionnaire tab ---
  const handleQuestionnaireSubmit = () => {
    if (!selectedAgeGroup) {
      setMessage("Please select an age group first.");
      return;
    }

    setLoading(true);
    setMessage('Analyzing your responses...');
    setAnalysis(null);

    let redFlagCount = 0;
    const flaggedConcerns: string[] = [];
    const userAnswers = questionnaire[selectedAgeGroup.title] || {};

    selectedAgeGroup.sections.forEach((section: any) => {
      section.questions.forEach((question: any, qIndex: number) => {
        const answer = userAnswers[section.category]?.[qIndex];
        if (!answer) return; // Skip unanswered

        const condition = question.redFlagCondition;
        if (!condition) return;

        let isFlagged = false;
        const answerNum = parseInt(answer, 10);

        if (condition.type === 'exact' && answer === condition.value) isFlagged = true;
        if (condition.type === 'lessThan' && !isNaN(answerNum) && answerNum < condition.value) isFlagged = true;
        if (condition.type === 'extreme' && !isNaN(answerNum) && condition.values.includes(answerNum)) isFlagged = true;
        
        if (isFlagged) {
          redFlagCount++;
          flaggedConcerns.push(question.text);
        }
      });
    });

    // Generate predetermined message based on the score
    setTimeout(() => { // Simulate processing time
      if (redFlagCount === 0) {
        setAnalysis({
          summary: "Thank you for completing the questionnaire.\n\nBased on your responses, your child appears to be meeting their developmental milestones for this age group. Every child develops at their own unique pace, and it's wonderful that you are so attentive to their progress. Continue to observe and encourage their growth, and remember to bring up any questions you may have at your next routine check-up with your pediatrician."
        });
      } else if (redFlagCount <= 2) {
        setAnalysis({
          summary: `Thank you for sharing your observations.\n\nIt's common for children to develop at different rates in different areas. Based on your answers, most of your child's milestones appear on track. A few points you noted might be worth mentioning to your pediatrician at your next visit, simply to get their expert perspective. Early conversations are always helpful.\n\nThe areas you might want to discuss are:\n- ${flaggedConcerns.join('\n- ')}`
        });
      } else {
        setAnalysis({
          summary: `Thank you for taking the time to complete this detailed questionnaire.\n\nYour thoughtful responses have highlighted a few areas where it would be beneficial to get a professional opinion. We recommend scheduling a conversation with your pediatrician to discuss these points in more detail. They can provide a comprehensive evaluation and the best guidance for supporting your child's unique developmental journey.\n\nThe areas you might want to discuss are:\n- ${flaggedConcerns.join('\n- ')}`
        });
      }
      setMessage('Analysis complete!');
      setLoading(false);
    }, 1000);
  };

  // --- NEW: Gemini analysis is now only for the 'Share & Analyze' tab ---
  const processGeminiAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareConcerns.trim()) {
      setMessage("Please describe your concerns to get an analysis.");
      return;
    }
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setMessage("Error: Gemini API Key is not configured.");
      return;
    }

    setLoading(true);
    setMessage('Connecting to Gemini AI...');
    setAnalysis(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const promptParts: (string | Part)[] = [
        `You are a helpful, gentle, and reassuring assistant for parents concerned about their child's development. Analyze the parent's written concerns and any provided image/document.
        DO NOT PROVIDE A DIAGNOSIS.
        Your goal is to:
        1. Summarize and acknowledge the parent's observations in a supportive tone.
        2. If an image is provided, describe what you see in it (e.g., "The report mentions...", "The photo shows...").
        3. Identify key points that would be helpful for the parent to discuss with a healthcare professional.
        4. Strongly and clearly recommend they share these concerns with a pediatrician or specialist for a proper evaluation.
        Format the output clearly with headings and bullet points.

        Parent's Written Concerns: "${shareConcerns}"`
      ];

      if (shareFile) {
        const filePart = await fileToGenerativePart(shareFile);
        promptParts.push(filePart);
      }
      
      const result = await model.generateContent({ contents: [{ role: "user", parts: promptParts }] });
      setAnalysis({ summary: result.response.text() });
      setMessage('Analysis complete!');
    } catch (error: any) {
      setMessage(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-6 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">Know Your Child</h1>
            <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
              Use our tools to track milestones and get personalized insights.
            </p>
        </motion.div>

        <div className="flex flex-wrap justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {[{ id: 'questionnaire', label: 'Milestone Assessment', icon: FileText }, { id: 'upload', label: 'Share & Analyze with AI', icon: Upload }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg' : 'text-[#3f3d5c] hover:bg-white/20 hover:text-[#0c0b1e]'}`}>
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === 'questionnaire' && (
             <div className="max-w-4xl mx-auto">
                <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-[#0c0b1e] mb-4">Developmental Assessment</h2>
                    <p className="text-[#3f3d5c] mb-6">This is a quick screening tool. Select your child's age group and answer the questions to see if there are any areas you might want to discuss with a professional.</p>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {questionnaireData.map(ageGroup => (
                            <button key={ageGroup.title} onClick={() => setSelectedAgeGroup(ageGroup)} className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${selectedAgeGroup?.title === ageGroup.title ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md' : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'}`}>
                                {ageGroup.title}
                            </button>
                        ))}
                    </div>

                    {selectedAgeGroup && (
                        <div className="space-y-8">
                            {selectedAgeGroup.sections.map((section: any) => (
                                <div key={section.category} className="space-y-4">
                                    <h3 className="text-xl font-semibold text-[#1d1c30] border-b border-[#7f7b9d]/20 pb-2">{section.category}</h3>
                                    <div className="space-y-6">
                                        {section.questions.map((question: any, qIndex: number) => (
                                            <div key={qIndex} className="space-y-3">
                                                <p className="text-[#1d1c30] font-medium">{question.text}</p>
                                                {/* UI for Yes/No and Rating buttons... */}
                                                <div className="flex flex-wrap gap-3">
                                                  {question.type === 'yes/no' && ['Yes', 'No'].map(option => (
                                                    <button key={option} onClick={() => handleQuestionResponse(selectedAgeGroup.title, section.category, qIndex, option)} className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${questionnaire[selectedAgeGroup.title]?.[section.category]?.[qIndex] === option ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md' : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'}`}>
                                                      {option}
                                                    </button>
                                                  ))}
                                                  {question.type === 'rating' && ['1', '2', '3', '4', '5'].map((option, index) => (
                                                    <button key={option} onClick={() => handleQuestionResponse(selectedAgeGroup.title, section.category, qIndex, option)} className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 flex flex-col justify-center items-center text-xs ${questionnaire[selectedAgeGroup.title]?.[section.category]?.[qIndex] === option ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md' : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'}`}>
                                                      <span>{option}</span>
                                                      {question.labels && (index === 0 || index === 4) && <span className="opacity-70">{index === 0 ? question.labels[0] : question.labels[1]}</span>}
                                                    </button>
                                                  ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <motion.button onClick={handleQuestionnaireSubmit} disabled={loading || !selectedAgeGroup} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                    <span>{loading ? 'Analyzing...' : 'Get Instant Feedback'}</span>
                </motion.button>
            </div>
          )}
          
          {activeTab === 'upload' && (
            <div className="max-w-4xl mx-auto">
                <form onSubmit={processGeminiAnalysis} className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg space-y-6">
                    <h2 className="text-2xl font-bold text-[#0c0b1e]">Share for a Deeper AI Analysis</h2>
                    <p className="text-[#3f3d5c]">This section uses the Gemini API for a detailed analysis of your written concerns and any media you provide. This is ideal for more complex or nuanced observations.</p>
                    <div>
                        <label htmlFor="share-concerns" className="block text-sm font-semibold text-[#1d1c30] mb-2">Describe your concerns</label>
                        <textarea id="share-concerns" value={shareConcerns} onChange={(e) => setShareConcerns(e.target.value)} required rows={5} className="w-full p-3 rounded-xl bg-white/50 border border-white/30 text-[#0c0b1e] focus:ring-2 focus:ring-[#7f7b9d] transition" placeholder="Describe any behaviors, speech patterns, or movements you've noticed..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="share-file" className="block text-sm font-semibold text-[#1d1c30] mb-2">Upload Photo or Report (Optional)</label>
                        <input id="share-file" type="file" accept="image/*,.pdf" onChange={handleFileChange} className="w-full text-sm text-[#3f3d5c] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/50 file:text-[#0c0b1e] hover:file:bg-white/80 transition" />
                    </div>
                     {filePreview && (
                        <div>
                            <p className="text-sm font-medium text-[#1d1c30] mb-2">File Preview:</p>
                            <div className="rounded-lg overflow-hidden border border-white/30 bg-white/20 p-2">
                                <img src={filePreview} alt="Selected file preview" className="w-full h-auto max-h-60 object-contain rounded-md" />
                            </div>
                        </div>
                    )}
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        <span>{loading ? 'Analyzing with Gemini...' : 'Submit for AI Analysis'}</span>
                    </motion.button>
                </form>
            </div>
          )}
        </motion.div>
        
        {(loading || message || analysis) && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
                {loading && <div className="flex justify-center items-center"><Loader2 className="w-6 h-6 animate-spin mr-3 text-[#3f3d5c]" /><p className="text-center text-[#3f3d5c]">{message || "Loading..."}</p></div>}
                {!loading && analysis && (
                    <div>
                        <h2 className="text-2xl font-bold text-[#0c0b1e] mb-4">Analysis Results</h2>
                        <p className="text-[#1d1c30] leading-relaxed whitespace-pre-wrap">{analysis.summary}</p>
                    </div>
                )}
                 {!loading && !analysis && message && <p className="text-center text-red-600">{message}</p>}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KnowYourChild;