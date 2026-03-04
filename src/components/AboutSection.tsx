import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/services/api";
import images from "@/assets/imageAssets";

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "95%", label: "Success Rate" },
  { value: "20+", label: "Years Experience" },
  { value: "50+", label: "Active Partners" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const AboutSection = () => {
  const [aboutData, setAboutData] = useState({
    heading: 'The Responsible Builder of India',
    content: 'Aikya Builders Pvt. Ltd. is a trusted real estate and construction company based in Chennai — delivering quality residential and commercial developments with unwavering commitment, precision, and customer focus. For over 20 years, we have been transforming dreams into landmark addresses across the city.',
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await cmsAPI.getAbout();
        if (response.success && response.data) {
          setAboutData(response.data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={images.projects.flatsAndApartments[0]}
                alt="Modern building"
                className="h-full w-full object-cover"
              />
              {/* Logo overlay */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg shadow-xl">
                    <span className="font-heading text-4xl font-bold">aikya</span>
                    <p className="text-xs mt-1 tracking-wider">Building Future</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {aboutData.heading.includes('Responsible') ? (
                <>
                  The Responsible<br />
                  Builder of <span className="text-gray-500 italic">India</span>
                </>
              ) : (
                aboutData.heading
              )}
            </h2>
            <p className="mt-4 font-body text-gray-600 text-sm md:text-base leading-relaxed">
              {aboutData.content}
            </p>

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="font-heading text-2xl md:text-3xl font-bold text-gray-900 italic">
                    {stat.value}
                  </div>
                  <p className="mt-1 font-body text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10"
            >
              <a
                href="#about"
                className="inline-flex items-center gap-2 font-body text-gray-900 font-semibold hover:gap-4 transition-all"
              >
                Know more about Aikya
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
