import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FiArrowRight } from "react-icons/fi";

export default function Home({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* ===== HERO (CREATIVE, NOT LOUD) ===== */}
      <section className="relative border-b border-slate-800 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-lS7UglnA-wCGKaJt0o4tWihX_pubIzgTA&s')",
          }}
        />

        {/* Dark Overlay (VERY IMPORTANT) */}
        <div className="absolute inset-0 bg-slate-900/70" />

        {/* Subtle Radial Light (creative touch) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_60%)]" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
            Shopping, redesigned for clarity and trust
          </h1>
          <p className="text-slate-300 mt-4 max-w-xl text-lg">
            Discover products in a calm, focused environment built for confident
            decisions.
          </p>
        </div>
      </section>

      {/* ===== FEATURE STRIP ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12 -mt-22 relative z-10">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          {[
            ["Curated Products", "Quality vetted items you can trust", "🧾"],
            ["Transparent Pricing", "Clear, honest prices — always", "💎"],
            ["Reliable Delivery", "Fast, trackable shipping", "🚚"],
          ].map(([title, desc, icon]) => (
            <div
              key={title}
              className="flex-1 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-4 hover:shadow-xl transition-transform duration-200 transform hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
                <span aria-hidden>{icon}</span>
              </div>

              <div>
                <p className="text-white font-semibold leading-tight">
                  {title}
                </p>
                <p className="text-slate-400 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCT SHELF (CREATIVE LAYOUT) ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Explore Products
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Handpicked for everyday needs
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingSkeleton key={i} type="card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ===== STORY SECTION (Creative, Minimal & Interactive) ===== */}
      <section className="relative border-t border-slate-800 overflow-hidden">
        {/* Background surface difference */}
        <div className="absolute inset-0 bg-slate-800/40" />

        {/* Subtle texture / depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.03),transparent_55%)]" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT — MESSAGE */}
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Built for thoughtful shoppers
            </h3>

            <p className="text-slate-400 mt-4 max-w-xl leading-relaxed">
              We design for clarity — calm interfaces, honest pricing, and
              dependable delivery — so you can shop with confidence, not
              distraction.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex items-center gap-4">
              <a
                href="/"
                className="
            inline-flex items-center gap-2
            bg-slate-100 text-slate-900
            px-5 py-3 rounded-md
            font-medium
            hover:bg-white
            transition
          "
              >
                Explore products
              </a>

              <button
                className="
            px-5 py-3
            border border-slate-700
            rounded-md
            text-slate-300
            hover:bg-slate-800
            transition
          "
              >
                Learn more
              </button>
            </div>

            {/* MICRO VALUES */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <p className="text-white font-medium">Calm interface</p>
                <p className="text-slate-400 text-sm mt-1">
                  Focus on what truly matters
                </p>
              </div>

              <div>
                <p className="text-white font-medium">Trusted sellers</p>
                <p className="text-slate-400 text-sm mt-1">
                  Verified quality & service
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — VISUAL ANCHOR */}
          {/* RIGHT — VISUAL ANCHOR */}
          <div className="relative">
            {/* Offset background layer */}
            <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-2xl translate-x-3 translate-y-3" />

            {/* Main card */}
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
                  alt="Thoughtful shopping experience"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-300 italic leading-relaxed">
                  “Every design decision here is intentional — to help users
                  focus on what matters.”
                </p>
                <p className="text-slate-400 text-sm mt-3">— Cartify Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-800 py-10 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 Cartify</p>
          <p>support@cartify.com</p>
        </div>
      </footer>
    </div>
  );
}
