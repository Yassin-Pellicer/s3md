import { getItemsFromRouteAction } from "@/app/server/item.action";
import { useEffect } from "react";

import { Folder } from "../../types/Folder";
import { Post } from "../../types/Post";
import { useExplorerStore } from "@/app/contexts/explorer.store";

export const hooks = () => {
  const explorerStore = useExplorerStore();

  const fetchContent = async (route: string) => {
    const { folders, posts }: { folders: Folder[]; posts: Post[] } = await getItemsFromRouteAction(route);
    explorerStore.setFolders(folders);
    explorerStore.setPosts(posts);
    console.log(folders, posts);
  };

  useEffect(() => {
    explorerStore.setRoute("AdministradorUsuario");
    fetchContent("AdministradorUsuario");
  }, []);

  return {
    fetchContent,
  };
};
