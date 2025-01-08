const veiculos = []

// Função para cadastrar um veículo
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

  // Validação dos campos (todos devem ser preenchidos)
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

  // Redirecionar para a página de listagem de veículos (ou recarregar a página)
  window.location.href = "listagemveiculos.html";
}

// Função para exibir veículos
function exibirVeiculos() {
  const veiculosList = document.getElementById("veiculosdiv");

  // Tentar recuperar a lista de veículos do localStorage
  let veiculos = JSON.parse(localStorage.getItem("veiculos"));

  // Se não houver veículos no localStorage, buscar da API
  if (!veiculos || veiculos.length === 0) {
      console.log("Carregando veículos da API...");
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
      console.log("Carregando veículos do localStorage...");
      exibirVeiculosNaTela(veiculos);
  }
}


function exibirVeiculosNaTela(veiculos) {
  const veiculosList = document.getElementById("veiculosdiv");

  if (veiculos.length === 0) {
      veiculosList.innerHTML = "<p>Nenhum veículo disponível.</p>";
      return;
  }

  // Gerar HTML para cada veículo
  veiculos.forEach((veiculo, index) => {
      veiculosList.innerHTML += `
          <div class="card">
              <img src="${veiculo.imagem}" alt="Imagem do veículo" class="card-img">
              <div class="card-content">
                  <h3>Veículo ${index + 1}</h3>
                  <p><strong>Marca:</strong> ${veiculo.marca}</p>
                  <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
                  <p><strong>Ano:</strong> ${veiculo.ano}</p>
                  <p><strong>Cor:</strong> ${veiculo.cor}</p>
                  <p><strong>Tipo:</strong> ${veiculo.tipo}</p>
                  <p><strong>Quilometragem:</strong> ${veiculo.quilometragem} km</p>
                  <p><strong>Portas:</strong> ${veiculo.portas}</p>
              </div>
          </div>
      `;
  });
}


document.addEventListener('DOMContentLoaded', exibirVeiculos);
