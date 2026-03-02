import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, X, Pencil } from "lucide-react";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = create mode, object = edit mode
  const [form, setForm] = useState({ title: "", description: "", before_images: [], after_images: [] });
  const [uploading, setUploading] = useState({ before: false, after: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.entities.GalleryItem.list("-created_date").then(setItems);
  }, []);

  const loadItems = async () => {
    const data = await base44.entities.GalleryItem.list("-created_date");
    setItems(data);
  };

  const openCreate = () => {
    setEditingItem(null);
    setForm({ title: "", description: "", before_images: [], after_images: [] });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    const beforeImages = item.before_images?.length ? item.before_images : (item.before_image ? [item.before_image] : []);
    const afterImages = item.after_images?.length ? item.after_images : (item.after_image ? [item.after_image] : []);
    setForm({ title: item.title, description: item.description || "", before_images: beforeImages, after_images: afterImages });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setForm({ title: "", description: "", before_images: [], after_images: [] });
  };

  const handleImageUpload = async (e, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading((u) => ({ ...u, [field]: true }));
    const urls = await Promise.all(files.map((file) => base44.integrations.Core.UploadFile({ file }).then((r) => r.file_url)));
    const key = field === "before" ? "before_images" : "after_images";
    setForm((f) => ({ ...f, [key]: [...(f[key] || []), ...urls] }));
    setUploading((u) => ({ ...u, [field]: false }));
  };

  const removeImage = (field, index) => {
    const key = field === "before" ? "before_images" : "after_images";
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editingItem) {
      await base44.entities.GalleryItem.update(editingItem.id, form);
    } else {
      await base44.entities.GalleryItem.create(form);
    }
    cancelForm();
    setSaving(false);
    loadItems();
  };

  const handleDelete = async (id) => {
    await base44.entities.GalleryItem.delete(id);
    loadItems();
  };

  const ImageUploadField = ({ field }) => {
    const key = field === "before" ? "before_images" : "after_images";
    const images = form[key] || [];
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field} Photos</label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt={field} className="w-full h-20 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => removeImage(field, i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-20 cursor-pointer hover:border-green-400 transition-colors">
            {uploading[field] ? (
              <span className="text-xs text-gray-500">Uploading...</span>
            ) : (
              <>
                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add photos</span>
              </>
            )}
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, field)} />
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Manager</h1>
        {!showForm && (
          <Button onClick={openCreate} className="bg-green-500 hover:bg-green-600 text-white rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Add Before & After
          </Button>
        )}
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5 mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{editingItem ? "Edit Entry" : "New Before & After"}</h2>
            <button type="button" onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title (e.g. Kitchen Deep Clean)"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <textarea
            placeholder="Description (optional)"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUploadField field="before" />
            <ImageUploadField field="after" />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={cancelForm} className="flex-1 rounded-xl py-3">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || !form.before_images?.length || !form.after_images?.length}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3"
            >
              {saving ? "Saving..." : editingItem ? "Save Changes" : "Save"}
            </Button>
          </div>
        </form>
      )}

      {/* Existing Items */}
      <div className="space-y-8">
        {items.length === 0 && <p className="text-gray-500 text-center py-10">No items yet. Add your first before & after!</p>}
        {items.map((item) => {
          const beforeImages = item.before_images?.length ? item.before_images : (item.before_image ? [item.before_image] : []);
          const afterImages = item.after_images?.length ? item.after_images : (item.after_image ? [item.after_image] : []);
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-2 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-red-500 uppercase mb-2">Before ({beforeImages.length})</p>
                  <div className="grid grid-cols-2 gap-1">
                    {beforeImages.map((url, i) => (
                      <img key={i} src={url} alt={`Before ${i + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-500 uppercase mb-2">After ({afterImages.length})</p>
                  <div className="grid grid-cols-2 gap-1">
                    {afterImages.map((url, i) => (
                      <img key={i} src={url} alt={`After ${i + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}