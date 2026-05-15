import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Login from "./Login";
import Register from "./Register";
import adminIcon from "../assets/adminIcon.png";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", scrollTo: "hero" },
    { name: "Movies", path: "/rooms" }, // Updated Hotels → Movies
    { name: "Experience", scrollTo: "testimonial" },
    { name: "About", scrollTo: "footer" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setFirstLetter("");
    setRole("");
    navigate("/");
  };

  const loadUserFromLocalStorage = () => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    setRole(storedRole || "");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setFirstLetter(parsed.name?.[0]?.toUpperCase() || "");
      } catch (err) {
        console.error("Error parsing stored user", err);
        setFirstLetter("");
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const solidPaths = ["/rooms", "/my-bookings", "/payment", "/confirmation"];
      const isSolid =
        solidPaths.some((p) => location.pathname.startsWith(p)) ||
        location.pathname.startsWith("/admin");
      setIsScrolled(window.scrollY > 10 || isSolid);
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };

    loadUserFromLocalStorage();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("storage", loadUserFromLocalStorage);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("storage", loadUserFromLocalStorage);
    };
  }, [location.pathname]);

  const handleScrollTo = (target) => {
    if (location.pathname === "/") {
      navigate(`/?scrollTo=${target}`, { replace: true });
    } else {
      navigate(`/?scrollTo=${target}`);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6 text-white"
        }`}
      >
        <Link to="/">
          <img
            src={assets.logo}
            alt="GoCine"
            className={`h-9 ${isScrolled ? "invert opacity-80" : ""}`}
          />
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() =>
                link.path ? navigate(link.path) : handleScrollTo(link.scrollTo)
              }
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  isScrolled ? "bg-gray-700" : "bg-white"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          <img
            src={assets.searchIcon}
            alt="search"
            className={`h-7 ${isScrolled ? "invert" : ""}`}
          />

          {/* === USER DROPDOWN === */}
          {role === "user" && (
            <div ref={dropdownRef} className="relative">
              <div
                title="User"
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold cursor-pointer"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                {firstLetter || "U"}
              </div>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm z-50">
                  <Link
                    to="/my-bookings"
                    onClick={() => setShowUserDropdown(false)}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === ADMIN DROPDOWN === */}
          {role === "admin" && (
            <div ref={dropdownRef} className="relative">
              <img
                src={adminIcon}
                alt="Admin"
                className="h-9 w-9 rounded-full border cursor-pointer hover:scale-105 transition"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              />
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm z-50">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setShowUserDropdown(false)}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!role && (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-black text-white px-8 py-2.5 rounded-full"
            >
              Login
            </button>
          )}
        </div>

        <div className="flex md:hidden items-center gap-3">
          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            src={assets.menuIcon}
            alt="menu"
            className={`h-4 ${isScrolled ? "invert" : ""}`}
          />
        </div>
      </nav>

      {/* === MOBILE SLIDE MENU === */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close" className="h-6.5" />
        </button>
        {navLinks.map((link, i) => (
          <button
            key={i}
            onClick={() => {
              setIsMenuOpen(false);
              link.path ? navigate(link.path) : handleScrollTo(link.scrollTo);
            }}
          >
            {link.name}
          </button>
        ))}
        {role === "user" && (
          <>
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-lg">
              {firstLetter || "U"}
            </div>
            <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)}>
              My Bookings
            </Link>
          </>
        )}
        {role === "admin" && (
          <>
            <img src={adminIcon} alt="admin" className="h-10 w-10 rounded-full border" />
            <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
              Admin Dashboard
            </Link>
          </>
        )}
        {!role && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setShowLogin(true);
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full"
          >
            Login
          </button>
        )}
        {role && (
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="text-sm text-red-600 border border-red-600 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        )}
      </div>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={() => {
            setShowLogin(false);
            setShowUserDropdown(false);
            window.dispatchEvent(new Event("storage"));
            navigate("/rooms");
          }}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default NavBar;
