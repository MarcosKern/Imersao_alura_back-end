import { getTodosPosts, postNovoPost } from "../models/postsModel.js";
import fs from "fs";

export async function listarPosts(_req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

export async function criarPost(req, res) {
    const novoPost = req.body;
    try {
        const post = await postNovoPost(novoPost);
        res.status(200).json(post);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    };
};

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const post = await postNovoPost(novoPost);
        const imagemAtualizada = `uploads/${post.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(post);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}
