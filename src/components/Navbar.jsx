import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../context/CartContext";
import { getCurrentUser, isAdmin } from "../utils/auth";

export default function Navbar({ dark, setDark }) {
  const { count } = useCart();
  const favorites = useSelector(state => state.favorites);
  const user = getCurrentUser();
  const admin = isAdmin(user);

  return (
    <header className="navbar">
      <Link to="/" className="brand">SIDDU'S THREAD<span>.</span></Link>

      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/favorites">Wishlist ({favorites.length})</NavLink>
        {admin && <NavLink to="/add-product">Add Product</NavLink>}
      </nav>

      <div className="nav-actions">
        {!user ? (
          <>
            <NavLink className="nav-auth-link" to="/login">Login</NavLink>
            <NavLink className="nav-auth-link" to="/register">Register</NavLink>
          </>
        ) : (
          <>
            {admin && <span className="admin-pill">ADMIN</span>}
            <NavLink className="nav-auth-link" to="/account">Account</NavLink><NavLink className="nav-auth-link" to="/orders">Orders</NavLink><NavLink className="nav-auth-link" to="/logout">Logout</NavLink>
          </>
        )}

        <button className="icon-btn" onClick={() => setDark(!dark)} title="Toggle theme">
          {dark ? "☀" : "☾"}
        </button>
        <Link className="cart-btn" to="/bag" title="Shopping bag">Bag <b>{count}</b></Link>
      </div>
    </header>
  );
}
