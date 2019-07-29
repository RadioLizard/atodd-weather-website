const request = require('request')

const getWeather = (latitude, longitude, callback) =>{
 
    const url=`https://api.darksky.net/forecast/4c7c586f0c34c6053eddefaedfe86055/${latitude},${longitude}`

    request({url, json:true}, (error, {body})=>{
        if(error){
            //return console.log('Error: '+error)
            callback(error, undefined)
        }
        else if(body.error){
            //return {console.log(}'Error: '+body.error)
            callback(body.error, undefined)
        }
        else{
            const {temperature, precipProbability} = body.currently
            callback(undefined, {summary:body.daily.data[0].summary, temperature, precipProbability})
        }
    })
}

module.exports = getWeather