const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    router.get('/', (req, res) => {
        connection.query('SELECT `id`, `title`, `image`, `date` FROM `news`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `news` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: "Not found"});
            }
        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        const news = req.body;

        if (req.file) {
            news.image = req.file.filename;
        }

        connection.query('INSERT INTO `news` (`title`, `description`, `image`, `date`) VALUES (?, ?, ?, ?)', [news.title, news.description, news.image, news.date], (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: "Success"});
        });

    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `news` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: error.sqlMessage});
            }
            res.send({message: "Success"});
        });
    });

    return router;
};


module.exports = createRouter;