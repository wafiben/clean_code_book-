/* do not insert unecessary coments */
/* do not make comments of unfinished code  */

class UserRepository {
  db: any;
  insert(user) {
    /* insert user on database  */
    this.db.instertOne(user);
  }
  /* add(user){

  } */
}
/* formattingCode */

/* ==>vertical formatting
     code shoul be readable without too many jumps  */
/* have one class in one file */
/* different concepts should be seperated by spacing */
/* related concept should be kept close to each others */

class DiskStorage {
  constructor(storageDirectory) {
    this.storagePath = path.join(__dirname, storageDirectory);
    this.setupStorageDirectory();
  }
  /* black line between concepts */
  setupStorageDirectory() {
    if (!fs.existsSync(this.storagePath)) {
      this.createStorageDirectory();
    } else {
      console.log("Directory exists already.");
    }
  }
  /* black line between concepts */
  createStorageDirectory() {
    fs.mkdir(this.storagePath, this.handleOperationCompletion);
  }

  insertFileWithData(fileName, data) {
    if (!fs.existsSync(this.storagePath)) {
      console.log("The storage directory hasn't been created yet.");
      return;
    }
    const filePath = path.join(this.storagePath, fileName);
    fs.writeFile(filePath, data, this.handleOperationCompletion);
  }

  handleOperationCompletion(error) {
    if (error) {
      this.handleFileSystemError(error);
    } else {
      console.log("Operation completed.");
    }
  }

  handleFileSystemError(error) {
    if (error) {
      console.log("Something went wrong - the operation did not complete.");
      console.log(error);
    }
  }
}

/* similaire concepts shoul not be seperated no space between them */
const logStorage = new DiskStorage("logs");
const userStorage = new DiskStorage("users");

/* horizontal formatting
/* we should use indentation to avoid  horizontal scrolling*/
/* break long statement into multiples shorter ones */
function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/* function isValidEmail(email: string): boolean {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
} */
