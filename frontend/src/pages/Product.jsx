import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import API from "../services/api";

export default function Product({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);



  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
  if (quantity > product.stock) {
    toast.error(`Only ${product.stock} items available`);
    return;
  }
  setAdding(true);
  onAddToCart(product, quantity);
  toast.success("Added to cart");
  setAdded(true);

  setTimeout(() => {
    setAdding(false);
    setAdded(false);
  }, 1200);
};

  /* ===== SKELETON ===== */
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--brand-bg)] px-4 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card-brand p-6">
            <div className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 w-1/2 bg-gray-100 rounded animate-pulse mt-4" />
            <div className="h-12 w-full bg-gray-100 rounded animate-pulse mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const priceFormatted = new Intl.NumberFormat("en-IN").format(product.price);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[var(--brand-muted)] hover:text-[var(--brand-text)] mb-8"
        >
          <FiArrowLeft /> Back to products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className="card-brand p-6">
            <div className="aspect-square w-full flex items-center justify-center">
              <img
                src={product.image || "https://via.placeholder.com/600"}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/600?text=Product")
                }
              />
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--brand-text)]">
                {product.name}
              </h1>
              <p className="text-[var(--brand-muted)] mt-2 max-w-xl">
                {product.description ||
                  "A thoughtfully designed product built for everyday reliability."}
              </p>
            </div>

            <div className="flex items-end gap-4">
              <p className="text-3xl font-semibold text-[var(--brand-text)]">
                ₹{priceFormatted}
              </p>
              <p className="text-[var(--brand-muted)] line-through">
                ₹{Math.round(product.price * 1.2)}
              </p>
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-[var(--brand-primary)] text-sm">
                <IoCheckmarkCircle />
                In stock ({product.stock})
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[var(--brand-danger)] text-sm">
                <MdOutlineInventory2 />
                Out of stock
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-[var(--brand-muted)] text-sm">
                Quantity
              </span>
              <div className="flex items-center border border-[var(--brand-border)] rounded-md bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[var(--brand-text)] hover:bg-gray-50"
                >
                  <FiMinus />
                </button>
                <span className="px-5 text-[var(--brand-text)] text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[var(--brand-text)] hover:bg-gray-50"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Actions */}
<div className="flex flex-col sm:flex-row gap-3 pt-2">
  {/* Add to Cart */}
  <button
    onClick={handleAddToCart}
    disabled={product.stock === 0 || adding}
    className="
      flex-1
      btn-primary
      py-3
      rounded-md
      font-medium
      transition
      flex items-center justify-center gap-2
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
  >
    <FiShoppingCart />
    {adding ? "Adding..." : added ? "Added ✓" : "Add to cart"}
  </button>

  {/* Wishlist */}
  <button
    type="button"
    className="
      flex-1
      border border-[var(--brand-border)]
      text-[var(--brand-text)]
      py-3
      rounded-md
      transition
      flex items-center justify-center gap-2
      cursor-pointer
      hover:border-[var(--brand-primary)]
      hover:text-[var(--brand-primary)]
      hover:bg-[rgba(0,137,123,0.06)]
    "
  >
    <FiHeart className="transition-transform group-hover:scale-105" />
    Wishlist
  </button>
</div>


            {/* Trust */}
            <div className="card-brand p-5 mt-6">
              <p className="font-medium text-[var(--brand-text)] mb-3">
                Why buy from us
              </p>
              <ul className="space-y-2 text-sm text-[var(--brand-muted)]">
                <li>• Free delivery on eligible orders</li>
                <li>• 30-day easy returns</li>
                <li>• Quality checked before shipping</li>
                <li>• Cash on delivery available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
