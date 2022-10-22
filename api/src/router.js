const { Router } = require('express');
const { diskStorage } = require('multer');
const multer = require('multer');
const path = require('path');
const imageProcessor = require('./imageProcessor');

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

router.post('/upload', upload.single('photo'), async (request, response) => {
    if(!!request.fileValidationError) {
        return response.status(400).json({
            error: request.fileValidationError
        });
    }

    try {
        await imageProcessor(request.file.filename);
        return response.status(201).json({
            success: true
        });
    }

    catch(error) {
        console.log(error);
        // return response.status(500).json({
        //     success: false,
        //     error: error
        // });
    }
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