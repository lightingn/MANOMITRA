import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Brain, Users, Target, BookOpen, MessageCircle, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "Know Your Child",
      description: "AI-driven milestone tracking and early detection support",
      path: "/know-your-child",
      color: "from-[#7f7b9d] to-[#b2a7d7]"
    },
    {
      icon: Heart,
      title: "Parental Support",
      description: "Emotional wellness and mindfulness guidance",
      path: "/parental-support",
      color: "from-[#3f3d5c] to-[#7f7b9d]"
    },
    {
      icon: BookOpen,
      title: "Awareness Hub",
      description: "Clinical datasets and trusted neurological information",
      path: "/awareness-hub",
      color: "from-[#1d1c30] to-[#3f3d5c]"
    },
    {
      icon: Target,
      title: "At-Home Goals",
      description: "Personalized exercises and progress tracking",
      path: "/at-home-goals",
      color: "from-[#7f7b9d] to-[#b2a7d7]"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other families and share experiences",
      path: "/community",
      color: "from-[#3f3d5c] to-[#7f7b9d]"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6"
            >
              <Brain className="w-12 h-12 text-[#0c0b1e]" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0c0b1e] mb-6">
            Mano
            <span className="bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] bg-clip-text text-transparent">
              Mitra
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-[#1d1c30] max-w-4xl mx-auto mb-8 leading-relaxed">
            Your human-centered neurological health companion, designed to support families, 
            children (0–6 years), and expecting mothers with AI-driven insights and empathetic guidance.
          </p>
          
          <p className="text-lg text-[#3f3d5c] max-w-3xl mx-auto mb-12">
            We combine clinical expertise with compassionate care to help you understand your child's development, 
            access personalized guidance, and feel supported every step of the way.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/onboarding"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Begin Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={feature.path} className="block h-full">
                  <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/40">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-md`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#0c0b1e] mb-4 group-hover:text-[#1d1c30] transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[#3f3d5c] text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-[#7f7b9d] font-semibold group-hover:text-[#3f3d5c] transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-white/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-lg"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0c0b1e] mb-6">
            Our Mission
          </h2>
          
          <p className="text-xl text-[#1d1c30] max-w-4xl mx-auto leading-relaxed mb-8">
            We translate complex neurological and pregnancy health knowledge into clear, actionable advice. 
            Our AI-powered platform personalizes recommendations using real-life inputs from parents while 
            providing emotional reassurance and evidence-based guidance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
            <span className="px-6 py-2 bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white rounded-full shadow-md">
              Clarity
            </span>
            <span className="px-6 py-2 bg-gradient-to-r from-[#3f3d5c] to-[#7f7b9d] text-white rounded-full shadow-md">
              Comfort
            </span>
            <span className="px-6 py-2 bg-gradient-to-r from-[#1d1c30] to-[#3f3d5c] text-white rounded-full shadow-md">
              Confidence
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;