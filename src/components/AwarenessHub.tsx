import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ExternalLink, Filter, Brain, Baby, Heart, Stethoscope } from 'lucide-react';

const AwarenessHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'neurological', label: 'Neurological', icon: Brain },
    { id: 'developmental', label: 'Developmental', icon: Baby },
    { id: 'pregnancy', label: 'Pregnancy', icon: Heart },
    { id: 'clinical', label: 'Clinical', icon: Stethoscope }
  ];

  const resources = [
    {
      title: "Understanding Autism Spectrum Disorders",
      category: "neurological",
      source: "BrainFacts.org",
      description: "Comprehensive guide to autism spectrum disorders, including early signs, diagnosis, and support strategies for families.",
      url: "https://www.brainfacts.org/diseases-and-disorders/neurological-disorders-az",
      tags: ["autism", "early detection", "behavioral signs"],
      readTime: "8 min read"
    },
    {
      title: "ADHD in Early Childhood",
      category: "neurological", 
      source: "Child Neurology Foundation",
      description: "Recognition and management of attention deficit hyperactivity disorder in children under 6 years old.",
      url: "https://www.childneurologyfoundation.org/support-for-patients-caregivers/",
      tags: ["adhd", "attention", "hyperactivity"],
      readTime: "6 min read"
    },
    {
      title: "Speech and Language Development Milestones",
      category: "developmental",
      source: "UCSF Benioff Children's Hospitals",
      description: "Detailed timeline of typical speech and language development from birth to 6 years, with red flags to watch for.",
      url: "https://www.ucsfbenioffchildrens.org/conditions/neurological-disorders",
      tags: ["speech", "language", "milestones"],
      readTime: "10 min read"
    },
    {
      title: "Motor Development and Delays",
      category: "developmental",
      source: "Cleveland Clinic",
      description: "Understanding normal motor development patterns and when to be concerned about delays.",
      url: "https://my.clevelandclinic.org/health/diseases/neurological-disorders",
      tags: ["motor skills", "physical development", "delays"],
      readTime: "7 min read"
    },
    {
      title: "Nutrition During Pregnancy for Brain Development",
      category: "pregnancy",
      source: "ACOG",
      description: "Essential nutrients for fetal brain development and how to ensure adequate intake during pregnancy.",
      url: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
      tags: ["pregnancy nutrition", "fetal development", "brain health"],
      readTime: "12 min read"
    },
    {
      title: "Folic Acid and Neural Tube Defects",
      category: "pregnancy",
      source: "WHO",
      description: "The critical role of folic acid in preventing neural tube defects and recommended supplementation guidelines.",
      url: "https://www.who.int/tools/elena/review-summaries/folate-periconceptional--effects-and-safety-of-periconceptional-oral-folate-supplementation-for-preventing-birth-defects",
      tags: ["folic acid", "neural tube defects", "prevention"],
      readTime: "9 min read"
    },
    {
      title: "Seizures in Children: What Parents Need to Know",
      category: "neurological",
      source: "NINDS",
      description: "Types of seizures in children, when to seek help, and how to provide appropriate care during episodes.",
      url: "https://www.ninds.nih.gov/health-information/disorders",
      tags: ["seizures", "epilepsy", "emergency care"],
      readTime: "11 min read"
    },
    {
      title: "Social-Emotional Development in Early Years",
      category: "developmental",
      source: "The Brain Charity",
      description: "How children develop emotional regulation, social skills, and what parents can do to support healthy development.",
      url: "https://www.thebraincharity.org.uk/get-help/list-neurological-conditions/",
      tags: ["social development", "emotional regulation", "behavior"],
      readTime: "8 min read"
    },
    {
      title: "Cerebral Palsy: Early Signs and Interventions",
      category: "neurological",
      source: "Medical News Today",
      description: "Understanding cerebral palsy, early warning signs, and the importance of early intervention services.",
      url: "https://www.medicalnewstoday.com/articles/neurological-disorders",
      tags: ["cerebral palsy", "early intervention", "motor disorders"],
      readTime: "13 min read"
    },
    {
      title: "Healthy Eating Guidelines for Pregnant Women",
      category: "pregnancy",
      source: "ACOG",
      description: "Comprehensive nutrition guidelines for expectant mothers to support both maternal and fetal health.",
      url: "https://www.acog.org/womens-health/faqs/healthy-eating",
      tags: ["healthy eating", "pregnancy diet", "maternal health"],
      readTime: "15 min read"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      neurological: 'from-purple-400 to-purple-600',
      developmental: 'from-blue-400 to-blue-600', 
      pregnancy: 'from-pink-400 to-pink-600',
      clinical: 'from-teal-400 to-teal-600'
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  };

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
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0c0b1e] mb-4">
            Awareness Hub
          </h1>
          <p className="text-xl text-[#3f3d5c] max-w-3xl mx-auto leading-relaxed">
            Access trusted, evidence-based information from leading medical organizations and research institutions
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7f7b9d] w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources, conditions, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-[#0c0b1e] placeholder-[#7f7b9d] focus:border-[#7f7b9d] focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white shadow-md'
                      : 'bg-white/20 text-[#3f3d5c] hover:bg-white/30 border border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-[#3f3d5c] text-center">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={`${resource.title}-${index}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Category Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(resource.category)} text-white text-sm font-medium mb-4`}>
                {resource.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0c0b1e] mb-3 group-hover:text-[#1d1c30] transition-colors leading-tight">
                {resource.title}
              </h3>

              {/* Source */}
              <p className="text-[#7f7b9d] font-semibold mb-3 text-sm">
                Source: {resource.source}
              </p>

              {/* Description */}
              <p className="text-[#3f3d5c] leading-relaxed mb-4 line-clamp-3">
                {resource.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/20 text-[#3f3d5c] rounded-lg text-xs font-medium border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <span className="text-[#7f7b9d] text-sm font-medium">
                  {resource.readTime}
                </span>
                
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#7f7b9d] hover:text-[#3f3d5c] font-semibold transition-colors group"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-[#7f7b9d] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-[#1d1c30] mb-2">No resources found</h3>
            <p className="text-[#3f3d5c]">
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 bg-gradient-to-r from-[#7f7b9d] to-[#b2a7d7] text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Trust Statement */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
        >
          <h3 className="text-lg font-semibold text-[#1d1c30] mb-3">
            Trusted Sources
          </h3>
          <p className="text-[#3f3d5c] leading-relaxed max-w-3xl mx-auto">
            All resources in our Awareness Hub are sourced from reputable medical organizations, 
            peer-reviewed research, and established healthcare institutions including WHO, ACOG, 
            NINDS, Cleveland Clinic, and other leading authorities in neurological and developmental health.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AwarenessHub;