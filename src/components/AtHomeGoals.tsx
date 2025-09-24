import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Play, CheckCircle, Calendar, Trophy, Star, ArrowRight } from 'lucide-react';

const AtHomeGoals = () => {
  const [activeCategory, setActiveCategory] = useState('motor');
  const [completedActivities, setCompletedActivities] = useState(new Set());

  const categories = [
    { id: 'motor', label: 'Motor Skills', icon: '🏃', color: 'from-blue-400 to-blue-600' },
    { id: 'speech', label: 'Speech & Language', icon: '💬', color: 'from-green-400 to-green-600' },
    { id: 'cognitive', label: 'Cognitive', icon: '🧠', color: 'from-purple-400 to-purple-600' },
    { id: 'social', label: 'Social-Emotional', icon: '❤️', color: 'from-pink-400 to-pink-600' }
  ];

  const activities = {
    motor: [
      {
        id: 'motor-1',
        title: "Balance Beam Walking",
        description: "Use a piece of tape on the floor as a 'balance beam' and have your child walk along it.",
        ageRange: "2-4 years",
        duration: "5-10 minutes",
        difficulty: "Easy",
        benefits: ["Balance", "Coordination", "Spatial awareness"],
        instructions: [
          "Place a straight line of tape on the floor",
          "Show your child how to walk heel-to-toe along the line",
          "Hold their hand for support initially",
          "Gradually reduce support as they improve",
          "Make it fun by pretending to cross a bridge"
        ],
        materials: ["Masking tape", "Open floor space"],
        tips: "Start with a wider tape line and gradually use narrower tape as skills improve"
      },
      {
        id: 'motor-2',
        title: "Ball Throwing Practice",
        description: "Develop hand-eye coordination and gross motor skills through structured ball play.",
        ageRange: "18 months - 4 years",
        duration: "10-15 minutes",
        difficulty: "Easy",
        benefits: ["Hand-eye coordination", "Gross motor skills", "Following directions"],
        instructions: [
          "Start with a large, soft ball",
          "Stand 2-3 feet apart from your child",
          "Practice underhand tosses back and forth",
          "Gradually increase distance as skills improve",
          "Add targets like buckets or circles on the ground"
        ],
        materials: ["Soft ball", "Optional: buckets or targets"],
        tips: "Use encouraging language and celebrate every attempt, not just success"
      },
      {
        id: 'motor-3',
        title: "Animal Movement Game",
        description: "Imitate different animal movements to develop various motor skills.",
        ageRange: "2-5 years",
        duration: "8-12 minutes",
        difficulty: "Medium",
        benefits: ["Gross motor development", "Body awareness", "Following instructions"],
        instructions: [
          "Call out different animals for your child to imitate",
          "Bear crawl: hands and feet on ground",
          "Frog jump: squat and hop",
          "Crab walk: hands and feet, belly up",
          "Snake slither: lie down and wiggle forward",
          "Bird flying: run with arms spread"
        ],
        materials: ["Open space", "Optional: animal picture cards"],
        tips: "Join in the fun! Children learn better when parents participate"
      }
    ],
    speech: [
      {
        id: 'speech-1',
        title: "Story Time with Questions",
        description: "Read books together while asking questions to promote language development.",
        ageRange: "1-6 years",
        duration: "15-20 minutes",
        difficulty: "Easy",
        benefits: ["Vocabulary expansion", "Listening skills", "Comprehension"],
        instructions: [
          "Choose age-appropriate books with colorful pictures",
          "Ask 'what' questions: What do you see?",
          "Ask 'where' questions: Where is the cat?",
          "Encourage your child to finish familiar sentences",
          "Let them 'read' the story back to you using pictures"
        ],
        materials: ["Picture books", "Comfortable reading space"],
        tips: "Follow your child's interests - if they love trucks, find truck books!"
      },
      {
        id: 'speech-2',
        title: "Singing and Rhyming Games",
        description: "Use songs and nursery rhymes to develop speech sounds and rhythm.",
        ageRange: "6 months - 5 years",
        duration: "10-15 minutes",
        difficulty: "Easy",
        benefits: ["Speech sound development", "Memory", "Language rhythm"],
        instructions: [
          "Sing familiar nursery rhymes with actions",
          "Pause before rhyming words for child to fill in",
          "Clap to the rhythm of songs",
          "Make up simple rhymes about daily activities",
          "Use finger plays like 'Itsy Bitsy Spider'"
        ],
        materials: ["No materials needed", "Optional: musical instruments"],
        tips: "Repetition is key - sing the same songs regularly for maximum benefit"
      },
      {
        id: 'speech-3',
        title: "Cooking Together Vocabulary",
        description: "Build language skills through cooking and kitchen activities.",
        ageRange: "2-6 years",
        duration: "20-30 minutes",
        difficulty: "Medium",
        benefits: ["Vocabulary building", "Following directions", "Sequencing"],
        instructions: [
          "Choose simple recipes like making sandwiches",
          "Name all ingredients and tools",
          "Use action words: pour, mix, stir, spread",
          "Talk about textures: smooth, bumpy, soft, hard",
          "Describe what you're doing step by step"
        ],
        materials: ["Simple cooking ingredients", "Child-safe utensils"],
        tips: "Focus on language over the perfect end product - let them explore and describe"
      }
    ],
    cognitive: [
      {
        id: 'cognitive-1',
        title: "Color and Shape Sorting",
        description: "Develop classification and problem-solving skills through sorting activities.",
        ageRange: "18 months - 4 years",
        duration: "10-15 minutes",
        difficulty: "Easy",
        benefits: ["Classification skills", "Color recognition", "Problem solving"],
        instructions: [
          "Gather household items in different colors and shapes",
          "Start with sorting by one attribute (all red items)",
          "Progress to sorting by shape (all circles)",
          "Use containers or circles drawn on paper as sorting areas",
          "Let your child explain their sorting choices"
        ],
        materials: ["Colorful household items", "Containers or paper"],
        tips: "Accept different ways of sorting - there's no single 'right' way"
      },
      {
        id: 'cognitive-2',
        title: "Memory Matching Games",
        description: "Strengthen memory and concentration through simple matching activities.",
        ageRange: "2-5 years",
        duration: "8-12 minutes",
        difficulty: "Medium",
        benefits: ["Memory", "Concentration", "Visual processing"],
        instructions: [
          "Use pairs of household items or picture cards",
          "Start with 3-4 pairs for younger children",
          "Place items face down and take turns flipping",
          "Help your child remember where items are located",
          "Celebrate matches together"
        ],
        materials: ["Matching pairs of items", "Optional: memory cards"],
        tips: "Start easy and gradually increase difficulty as memory improves"
      },
      {
        id: 'cognitive-3',
        title: "Pattern Building",
        description: "Develop logical thinking and pattern recognition through hands-on activities.",
        ageRange: "3-6 years",
        duration: "10-20 minutes",
        difficulty: "Medium",
        benefits: ["Pattern recognition", "Logical thinking", "Math readiness"],
        instructions: [
          "Use blocks, buttons, or colored objects",
          "Start simple patterns: red-blue-red-blue",
          "Have your child continue the pattern",
          "Create patterns with actions: clap-stomp-clap-stomp",
          "Let your child create their own patterns"
        ],
        materials: ["Colored objects", "Blocks", "Buttons (with supervision)"],
        tips: "Patterns are everywhere - point them out in daily life (striped shirts, floor tiles)"
      }
    ],
    social: [
      {
        id: 'social-1',
        title: "Emotion Recognition Game",
        description: "Help your child identify and express emotions through play.",
        ageRange: "2-6 years",
        duration: "10-15 minutes",
        difficulty: "Easy",
        benefits: ["Emotional awareness", "Communication", "Self-regulation"],
        instructions: [
          "Make different facial expressions in a mirror together",
          "Name the emotions: happy, sad, angry, surprised",
          "Ask 'How do you think they feel?' about book characters",
          "Share when you feel different emotions",
          "Practice 'feeling faces' drawings"
        ],
        materials: ["Mirror", "Optional: emotion picture cards", "Paper and crayons"],
        tips: "Validate all emotions - teach that feelings are okay, but some behaviors need limits"
      },
      {
        id: 'social-2',
        title: "Taking Turns Practice",
        description: "Build patience and social skills through structured turn-taking activities.",
        ageRange: "18 months - 5 years",
        duration: "10-15 minutes",
        difficulty: "Easy",
        benefits: ["Patience", "Social skills", "Self-control"],
        instructions: [
          "Use a timer to make turn-taking visual",
          "Start with short turns (30 seconds for toddlers)",
          "Play simple games like rolling a ball back and forth",
          "Use phrases like 'Your turn' and 'My turn'",
          "Praise good waiting and turn-taking"
        ],
        materials: ["Timer", "Simple toys or games"],
        tips: "Model good turn-taking yourself and acknowledge when it's hard to wait"
      },
      {
        id: 'social-3',
        title: "Helping and Caring Activities",
        description: "Develop empathy and helpfulness through age-appropriate chores and caring actions.",
        ageRange: "2-6 years",
        duration: "15-20 minutes",
        difficulty: "Easy",
        benefits: ["Empathy", "Responsibility", "Self-confidence"],
        instructions: [
          "Assign simple helping tasks: setting napkins on table",
          "Care for stuffed animals or dolls together",
          "Help with family pets (with supervision)",
          "Make cards for family members",
          "Practice helping friends who are 'hurt' (role play)"
        ],
        materials: ["Age-appropriate chores", "Craft supplies", "Stuffed animals"],
        tips: "Focus on the effort, not perfection - helping builds confidence and empathy"
      }
    ]
  };

  const toggleActivity = (activityId) => {
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  const currentActivities = activities[activeCategory] || [];
  const completedCount = currentActivities.filter(activity => 
    completedActivities.has(activity.id)
  ).length;
  const progressPercentage = currentActivities.length > 0 
    ? (completedCount / currentActivities.length) * 100 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-6 shadow-lg">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">
            At-Home Goals
          </h1>
          <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
            Personalized activities and exercises designed to support your child's development through engaging play
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#0c0b1e]">Your Progress</h2>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#7f7b9d]" />
              <span className="text-[#1d1c30] font-semibold">
                {completedCount} / {currentActivities.length} completed
              </span>
            </div>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          
          <p className="text-[#3f3d5c]">
            Keep up the great work! Every activity helps support your child's development.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 m-1 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'text-[#3f3d5c] hover:bg-white/20 hover:text-[#0c0b1e]'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {currentActivities.map((activity, index) => {
            const isCompleted = completedActivities.has(activity.id);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isCompleted ? 'ring-2 ring-green-400' : ''
                }`}
              >
                {/* Activity Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0c0b1e] mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-[#3f3d5c] text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => toggleActivity(activity.id)}
                    className={`ml-4 p-2 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-white/20 text-[#7f7b9d] hover:bg-white/30'
                    }`}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Activity Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#7f7b9d]" />
                      <span className="text-[#1d1c30] font-medium">{activity.ageRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4 text-[#7f7b9d]" />
                      <span className="text-[#1d1c30] font-medium">{activity.duration}</span>
                    </div>
                  </div>

                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {activity.difficulty}
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-[#1d1c30] font-semibold mb-2 text-sm">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="px-2 py-1 bg-white/20 text-[#3f3d5c] rounded-lg text-xs font-medium border border-white/10"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expandable Instructions */}
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-[#7f7b9d] font-semibold hover:text-[#3f3d5c] transition-colors">
                    <span>View Instructions</span>
                    <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                  </summary>
                  
                  <div className="mt-4 space-y-4 text-sm">
                    {/* Materials */}
                    <div>
                      <h5 className="font-semibold text-[#1d1c30] mb-2">Materials needed:</h5>
                      <ul className="list-disc list-inside text-[#3f3d5c] space-y-1">
                        {activity.materials.map((material, idx) => (
                          <li key={idx}>{material}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h5 className="font-semibold text-[#1d1c30] mb-2">Instructions:</h5>
                      <ol className="list-decimal list-inside text-[#3f3d5c] space-y-1">
                        {activity.instructions.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Tips */}
                    <div className="bg-white/20 rounded-xl p-3 border border-white/10">
                      <h5 className="font-semibold text-[#1d1c30] mb-1 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-[#7f7b9d]" />
                        Tip:
                      </h5>
                      <p className="text-[#3f3d5c]">{activity.tips}</p>
                    </div>
                  </div>
                </details>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Encouragement Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
        >
          <Trophy className="w-12 h-12 text-[#7f7b9d] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#1d1c30] mb-4">Remember</h3>
          <p className="text-[#3f3d5c] leading-relaxed max-w-3xl mx-auto">
            Every child develops at their own pace. These activities are designed to be fun and engaging, not stressful. 
            Follow your child's lead, celebrate small victories, and remember that play is learning! 
            If you have concerns about your child's development, consult with your healthcare provider.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AtHomeGoals;