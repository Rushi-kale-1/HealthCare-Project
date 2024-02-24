const blogCoverMulter = require('multer')
const storage = blogCoverMulter.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'blogcover/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Filename for uploaded files
    }
});

const blogCover = blogCoverMulter({ storage: blogCoverMulter.memoryStorage() });

module.exports = {blogCover}