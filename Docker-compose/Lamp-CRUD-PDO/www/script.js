/**
 * Operações CRUD simples
 * Autor: Fabrício de Lima Ribeiro
 * Data: 14/06/24
 * Status: Concluído
 */

const nome = document.getElementById('nome');
const nota = document.getElementById('nota');
const procurar = document.getElementById('procurar')

const btnInserir = document.getElementById("btnInserir");
const btnLimpar = document.getElementById("btnLimpar");
const btnAtualizar = document.getElementById("btnAtualizar");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");
const btnProcurar = document.getElementById("btnProcurar");

document.getElementById("btnAtualizar").disabled = true;

let v1, v2, v3;

readBD();

//Função para procurar algo na tabela
function procurarValor(){

    //.toLowerCase -> posso procurar expressões mainúsculas ou minúsculas
    let expressao = procurar.value.toLowerCase()
    
    //Limitando o número mínimo de caracteres
    //if(expressao.length === 1){
    //    return
    //}

    let linhas = tbody.getElementsByTagName('tr')

    for(let posicao in linhas){

        if(true === isNaN(posicao)){
            continue
        }

        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase()

        if(true === conteudoDaLinha.includes(expressao)){
            linhas[posicao].style.display = ''
        }
        else{
            linhas[posicao].style.display = 'none'
        }
    }
}

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
    nome.value = "";
    nota.value = "";
    procurar.value = "";
    nome.focus();
    document.getElementById("btnAtualizar").disabled = true;
}

//Trata o botão Limpar campos
btnLimpar.addEventListener("click", ()=>{
    limpaCampos();
})

//Função para ler o bando de dados
function readBD(){

    var linha = "";

    fetch("api-read.php")
    .then(res=>res.json())
    .then(ret=>{
        //console.log(ret)
        ret.forEach(function(item){

            linha = linha + `<tr>
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.nota}</td>
                    <td>              
                        <button onclick='editaLinhaTabela(${item.id}, "${item.nome}", ${item.nota})'>Editar</button>
                        <button onclick='deletaLinhaTabela(${item.id})'>Deletar</button>                
                    </td>
                </tr>`;            
        });
        tbody.innerHTML = linha;
    })
}

//Trata o botão Inserir
btnInserir.addEventListener("click", ()=>{

    if(confirm("Deseja realmente inserir o registro ?")){

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
            })
            .then(res=>res.json())
            .then(ret=>{

                if(ret.Status = "ok"){
                    //console.log(ret)
                    limpaCampos();
                    readBD();
                    document.getElementById("btnAtualizar").disabled = true;
                    alert("Dados inseridos com sucesso!");
                }
            })   
        }        
    }
})

//Função para deletar uma linha na tabela
function deletaLinhaTabela(idLinha){

    if(confirm("Deseja realmente apagar o registro " + idLinha + "?")){

        let idx = idLinha;

        let dados = {
            "id": idx
        }        

        fetch("api-delete.php", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(dados)
        })
        .then(res=> res.json())
        .then(ret=>{

            if(ret.Status = "ok"){
                //console.log(ret);          
                readBD();
                alert("Dados deletados com sucesso!");
            }
        })               
    }
}

//Função para editar uma linha da tabela
function editaLinhaTabela(idx, nomex, notax){
    
    v1 = idx;
    v2 = nomex;
    v3 = notax;

    document.getElementById("nome").value = v2;
    document.getElementById("nota").value = v3;

    document.getElementById("btnAtualizar").disabled = false;
}

//Trata o botão Atualizar
btnAtualizar.addEventListener("click", ()=>{

    if(confirm("Deseja realmente editar o registro " + v1 + "?")){

        v2 = nome.value;
        v3 = parseInt(nota.value);

        let dados = {
            "id": v1,
            "nome": v2,
            "nota": v3            
        }        

        fetch("api-update.php", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(dados)
        })
        .then(res => res.json())
        .then(ret=>{
            
            if(ret.Status = "ok"){
                readBD();
                limpaCampos();
                document.getElementById("btnAtualizar").disabled = true;
                alert("Dados alterados com sucesso!");
            }         
        })               
    }
})