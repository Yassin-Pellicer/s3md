'use server';

import { Post } from '../types/Post';
import PostRepository from '../repositories/post.repository';
import { uploadToS3 } from '../aws/s3client';

export async function uploadPostAction(formData: FormData) {
  try {
    const file = formData.get('file') as Blob | null;
    const rawPost = formData.get('post') as string | null;
    const image = formData.get('image') as Blob | null;

    if (!file || !rawPost) {
      throw new Error('Missing required data');
    }

    const post: Post = JSON.parse(rawPost);
    const htmlBuffer = Buffer.from(await file.arrayBuffer());

    const savedPost = await PostRepository.create(JSON.parse(rawPost));

    uploadToS3({
      key: post.route + post.title + "_" + savedPost.id,
      body: htmlBuffer,
      contentType: 'text/html',
    });

    if (image && image.size > 0) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      uploadToS3({
        key: `images/image_${savedPost.id}_${post.title}.png`,
        body: imageBuffer,
        contentType: 'image.type',
      })
    }
    console.log('rawPost', rawPost);

    return {
      success: true,
      post: savedPost,
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}
