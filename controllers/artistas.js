const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
    conn.query('SELECT * FROM artistas', (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.json(result);
    })
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */

    conn.query('SELECT * FROM artistas WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.json(result[0]);
    })
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */

    conn.query('INSERT INTO artistas (nombre) VALUES (?)', [req.body.nombre], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.send("Se insertó correctamente");
    })
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */

    conn.query('UPDATE artistas SET nombre=? WHERE id=?', [req.body.nombre, req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.send("Se editó correctamente"); 


    });

};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    conn.query('DELETE FROM artistas WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.send("Se borró correctamente");
    })
};


const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes

    conn.query('SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE artista = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.json(result);
    })
};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    conn.query('SELECT canciones.id, canciones.nombre, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista, duracion, reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.artista = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }
        res.json(result);
    })
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
