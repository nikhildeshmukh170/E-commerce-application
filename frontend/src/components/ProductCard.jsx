import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiArrowRight } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import LoadingSkeleton from "./LoadingSkeleton";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1585386959984-a41552231692?q=80&w=800&auto=format&fit=crop";

export default function ProductCard({
  product = {},
  onQuickView,
  loading = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (loading) return <LoadingSkeleton type="card" />;

  const {
    _id,
    image,
    name = "Unnamed Product",
    description = "High quality product built for everyday use.",
    price = 0,
    stock = 0,
  } = product;

  const priceFormatted = new Intl.NumberFormat("en-IN").format(price);

  const imageSrc = !image || imgError ? DEFAULT_IMAGE : image;

  return (
    <article
      className="
        group
        card-brand
        rounded-xl
        overflow-hidden
        transition
        hover:shadow-md
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ===== IMAGE ===== */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
        />

        {/* Quick View */}
        {hovered && onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="
              absolute inset-0
              bg-black/40
              flex items-center justify-center
              transition
            "
          >
            <span
              className="
                bg-white
                text-gray-900
                px-5 py-2.5
                rounded-md
                text-sm font-medium
                flex items-center gap-2
                hover:bg-gray-100
              "
            >
              <FiEye /> Quick view
            </span>
          </button>
        )}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-[var(--brand-text)] font-medium text-base line-clamp-2">
          {name}
        </h3>

        <p className="text-[var(--brand-muted)] text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-semibold text-[var(--brand-text)]">
            ₹{priceFormatted}
          </p>

          {stock > 0 ? (
            <div className="flex items-center gap-1 text-[var(--brand-primary)] text-xs">
              <IoCheckmarkCircle />
              In stock
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[var(--brand-danger)] text-xs">
              <MdOutlineInventory2 />
              Out of stock
            </div>
          )}
        </div>

        <Link
          to={_id ? `/product/${_id}` : "/"}
          className="
            mt-3
            w-full
            btn-primary
            py-2.5
            rounded-md
            text-sm font-medium
            flex items-center justify-center gap-2
          "
        >
          View details <FiArrowRight />
        </Link>
      </div>
    </article>
  );
}
