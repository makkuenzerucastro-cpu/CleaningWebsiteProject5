import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Lightbox from "../components/gallery/Lightbox";

export default function OurWork() {
  const [items, setItems] = useState([]);
  const [lightbox, setLightbox] = useState(null); // { images, index }

  useEffect(() => {
    base44.entities.GalleryItem.list("-created_date").then(setItems);
  }, []);

  // Flatten all images across all items for a master list, tracking source
  const openLightbox = (images, index) => setLightbox({ images, index });

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
              {items.map((item) => {
                const beforeImages = item.before_images?.length
                  ? item.before_images
                  : item.before_image ? [item.before_image] : [];
                const afterImages = item.after_images?.length
                  ? item.after_images
                  : item.after_image ? [item.after_image] : [];

                return (
                  <div key={item.id}>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    {item.description && <p className="text-gray-500 mb-4">{item.description}</p>}

                    <div className="grid grid-cols-2 gap-6">
                      {/* Before */}
                      <div>
                        <p className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-3">Before</p>
                        <div className="grid grid-cols-2 gap-2">
                          {beforeImages.slice(0, 4).map((url, i) => {
                            const isLast = i === 3 && beforeImages.length > 4;
                            return (
                              <div
                                key={i}
                                onClick={() => openLightbox(beforeImages, i)}
                                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-sm"
                              >
                                <img
                                  src={url}
                                  alt={`Before ${i + 1}`}
                                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
                                {isLast && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                    <span className="text-white font-semibold text-lg">+{beforeImages.length - 4}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* After */}
                      <div>
                        <p className="text-sm font-semibold text-green-500 uppercase tracking-wide mb-3">After</p>
                        <div className="grid grid-cols-2 gap-2">
                          {afterImages.slice(0, 4).map((url, i) => {
                            const isLast = i === 3 && afterImages.length > 4;
                            return (
                              <div
                                key={i}
                                onClick={() => openLightbox(afterImages, i)}
                                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-sm"
                              >
                                <img
                                  src={url}
                                  alt={`After ${i + 1}`}
                                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
                                {isLast && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                    <span className="text-white font-semibold text-lg">+{afterImages.length - 4}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}