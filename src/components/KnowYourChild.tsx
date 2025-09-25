// src/components/KnowYourChild.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, BarChart3, Upload, Check, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../supabaseClient';

// --- FULL DATA STRUCTURE FROM PDF ---
const questionnaireData = [
  {
    title: "0-6 Months",
    sections: [
      { category: "Motor Milestones", questions: [
        { text: "Does your baby hold up their head steadily during tummy time (by ~3-4 months)?", type: 'yes/no' },
        { text: "By 6 months, does your baby roll over (tummy to back and back to tummy)?", type: 'yes/no' },
        { text: "How well does your baby reach and grasp toys?", type: 'rating', labels: ["Rarely Reaches", "Grabs Easily"] },
        { text: "When supported under the arms, how floppy vs. stiff does your baby feel?", type: 'rating', labels: ["Very Floppy", "Very Stiff"] },
      ]},
      { category: "Speech/Language Milestones", questions: [
        { text: "Does your baby coo, make babbling sounds (like 'ooh', 'aah', 'baba')?", type: 'yes/no' },
        { text: "Does your baby laugh, squeal or respond to your voice?", type: 'yes/no' },
        { text: "How often does your baby smile or laugh when you play together?", type: 'rating', labels: ["Never", "Very Often"] },
      ]},
      { category: "Cognitive (Learning) Milestones", questions: [
        { text: "Does your baby follow moving objects with their eyes, or turn head toward sounds?", type: 'yes/no' },
        { text: "Does your baby bring hands to mouth and explore with fingers/mouth?", type: 'yes/no' },
        { text: "Does your baby search for a toy dropped partly out of sight?", type: 'yes/no' },
      ]},
      { category: "Social/Emotional Milestones", questions: [
        { text: "Does your baby smile at familiar people (social smile)?", type: 'yes/no' },
        { text: "How often does your baby seem delighted or engaged when you talk or play?", type: 'rating', labels: ["Rarely", "Very Often"] },
        { text: "Does your baby show any stranger anxiety or wariness by 6 months?", type: 'yes/no' },
      ]},
      { category: "Observable Atypical Behaviors", questions: [
        { text: "Does your baby not respond to loud noises or their name?", type: 'yes/no' },
        { text: "Are your baby's arm and leg movements asymmetrical (one side weaker or less used)?", type: 'yes/no' },
        { text: "Does your baby seem very stiff or very floppy overall?", type: 'yes/no' },
        { text: "Do you ever see unusual movements or blank staring episodes?", type: 'yes/no' },
      ]},
      { category: "Medical History/Concerns", questions: [
        { text: "Was your baby premature (born before 37 weeks)?", type: 'yes/no' },
        { text: "Did your baby have any NICU stay, birth complications, or oxygen issues?", type: 'yes/no' },
        { text: "Is there a family history of neurological or genetic conditions?", type: 'yes/no' },
        { text: "Any feeding difficulties, frequent choking, or very weak cry?", type: 'yes/no' },
      ]},
    ],
  },
  {
    title: "6-12 Months",
    sections: [
      { category: "Motor Milestones", questions: [
        { text: "Can your baby sit without support for at least a minute?", type: 'yes/no' },
        { text: "Does your baby push up on arms (hands and knees) or crawl by 12 months?", type: 'yes/no' },
        { text: "Can your baby transfer toys hand-to-hand smoothly?", type: 'yes/no' },
        { text: "How steady is your baby when sitting or pulling to stand?", type: 'rating', labels: ["Very Wobbly", "Very Stable"] },
      ]},
      { category: "Speech/Language Milestones", questions: [
        { text: "Does your baby babble with consonants (like 'mamama', 'bababa')?", type: 'yes/no' },
        { text: "By 12 months, does your baby say 'mama' and 'dada' (specifically for parents)?", type: 'yes/no' },
        { text: "How often does your baby vocalize or use different sounds?", type: 'rating', labels: ["Rarely", "Very Often"] },
        { text: "Does your baby respond when you say their name or simple words?", type: 'yes/no' },
      ]},
      { category: "Cognitive (Learning) Milestones", questions: [
        { text: "Does your baby look for a hidden toy (e.g., search under a cloth)?", type: 'yes/no' },
        { text: "Does your baby use gestures like waving 'bye-bye' or pointing to get attention?", type: 'yes/no' },
        { text: "Does your baby play simple interactive games (peek-a-boo, pat-a-cake)?", type: 'yes/no' },
        { text: "How curious is your baby about new objects?", type: 'rating', labels: ["Not at all", "Very Interested"] },
      ]},
      { category: "Social/Emotional Milestones", questions: [
        { text: "Does your baby show stranger anxiety (e.g., cry when held by someone unfamiliar)?", type: 'yes/no' },
        { text: "Does your baby seek comfort when upset (looking to caregiver for reassurance)?", type: 'yes/no' },
        { text: "How often does your baby smile or laugh during play?", type: 'rating', labels: ["Rarely", "Frequently"] },
        { text: "Does your baby enjoy interactive play (peek-a-boo, being tickled)?", type: 'yes/no' },
      ]},
      { category: "Observable Atypical Behaviors", questions: [
        { text: "Does your baby not babble or make any gestures by 12 months?", type: 'yes/no' },
        { text: "Does your baby not respond to their name or to simple requests?", type: 'yes/no' },
        { text: "Are movements noticeably one-sided or delayed (not crawling/sitting)?", type: 'yes/no' },
        { text: "Does your baby seem overly stiff or floppy at this stage?", type: 'yes/no' },
        { text: "Any staring spells, sudden jerks, or episodes of 'blanking out'?", type: 'yes/no' },
      ]},
      { category: "Medical History/Concerns", questions: [
        { text: "Has your baby had any confirmed hearing or vision problems?", type: 'yes/no' },
        { text: "Any episodes called 'seizures' or unexplained jerking?", type: 'yes/no' },
        { text: "Family history of autism, developmental delay, cerebral palsy, or seizure disorders?", type: 'yes/no' },
        { text: "Any ongoing medical issues (e.g. chronic ear infections, metabolic problems)?", type: 'yes/no' },
      ]},
    ],
  },
  {
    title: "1-2 Years",
    sections: [
        { category: "Motor Milestones", questions: [
            { text: "By 18 months, is your child walking independently?", type: 'yes/no' },
            { text: "Can your child stoop to pick up a toy from the floor without falling over?", type: 'yes/no' },
            { text: "Does your child climb on furniture or climb stairs with help?", type: 'yes/no' },
            { text: "How would you rate your child's running or climbing skills?", type: 'rating', labels: ["Barely Walking", "Runs Easily"] },
        ]},
        { category: "Speech/Language Milestones", questions: [
            { text: "Does your child say at least 5-10 words (besides 'mama/dada')?", type: 'yes/no' },
            { text: "By 2 years, does your child combine words into simple phrases (e.g. 'more milk')?", type: 'yes/no' },
            { text: "How well do you understand your child's speech?", type: 'rating', labels: ["Hardly Any", "Mostly Clear"] },
            { text: "Does your child follow simple instructions ('sit down', 'give me the ball')?", type: 'yes/no' },
        ]},
        { category: "Cognitive (Learning) Milestones", questions: [
            { text: "Does your child point to indicate wants or points out interesting things?", type: 'yes/no' },
            { text: "Does your child engage in simple pretend play (e.g. pretending to feed a doll)?", type: 'yes/no' },
            { text: "Does your child scribble with a crayon or try to help with dressing?", type: 'yes/no' },
            { text: "How often does your child play with the same toy in different ways?", type: 'rating', labels: ["Not at All", "Very Often"] },
        ]},
        { category: "Social/Emotional Milestones", questions: [
            { text: "Does your child show empathy or affection (hugging, kissing familiar adults)?", type: 'yes/no' },
            { text: "Does your child engage in simple games back-and-forth (patty-cake, peekaboo)?", type: 'yes/no' },
            { text: "How often does your child play next to or with other children (parallel play)?", type: 'rating', labels: ["Never", "Often"] },
            { text: "Are your child's tantrums unusually frequent or intense?", type: 'yes/no' },
        ]},
        { category: "Observable Atypical Behaviors", questions: [
            { text: "By 2 years, does your child have fewer than 5 words?", type: 'yes/no' },
            { text: "Does your child not point or wave at all?", type: 'yes/no' },
            { text: "Is your child still toe-walking all the time (not just occasionally)?", type: 'yes/no' },
            { text: "Does your child have repetitive behaviors (rocking, hand-flapping) or strong routines?", type: 'yes/no' },
            { text: "Have you noticed any loss of skills (e.g. used words and then stopped)?", type: 'yes/no' },
        ]},
    ],
  },
  {
    title: "2-3 Years",
    sections: [
        { category: "Motor Milestones", questions: [
            { text: "Can your child run easily and climb well?", type: 'yes/no' },
            { text: "Can your child kick a ball forward or stand on tiptoes?", type: 'yes/no' },
            { text: "Can your child throw a small ball overhand?", type: 'rating', labels: ["Not at all", "Effortlessly"] },
            { text: "Can your child walk up stairs with alternating feet?", type: 'yes/no' },
        ]},
        { category: "Speech/Language Milestones", questions: [
            { text: "Does your child speak in 3- to 4-word sentences?", type: 'yes/no' },
            { text: "Can a stranger understand most of your child's speech?", type: 'yes/no' },
            { text: "How often does your child ask 'why?', 'what?' or otherwise use questions?", type: 'rating', labels: ["Rarely", "Often"] },
            { text: "Does your child follow multi-step instructions?", type: 'yes/no' },
        ]},
        { category: "Cognitive (Learning) Milestones", questions: [
            { text: "Can your child name at least one color or draw a circle/square?", type: 'yes/no' },
            { text: "Does your child sort objects by use or category?", type: 'yes/no' },
            { text: "Does your child engage in make-believe play?", type: 'yes/no' },
            { text: "How well does your child complete simple puzzles or stack blocks?", type: 'rating', labels: ["Cannot stack 3", "Stacks 6+"] },
        ]},
        { category: "Social/Emotional Milestones", questions: [
            { text: "Does your child play with other children?", type: 'yes/no' },
            { text: "Does your child show affection or concern for others?", type: 'yes/no' },
            { text: "How well does your child transition between activities?", type: 'rating', labels: ["Very Upset", "Adapts Well"] },
            { text: "Does your child throw severe tantrums beyond typical toddler frustrations?", type: 'yes/no' },
        ]},
    ],
  },
  {
    title: "3-4 Years",
    sections: [
        { category: "Motor Milestones", questions: [
            { text: "Can your child hop on one foot or balance for ~2 seconds?", type: 'yes/no' },
            { text: "Can your child catch a ball thrown toward them?", type: 'yes/no' },
            { text: "How well does your child use crayons or scissors?", type: 'rating', labels: ["Cannot hold", "Cuts easily"] },
            { text: "Can your child dress/undress with minimal help?", type: 'yes/no' },
        ]},
        { category: "Speech/Language Milestones", questions: [
            { text: "Does your child speak in clear, full sentences?", type: 'yes/no' },
            { text: "Does your child ask many questions and carry on a conversation?", type: 'yes/no' },
            { text: "How often does your child tell stories or describe past events?", type: 'rating', labels: ["Never", "Very Often"] },
            { text: "Can your child use future tense words ('will', 'going to')?", type: 'yes/no' },
        ]},
    ],
  },
  {
    title: "4-5 Years",
    sections: [
        { category: "Motor Milestones", questions: [
            { text: "Can your child ride a tricycle or balance while walking on a line?", type: 'yes/no' },
            { text: "Can your child hop many times on one foot?", type: 'yes/no' },
            { text: "How skilled is your child with buttons, zippers, or tying shoelaces?", type: 'rating', labels: ["Cannot do", "Masters easily"] },
            { text: "Can your child catch a bounced ball with both hands?", type: 'yes/no' },
        ]},
        { category: "Cognitive (Learning) Milestones", questions: [
            { text: "Can your child count to 10 or name the alphabet letters?", type: 'yes/no' },
            { text: "Can your child solve simple puzzles (3-4 pieces)?", type: 'yes/no' },
            { text: "Does your child understand concepts of time (morning vs. afternoon)?", type: 'yes/no' },
            { text: "How well does your child follow multi-step activities (like board games)?", type: 'rating', labels: ["Gets lost", "Follows well"] },
        ]},
    ],
  },
];


