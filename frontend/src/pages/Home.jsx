import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ITEMS_PER_PAGE = 8; // 2 rows × 4 columns

export default function Home({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  // Reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-[color:var(--brand-text)]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 py-28">
          <h1 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
            Shopping, redesigned for clarity and trust
          </h1>
          <p className="text-white/85 mt-4 max-w-xl text-lg">
            Thoughtfully curated products, transparent pricing, and a calm shopping
            experience built for confidence.
          </p>

          <div className="mt-8">
            <a
              href="#products"
              className="
                inline-flex items-center gap-2
                bg-white text-[var(--brand-primary-dark)]
                px-6 py-3 rounded-md
                font-medium
                hover:bg-gray-100
                transition
              "
            >
              Explore products
            </a>
          </div>
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
              className="
                flex-1
                card-brand
                p-6
                flex items-start gap-4
                hover:shadow-lg
                transition-transform duration-200
                transform hover:-translate-y-1
              "
            >
              <div
                className="
                  flex-shrink-0
                  w-12 h-12
                  rounded-full
                  bg-[var(--brand-primary)]
                  text-white
                  flex items-center justify-center
                  text-lg
                "
              >
                {icon}
              </div>

              <div>
                <p className="font-semibold text-[var(--brand-text)]">
                  {title}
                </p>
                <p className="text-sm text-[var(--brand-muted)] mt-1">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div id="products" className="mb-8">
          <h2 className="text-2xl font-semibold text-[var(--brand-text)]">
            Explore Products
          </h2>
          <p className="text-sm text-[var(--brand-muted)] mt-1">
            Handpicked for everyday needs
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingSkeleton key={i} type="card" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-lg font-medium text-[var(--brand-text)]">
              No products found
            </h3>
            <p className="text-sm text-[var(--brand-muted)] mt-2 max-w-sm">
              We couldn’t find any products matching your search.
              Try a different keyword.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            {/* ===== PAGINATION ===== */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="
                    px-4 py-2 rounded-md text-sm
                    border border-[var(--brand-border)]
                    text-[var(--brand-text)]
                    hover:bg-[rgba(255,255,255,0.04)]
                    disabled:opacity-40
                  "
                >
                  Previous
                </button>

                <span className="text-sm text-[var(--brand-muted)]">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="
                    px-4 py-2 rounded-md text-sm
                    border border-[var(--brand-border)]
                    text-[var(--brand-text)]
                    hover:bg-[rgba(255,255,255,0.04)]
                    disabled:opacity-40
                  "
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className="border-t border-[var(--brand-border)] bg-[color:var(--brand-text)]/5">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold text-[var(--brand-text)]">
              Built for thoughtful shoppers
            </h3>

            <p className="text-[var(--brand-muted)] mt-4 max-w-xl">
              We design for clarity — calm interfaces, honest pricing, and
              dependable delivery — so you can shop with confidence.
            </p>
          </div>

          <div className="card-brand overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
              alt="Shopping"
              className="w-full h-56 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[var(--brand-primary)] py-10 text-sm text-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <p>© 2026 Cartify.</p>
          <p>support@cartify.com</p>
        </div>
      </footer>
    </div>
  );
}
