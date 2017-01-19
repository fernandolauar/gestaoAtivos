angular.module('starter.services', [])

.service('ListagemService', function($cordovaSQLite){

  var db = null;
  if(window.cordova) {
      // used in cell phones
      db = $cordovaSQLite.openDB({name: "ativos.db"});
  } else {
      // used in web browsers
      db = window.openDatabase("ativos.db", "1.0", "ativos", -1);
  }

  //$cordovaSQLite.execute(db, "DROP TABLE mecanica");
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS mecanica (id INTEGER PRIMARY KEY AUTOINCREMENT, item text, fabricante text, modelo text, "+
                               " capPrimaria text, capSecundaria text, obs text)");    


  this.getListagens = function(){

    var listagens = [];
    var query = "select * from mecanica";
        $cordovaSQLite.execute(db,query,[]).then(function(result) {
            if(result.rows.length > 0){
                for(var i = 0; i < result.rows.length; i++) {
                    listagens.push({item: result.rows.item(i).item, 
                                            fabricante: result.rows.item(i).fabricante,
                                            id: result.rows.item(i).id,
                                            modelo: result.rows.item(i).modelo, 
                                            capPrimaria: result.rows.item(i).capPrimaria,
                                            capSecundaria: result.rows.item(i).capSecundaria,
                                            obs: result.rows.item(i).obs
                            });
                }
                
            } else {
              
                listagens = [];
            }
        }, function(error){
            
        });

    return listagens;

  }

  this.addListagem = function(listagem){
      var query = "insert into mecanica (item, fabricante, modelo, capPrimaria, capSecundaria, obs) values (?,?,?,?,?,?)";
              $cordovaSQLite.execute(db,query,[listagem.item, listagem.fabricante, listagem.modelo, listagem.capPrimaria, listagem.capSecundaria, listagem.obs]).then(function(result) {

              }, function(error){

              });    

  }

  this.editListagem = function(listagem){
      var query = 'update mecanica set item = ?, fabricante = ?, modelo = ?, capPrimaria = ?, capSecundaria = ?, obs = ? where id = ?';
              $cordovaSQLite.execute(db,query,[listagem.item, listagem.fabricante, listagem.modelo, listagem.capPrimaria, listagem.capSecundaria, listagem.obs, listagem.id]).then(function(result) {

              }, function(error){

              });

        

  }

  this.deleteListagem = function(listagem){
        var query = "delete from mecanica where id = ?";
        $cordovaSQLite.execute(db,query,[listagem.id]).then(function(result) {

        }, function(error){

        });
  }


})


