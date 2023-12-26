import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export default new (class UploadImageStorage {
  Upload(fieldName: string) {
    const storage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, "src/uploads");
      },
      filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.png`);
      },
    });

    const uploadFile = multer({
      storage: storage,
    });

    return (
      req: Request & { file: Express.Multer.File },
      res: Response,
      next: NextFunction
    ) => {
      uploadFile.single(fieldName)(req, res, (err: any) => {
        if (err)
          return res
            .status(400)
            .json({
              message:
                "file upload failed please check destination or filename configuration",
            });

        res.locals.filename = req.file.filename;
        next();
      });
    };
  }
})();