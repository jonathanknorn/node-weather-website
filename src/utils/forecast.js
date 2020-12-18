const request = require('postman-request')

const forecast = (longitude, latitude ,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c48c8a97c4a3d39355e79b16ed35cea6&query=' + latitude + ',' + longitude
  request({url, json: true},(error, {body}) => {
    if(error){
      callback('Could not connect to weather service', undefined)
    } else if(body.error){
      callback('Unable to find location', undefined)
    } else {
      const temp = body.current.temperature
      const feelslike = body.current.feelslike
      const description= body.current.weather_descriptions[0]
      callback(undefined, description + '. It is currently ' + temp + ' degrees out. It feels like ' + feelslike + ' degrees out.')
    }
  })
}

module.exports = forecast
