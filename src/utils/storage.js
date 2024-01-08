import md5 from 'md5';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import config from './config.js';

const storage = new GridFsStorage({
	url: config.MONGO_URI,
	file: (_, file) => {
		const filename = `${md5(`${file.originalname}${Date.now()}`)}.${
			file.mimetype.split('/')[1]
		}}`;

		return {
			bucketName: 'thumbnails',
			filename
		};
	}
});

const upload = multer({ storage });

export default upload;
