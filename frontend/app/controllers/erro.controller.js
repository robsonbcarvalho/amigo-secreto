(function() {
  'use strict';

  angular.module('appAmigoSecreto')
    .controller('ErroController', erroController);

  function erroController() {
    var vm = this;
    vm.erro404 = {
      codigo : 404,
      mensagem : 'Recurso não encontrado!'
    }
  }
})();