var mysql = require ('promise-mysql')

var pool

mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'geography'
})
.then((result) => {
    pool = result
})
.catch((error) => {
    console.log(error)
});

var getCities = function(){
    return new Promise((resolve, reject) =>{
        pool.query('select * from city')
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })

    })
}

var getCity = function(cty_code){
    return new Promise((resolve, reject)=>{
        pool.query('select * from city where cty_code = \''+ cty_code +'\';')
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var getCountries = function(){
    return new Promise((resolve, reject) =>{
        pool.query('select * from country')
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })

    })
}

var getCountry = function(co_code){
    return new Promise((resolve, reject)=>{
        pool.query('select * from city where co_code = \''+ co_code +'\';')
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var addCountry = function(co_code, co_name, co_details){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'INSERT INTO COUNTRY(co_code, co_name, co_details) values(?,?,?)',
            values: [co_code, co_name, co_details]
        }
        pool.query(myQuery)
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

var deleteCountry = function(co_code){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'delete from country co_code = ?',
            values: [co_code]
        }
        pool.query(myQuery)
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

var editCountry = function(co_name, co_details, co_code){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'update country set co_name = ?, co_details = ? where co_code = ?',
            values: [co_name, co_details, co_code]
        }
        pool.query(myQuery)
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}
module.exports = {getCities, getCity, getCountries, deleteCountry, editCountry, addCountry, getCountry}