'use strict'

const PessoaController = require('./controller')

const responseJSON = function(err, data, res) {
	if(err) res.json(err)
	res.json(data)
}

function acceptsJSON(req) {
	if(req.accepts('json') !== false) {
		console.log('JSON solicitado')
		return true
	}
	return false
}

const Actions = {}

Actions.list = (req, res) => {
	console.log('listar')

	PessoaController.list(req, res, (err, data) => {
			data.forEach( function(el) { delete el.amigo } )
			return responseJSON(err, data, res)
	})
},

Actions.detail = (req, res) => {
	PessoaController.detail(req, res, (err, data) => {
		return responseJSON(err, data, res)
	})
},

Actions.create = (req, res) => {
	let body = req.body
	if(body.data !== undefined)
		body = body.data

	PessoaController.create(req, res, body, (err, data) => {
		return responseJSON(err, data, res)
	})
},

Actions.update = (req, res) => {
	const body = req.body
	PessoaController.update(req, res, body, (err, data) => {
		return responseJSON(err, data, res)
	})
},

Actions.remove = (req, res) => {
	PessoaController.remove(req, res, (err, data) => {
		console.log('remove: ', data)
		return responseJSON(err, data, res)
	})
},

Actions.sorteio = (req, res) => {
	PessoaController.list(req, res, (err, data) => {
			const sendMail = require('../app.mail')
			const pessoas = data.slice(0)

			data.sort(function(a, b){return 0.5 - Math.random()})

			pessoas.forEach( function(el, index) {
				let idx = data[0].nome != el.nome ? 0 : 1
				
				if(data.length == 2 && idx == 0 && data[1].nome == pessoas[pessoas.length-1].nome){
					console.log('Correção: ' + data[1].nome + ' ' + pessoas[pessoas.length-1].nome)
					idx = idx == 0 ? 1 : 0
				}

				let amigo = { 
						nome: data[idx].nome
					, email: data[idx].email 
				}
				
				data.splice(idx, 1)

				//console.log('\n => ' + el.nome + '\n\t Amigo: ' + amigo)

				PessoaController.updateAmigo(el.id, amigo.nome, (err, data) => {
					const mailData = {
					    from: 'noreply@amigosecreto.com'
						,	to: el.email
					  ,  subject: 'Sorteio do Amigo Secreto'
					  ,  text: 'Seu amigo secreto: ' + amigo.nome
					  ,  html: 'Seu amigo secreto: <b>' + amigo.nome + '</b>'
					}

					sendMail(mailData, (err, data) => {
						if(data.response == '250 Ok'){
							el.emailEnviado = true
						}

						console.log(data)
					})
				})
			});

			PessoaController.list(req, res, (err, newData) => {
				return responseJSON(err, newData, res)
			})
	})
}

module.exports = Actions