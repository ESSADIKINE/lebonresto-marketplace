import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';

import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadImage(file: Express.Multer.File): Promise<any> {
    return this.uploadFile(file, 'image');
  }

  uploadFile(
    file: Express.Multer.File,
    resourceType: 'image' | 'raw' | 'auto' = 'auto',
    options: Record<string, any> = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: resourceType,
        ...options,
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
