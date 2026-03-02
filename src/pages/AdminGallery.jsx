import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, X } from "lucide-react";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", before_image: "", after_image: "" });
  const [uploading, setUploading] = useState({ before: false, after: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
    base44.entities.GalleryItem.list("-created_date").then(setItems);
  }, []);

  const loadItems = async () => {
    const data = await base44.entities.GalleryItem.list("-created_date");
    setItems(data);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [field]: true }));
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm((f) => ({ ...f, [field === "before" ? "before_image" : "after_image"]: file_url }));
    setUploading((u) => ({ ...u, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.GalleryItem.create(form);
    setForm({ title: "", description: "", before_image: "", after_image: "" });
    setShowForm(false);
    setSaving(false);
    loadItems();
  };

  const handleDelete = async (id) => {
    await base44.entities.GalleryItem.delete(id);
    loadItems();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Manager</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full gap-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Before & After"}
        </Button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5 mb-10">
          <h2 className="text-lg font-semibold text-gray-900">New Before & After</h2>

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

          <div className="grid grid-cols-2 gap-4">
            {["before", "after"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field} Image</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-green-400 transition-colors">
                  {form[field + "_image"] ? (
                    <img src={form[field + "_image"]} alt={field} className="w-full h-32 object-cover rounded-lg" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">{uploading[field] ? "Uploading..." : "Upload photo"}</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, field)} />
                </label>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={saving || !form.before_image || !form.after_image}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      )}

      {/* Existing Items */}
      <div className="space-y-8">
        {items.length === 0 && <p className="text-gray-500 text-center py-10">No items yet. Add your first before & after!</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-red-500 uppercase mb-1">Before</p>
                <img src={item.before_image} alt="Before" className="w-full aspect-video object-cover rounded-xl" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-500 uppercase mb-1">After</p>
                <img src={item.after_image} alt="After" className="w-full aspect-video object-cover rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}