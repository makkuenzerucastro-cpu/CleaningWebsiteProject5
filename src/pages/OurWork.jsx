import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export default function OurWork() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    base44.entities.GalleryItem.list("-created_date").then(setItems);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-green-500">Work</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              See the difference JES Cleaning Services makes — before and after every job.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">No work photos yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-16">
              {items.map((item) => (
                <div key={item.id}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.description && <p className="text-gray-500 mb-4">{item.description}</p>}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-2">Before</p>
                      <img src={item.before_image} alt="Before" className="w-full aspect-video object-cover rounded-2xl shadow" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-500 uppercase tracking-wide mb-2">After</p>
                      <img src={item.after_image} alt="After" className="w-full aspect-video object-cover rounded-2xl shadow" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}