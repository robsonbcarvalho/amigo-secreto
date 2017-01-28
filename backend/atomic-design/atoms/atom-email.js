'use strict'

const _set = (v) => v.toLowerCase()
const _validate = (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)

const Atom = { 
		type: String 
	, set: _set
	, validate: [_validate, 'Email ({VALUE}) inválido.']
	, required: true
	, index: true
}

module.exports = Atom