const express = require('express');
const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')

const connection = mysql.createConnection(config);

const create_table = 'CREATE TABLE IF NOT EXISTS PEOPLE(id int not null auto_increment, nome varchar(255) not null, primary key(id));'
connection.query(create_table);

const sql = `INSERT INTO PEOPLE(nome) values ('Gustavo')`;
connection.query(sql);
connection.end();
const port = 3000;

app.get("/", (req, res) =>{
    const connection = mysql.createConnection(config);
    var response = "<h1>Full Cycle Rocks!</h1>";
    const sql = "SELECT * FROM PEOPLE";
 
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
        response += "<ul>"
        console.log(results);
        results.forEach(result =>{
            response += `<li>${result.nome}</li>`;
        })

        response += "</ul>";
        res.send(response);
    });
   
    connection.end();
})

app.listen(port, ()=>{
    console.log("rodando na porta "+port)
});