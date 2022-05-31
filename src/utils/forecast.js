const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0a3e5ccbbec96efda4215aaf2e6f8f6b' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unaeble to conect to the location', undefined)
        } else if (body.error)
            callback('unable to find location. Try another search', undefined)
        else {
            callback(undefined, body.current.weather_descriptions + '. the temprature is ' + body.current.temperature + ' but it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast