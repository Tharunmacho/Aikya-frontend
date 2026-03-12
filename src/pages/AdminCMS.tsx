import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Home, 
  FileText, 
  Building2, 
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Star,
  Tag,
  Wrench,
  Newspaper,
  Heart,
  PartyPopper,
  UserPlus,
  Globe,
  LayoutDashboard,
  Settings
} from "lucide-react";
import { cmsAPI } from "@/services/api";
import { NewsManagement, ProjectsManagement, ServicesManagement, CSRManagement, EventsManagement, CareersManagement, TestimonialsManagement, SpecialOffersManagement, FooterManagement, LeadershipManagement, WhyChooseManagement, LocationCardsManagement } from "@/components/cms";

const AdminCMS = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [contentExpanded, setContentExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    tagline: '',
    buttonText: '',
    buttonLink: '',
  });

  const [aboutData, setAboutData] = useState({
    heading: '',
    content: '',
  });

  const [projectsData, setProjectsData] = useState({
    heading: '',
    description: '',
    projects: [],
  });

  const [testimonialsData, setTestimonialsData] = useState({
    heading: '',
    testimonials: [],
  });

  const [specialOffersData, setSpecialOffersData] = useState({
    heading: '',
    subheading: '',
    offers: [],
  });

  const [servicesData, setServicesData] = useState({
    heading: '',
    description: '',
    services: [],
  });

  const [footerData, setFooterData] = useState({
    companyName: '',
    tagline: '',
    address: '',
    phone: [],
    email: '',
  });

  const [newsData, setNewsData] = useState({
    heading: '',
    description: '',
    articles: [],
  });

  const [csrData, setCSRData] = useState({
    heading: '',
    description: '',
    initiatives: [],
  });

  const [eventsData, setEventsData] = useState({
    heading: '',
    description: '',
    events: [],
  });

  const [careersData, setCareersData] = useState({
    heading: '',
    description: '',
    openings: [],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Access Denied", 
        description: "Please login to access the CMS",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Access Denied", 
        description: "You don't have admin privileges to access this page",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }
    
    fetchAllContent();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchAllContent = async () => {
    try {
      const [
        heroRes, 
        aboutRes, 
        projectsRes,
        testimonialsRes,
        specialOffersRes,
        servicesRes,
        footerRes,
        newsRes,
        csrRes,
        eventsRes,
        careersRes
      ] = await Promise.all([
        cmsAPI.getHero(),
        cmsAPI.getAbout(),
        cmsAPI.getProjects(),
        cmsAPI.getTestimonials(),
        cmsAPI.getSpecialOffers(),
        cmsAPI.getServices(),
        cmsAPI.getFooter(),
        cmsAPI.getNews(),
        cmsAPI.getCSR(),
        cmsAPI.getEvents(),
        cmsAPI.getCareers(),
      ]);

      setHeroData(heroRes.data);
      setAboutData(aboutRes.data);
      setProjectsData(projectsRes.data);
      setTestimonialsData(testimonialsRes.data);
      setSpecialOffersData(specialOffersRes.data);
      setServicesData(servicesRes.data);
      setFooterData(footerRes.data);
      setNewsData(newsRes.data);
      setCSRData(csrRes.data);
      setEventsData(eventsRes.data);
      setCareersData(careersRes.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    }
  };

  const updateHero = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateHero(heroData);
      toast({
        title: "Success!",
        description: "Hero section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAbout = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateAbout(aboutData);
      toast({
        title: "Success!",
        description: "About section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProjects = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateProjects(projectsData);
      toast({
        title: "Success!",
        description: "Projects section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonials = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateTestimonials(testimonialsData);
      toast({
        title: "Success!",
        description: "Testimonials section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSpecialOffers = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateSpecialOffers(specialOffersData);
      toast({
        title: "Success!",
        description: "Special Offers section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateServices = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateServices(servicesData);
      toast({
        title: "Success!",
        description: "Services section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFooter = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateFooter(footerData);
      toast({
        title: "Success!",
        description: "Footer section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateNews = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateNews(newsData);
      toast({
        title: "Success!",
        description: "News section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCSR = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateCSR(csrData);
      toast({
        title: "Success!",
        description: "CSR section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEvents = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateEvents(eventsData);
      toast({
        title: "Success!",
        description: "Events section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCareers = async () => {
    setLoading(true);
    try {
      await cmsAPI.updateCareers(careersData);
      toast({
        title: "Success!",
        description: "Careers section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800/50 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Admin Dashboard</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome to the admin dashboard. Use the sidebar to navigate to different sections.
              </p>
            </div>
          </div>
        );

      case 'hero':
        return (
          <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Edit Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                <Textarea
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  rows={3}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subtitle</label>
                <Input
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tagline</label>
                <Input
                  value={heroData.tagline}
                  onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Button Text</label>
                <Input
                  value={heroData.buttonText}
                  onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Button Link</label>
                <Input
                  value={heroData.buttonLink}
                  onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <Button onClick={updateHero} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2" size={18} />
                Save Hero Section
              </Button>
            </CardContent>
          </Card>
        );

      case 'about':
        return (
          <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Edit About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Heading</label>
                <Input
                  value={aboutData.heading}
                  onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Content</label>
                <Textarea
                  value={aboutData.content}
                  onChange={(e) => setAboutData({ ...aboutData, content: e.target.value })}
                  rows={6}
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <Button onClick={updateAbout} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2" size={18} />
                Save About Section
              </Button>
            </CardContent>
          </Card>
        );

      case 'news-manage':
        return <NewsManagement />;

      case 'projects-manage':
        return <ProjectsManagement />;

      case 'services-manage':
        return <ServicesManagement />;

      case 'csr-manage':
        return <CSRManagement />;

      case 'events-manage':
        return <EventsManagement />;

      case 'careers-manage':
        return <CareersManagement />;

      case 'testimonials':
        return <TestimonialsManagement />;

      case 'specialoffers':
        return <SpecialOffersManagement />;

      case 'leadership':
        return <LeadershipManagement />;

      case 'whychoose':
        return <WhyChooseManagement />;

      case 'locations':
        return <LocationCardsManagement />;

      case 'footer':
        return <FooterManagement />;

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Aikya Builders</title>
        <meta name="description" content="Content Management System" />
      </Helmet>

      <div className="flex h-screen bg-slate-100 dark:bg-navy-gradient relative overflow-hidden">
        {/* Cosmic Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-glow/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="stars absolute inset-0"></div>
        </div>
        {/* Sidebar */}
        <div className="w-64 bg-white/95 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-800/50 flex flex-col relative z-10">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-800/50">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800/50 relative">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.fullName || 'Admin User'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
              </div>
              <ChevronDown size={16} className={`text-slate-500 dark:text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                <button
                  onClick={() => {
                    navigate('/admin-cms');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors rounded-t-lg"
                >
                  <Settings size={16} />
                  <span>Management</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors rounded-b-lg"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-6">
              {/* Main Section */}
              <div>
                <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">MAIN</h3>
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </button>
              </div>

              {/* Content Section */}
              <div>
                <button
                  onClick={() => setContentExpanded(!contentExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <span>CONTENT</span>
                  {contentExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {contentExpanded && (
                  <div className="mt-2 space-y-1">
                    <button
                      onClick={() => setActiveSection('hero')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'hero'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <FileText size={18} />
                      <span>Hero Section</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('about')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'about'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <FileText size={18} />
                      <span>About Us</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('news-manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'news-manage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Newspaper size={18} />
                      <span>News Manager</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('projects-manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'projects-manage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Building2 size={18} />
                      <span>Projects Manager</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('services-manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'services-manage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Wrench size={18} />
                      <span>Services Manager</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('csr-manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'csr-manage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Heart size={18} />
                      <span>CSR Manager</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('events-manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'events-manage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <PartyPopper size={18} />
                      <span>Events Manager</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('careers-manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'careers-manage'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <UserPlus size={18} />
                      <span>Careers Manager</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('testimonials')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'testimonials'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Star size={18} />
                      <span>Testimonials</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('specialoffers')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'specialoffers'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Tag size={18} />
                      <span>Special Offers</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('leadership')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'leadership'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <UserPlus size={18} />
                      <span>Leadership</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('whychoose')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'whychoose'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Star size={18} />
                      <span>Why Choose Us</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('locations')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'locations'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Globe size={18} />
                      <span>Location Cards</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('footer')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === 'footer'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Settings size={18} />
                      <span>Footer</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          {/* Top Bar */}
          <div className="h-16 bg-white/95 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50 flex items-center justify-between px-6">
            <div>
              <h2 className="text-xl font-semibold text-white capitalize">
                {activeSection === 'dashboard' ? 'Dashboard' : 
                 activeSection === 'hero' ? 'Hero Section' :
                 activeSection === 'about' ? 'About Section' :
                 activeSection === 'news-manage' ? 'News Management' :
                 activeSection === 'projects-manage' ? 'Projects Management' :
                 activeSection === 'services-manage' ? 'Services Management' :
                 activeSection === 'csr-manage' ? 'CSR Management' :
                 activeSection === 'events-manage' ? 'Events Management' :
                 activeSection === 'careers-manage' ? 'Careers Management' :
                 activeSection === 'testimonials' ? 'Testimonials' :
                 activeSection === 'specialoffers' ? 'Special Offers' :
                 activeSection === 'leadership' ? 'Leadership Team' :
                 activeSection === 'whychoose' ? 'Why Choose Us' :
                 activeSection === 'locations' ? 'Location Cards' :
                 activeSection === 'footer' ? 'Footer' :
                 activeSection}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {renderMainContent()}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default AdminCMS;




