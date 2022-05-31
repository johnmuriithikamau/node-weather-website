fetch('http://puzzle.mead.io/puzzle').then((Response) => {

    Response.json().then((data) => {
        console.log(data)
    })

})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#massage-1')
const messageTwo = document.querySelector('#massage-2')


weatherForm.addEventListener('submit', (e) => {

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((Response) => {
        Response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageOne.textContent = data.forecast
            }
        })


    })


    e.preventDefault()
})