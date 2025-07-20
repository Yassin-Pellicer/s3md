import { uploadToS3 } from "../aws/s3client";
import prisma from "../prisma/client";
import { Folder } from "../types/Folder";

export class FolderRepository {

  /**
   * Retrieves all folders.
   * @returns An array of all folders.
   */
  getAll(): Promise<Folder[]> {
    return prisma.folder.findMany();
  }
  /**
   * Retrieves a folder by its ID.
   * @param id The ID of the folder to retrieve.
   * @returns The folder with the given ID, or null if not found.
   */

  getById(id: string): Promise<Folder | null> {
    return prisma.folder.findUnique({ where: { id } });
  }

  /**
   * Create a new folder.
   * @param data The folder data to create.
   * @returns The newly created folder.
   */
  async create(data: any): Promise<Folder> {
    const folder: Folder = await prisma.folder.create({ data });
    await uploadToS3({
      key: `${folder.route}/${folder.name}/`,
      body: '',
      contentType: 'application/x-directory'
    });

    return folder;
  }

  /**
   * Updates a folder with the given ID using the provided data.
   * @param id The ID of the folder to update.
   * @param data The data to update the folder with.
   * @returns The updated folder.
   */
  update(id: string, data: any): Promise<Folder> {
    return prisma.folder.update({ where: { id }, data });
  }

  /**
   * Deletes a folder with the given ID.
   * @param id The ID of the folder to delete.
   * @returns The deleted folder.
   */
  delete(id: string): Promise<Folder> {
    return prisma.folder.delete({ where: { id } });
  }

  /**
   * Retrieves all folders from a specified route.
   * @param route The route to filter folders by.
   * @returns A promise that resolves to an array of folders matching the route.
   */
  getFoldersFromRoute(route: string): Promise<Folder[]> {
    return prisma.folder.findMany({ where: { route } });
  }
}

export default new FolderRepository();
