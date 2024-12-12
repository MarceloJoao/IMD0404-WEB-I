"use strict"
const contatos = [];

function adicionarContato() {
    var nome = document.getElementById("id_nome").value.trim();
    var cpf = document.getElementById("id_cpf").value.trim();
    var data_nascimento = document.getElementById("id_data").value.trim();
    var endereco = document.getElementById("id_endereco").value.trim();

    //verificar se algum campo é vazio
    if (!nome || !cpf || !data_nascimento || !endereco) {
        alert('Erro: Todos os campos precisam ser preenchidos!');
        return;
    }
    
    //verificar se o cpf é igual
    if (contatos.some(function(contato) {
       return contato.cpf === cpf;
    })) {
        alert('Erro: CPF já cadastrado!');
        return;
    }
    
    //criando um objeto
    const novocontato = {nome, cpf, data_nascimento, endereco};
    
    //adicionando no array de contatos
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
       var elemento = document.createElement("div");
       elemento.className = "card mb-3"
       //elemento.innerHTML = contato.nome + "<br>" + contato.cpf + "<br>" + contato.data_nascimento + "<br>" + contato.endereco
       elemento.innerHTML = `
            <div class="card-body">
                <p class="card-title estilofonte">${contato.nome}</p>
                <p class="card-text"><strong>CPF:</strong> ${contato.cpf}</p>
                <p class="card-text"><strong>Data de Nascimento:</strong> ${contato.data_nascimento}</p>
                <p class="card-text"><strong>Endereço:</strong> ${contato.endereco}</p>
            </div>
        `;

       div.appendChild(elemento)

    });
}


function buscarContatos() {
    //ocultar os contatos
    var div = document.querySelector("#divContatos")
    if(div){
        div.innerHTML = "";
    }   
    //pesquisar pelo cpf
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
  
