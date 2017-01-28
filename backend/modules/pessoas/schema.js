'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const path = require('path')
const atomFolder = 'atomic-design/atoms/'
const upFolders = '../..'

function getAtom(atom) {
	return require(
		path.join(__dirname, upFolders, atomFolder, atom) 
	)
}

const pessoaSchema = new Schema({
		nome: getAtom('atom-nome')
	, email: getAtom('atom-email')
	, amigo: getAtom('atom-amigo')
})

pessoaSchema
	.virtual('temAmigo')
	.get(function(){
		return this.amigo === undefined ? false : true
	})

pessoaSchema.set('toObject', { virtuals: true })
pessoaSchema.set('toJSON', { virtuals: true })

module.exports = pessoaSchema