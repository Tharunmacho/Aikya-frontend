import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cmsItemsAPI } from "@/services/api";

// Helper to get the full image URL
const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative API path, prepend the backend API URL
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  if (imagePath.startsWith('/api/')) {
    // Remove /api prefix since API_BASE already includes it
    return API_BASE.replace('/api', '') + imagePath;
  }
  return imagePath;
};

const ProjectsLocationSection = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await cmsItemsAPI.getLocationCards();
        const sortedLocations = (response.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setLocations(sortedLocations);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleViewProject = (locationName: string) => {
    // Check if location is Chennai (case-insensitive)
    if (locationName.toLowerCase().includes('chennai')) {
      navigate('/projects/chennai');
    } else {
      // For other locations, navigate to general projects page
      navigate('/projects');
    }
  };

  if (loading || locations.length === 0) {
    return null;
  }
  return (
    <section className="section-padding bg-gray-100 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            Find your Perfect
          </h2>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Dream <span className="text-gray-500 italic">Home</span>
          </h3>
          <p className="mt-4 max-w-2xl mx-auto font-body text-gray-600 text-sm md:text-base">
            Explore our projects across prime locations. Select your preferred area and take the first step toward finding your ideal home
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-96">
                <img
                  src={getImageUrl(location.image)}
                  alt={location.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Location name overlay */}
                <div className="absolute top-8 left-0 right-0 text-center">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-wider">
                    {location.name}
                  </h3>
                </div>

                {/* Description and Project Count */}
                <div className="absolute bottom-24 left-0 right-0 text-center px-4">
                  <p className="text-white/90 font-body text-sm">{location.description}</p>
                  {location.projectCount > 0 && (
                    <p className="text-white/70 font-body text-xs mt-2">{location.projectCount} Projects</p>
                  )}
                </div>

                {/* View Project button */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                  <button 
                    onClick={() => handleViewProject(location.name)}
                    className="bg-white/95 backdrop-blur-sm px-10 py-4 rounded-full font-body font-semibold text-gray-900 hover:bg-white transition-all flex items-center gap-2 shadow-lg group-hover:shadow-xl"
                  >
                    View Project
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsLocationSection;
