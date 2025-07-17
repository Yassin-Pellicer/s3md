import folderRepository from "../repositories/folder.repository";
import postRepository from "../repositories/post.repository";
import tutorRepository from "../repositories/tutor.repository";

import { Folder } from "../types/Folder";
import { Post } from "../types/Post";
import { Tutor } from "../types/Tutor";

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
}
