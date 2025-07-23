import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file to S3.
 * @param key - S3 key (e.g. `folder/filename.html`)
 * @param body - File contents as a Buffer
 * @param contentType - MIME type of the file (e.g. 'text/html', 'image/png')
 * @returns The public URL of the uploaded object
 */
export async function uploadToS3({
  key,
  body,
  contentType,
}: {
  key: string;
  body: Buffer | undefined | string;
  contentType: string | undefined;
}): Promise<string> {
  const bucket = process.env.S3_BUCKET_NAME!;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

/**
 * Deletes an object from S3.
 * @param key - S3 key (e.g. `folder/filename.html`)
 */
export async function deleteFromS3(key: string) {
  const bucket = process.env.S3_BUCKET_NAME!;
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}

/**
 * Deletes multiple objects from S3.
 * @param key - S3 key (not used in the function, can be removed)
 * @param list - An object containing an array of keys of the objects to delete, formatted as { Objects: { Key: string }[] }
 */
export async function deleteMultipleFromS3(list: { Key: string }[]) {
  const bucket = process.env.S3_BUCKET_NAME!;
  const validList = list.filter((item) => item?.Key && item.Key !== "");

  if (validList.length === 0) return;

  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: validList,
    },
  });

  await s3Client.send(command);
}


/**
 * Fetches an object from S3 and returns its content as a Buffer.
 * 
 * @param key - The S3 key of the object to retrieve.
 * @returns A promise that resolves to an object containing:
 *   - buffer: The contents of the S3 object as a Buffer.
 *   - contentType: The MIME type of the object.
 *   - contentLength: The size of the object in bytes, if available.
 *   Returns null if the object does not exist.
 * @throws An error if the S3 request fails for any reason other than a missing key.
 */
export async function getFromS3(key: string): Promise<{
  buffer: Buffer;
  contentType: string;
  contentLength?: number;
} | null> {
  const bucket = process.env.S3_BUCKET_NAME!;

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    const stream = response.Body as Readable;
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    const buffer = Buffer.concat(chunks);

    return {
      buffer,
      contentType: response.ContentType || "application/octet-stream",
      contentLength: response.ContentLength,
    };
  } catch (error: any) {
    if (error.Code === "NoSuchKey") {
      console.warn(`S3: Key not found — "${key}"`);
      return null;
    }
    console.error("Unexpected S3 error:", error);
    throw error; 
  }
}
