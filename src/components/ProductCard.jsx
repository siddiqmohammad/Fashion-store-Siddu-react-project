import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoriteSlice";
import { useCart } from "../context/CartContext";
import { getCurrentUser, isAdmin } from "../utils/auth";

export default function ProductCard({ product, onDelete }) {
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(item => String(item.id) === String(product.id));
  const user = getCurrentUser();
  const admin = isAdmin(user);
  const discount = product.oldPrice ? Math.max(0, Math.round((1 - product.price / product.oldPrice) * 100)) : 0;

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.featured && <span className="badge">Featured</span>}
        {product.modelImage && <span className="model-badge">Model Look</span>}
        {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
        <button
          className={`heart-btn ${isFavorite ? "liked" : ""}`}
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleFavorite(product));
          }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </Link>

      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>★ {product.rating}</span>
        </div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>

        <div className="price-row">
          <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
          <del>₹{Number(product.oldPrice || product.price).toLocaleString("en-IN")}</del>
        </div>

        {product.matchingOutfit && (
          <p className="matching-outfit">Pairs with: <strong>{product.matchingOutfit}</strong></p>
        )}

        <div className={`card-actions ${admin ? "admin-actions" : ""}`}>
          <button className="bag-btn" onClick={() => addToCart(product)}>Add to Bag</button>
          {admin && (
            <>
              <Link className="edit-link" to={`/edit-product/${product.id}`}>Edit</Link>
              <button className="delete-link" onClick={() => onDelete(product.id)}>Delete</button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
