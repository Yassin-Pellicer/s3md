import folderRepository from "../repositories/folder.repository";
import postRepository from "../repositories/post.repository";

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
    console.log(folders, posts);
    return { folders, posts };
  }

  /**
   * Create a new post. The post is expected to have a valid route field.
   * @param post The post to create.
   * @returns The newly created post.
   */
  async createPost(post: Post, image?: Blob, file?: Blob): Promise<Post> {
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
}

export default new itemsService();
