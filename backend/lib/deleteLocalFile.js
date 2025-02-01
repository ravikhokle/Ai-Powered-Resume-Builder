import fs from 'fs';

const deleteLocalFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Error deleting local file:", err);
    else console.log("Local file deleted:", filePath);
  });
};

export default deleteLocalFile;