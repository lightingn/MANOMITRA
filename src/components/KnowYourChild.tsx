// src/components/KnowYourChild.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Camera, FileText, BarChart3, Upload, Play, Check, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../supabaseClient';

const KnowYourChild = () => {
  // State management remains the same
  const [activeTab, setActiveTab] = useState('milestones');
  const [questionnaire, setQuestionnaire] = useState<Record<string, Record<number, string>>>({});
  const [age, setAge] = useState('');
  const [concerns, setConcerns] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any | null>(null);

  // Static data remains the same
  const milestoneCategories = [
    { title: "Motor Development", icon: "🏃", milestones: ["Sits without support (6-8 months)", "Walks independently (12-15 months)", "Jumps with both feet (2 years)", "Rides tricycle (3 years)"] },
    { title: "Speech & Language", icon: "💬", milestones: ["First words (12 months)", "Two-word phrases (18-24 months)", "Simple sentences (2-3 years)", "Clear speech to strangers (4 years)"] },
    { title: "Cognitive Development", icon: "🧠", milestones: ["Object permanence (8-12 months)", "Points to body parts (18 months)", "Sorts shapes/colors (2-3 years)", "Counts to 10 (4-5 years)"] },
    { title: "Social-Emotional", icon: "❤️", milestones: ["Social smiling (2-3 months)", "Parallel play (18-24 months)", "Shows empathy (2-3 years)", "Makes friends (4-5 years)"] }
  ];
  const questionnaireItems = [
    { category: "Motor Skills", questions: ["Can your child walk steadily without falling frequently?", "Does your child run and jump comfortably?", "Can your child throw and catch a ball?"] },
    { category: "Communication", questions: ["Does your child use words to express needs?", "Can your child follow simple instructions?", "Does your child engage in back-and-forth conversation?"] },
    { category: "Social Behavior", questions: ["Does your child show interest in other children?", "Can your child play cooperatively with others?", "Does your child show empathy when others are upset?"] }
  ];

  const handleQuestionResponse = (category: string, questionIndex: number, response: string) => {
    setQuestionnaire(prev => ({
      ...prev,
      [category]: { ...prev[category], [questionIndex]: response }
    }));
  };

  // --- MODIFIED FUNCTION FOR CLIENT-SIDE API CALL ---
  const processSubmission = async (textToAnalyze: string, fileToUpload: File | null, childAge: string) => {
    if (!childAge) {
      setMessage("Please enter the child's age.");
      return;
    }
    // Check for the API key from the .env file
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setMessage("Error: Gemini API Key is not configured in the .env file.");
      return;
    }

    setLoading(true);
    setMessage('Connecting to AI for analysis...');
    setAnalysis(null);

    try {
      // Initialize the Gemini client with the key from .env
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        You are a helpful assistant for parents concerned about their child's neurological development. 
        Analyze the following information and provide a gentle, reassuring, and clear summary. 
        DO NOT PROVIDE A DIAGNOSIS. 
        Instead, identify potential areas of concern based on the input, suggest if the behavior could be normal, 
        and recommend whether they should consider speaking to a pediatrician.
        
        Parent's Concern: "${textToAnalyze}"
      `;

      let result;
      if (fileToUpload) {
        // Converts the file into a format Gemini can understand
        const filePart = {
          inlineData: {
            data: await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              // When the file is read, resolve the promise with the Base64 data
              reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
              reader.onerror = reject;
              reader.readAsDataURL(fileToUpload);
            }),
            mimeType: fileToUpload.type,
          },
        };
        // Send the prompt and the file data to Gemini
        result = await model.generateContent([prompt, filePart]);
      } else {
        // Send only the text prompt to Gemini
        result = await model.generateContent(prompt);
      }
      
      const response = result.response;
      const analysisResultText = response.text();

      setAnalysis({ summary: analysisResultText });
      setMessage('Analysis complete!');

    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      setMessage(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // This handler now calls the new client-side processSubmission function
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processSubmission(concerns, file, age);
  };
  
  // This handler also now calls the new client-side processSubmission function
  const handleQuestionnaireSubmit = () => {
    let formattedConcerns = "Parent has completed a questionnaire with the following responses:\n";
    questionnaireItems.forEach(section => {
        formattedConcerns += `\nSection: ${section.category}\n`;
        section.questions.forEach((question, qIndex) => {
            const answer = questionnaire[section.category]?.[qIndex] || "Not answered";
            formattedConcerns += `- ${question} -> Answer: ${answer}\n`;
        });
    });
    if (!age) {
        setMessage("Please go to the 'Share & Analyze' tab and enter the child's age first.");
        setActiveTab('upload');
        return;
    }
    processSubmission(formattedConcerns, null, age);
  };

  // The rest of your JSX component remains exactly the same...
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12"
    >
        {/* All your beautiful JSX for tabs, forms, and results display goes here... */}
        {/* No changes needed to this return statement section */}
        <div className="max-w-6xl mx-auto">
        <motion.div>
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-6 shadow-lg">
             <Brain className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">
             Know Your Child
           </h1>
           <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
             Track developmental milestones and get personalized insights using our AI-driven assessment tools
           </p>
        </motion.div>
        <div className="flex flex-wrap justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
          {[
            { id: 'milestones', label: 'Milestones', icon: BarChart3 },
            { id: 'questionnaire', label: 'Assessment', icon: FileText },
            { id: 'upload', label: 'Share & Analyze', icon: Upload }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg'
                    : 'text-[#3f3d5c] hover:bg-white/20 hover:text-[#0c0b1e]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <motion.div key={activeTab}>
          {activeTab === 'milestones' && (
            <div> {/* Your existing Milestones UI */} </div>
          )}
          {activeTab === 'questionnaire' && (
            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={handleQuestionnaireSubmit}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                <span>{loading ? 'Analyzing...' : 'Generate Insights from Questionnaire'}</span>
              </motion.button>
            </div>
          )}
          {activeTab === 'upload' && (
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleUploadSubmit} className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-[#0c0b1e]">Share for AI Analysis</h2>
                <p className="text-[#3f3d5c]">
                  Provide your observations and optionally upload a photo or video. Our AI will analyze the content to provide you with gentle, helpful insights.
                </p>
                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-[#1d1c30] mb-2">Child's Age (in months)</label>
                  <input
                    id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required
                    className="w-full p-3 rounded-xl bg-white/50 border border-white/30 text-[#0c0b1e] focus:ring-2 focus:ring-[#7f7b9d] transition"
                    placeholder="e.g., 18"
                  />
                </div>
                <div>
                  <label htmlFor="concerns" className="block text-sm font-semibold text-[#1d1c30] mb-2">Describe your concerns</label>
                  <textarea
                    id="concerns" value={concerns} onChange={(e) => setConcerns(e.target.value)} required rows={5}
                    className="w-full p-3 rounded-xl bg-white/50 border border-white/30 text-[#0c0b1e] focus:ring-2 focus:ring-[#7f7b9d] transition"
                    placeholder="Describe any behaviors, speech patterns, or movements you've noticed..."
                  />
                </div>
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-semibold text-[#1d1c30] mb-2">Upload Photo or Video (Optional)</label>
                  <input
                    id="file-upload" type="file" accept="image/*,video/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-[#3f3d5c] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/50 file:text-[#0c0b1e] hover:file:bg-white/80 transition"
                  />
                </div>
                <motion.button
                  type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                  <span>{loading ? 'Analyzing...' : 'Submit for Analysis'}</span>
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
        {(loading || message || analysis) && (
            <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
                    {loading && <p className="text-center text-[#3f3d5c]">{message || "Loading..."}</p>}
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