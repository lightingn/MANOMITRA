import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Frown, Meh, Calendar, Phone, Users, BookOpen } from 'lucide-react';

const ParentalSupport = () => {
  const [mood, setMood] = useState(null);
  const [dailyCheckIn, setDailyCheckIn] = useState({});

  const moodOptions = [
    { value: 'excellent', icon: '😊', label: 'Excellent', color: 'from-green-400 to-green-600' },
    { value: 'good', icon: '🙂', label: 'Good', color: 'from-blue-400 to-blue-600' },
    { value: 'okay', icon: '😐', label: 'Okay', color: 'from-yellow-400 to-yellow-600' },
    { value: 'struggling', icon: '😔', label: 'Struggling', color: 'from-orange-400 to-orange-600' },
    { value: 'overwhelmed', icon: '😰', label: 'Overwhelmed', color: 'from-red-400 to-red-600' }
  ];

  const supportResources = [
    {
      title: "Breathing Exercises",
      description: "Simple techniques to help you relax and find calm",
      icon: "🌬️",
      duration: "3-5 minutes",
      action: "Start breathing exercise"
    },
    {
      title: "Guided Meditation",
      description: "Short mindfulness sessions for busy parents",
      icon: "🧘",
      duration: "5-10 minutes", 
      action: "Begin meditation"
    },
    {
      title: "Self-Care Ideas",
      description: "Quick ways to nurture yourself throughout the day",
      icon: "🌸",
      duration: "2-15 minutes",
      action: "Get self-care tips"
    },
    {
      title: "Parent Journal",
      description: "Reflect on your experiences and track your emotions",
      icon: "📝",
      duration: "5-10 minutes",
      action: "Open journal"
    }
  ];

  const helplineResources = [
    {
      name: "Postpartum Support International",
      phone: "1-944-4773",
      description: "24/7 support for maternal mental health",
      hours: "24/7"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, confidential crisis support",
      hours: "24/7"
    },
    {
      name: "National Parent Helpline",
      phone: "1-855-427-2736",
      description: "Emotional support and advocacy for parents",
      hours: "Mon-Fri 10am-7pm PST"
    }
  ];

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
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">
            Parental Support
          </h1>
          <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
            Your well-being matters. Take a moment to check in with yourself and access tools for emotional support
          </p>
        </motion.div>

        {/* Daily Check-in */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0c0b1e] mb-2">How are you feeling today?</h2>
            <p className="text-[#3f3d5c]">Your emotional well-being is important to us</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {moodOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setMood(option.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                  mood === option.value
                    ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg`
                    : 'bg-white/20 border-white/30 text-[#3f3d5c] hover:border-[#7f7b9d] hover:bg-white/30'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-medium text-sm">{option.label}</div>
              </motion.button>
            ))}
          </div>

          {mood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/20 rounded-2xl p-6 border border-white/10"
            >
              <p className="text-[#1d1c30] mb-4">
                {mood === 'excellent' && "That's wonderful! We're glad you're having such a positive day."}
                {mood === 'good' && "It's great that you're feeling good today. Keep taking care of yourself!"}
                {mood === 'okay' && "Thank you for sharing. Even okay days are part of the journey."}
                {mood === 'struggling' && "We understand that some days are harder than others. You're not alone."}
                {mood === 'overwhelmed' && "It's okay to feel overwhelmed. Let's find some resources to help you through this."}
              </p>
              <p className="text-[#3f3d5c] text-sm">
                Based on how you're feeling, we've customized some resources below that might be helpful.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Self-Care Tools */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0c0b1e] text-center mb-8">
            Self-Care Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold text-[#0c0b1e] mb-3">
                  {resource.title}
                </h3>
                <p className="text-[#3f3d5c] mb-4 leading-relaxed text-sm">
                  {resource.description}
                </p>
                <div className="text-[#7f7b9d] font-medium mb-4 text-sm">
                  {resource.duration}
                </div>
                <button className="w-full bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                  {resource.action}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Support */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0c0b1e] text-center mb-8">
            Professional Support
          </h2>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
            <div className="text-center mb-8">
              <Phone className="w-12 h-12 text-[#7f7b9d] mx-auto mb-4" />
              <p className="text-[#1d1c30] text-lg leading-relaxed">
                Sometimes we all need extra support. These helplines provide confidential, professional assistance when you need it most.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helplineResources.map((helpline) => (
                <div
                  key={helpline.name}
                  className="bg-white/20 rounded-2xl p-6 border border-white/10 hover:bg-white/30 transition-all duration-300"
                >
                  <h3 className="font-bold text-[#0c0b1e] mb-2">{helpline.name}</h3>
                  <p className="text-[#7f7b9d] font-semibold text-lg mb-2">{helpline.phone}</p>
                  <p className="text-[#3f3d5c] text-sm mb-3">{helpline.description}</p>
                  <p className="text-[#1d1c30] font-medium text-sm">Hours: {helpline.hours}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-[#3f3d5c] text-sm">
                If you're experiencing thoughts of self-harm or suicide, please call 911 or go to your nearest emergency room immediately.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Daily Affirmations */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg text-center"
        >
          <BookOpen className="w-12 h-12 text-[#7f7b9d] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0c0b1e] mb-4">Today's Affirmation</h2>
          <p className="text-xl text-[#1d1c30] italic mb-6 leading-relaxed max-w-2xl mx-auto">
            "You are doing better than you think. Every small step you take is progress. 
            You are enough, and your love for your child shines through in everything you do."
          </p>
          <button className="bg-gradient-to-r from-[#3f3d5c] to-[#7f7b9d] text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
            Get New Affirmation
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParentalSupport;