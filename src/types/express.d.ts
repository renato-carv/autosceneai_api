declare namespace Express {
  export interface Request {
    user?: any;
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}
