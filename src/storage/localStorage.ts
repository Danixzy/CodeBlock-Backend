import fs from 'fs';
import path from 'path';

export class LocalStorageService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    this.ensureDirectoryExists();
  }

  private ensureDirectoryExists(): void {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async saveFile(file: Buffer, filename: string): Promise<string> {
    const filePath = path.join(this.uploadsDir, filename);
    await fs.promises.writeFile(filePath, file);
    return filePath;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(this.uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

  getFilePath(filename: string): string {
    return path.join(this.uploadsDir, filename);
  }
}
