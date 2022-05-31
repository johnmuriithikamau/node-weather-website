const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('http')


const app = express()

// Define Path of Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const veiwsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')

// Set Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', veiwsPath)
hbs.registerPartials(partialsPath)

// Setup  static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Kamau'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'John Kamau'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {

        msg: 'If you want to know more about us please contact this number',
        title: 'Help',
        name: 'John Kamau'

    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please fill in the Address'
        })
    }

    geolocation(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: 'adrress!'
            })
        }


        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error: 'Forcast!'
                })
            }
            res.send({
                location,
                forecast: forcastData,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }


    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'John Kamau',
        error404msg: 'Help article not found'
    })


})


app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'John Kamau',
        error404msg: 'Page not found'
    })

})


app.listen(3000, () => {
    console.log('server is up on port 3000.')
})