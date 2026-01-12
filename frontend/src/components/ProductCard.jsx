import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiArrowRight } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ProductCard({
  product = {},
  onQuickView,
  loading = false,
}) {
  const [hovered, setHovered] = useState(false);

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

  return (
    <article
      className="
        group
        bg-slate-800
        border border-slate-700
        rounded-xl
        overflow-hidden
        transition
        hover:border-slate-600
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ===== IMAGE ===== */}
      <div className="relative h-56 bg-slate-700 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400?text=Product"}
          alt={name}
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.04]
          "
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400?text=Product")
          }
        />

        {/* Quick View (Intent-based) */}
        {hovered && onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="
              absolute inset-0
              bg-black/50
              flex items-center justify-center
              transition
            "
          >
            <span
              className="
                bg-slate-100
                text-slate-900
                px-5 py-2.5
                rounded-md
                text-sm font-medium
                flex items-center gap-2
                hover:bg-white
              "
            >
              <FiEye /> Quick view
            </span>
          </button>
        )}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-white font-medium text-base leading-snug line-clamp-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm line-clamp-2">
          {description}
        </p>

        {/* Price + Stock */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-semibold text-white">
            ₹{priceFormatted}
          </p>

          {stock > 0 ? (
            <div className="flex items-center gap-1 text-emerald-400 text-xs">
              <IoCheckmarkCircle />
              In stock
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-400 text-xs">
              <MdOutlineInventory2 />
              Out of stock
            </div>
          )}
        </div>

        {/* Action */}
        <Link
          to={_id ? `/product/${_id}` : "/"}
          className="
            mt-3
            w-full
            text-center
            bg-slate-100
            text-slate-900
            py-2.5
            rounded-md
            text-sm font-medium
            hover:bg-white
            transition
            flex items-center justify-center gap-2
          "
        >
          View details <FiArrowRight />
        </Link>
      </div>
    </article>
  );
}
