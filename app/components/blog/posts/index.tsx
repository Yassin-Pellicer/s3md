"use client";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { hooks } from "./hook";
import { useExplorerStore } from "@/app/contexts/explorer.store";

export default function Blog() {
  const blogHooks = hooks();
  const explorerStore = useExplorerStore();

  return (
    <div className="bg-white">
      {blogHooks.blogEntries.length > 0 && (
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
          {blogHooks.blogEntries.map((item, index) => (
            <article
              key={item.id || index}
              onClick={() => {explorerStore.setSelectedItems([{ item, type: "post" }])}}
              className="select-none hover:cursor-pointer group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img ? `data:image/jpeg;base64,${item.img}` : "https://placehold.co/300x200/cccccc/cccccc.png?text=+"}
                  alt={item.title || "Article image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Floating Action */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <ArrowRight className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col">
                {/* Metadata */}
                <div className="flex flex-col justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 " />
                      <span>Yassin Pellicer</span>
                    </div>
                  </div>

                  {/* Title */}
                  {item.title && (
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                      {item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}
                    </h2>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {item.description.length > 120
                        ? `${item.description.slice(0, 120)}...`
                        : item.description}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="flex items-center justify-between">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}