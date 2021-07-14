const error = document.querySelector(".error")
const form = document.querySelector(".form")
const email = document.querySelector(".email")
const emailpattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
form.addEventListener('submit', (e) =>{
    let errors = []
    if(!(email.value.match(emailpattern))){
        errors.push('Please enter a valid email')
    }
    if(errors.length > 0){
        e.preventDefault()
        error.classList.remove('hidden')
        error.innerText = errors
        email.style.border = "2px solid red"
    }
    
})
