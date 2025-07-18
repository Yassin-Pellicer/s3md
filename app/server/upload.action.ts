'use server';

import itemsServices from '../services/items.services';

export async function uploadPostAction(formData: FormData) {
  try {
    const file = formData.get('file') as Blob | null | undefined;
    const rawPost = formData.get('post') as string | null;
    const image = formData.get('image') as Blob | undefined;

    if (!file || !rawPost) {
      throw new Error('Missing required data');
    }

    const savedPost = await itemsServices.createPost(JSON.parse(rawPost), image, file);

    return {
      success: true,
      post: savedPost,
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}
