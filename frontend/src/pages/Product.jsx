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
    setTimeout(() => setAdding(false), 1200);
  };

  /* ---------------- REAL SKELETON ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 px-4 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Skeleton */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="aspect-square bg-slate-700 rounded-lg animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-700 rounded animate-pulse" />
            <div className="h-10 w-1/2 bg-slate-700 rounded animate-pulse mt-4" />
            <div className="h-12 w-full bg-slate-700 rounded animate-pulse mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const priceFormatted = new Intl.NumberFormat("en-IN").format(product.price);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
        >
          <FiArrowLeft /> Back to products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE (FIXED) */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
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
              <h1 className="text-3xl md:text-4xl font-semibold text-white">
                {product.name}
              </h1>
              <p className="text-slate-400 mt-2 max-w-xl">
                {product.description ||
                  "A thoughtfully designed product built for everyday reliability."}
              </p>
            </div>

            <div className="flex items-end gap-4">
              <p className="text-3xl font-semibold text-white">
                ₹{priceFormatted}
              </p>
              <p className="text-slate-500 line-through">
                ₹{Math.round(product.price * 1.2)}
              </p>
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <IoCheckmarkCircle />
                In stock ({product.stock})
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <MdOutlineInventory2 />
                Out of stock
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-slate-300 text-sm">Quantity</span>
              <div className="flex items-center border border-slate-600 rounded-md bg-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-300 hover:bg-slate-700"
                >
                  <FiMinus />
                </button>
                <span className="px-5 text-white text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-300 hover:bg-slate-700"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || adding}
                className="
                  flex-1
                  bg-slate-100
                  text-slate-900
                  py-3
                  rounded-md
                  font-medium
                  hover:bg-white
                  transition
                  flex items-center justify-center gap-2
                  disabled:opacity-50
                "
              >
                <FiShoppingCart />
                {adding ? "Adding..." : "Add to cart"}
              </button>

              <button
                className="
                  flex-1
                  border border-slate-600
                  text-slate-300
                  py-3
                  rounded-md
                  hover:bg-slate-800
                  transition
                  flex items-center justify-center gap-2
                "
              >
                <FiHeart /> Wishlist
              </button>
            </div>

            {/* Trust */}
            <div className="border border-slate-700 rounded-lg p-5 mt-6">
              <p className="text-white font-medium mb-3">Why buy from us</p>
              <ul className="space-y-2 text-sm text-slate-400">
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
