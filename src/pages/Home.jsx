import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { isAdmin } from "../utils/auth";

export default function Home() {
  const [products, setProducts] = useState([]);
  const admin = isAdmin();

  useEffect(() => { api.get("/products").then(res => setProducts(res.data)); }, []);

  async function deleteProduct(id) {
    if (!admin || !confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  const modelLooks = products.filter(product => product.modelImage).slice(0, 4);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NEW SEASON / 2026</p>
          <h1>Style that feels <em>like you.</em></h1>
          <p className="hero-text">Discover curated essentials, statement pieces and model-inspired outfit combinations designed for everyday confidence.</p>
          <Link to="/products" className="primary-btn">Explore Collection <span>→</span></Link>
        </div>
        <div className="hero-art">
          <img src="/models/red-checks-model.jpeg" alt="Siddu's Thread red check model look" />
          <div className="hero-stamp">CURATED<br/>WITH INTENT</div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">CURATED FOR YOU</p><h2>Trending now</h2></div>
          <Link to="/products" className="text-link">View all →</Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} onDelete={deleteProduct} />)}
        </div>
      </section>

      {modelLooks.length > 0 && (
        <section className="model-showcase section">
          <div className="section-heading">
            <div><p className="eyebrow">STYLE GUIDE</p><h2>Looks on <em>real models.</em></h2></div>
            <p className="showcase-note">Tap a look to see the matching outfit.</p>
          </div>
          <div className="model-grid">
            {modelLooks.map(product => (
              <Link to={`/products/${product.id}`} className="model-card" key={product.id}>
                <img src={product.modelImage} alt={`${product.name} model`} />
                <div className="model-card-copy">
                  <span>{product.type}</span>
                  <h3>{product.name}</h3>
                  <p>{product.matchingOutfit}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="editorial">
        <div><p className="eyebrow">THE SIDDU'S THREAD EDIT</p><h2>Less noise.<br/><em>More style.</em></h2><p>Build a wardrobe around pieces you actually want to wear — with ready-made outfit pairings.</p><Link to="/products" className="secondary-btn">Shop the edit</Link></div>
        <img src="/models/blue-polo-model.jpeg" alt="Siddu's Thread fashion editorial" />
      </section>
    </main>
  );
}
