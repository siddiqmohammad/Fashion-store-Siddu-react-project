import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFavorites, removeFavorite } from "../features/favoriteSlice";
import { useCart } from "../context/CartContext";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const { addToCart } = useCart();

  return (
    <main className="favorites-page">
      <div className="page-intro">
        <p className="eyebrow">YOUR CURATED EDIT</p>
        <h1>Wishlist <em>♥</em></h1>
        <p>Keep the pieces you love close.</p>
      </div>

      {favorites.length === 0 ? (
        <section className="empty-state">
          <div className="empty-icon">♡</div>
          <h2>Your wishlist is waiting.</h2>
          <p>Save your favorite pieces while you explore the collection.</p>
          <Link to="/products" className="primary-btn">Discover the collection →</Link>
        </section>
      ) : (
        <>
          <div className="wishlist-toolbar">
            <span>{favorites.length} saved {favorites.length === 1 ? "piece" : "pieces"}</span>
            <button className="clear-btn" onClick={() => dispatch(clearFavorites())}>Clear wishlist</button>
          </div>

          <div className="product-grid">
            {favorites.map(product => (
              <article className="product-card" key={product.id}>
                <Link to={`/products/${product.id}`} className="product-image-wrap">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <button className="heart-btn liked" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFavorite(product.id));
                  }}>♥</button>
                </Link>
                <div className="product-info">
                  <div className="product-meta"><span>{product.category}</span><span>★ {product.rating}</span></div>
                  <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
                  <div className="price-row">
                    <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                    <del>₹{Number(product.oldPrice || product.price).toLocaleString("en-IN")}</del>
                  </div>
                  <button className="bag-btn full-bag" onClick={() => addToCart(product)}>Add to Bag</button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
