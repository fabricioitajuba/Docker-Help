/**
 * Operações CRUD simples
 * Autor: Fabrício de Lima Ribeiro
 * Data: 14/06/24
 * Status: Concluído
 */

const nome = document.getElementById('nome');
const nota = document.getElementById('nota');
const btnInserir = document.getElementById("btnInserir");
const btnLimpar = document.getElementById("btnLimpar");
const btnAtualizar = document.getElementById("btnAtualizar");
const table = document.getElementById("table");
const resultado = document.getElementById("resultado");

readBD();

//Função para validar os dados do formulário
function validaCampos(){

    let msg = '';

    if(nome.value == ''){
        msg += '- Informe o Nome! \n';
    }

    if(nota.value == ''){
        msg += '- Informe a Nota! \n';
    }  
    
    if(msg != ''){
        alert(msg);
        return false
    }
    return true;
}

function limpaCampos(){
    nome.value = ""
    nota.value = ""
    nome.focus()
}

function readBD(){

    fetch("api-read.php", {
        method: "POST"
    }).then(response => response.text()).then(response => {
        //console.log(response);
        resultado.innerHTML = response;
    })

}

//Trata o botão Inserir
btnInserir.addEventListener("click", ()=>{

    let nomex = nome.value;
    let notax = nota.value;

    let dados = {
        "nome": nomex,
        "nota": notax
    }

    if(validaCampos()){

        fetch("api-create.php", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },

            "body": JSON.stringify(dados)

        }).then(function(response){
            return response.text();
        }).then(function(data){

            //console.log(data);
            
            if(data == "ok"){
                alert("Dados inseridos com sucesso!");
                readBD();
            }
            else{
                alert("Dados não inseridos");
            }
        })

        //console.log(dados)
        limpaCampos()
    }
})

