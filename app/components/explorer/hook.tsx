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
    explorerStore.setFolders(folders);
    explorerStore.setPosts(posts);
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
      await deleteItemsAction(items);
      setTimeout(async () => {
        await fetchContent(explorerStore.route);
      }, 500);
    } catch (error) {
      console.error("[ERROR] Failed to delete items:", error);
    }
  };

  useEffect(() => {
    if (explorerStore.route !== explorerStore.baseRoute) return
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
