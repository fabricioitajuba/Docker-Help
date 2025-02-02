/**
 * Operações CRUD simples
 * Autor: Fabrício de Lima Ribeiro
 * Data: 02/02/25
 * Status: Concluído
 */

const form = document.getElementById("form");
const nome = document.getElementById('nome');
const nota = document.getElementById('nota');
const procurar = document.getElementById('procurar')

const btnLimpar = document.getElementById("btnLimpar");
const btnAtualizar = document.getElementById("btnAtualizar");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");
const btnProcurar = document.getElementById("btnProcurar");

document.getElementById("btnAtualizar").disabled = true;

var id;

readDB();

//Função para ler o bando de dados
async function readDB(){
    
    var linha = "";
    const resp = await sendAPI("api-rest.php", "GET");

    resp.forEach(function(item){

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
}

//Inserir dados
form.addEventListener("submit", async event =>{

    if(confirm("Deseja realmente inserir o registro ?")){
    
        if(validaCampos()){

            event.preventDefault();
            var formData = new FormData(form);    
                
            //Recupera os dados do formData e coloca em um objeto
            const data = Object.fromEntries(formData);

            const resp = await sendAPI("api-rest.php", "POST", data);

            if(resp.Status == "ok"){
                limpaCampos();
                readDB();
                document.getElementById("btnAtualizar").disabled = true;
                alert("Registro inserido com sucesso!");
            }
        }        
    }             
})

//Função para editar uma linha da tabela
function editaLinhaTabela(idx, nomex, notax){
    
    id = idx;

    document.getElementById("nome").value = nomex;
    document.getElementById("nota").value = notax;

    document.getElementById("btnAtualizar").disabled = false;
}

//Trata o botão Atualizar
btnAtualizar.addEventListener("click", async ()=>{

    if(confirm("Deseja realmente alterar o registro " + id + "?")){
    
        if(validaCampos()){
    
            let data = {
                "id": id,
                "nome": nome.value,
                "nota": parseInt(nota.value)            
            }                    
    
            const resp = await sendAPI("api-rest.php", "PUT", data);
    
            if(resp.Status == "ok"){
                limpaCampos();
                readDB();
                document.getElementById("btnAtualizar").disabled = true;
                alert("Registro alterado com sucesso!");
            }
        }                      
    }
})

//Função para deletar uma linha na tabela
async function deletaLinhaTabela(idLinha){

    if(confirm("Deseja realmente apagar o registro " + idLinha + "?")){

        const resp = await sendAPI("api-rest.php", "DELETE", "id="+idLinha);

        if(resp.Status == "ok"){
            readDB();
            alert("Registro apagado com sucesso!");
        }             
    }
}

//Trata o botão Limpar campos
btnLimpar.addEventListener("click", ()=>{
    limpaCampos();
})

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

//Função para limpar os campos do formulário
function limpaCampos(){
    nome.value = "";
    nota.value = "";
    procurar.value = "";
    nome.focus();
    document.getElementById("btnAtualizar").disabled = true;
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