import fs from "fs/promises";
import { join } from "path";

export const deleteFileOnError = async (error, req, res, next) => {
    if (req.file && req.filePath) {
        const filePath = join(req.filePath, req.file.filename);
        console.log(filePath)
        try {
            await fs.unlink(filePath);
        } catch (unlinkErr) {
            console.log(`Error ocurred while deleting file: ${unlinkErr}`);
        }
    }
    next(error);
}