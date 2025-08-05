import { getBlogEntriesAction, getItemByIdAction } from "@/app/server/item.action";
import { BlogEntry } from "@/app/types/BlogEntry";
import { Post } from "@/app/types/Post";
import { useEffect, useState } from "react";

export const hooks = () => {
  const [blogEntries, setBlogEntries] = useState<BlogEntry[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "No date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const fetchContent = async () => {
    setBlogEntries(await getBlogEntriesAction("AdministradorUsuario/Blog"));
  }

  return {
    blogEntries,
    formatDate,
    fetchContent,
  };
};


