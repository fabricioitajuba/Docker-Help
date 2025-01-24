/**
 * Operações CRUD simples
 * Autor: Fabrício de Lima Ribeiro
 * Data: 14/06/24
 * Status: Concluído
 */

const descricao = document.getElementById('descricao');
const lucro = document.getElementById('lucro');
const despesa = document.getElementById('despesa');
const procurar = document.getElementById('procurar');
const trocoMes = document.getElementById('trocoMes');

const totalLucros = document.getElementById('totalLucros');
const totalDespesas = document.getElementById('totalDespesas');

const btnInserir = document.getElementById("btnInserir");
const btnLimpar = document.getElementById("btnLimpar");
const btnAtualizar = document.getElementById("btnAtualizar");
const table = document.getElementById("table");
const btnProcurar = document.getElementById("btnProcurar");

document.getElementById("btnAtualizar").disabled = true;

let v1, v2, v3, v4;
var total_lucros, total_despesas;

readBD();
totalLucro();
totalDespesa();


let interval = setInterval(function(){
    troco();
}, 500)

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

    if(descricao.value == ''){
        msg += '- Informe o descricao! \n';
    }
    
    if(msg != ''){
        alert(msg);
        return false
    }
    return true;
}

function limpaCampos(){
    descricao.value = "";
    lucro.value = 0;
    despesa.value = 0;
    procurar.value = "";
    descricao.focus();
    document.getElementById("btnAtualizar").disabled = true;
}

//Trata o botão Limpar campos
btnLimpar.addEventListener("click", ()=>{
    limpaCampos();
})

//Função para ler o bando de dados
function readBD(){

    fetch("api-read.php", {
        method: "POST"
    }).then(response => response.text()).then(response => {
        tbody.innerHTML = response;
    })

}

//Função para calcular o total de lucro
function totalLucro(){

    fetch("api-totalLucro.php", {
        method: "POST"
    }).then(response => response.text()).then(response => {
        total_lucros = response;
        totalLucros.innerHTML = total_lucros;
    })

}

//Função para calcular o total de despesas
function totalDespesa(){

    fetch("api-totalDespesa.php", {
        method: "POST"
    }).then(response => response.text()).then(response => {
        total_despesas = response;
        totalDespesas.innerHTML = total_despesas;
    })
}

//Função para calcular o trodo do mês
function troco(){
    var trocox = total_lucros - total_despesas;  
    trocoMes.innerHTML = trocox;     
}

//Trata o botão Inserir
btnInserir.addEventListener("click", ()=>{

    if(confirm("Deseja realmente inserir o registro ?")){

        let descricaox = descricao.value;
        let lucrox = lucro.value;
        let despesax = despesa.value;
    
        let dados = {
            "descricao": descricaox,
            "lucro": lucrox,
            "despesa": despesax
        }

        //console.log(dados);
        
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
                    totalLucro();
                    totalDespesa();
                    troco();
                }
                else{
                    alert("Dados não inseridos!");
                }
            })
    
            //console.log(dados)
            limpaCampos()
            document.getElementById("btnAtualizar").disabled = true;
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

        }).then(function(response){
            return response.text();
        }).then(function(data){

            //console.log(data);
            
            if(data == "ok"){
                alert("Dados deletados com sucesso!");
                readBD();
                totalLucro();
                totalDespesa();
                troco();
            }
            else{
                alert("Dados não deletados!");
            }
        })               
    }
}

//Função para editar uma linha da tabela
function editaLinhaTabela(idx, descricaox, lucrox, despesax){
    
    v1 = idx;
    v2 = descricaox;
    v3 = lucrox;
    v4 = despesax;

    document.getElementById("descricao").value = v2;
    document.getElementById("lucro").value = v3;
    document.getElementById("despesa").value = v4;

    document.getElementById("btnAtualizar").disabled = false;
}

//Trata o botão Atualizar
btnAtualizar.addEventListener("click", ()=>{

    if(confirm("Deseja realmente editar o registro " + v1 + "?")){

        v2 = descricao.value;
        v3 = lucro.value;
        v4 = despesa.value;

        let dados = {
            "id": v1,
            "descricao": v2,
            "lucro": v3,            
            "despesa": v4            
        }        

        //console.log(dados);

        fetch("api-update.php", {
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
                readBD();
                totalLucro();
                totalDespesa();
                troco();
                limpaCampos();
                document.getElementById("btnAtualizar").disabled = true;
                alert("Dados alterados com sucesso!");
            }
            else{
                alert("Dados não alterados!");
            }
        })               
    }
})