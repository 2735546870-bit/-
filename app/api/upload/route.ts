import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const fileName: string = data.get('fileName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 确定保存路径
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(uploadDir, fileName);

    // 保存文件
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileName: fileName,
      url: `/images/${fileName}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}