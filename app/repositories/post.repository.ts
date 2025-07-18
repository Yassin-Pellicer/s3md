import { uploadToS3 } from "../aws/s3client";
import prisma from "../prisma/client";
import { Post } from "../types/Post";

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

  async create(data: any, image?: Blob, file?: Blob): Promise<Post> {
    const post: Post = await prisma.post.create({ data });

    if (file && file.size > 0) {
      const htmlBuffer = Buffer.from(await file.arrayBuffer());

      await uploadToS3({
        key: `${post.route}${post.title}_${post.id}/${post.title}.post`,
        body: htmlBuffer,
        contentType: "text/html",
      });
    }

    if (image && image.size > 0) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());

      await uploadToS3({
        key: `${post.route}${post.title}_${post.id}/${post.title}.img`,
        body: imageBuffer,
        contentType: image.type || "image/png", // fallback
      });
    }

    return post;
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
