"use client";
import { ArrowRight, User } from "lucide-react";
import { hooks } from "./hook";
import { useExplorerStore } from "@/app/contexts/explorer.store";

// Utility to format and group by date (e.g., "2025-08-07")
const groupByDate = (entries: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  entries.forEach((entry) => {
    const date = new Date(entry.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(entry);
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => (a < b ? 1 : -1)) // Descending by date
    .reduce((acc, [date, items]) => {
      acc.push({ date, items });
      return acc;
    }, [] as { date: string; items: any[] }[]);
};

  const formatDate = (date: Date | undefined) => {
    if (!date) return "No date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

export default function Blog() {
  const blogHooks = hooks();
  const explorerStore = useExplorerStore();

  const groupedEntries = groupByDate(blogHooks.blogEntries);

  return (
    <div className="bg-white space-y-12">
      {groupedEntries.map((group) => (
        <div key={group.date}>
          {/* Date Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{formatDate(new Date(group.date))}</h2>

          {/* Grid of Posts for this Date */}
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
            {group.items.map((item, index) => (
              <article
                key={item.id || index}
                onClick={() => explorerStore.setSelectedItems([{ item, type: "post" }])}
                className="select-none hover:cursor-pointer group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      item.img
                        ? `data:image/jpeg;base64,${item.img}`
                        : "https://placehold.co/300x200/cccccc/cccccc.png?text=+"
                    }
                    alt={item.title || "Article image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <ArrowRight className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <div className="flex flex-col justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Yassin Pellicer</span>
                      </div>
                    </div>

                    {item.title && (
                      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                        {item.title.length > 60
                          ? `${item.title.slice(0, 60)}...`
                          : item.title}
                      </h2>
                    )}

                    {item.description && (
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description.length > 120
                          ? `${item.description.slice(0, 120)}...`
                          : item.description}
                      </p>
                    )}

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
        </div>
      ))}
    </div>
  );
}
