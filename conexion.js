//este es un ejemplo de lectura de mongodb mostrado por web con nodejs

var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
var dbTest = new mongodb.Db('unTestDB', server, {safe:false})


var html='<!DOCTYPE html>';
html += '<html>';
html += '<head>';
html += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
html += '</head>';
html += '<body>';
html = '<ul>';

dbTest.open(function (error, client) {
  if (error) throw error;
  var collection = new mongodb.Collection(client, 'personas');
  var cursor = collection.find();
  cursor.each(function(err, item) {
      //console.log(item.nombre);
      if(item != null) html+= '<li>'+item.nombre+'</li>';
      else dbTest.close();
  });


});
html += '</ul>';
html += '</body>';
html += '</html>';


var http = require('http');

http.createServer(function(peticion, respuesta){
  respuesta.writeHead(200, {'Content-Type': 'text/html'});
  respuesta.end( html);
}).listen(3000, '127.0.0.1');
console.log('Servidor iniciado.');
