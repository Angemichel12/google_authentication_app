import multer from 'multer';
import path from 'path';


const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb)=>{
        let ext = path.extname(file.originalname);

        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".gif" &&
            ext !== ".webp" &&
            ext !== ".bmp" &&
            ext !== ".tiff" &&
            ext !== ".jfif" &&
            ext !== ".tif"
          ) {
            return cb(null, false);
          }
          cb(null, true);
    }
});

export default upload;