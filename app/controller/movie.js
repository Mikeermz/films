
const Movie = require('../actions');

const createMovie = (req, res) => {
    const data = req.body;
    Movie.createMovie(data).then((movie) => {
        res.status(201).json(movie);
    }).catch((error) => res.status(400).json(error));
};
const getMovies = (_req, resp) => {
   Movie.getMovies()
        .then((movies) => {
            resp.status(200).send({
                movies
            });
        })
        .catch((error) => {
            resp.status(409).send(error);
        });
};

getMovie = (req, resp) => {
    const {
        id
    } = req.params;

    Movie.getMovie(id)
        .then((movie) => {
            movie ? resp.status(200).send({
                movie
            }) : resp.status(404).send({
                message: "Not Found"
            });
        })
        .catch((error) => {
            resp.status(409).send(error);
        });
};

const searchMovie = (req, resp) => {
    console.log(req.query);
    const {
        title
    } = req.query;

    Movie.searchMovie(title)
        .then((movie) => {
            movie ? resp.status(200).send({
                movie
            }) : resp.status(404).send({
                message: "Not Found"
            });
        })
        .catch((error) => {
            resp.status(409).send(error);
        });

};

const updateMovie = (req, resp) => {
    const {
        id
    } = req.params;
    Movie.updateMovie(id, req.body).then((movie) => {
            movie ? resp.status(200).send({
                movie
            }) : resp.status(404).send({
                message: "Not Found"
            });
        })
        .catch((error) => {
            resp.status(409).send(error);
        });
};
const deleteMovie = (req, resp) => {
    const {
        id
    } = req.params;
    Movie.deleteMovie(id)
        .then((movie) => movie ?
            resp.status(200).send({
                movie
            }) :
            resp.status(403).send({
                message: 'Not Found'
            }))
        .catch((error) => resp.status(409).send(error))
};
/**
 * Eliminar permanentemente de la base de datos
 * @param {*} req
 * @param {*} resp
 */
const removeMovie = (req, resp) => {
    const {
        id
    } = req.params;
    Movie.removeMovie(id)
        .then((movie) => movie ?
            resp.status(200).send({
                movie
            }) :
            resp.status(403).send({
                message: 'Not Found'
            }))
        .catch((error) => resp.status(409).send(error))
};
module.exports = {
    createMovie,
    getMovies,
    getMovie,
    searchMovie,
    updateMovie,
    deleteMovie,
    removeMovie
}
