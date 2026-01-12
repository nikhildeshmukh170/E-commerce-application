import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";

export default function Navbar({ cartCount = 0, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (value) => {
    setSearch(value);
    setSearchTerm(value); // 🔥 THIS IS THE KEY
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur border-b border-slate-800"
            : "bg-slate-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white font-semibold text-xl tracking-wide">
            Cartify<span className="text-slate-400">.</span>
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:block flex-1 mx-10">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search for products"
                className="
                  w-full pl-9 pr-4 py-2
                  bg-slate-800
                  border border-slate-700
                  rounded-md
                  text-sm text-white
                  placeholder-slate-400
                  focus:outline-none focus:border-slate-500
                "
              />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="text-slate-300 hover:text-white">
              Explore
            </Link>

            <Link
              to="/login"
              className="text-slate-300 hover:text-white flex items-center gap-1"
            >
              <FiUser /> Login
            </Link>

            <Link to="/cart" className="relative text-slate-300 hover:text-white">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-100 text-slate-900 text-xs px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden text-slate-300"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* MOBILE SEARCH */}
        {open && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-3">
            <input
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search products"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white"
            />

            <Link to="/" onClick={() => setOpen(false)} className="block text-slate-300">
              Explore
            </Link>

            <Link to="/login" onClick={() => setOpen(false)} className="block text-slate-300">
              Login
            </Link>

            <Link to="/cart" onClick={() => setOpen(false)} className="block text-slate-300">
              Cart ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
