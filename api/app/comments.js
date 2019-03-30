const express = require('express');
const router = express.Router();

const createRouter = connection => {
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `comments`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `comments` WHERE `news_id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results) {
                res.send(results);
            } else {
                res.status(404).send({error: "Not found"});
            }
        });
    });
    router.post('/', (req, res) => {
        const comment = req.body;

        connection.query('INSERT INTO `comments` (`news_id`, `author`, `comment`) VALUES (?, ?, ?)', [comment.news_id, comment.author, comment.comment], (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: "Success"});
        });
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `comments` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: error.sqlMessage});
            }
            res.send({message: "Success"});
        });
    });


    return router;
};


module.exports = createRouter;