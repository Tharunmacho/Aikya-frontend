import { useState, useEffect } from "react";
import { Linkedin, Instagram, Youtube, Twitter, Facebook, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { cmsAPI } from "@/services/api";
import EnquiryDialog from "./EnquiryDialog";

const Footer = () => {
  const [footerData, setFooterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await cmsAPI.getFooter();
        if (response.success) {
          setFooterData(response.data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading || !footerData) {
    return null; // or a loading skeleton
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Enquire Now Section */}
      <div className="section-padding bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            We're here to guide<br />you-<span className="text-gray-500 italic">connect with us</span>
          </h2>
          <p className="font-body text-gray-600 text-base mb-8 max-w-2xl mx-auto">
            Have questions or need guidance? Our team is always ready to assist you with personalized support and expert advice. Reach out to us anytime—it's our pleasure to help you
          </p>
          <button 
            onClick={() => setEnquiryOpen(true)}
            className="bg-gray-900 text-white px-10 py-4 rounded-full font-body font-semibold hover:bg-gray-800 transition-all shadow-lg"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <div className="bg-gray-900 text-white px-4 py-2 rounded inline-block mb-2">
                  <span className="font-heading text-xl font-bold">aikya</span>
                </div>
                <p className="font-body text-xs text-gray-600">{footerData.tagline || 'Building Future'}</p>
              </div>
              <div className="space-y-3 font-body text-sm text-gray-600">
                <p className="font-semibold text-gray-900">{footerData.companyName || 'Aikya Builders and Promoters'}</p>
                <p dangerouslySetInnerHTML={{ __html: footerData.address?.replace(/\n/g, '<br />') || 'No.247/B, Velachery Main Road,<br />Selaiyur, Chennai, Tamil Nadu 600073, India' }}></p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-gray-900 mb-4">
                {footerData.links?.company?.[0]?.label || 'Home'}
              </h4>
              <ul className="space-y-2">
                {(footerData.links?.company || []).slice(1).map((l: any, idx: number) => (
                  <li key={idx}>
                    {l.href?.startsWith('/') ? (
                      <Link to={l.href} className="font-body text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="font-body text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <h4 className="font-heading font-semibold text-gray-900 mb-4">News</h4>
                <ul className="space-y-2">
                  {(footerData.links?.resources || []).map((l: any, idx: number) => (
                    <li key={idx}>
                      <Link to={l.href} className="font-body text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold text-gray-900 mb-4">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="font-body text-sm text-gray-600 space-y-1">
                    {(footerData.phone || []).map((phone: string, idx: number) => (
                      <p key={idx}>{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                  <a href={`mailto:${footerData.email || 'enquiry@aikyabuilders.com'}`} className="font-body text-sm text-gray-600 hover:text-gray-900">
                    {footerData.email || 'enquiry@aikyabuilders.com'}
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <div className="flex gap-3">
                  {(footerData.socialMedia || []).map((social: any, idx: number) => {
                    const IconComponent = social.icon === 'Instagram' ? Instagram :
                                        social.icon === 'Facebook' ? Facebook :
                                        social.icon === 'Linkedin' ? Linkedin :
                                        social.icon === 'Twitter' ? Twitter :
                                        social.icon === 'Youtube' ? Youtube : Instagram;
                    
                    return (
                      <a
                        key={idx}
                        href={social.url}
                        aria-label={social.platform}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-all hover:bg-gray-800"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-gray-500">
              {footerData.copyright || '© Aikya Builders and Promoters - Designed and Developed by Knowbin Technologies'}
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-xs text-gray-500 hover:text-gray-900">
                Terms & Conditions
              </a>
              <span className="text-gray-300">-</span>
              <a href="#" className="font-body text-xs text-gray-500 hover:text-gray-900">
                Privacy Policy
              </a>
            </div>
            <p className="font-body text-xs text-gray-500">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Enquiry Dialog */}
      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} />
    </footer>
  );
};

export default Footer;
