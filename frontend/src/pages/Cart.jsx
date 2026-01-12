import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingCart,
  FiCheck,
} from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import API from "../services/api";

export default function Cart({ cart, updateQuantity, removeFromCart, setCart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = Math.floor(total * 0.1);
  const finalTotal = total - discount;

  const handleClearCart = () => {
    if (window.confirm("Clear entire cart?")) {
      setCart([]);
      toast.success("Cart cleared");
    }
  };

  const placeOrder = async () => {
    setIsProcessing(true);
    try {
      await API.post("/orders", {
        products: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        totalAmount: finalTotal,
      });

      setOrderPlaced(true);
      setCart([]);
      toast.success("Order placed successfully");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      toast.error("Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
            <FiShoppingCart className="text-slate-300" size={26} />
            Shopping Cart
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {cart.length} item{cart.length !== 1 && "s"}
          </p>
        </div>

        {/* Success */}
        {orderPlaced && (
          <div className="mb-6 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4 flex items-center gap-2 text-emerald-300">
            <MdCheckCircle size={20} />
            Order placed successfully. Redirecting…
          </div>
        )}

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-16 text-center">
            <div className="text-5xl mb-5">🛍️</div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-400 mb-6">
              Add items to continue shopping
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 font-medium py-3 px-6 rounded-md hover:bg-white transition"
            >
              Continue Shopping
              <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition"
                >
                  <div className="flex gap-5">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-md overflow-hidden border border-slate-600">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/96?text=Product")
                        }
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4">
                        Stock: {item.product.stock}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-6">
                        {/* Price */}
                        <div>
                          <p className="text-xs text-slate-400">Price</p>
                          <p className="text-lg font-semibold text-emerald-400">
                            ₹{item.product.price}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center border border-slate-600 rounded-md bg-slate-700">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 text-slate-300 hover:bg-slate-600"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-4 text-sm font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                            disabled={item.quantity >= item.product.stock}
                            className="px-3 py-1 text-slate-300 hover:bg-slate-600 disabled:opacity-50"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                          <p className="text-xs text-slate-400">Total</p>
                          <p className="text-lg font-semibold text-white">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="p-2 rounded-md text-red-400 hover:bg-red-500/10 transition"
                      title="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
              >
                <FiTrash2 /> Clear cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-white mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-slate-700 pb-5 mb-5 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Discount</span>
                    <span className="text-emerald-400 font-medium">
                      -₹{discount}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="text-emerald-400 font-medium">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-white">Total</span>
                  <span className="text-2xl font-semibold text-white">
                    ₹{finalTotal}
                  </span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={isProcessing}
                  className="w-full bg-slate-100 text-slate-900 font-medium py-3 rounded-md hover:bg-white transition disabled:opacity-50"
                >
                  {isProcessing ? "Processing…" : "Place Order"}
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-3 border border-slate-600 text-slate-300 py-3 rounded-md hover:bg-slate-700 transition flex items-center justify-center gap-2"
                >
                  <FiArrowRight className="rotate-180" />
                  Continue Shopping
                </button>

                <div className="mt-6 space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> Secure payment
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> Easy returns
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> COD available
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
