import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { getCurrentUser } from "../utils/auth";

const empty={fullName:"",phone:"",address:"",city:"",state:"Andhra Pradesh",pincode:"",landmark:""};

export default function Checkout(){
 const {cart,subtotal,clearCart}=useCart(); const navigate=useNavigate(); const user=getCurrentUser();
 const [address,setAddress]=useState(()=>JSON.parse(localStorage.getItem(`sidAddress_${user?.id}`)||"null")||empty);
 const [payment,setPayment]=useState("Cash on Delivery"); const [saving,setSaving]=useState(false); const shipping=subtotal>=1999?0:99; const total=subtotal+shipping;
 if(!cart.length) { navigate("/bag"); return null; }
 const change=e=>setAddress({...address,[e.target.name]:e.target.value});
 async function placeOrder(e){e.preventDefault(); if(Object.values(address).some(v=>!String(v).trim())) return alert("Please complete all delivery details."); setSaving(true);
   try{ localStorage.setItem(`sidAddress_${user.id}`,JSON.stringify(address));
    const order={userId:user.id,customerName:user.name,items:cart.map(({key,...i})=>i),address,paymentMethod:payment,subtotal,shipping,total,status:"Confirmed",placedAt:new Date().toISOString(),orderNumber:`ST${Date.now().toString().slice(-8)}`};
    const res=await api.post("/orders",order); clearCart(); navigate(`/orders/${res.data.id}`,{replace:true});
   }catch{alert("Could not place order. Please make sure JSON Server is running.");} finally{setSaving(false);}
 }
 return <main className="checkout-page"><div className="page-intro"><p className="eyebrow">SECURE CHECKOUT</p><h1>Delivery <em>details.</em></h1><p>Enter your address and choose how you'd like to pay.</p></div>
 <form className="checkout-layout" onSubmit={placeOrder}><section className="form-card"><h2>1. Delivery address</h2><div className="form-grid">{["fullName","phone","address","city","state","pincode","landmark"].map((f,i)=><label key={f} className={f==="address"||f==="landmark"?"full":""}>{f.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}<input name={f} value={address[f]} onChange={change} placeholder={f==="pincode"?"6-digit PIN":""}/></label>)}</div><h2>2. Payment method</h2><div className="payment-options">{["Cash on Delivery","UPI / Online Payment"].map(x=><label key={x} className="payment-option"><input type="radio" name="payment" value={x} checked={payment===x} onChange={e=>setPayment(e.target.value)}/><span>{x}<small>{x==="Cash on Delivery"?"Pay when your order arrives":"Demo option — no real payment is processed"}</small></span></label>)}</div></section>
 <aside className="summary-card"><p className="eyebrow">FINAL TOTAL</p>{cart.map(i=><div key={i.key} className="mini-line"><span>{i.name} × {i.qty}</span><b>₹{(i.price*i.qty).toLocaleString("en-IN")}</b></div>)}<hr/><div><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div><div><span>Shipping</span><b>{shipping?"₹99":"FREE"}</b></div><div className="grand"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div><button className="primary-btn wide" disabled={saving}>{saving?"Placing Order...":`Place Order · ₹${total.toLocaleString("en-IN")}`}</button></aside></form></main>;
}
