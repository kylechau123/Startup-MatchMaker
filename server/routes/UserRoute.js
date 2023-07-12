import { Router } from "express";
const router = Router();
import { getReleventProfile, getCards, addLike } from "../controllers/UserController.js";
import { verifyAuth } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";


router.use(verifyAuth);

router.post("/", getReleventProfile);

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where you want to store uploaded files
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Set the file name as the original name of the uploaded file
        const uniqueFilename = uuidv4();
        const extension = file.originalname.split('.').pop();
        cb(null, `${uniqueFilename}.${extension}`);
    }
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });


router.post("/fileUpload", upload.single("photo"), (req, res) => {
    res.json({ success: true, fileLink: `http://localhost:4000/${req.file.path}` });
});

router.get("/cards", getCards);

router.get("/like/:id", addLike);

export default router;