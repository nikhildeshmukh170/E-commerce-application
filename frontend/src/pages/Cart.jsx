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
    <div className="min-h-screen bg-[var(--brand-bg)] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[var(--brand-text)] flex items-center gap-2">
            <FiShoppingCart size={26} />
            Shopping Cart
          </h1>
          <p className="text-[var(--brand-muted)] text-sm mt-1">
            {cart.length} item{cart.length !== 1 && "s"}
          </p>
        </div>

        {/* Success */}
        {orderPlaced && (
          <div className="mb-6 card-brand p-4 flex items-center gap-2 text-[var(--brand-primary)]">
            <MdCheckCircle size={20} />
            Order placed successfully. Redirecting…
          </div>
        )}

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="card-brand p-16 text-center">
            <div className="text-5xl mb-5">🛍️</div>
            <h2 className="text-2xl font-semibold text-[var(--brand-text)] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[var(--brand-muted)] mb-6">
              Add items to continue shopping
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-md"
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
                  className="card-brand p-5 transition hover:shadow-md"
                >
                  <div className="flex gap-5">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-md overflow-hidden border border-[var(--brand-border)]">
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
                      <h3 className="text-lg font-semibold text-[var(--brand-text)]">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-[var(--brand-muted)] mb-4">
                        Stock: {item.product.stock}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-6">
                        {/* Price */}
                        <div>
                          <p className="text-xs text-[var(--brand-muted)]">
                            Price
                          </p>
                          <p className="text-lg font-semibold text-[var(--brand-primary)]">
                            ₹{item.product.price}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center border border-[var(--brand-border)] rounded-md bg-white">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 hover:bg-gray-50"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-4 text-sm font-medium">
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
                            className="px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                          <p className="text-xs text-[var(--brand-muted)]">
                            Total
                          </p>
                          <p className="text-lg font-semibold text-[var(--brand-text)]">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="
                        p-2 rounded-md
                        text-[var(--brand-danger)]
                        hover:bg-[rgba(198,40,40,0.08)]
                        transition
                      "
                      title="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-sm text-[var(--brand-danger)] hover:opacity-80"
              >
                <FiTrash2 /> Clear cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-brand p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-[var(--brand-border)] pb-5 mb-5 text-sm">
                  <div className="flex justify-between text-[var(--brand-muted)]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[var(--brand-text)]">
                      ₹{total}
                    </span>
                  </div>
                  <div className="flex justify-between text-[var(--brand-muted)]">
                    <span>Discount</span>
                    <span className="font-medium text-[var(--brand-primary)]">
                      -₹{discount}
                    </span>
                  </div>
                  <div className="flex justify-between text-[var(--brand-muted)]">
                    <span>Shipping</span>
                    <span className="font-medium text-[var(--brand-primary)]">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-[var(--brand-text)]">
                    Total
                  </span>
                  <span className="text-2xl font-semibold text-[var(--brand-text)]">
                    ₹{finalTotal}
                  </span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={isProcessing}
                  className="w-full btn-primary py-3 rounded-md disabled:opacity-50"
                >
                  {isProcessing ? "Processing…" : "Place Order"}
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="
                    w-full mt-3
                    border border-[var(--brand-border)]
                    py-3 rounded-md
                    hover:bg-gray-50
                    transition
                    flex items-center justify-center gap-2
                  "
                >
                  <FiArrowRight className="rotate-180" />
                  Continue Shopping
                </button>

                <div className="mt-6 space-y-2 text-sm text-[var(--brand-muted)]">
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-[var(--brand-primary)]" /> Secure
                    payment
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-[var(--brand-primary)]" /> Easy
                    returns
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-[var(--brand-primary)]" /> COD
                    available
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
