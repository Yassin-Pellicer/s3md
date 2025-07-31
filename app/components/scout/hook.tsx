import {
  getItemsFromRouteAction,
  uploadFolderAction,
  deleteItemsAction,
} from "@/app/server/item.action";

import { Folder } from "../../types/Folder";
import { Post } from "../../types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { useEffect } from "react";
import { useScoutStore } from "@/app/contexts/scout.store";

export const hooks = ( mode : "move" | "guest" | null) => {
  const explorerStore = useExplorerStore();
  const scoutStore = useScoutStore();

  const handleFolderClick = async (folderName: string) => {
    if (scoutStore.isFinding) return;
    scoutStore.setIsFinding(true);

    const newRoute = `${scoutStore.route}/${folderName}`;
    scoutStore.setRoute(newRoute);
    await fetchContent(newRoute);

    scoutStore.setIsFinding(false);
  };

  const handleBackClick = async () => {
    if (scoutStore.isFinding) return;
    scoutStore.setIsFinding(true);

    const pathParts = scoutStore.route.split("/");
    if (pathParts[pathParts.length - 1] != scoutStore.baseRoute)
      pathParts.pop();
    const parentRoute = pathParts.join("/");
    scoutStore.setRoute(parentRoute);
    await fetchContent(parentRoute);

    scoutStore.setIsFinding(false);
  };

  const fetchContent = async (route: string) => {
    if (scoutStore.isFinding) return;
    const { folders, posts }: { folders: Folder[]; posts: Post[] } = await getItemsFromRouteAction(route);
    scoutStore.setAllItems(folders, posts, mode);
  };

  const handleBreadcrumbClick = async (index: number) => {
    if (scoutStore.isFinding) return;
    scoutStore.setIsFinding(true);

    const pathParts = scoutStore.route.split("/").filter(Boolean);
    const newPath = pathParts.slice(0, index + 1).join("/");
    scoutStore.setRoute(newPath);
    fetchContent(newPath);

    scoutStore.setIsFinding(false);
  };

  useEffect(() => {
    console.log("FETCH")
    scoutStore.setRoute(explorerStore.route);
    fetchContent(mode === "move" ? explorerStore.route : scoutStore.route);
  }, []);

  useEffect(() => {
    fetchContent(scoutStore.route);
  }, [scoutStore.route])

  return {
    handleBreadcrumbClick,
    fetchContent,
    handleBackClick,
    handleFolderClick,
  };
};
