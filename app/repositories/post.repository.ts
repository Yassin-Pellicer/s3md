import prisma from '../prisma/client';
import { Post } from '../types/Post';

export class PostRepository {
  getAll(): Promise<Post[]> {
    return prisma.post.findMany({ include: { subjects: true } });
  }

  getById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
      include: { subjects: true },
    });
  }

  create(data: any): Promise<Post> {
    return prisma.post.create({ data });
  }

  update(id: string, data: any): Promise<Post> {
    return prisma.post.update({ where: { id }, data });
  }

  delete(id: string): Promise<Post> {
    return prisma.post.delete({ where: { id } });
  }

  getPostsFromRoute(route: string): Promise<Post[]> {
    return prisma.post.findMany({ where: { route } });
  }
}

export default new PostRepository();
