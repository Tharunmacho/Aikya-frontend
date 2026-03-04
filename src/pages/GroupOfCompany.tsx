import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/services/api";

const GroupOfCompany = () => {
  const [groupData, setGroupData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await cmsAPI.getGroupCompany();
        setGroupData(response.data);
      } catch (error) {
        console.error("Error fetching group company:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupData();
  }, []);

  if (loading || !groupData) {
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
        <title>Group of Companies | Aikya Builds Future</title>
        <meta
          name="description"
          content="Explore Aikya's child companies, dedicated to innovation and excellence, shaping a brighter future."
        />
      </Helmet>

      <Navbar />
      <FloatingContactButtons />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {groupData.heading || 'Our Extended'} <span className="text-gray-500">{groupData.subheading || 'Vision'}</span>
              </h1>
              <p className="font-body text-gray-600 text-lg max-w-3xl mx-auto">
                {groupData.description || 'Explore our child companies, dedicated to innovation and excellence, shaping a brighter future.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Companies List */}
        {(groupData.companies || []).map((company: any, index: number) => (
          <section key={index} className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="mx-auto max-w-7xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Images */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  {(company.images || []).slice(0, 3).map((img: string, imgIndex: number) => (
                    <div key={imgIndex} className={imgIndex === 2 ? 'pt-8' : 'space-y-4'}>
                      <img
                        src={img}
                        alt={company.name}
                        className={`rounded-3xl shadow-lg w-full object-cover ${
                          imgIndex === 0 ? 'h-48' : imgIndex === 1 ? 'h-56' : 'h-full'
                        }`}
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
                    {company.name}
                  </h2>
                  
                  <p className="font-body text-gray-600 leading-relaxed">
                    {company.description}
                  </p>

                  {company.highlights && company.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {company.highlights.map((highlight: string, hIndex: number) => (
                        <li key={hIndex} className="font-body text-gray-600 flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
   </>
  );
};

export default GroupOfCompany;
