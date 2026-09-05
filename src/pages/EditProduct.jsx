import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ProductForm from "./ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setForm({...res.data, sizes: res.data.sizes?.join(", ") || ""}));
  }, [id]);

  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm({...form, [name]: type === "checkbox" ? checked : value});
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/products/${id}`, {
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

  if (!form) return <main className="loading">Loading product...</main>;
  return <main className="form-page"><div className="page-intro"><p className="eyebrow">ADMIN PRODUCT MANAGEMENT</p><h1>Edit product</h1><p>Only Siddu's Thread administrators can update products.</p></div><ProductForm form={form} change={change} submit={submit} saving={saving} button="Save changes" /></main>;
}
