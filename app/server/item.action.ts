'use server';

import itemsServices from '../services/item.service';

/**
 * Uploads a post to the server.
 * @param formData The form data with the keys:
 *   - file: the file to upload (required)
 *   - post: the post data as a JSON string (required)
 *   - image: the image to upload (optional)
 * @returns An object with:
 *   - success: boolean indicating whether the upload was successful
 *   - post: the saved post if the upload was successful, otherwise null
 *   - error: the error message if the upload failed, otherwise null
 */
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

/**
 * Uploads a folder to the server.
 * @param formData The form data with the keys:
 *   - name: the name of the folder (required)
 *   - route: the route of the folder (required)
 * @returns An object with:
 *   - success: boolean indicating whether the upload was successful
 *   - folder: the saved folder if the upload was successful, otherwise null
 *   - error: the error message if the upload failed, otherwise null
 */
export async function uploadFolderAction(formData: FormData) {
  try {
    const name = formData.get('name') as string | null;
    const route = formData.get('route') as string | null;

    if (!name || !route) {
      throw new Error('Missing required data');
    }

    const savedFolder = await itemsServices.createFolder(name, route);

    return {
      success: true,
      folder: savedFolder,
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Retrieves all items from a given route.
 * @param route The route to retrieve items from.
 * @returns A promise that resolves to an object with the following properties:
 *   - folders: An array of Folder objects
 *   - posts: An array of Post objects
 */
export async function getItemsFromRouteAction(route: string) {
  return await itemsServices.getItemsFromRoute(route);
}