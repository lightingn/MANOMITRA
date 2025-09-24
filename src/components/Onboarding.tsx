import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, Baby, Calendar, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    childAge: '',
    language: 'english',
    nickname: '',
    primaryConcern: ''
  });
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to ManoMitra",
      subtitle: "Let's get to know you and your little one",
      icon: Heart,
      content: (
        <div className="text-center space-y-6">
          <p className="text-lg text-[#3f3d5c] leading-relaxed max-w-md mx-auto">
            We're here to support you on your parenting journey with personalized guidance and caring insights.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-[#1d1c30] font-semibold mb-2">What we do:</p>
            <ul className="text-[#3f3d5c] space-y-2 text-left">
              <li>• Provide developmental milestone tracking</li>
              <li>• Offer emotional support for parents</li>
              <li>• Share evidence-based guidance</li>
              <li>• Connect you with a caring community</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Tell us about your child",
      subtitle: "This helps us personalize your experience",
      icon: Baby,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-[#1d1c30] font-semibold mb-3 text-left">
              Child's Age Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '0-6months', label: '0-6 months' },
                { value: '6-12months', label: '6-12 months' },
                { value: '1-2years', label: '1-2 years' },
                { value: '2-4years', label: '2-4 years' },
                { value: '4-6years', label: '4-6 years' },
                { value: 'expecting', label: 'Expecting' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, childAge: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center font-medium ${
                    formData.childAge === option.value
                      ? 'border-[#7f7b9d] bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg'
                      : 'border-white/30 bg-white/20 text-[#3f3d5c] hover:border-[#7f7b9d] hover:bg-white/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Choose your language",
      subtitle: "We support multiple languages for your comfort",
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'english', label: 'English' },
              { value: 'spanish', label: 'Español' },
              { value: 'french', label: 'Français' },
              { value: 'hindi', label: 'हिंदी' },
              { value: 'mandarin', label: '中文' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData({ ...formData, language: option.value })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center font-medium ${
                  formData.language === option.value
                    ? 'border-[#7f7b9d] bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg'
                    : 'border-white/30 bg-white/20 text-[#3f3d5c] hover:border-[#7f7b9d] hover:bg-white/30'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Personal touch",
      subtitle: "How would you like us to address you?",
      icon: Calendar,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-[#1d1c30] font-semibold mb-3 text-left">
              Nickname (Optional)
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              placeholder="What should we call you?"
              className="w-full p-4 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-[#0c0b1e] placeholder-[#7f7b9d] focus:border-[#7f7b9d] focus:outline-none transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-[#1d1c30] font-semibold mb-3 text-left">
              What brings you here today? (Optional)
            </label>
            <textarea
              value={formData.primaryConcern}
              onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
              placeholder="Share any concerns or questions you might have..."
              rows={4}
              className="w-full p-4 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-[#0c0b1e] placeholder-[#7f7b9d] focus:border-[#7f7b9d] focus:outline-none transition-all duration-300 resize-none"
            />
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and navigate to main app
      localStorage.setItem('manomitra-onboarding', JSON.stringify(formData));
      navigate('/know-your-child');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return formData.childAge !== '';
      case 2:
        return formData.language !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#3f3d5c] font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-[#3f3d5c] font-medium">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-4 shadow-lg">
                {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <h1 className="text-3xl font-bold text-[#0c0b1e] mb-2">
                {steps[currentStep].title}
              </h1>
              <p className="text-[#3f3d5c] text-lg">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="mb-8">
              {steps[currentStep].content}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 0
                    ? 'invisible'
                    : 'text-[#3f3d5c] hover:text-[#0c0b1e] hover:bg-white/20'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <motion.button
                onClick={nextStep}
                disabled={!canProceed()}
                whileHover={canProceed() ? { scale: 1.02 } : {}}
                whileTap={canProceed() ? { scale: 0.98 } : {}}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;