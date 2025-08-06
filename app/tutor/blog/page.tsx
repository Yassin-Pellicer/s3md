"use client";
import { PostViewer } from "@/app/components/viewer/post";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { Post } from "@/app/types/Post";

export default function Home() {
  const explorerStore = useExplorerStore();
  return (
    <>
      {!explorerStore.isEditing && explorerStore.selectedItems.length === 1 && <PostViewer post={explorerStore.selectedItems[0].item as Post} />}
    </>
  );
}
