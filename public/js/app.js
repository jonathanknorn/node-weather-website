console.log('Client side javascript file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const button = document.querySelector('button')

weatherForm.addEventListener('input', (e) => {
  const text = search.value
  if(text.length == 0){
    button.innerHTML = 'My location'
  } else {
    button.innerHTML = 'Search'
  }
})

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  if(location.length == 0){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeather);
    } else {
      fetchWather(undefined, '')
    }
  } else {
    fetchWeather(undefined, location)
  }
})

const fetchWeather = (position, location) => {
  if(position){
    location = position.coords.longitude + ',' + position.coords.latitude
  }
  console.log(location)
  fetch('/weather?address=' + location).then((response) => {
    response.json().then(({error, forecast, location, address} = {}) => {
      if(error){
        messageOne.textContent = error
      } else {
        messageOne.textContent = location
        messageTwo.textContent = forecast
      }
    })
  })
}
