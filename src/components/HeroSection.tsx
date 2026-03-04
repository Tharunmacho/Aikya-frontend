import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/services/api";

const stats = [
  { value: "100+", label: "Projects Completed by the Company in the Year of Journey" },
  { value: "20+", label: "Years of experience in this industry" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: 'Building The Future',
    subtitle: 'With Aikya',
    tagline: '',
    description: 'Affordable housing, luxury villas, integrated townships, and cutting-edge infrastructure — built with quality, safety, and precision to meet your aspirations.',
    buttonText: 'Contact Us',
    buttonLink: '#contact',
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await cmsAPI.getHero();
        if (response.success && response.data) {
          setHeroData(response.data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background - Right side building image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5">
          <img 
            src={heroBg} 
            alt="Modern building" 
            className="h-full w-full object-cover opacity-90" 
          />
          {/* Overlay with callouts */}
          <div className="absolute top-1/4 right-1/4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg hidden lg:block">
            <p className="text-xs text-gray-700">Timely delivery with best-<br />in-class safety standards.</p>
          </div>
          <div className="absolute top-1/2 left-1/4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg hidden lg:block">
            <p className="text-xs text-gray-700">Creating integrated<br />communities for modern living.</p>
          </div>
          <div className="absolute bottom-1/4 right-1/3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg hidden lg:block">
            <p className="text-xs text-gray-700">Modern techniques and<br />sustainable designs.</p>
          </div>
        </div>
      </div>

      {/* Trust badge */}
      <div className="absolute bottom-16 right-8 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl hidden md:block">
        <p className="text-xs text-gray-600 mb-2">Trusted by families</p>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
            <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
          </div>
          <p className="text-xs font-semibold text-gray-800">5.8k+ more</p>
        </div>
      </div>

      {/* Content - Left side */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20">
        <div className="flex flex-col items-start max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900"
          >
            {heroData.title}
            <br />
            <span className="text-gray-500 italic">{heroData.subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-xl font-body text-sm md:text-base text-gray-600 leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8"
          >
            <a
              href={heroData.buttonLink}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 font-body font-semibold text-white transition-all hover:bg-gray-800 shadow-xl text-sm md:text-base"
            >
              {heroData.buttonText}
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <p className="text-xs md:text-sm text-gray-600 mb-3">Join Our Community</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-all hover:bg-primary"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="font-heading text-4xl md:text-5xl font-bold text-gray-900 italic">
                {stat.value}
              </div>
              <div className="mt-1 font-body text-xs md:text-sm text-gray-600 leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