const KnowYourChild = () => {
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<any | null>(null);
  const [questionnaire, setQuestionnaire] = useState<Record<string, Record<string, Record<number, string>>>>({});
  
  const [age, setAge] = useState('');
  const [concerns, setConcerns] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any | null>(null);

  const handleQuestionResponse = (ageTitle: string, category: string, questionIndex: number, response: string) => {
    setQuestionnaire(prev => ({
      ...prev,
      [ageTitle]: {
        ...prev[ageTitle],
        [category]: {
          ...prev[ageTitle]?.[category],
          [questionIndex]: response
        }
      }
    }));
  };

  const processSubmission = async (textToAnalyze: string) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setMessage("Error: Gemini API Key is not configured in the .env file.");
      return;
    }
    setLoading(true);
    setMessage('Connecting to AI for analysis...');
    setAnalysis(null);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a helpful assistant for parents concerned about their child's neurological development. Analyze the following information from a questionnaire and provide a gentle, reassuring, and clear summary. DO NOT PROVIDE A DIAGNOSIS. Instead, identify potential areas for discussion based on the answers, suggest if behaviors could be normal for the age group, and strongly recommend they discuss all concerns with a pediatrician. Format the output clearly.

      Parent's Questionnaire Responses:
      "${textToAnalyze}"`;
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const analysisResultText = response.text();
      setAnalysis({ summary: analysisResultText });
      setMessage('Analysis complete!');
    } catch (error: any) {
      setMessage(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleQuestionnaireSubmit = () => {
    if (!selectedAgeGroup) {
      setMessage("Please select an age group and answer some questions first.");
      return;
    }
    let formattedConcerns = `Parent has completed a questionnaire for the ${selectedAgeGroup.title} age group with the following responses:\n`;
    selectedAgeGroup.sections.forEach((section: any) => {
        formattedConcerns += `\nSection: ${section.category}\n`;
        section.questions.forEach((question: any, qIndex: number) => {
            const answer = questionnaire[selectedAgeGroup.title]?.[section.category]?.[qIndex] || "Not answered";
            formattedConcerns += `- ${question.text} -> Answer: ${answer}\n`;
        });
    });
    processSubmission(formattedConcerns);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This function can be built out later if needed
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12">
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-6 shadow-lg">
             <Brain className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">Know Your Child</h1>
           <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
             Track developmental milestones and get personalized insights using our AI-driven assessment tools
           </p>
        </motion.div>

        <div className="flex flex-wrap justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
          {[{ id: 'milestones', label: 'Milestones', icon: BarChart3 }, { id: 'questionnaire', label: 'Assessment', icon: FileText }, { id: 'upload', label: 'Share & Analyze', icon: Upload }].map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg' : 'text-[#3f3d5c] hover:bg-white/20 hover:text-[#0c0b1e]'}`}>
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 'milestones' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* This is where your milestoneCategories data would be mapped and displayed */}
            </div>
          )}

          {activeTab === 'questionnaire' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-[#0c0b1e] mb-4">Developmental Assessment</h2>
                <p className="text-[#3f3d5c] mb-6">First, select your child's age group to see the relevant questions.</p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {questionnaireData.map(ageGroup => (
                    <button key={ageGroup.title} onClick={() => setSelectedAgeGroup(ageGroup)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${selectedAgeGroup?.title === ageGroup.title ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md' : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'}`}>
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
                              <div className="flex flex-wrap gap-3">
                                {question.type === 'yes/no' && ['Yes', 'No'].map(option => (
                                  <button key={option} onClick={() => handleQuestionResponse(selectedAgeGroup.title, section.category, qIndex, option)}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${questionnaire[selectedAgeGroup.title]?.[section.category]?.[qIndex] === option ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md' : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'}`}>
                                    {option}
                                  </button>
                                ))}
                                {question.type === 'rating' && ['1', '2', '3', '4', '5'].map((option, index) => (
                                  <button key={option} onClick={() => handleQuestionResponse(selectedAgeGroup.title, section.category, qIndex, option)}
                                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 flex flex-col justify-center items-center text-xs ${questionnaire[selectedAgeGroup.title]?.[section.category]?.[qIndex] === option ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md' : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'}`}>
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
              <motion.button onClick={handleQuestionnaireSubmit} disabled={loading || !selectedAgeGroup}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                <span>{loading ? 'Analyzing...' : 'Generate Insights from Questionnaire'}</span>
              </motion.button>
            </div>
          )}
          
          {activeTab === 'upload' && (
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleUploadSubmit} className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg space-y-6">
                    {/* ... Your existing upload form JSX ... */}
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