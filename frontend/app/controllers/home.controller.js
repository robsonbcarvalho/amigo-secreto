(function() {
  'use strict';

  angular.module('appAmigoSecreto')
    .controller('HomeController', homeController);

  homeController.$inject = ['$http'];

  function homeController($http) {
    let vm = this;
  }
})();
