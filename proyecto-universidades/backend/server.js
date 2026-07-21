const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/universidades", async (req, res) => {

    try {

        const nombre = req.query.nombre || "";

        const response = await axios.get(
            `http://universities.hipolabs.com/search?country=Peru`
        );

        const universidades = response.data.map((u) => ({
            nombre: u.name,
            pais: u.country,
            dominio: u.domains[0],
            paginaWeb: u.web_pages[0]
        }));

        res.json(universidades);

    } catch (error) {
    console.error(error);

    res.status(500).json({
        mensaje: error.message
    });
}

});

app.listen(3001, () => {
    console.log("Servidor iniciado en puerto 3001");
});