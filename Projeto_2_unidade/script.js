const contatos = [];

function CadastrarContato(nome, cpf, data_nascimento, endereco){
   var nome = document.getElementById("nome").value.trim();
   var cpf = document.getElementById("cpf").value.trim();
   var data_nascimento = document.getElementById("data_nascimento").value.trim();
   var endereco = document.getElementById("endereco").value.trim();
 

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

function exibircontato(){

}

function buscarcontato(){

}

function removercontato(){

}