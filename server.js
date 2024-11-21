import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("servidor escutando...");
});

app.get("/", (_req, res) => {
    res.status(200).send({ numero: 42 });
});