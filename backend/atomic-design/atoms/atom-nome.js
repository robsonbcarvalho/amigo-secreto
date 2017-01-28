'use strict'

const minlength = 3
const _set = (v) => v.toUpperCase()
const _validate = (v) => v.length > minlength
const _msg = 'O nome deve ser maior que ' + minlength + ' caracteres!'

const Atom = { 
		type: String 
	, set: _set
	, validate: [_validate, _msg]
	, required: true
	, index: true
}

module.exports = Atom