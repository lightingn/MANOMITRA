import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Camera, FileText, BarChart3, Upload, Play, Check } from 'lucide-react';

const KnowYourChild = () => {
  const [activeTab, setActiveTab] = useState('milestones');
  const [questionnaire, setQuestionnaire] = useState({});
  const [uploadedContent, setUploadedContent] = useState(null);

  const milestoneCategories = [
    {
      title: "Motor Development",
      icon: "🏃",
      milestones: [
        "Sits without support (6-8 months)",
        "Walks independently (12-15 months)",
        "Jumps with both feet (2 years)",
        "Rides tricycle (3 years)"
      ]
    },
    {
      title: "Speech & Language",
      icon: "💬",
      milestones: [
        "First words (12 months)",
        "Two-word phrases (18-24 months)",
        "Simple sentences (2-3 years)",
        "Clear speech to strangers (4 years)"
      ]
    },
    {
      title: "Cognitive Development",
      icon: "🧠",
      milestones: [
        "Object permanence (8-12 months)",
        "Points to body parts (18 months)",
        "Sorts shapes/colors (2-3 years)",
        "Counts to 10 (4-5 years)"
      ]
    },
    {
      title: "Social-Emotional",
      icon: "❤️",
      milestones: [
        "Social smiling (2-3 months)",
        "Parallel play (18-24 months)",
        "Shows empathy (2-3 years)",
        "Makes friends (4-5 years)"
      ]
    }
  ];

  const questionnaireItems = [
    {
      category: "Motor Skills",
      questions: [
        "Can your child walk steadily without falling frequently?",
        "Does your child run and jump comfortably?",
        "Can your child throw and catch a ball?"
      ]
    },
    {
      category: "Communication",
      questions: [
        "Does your child use words to express needs?",
        "Can your child follow simple instructions?",
        "Does your child engage in back-and-forth conversation?"
      ]
    },
    {
      category: "Social Behavior",
      questions: [
        "Does your child show interest in other children?",
        "Can your child play cooperatively with others?",
        "Does your child show empathy when others are upset?"
      ]
    }
  ];

  const handleQuestionResponse = (category, questionIndex, response) => {
    setQuestionnaire(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [questionIndex]: response
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
          {[
            { id: 'milestones', label: 'Milestones', icon: BarChart3 },
            { id: 'questionnaire', label: 'Assessment', icon: FileText },
            { id: 'upload', label: 'Share Content', icon: Upload }
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

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'milestones' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {milestoneCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-[#0c0b1e]">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-4 rounded-xl bg-white/20 border border-white/10"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] mt-2 flex-shrink-0"></div>
                        <p className="text-[#1d1c30] leading-relaxed">{milestone}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'questionnaire' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-[#0c0b1e] mb-4">
                  Developmental Assessment
                </h2>
                <p className="text-[#3f3d5c] mb-6">
                  Answer these questions to help us understand your child's current development. 
                  There are no right or wrong answers - we're here to support you.
                </p>
                
                <div className="space-y-8">
                  {questionnaireItems.map((section) => (
                    <div key={section.category} className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#1d1c30] border-b border-[#7f7b9d]/20 pb-2">
                        {section.category}
                      </h3>
                      
                      <div className="space-y-6">
                        {section.questions.map((question, qIndex) => (
                          <div key={qIndex} className="space-y-3">
                            <p className="text-[#1d1c30] font-medium">{question}</p>
                            
                            <div className="flex flex-wrap gap-3">
                              {['Always', 'Often', 'Sometimes', 'Rarely', 'Never'].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleQuestionResponse(section.category, qIndex, option)}
                                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                    questionnaire[section.category]?.[qIndex] === option
                                      ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md'
                                      : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Generate Insights</span>
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    type: 'text',
                    title: 'Share Your Concerns',
                    description: 'Tell us about any behaviors or concerns you\'ve noticed',
                    icon: FileText,
                    action: 'Write about your observations...'
                  },
                  {
                    type: 'photo',
                    title: 'Upload Photos',
                    description: 'Share photos that show your child\'s activities or behaviors',
                    icon: Camera,
                    action: 'Select photos to upload'
                  },
                  {
                    type: 'video',
                    title: 'Upload Videos',
                    description: 'Short videos can help our AI analyze movement patterns',
                    icon: Play,
                    action: 'Select video files (30-90 seconds)'
                  }
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={option.type}
                      whileHover={{ y: -5 }}
                      className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-6 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#0c0b1e] mb-3">
                        {option.title}
                      </h3>
                      
                      <p className="text-[#3f3d5c] mb-6 leading-relaxed">
                        {option.description}
                      </p>
                      
                      <button className="w-full bg-gradient-to-r from-[#3f3d5c] to-[#7f7b9d] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                        {option.action}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-[#1d1c30] mb-3">
                  Privacy & Security
                </h3>
                <p className="text-[#3f3d5c] leading-relaxed">
                  All content you share is encrypted and stored securely. We use this information solely to provide 
                  personalized insights and recommendations. Your data is never shared with third parties without your consent.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KnowYourChild;