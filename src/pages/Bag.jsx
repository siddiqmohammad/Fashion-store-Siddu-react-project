import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getCurrentUser } from "../utils/auth";

export default function Bag() {
  const { cart, subtotal, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (!cart.length) return <main className="empty-page"><div className="empty-state"><div className="empty-icon">🛍</div><h1>Your bag is empty</h1><p>Add something you love from the collection.</p><Link className="primary-btn" to="/products">Continue Shopping</Link></div></main>;

  return <main className="bag-page">
    <div className="page-intro"><p className="eyebrow">YOUR SHOPPING BAG</p><h1>Ready to <em>checkout.</em></h1><p>{cart.length} {cart.length === 1 ? "item" : "items"} in your bag. Free shipping above ₹1,999.</p></div>
    <div className="checkout-layout">
      <section className="bag-items">
        {cart.map(item => <article className="bag-item" key={item.key}>
          <img src={item.image} alt={item.name}/>
          <div className="bag-item-info"><p className="eyebrow">{item.category}</p><h3>{item.name}</h3><p>Colour: {item.color} · Size: {item.size}</p><strong>₹{Number(item.price).toLocaleString("en-IN")}</strong>
            <div className="qty-row"><button onClick={() => updateQty(item.key,item.qty-1)}>−</button><span>{item.qty}</span><button onClick={() => updateQty(item.key,item.qty+1)}>+</button><button className="remove-btn" onClick={() => removeFromCart(item.key)}>Remove</button></div>
          </div><strong>₹{(Number(item.price)*item.qty).toLocaleString("en-IN")}</strong>
        </article>)}
      </section>
      <aside className="summary-card"><p className="eyebrow">ORDER SUMMARY</p><div><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div><div><span>Shipping</span><b>{shipping ? "₹99" : "FREE"}</b></div><hr/><div className="grand"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div>
        <button className="primary-btn wide" onClick={() => getCurrentUser() ? navigate("/checkout") : navigate("/login",{state:{from:{pathname:"/checkout"}}})}>Proceed to Checkout</button><Link className="outline-btn wide" to="/products">Continue Shopping</Link>
      </aside>
    </div>
  </main>;
}
