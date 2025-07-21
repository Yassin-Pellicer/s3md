import { getItemsFromRouteAction, uploadFolderAction, uploadPostAction } from "@/app/server/item.action";
import { useEffect } from "react";

import { Folder } from "../../types/Folder";
import { Post } from "../../types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";

export const hooks = () => {
  const explorerStore = useExplorerStore();

  const handleFolderClick = (folderName: string) => {
    const newRoute = `${explorerStore.route}/${folderName}`;
    explorerStore.setRoute(newRoute);
  };

  // Handle back navigation
  const handleBackClick = () => {
    const pathParts = explorerStore.route.split('/');
    if(pathParts[pathParts.length - 1] != explorerStore.baseRoute)pathParts.pop();
    const parentRoute = pathParts.join('/');
    explorerStore.setRoute(parentRoute || '/');
  };

  const fetchContent = async (route: string) => {
    const { folders, posts }: { folders: Folder[]; posts: Post[] } = await getItemsFromRouteAction(route);
    explorerStore.setFolders(folders);
    explorerStore.setPosts(posts);
    explorerStore.setAllItems(folders, posts);
    console.log(folders, posts);
  };

  const handleBreadcrumbClick = (index: number) => {
    const pathParts = explorerStore.route.split('/').filter(Boolean);
    console.log(pathParts);
    const newPath = pathParts.slice(0, index + 1).join('/');
    explorerStore.setRoute(newPath);
  };

  const addNewFolder = async (folderName: string) => {
    const formData = new FormData();
    formData.append('name', folderName);
    formData.append('route', explorerStore.route);

    await uploadFolderAction(formData);
    fetchContent(explorerStore.route);
  };

  useEffect(() => {
    if (!explorerStore.route) return;
    fetchContent(explorerStore.route);
  }, [explorerStore.route]);

  useEffect(() => {
    explorerStore.setRoute("AdministradorUsuarioRemoto");
  }, []);

  return {
    handleBreadcrumbClick,
    addNewFolder,
    fetchContent,
    handleBackClick,
    handleFolderClick
  };
};
