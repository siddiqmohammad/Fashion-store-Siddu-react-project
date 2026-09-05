import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { isAdmin } from "../utils/auth";

function getBudget(price) {
  if (Number(price) <= 1500) return "Low";
  if (Number(price) <= 3000) return "Medium";
  return "High";
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const admin = isAdmin();

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    const res = await api.get("/products");
    setProducts(res.data);
  }

  async function deleteProduct(id) {
    if (!admin) return;
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = products.filter(p =>
      (category === "All" || p.category === category) &&
      (budget === "All" || getBudget(p.price) === budget) &&
      (!term || `${p.name} ${p.category} ${p.type} ${p.color} ${p.matchingOutfit || ""}`.toLowerCase().includes(term))
    );

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "featured") result.sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [products, category, budget, search, sort]);

  return (
    <main className="shop-page">
      <div className="page-intro">
        <p className="eyebrow">THE SIDDU'S THREAD COLLECTION</p>
        <h1>Shop <em>your style.</em></h1>
        <p>Explore curated pieces, model looks and ready-to-wear outfit pairings.</p>
        {admin && <span className="admin-note">Admin mode: you can add, edit and delete products.</span>}
      </div>

      <div className="toolbar">
        <div className="chips">
          {["All", "Women", "Men", "Accessories", "Footwear"].map(c => (
            <button key={c} className={category === c ? "chip active" : "chip"} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>

        <div className="toolbar-right">
          <input className="search" placeholder="Search by style, colour..." value={search} onChange={e => setSearch(e.target.value)} />
          <select value={budget} onChange={e => setBudget(e.target.value)} title="Filter by price"><option value="All">Any price</option><option value="Low">Under ₹1,500</option><option value="Medium">₹1,500 – ₹3,000</option><option value="High">Above ₹3,000</option></select>
          <select value={sort} onChange={e => setSort(e.target.value)} title="Sort products"><option value="featured">Featured</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option><option value="rating">Top Rated</option></select>
        </div>
      </div>

      <p className="result-count">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found</p>

      {filtered.length ? (
        <div className="product-grid">
          {filtered.map(product => <ProductCard key={product.id} product={product} onDelete={deleteProduct} />)}
        </div>
      ) : (
        <div className="empty-state compact">
          <div className="empty-icon">⌕</div><h2>No pieces found.</h2><p>Try another search or clear one of the filters.</p>
          <button className="outline-btn" onClick={() => {setCategory("All"); setBudget("All"); setSearch(""); setSort("featured");}}>Reset filters</button>
        </div>
      )}
    </main>
  );
}
