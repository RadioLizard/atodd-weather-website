const request = require('request')

const geocode = (location, callback)=>{
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoib25zdW1iaXQiLCJhIjoiY2p0cnZlaXBjMHVqYzN5b2MxNmdrbjhxbSJ9.P80pHU8sWuqFImu9Ofu7NA&limit=1`
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback(`Error: ${error}`, undefined)
        }
        else if(body.features.length===0){
            callback(`Error: Unable to find location ${body.query[0]}. Try another search.`, undefined)
        }
        else{
            callback(undefined, 
                {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
                }
            )
        }
    })
}

module.exports = geocode