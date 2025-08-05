import { GetObjectCommand } from "@aws-sdk/client-s3";
import {
  uploadToS3,
  deleteFromS3,
  deleteMultipleFromS3,
  s3Client,
  getFromS3,
} from "../aws/s3client";
import prisma from "../prisma/client";
import { Post } from "../types/Post";
import { Readable } from "stream";
import { BlogEntry } from "../types/BlogEntry";

export class PostRepository {
  /**
   * Retrieves all posts.
   * @returns An array of Post objects, each of which includes their subjects.
   */
  getAll(): Promise<Post[]> {
    return prisma.post.findMany({ include: { subjects: true } });
  }

  /**
   * Retrieves a post by ID.
   * @param id The ID of the post to retrieve.
   * @returns The post with the given ID, or null if no such post exists. The
   * returned post includes its subjects.
   */
  async getById(id: string): Promise<{
    post: Post;
    html?: string;
    img?: string;
  } | null> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { subjects: true },
    });

    if (!post) return null;

    const htmlKey = `${post.route}/${post.title}_${post.id}/${post.title}.post`;
    const imgKey = `${post.route}/${post.title}_${post.id}/${post.title}.img`;

    const htmlResult = await getFromS3(htmlKey).catch(() => null);
    const imgResult = await getFromS3(imgKey).catch(() => null);

    return {
      post,
      html: htmlResult?.buffer?.toString("utf-8"),
      img: imgResult?.buffer?.toString("base64"),
    };
  }

  /**
   * Creates a new post. The post is expected to have a valid route field.
   * The `file` argument is the HTML content of the post, and the `image`
   * argument is the image associated with the post. Both are optional.
   * @param data The post data to create.
   * @param image The image for the post. If provided, the image will be uploaded
   * to S3 and the post will be updated with the image URL.
   * @param file The HTML content of the post. If provided, the content will be
   * uploaded to S3 and the post will be updated with the content URL.
   * @returns The newly created post.
   */
  async create(data: any, image?: Blob, file?: Blob | null): Promise<Post> {
    const existingPost = data?.id
      ? await prisma.post.findUnique({
          where: { id: data.id },
        })
      : null;

    let post: Post;
    if (existingPost) {
      post = await prisma.post.upsert({
        where: { id: data.id },
        update: { ...data, subjects: undefined },
        create: { ...data, subjects: undefined },
      });
    } else {
      post = await prisma.post.create({ data });
    }

    if (file && file.size > 0) {
      const htmlBuffer = Buffer.from(await file.arrayBuffer());
      const htmlResult = await uploadToS3({
        key: `${post.route}/${post.title}_${post.id}/${post.title}.post`,
        body: htmlBuffer,
        contentType: "text/html",
      });
    }

    if (image && image.size > 0) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageResult = await uploadToS3({
        key: `${post.route}/${post.title}_${post.id}/${post.title}.img`,
        body: imageBuffer,
        contentType: image.type || "image/png",
      });
    }

    return post;
  }

  /**
   * Updates a post with the given ID using the provided data.
   * @param id The ID of the post to update.
   * @param data The data to update the post with.
   * @returns The updated post.
   */
  update(id: string, data: any): Promise<Post> {
    return prisma.post.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Post> {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) throw new Error(`Post with id ${id} not found.`);

    await prisma.post.delete({ where: { id } });

    const s3KeyBase = `${post.route}/${post.title}_${post.id}`;
    await deleteMultipleFromS3([
      { Key: `${s3KeyBase}/` },
      { Key: `${s3KeyBase}/${post.title}.img` },
      { Key: `${s3KeyBase}/${post.title}.post` },
    ]);

    return post;
  }

  async getPostsFromRoute(route: string): Promise<Post[]> {
    try {
      const posts = await prisma.post.findMany({
        where: { route },
      });

      return posts;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  async getBlogEntriesFromRoute(route: string): Promise<BlogEntry[]> {
    let blogEntries: BlogEntry[] = [];

    const posts = this.getPostsFromRoute(route);

    for (const post of await posts) {
      const imgKey = `${post.route}/${post.title}_${post.id}/${post.title}.img`;

      const imgResult = await getFromS3(imgKey).catch(() => null);

      blogEntries.push({
        ...post,
        img: imgResult?.buffer?.toString("base64"),
      });
    }

    return blogEntries;
  }

  async move(id: string, route: string): Promise<Post> {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) throw new Error(`Post with id ${id} not found.`);

    const s3KeyBase = `${post.route}/${post.title}_${post.id}/`;

    const imgDataResult = await getFromS3(`${s3KeyBase}${post.title}.img`);
    const postDataResult = await getFromS3(`${s3KeyBase}${post.title}.post`);

    const imgBlob = imgDataResult
      ? new Blob([imgDataResult.buffer], { type: imgDataResult.contentType })
      : undefined;
    const postBlob = postDataResult
      ? new Blob([postDataResult.buffer], { type: postDataResult.contentType })
      : undefined;

    post.route = route;

    await this.delete(id);
    const postCreated = await this.create(post, imgBlob, postBlob);
    console.log("post move complete");
    console.log(postCreated);
    const newPost = await prisma.post.update({
      where: { id },
      data: { route },
    });
    return newPost;
  }
}

export default new PostRepository();
