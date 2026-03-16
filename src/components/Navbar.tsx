import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, BarChart3, Settings, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cmsAPI } from "@/services/api";

const BRAND_LOGO = "/aikya-logo.svg";
const BRAND_FAVICON = "/aikya-logo.svg?v=20260316";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "#about" },
  { label: "Our Stories", href: "#", dropdown: [
    { label: "Group of Company", href: "/group-of-company" },
    { label: "Partner with Us", href: "/partner-with-us" },
    { label: "News", href: "/news" },
    { label: "CSR", href: "/csr" },
    { label: "Events", href: "/events" },
    { label: "Careers", href: "/careers" },
  ]},
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>("Aikya");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeDesktopDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const { toast } = useToast();
  const desktopNavLinks = isAdmin
    ? [
        ...navLinks,
        { label: "Management", href: "#", dropdown: [{ label: "Dashboard", href: "/admin-cms" }] },
      ]
    : navLinks;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (activeDesktopDropdownRef.current && !activeDesktopDropdownRef.current.contains(event.target as Node)) {
        setActiveDesktopDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const response = await cmsAPI.getFooter();
        const companyName = response?.data?.companyName || "Aikya";

        setSiteName(companyName);

        const iconLinks = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
        iconLinks.forEach((link) => {
          (link as HTMLLinkElement).href = BRAND_FAVICON;
        });
      } catch (error) {
        console.error('Failed to fetch branding:', error);
      }
    };

    fetchBranding();
  }, []);

  // Get user initials from full name
  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveDesktopDropdown(null);
    setActiveMobileDropdown(null);
    if (href === "#") return; // Don't navigate for dropdown triggers
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        sessionStorage.setItem("pendingScrollTarget", href);
        navigate("/");
        return;
      }

      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (href.startsWith("/")) {
      navigate(href);
    } else if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") return;

    const pendingScrollTarget = sessionStorage.getItem("pendingScrollTarget");
    if (!pendingScrollTarget) return;

    const scrollToTarget = () => {
      const targetElement = document.querySelector(pendingScrollTarget);
      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("pendingScrollTarget");
    };

    const timeoutId = window.setTimeout(scrollToTarget, 100);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => handleNavClick("/")}
          className="hidden md:flex items-center cursor-pointer"
          aria-label="Go to homepage"
        >
          <img
            src={BRAND_LOGO}
            alt={siteName}
            className="h-12 w-auto object-contain"
          />
        </button>

        {/* Mobile toggle - LEFT SIDE */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <button
          onClick={() => handleNavClick("/")}
          className="md:hidden flex items-center"
          aria-label="Go to homepage"
        >
          <img
            src={BRAND_LOGO}
            alt={siteName}
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Offers Button - Desktop and Mobile */}
        <button
          onClick={() => handleNavClick("#offers")}
          className="md:hidden flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-body text-sm font-semibold transition-all shadow-md"
        >
          <span className="text-lg">🎁</span>
          Offers
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:ml-auto md:flex">
          {/* Special Offers Button - Desktop */}
          <button
            onClick={() => handleNavClick("#offers")}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-body text-sm font-semibold transition-all shadow-md"
          >
            <span className="text-lg">🎁</span>
            Offers
          </button>
          
          {desktopNavLinks.map((link) => (
            link.dropdown ? (
              <div key={link.label} className="relative" ref={activeDesktopDropdown === link.label ? activeDesktopDropdownRef : undefined}>
                <button
                  onClick={() => setActiveDesktopDropdown(activeDesktopDropdown === link.label ? null : link.label)}
                  className="font-body text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 cursor-pointer flex items-center gap-1"
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDesktopDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDesktopDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      {link.dropdown.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block w-full text-left px-4 py-3 font-body text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 cursor-pointer"
              >
                {link.label}
              </button>
            )
          ))}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Avatar Button */}
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {getUserInitials(user.fullName)}
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                      {/* User Email */}
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <BarChart3 size={20} className="text-gray-700" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="font-body text-sm text-gray-900 font-medium truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2 bg-white">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleNavClick("/dashboard");
                          }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                        >
                          <LayoutDashboard size={18} className="text-gray-600" />
                          <span className="font-body text-sm text-gray-900">Dashboard</span>
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              handleNavClick("/admin-cms");
                            }}
                            className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                          >
                            <Settings size={18} className="text-gray-600" />
                            <span className="font-body text-sm text-gray-900">Admin Dashboard</span>
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                        >
                          <LogOut size={18} className="text-gray-600" />
                          <span className="font-body text-sm text-gray-900">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className="rounded-lg border-2 border-gray-900 px-5 py-2.5 font-body text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/contact-us")}
                  className="rounded-full bg-gray-900 px-6 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-gray-800 cursor-pointer"
                >
                  Contact Us
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white md:hidden shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {desktopNavLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.label} className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.label ? null : link.label)}
                      className="font-body text-gray-700 transition-colors hover:text-gray-900 text-left cursor-pointer font-semibold flex items-center justify-between"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeMobileDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeMobileDropdown === link.label && (
                      <div className="pl-4 flex flex-col gap-2">
                        {link.dropdown.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="font-body text-sm text-gray-600 transition-colors hover:text-gray-900 text-left cursor-pointer py-1"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="font-body text-gray-700 transition-colors hover:text-gray-900 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                )
              ))}
              {isAuthenticated && user ? (
                <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
                  {/* User Email in mobile */}
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center font-bold text-white">
                      {getUserInitials(user.fullName)}
                    </div>
                    <p className="font-body text-sm text-gray-900 font-medium">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavClick("/dashboard");
                      setIsOpen(false);
                    }}
                    className="w-full rounded-lg border-2 border-gray-900 px-5 py-2.5 text-left font-body text-sm font-semibold text-gray-900 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        handleNavClick("/admin-cms");
                        setIsOpen(false);
                      }}
                      className="w-full rounded-lg border-2 border-gray-900 px-5 py-2.5 text-left font-body text-sm font-semibold text-gray-900 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                    >
                      <Settings size={18} />
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-left font-body text-sm font-semibold text-white cursor-pointer flex items-center gap-2 hover:bg-red-700"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="mt-2 rounded-lg border-2 border-gray-900 px-5 py-2.5 text-center font-body text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick("/contact-us")}
                    className="rounded-full bg-gray-900 px-5 py-2.5 text-center font-body text-sm font-semibold text-white cursor-pointer hover:bg-gray-800"
                  >
                    Contact Us
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

