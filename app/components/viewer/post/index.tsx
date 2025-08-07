"use client";
import React, { useEffect, useRef, useState } from "react";
import { Calendar, User, Clock } from "lucide-react";
import { Post } from "@/app/types/Post";
import { hooks } from "./hook";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { InViewSection } from "../../motion";

export const PostViewer = ({ post }: { post: Post }) => {
  const postHooks = hooks(post);


  return (
    <div className="relative h-full">
      <InViewSection triggerKey={postHooks.isLoading}>
        {/* Fixed Topbar (appears based on scroll) */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 py-4 border-b border-gray-300 px-6
            shadow-sm bg-white transition-all duration-200 ${postHooks.isScrolled
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
            }`}
        >
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
            {post.createdAt && (
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="w-4 h-4" />
                <span>{postHooks.formatDate(post.createdAt)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="text-xs">Yassin Pellicer</span>
            </div>
            {post.route && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  {postHooks.calculateReadTime(post.route)} min.
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          {post.title && (
            <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
              {post.title}
            </h1>
          )}

          {/* Description */}
          {post.description && (
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        <div
          ref={postHooks.scrollContainerRef}
          className="h-[100vh] overflow-y-auto"
        >
          {!postHooks.isLoading && (
            <article className="mx-auto px-6 bg-white py-6 overflow-hidden">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={
                    postHooks.image
                      ? `data:image/jpeg;base64,${postHooks.image}`
                      : "https://placehold.co/300x200/cccccc/cccccc.png?text=+"
                  }
                  className="w-full rounded-2xl h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute rounded-2xl inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4 mb-2">
                  {post.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{postHooks.formatDate(post.createdAt)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Yassin Pellicer</span>
                  </div>
                  {post.route && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {postHooks.calculateReadTime(post.route)} min.
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
              </div>
            </article>
          )}
        </div>
      </InViewSection>
    </div>
  );
};
