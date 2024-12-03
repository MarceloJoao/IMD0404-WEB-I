"use strict"
const contatos = [];

function adicionarContato() {
    var nome = document.getElementById("id_nome").value.trim();
    var cpf = document.getElementById("id_cpf").value.trim();
    var data_nascimento = document.getElementById("id_data").value.trim();
    var endereco = document.getElementById("id_endereco").value.trim();
  
    if (contatos.some(function(contato) {
       return contato.cpf === cpf;
    })) {
        alert('Erro: CPF já cadastrado!');
        return;
    }

    const novocontato = {nome, cpf, data_nascimento, endereco};
    
    contatos.push(novocontato);
    alert('Contato cadastrado com sucesso!');
}



function exibirContatos() {
    var div = document.querySelector("#divContatos")
    contatos.forEach(function(contato) {
        var elemento = document.createElement("p");
       elemento.innerHTML = contato.nome + "<br>" + contato.cpf + "<br>" + contato.datanascimento + "<br>" + contato.endereco

       div.appendChild(elemento)
    });
}

function buscarContatos() {
    
    var cpf = prompt('Informe o CPF da pessoa:').trim();
    //percorrer o array 
    var contato = contatos.find(function(contato) {
        return contato.cpf === cpf;
    });

    if (contato) {
        prompt('Contato encontrado:', `Nome: ${contato.nome}\n Data de Nascimento: ${contato.datanascimento}\n Endereco: ${contato.endereco}`);
    } else {
        alert('Erro: CPF não encontrado!');
    }
}

function excluirContato() {

    var cpf = prompt('Informe o CPF da pessoa').trim();

    const contato = contatos.find(function(contato) {
        return contato.cpf === cpf;
    });
   
    //-1 pois
    if (contato !== -1) {
        contatos.splice(contato, 1); 
        exibirContatos(); 
        alert('Contato excluído com sucesso!');
    } else {
        alert('Erro: CPF não encontrado!');
    }
}

