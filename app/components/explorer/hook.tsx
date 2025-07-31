import {
  getItemsFromRouteAction,
  uploadFolderAction,
  deleteItemsAction,
  moveItemsAction,
  uploadPostAction,
  getItemByIdAction,
} from "@/app/server/item.action";

import { Folder } from "../../types/Folder";
import { Post } from "../../types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { useEffect } from "react";
import { useScoutStore } from "@/app/contexts/scout.store";
import { useEditorStore } from "@/app/contexts/editor.store";

export const hooks = () => {
  const explorerStore = useExplorerStore();
  const scoutStore = useScoutStore();
  const editorStore = useEditorStore();

  const handleFolderClick = async (folderName: string) => {
    if (explorerStore.isFinding) return;
    explorerStore.setIsFinding(true);

    const newRoute = `${explorerStore.route}/${folderName}`;
    explorerStore.setRoute(newRoute);
    await fetchContent(newRoute);

    explorerStore.setIsFinding(false);
  };

  const handlePostClick = async (post: Post) => {
    explorerStore.setSelectedItems([]);
    if (explorerStore.editorMode) return;
    explorerStore.setIsEditing(false); 
    explorerStore.addSelectedItem({ item: post, type: "post" });
  }

  const handlePostEdit = async (post: Post) => {
    const item = await getItemByIdAction(post.id!, "post");
    if (
      item && typeof item === "object" && "post" in item
    ) {
      const { post: fetchedPost, html, img } = item;
      editorStore.setPost(fetchedPost);
      console.log(html);
      html !== undefined ? editorStore.setHtmlContent(html!) : editorStore.setHtmlContent("<p></br><p>");
      img ? editorStore.setImage(new File([img], `${post.title}.png`)) : editorStore.setImage(null);
      
      explorerStore.setSelectedItems([]);
      explorerStore.setIsEditing(true);

    } else {
      console.warn("Returned item is not a valid post with buffers.");
    }
  };

  const handleBackClick = async () => {
    if (explorerStore.isFinding) return;
    explorerStore.setIsFinding(true);

    const pathParts = explorerStore.route.split("/");
    if (pathParts[pathParts.length - 1] != explorerStore.baseRoute)
      pathParts.pop();
    const parentRoute = pathParts.join("/");
    explorerStore.setRoute(parentRoute);
    await fetchContent(parentRoute);

    explorerStore.setIsFinding(false);
  };

  const fetchContent = async (route: string) => {
    if (explorerStore.isFinding) return;
    const { folders, posts }: { folders: Folder[]; posts: Post[] } = await getItemsFromRouteAction(route);
    explorerStore.setAllItems(folders, posts);
  };

  const handleBreadcrumbClick = async (index: number) => {
    if (explorerStore.isFinding) return;
    explorerStore.setIsFinding(true);

    const pathParts = explorerStore.route.split("/").filter(Boolean);
    const newPath = pathParts.slice(0, index + 1).join("/");
    explorerStore.setRoute(newPath);
    fetchContent(newPath);

    explorerStore.setIsFinding(false);
  };

  const addNewFolder = async (folderName: string) => {
    const formData = new FormData();
    formData.append("name", folderName);
    formData.append("route", explorerStore.route);

    await uploadFolderAction(formData);
    fetchContent(explorerStore.route);
  };

  const addNewPost = async (postName: string, postDescription: string) => {
    const formData = new FormData();

    const post = {
      title: postName,
      description: postDescription,
      route: explorerStore.route,
    };

    formData.append("post", JSON.stringify(post));

    await uploadPostAction(formData);
    fetchContent(explorerStore.route);
  };

  const moveItems = async (
    items: { item: Folder | Post | null; type: "folder" | "post" | null }[]
  ) => {
    try {
      explorerStore.setSelectedItems([]);
      await moveItemsAction(items, scoutStore.route);
    } catch (error) {
      console.error("[ERROR] Failed to move items:", error);
    }
    await fetchContent(explorerStore.route);
  };

  const deleteItems = async (
    items: { item: Folder | Post | null; type: "folder" | "post" | null }[]
  ) => {
    try {
      explorerStore.setSelectedItems([]);
      await deleteItemsAction(items);
    } catch (error) {
      console.error("[ERROR] Failed to delete items:", error);
    }
    await fetchContent(explorerStore.route);
  };

  useEffect(() => {
    fetchContent(explorerStore.route);
  }, []);

  useEffect(() => {
    fetchContent(explorerStore.route);
  }, [explorerStore.route])

  return {
    handlePostEdit,
    handlePostClick,
    addNewPost,
    moveItems,
    deleteItems,
    handleBreadcrumbClick,
    addNewFolder,
    fetchContent,
    handleBackClick,
    handleFolderClick,
  };
};
