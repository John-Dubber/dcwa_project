var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({extended:false}))

var DAO = require('./mySQLDAO')

var mongoDAO = require('./mongoDAO')

app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.send(
        "<br><a href='/countries'>List Countries</Link><br><a href='/cities'>List Cities</Link><br><a href='/headsOfState'>List Heads of State</Link>"
    )
})

app.get('/cities', (req, res) => {
    DAO.getCities()
        .then((result) => {
            res.render('showCities', { cities: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/cities/allDetails/:co_code', (req, res) => {
    DAO.getCity(req.params.co_code)
        .then((result) => {
            res.render('showCity', {city: result});
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/countries', (req, res) => {
    DAO.getCountries()
        .then((result) => {
            res.render('showCountries', { countries: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/countries/delete/:country', (req, res)=>{
    DAO.deleteCountry(req.params.country)
    .then((result)=>{
        if(result.affectedRows == 0){
            res.send("<h3>Country: "+req.params.country+ " doesn't exist</h3>")
        }else{
            res.send("<h3>Country: "+req.params.country+" deleted")
        }
    })
    .catch((error)=>{
        res.send("<h3>ERROR</h3>" + error.errno + " cannot delete country with ID:"+ req.params.country + error.sqlMessage)
    })
})

app.get('/countries/edit/:country', (req, res)=>{
    DAO.getCountry(req.params.co_code)
    .then((result)=>{
        res.render('editCountries', { country: result})
    })
    .catch((error)=>{
        res.send(error)
    })
    
})

app.post('/countries.edit/:country', (req, res)=>{
    DAO.editCountry(req.body.country)
    .then((result)=>{
        if(result.affectedRows == 0){
            res.send("<h3>Country: "+req.body.country+ " doesn't exist</h3>")
        }else{
            res.send("<h3>Country: "+req.body.country+" deleted")
        }
    })
    .catch((error)=>{
        res.send("<h3>ERROR</h3>" + error.errno + " cannot delete country with ID:"+ req.body.country + error.sqlMessage)
    })
})

app.get('/addCountry', (req, res) => {
   res.render('addCountry')
})
app.post('/addCountry', (req, res) => {
    DAO.addCountry(req.body.co_code, req.body.co_name, req.body.co_details)
        .then((result) => {
            res.redirect("/countries")
        })
        .catch((error) => {
            res.send(error)
        })
})



app.get('/headsOfState',(req,res)=>{
    mongoDAO.getHeadsOfState()
        .then((documents)=>{
            res.render('showHeadsOfState', {headsOfState:documents})
        })
        .catch((error)=>{
            res.send(error)
        })
})

app.get('/addHeadOfState', (req, res)=>{
    res.render("addHeadOfState")
})

app.post('/addHeadOfState', (req, res)=>{
    mongoDAO.addHeadOfState(req.body._id, req.body.headOfState)
        .then((result)=>{
            res.redirect("/headsOfState")
        })
        .catch((error)=>{
            res.send(error)
        })
})



app.listen(3000, () => {
    console.log("Listening on port 3000");
});