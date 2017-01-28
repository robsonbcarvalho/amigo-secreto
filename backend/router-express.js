const router = require('express').Router();

// Recebe rotas como dependência
module.exports = (Routes) => {
	Routes.forEach((route, index) => {
		router[route.method](route.path, route.action)
	})

	return router
}