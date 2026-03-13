import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cmsItemsAPI } from "@/services/api";
import images from "@/assets/imageAssets";
import { getImageUrl } from "@/utils/getImageUrl";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await cmsItemsAPI.getProjects();
        if (response.success && response.data) {
          setProjects(response.data);
          
          // Extract unique categories from projects
          const uniqueCategories = ["All", ...new Set(response.data.map((p: any) => p.category).filter(Boolean))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Helmet>
        <title>Projects | Aikya Builds Future - Our Portfolio</title>
        <meta
          name="description"
          content="Explore Aikya Builds Future's portfolio of 100+ successfully delivered projects across residential, commercial, and plot developments in Chennai."
        />
      </Helmet>

      <Navbar />
      <main className="pt-24">
        <section className="section-padding bg-navy-gradient">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                Our Portfolio
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
                Project <span className="text-gradient-gold">Highlights</span>
              </h1>
            </motion.div>

            {/* Filter tabs */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 flex flex-wrap justify-center gap-3"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-all ${
                      active === cat
                        ? "bg-primary text-primary-foreground glow-gold"
                        : "border border-border bg-card-glass text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="mt-12 text-center text-muted-foreground">
                Loading projects...
              </div>
            )}

            {/* Projects grid */}
            {!loading && (
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project) => (
                    <motion.div
                      key={project._id || project.name}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      className="group overflow-hidden rounded-xl bg-card-glass transition-all hover:glow-gold"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={getImageUrl(project.image) || images.projects.flatsAndApartments[0]}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="font-body text-sm">{project.location}</span>
                        </div>
                        {project.description && (
                          <p className="mt-2 font-body text-xs text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        {project.type && (
                          <p className="mt-1 font-body text-xs text-primary/80 capitalize">{project.type}</p>
                        )}
                        <span
                          className={`mt-3 inline-block rounded-full px-3 py-1 font-body text-xs font-semibold ${
                            project.status === "completed"
                              ? "bg-green-500/10 text-green-400"
                              : project.status === "ongoing"
                              ? "bg-primary/10 text-primary"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
