/**
 * Operações com banco de dados
 * Autor: Fabrício de Lima Ribeiro
 * Data: 24/01/25
 * Status: Não Concluído
 */

const btnListaBD = document.getElementById("btnListaBD");
const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');

//Lista todos os banco de dados
btnListaBD.addEventListener("click", ()=>{

    fetch("api-listar-bd.php", {
        method: "POST"
    }).then(response => response.text()).then(response => {       
        select1.innerHTML = response;
    })

})

function selecionaTabela(opcao){
    var tabela = opcao.value;
    console.log(tabela);
}