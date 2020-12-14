let express = require("express")
let app = express()
let Sybase = require("sybase")
let bodyParser = require("body-parser")

let db = new Sybase("127.0.0.1", 2638, "admin3", "gilberto", "sql");
//let db = new Sybase("192.168.0.233", 2638, "FH", "gilberto", "sql");

app.use(express.urlencoded({ extended:true}));

app.use(bodyParser.json());

db.connect(error => {
  if (error) throw error;
  console.log("Conecta");

});

app.get("/Login", (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  db.query("SELECT * FROM prg.usuarios", (error, data) => {
    if (error) throw error;
    response.json(data);
  });

});

app.get("/ShowCli", (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  db.query("select distinct cl.*,plug_cc from tbl_clientes cl join tbl_cc_d2d cc on cl.plugestor = cc.plugestor where gestor <> 'NULO'", (error, data) => {
    if (error) throw error;
    response.json(data);
  });

});


app.get("/GetCli", (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  db.query("select * from tbl_datos_cliente", (error, data) => {
    if (error) throw error;
    response.json(data);
  });

});



app.get("/ShowPrd", (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  db.query(`select * from tbl_productos`, (error, data) => {
  //  db.query(`select  * from tbl_productos =${id}`, (error, data) => {
      if (error) throw error;
    response.json(data)
  });

});

app.use(bodyParser.text({ type: "application/json" }));

app.post("/ShowPrd",(request,response) =>{
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  //var member = JSON.parse( req.body ); // parse req.body as an object
  var cliente =request.body.search;
  console.log(cliente);
  //db.query(`select * from tbl_productos`, (error, data) => {
      db.query(`select  * from tbl_productos where cod_cliente =${cliente} order by vta19+vta20 desc`, (error, data) => {
        if (error) throw error;
     //   console.log(data)
      response.json(data)
    });
  
});

//app.listen(3000);
app.listen(3000, () => {
  console.log("Runnnig on port 3000")
})  