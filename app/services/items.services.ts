import folderRepository from "../repositories/folder.repository";
import postRepository from "../repositories/post.repository";

import { Folder } from "../types/Folder";
import { Post } from "../types/Post";

export class itemsRepository {
  /**
   * Retrieve all items from a given route. Currently only folders are supported.
   * @param route The route to retrieve items from.
   * @returns An array of Folder objects.
   */
  async getItemsFromRoute(route: string): Promise<{ folders: Folder[]; posts: Post[];}> {
    const folders: Folder[] = await folderRepository.getFoldersFromRoute(route);
    const posts: Post[] = await postRepository.getPostsFromRoute(route);
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
}

export default new itemsRepository();
