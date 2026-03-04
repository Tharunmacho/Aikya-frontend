import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, BarChart3, Settings, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "/projects", dropdown: [
    { label: "Projects", href: "/projects" }
  ]},
  { label: "Services", href: "/services" },
  { label: "About Us", href: "#about" },
  { label: "Special Offers", href: "#offers" },
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const storiesDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const { toast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (storiesDropdownRef.current && !storiesDropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    setActiveDropdown(null);
    if (href === "#") return; // Don't navigate for dropdown triggers
    if (href.startsWith("/")) {
      navigate(href);
    } else if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => handleNavClick("#home")} className="flex items-center gap-3 cursor-pointer">
          {/* Logo */}
          <div className="bg-gray-900 text-white px-4 py-2 rounded">
            <span className="font-heading text-xl font-bold">aikya</span>
          </div>
          <span className="font-body text-xs text-gray-600 hidden sm:block">Building Future</span>
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.href} className="relative" ref={link.label === "Our Stories" ? storiesDropdownRef : undefined}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  className="font-body text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 cursor-pointer flex items-center gap-1"
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === link.label && (
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
                            <span className="font-body text-sm text-gray-900">Manage Content</span>
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

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white md:hidden shadow-lg"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-gray-700 transition-colors hover:text-gray-900 text-left cursor-pointer"
                >
                  {link.label}
                </button>
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
                      Manage Content
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

