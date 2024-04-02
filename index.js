const express = require("express")
const app = express();

const PORT = 3000;

const db = [
    {
        nama: "Jo",
        asal: "Masa lalu lana",
        angkatan: 2022
    }
];

app.get("/", (req, res) => {
    res.send("Tapi kamu gk kangen ya sama aku");
});

app.get("/", (req, res) => {
    res.send("Kapan kita bisa main lagi?");
});

app.get("/", (req, res) => {
    res.send("Lana, aku kangen");
});

app.get("/db", (req, res) => {
    res.status(200).json({ data: db});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));