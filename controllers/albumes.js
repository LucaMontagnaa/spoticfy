const conn = require("../db");

const getAlbumes = (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
    conn.query('SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id', (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.json(result);
    })
};

const getAlbum = (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */

        conn.query('SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?', [req.params.id], (err, result) => {
            if (err) {
                console.log("Hubo error con la query");
                return res.status(500).send("Hubo error con la query");
            }
    
            res.json(result[0]);
        })
};

const createAlbum = (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

        conn.query('INSERT INTO albumes (nombre, artista) VALUES (?,?)', [req.body.nombre, req.body.artista], (err, result) => {
            if (err) {
                console.log("Hubo error con la query");
                return res.status(500).send("Hubo error con la query");
            }
    
            res.send("Se insertó correctamente");
        })
};

const updateAlbum = (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        conn.query('UPDATE albumes SET nombre=?, artista=? WHERE id = ?', [req.body.nombre, req.body.artista, req.params.id], (err, result) => {
            if (err) {
                console.log("Hubo error con la query");
                return res.status(500).send("Hubo error con la query");
            }
    
            res.send("Se insertó correctamente");
        })
};

const deleteAlbum = (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    conn.query('DELETE FROM albumes WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }

        res.send("Se borró correctamente");
    })
};

const getCancionesByAlbum = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    conn.query('SELECT canciones.id, canciones.nombre, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista, duracion, reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log("Hubo error con la query");
            return res.status(500).send("Hubo error con la query");
        }
        console.log(result);
        res.json(result);
    })
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
