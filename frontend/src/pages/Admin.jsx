import { useEffect, useState } from "react";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiTrash2,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import API from "../services/api";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedOrderId, setExpandedOrderId] = useState(null); // ✅ single open
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // product to delete
  const [isDeleting, setIsDeleting] = useState(false);

  // Add product form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: 1,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await API.get("/orders");
        const productsRes = await API.get("/products");
        setOrders(ordersRes.data || []);
        setProducts(productsRes.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await API.delete(`/products/${deleteTarget._id}`);
      setProducts(prev => prev.filter(p => p._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed', err);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => setDeleteTarget(null);

  const toggleOrder = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Loading admin dashboard…
      </div>
    );
  }

  const revenueChartData = orders.slice(-7).map((o, i) => ({
  name: `#${i + 1}`,
  revenue: o.totalAmount,
}));

const orderVolumeData = orders.slice(-7).map((o, i) => ({
  name: `#${i + 1}`,
  items: o.products?.length || 0,
}));


  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h2 className="text-white text-xl font-semibold mb-10">
          Cartify Admin
        </h2>

        <nav className="space-y-1 text-sm">
          <SidebarItem icon={<FiGrid />} label="Dashboard" active={activeTab==="dashboard"} onClick={()=>setActiveTab("dashboard")} />
          <SidebarItem icon={<FiPackage />} label="Orders" active={activeTab==="orders"} onClick={()=>setActiveTab("orders")} />
          <SidebarItem icon={<FiShoppingBag />} label="Products" active={activeTab==="products"} onClick={()=>setActiveTab("products")} />
          <SidebarItem icon={<FiPlus />} label="Add product" active={activeTab==="add-product"} onClick={()=>setActiveTab("add-product")} />
        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-white mb-8 capitalize">
          {activeTab}
        </h1>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
  <>
    {/* ===== STATS ===== */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <Stat label="Revenue" value={`₹${totalRevenue}`} />
      <Stat label="Orders" value={orders.length} />
      <Stat label="Products" value={products.length} />
      <Stat
        label="Stock Units"
        value={products.reduce((s, p) => s + p.stock, 0)}
      />
    </div>

    {/* ===== CHARTS ===== */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <p className="text-white font-medium mb-4">Revenue trend</p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#4ade80"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-slate-400 text-xs mt-3">
          Last 7 orders revenue
        </p>
      </div>

      {/* Order Volume Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <p className="text-white font-medium mb-4">Order volume</p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orderVolumeData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="items"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-slate-400 text-xs mt-3">
          Items per order (recent)
        </p>
      </div>
    </div>
  </>
)}


        {/* ================= ORDERS ================= */}
        {activeTab === "orders" && (
  orders.length === 0 ? (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
      <p className="text-4xl mb-4">📦</p>
      <h3 className="text-lg font-semibold text-white">
        No orders yet
      </h3>
      <p className="text-slate-400 text-sm mt-2">
        Orders placed by customers will appear here.
      </p>
    </div>
  ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isOpen = expandedOrderId === order._id;
              const totalItems = order.products?.reduce((s,i)=>s+(i.quantity||1),0) || 0;

              return (
                <div
                  key={order._id}
                  className={`rounded-xl border transition
                    ${isOpen
                      ? "border-green-400 bg-slate-800"
                      : "border-slate-700 bg-slate-800"
                    }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleOrder(order._id)}
                    className="w-full p-5 text-left hover:bg-slate-700/40 transition"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-slate-400 text-xs">Order</p>
                        <p className="text-white font-mono">#{order._id.slice(-6)}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Items</p>
                        <p className="text-white">{totalItems}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Amount</p>
                        <p className="text-white">₹{order.totalAmount}</p>
                      </div>
                      <div className="hidden md:block text-slate-300">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex justify-end text-slate-400">
                        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t border-slate-700 bg-slate-900/40">
                      <div className="p-5 space-y-3">
                        {order.products?.map((item,i)=>{
                          const product = typeof item.productId==="object"
                            ? item.productId
                            : products.find(p=>p._id===item.productId);

                          return (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-800 border border-slate-700 rounded-lg p-4">
                              <div className="h-16 bg-slate-700 rounded overflow-hidden">
                                {product?.image && <img src={product.image} className="w-full h-full object-cover" />}
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-white">{product?.name || "Removed product"}</p>
                                <p className="text-slate-400 text-sm">₹{product?.price || 0}</p>
                              </div>
                              <div className="text-center text-white">Qty: {item.quantity||1}</div>
                              <div className="text-right text-white">
                                ₹{(product?.price||0)*(item.quantity||1)}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="border-t border-slate-700 bg-slate-800 p-4 flex justify-between text-sm">
                        <span className="text-slate-400">Items: {totalItems}</span>
                        <span className="text-white font-medium">₹{order.totalAmount}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
  )
        )}

        {/* ===== PRODUCTS ===== */}
        {activeTab === "products" && (
  products.length === 0 ? (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
      <p className="text-4xl mb-4">🛒</p>
      <h3 className="text-lg font-semibold text-white">
        No products available
      </h3>
      <p className="text-slate-400 text-sm mt-2">
        Add products to start selling in your store.
      </p>
    </div>
  ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-white font-medium">{p.name}</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Stock: {p.stock}
                  </p>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="mt-4 w-full text-sm text-red-400 border border-red-500/30 rounded-md py-2 hover:bg-red-500/10 flex items-center justify-center"
                    >
                      <FiTrash2 className="inline mr-2" />
                      Delete
                    </button>
                </div>
              </div>
            ))}
          </div>
  )
        )}

        {/* ===== ADD PRODUCT ===== */}
        {activeTab === "add-product" && (
          <div className="max-w-xl bg-slate-800 border border-slate-700 rounded-xl p-6">
            <form className="space-y-5" onSubmit={async (e) => { e.preventDefault();
              setIsAdding(true);
              try {
                const payload = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock || 0) };
                const res = await API.post('/products', payload);
                setProducts(prev => [res.data, ...prev]);
                setAddedProduct(res.data);
                setFormData({ name: '', description: '', price: '', image: '', stock: 1 });
              } catch (err) {
                console.error('Add product failed', err);
              } finally {
                setIsAdding(false);
              }
            }}>
              <input
                value={formData.name}
                onChange={(e)=>setFormData(prev=>({...prev,name:e.target.value}))}
                placeholder="name"
                required
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-slate-500"
              />

              <input
                value={formData.price}
                onChange={(e)=>setFormData(prev=>({...prev,price:e.target.value}))}
                placeholder="price"
                required
                type="number"
                step="0.01"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-slate-500"
              />

              <input
                value={formData.image}
                onChange={(e)=>setFormData(prev=>({...prev,image:e.target.value}))}
                placeholder="image url"
                required
                type="url"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-slate-500"
              />

              <input
                value={formData.stock}
                onChange={(e)=>setFormData(prev=>({...prev,stock:e.target.value}))}
                placeholder="stock"
                required
                type="number"
                min="0"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-slate-500"
              />

              <textarea
                value={formData.description}
                onChange={(e)=>setFormData(prev=>({...prev,description:e.target.value}))}
                placeholder="description"
                rows="4"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-slate-500"
              />

              <button type="submit" disabled={isAdding} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md font-medium">
                {isAdding ? 'Adding…' : 'Add product'}
              </button>
            </form>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700">
              <h3 className="text-lg font-bold text-white">Delete product</h3>
              <p className="text-slate-400 mt-2">Are you sure you want to delete <strong className="text-white">{deleteTarget.name}</strong>? This action cannot be undone.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={cancelDelete} className="px-4 py-2 rounded-md bg-slate-700 text-slate-200">No, keep</button>
                <button onClick={confirmDelete} disabled={isDeleting} className="px-4 py-2 rounded-md bg-red-600 text-white">{isDeleting ? 'Deleting…' : 'Yes, delete'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Add success modal */}
        {addedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700 text-center">
              <h3 className="text-xl font-bold text-white">Product added</h3>
              <p className="text-slate-400 mt-2">"{addedProduct.name}" was added successfully.</p>
              <div className="mt-6">
                <button onClick={()=>setAddedProduct(null)} className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white">OK</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}



/* ===== UI HELPERS ===== */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition
        ${active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
