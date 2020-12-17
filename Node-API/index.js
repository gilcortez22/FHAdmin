let express = require("express")
let app = express()
let Sybase = require("sybase")
let bodyParser = require("body-parser")

let db = new Sybase("127.0.0.1", 2638, "admin3", "gilberto", "sql");
//let db = new Sybase("192.168.0.233", 2638, "FH", "gilberto", "sql");

app.use(express.urlencoded({ extended: true }));

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

app.get("/GetTipi", (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  db.query(`select * from tbl_tipificaciones`, (error, data) => {
    //  db.query(`select  * from tbl_productos =${id}`, (error, data) => {
    if (error) throw error;
    response.json(data)
  });

});

app.use(bodyParser.text({ type: "application/json" }));

app.post("/GetCall", (request, response) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  var cliente = request.body.search;
  db.query(`select * from tbl_llamadas_clientes where fecha = date(now()) and codCliente =${cliente}`, (error, data) => {
    if (error) throw error;
    response.json(data)

  });

});

app.post("/ShowPrd", (request, response) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  var cliente = request.body.search;
  db.query(`select  * from tbl_productos where cod_cliente =${cliente} order by vta19+vta20 desc`, (error, data) => {
    if (error) throw error;
    response.json(data)
  });

});


app.post("/GetActualiza", (request, response) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  var cliente = request.body.search;
  db.query(`select * from tbl_actualizacion_datos where codigo =${cliente}`, (error, data) => {
    if (error) throw error;
    response.json(data)

  });

});


app.post("/InsertCall", (request, response) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  
  try {
    var cliente = request.body.search;
    
    var jfecprompag = "";
    var jCSATV = "";
    var jCSATE = "";
    var jprobCompra = "";

    if(cliente[0].fecprompag != 'vacio'){jfecprompag = `'${cliente[0].fecprompag}'`;}else{jfecprompag = "NULL";};
    
    if(cliente[0].CSATV != ""){jCSATV = cliente[0].CSATV;}else{jCSATV = "NULL";};
    
    if(cliente[0].CSATE != ""){jCSATE = cliente[0].CSATE;}else{jCSATE = "NULL";};
    
    if(cliente[0].probCompra != ""){jprobCompra = cliente[0].probCompra;}else{jprobCompra = "NULL";};
    

var qCall =`insert into tbl_llamadas_clientes (fecha, codCliente, tipificacion, subtipificacion, detalle, reclamo, confPedido, FactPdt, FecPromPag, CSATV, CSATE, ProbabilidadCompra,priCont, segCont, terCont) select date(now()), '${cliente[0].codCliente}', '${cliente[0].tipificacion}', '${cliente[0].subtipificacion}', '${cliente[0].detalle}',  '${cliente[0].reclamo}', '${cliente[0].pedido}', '${cliente[0].cobro}' , ${jfecprompag},${jCSATV}, ${jCSATE},${jprobCompra}, NOW(), NOW(), NOW()`;
console.log(qCall)
db.query(qCall, (error, data) => {
      if (error) throw error;
      response.json('Exito')
    });
  } catch (error) {
    console.error(error);
  }
});


app.post("/UpdCall", (request, response) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  
  try {
    var updStr = request.body.search;
    //console.log (updStr) 
   /* db.query(`update tbl_llamadas_clientes set ${updStr}`, (error, data) => {
      if (error) throw error;
      response.json(updStr)
    });*/
  } catch (error) {
    console.error(error);
  }
});

app.post("/UpdCont", (request, response) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  request.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  request.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  
  try {
    var updStr = request.body.search;
    console.log (updStr)
    var qUpd = `update tbl_actualizacion_datos set fecActualizacion = date(NOW()) ${updStr}`; 
    console.log (qUpd);
    db.query(qUpd, (error, data) => {
      if (error) throw error;
      response.json(updStr)
    });
  } catch (error) {
    console.error(error);
  }
});



//app.listen(3000);
app.listen(3000, () => {
  console.log("Runnnig on port 3000")
})  
