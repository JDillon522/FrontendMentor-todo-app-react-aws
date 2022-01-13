import { Injectable } from '@nestjs/common';
import { resolve, join } from 'path';
import { readFile } from 'fs';

@Injectable()
export class ClientAppService {
    public async getApp(file: string) {
        const basePath = 'dist/client';
        const filePath = resolve(join(basePath, file ? 'static' + file : 'index.html'));
        return new Promise((resolve, reject) => {
          readFile(filePath, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
}
