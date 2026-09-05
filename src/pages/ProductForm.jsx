export default function ProductForm({form, change, submit, saving, button}) {
  return <form className="product-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Product name<input name="name" value={form.name} onChange={change} required /></label>
      <label>Category<select name="category" value={form.category} onChange={change}><option>Women</option><option>Men</option><option>Accessories</option><option>Footwear</option></select></label>
      <label>Product type<input name="type" value={form.type} onChange={change} required /></label>
      <label>Color<input name="color" value={form.color} onChange={change} required /></label>
      <label>Price (₹)<input type="number" name="price" value={form.price} onChange={change} required min="0" /></label>
      <label>Original price (₹)<input type="number" name="oldPrice" value={form.oldPrice} onChange={change} min="0" /></label>
      <label>Rating<input type="number" name="rating" value={form.rating} onChange={change} min="0" max="5" step="0.1" /></label>
      <label>Sizes<input name="sizes" value={form.sizes} onChange={change} placeholder="S,M,L" /></label>
      <label className="full">Product image URL<input name="image" value={form.image} onChange={change} required /></label>
      <label className="full">Model image URL (optional)<input name="modelImage" value={form.modelImage} onChange={change} placeholder="/models/your-model-photo.jpeg" /></label>
      <label className="full">Matching outfit name<input name="matchingOutfit" value={form.matchingOutfit} onChange={change} placeholder="White T-Shirt + Red Checks" /></label>
      <label className="full">Description<textarea name="description" value={form.description} onChange={change} required /></label>
      <label className="checkbox"><input type="checkbox" name="featured" checked={form.featured} onChange={change} /> Mark as featured</label>
    </div>
    <button className="primary-btn wide" disabled={saving}>{saving ? "Saving..." : button}</button>
  </form>;
}
