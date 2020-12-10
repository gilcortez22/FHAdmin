let express = require("express")
let app = express()
let Sybase = require("sybase")

let db = new Sybase("localhost", 2638, "FH", "gilberto", "sql");

db.connect(error => {            
    if (error) throw error;
    console.log("Conecta");

});
    
app.get('/prb', (request, response) => {
    const sql = 'SELECT * FROM prg.usuarios';
    
    db.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            response.json(results);
        }else {
            response.send('No hay resultados');
        }
      //  response.send('Lista de usuarios');
    })
    
});
   

app.listen(3000, () => {
    console.log("Runnnig on port 3000");
});  