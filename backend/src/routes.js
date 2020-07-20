const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongController');
const casoController = require('./controllers/casoController');
const perfilController = require('./controllers/perfilController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const sessionUserController = require('./controllers/sessionUserController');
const { min } = require('./database/connection');

//ongs
    routes.post('/ongs', celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            cidade: Joi.string().required(),
            estado: Joi.string().required().length(2),
            tipo: Joi.string().required(),
        })
    }), ongController.create);

    routes.get('/ongs', ongController.list);
    //session (ong)
    routes.post('/sessions', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required(),
        })
    }), sessionController.create);

//casos
    routes.post('/casos',celebrate({
        [Segments.HEADERS]: Joi.object({
            auth: Joi.string().required(),
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            titulo: Joi.string().required(),
            descricao: Joi.string().required(),
            valor: Joi.number().required(),
        })
    }), casoController.create);

    routes.get('/casos', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }), casoController.list);
    
    routes.delete('/casos/:id', celebrate({
        [Segments.HEADERS]: Joi.object({
            auth: Joi.string().required(),
        }).unknown(),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }), casoController.delete);

//perfil
    routes.get('/perfil', celebrate({
        [Segments.HEADERS]: Joi.object({
            auth: Joi.string().required(),
        }).unknown(),
    }), perfilController.list);

//user
    routes.post('/user', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            telefone: Joi.string().required().min(10).max(11),
            senha: Joi.string().required(),
        })
    }), userController.create);

    //session (user)
    routes.post('/sessionsuser', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            senha: Joi.string().required(),
        })
    }), sessionUserController.create);

module.exports = routes;