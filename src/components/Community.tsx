import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Plus, Search, Filter, Clock, Reply } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');

  const forumTopics = [
    {
      id: 1,
      title: "Speech delay concerns - when to seek help?",
      author: "Sarah M.",
      category: "Speech Development",
      replies: 12,
      likes: 8,
      lastActivity: "2 hours ago",
      content: "My 2-year-old is only saying a few words. Other parents, when did you decide to consult a speech therapist?",
      tags: ["speech delay", "2 years old", "early intervention"]
    },
    {
      id: 2,
      title: "Celebrating small victories - first steps!",
      author: "Mike T.",
      category: "Motor Development",
      replies: 18,
      likes: 24,
      lastActivity: "4 hours ago",
      content: "After months of cruising, our little one finally took her first independent steps yesterday! 💕",
      tags: ["first steps", "motor development", "celebration"]
    },
    {
      id: 3,
      title: "Managing toddler meltdowns - strategies that work",
      author: "Jennifer L.",
      category: "Behavior & Emotions",
      replies: 31,
      likes: 15,
      lastActivity: "6 hours ago",
      content: "Looking for gentle parenting approaches for dealing with my 3-year-old's big emotions.",
      tags: ["toddler behavior", "emotional regulation", "parenting tips"]
    },
    {
      id: 4,
      title: "Nutrition during pregnancy - folate sources",
      author: "Emma K.",
      category: "Pregnancy & Nutrition",
      replies: 9,
      likes: 11,
      lastActivity: "8 hours ago",
      content: "Beyond supplements, what are your favorite folate-rich foods? Looking for recipe ideas!",
      tags: ["pregnancy nutrition", "folate", "healthy recipes"]
    },
    {
      id: 5,
      title: "Sensory play ideas for busy parents",
      author: "David R.",
      category: "Activities & Play",
      replies: 22,
      likes: 19,
      lastActivity: "1 day ago",
      content: "Quick and easy sensory activities that don't require lots of prep or cleanup?",
      tags: ["sensory play", "quick activities", "busy parents"]
    },
    {
      id: 6,
      title: "Building confidence as a new parent",
      author: "Lisa C.",
      category: "Parental Support",
      replies: 14,
      likes: 20,
      lastActivity: "1 day ago",
      content: "First-time parent here feeling overwhelmed. How do you trust your instincts?",
      tags: ["new parent", "confidence", "support"]
    }
  ];

  const supportGroups = [
    {
      id: 1,
      name: "First Time Parents",
      members: 1247,
      description: "Support and encouragement for parents navigating their first parenting journey",
      category: "General Support",
      isPrivate: false
    },
    {
      id: 2,
      name: "Speech Development Support",
      members: 892,
      description: "Parents sharing experiences and resources for children with speech and language delays",
      category: "Development",
      isPrivate: false
    },
    {
      id: 3,
      name: "Expecting Parents Circle",
      members: 634,
      description: "Support for expectant parents preparing for their little one's arrival",
      category: "Pregnancy",
      isPrivate: false
    },
    {
      id: 4,
      name: "Sensory Processing Support",
      members: 523,
      description: "Resources and community for families navigating sensory processing differences",
      category: "Special Needs",
      isPrivate: true
    },
    {
      id: 5,
      name: "Working Parent Balance",
      members: 756,
      description: "Balancing career and parenting responsibilities with practical tips and support",
      category: "Lifestyle",
      isPrivate: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'speech', label: 'Speech Development' },
    { id: 'motor', label: 'Motor Development' },
    { id: 'behavior', label: 'Behavior & Emotions' },
    { id: 'pregnancy', label: 'Pregnancy & Nutrition' },
    { id: 'activities', label: 'Activities & Play' },
    { id: 'support', label: 'Parental Support' }
  ];

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
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">
            Community
          </h1>
          <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
            Connect with other parents, share experiences, and find support in our caring community
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
        >
          {[
            { id: 'discussions', label: 'Discussions', icon: MessageCircle },
            { id: 'groups', label: 'Support Groups', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-lg'
                    : 'text-[#3f3d5c] hover:bg-white/20 hover:text-[#0c0b1e]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7f7b9d] w-5 h-5" />
              <input
                type="text"
                placeholder={activeTab === 'discussions' ? "Search discussions..." : "Search groups..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-[#0c0b1e] placeholder-[#7f7b9d] focus:border-[#7f7b9d] focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center space-x-2 px-4 py-3 bg-white/20 text-[#3f3d5c] rounded-xl border border-white/20 hover:bg-white/30 transition-all duration-300">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-4 h-4" />
                <span>{activeTab === 'discussions' ? 'New Post' : 'Create Group'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {forumTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white text-sm font-medium rounded-full">
                          {topic.category}
                        </span>
                        <span className="text-[#7f7b9d] text-sm font-medium">
                          by {topic.author}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#0c0b1e] mb-3 group-hover:text-[#1d1c30] transition-colors">
                        {topic.title}
                      </h3>
                      
                      <p className="text-[#3f3d5c] leading-relaxed mb-4">
                        {topic.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {topic.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/20 text-[#3f3d5c] rounded-lg text-xs font-medium border border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-[#7f7b9d]">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Reply className="w-4 h-4" />
                        <span>{topic.replies} replies</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>{topic.likes} likes</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7f7b9d] to-[#b2a7d7] mb-4 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-[#0c0b1e] group-hover:text-[#1d1c30] transition-colors">
                        {group.name}
                      </h3>
                      {group.isPrivate && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                          Private
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[#7f7b9d] font-medium text-sm mb-1">
                      {group.members.toLocaleString()} members
                    </p>
                    
                    <span className="text-xs bg-white/20 text-[#3f3d5c] px-2 py-1 rounded-full border border-white/10">
                      {group.category}
                    </span>
                  </div>
                  
                  <p className="text-[#3f3d5c] leading-relaxed text-center mb-6">
                    {group.description}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-[#3f3d5c] to-[#7f7b9d] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                    {group.isPrivate ? 'Request to Join' : 'Join Group'}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-6">
            <Heart className="w-12 h-12 text-[#7f7b9d] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#1d1c30] mb-4">Community Guidelines</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">💝</div>
              <h4 className="font-semibold text-[#1d1c30] mb-2">Be Kind & Supportive</h4>
              <p className="text-[#3f3d5c]">We're all on this journey together. Offer encouragement and understanding.</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-[#1d1c30] mb-2">Respect Privacy</h4>
              <p className="text-[#3f3d5c]">Keep personal information private and respect others' boundaries.</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🩺</div>
              <h4 className="font-semibold text-[#1d1c30] mb-2">No Medical Advice</h4>
              <p className="text-[#3f3d5c]">Share experiences, but always consult healthcare professionals for medical concerns.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Community;