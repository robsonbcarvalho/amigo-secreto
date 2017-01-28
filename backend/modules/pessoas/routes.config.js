'use strict'

module.exports = (Actions) => { 
	const Routes = [
		{
			method: 'get',
			path: '/sorteio',
			action: Actions.sorteio
		},
		{
			method: 'get',
			path: '/',
			action: Actions.list
		},
		{
			method: 'get',
			path: '/:id',
			action: Actions.detail
		},	
		{
			method: 'post',
			path: '/',
			action: Actions.create
		},
		{
			method: 'put',
			path: '/',
			action: Actions.update
		},
		{
			method: 'delete',
			path: '/:id',
			action: Actions.remove
		}
	]

	return Routes
}