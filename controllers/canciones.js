const conn = require("../db");

const getCanciones = (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Nombre del artista",
                "nombre_album": "Nombre del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */

        conn.query('SELECT * FROM canciones', (err, result) => {
            if (err) {
                console.log("Hubo error con la query");
                return res.status(500).send("Hubo error con la query");
            }
    
            res.json(result);
        })
};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
    
    let id = req.params.id;
    const Selector = "SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM albumes JOIN artistas JOIN canciones WHERE albumes.id = ?";
    conn.query(Selector, [id], (err, rows) => {
        if (err) {
            console.error("Hubo un error al consultar por: " + err);
            return;
        }
        res.json(rows[0]);
    });
    


};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)

    const { nombre, album, duracion } = req.body;
    const Select = "INSERT INTO canciones (nombre,album,duracion) VALUES (?,?,?)";

    conn.query(Select, [nombre, album, duracion], (err, rows) => {
        if (err) {
            console.error("Hubo un error al consultar por: " + err);
            return;
        }
        res.sendStatus(100);
    });
};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)

    const id = req.params.id;
    const { nombre, album, duracion } = req.body;
    const Seleccionar = "UPDATE canciones SET nombre=?, album=?, duracion=? WHERE id=?";

    conn.query(Seleccionar,[nombre, album, duracion, id],(err, rows) => {
        if (err) {
            console.error("Hubo un error al consultar por: " + err);
            return;
        }
        res.sendStatus(100);
    });
};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params.id;
    const seleccionar = "DELETE FROM canciones WHERE id=?";

    conn.query(seleccionar, [id], (err, rows) => {
        if (err) {
            console.error("Hubo un error al consultar por: " + err);
            return;
        }
        res.sendStatus(100);
    });

};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params

    const id = req.params.id;
    const selection = "UPDATE canciones SET reproducciones= reproducciones + 1 WHERE id=?";

    conn.query(selection, [id], (err, rows) => {
        if (err) {
            console.error("Hubo un error al consultar por: " + err);
            return;
        }
        res.sendStatus(100);
    });
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
