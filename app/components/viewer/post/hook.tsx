import { getItemByIdAction } from "@/app/server/item.action";
import { Post } from "@/app/types/Post";
import { useEffect, useState } from "react";

export const hooks = (post: Post) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setHtmlContent("");
    setImage(null);
    fetchContent(post);
  }, [post]);

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

  const fetchContent = async (post: Post) => {
    const item = await getItemByIdAction(post.id!, "post");
    if (item && typeof item === "object" && "post" in item) {
      const { post: fetchedPost, html, img } = item;
      console.log(html);
      html && setHtmlContent(html);

      if (img) {
        const objectURL = URL.createObjectURL(img);

        const file = new File([img], `${post.title}.png`, {
          type: img.type || "image/png"
        });

        console.log(file);
        setImage(file);
      }
    } else {
      console.warn("Returned item is not a valid post with buffers.");
    }
  }

  return {
    formatDate,
    fetchContent,
    htmlContent,
    image
  };
};


