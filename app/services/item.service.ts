import folderRepository from "../repositories/folder.repository";
import postRepository from "../repositories/post.repository";
import { BlogEntry } from "../types/BlogEntry";

import { Folder } from "../types/Folder";
import { Post } from "../types/Post";

export class itemsService {

  /**
   * Retrieve all items from a given route.
   * @param route The route to retrieve items from.
   * @returns An array of Folder objects.
   */
  async getItemsFromRoute(route: string): Promise<{ folders: Folder[]; posts: Post[];}> {
    const folders: Folder[] = await folderRepository.getFoldersFromRoute(route);
    const posts: Post[] = await postRepository.getPostsFromRoute(route);
    return { folders, posts };
  }

  async getPostsFromRoute(route: string): Promise<Post[]> {
    return await postRepository.getPostsFromRoute(route);
  }

  async getBlogEntriesFromRoute(route: string): Promise<BlogEntry[]> {
    return await postRepository.getBlogEntriesFromRoute(route);
  }

  async getItemById(id: string, type: string | null): Promise<{ post: Post; html?: string; img?: string } | Folder | null | undefined> {
    if (type === "folder") {
      return await folderRepository.getById(id);
    }
    if (type === "post") {
      return await postRepository.getById(id);
    }
    return undefined;
  }

  /**
   * Create a new post. The post is expected to have a valid route field.
   * @param post The post to create.
   * @returns The newly created post.
   */
  async createPost(post: Post, image?: Blob, file?: Blob | null): Promise<Post> {
    return postRepository.create(post, image, file);
  }

  /**
   * Create a new folder with the given name and route.
   * @param name The name of the folder to create.
   * @param route The route of the folder to create.
   * @returns The newly created folder.
   */
  async createFolder(name: String, route: String): Promise<Folder> {
    return folderRepository.create({ name, route });
  }

  /**
   * Delete an item with the given ID.
   * @param id The ID of the item to delete.
   * @param type The type of the item to delete. Must be either "folder" or "post".
   * @returns A promise that resolves when the item is deleted.
   */
  async deleteItem(id: string, type: string | null): Promise<void> {
    if (type === "folder") {
      await folderRepository.delete(id);
      console.log("folder deletion complete");
    }
    if (type === "post") {
      await postRepository.delete(id);
      console.log("post deletion complete");
    }
  }

  async moveItem(id: string, type: string | null, route: string): Promise<void> {
    if (type === "folder") {
      await folderRepository.move(id, route);
      console.log("folder move complete");
    }
    if (type === "post") {
      await postRepository.move(id, route);
      console.log("post move complete");
    }
  }
}

export default new itemsService();
