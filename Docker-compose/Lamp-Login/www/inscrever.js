var txt_login = document.getElementById('txt_login');
var txt_senha1 = document.getElementById('txt_senha1');
var btn_senha1 = document.getElementById('btn_senha1');
var txt_senha2 = document.getElementById('txt_senha2');
var btn_senha2 = document.getElementById('btn_senha2');
const form2 = document.getElementById('form2');
const resultado = document.getElementById('resultado');

function handleForm(event) { event.preventDefault(); } 
form2.addEventListener('submit', handleForm);

//Captura os valores do formulário
form2.addEventListener('submit', async event =>{

    if(validaCampos()){
        
        if(txt_senha1.value == txt_senha2.value){
            event.preventDefault();  
            const formData = new FormData(form2);
            const data = Object.fromEntries(formData);

            //Cria o novo usuário
            const resp = await sendAPI("api-rest.php", "POST", data);

            if(resp.Status == true){
                limpaCampos();
                //alert("Usuário cadastrado!");
                resultado.innerHTML = "Usuário cadastrado!";
            }       
            else{
                //alert("Usuário não cadastrado!");
                resultado.innerHTML = "Usuário já existe!";
            }     
        }
        else{
            //alert("Senhas diferentes!");
            resultado.innerHTML = "Senhas diferentes!";
        }
    }
})

//Limpa os campos
function limpaCampos(){

    txt_login.value = "";
    txt_senha1.value = "";
    txt_senha2.value = "";
    resultado.innerHTML = "";
}

//
txt_login.addEventListener("click", ()=>{
    limpaCampos();
})

//Trata senha1
function mostrarSenha1(){

    if(txt_senha1.type === 'password'){
        txt_senha1.setAttribute('type', 'text')
        btn_senha1.src = "./img/eye-slash.svg"
    }
    else{
        txt_senha1.setAttribute('type', 'password')
        btn_senha1.src = "./img/eye-fill.svg"
    }   
}

//Trata senha2
function mostrarSenha2(){

    if(txt_senha2.type === 'password'){
        txt_senha2.setAttribute('type', 'text')
        btn_senha2.src = "./img/eye-slash.svg"
    }
    else{
        txt_senha2.setAttribute('type', 'password')
        btn_senha2.src = "./img/eye-fill.svg"
    }        
}

//Função para validar os dados do formulário
function validaCampos(){

    let msg = '';

    if(txt_login.value == ''){
        msg += '- Informe o Nome! \n';
    }

    if(txt_senha1.value == ''){
        msg += '- Informe a Senha! \n';
    }  
    
    if(txt_senha2.value == ''){
        msg += '- Confirme a Senha! \n';
    }  

    if(msg != ''){
        alert(msg);
        return false
    }
    return true;
}

//Envia dados para a API
async function sendAPI(url, type, data){

    if(type === "GET"){

        const response = await fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json; charset=utf-8",            
            },
        })
        return await response.json();
    }       
    else if(type === "POST" || type === "PUT"){

        const response = await fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json; charset=utf-8",            
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
    else if(type === "DELETE"){
        
        const new_url = url + "?" + data; 

        const response = await fetch(new_url, {
            method: type,
        })
        return await response.json();
    }     
    else{
        console.log("Método não implementado!")
    } 
}