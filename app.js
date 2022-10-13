import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from './config.js'

import {PORT} from './config.js'
import bodyParser from 'body-parser';
import express from 'express';
import mysql from "mysql2";

var app=express()


var con=mysql.createConnection({
  host: DB_HOST,
  user:DB_USER,
  password:DB_PASSWORD,
  database: DB_NAME
})


app.use(express.static('public'))

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended:true
}))

app.post('/addUser',(req,res)=>{
  let nombrePokemon=req.body.NombrePokemon
  let nombreEntrenador=req.body.NombreEntrenador
  let tipo=req.body.tipo
  let ataque=req.body.ataque
  let id=req.body.idEntrenador
  

  con.query('INSERT INTO pokemones VALUES("'+nombrePokemon
          +'","' + tipo
          +'","' + nombreEntrenador
          +'","' + ataque
          +'","' + id
          + '")',(err,respuesta,fields)=>{

      if (err)return console.log("Error",err)

      return res.send(`<link href="css/get.css" rel="stylesheet" type="text/css" />
                      <h1>Se registro a: ${nombreEntrenador}</h1> `+
                      `<h2>Con los datos Nombre Pokemon: ${nombrePokemon}</h2> `+ 
                      `<h2>Tipo : ${tipo}</h2> `+ 
                      `<h2>Ataque : ${ataque}</h2> `+ 
                      `<h2>id Entrenador : ${id}</h2> 
                      <a href="index.html">Volver al inicio</a>`)


  })

})


app.get('/getUsers',(req,res)=>{
  
  con.query('SELECT * FROM pokemones',(err,respuesta,field)=>{
      if(err) return console.log('ERROR:',err)

      var userHTML=``
      var i=0
      console.log(respuesta)
      respuesta.forEach(user=>{
          i++
          userHTML+=`<tr><td>${i}</td><td>${user.entrenador}</td>`+
                  `<td>${user.id}</td>`+
                  `<td>${user.nombre}</td>`+
                  `<td>${user.tipo}</td>`+
                  `<td>${user.ataque}</td></tr>`
          
      })

      return res.send(`
      <link href="css/get.css" rel="stylesheet" type="text/css" />
      <table>
          <thead>
              <tr>
                  <th>id </th>
                  <th>Nombre del Entrenador: </th>
                  <th>Id Etrenador: </th>
                  <th>Pokemon: </th>
                  <th>Tipo: </th>
                  <th>Ataque: </th>
              </tr>
          </thead>
          ${userHTML}
          </table>
          <a href="index.html">Volver al inicio</a>`)
  })
})

app.post('/deleteUser',(req,res)=>{
  let id=req.body.idEntrenador1
  let entrenador=req.body.NombreEntrenador1

  con.query('delete from pokemones where id="'+id+'"',(err,respuesta,fields)=>{

      if (err)return console.log("Error",err)

      return res.send(`<link href="css/get.css" rel="stylesheet" type="text/css" />
                      <h1>Se ha eliminado a: ${entrenador}</h1>
                      <a href="index.html">Volver al inicio</a>`)


  })

})


app.post('/updateUser',(req,res)=>{
  let nombrePokemon=req.body.NombrePokemon2
  let nombreEntrenador=req.body.NombreEntrenador2
  let tipo=req.body.tipo2
  let ataque=req.body.ataque2
  let id=req.body.idEntrenador2
  

  con.query('UPDATE pokemones SET entrenador = "' +nombreEntrenador+
          '",  nombre = "' + nombrePokemon +
          '",  tipo = "' + tipo +
          '",  ataque = "' + ataque
          +'" where id="'+ id +'"',(err,respuesta,fields)=>{

      if (err)return console.log("Error",err)

      return res.send(`<link href="css/get.css" rel="stylesheet" type="text/css" />
                      <h1>Se actualizo los datos de : ${nombreEntrenador}</h1> `+
                      `<h2>Con los datos Nombre Pokemon: ${nombrePokemon}</h2> `+ 
                      `<h2>Tipo : ${tipo}</h2> `+ 
                      `<h2>Ataque : ${ataque}</h2> `+ 
                      `<h2>id Entrenador : ${id}</h2> 
                      <a href="index.html">Volver al inicio</a>`)


  })

})


app.listen(PORT,()=>{
  console.log("Servidor escuchando en el puerto ", PORT)
})