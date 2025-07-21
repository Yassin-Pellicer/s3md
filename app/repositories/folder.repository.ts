import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
  deleteFromS3,
  deleteMultipleFromS3,
  s3Client,
  uploadToS3,
} from "../aws/s3client";
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
      body: "",
      contentType: "application/x-directory",
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
   * Deletes a folder and all its child folders and posts.
   * @param id The ID of the folder to delete.
   * @returns The deleted folder.
   * @throws An error if the folder with the given ID doesn't exist.
   */
  async delete(id: string): Promise<Folder> {
    let continuationToken: string | undefined = undefined;

    console.log(`[DEBUG] Deleting folder with ID: ${id}`);

    const folderToDelete = await prisma.folder.findUnique({
      where: { id },
    });

    if (!folderToDelete) {
      throw new Error(`Folder with ID ${id} not found`);
    }

    console.log(`[DEBUG] Folder to delete:`, folderToDelete);
    const routePrefix = folderToDelete.route;

    if (!routePrefix) {
      console.log("[DEBUG] No route found on folder. Deleting folder only.");
      const deleted = await prisma.folder.delete({ where: { id } });
      return deleted;
    }

    do {
      const listCommand: ListObjectsV2Command = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET_NAME!,
        Prefix: `${routePrefix}/${folderToDelete.name}/`,
        ContinuationToken: continuationToken,
      });

      const listResult = await s3Client.send(listCommand);
      const keys = listResult.Contents?.map((obj) => ({ Key: obj.Key! })) ?? [];

      if (keys.length > 0) {
        const deleteCommand = new DeleteObjectsCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Delete: { Objects: keys },
        });

        await s3Client.send(deleteCommand);
      }

      continuationToken = listResult.IsTruncated
        ? listResult.NextContinuationToken
        : undefined;
    } while (continuationToken);

    await prisma.post.deleteMany({
      where: {
        route: {
          startsWith: `${routePrefix}/`,
        },
      },
    });

    await prisma.folder.deleteMany({
      where: {
        route: {
          startsWith: `${routePrefix}/`,
        },
      },
    });

    const deletedFolder = await prisma.folder.delete({
      where: { id },
    });
    console.log(`[DEBUG] Deleted parent folder from database`);

    return deletedFolder;
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
