import React from "react";
import { Calendar, User, Tag, Clock } from "lucide-react";
import { Post } from "@/app/types/Post";
import { hooks } from "./hook";
import "quill/dist/quill.snow.css";
import 'quill/dist/quill.bubble.css'; // Or bubble

export const PostViewer = ({ post }: { post: Post }) => {
  const postHooks = hooks(post);

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={postHooks.image ? URL.createObjectURL(postHooks.image) : "https://placehold.co/600x400?text=📸"}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          {post.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{postHooks.formatDate(post.createdAt)}</span>
            </div>
          )}
          {/* {post.author && ( */}
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>Yassin Pellicer</span>
          </div>
          {/* )} */}
          {post.route && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {post.route}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        {post.title && (
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
        )}

        {/* Description */}
        {post.description && (
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {post.description}
          </p>
        )}

        {/* Subjects */}
        {/* {post.subjects && post.subjects.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Tag className="w-4 h-4 text-gray-500" />
            {post.subjects.map((subject) => (
              <span
                key={subject.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: getSubjectColor(subject) }}
              >
                {subject.name}
              </span>
            ))}
          </div>
        )} */}

        {/* HTML Content */}
        {postHooks.htmlContent && (
          <div className="border-t border-gray-200 pt-6">
            <div
              className="quill-content text-gray-800 leading-relaxed"
              style={{
                fontFamily: "Merriweather",
              }}
              dangerouslySetInnerHTML={{ __html: postHooks.htmlContent }}
            />
          </div>
        )}


        {/* Footer Info */}
        {post.fullpath && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Full Path:</span>
              <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">
                {post.fullpath}
              </code>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
