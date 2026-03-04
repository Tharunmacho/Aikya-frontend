import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Shield, MessageCircle, Heart, Palette, Star, Award, TrendingUp, Users } from "lucide-react";
import { cmsItemsAPI } from "@/services/api";

// Icon mapping
const iconMap: any = {
  Clock,
  Shield,
  MessageCircle,
  Heart,
  Palette,
  Star,
  Award,
  TrendingUp,
  Users,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const WhyChooseSection = () => {
  const [reasons, setReasons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await cmsItemsAPI.getWhyChooseReasons();
        const sortedReasons = (response.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setReasons(sortedReasons);
      } catch (error) {
        console.error('Failed to fetch reasons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReasons();
  }, []);

  if (loading || reasons.length === 0) {
    return null;
  }

  return (
    <section id="why-us" className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-gray-500 italic">Aikya</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-4 max-w-2xl mx-auto font-body text-gray-600 text-sm md:text-base">
            Experience the difference with our commitment to quality, innovation, and customer satisfaction
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r, i) => {
            const IconComponent = iconMap[r.icon] || Star;
            return (
              <motion.div
                key={r._id}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl bg-white p-8 transition-all hover:shadow-xl border border-gray-100"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white transition-colors">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900">{r.title}</h3>
                <p className="mt-2 font-body text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
