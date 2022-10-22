const { Router } = require('express');
const { diskStorage } = require('multer');
const multer = require('multer');
const path = require('path');

const router = Router();
const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');
const storage = diskStorage({
    destination: 'api/uploads/',
    filename: filename
});
const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

module.exports = router;

router.get('/photo-viewer', (request, response) => {
    response.sendFile(photoPath);
})

router.post('/upload', upload.single('photo'), (request, response) => {
    if(!!request.fileValidationError) {
        return response.status(400).json({
            error: request.fileValidationError
        });
    }

    return response.status(201).json({
        success: true
    });
});

function filename(request, file, callback) {
    callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
    if(file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'));
    }

    else {
        callback(null, true);
    }
}