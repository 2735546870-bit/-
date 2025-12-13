import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const fileName: string = data.get('fileName') as string;
    const imageType: string = data.get('imageType') as string || 'showcase';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 根据图片类型确定子目录
    let subDir = '';
    switch (imageType) {
      case 'company':
        subDir = 'company';
        break;
      case 'testimonial':
        subDir = 'testimonials';
        break;
      case 'interactive':
        subDir = 'interactive';
        break;
      case 'certificate':
        subDir = 'certificates';
        break;
      case 'showcase':
      default:
        subDir = '';
        break;
    }

    // 确定保存路径
    const uploadDir = path.join(process.cwd(), 'public', 'images', subDir);
    const filePath = path.join(uploadDir, fileName);

    // 确保目录存在
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // 目录已存在，忽略错误
    }

    // 保存文件
    await writeFile(filePath, buffer);

    // 构建返回的URL
    const url = subDir ? `/images/${subDir}/${fileName}` : `/images/${fileName}`;

    return NextResponse.json({
      success: true,
      fileName: fileName,
      url: url,
      imageType: imageType
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}