import { getItemsFromRouteAction, uploadFolderAction, deleteItemsAction } from "@/app/server/item.action";

import { Folder } from "../../types/Folder";
import { Post } from "../../types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { useEffect } from "react";

export const hooks = () => {
  const explorerStore = useExplorerStore();

  const handleFolderClick = (folderName: string) => {
    const newRoute = `${explorerStore.route}/${folderName}`;
    explorerStore.setRoute(newRoute);
    fetchContent(newRoute);
  };

  const handleBackClick = () => {
    const pathParts = explorerStore.route.split('/');
    if (pathParts[pathParts.length - 1] != explorerStore.baseRoute) pathParts.pop();
    const parentRoute = pathParts.join('/');
    explorerStore.setRoute(parentRoute);
    fetchContent(parentRoute);
  };

  const fetchContent = async (route: string) => {
    const { folders, posts }: { folders: Folder[]; posts: Post[] } = await getItemsFromRouteAction(route);
    explorerStore.setAllItems(folders, posts);
  };

  const handleBreadcrumbClick = (index: number) => {
    const pathParts = explorerStore.route.split('/').filter(Boolean);
    const newPath = pathParts.slice(0, index + 1).join('/');
    explorerStore.setRoute(newPath);
    fetchContent(newPath);
  };

  const addNewFolder = async (folderName: string) => {
    const formData = new FormData();
    formData.append('name', folderName);
    formData.append('route', explorerStore.route);

    await uploadFolderAction(formData);
    fetchContent(explorerStore.route);
  };

  const deleteItems = async (items: { item: Folder | Post | null, type: "folder" | "post" | null }[]) => {
    try {
      explorerStore.setSelectedItems([]);
      const startTime = performance.now();
      await deleteItemsAction(items);
      const endTime = performance.now();
      console.log(`[DEBUG] Deleting items took ${endTime - startTime} milliseconds.`);
      console.log("[DEBUG] Deleted items:", items);
      console.log("EJECUTADO");
      console.log("[DEBUG] Fetched content after delete:", explorerStore.folders, explorerStore.posts);
    } catch (error) {
      console.error("[ERROR] Failed to delete items:", error);
    }
    await fetchContent(explorerStore.route);
  };

  useEffect(() => {
    fetchContent(explorerStore.route);
  }, [])

  return {
    deleteItems,
    handleBreadcrumbClick,
    addNewFolder,
    fetchContent,
    handleBackClick,
    handleFolderClick
  };
};
