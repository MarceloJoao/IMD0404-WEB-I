const veiculos = []


function cadastrarVeiculo(event) {
  event.preventDefault(); 

  // Obter os valores dos campos do formulário
  var marca = document.getElementById("marca").value;
  var modelo = document.getElementById("modelo").value;
  var ano = document.getElementById("ano").value;
  var cor = document.getElementById("cor").value;
  var tipo = document.getElementById("tipo").value;
  var quilometragem = document.getElementById("quilometragem").value;
  var portas = document.getElementById("portas").value;
  var imagem = document.getElementById("imagem").value;

  // Validação dos campos 
  if (!marca || !modelo || !ano || !cor || !tipo || !quilometragem || !portas || !imagem) {
      alert("Por favor, preencha todos os campos!");
      return;
  }

  // Criar um objeto para o veículo
  const veiculo = {
      marca,
      modelo,
      ano,
      cor,
      tipo,
      quilometragem,
      portas,
      imagem
  };

  // Recuperar a lista de veículos do localStorage
  let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

  // Adicionar o novo veículo à lista
  veiculos.push(veiculo);

  // Salvar a lista de veículos atualizada no localStorage
  localStorage.setItem("veiculos", JSON.stringify(veiculos));

  // Mostrar uma mensagem de sucesso
  alert("Veículo cadastrado com sucesso!");

  // Redirecionar para a página de listagem de veículos 
  window.location.href = "listagemveiculos.html";
}


function exibirVeiculos() {
  const veiculosList = document.getElementById("veiculosdiv");

  // Tentar recuperar a lista de veículos do localStorage
  let veiculos = JSON.parse(localStorage.getItem("veiculos"));

  // Se não houver veículos no localStorage, buscar da API
  if (!veiculos || veiculos.length === 0) {
      fetch("https://my-json-server.typicode.com/MarceloJoao/IMD0404-WEB-I/veiculos")
          .then(response => response.json())
          .then(data => {
              // Salvar os dados da API no localStorage para futuras interações
              localStorage.setItem("veiculos", JSON.stringify(data));

              // Exibir os veículos
              exibirVeiculosNaTela(data);
          })
          .catch(error => {
              console.error("Erro ao carregar os veículos da API:", error);
              veiculosList.innerHTML = "<p>Erro ao carregar os veículos.</p>";
          });
  } else {
      // Se os dados já estiverem no localStorage, exibir diretamente
      
      exibirVeiculosNaTela(veiculos);
  }
}


function exibirVeiculosNaTela(veiculos) {
  var div = document.querySelector("#veiculosdiv");
  div.innerHTML = ""; // Limpar qualquer conteúdo anterior

  // Supondo que você tenha uma lista de veículos em uma variável `veiculos`
  veiculos.forEach(function(veiculo, index) {
     var elemento = document.createElement("div");
     // Classe do Bootstrap
     elemento.className = "card mb-3";
     
     // Criando o card dinamicamente
     elemento.innerHTML = `
          <div class="row no-gutters">
              <div class="col-md-4">
                  <img src="${veiculo.imagem}" class="card-img h-100" alt="Imagem do veículo">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h3 class="card-title estilofonte"><b>${veiculo.modelo}</b></h3>
                      <p class="card-text">Marca: ${veiculo.marca}</p>
                      <p class="card-text">Ano: ${veiculo.ano}</p>
                      <p class="card-text">Cor: ${veiculo.cor}</p>
                      <p class="card-text">Tipo: ${veiculo.tipo}</p>
                      <p class="card-text">Quilometragem: ${veiculo.quilometragem}</p>
                      <p class="card-text">Numero de Portas: ${veiculo.portas}</p>
                      <button class="btn btn-danger" onclick="excluirVeiculo(${index})">Excluir</button>
                  </div>
              </div>
          </div>
      `;

     div.appendChild(elemento); // Adicionar o card à div
  });
}

function excluirVeiculo(index) {
  // Recuperar os veículos do localStorage
  let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

  // Remover o veículo do vetor com base no índice
  veiculos.splice(index, 1);

  // Atualizar o localStorage com o novo vetor
  localStorage.setItem("veiculos", JSON.stringify(veiculos));

  // Atualizar a lista exibida na tela
  exibirVeiculosNaTela(veiculos);

  // Mensagem de confirmação
  alert("Veículo excluído com sucesso!");
}

document.addEventListener('DOMContentLoaded', exibirVeiculos);
