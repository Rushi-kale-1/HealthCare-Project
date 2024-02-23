const docterprofilemulter = require('multer')
const storage = docterprofilemulter.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'docterprofile/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Filename for uploaded files
    }
});

const docterprofileupload = docterprofilemulter({ storage: docterprofilemulter.memoryStorage() });

module.exports = {docterprofileupload}