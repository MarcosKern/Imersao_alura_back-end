import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/300",
    },
    {
        id: 2,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/millie/300/300",
    },
    {
        id: 3,
        descricao: "Gatinho dormindo em uma caixa",
        imagem: "https://placecats.com/millie/300/300",
    },
    {
        id: 4,
        descricao: "Dois gatos se olhando",
        imagem: "https://placecats.com/millie/300/300",
    },
    {
        id: 5,
        descricao: "Gato curioso olhando pela janela",
        imagem: "https://placecats.com/millie/300/300",
    },
    {
        id: 6,
        descricao: "Gato tomando sol",
        imagem: "https://placecats.com/millie/300/300",
    }
];

const app = express();
app.use(express.json());

const buscarPostPorId = (id) => {
    return posts.find((post) => post.id === Number(id));
}

app.listen(3000, () => {
    console.log("servidor escutando...");
});

app.get("/posts", (_req, res) => {
    res.status(200).json( posts );
});

app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = buscarPostPorId(id);

    res.status(200).json(post)
});
