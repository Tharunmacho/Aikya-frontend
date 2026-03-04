import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState, useEffect } from "react";
import { cmsItemsAPI } from "@/services/api";
import { Calendar, ArrowRight } from "lucide-react";
import images from "@/assets/imageAssets";

const News = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await cmsItemsAPI.getArticles({ status: 'published' });
        setArticles(response.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsData();
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
        <title>Our Latest Stories | Aikya Builds Future</title>
        <meta
          name="description"
          content="Stay informed with the latest developments, achievements, and stories from Aikya Builds Future."
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
                Our Latest <span className="text-gray-500">Stories</span>
              </h1>
              <p className="font-body text-lg text-gray-600 max-w-3xl mx-auto">
                Stay informed with the latest developments, achievements, and stories from our journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* News Articles Grid */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any, index: number) => (
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
                      src={article.image || images.projects.flatsAndApartments[0]}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{article.publishedDate ? new Date(article.publishedDate).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    <p className="font-body text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt || article.description}
                    </p>
                    <button className="flex items-center gap-2 text-gray-900 font-body font-semibold hover:gap-3 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
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

export default News;
