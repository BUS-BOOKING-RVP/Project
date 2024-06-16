const c = require('config');
const express = require('express');
const mysql = require('mysql');
const config=require('config');



const app=express.Router();
const connectionDetails = {
    host:config.get("host"),
    database:config.get("database"),
    port:config.get("serverport"),
    user:config.get("user"),
    password:config.get("password")
};



app.get('/',(request,response)=>{
    let sql = 'SELECT * FROM user';
    let connection=mysql.createConnection(connectionDetails);
    connection.query(sql,(err,result)=>{
        response.setHeader("content-type","application/json");
        if(err==null)
        {
            response.write(JSON.stringify(result));
        }
        else{
            response.write(JSON.stringify(err));
        }
        connection.end();
        response.end();
    })
});

app.post("/",(request,response)=>{
    let firstName=request.body.firstName;
    let lastName=request.body.lastName;
    let mobile=request.body.mobile;
    let email=request.body.email;
    let password=request.body.password;

    let queryText=`insert into user(firstName,lastName,mobile,email,password) values('${firstName}','${lastName}','${mobile}','${email}','${password}');`;
    console.log(queryText);

    let connection=mysql.createConnection(connectionDetails);
    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        if(err==null)
        {
            response.write(JSON.stringify(result));
        }
        else{
            response.write(JSON.stringify(err));
        }
        connection.end();
        response.end();
    })
});

app.put("/:userid",(request,response)=>{
    
    let firstName=request.body.firstName;
    let lastName=request.body.lastName;
    let mobile=request.body.mobile;
    let email=request.body.email;
    let password=request.body.password;


    let queryText=`update user set firstName='${firstName}',lastName='${lastName}',mobile='${mobile}',email='${email}',password='${password}' where userID=${request.params.userid}`;
    
    console.log(queryText);

    let connection=mysql.createConnection(connectionDetails);
    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        if(err==null)
        {
            response.write(JSON.stringify(result));
        }
        else{
            response.write(JSON.stringify(err));
        }
        connection.end();
        response.end();
    })
});

app.delete("/:userid",(request,response)=>{
    let firstName=request.body.firstName;
    let lastName=request.body.lastName;
    let mobile=request.body.mobile;
    let email=request.body.email;
    let password=request.body.password;

    let queryText=`delete from user where userID=${request.params.userid}`;
    
    console.log(queryText);

    let connection=mysql.createConnection(connectionDetails);
    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        if(err==null)
        {
            response.write(JSON.stringify(result));
        }
        else{
            response.write(JSON.stringify(err));
        }
        connection.end();
        response.end();
    })
});


module.exports=app;