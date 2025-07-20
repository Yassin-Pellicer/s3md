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
    pathParts.pop();
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

  const addNewFolder = async (folderName: string) => {
    const newRoute = `${explorerStore.route}/${folderName}`;
    explorerStore.setRoute(newRoute);

    const formData = new FormData();
    formData.append('name', folderName);
    formData.append('route', explorerStore.route);

    await uploadFolderAction(formData);
  };

  useEffect(() => {
    explorerStore.setRoute("AdministradorUsuario");
    fetchContent("AdministradorUsuario");
  }, []);

  return {
    addNewFolder,
    fetchContent,
    handleBackClick,
    handleFolderClick
  };
};
