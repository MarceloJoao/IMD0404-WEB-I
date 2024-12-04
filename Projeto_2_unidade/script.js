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
    

    //limpar o formulario
    document.getElementById("id_nome").value = "";
    document.getElementById("id_cpf").value = "";
    document.getElementById("id_data").value = "";
    document.getElementById("id_endereco").value = "";
}

function exibirContatos() {
    var div = document.querySelector("#divContatos")
    div.innerHTML = ""
    contatos.forEach(function(contato) {
        var elemento = document.createElement("p");
       elemento.innerHTML = contato.nome + "<br>" + contato.cpf + "<br>" + contato.data_nascimento + "<br>" + contato.endereco

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
        alert(`Contato encontrado: \nNome: ${contato.nome}\nData de Nascimento: ${contato.data_nascimento}\nEndereço: ${contato.endereco}`);
    } else {
        alert('Erro: CPF não encontrado!');
    }
}

function excluirContato() {
    var cpf = prompt('Informe o CPF da pessoa que deseja remover: ').trim();
  
    var index = contatos.findIndex(function(contato) {
      return contato.cpf === cpf;
    });
  
    if(index !== -1) {
      contatos.splice(index, 1);
      alert('Contato removido com sucesso!');
    } else {
      alert('CPF não encontrado.');
    }
    exibirContatos()
  }
  
