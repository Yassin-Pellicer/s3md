"use client";
import { hooks } from "../posts/hook";
import Posts from "../posts";
import { PostViewer } from "../../viewer/post";
import { Post } from "@/app/types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";

export default function Blog() {
  const postsHooks = hooks();
  const explorerStore = useExplorerStore();
  return (
    <div className="bg-white w-full my-2">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex flex-row mb-4 space-x-2 align-center items-center">
          <span className="material-symbols-outlined">article_person</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Blog</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-x gap-4 divide-gray-300">
        <div className="p-4">
        <Posts></Posts>
        </div>
      </div>
    </div>
  );
}