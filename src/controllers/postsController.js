import { getTodosPosts, postNovoPost, putAtualizaPost } from "../models/postsModel.js";
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

export async function atualizaPost(req, res) {

    const { id } = req.params;
    const urlImg = `http://localhost:3000/${id}.png`
    const post = {
        imgUrl: urlImg,
        descricao: req.body.descricao,
        alt: req.body.alt
    };

    try {
        const postAtualizado = await putAtualizaPost(id, post);

        res.status(200).json(postAtualizado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}
