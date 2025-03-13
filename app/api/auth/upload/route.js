// app/api/auth/upload/route.js
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer for Sanity upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload image to Sanity
    const result = await writeClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type
    });
    
    // Return the Sanity CDN URL and asset ID
    return NextResponse.json({
      url: result.url,
      assetId: result._id
    });
    
  } catch (error) {
    console.error('Error uploading image to Sanity:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}