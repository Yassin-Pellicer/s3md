import {
  getItemsFromRouteAction,
  uploadFolderAction,
  deleteItemsAction,
  moveItemsAction,
} from "@/app/server/item.action";

import { Folder } from "../../types/Folder";
import { Post } from "../../types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { useEffect } from "react";
import { useScoutStore } from "@/app/contexts/scout.store";

export const hooks = () => {
  const explorerStore = useExplorerStore();
  const scoutStore = useScoutStore();

  const handleFolderClick = async (folderName: string) => {
    if (explorerStore.isFinding) return;
    explorerStore.setIsFinding(true);

    const newRoute = `${explorerStore.route}/${folderName}`;
    explorerStore.setRoute(newRoute);
    await fetchContent(newRoute);

    explorerStore.setIsFinding(false);
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

  return {
    moveItems,
    deleteItems,
    handleBreadcrumbClick,
    addNewFolder,
    fetchContent,
    handleBackClick,
    handleFolderClick,
  };
};
