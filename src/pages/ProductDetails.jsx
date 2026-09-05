import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoriteSlice";
import api from "../services/api";
import { getCurrentUser, isAdmin } from "../utils/auth";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(item => String(item.id) === String(id));
  const admin = isAdmin(getCurrentUser());
  const [size, setSize] = useState("");

  useEffect(() => { api.get(`/products/${id}`).then(res => setProduct(res.data)); }, [id]);

  if (!product) return <main className="loading">Loading product...</main>;
  const selectedSize = size || product.sizes?.[0] || "One Size";

  return (
    <main className="details-page">
      <Link to="/products" className="back-link">← Back to shop</Link>
      <section className="details">
        <div className="details-image"><img src={product.image} alt={product.name} /></div>
        <div className="details-copy">
          <p className="eyebrow">{product.category} / {product.type}</p>
          <h1>{product.name}</h1>
          <div className="rating">★ {product.rating} <span>Highly rated</span></div>
          <div className="details-price">₹{Number(product.price).toLocaleString("en-IN")} <del>₹{Number(product.oldPrice || product.price).toLocaleString("en-IN")}</del></div>
          <p className="description">{product.description}</p>
          <div className="detail-block"><strong>Color</strong><p>{product.color}</p></div>
          <div className="detail-block"><strong>Choose size</strong><div className="size-list">{product.sizes?.map(s => <button type="button" className={selectedSize === s ? "size-choice selected" : "size-choice"} onClick={() => setSize(s)} key={s}>{s}</button>)}</div></div>
          {product.matchingOutfit && (
            <div className="matching-look"><strong>STYLE THIS LOOK</strong><p>{product.matchingOutfit}</p></div>
          )}
          <div className="detail-actions"><button className="primary-btn wide" onClick={() => addToCart(product, selectedSize)}>Add to Bag — ₹{Number(product.price).toLocaleString("en-IN")}</button><button className={`outline-btn favorite-detail ${isFavorite ? "liked" : ""}`} onClick={() => dispatch(toggleFavorite(product))}>{isFavorite ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}</button></div>
          {admin && <Link to={`/edit-product/${product.id}`} className="outline-btn wide">Edit Product</Link>}
        </div>
      </section>

      {product.modelImage && (
        <section className="model-look-section">
          <div className="model-look-copy">
            <p className="eyebrow">SIDDU'S THREAD STYLE GUIDE</p>
            <h2>See it <em>styled.</em></h2>
            <p>This piece is shown on a model so you can see the overall fit, styling and outfit pairing.</p>
            {product.matchingOutfit && <div className="look-name"><span>Matching outfit</span><strong>{product.matchingOutfit}</strong></div>}
          </div>
          <div className="model-look-image"><img src={product.modelImage} alt={`${product.name} model look`} /></div>
        </section>
      )}
    </main>
  );
}
