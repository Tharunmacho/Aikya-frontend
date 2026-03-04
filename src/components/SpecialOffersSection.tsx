import { motion } from "framer-motion";
import { BedDouble, Calendar, Maximize, Building2, ArrowRight, Phone, Instagram } from "lucide-react";
import specialOfferImage from "@/assets/hero-bg.jpg";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/services/api";

const SpecialOffersSection = () => {
  const [specialOffersData, setSpecialOffersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialOffersData = async () => {
      try {
        const response = await cmsAPI.getSpecialOffers();
        setSpecialOffersData(response.data);
      } catch (error) {
        console.error("Error fetching special offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialOffersData();
  }, []);

  if (loading || !specialOffersData) {
    return <div className="section-padding text-center">Loading...</div>;
  }

  return (
    <section id="offers" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            {specialOffersData.heading || 'Featured Project'} <span className="text-gray-500 italic">{specialOffersData.subheading || 'Special Offer'}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-body text-gray-600 text-sm md:text-base">
            {specialOffersData.description || "Don't miss out on our exclusive limited-time offers"}
          </p>
        </motion.div>

        {(specialOffersData.offers || []).map((offer: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-white mb-8"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Image */}
              <div className="relative h-[400px] md:h-auto">
                <img
                  src={offer.image || specialOfferImage}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded inline-block">
                    <span className="font-heading text-xl font-bold">aikya</span>
                  </div>
                  <p className="font-body text-xs text-white mt-1 bg-black/50 px-2 py-1 rounded">Building Future</p>
                </div>
                
                {/* Contact Numbers */}
                <div className="absolute bottom-6 left-6 space-y-2">
                  {(offer.contactNumbers || ['+91 9042 666 555', '+91 44 6009 6009']).map((phone: string, idx: number) => (
                    <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-black/90 transition-all">
                      <Phone className="h-4 w-4" />
                      <span className="font-body text-sm">{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <p className="font-body text-sm text-gray-500 italic mb-2">{offer.subtitle || 'Experience'}</p>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {offer.tagline || 'Modern Comfort'}
                    </h3>
                  </div>

                  <div>
                    <h4 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                      {offer.title}
                    </h4>
                  </div>

                  {/* Price & Description */}
                  {(offer.price || offer.description) && (
                    <div className="space-y-2">
                      {offer.price && (
                        <p className="font-heading text-xl font-bold text-[#F4B942]">{offer.price}</p>
                      )}
                      {offer.description && (
                        <p className="font-body text-sm text-gray-600">{offer.description}</p>
                      )}
                      {offer.discount && (
                        <div className="inline-block bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                          <p className="font-body text-xs font-semibold text-green-700">{offer.discount}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {(() => {
                      // Define default features with proper structure
                      const defaultFeatures = [
                        { icon: 'BedDouble', label: 'Configuration', value: '2 & 3 BHK' },
                        { icon: 'Building2', label: 'Total Units', value: '286 Units' },
                        { icon: 'Maximize', label: 'Area', value: '1200-1800 sq.ft' },
                        { icon: 'Calendar', label: 'Possession', value: 'Ready to Move' }
                      ];

                      // Use provided features or defaults
                      let featuresToShow = [];
                      
                      if (offer.features && Array.isArray(offer.features)) {
                        if (offer.features.length > 0 && typeof offer.features[0] === 'object') {
                          // Features are objects with label, value, icon
                          featuresToShow = offer.features.slice(0, 4);
                        } else {
                          // Features are strings, convert to objects
                          featuresToShow = offer.features.slice(0, 4).map((feat: string, i: number) => ({
                            icon: defaultFeatures[i]?.icon || 'Building2',
                            label: defaultFeatures[i]?.label || 'Feature',
                            value: feat
                          }));
                        }
                      } else {
                        featuresToShow = defaultFeatures;
                      }

                      return featuresToShow.map((feature: any, idx: number) => {
                        const IconComponent = 
                          feature.icon === 'BedDouble' ? BedDouble :
                          feature.icon === 'Calendar' ? Calendar :
                          feature.icon === 'Maximize' ? Maximize :
                          feature.icon === 'Building2' ? Building2 : Building2;
                        
                        return (
                          <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                            <div className="bg-white p-2.5 rounded-lg shadow-sm">
                              <IconComponent className="h-5 w-5 text-gray-700" />
                            </div>
                            <div className="flex-1">
                              <p className="font-body text-xs text-gray-500 mb-0.5">{feature.label}</p>
                              <p className="font-body text-sm font-bold text-gray-900 leading-tight">{feature.value}</p>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Additional Features List */}
                  {offer.features && Array.isArray(offer.features) && offer.features.length > 4 && typeof offer.features[0] === 'string' && (
                    <div className="pt-4">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="font-body text-xs font-semibold text-blue-900 mb-2">Additional Features:</p>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {offer.features.slice(4).map((feature: string, idx: number) => (
                            <li key={idx} className="font-body text-xs text-blue-800 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full bg-gray-900 text-white px-8 py-4 rounded-full font-body font-semibold hover:bg-gray-800 transition-all shadow-lg">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Instagram className="h-6 w-6 text-gray-900" />
              </a>
              <a
                href="https://wa.me/919042666555"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="tel:+919042666555"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Phone className="h-6 w-6 text-white" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffersSection;
