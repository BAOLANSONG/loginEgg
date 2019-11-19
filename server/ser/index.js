const mysql = require("mysql")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    port:"3306",
    password:"123321",
    database:"loginegg"
})

connection.connect(error=>{
    if(error){
        console.log("连接失败")
    }else{
        console.log("链接成功")
    }
})

module.exports = (sql,params=[])=>{
    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        })
    })
}


// new Promise((resolve,reject) => {
//     connection.query('select * from login',(error,data)=>{
//         if(error){
//             reject(error)
//         }else{
//             resolve(data)
//         }
        
//     });   
// })

// module.exports =  connection