.service('ListagemEletricaService', function($cordovaSQLite){

  var db = null;

  if(window.cordova) {
      // used in cell phones

      db = $cordovaSQLite.openDB({name: "ativos.db", location:0});
      } else {
     //  used in web browsers
      db = window.openDatabase("ativos.db", "1.0", "ativos", -1);
  }

  //$cordovaSQLite.execute(db, "DROP TABLE eletrica");
  
  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS eletrica (id INTEGER PRIMARY KEY AUTOINCREMENT, local text, descricaoTuc text, codigoTuc text, "+
                              " descricaoA1 text, descricaoA2 text, descricaoA3 text, descricaoA4 text, descricaoA5 text, descricaoA6 text, obs text)");                                        

  this.getListagensEletrica = function(){

    var listagensEletrica = [];
    var query = "select * from eletrica";
        $cordovaSQLite.execute(db,query,[]).then(function(result) {
            if(result.rows.length > 0){
                for(var i = 0; i < result.rows.length; i++) {
                    listagensEletrica.push({codigoTuc: result.rows.item(i).codigoTuc, 
                                            descricaoTuc: result.rows.item(i).descricaoTuc,
                                            id: result.rows.item(i).id,
                                            descricaoA1: result.rows.item(i).descricaoA1, 
                                            descricaoA2: result.rows.item(i).descricaoA2,
                                            descricaoA3: result.rows.item(i).descricaoA3,
                                            descricaoA4: result.rows.item(i).descricaoA4,
                                            descricaoA5: result.rows.item(i).descricaoA5,
                                            descricaoA6: result.rows.item(i).descricaoA6,
                                            local: result.rows.item(i).local,
                                            obs: result.rows.item(i).obs
                            });
                }
                
            } else {
              
                listagensEletrica = [];
            }
        }, function(error){
            alert(error);
        });

    return listagensEletrica;

  }

  this.addListagemEletrica = function(listagemEletrica){
      var query = "insert into eletrica (local, codigoTuc, descricaoTuc, descricaoA1, descricaoA2, descricaoA3, descricaoA4, descricaoA5,descricaoA6,obs) values (?,?,?,?,?,?,?,?,?,?)";
              $cordovaSQLite.execute(db,query,[listagemEletrica.local, listagemEletrica.codigoTuc, listagemEletrica.descricaoTuc, listagemEletrica.descricaoA1, listagemEletrica.descricaoA2, listagemEletrica.descricaoA3, listagemEletrica.descricaoA4, 
                  listagemEletrica.descricaoA5, listagemEletrica.descricaoA6, listagemEletrica.obs]).then(function(result) {

              }, function(error){

              });
  }

  this.editListagemEletrica = function(listagemEletrica){
    
      var query = 'update eletrica set local =?, codigoTuc = ?, descricaoTuc = ?, descricaoA1 = ?, descricaoA2 = ?, descricaoA3 = ?, '+
                ' descricaoA4 = ?, descricaoA5 = ?, descricaoA6 = ?, obs = ? where id = ?';
              $cordovaSQLite.execute(db,query,[listagemEletrica.local, listagemEletrica.codigoTuc, listagemEletrica.descricaoTuc, listagemEletrica.descricaoA1, listagemEletrica.descricaoA2, listagemEletrica.descricaoA3, listagemEletrica.descricaoA4, 
                          listagemEletrica.descricaoA5, listagemEletrica.descricaoA6, listagemEletrica.obs, listagemEletrica.id]).then(function(result) {

              }, function(error){
                console.log(error);
              });
  }

  this.deleteListagemEletrica = function(listagemEletrica){
        var query = "delete from eletrica where id = ?";
        $cordovaSQLite.execute(db,query,[listagemEletrica.id]).then(function(result) {

        }, function(error){

        });

  }


})



.service('SincronizacoesService', function($cordovaSQLite){

  var db = null;
  if(window.cordova) {
      // used in cell phones
      db = $cordovaSQLite.openDB({name: "ativos.db"});
  } else {
      // used in web browsers
      db = window.openDatabase("ativos.db", "1.0", "ativos", -1);
  }

  //$cordovaSQLite.execute(db, "DROP TABLE sincronizacao");
  
 $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS sincronizacao (id INTEGER PRIMARY KEY AUTOINCREMENT, data date, lista text)");




  this.getSincronizacoes = function(){

    var sincronizacoes = [];
    var query = "select * from sincronizacao";
        $cordovaSQLite.execute(db,query,[]).then(function(result) {
            if(result.rows.length > 0){
                for(var i = 0; i < result.rows.length; i++) {
                    sincronizacoes.push({data: result.rows.item(i).data, 
                                            lista: result.rows.item(i).lista,
                                            id: result.rows.item(i).id
                            });
                }
                
            } else {
              
                sincronizacoes = [];
            }
        }, function(error){
            
        });
    return sincronizacoes;

  }

  this.addSincronizacao = function(sincronizacao){
      var query = "insert into sincronizacao (data, lista) values (?,?)";
              $cordovaSQLite.execute(db,query,[sincronizacao.data, sincronizacao.lista]).then(function(result) {

              }, function(error){

              });
  }


})


.factory("FileUtil", function($cordovaFile){

  var util ={};

  util.save = function(dataUrl, name){


      $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, 
                            name, dataUrl, true).then(
                                  function(result){
                                      console.log("Sucesso");

                                  },
                                  function(err){


                                  }

                            )

  };


  return util;

})

.factory("ImageUtil", function($cordovaCamera){

  var util = {};
            
  util.cameraOptions = {

    CAMERA : 1,
    GALLERY : 2
  }


  util.getImage = function(option, sucess, error){

            var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: option,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {

            sucess(imageData);
            }, function(err) {
            error(err);
            });

  };


  return util;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
