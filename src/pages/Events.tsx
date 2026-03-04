import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState, useEffect } from "react";
import { cmsItemsAPI } from "@/services/api";
import { Calendar, MapPin, Clock } from "lucide-react";
import images from "@/assets/imageAssets";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await cmsItemsAPI.getEvents();
        setEvents(response.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 section-padding text-center">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Events | Aikya Builds Future</title>
        <meta
          name="description"
          content="Discover our events that shape communities and foster connections at Aikya Builds Future."
        />
      </Helmet>

      <Navbar />
      <FloatingContactButtons />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Experience Our <span className="text-gray-500">Events</span>
              </h1>
              <p className="font-body text-lg text-gray-600 max-w-3xl mx-auto">
                Discover our events that shape communities and foster connections
              </p>
            </motion.div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8">
              {events.map((event: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={event.image || images.events[0]}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    <p className="font-body text-gray-600 mb-6">
                      {event.description}
                    </p>
                    <div className="space-y-3">
                      {event.date && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span className="font-body text-sm">{event.date}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span className="font-body text-sm">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <span className="font-body text-sm">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Events;
