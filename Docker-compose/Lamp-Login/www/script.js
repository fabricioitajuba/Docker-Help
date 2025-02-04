var txt_senha = document.getElementById('txt_senha')
var btn_senha = document.getElementById('btn_senha')
const form = document.getElementById('form');

form.addEventListener('submit', async event =>{

    event.preventDefault();  
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
})

function mostrarSenha(){

    if(txt_senha.type === 'password'){
        txt_senha.setAttribute('type', 'text')
        btn_senha.src = "./img/eye-slash.svg"
    }
    else{
        txt_senha.setAttribute('type', 'password')
        btn_senha.src = "./img/eye-fill.svg"
    }
}