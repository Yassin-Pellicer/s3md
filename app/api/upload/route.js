// app/api/upload/route.js

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
  try {
    const htmlContent = await req.text();
    
    if (!htmlContent) {
      return new Response(
        JSON.stringify({ error: "No HTML content provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create S3 client
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Generate filename with timestamp
    const timestamp = Date.now();
    const fileKey = `parsed-html-${timestamp}.html`;
    
    // Upload parameters
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `html-documents/${fileKey}`,
      Body: htmlContent,
      ContentType: 'text/html',
    };

    // Upload to S3
    const result = await s3Client.send(new PutObjectCommand(uploadParams));
    
    // Return success response with S3 URL
    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/html-documents/${fileKey}`;
    
    return new Response(
      JSON.stringify({ 
        message: "HTML upload successful",
        url: s3Url,
        key: uploadParams.Key,
        filename: fileKey
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('S3 Upload Error:', error);
    return new Response(
      JSON.stringify({ error: `Upload failed: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Example usage from client-side:
/*
const uploadHtml = async (htmlContent) => {
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: htmlContent  // Send HTML directly as body
  });
  
  const result = await response.json();
  return result;
};

// Usage example:
const htmlDoc = '<html><body><h1>My Parsed HTML Document</h1></body></html>';
const result = await uploadHtml(htmlDoc);
console.log('Uploaded to:', result.url);
*/