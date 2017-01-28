(function() {
  'use strict';

angular.module('app.pessoa', [])
  .service('PessoaService', function($http, $stateParams){
    const baseUrl = 'http://localhost:3000/api/pessoas/';
    const acceptJson = {"Accept":"application/json"};

    this.list = function() {
        const config = { headers : acceptJson }

        return $http.get(baseUrl, config);
    }

    this.create = function(pessoa) {
      const config = {
          data: pessoa
        , headers : acceptJson 
      }

      return $http.post(baseUrl, config);
    }

    this.detail = function() {
      const url = baseUrl + $stateParams.id;
      const config = { headers : acceptJson }

      return $http.get(url, config);
    }

    this.update = function(pessoa) {
      console.log(pessoa);
      const config = {
          data: pessoa
        , headers : acceptJson 
      }

      return $http.put(baseUrl, config);
    }

    this.remove = function(id) {
      const url = baseUrl + id;
      const config = { headers : acceptJson }

      return $http.delete(url, config)
    }

    this.sorteio = function() {
        const url = baseUrl + 'sorteio';
        const config = { headers : acceptJson }

        return $http.get(url, config);
    }

  })
  .controller('PessoaController', ['PessoaService', 'action', function(PessoaService, action){
    let vm = this;
    vm.action = action;
    vm.editing = false;
    vm.updated = false;
    vm.pessoas = [];
    vm.keysLength = 2;
    vm.deleteMarks = [];

    switch(vm.action) {
      case 'edit': 
      case 'detail': 
        detail(); 
      break;

      default:
        list();
    }

    function list() {
      PessoaService
      .list()
        .then(
          function(res){
            if(res.data.length === 0)
              return;

            console.log('Data List', res.data);
            vm.pessoas = res.data;
          },
          function(err){
            console.log('Erro: ', err);
          }
        )
    }

    vm.submitCreateForm = submitCreateForm;
    function submitCreateForm(pessoa) {
      PessoaService
      .create(pessoa)
        .then(
          function(res){
            vm.createErrors = [];
            let errors = res.data.errors;

            if(angular.isObject(errors)) {
              for(let err in errors){ 
                console.log(errors[err].message);
                vm.createErrors.push(errors[err].message);
              }
              return;
            }
            console.log('Data Create', res.data);
            vm.pessoas.push(res.data);
            vm.editing = true;
            vm.recentId = res.data._id;
          },
          function(err){
            vm.createErrors.push(errors[err].message);
            console.log('Erro: ', err);
          }
        )
    }

    function detail() {
      PessoaService
      .detail()
        .then(
          function(res){
            console.log('Data Detail', res.data);
            vm.pessoa = res.data;
            edit(vm.pessoa, vm.pessoa._id)
          },
          function(err){
            console.log('Erro: ', err);
          }
        )
    }

    vm.edit = edit;
    function edit(pessoa, index) {
      console.log(index);
      vm.form = angular.copy(pessoa);
      vm.form.index = index;
      vm.editing = true; 
    }

    vm.novo = novo;
    function novo(){
      vm.editing = false;
      location.href = 'pessoas/cadastrar'
    }

    vm.submitEditForm = submitEditForm;
    function submitEditForm(pessoa) {
      if(pessoa._id === undefined && vm.recentId !== undefined)
        pessoa._id = vm.recentId

      vm.updated = false;

      PessoaService
      .update(pessoa)
        .then(
          function(res){ //success
            vm.updateErrors = [];
            let errors = res.data.errors;

            if(angular.isObject(errors)) {
              for(var err in errors){ 
                console.log(errors[err].message);
                vm.updateErrors.push(errors[err].message);
              }
              return;
            }
            vm.updated = true;
            console.log('Data Update:', res.data);
          },
          function(err){
            console.log('Erro: ', err);
          }
        )
    }

    vm.markRemove = markRemove;
    function markRemove(pessoaId, event) {
      var elem = event.srcElement;
      console.log('pessoaId: ', pessoaId + ' ' + elem.checked);
      if(elem.checked)
        vm.deleteMarks.push(pessoaId);
      else {
        var i = vm.deleteMarks.indexOf(pessoaId);
        vm.deleteMarks.splice(i, 1)
      }
      console.log(vm.deleteMarks);
    }

    function removeFromModel() {
      vm.pessoas = vm.pessoas.filter(function(el) {
        return vm.deleteMarks.indexOf(el._id) == -1
      })

      vm.deleteMarks = [];
    }

    function removeFromDatabase(id) {
      PessoaService
      .remove(id)
        .then(
          function(res){ //success
            vm.deleteErrors = [];
            var errors = res.data.errors;

            if(angular.isObject(errors)) {
              for(var err in errors){ 
                console.log(errors[err].message);
                vm.deleteErrors.push(errors[err].message);
              }
              return;
            }

            removeFromModel();

            console.log('Data Remove: ', res.data);
          },
          function(err){
            console.log('Erro: ', err);
          }
        )
    }

    vm.remove = remove;
    function remove(pessoas) {
      if(vm.deleteMarks.length == 0){
        alert('Nenhum item selecionado.');
        return;
      }

      if(confirm('Confirme exclusão?')) {
        vm.deleteMarks.forEach(function(id){ 
          removeFromDatabase(id); 
        })
      } else {
        alert('Exclusão cancelada!')
      }
    }

    vm.sortear = sortear;
    function sortear() {
      vm.emailEnviado = false;

      PessoaService
      .sorteio()
        .then(
          function(res){ 
            console.log('Data Sorteio', res.data);
            vm.pessoas = res.data;
            vm.emailEnviado = true;
          },
          function(err){ 
            console.log('Erro: ', err);
          }
        )
    }

  }])

  .directive('autoFocus', function($timeout) {
      return {
          restrict: 'AC',
          link: function(_scope, _element) {
              $timeout(function(){
                  _element[0].focus();
              }, 0);
          }
      };
  })

})();