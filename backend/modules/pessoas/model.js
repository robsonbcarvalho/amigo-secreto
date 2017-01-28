'use strict'

const Schema = require('./schema')
const mongoose = require('mongoose')
const Pessoa = mongoose.model('pessoa', Schema)
const querystring = require('querystring')
const url = require('url')

const callback = (err, data, res) => {
	if (err) {
		console.error('ERRO: \n', err)
		res.writeHead(200, {'Content-Type': 'application/json'})
		return res.end(JSON.stringify(err))
	}
	
	res.writeHead(200, {'Content-Type': 'application/json'})
	return res.end(JSON.stringify(data))
} 

const getQuery = (_url) => {
	const url_parts = url.parse(_url)
	return querystring.parse(url_parts.query)
}

const create = (req, res, body, cb) => {
	const pessoa = new Pessoa(body)
	console.log('New User: ', pessoa)
	pessoa.save(cb)
}

const update = (req, res, body, cb) => {
	console.log(body)
	const data = body.data
	const id = data._id

	if(id === undefined) {
		const err = new Error('ID não informado.')
		return callback(err, null)
	} 

	Pessoa.findById(id, (err, pessoa) => {
		if(data.nome !== undefined) pessoa.nome = data.nome
		if(data.email !== undefined) pessoa.email = data.email
		pessoa.save(cb)
	})
}

const detail = (req, res, cb) => {
	const id = req.params.id
	const fields = { amigo: 0 }
	Pessoa.findById(id, fields, cb)
}

// cb é a função de callback para a qual os dados
// serão retornados
const find = (req, res, cb) => {
	const query = req.query
	if (query.nome != undefined)
		query.nome = query.nome.toLowerCase()

	Pessoa.find(query, cb)
}

const findOne = (req, res, cb) => {
	const query = req.query
	Pessoa.findOne(query, cb)
}

const list = (req, res, cb) => {
	Pessoa.find({}, cb)
}

const remove = (req, res, cb) => {
	const id = req.params.id
	Pessoa.findById(id, (err, doc) => {
		doc.remove(cb)
	})
}

const updateAmigo = (id, amigo, cb) => {
	Pessoa.findByIdAndUpdate(id, { $set: { amigo: amigo}}, cb)
}

const MODEL = {
		create
	, find	
	, list 
	, findOne 
	, update 
	, remove
	, detail
	, updateAmigo 
}

module.exports = MODEL