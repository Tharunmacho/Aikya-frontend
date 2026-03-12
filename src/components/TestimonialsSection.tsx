import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cmsItemsAPI } from "@/services/api";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await cmsItemsAPI.getTestimonials();
        setTestimonials(response.data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="section-padding text-center">Loading...</div>;
  }

  // Don't render if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            What Our Clients Say
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            we create spaces that transform lives and possibilities
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <p className="max-w-3xl mx-auto font-body text-gray-600 text-sm md:text-base leading-relaxed mb-12">
            Our clients are at the heart of everything we do.
          </p>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="font-body text-sm text-gray-700 italic mb-6 text-left">
                  "{testimonial.content || testimonial.message}"
                </p>
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-heading font-bold text-gray-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-gray-900">{testimonial.name}</p>
                    {(testimonial.role || testimonial.company) && (
                      <p className="font-body text-xs text-gray-500">
                        {testimonial.role}{testimonial.role && testimonial.company && ' • '}{testimonial.company}
                      </p>
                    )}
                    {testimonial.location && !testimonial.role && !testimonial.company && (
                      <p className="font-body text-xs text-gray-500">{testimonial.location}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
