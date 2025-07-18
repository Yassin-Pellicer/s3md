import { uploadToS3 } from "../aws/s3client";
import prisma from "../prisma/client";
import { Folder } from "../types/Folder";

export class FolderRepository {
  getAll(): Promise<Folder[]> {
    return prisma.folder.findMany();
  }

  getById(id: string): Promise<Folder | null> {
    return prisma.folder.findUnique({ where: { id } });
  }

  async create(data: any): Promise<Folder> {
    const folder: Folder = await prisma.folder.create({ data });
    await uploadToS3({
      key: `${folder.route}${folder.name}/`,
      body: undefined,
      contentType: undefined,
    });

    return folder;
  }

  update(id: string, data: any): Promise<Folder> {
    return prisma.folder.update({ where: { id }, data });
  }

  delete(id: string): Promise<Folder> {
    return prisma.folder.delete({ where: { id } });
  }

  getFoldersFromRoute(route: string): Promise<Folder[]> {
    return prisma.folder.findMany({ where: { route } });
  }
}

export default new FolderRepository();
