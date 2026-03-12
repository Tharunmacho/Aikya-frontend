import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowLeft, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cmsItemsAPI } from "@/services/api";
import { chennaiAreaImages, areaDisplayNames } from "@/assets/chennaiImages";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Helper to get the full image URL
const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  // Already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  // Relative /api/ path — works via Vite proxy locally, and as relative URL in production
  if (imagePath.startsWith('/api/')) return imagePath;
  return imagePath;
};

const ChennaiProjects = () => {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [useLocalImages, setUseLocalImages] = useState(false);

  // Fetch projects from CMS
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await cmsItemsAPI.getProjects();
        if (response.success && response.data) {
          // Filter only Chennai area projects
          const chennaiProjects = response.data.filter((p: any) => 
            p.area && ['tambaram', 'perugalathur', 'hastinapuram', 'gudavancherry', 'chithlapakam'].includes(p.area)
          );
          
          if (chennaiProjects.length > 0) {
            setProjects(chennaiProjects);
            setUseLocalImages(false);
          } else {
            // Fallback to local images
            console.log('No Chennai projects in CMS, using local images');
            setUseLocalImages(true);
            generateLocalProjects();
          }
        } else {
          setUseLocalImages(true);
          generateLocalProjects();
        }
      } catch (error) {
        console.error('Error fetching Chennai projects:', error);
        setUseLocalImages(true);
        generateLocalProjects();
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const generateLocalProjects = () => {
    const areas = Object.keys(chennaiAreaImages) as Array<keyof typeof chennaiAreaImages>;
    const localProjects = areas.flatMap((area) => 
      chennaiAreaImages[area].map((img: string, index: number) => ({
        _id: `${area}-${index + 1}`,
        name: `${areaDisplayNames[area]} Project ${index + 1}`,
        location: `${areaDisplayNames[area]}, Chennai`,
        area: area,
        image: img,
        status: index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'ongoing' : 'upcoming',
        category: 'residential'
      }))
    );
    setProjects(localProjects);
  };

  const areas = useLocalImages 
    ? Object.keys(chennaiAreaImages)
    : [...new Set(projects.map(p => p.area))];

  const filteredProjects = activeArea === "all" 
    ? projects 
    : projects.filter(p => p.area === activeArea);

  const getAreaProjectCount = (area: string) => {
    return projects.filter(p => p.area === area).length;
  };

  const getAreaDisplayName = (area: string) => {
    return areaDisplayNames[area as keyof typeof areaDisplayNames] || area;
  };

  return (
    <>
      <Helmet>
        <title>Chennai Projects | Aikya Builds Future</title>
        <meta
          name="description"
          content="Explore our premium residential and commercial projects across Chennai - Tambaram, Perugalathur, Hastinapuram, Gudavancherry, and Chithlapakam."
        />
      </Helmet>

      <Navbar />
      <main className="pt-24">
        <section className="section-padding bg-navy-gradient">
          <div className="mx-auto max-w-7xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-body text-sm">Back to Home</span>
              </button>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                Chennai Portfolio
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl text-white">
                Explore Our <span className="text-gradient-gold">Chennai</span> Projects
              </h1>
              <p className="mt-4 max-w-2xl mx-auto font-body text-gray-400 text-sm md:text-base">
                Discover our premium developments across prime locations in Chennai
              </p>
            </motion.div>

            {/* Area Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <button
                onClick={() => setActiveArea("all")}
                className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-all ${
                  activeArea === "all"
                    ? "bg-primary text-primary-foreground glow-gold"
                    : "border border-border bg-card-glass text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                All Areas
              </button>
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setActiveArea(area)}
                  className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-all ${
                    activeArea === area
                      ? "bg-primary text-primary-foreground glow-gold"
                      : "border border-border bg-card-glass text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {getAreaDisplayName(area)}
                  <span className="ml-2 text-xs opacity-70">
                    ({getAreaProjectCount(area)})
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Loading state */}
            {loading && (
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="mt-4 text-gray-400 font-body">Loading Chennai projects...</p>
              </div>
            )}

            {/* Projects grid */}
            {!loading && (
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project._id || project.id}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      className="group overflow-hidden rounded-2xl bg-card-glass backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/20 cursor-pointer border border-border/50 hover:border-primary/30"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={getImageUrl(project.image)}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/10 backdrop-blur-md rounded-full p-4">
                            <ImageIcon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-gray-400">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="font-body text-sm">{project.location}</span>
                        </div>
                        {project.description && (
                          <p className="mt-3 font-body text-sm text-gray-400 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                          <span
                            className={`inline-block rounded-full px-4 py-1.5 font-body text-xs font-semibold ${
                              project.status === "completed"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : project.status === "ongoing"
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            }`}
                          >
                            {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-gray-400 font-body text-lg">No projects found in this area.</p>
                <p className="text-gray-500 font-body text-sm mt-2">Try selecting a different area</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(selectedImage)}
                alt="Project detail"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChennaiProjects;
