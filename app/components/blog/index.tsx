import { User } from "lucide-react";
import { hooks } from "./hook";


export default function Blog() {
  const blogHooks = hooks();

  return (

    <div className="bg-white">
      {blogHooks.blogEntries.length > 0 && (
        <div className="grid 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {blogHooks.blogEntries.map((item, index) => {
            return (
              <article key={index} className="grid grid-cols-[40%_auto] max-w-4xl w-full bg-white rounded-xl border-[1px] border-gray-200 shadow-lg overflow-hidden">
                <div className="relative max-h-64 max-w-64 w-full overflow-hidden">
                  <img
                    src={item.img ? `data:image/jpeg;base64,${item.img}` : "https://placehold.co/300x200?text=✨"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="sm:px-6 py-3 sm:py-2 px-4">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                    {/* {post.author && ( */}
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs sm:text-sm md:text-md">Yassin Pellicer</span>
                    </div>
                  </div>

                  {/* Title */}
                  {item.title && (
                    <h1 className="text-sm sm:text-md md:text-lg font-bold text-gray-900 mb-4 leading-tight">
                      {item.title && item.title.split(' ').length > 14 ? item.title.split(' ').slice(0, 8).join(' ') + '...' : item.title}
                    </h1>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {item.description && item.description.split(' ').length > 16 ? item.description.split(' ').slice(0, 8).join(' ') + '...' : item.description}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}