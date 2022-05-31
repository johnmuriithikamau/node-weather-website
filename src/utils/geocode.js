const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1Ijoiam9obm1vcmVlIiwiYSI6ImNsMTR2MXg5NDBkeWMzaXNncjRieHhqaG0ifQ.TeqWIMYXM89qXBfwTNuncA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unaeble to conect to the location', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[1].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

//module.exports = geocode