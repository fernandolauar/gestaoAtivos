angular.module('starter.controllers', [])

    .controller('ListMecanicaCtrl', function($scope, Chats, ListagemService, $ionicModal, ImageUtil, FileUtil) {

        $scope.$on('$ionicView.enter', function(ev) {
            obterListagens();
        });

        var listagens = [];
        var fl="";
        function obterListagens() {
            listagens = ListagemService.getListagens();
            $scope.listagem = listagens;
            
            return listagens;
        }

        $scope.remove = function(index) {
            listagens.splice(index, 1);
        }


        $scope.closeModalMecanica = function() {
            $scope.closeModal();
            obterListagens();
        }

        function getName(){
            var today = new Date();
            return today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString() + ".jpg";
        }

        $scope.salvarListagemMecanica = function(listagem) {
          

          if(fl =="new"){
             // if(imageCamera != "undefined"){
             //   console.log("savar"+getName());
             //     listagem.img = getName();
            //      FileUtil.save(imageCamera, listagem.img);
            //  }
              ListagemService.addListagem(listagem);

            } else{
              //  if(imageCamera != "undefined"){
               //         if(listagem.img != "undefined"){
               //             FileUtil.save(imageCamera, listagem.img);
                //        }
               // }
              ListagemService.editListagem(listagem);

            }
            obterListagens();
            $scope.closeModal();
        }


        $scope.excluirListagemMecanica = function(listagem){
          ListagemService.deleteListagem(listagem);
          obterListagens();
        }


        $scope.onclickCamera = function(){

            ImageUtil.getImage(ImageUtil.cameraOptions.CAMERA,
                
                    function(imageData){

                        $scope.imageCamera = "data:image/jpeg;base64," + imageData;

                    },
                    function(err){

                    console.log("Imagem não gravada, tente novamente!"); 
                    }
            
            );

        }

        $scope.onclickOpenGallery = function(){

            ImageUtil.getImage(ImageUtil.cameraOptions.GALLERY,
                
                    function(imageData){

                        $scope.imageCamera = "data:image/jpeg;base64," + imageData;

                    },
                    function(err){

                    console.log("Imagem não gravada, tente novamente!"); 
                    }
            
            );

        }        

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });



        $scope.abrirModalMecanica = function() {

            $scope.listagem = {
                id : 0,
                item: "",
                fabricante: "",
                modelo: "",
                capPrimaria: "",
                capSecundaria: "",
                obs: "",
                img: ""
            }
            fl = "new";
            $scope.openModal();


        }

        $scope.alterarModalMecanica = function(listagem) {

            $scope.listagem = {
                id : listagem.id,
                item: listagem.item,
                fabricante: listagem.fabricante,
                modelo: listagem.modelo,
                capPrimaria: listagem.capPrimaria,
                capSecundaria: listagem.capSecundaria,
                obs: listagem.obs,
                img: listagem.img
            }
            fl = "apply";
            $scope.openModal();

        }
    })

    .controller('ListEletricaCtrl', function($scope, Chats, ListagemEletricaService, $ionicModal, $http) {

      var listagensEletrica = [];
      var fl="";
      var listSelect;
            var listSelect2;
      $scope.$on('$ionicView.enter', function(ev) {
            obterListagensEletrica();
          getComboUm();
          getComboDois();
          getComboTres(); 
      });

        function getComboUm(){
          $http.get('js/comboUm.json').then(function(res) {
              $scope.comboUm = res.data;
          });
        }

        $scope.selected = function(item) {

            if(item && item.id){
              $scope.comboDoisFiltrado = _.filter($scope.comboDois, function(itemComboDois){ return itemComboDois.idPai == item.id; });
            }
          listSelect = item;

        };

        function getComboDois(){
            $http.get('js/comboDois.json').then(function(res) {
                $scope.comboDois = res.data;
            });

        }

        $scope.selectedItemDois = function(item) {

          if(item && item.idPai){

            $scope.comboTresFiltrado = _.filter($scope.comboTres, function(itemComboTres){ return itemComboTres.campo == item.campoA2; });
            $scope.comboQuatroFiltrado = _.filter($scope.comboTres, function(itemComboQuatro){ return itemComboQuatro.campo == item.campoA3; });
            $scope.comboQuintoFiltrado = _.filter($scope.comboTres, function(itemComboQuinto){ return itemComboQuinto.campo == item.campoA4; });
            $scope.comboSextoFiltrado = _.filter($scope.comboTres, function(itemComboSexto){ return itemComboSexto.campo == item.campoA5; });
            $scope.comboSetimoFiltrado = _.filter($scope.comboTres, function(itemComboSetimo){ return itemComboSetimo.campo == item.campoA6; });
          }
          listSelect2 = item;

        };

        function getComboTres(){
            $http.get('js/comboA2A6.json').then(function(res) {
                $scope.comboTres = res.data;
            });

        }

        function obterListagensEletrica() {

            listagensEletrica = ListagemEletricaService.getListagensEletrica();
            $scope.listagemEletrica = listagensEletrica;
            return listagensEletrica;
        }

        $scope.remove = function(index) {
            listagensEletrica.splice(index, 1);
        }


        $scope.closeModalEletrica = function() {
            $scope.closeModal();
            obterListagensEletrica();
        }

        $scope.salvarListagemEletrica = function(listagemEletrica) {

          listagemEletrica.codigoTuc = listSelect.id;
          listagemEletrica.descricaoTuc = listSelect.name;
          listagemEletrica.descricaoA1 = listSelect.descricaoA1;

          if (typeof listSelect2 == 'undefined'){
              alert("Campo A1 obrigatório");
          } 
          listagemEletrica.descricaoA2 = listSelect2.descricao;

          if(fl =="new"){
              ListagemEletricaService.addListagemEletrica(listagemEletrica);

              
            } else{
              ListagemEletricaService.editListagemEletrica(listagemEletrica);


            }
            obterListagensEletrica();
              getComboUm();
            $scope.closeModal();
        }


        $scope.excluirListagemEletrica = function(listagemEletrica){
          ListagemEletricaService.deleteListagemEletrica(listagemEletrica);
          
          obterListagensEletrica();
        }



        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });



        $scope.abrirModalEletrica = function() {
            $scope.listagemEletrica = {
                id : 0,
                local: "",
                codigoTuc: "",
                descricaoTuc: "--Please select--",
                descricaoA1: "",
                descricaoA2: "",
                descricaoA3: "",
                descricaoA4: "",
                descricaoA5: "",
                descricaoA6: "",
                obs: ""
            }
            fl = "new";
            $scope.openModal();


        }

        $scope.alterarModalEletrica = function(listagemEletrica) {

            $scope.listagemEletrica = {
                id : listagemEletrica.id,
                local: listagemEletrica.local,
                codigoTuc: listagemEletrica.codigoTuc,
                descricaoTuc: listagemEletrica.descricaoTuc,
                descricaoA1: listagemEletrica.descricaoA1,
                descricaoA2: listagemEletrica.descricaoA2,
                descricaoA3: listagemEletrica.descricaoA3,
                descricaoA4: listagemEletrica.descricaoA4,
                descricaoA5: listagemEletrica.descricaoA5,
                descricaoA6: listagemEletrica.descricaoA6,
                obs: listagemEletrica.obs

               
            }
            fl = "apply";
            $scope.openModal();

        }
    })

    .controller('ListSincronizacaoCtrl', function($scope, Chats, SincronizacoesService) {

        $scope.$on('$ionicView.enter', function(ev) {
            obterSincronizacoes();
            $scope.Sincronizacao = {
                id : 0,
                data: new Date(),
                lista : "E"
            }
        });

        var sincronizacoes = [];

        function obterSincronizacoes() {
            sincronizacoes = SincronizacoesService.getSincronizacoes();
            $scope.sincronizacao = sincronizacoes;
            return sincronizacoes;
        }



        $scope.salvarSincronizacao = function() {

              SincronizacoesService.addSincronizacao($scope.Sincronizacao);

            obterSincronizacoes();
        }



    });
