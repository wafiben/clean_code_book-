// *********
// Imports
// *********
import fs from "fs";
import path from "path";

// *********
// Main
// *********
// A class which allows us to create DiskStorage instances
class DiskStorage {
  private storageDirectory: string;

  constructor(directoryName: string) {
    this.storageDirectory = directoryName;
  }

  private getDirectoryPath(): string {
    return path.resolve(this.storageDirectory);
  }

  /* this must be created before a file is insterted */
  createDirectory(): void {
    if (!fs.existsSync(this.getDirectoryPath())) {
      fs.mkdirSync(this.getDirectoryPath());
    }
  }

  /* warning:dirctory must exist in advance */
  insertFile(fileName: string, content: string): void {
    const filePath = path.join(this.getDirectoryPath(), fileName);
    fs.writeFileSync(filePath, content);
    // Todo: Add proper error handling
  }
}

// Create an instance of DiskStorage
const logStorage = new DiskStorage("logs");


/* refactor */

import * as fs from "fs";
import * as path from "path";

class DiskStorage {
  private storageDirectory: string;

  constructor(directoryName: string) {
    this.storageDirectory = directoryName;
  }
  
  private getDirectoryPath(): string {
    return path.resolve(this.storageDirectory);
  }

  createDirectory(): void {
    if (!fs.existsSync(this.getDirectoryPath())) {
      fs.mkdirSync(this.getDirectoryPath());
    }
  }

  // Insert a file with content into the storage directory
  insertFile(fileName: string, content: string): void {
    const filePath = path.join(this.getDirectoryPath(), fileName);
    fs.writeFileSync(filePath, content);
    // Todo: Add proper error handling
  }
}


const logStorage = new DiskStorage("logs");


