const express=require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getWeather = require('./utils/weather')

const app = express()

const htmlPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(htmlPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Alexandra Todd'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Some helpful text',
        title: 'Help',
        name: "Alexandra Todd"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Alexandra Todd'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
       return res.send({
        error: 'Address must be provided!'
       })
    }
    const results = geocode(req.query.address, (err, {latitude, longitude, location}={})=>{
        if(err){
            return res.send({error: err})
        }
        getWeather(latitude, longitude, (error, results)=>{
            if(error){
                return res.send({error: error})
            }
            res.send(
                {
                    location, 
                    forecast: `${results.summary} It is currently ${results.temperature} degrees outside. There is a ${results.precipProbability * 100}% chance of rain.`,
                    address : req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Alexandra Todd',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Alexandra Todd',
        message: 'Page not found.'
    })
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})