var txt_login = document.getElementById('txt_login');
var txt_senha = document.getElementById('txt_senha');
var btn_senha = document.getElementById('btn_senha');
const resposta = document.getElementById('resposta');

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

//Limpa os campos
txt_login.addEventListener("click", ()=>{
    txt_login.value = "";
    txt_senha.value = "";
    resposta.innerHTML = "";
})