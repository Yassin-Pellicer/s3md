import prisma from '../prisma/client';
import { Folder } from '../types/Folder';

export class FolderRepository {
  getAll(): Promise<Folder[]> {
    return prisma.folder.findMany();
  }

  getById(id: string): Promise<Folder | null> {
    return prisma.folder.findUnique({ where: { id } });
  }

  create(data: any): Promise<Folder> {
    return prisma.folder.create({ data });
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
