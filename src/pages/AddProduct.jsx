import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductForm from "./ProductForm";

const initial = { name:"", category:"Women", type:"Tops", price:"", oldPrice:"", rating:"5", color:"", image:"", modelImage:"", matchingOutfit:"", description:"", sizes:"S,M,L", featured:false };

export default function AddProduct() {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm({...form, [name]: type === "checkbox" ? checked : value});
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/products", {
        ...form,
        price:Number(form.price),
        oldPrice:Number(form.oldPrice || form.price),
        rating:Number(form.rating),
        sizes:form.sizes.split(",").map(s=>s.trim()).filter(Boolean)
      });
      navigate("/products");
    } finally {
      setSaving(false);
    }
  }

  return <main className="form-page"><div className="page-intro"><p className="eyebrow">ADMIN PRODUCT MANAGEMENT</p><h1>Add product</h1><p>Only Siddu's Thread administrators can create new products.</p></div><ProductForm form={form} change={change} submit={submit} saving={saving} button="Add to collection" /></main>;
}
