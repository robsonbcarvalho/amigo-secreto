const Model = require('./model')

const CRUD = {
		create: Model.create
	, find: Model.find
	, findOne: Model.findOne
	, list: Model.list
	, update: Model.update
	, remove: Model.remove
	, detail: Model.detail
	, updateAmigo: Model.updateAmigo
}

module.exports = CRUD