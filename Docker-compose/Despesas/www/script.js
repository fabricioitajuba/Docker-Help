/**
 * Operações CRUD simples
 * Autor: Fabrício de Lima Ribeiro
 * Data: 28/01/25
 * Status: Concluído
 */

const descricao = document.getElementById('descricao');
const lucro = document.getElementById('lucro');
const despesa = document.getElementById('despesa');
const procurar = document.getElementById('procurar');
const trocoMes = document.getElementById('trocoMes');

const totalLucros = document.getElementById('totalLucros');
const totalDespesas = document.getElementById('totalDespesas');
const optMes = document.getElementById('optMes');

const btnInserir = document.getElementById("btnInserir");
const btnLimpar = document.getElementById("btnLimpar");
const btnAtualizar = document.getElementById("btnAtualizar");
const table = document.getElementById("table");
const btnProcurar = document.getElementById("btnProcurar");

document.getElementById("btnAtualizar").disabled = true;
document.getElementById("btnInserir").disabled = true;

let v1;
var total_lucros, total_despesas, total_troco, Mes;
var banco = "ANO2025";

tbody.innerHTML = "";
totalLucros.innerHTML = "";
totalDespesas.innerHTML = "";
trocoMes.innerHTML = "";

verificaMeses();

/*let interval = setInterval(function(){
    troco();
}, 500)*/

//Verifica quais meses estão cadastrados
function verificaMeses(){

    var linha = `<option value="Selecione">Selecione</option>`;

    let dados = {
        comando: `SELECT TABLE_NAME AS Mes FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${banco}'`
    }        

    fetch("api-query-read.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": JSON.stringify(dados)
    }) 
    .then(res=>res.json())
    .then(ret=>{   
        ret.forEach(function(item){
           linha = linha + `<option value=${item.Mes}>${item.Mes}</option>`; 
        })
        optMes.innerHTML = linha;
    }) 
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

//Função para validar os dados do formulário
function validaCampos(){

    let msg = '';

    if(descricao.value == ''){
        msg += '- Informe a descricao! \n';
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

//Função que lê o mês selecionado
function readMes(mesSelecionado){

    Mes = mesSelecionado.value;

    if(Mes == "Selecione"){
        document.getElementById("btnInserir").disabled = true;
        tbody.innerHTML = "";
        totalLucros.innerHTML = "";
        totalDespesas.innerHTML = "";
        trocoMes.innerHTML = "";
    }
    else{
        readBD();
        totalLucro();
        totalDespesa();
        troco();
        document.getElementById("btnInserir").disabled = false;
    }
}

//Função para ler o bando de dados
function readBD(){

    var linha = "";

    let dados = {
        comando: `SELECT * FROM ${Mes}`
    }        

    fetch("api-query-read.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": JSON.stringify(dados)
    })    
    .then(res=>res.json())
    .then(ret=>{
        //console.log(ret);
        ret.forEach(function(item){ 
                
            linha = linha + `<tr>
                <td>${item.id}</td>
                <td>${item.data_hora}</td>
                <td><b>${item.Descritivo}</b></td>
                <td>${item.Lucro.toString().replace(".", ",")}</td>
                <td>${item.Despesa.toString().replace(".", ",")}</td>
                <td>              
                    <button onclick='editaLinhaTabela(${item.id}, "${item.Descritivo}", ${item.Lucro}, ${item.Despesa.toString()})' class='btn btn-warning'>Editar</button>
                    <button onclick='deletaLinhaTabela(${item.id})' class='btn btn-danger'>Deletar</button>                
                </td>
            </tr>`;
        });
        tbody.innerHTML = linha;
    })
}

//Função para calcular o total de lucro
function totalLucro(){

    let dados = {
        comando: `SELECT SUM(Lucro) AS Lucro FROM ${Mes}`
    }        

    fetch("api-query-read.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": JSON.stringify(dados)
    })     
    .then(res=>res.json())
    .then(ret=>{
        total_lucros = parseFloat(ret[0].Lucro).toFixed(2);
        totalLucros.innerHTML = total_lucros.toString().replace(".", ",");
    })
}

//Função para calcular o total de despesas
function totalDespesa(){
    
    let dados = {
        comando: `SELECT SUM(Despesa) AS Despesas FROM ${Mes}`
    }        

    fetch("api-query-read.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": JSON.stringify(dados)
    }) 
    .then(res=>res.json())
    .then(ret=>{
        total_despesas = parseFloat(ret[0].Despesas).toFixed(2);
        totalDespesas.innerHTML = total_despesas.toString().replace(".", ",");
    })
}

//Função para calcular o trodo do mês
function troco(){

    //var trocox = parseFloat(total_lucros - total_despesas).toFixed(2);  
    //trocoMes.innerHTML = trocox.toString().replace(".", ",");

    let dados = {
        comando: `SELECT (SUM(Lucro) - SUM(Despesa)) AS troco FROM ${Mes}`
    }        

    fetch("api-query-read.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": JSON.stringify(dados)
    }) 
    .then(res=>res.json())
    .then(ret=>{
        total_troco = parseFloat(ret[0].troco).toFixed(2);
        trocoMes.innerHTML = total_troco.toString().replace(".", ",");
    })    
}

//Trata o botão Inserir
btnInserir.addEventListener("click", ()=>{

    if(confirm("Deseja realmente inserir o registro ?")){
   
        let dados = {
            comando: `INSERT INTO ${Mes}(Descritivo, Lucro, Despesa) VALUES ('${descricao.value}', ${parseFloat(lucro.value)}, ${parseFloat(despesa.value)})`
        }

        if(validaCampos()){
    
            fetch("api-query-write.php", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json; charset=utf-8"
                },
    
                "body": JSON.stringify(dados)
    
            })
            .then(res=>res.json())
            .then(ret=>{
                //console.log(ret);
                if(ret.Status == "ok"){
                    readBD();
                    totalLucro();
                    totalDespesa();
                    troco();
                    limpaCampos()
                    document.getElementById("btnAtualizar").disabled = true;
                    alert("Dados inseridos com sucesso!");
                }
                else{
                    alert("Dados não inseridos!");
                }
            })
        }        
    }
})

//Função para deletar uma linha na tabela
function deletaLinhaTabela(idLinha){

    if(confirm("Deseja realmente apagar o registro " + idLinha + "?")){

        let dados = {
            comando: `DELETE FROM ${Mes} WHERE id = ${parseInt(idLinha)}`
        }        

        fetch("api-query-write.php", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(dados)
        })
        .then(res=>res.json())
        .then(ret=>{
          
            if(ret.Status == "ok"){
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

    document.getElementById("descricao").value = descricaox;
    document.getElementById("lucro").value = lucrox;
    document.getElementById("despesa").value = despesax;

    document.getElementById("btnAtualizar").disabled = false;
}

//Trata o botão Atualizar
btnAtualizar.addEventListener("click", ()=>{

    if(confirm("Deseja realmente editar o registro " + v1 + "?")){

        let dados = {
            comando: `UPDATE ${Mes} SET Descritivo = '${descricao.value}', Lucro = ${lucro.value}, Despesa = ${despesa.value} WHERE id = ${v1}`           
        }        

        fetch("api-query-write.php", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(dados)
        })
        .then(res=>res.json())
        .then(ret=>{

            if(ret.Status == "ok"){
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