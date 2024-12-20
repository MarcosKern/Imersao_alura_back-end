import express from "express";
import multer from "multer";
import { criarPost, listarPosts, uploadImagem, atualizaPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);

    app.post("/posts", criarPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizaPost);
};

export default routes;