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
    setSearchTerm(value);
  };

  return (
    <header
      data-scrolled={scrolled}
      className="brand-header sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-wide"
          >
            <img
              src="/cartify.svg"
              alt="Cartify logo"
              className="h-8 w-8"
            />
            <span>
              Cartify<span className="opacity-70">.</span>
            </span>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:block flex-1 mx-10">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-[var(--brand-muted-2)]" />
              <input
                value={search}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search products"
                className="
                  w-full pl-9 pr-4 py-2
                  rounded-md text-sm
                  bg-black/30
                  border border-[var(--brand-border)]
                  text-[var(--brand-foreground)]
                  placeholder-[var(--brand-muted-2)]
                  focus:outline-none focus:border-white/30
                "
              />
            </div>
          </div>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link className="opacity-80 hover:opacity-100" to="/">
              Explore
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-1 opacity-80 hover:opacity-100"
            >
              <FiUser />
              Login
            </Link>

            <Link to="/cart" className="relative opacity-80 hover:opacity-100">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-2 -right-2
                    text-xs font-medium
                    px-1.5 py-0.5 rounded-full
                    bg-white
                    text-[var(--brand-primary-dark)]
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden opacity-80 hover:opacity-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[var(--brand-border)] py-4 space-y-3">
            <input
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search products"
              className="
                w-full px-4 py-2 rounded-md text-sm
                bg-black/30
                border border-[var(--brand-border)]
                text-[var(--brand-foreground)]
                placeholder-[var(--brand-muted-2)]
                focus:outline-none
              "
            />

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block opacity-80 hover:opacity-100"
            >
              Explore
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block opacity-80 hover:opacity-100"
            >
              Login
            </Link>

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="block opacity-80 hover:opacity-100"
            >
              Cart ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
