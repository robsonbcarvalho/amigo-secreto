(function() {
  'use strict';

  angular.module('appAmigoSecreto')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider'];

  function routesConfig($stateProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url : '/',
        templateUrl  : 'app/views/home/',
        controller   : 'HomeController',
        controllerAs : 'vm'
      })
      .state('listar', {
        url : '/pessoas/listar',
        templateUrl  : 'app/views/pessoas/listar.html',
        controller   : 'PessoaController',
        controllerAs : 'Pessoa',
        resolve: { action: function() { return 'list'; } }
      })
      .state('cadastrar', {
        url : '/pessoas/cadastrar',
        templateUrl  : 'app/views/pessoas/cadastrar.html',
        controller   : 'PessoaController',
        controllerAs : 'PessoaCreate',
        resolve: { action: function() { return 'create'; } }
      })
      .state('editar', {
        url : '/pessoas/editar/{id}',
        templateUrl  : 'app/views/pessoas/cadastrar.html',
        controller   : 'PessoaController',
        controllerAs : 'PessoaCreate',
        resolve: { action: function() { return 'edit'; } }
      })
      .state('sorteio', {
        url : '/pessoas/sorteio',
        templateUrl  : 'app/views/pessoas/sorteio.html',
        controller   : 'PessoaController',
        controllerAs : 'Pessoa',
        resolve: { action: function() { return 'sorteio'; } }
      })
      .state('detalhes', {
        url : '/pessoas/detalhes/{id}',
        templateUrl  : 'app/views/pessoas/detalhes.html',
        controller   : 'PessoaController',
        controllerAs : 'Detalhes',
        resolve: { action: function() { return 'detail'; } }
      })      
      .state('notFound', {
        url : '/erro/404',
        templateUrl  : 'app/views/erro/404.html',
        controller   : 'ErroController',
        controllerAs : 'vm'
      });

    $locationProvider.html5Mode(true);
  }
})();
