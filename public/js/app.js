const form = document.querySelector('form')
const input = document.querySelector('input')
const error = document.querySelector('#error')
const message = document.querySelector('#message')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    error.textContent = ''
    message.textContent = 'loading...'
    fetch(`/weather?address=${input.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                error.textContent=data.error
                message.textContent=""
            }
            else{
                error.textContent = ''
                message.textContent = `${data.location}: ${data.forecast}`
            }
        })
    })
    
})


