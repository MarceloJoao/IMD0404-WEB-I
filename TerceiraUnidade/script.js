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
/*function cadastrarVeiculo(event) {
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

  if (tipo === "Escolha o tipo") {
    alert("Por favor, escolha um tipo válido!");
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
    imagem,
  };

  // Enviar os dados para o JSON Server
  fetch("http://localhost:3000/veiculos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(veiculo),
  })
    .then((response) => {
      if (response.ok) {
        alert("Veículo cadastrado com sucesso no servidor!");
        window.location.href = "listagemveiculos.html";
      } else {
        throw new Error("Erro ao cadastrar veículo no servidor");
      }
    })
}*/

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
  var div = document.querySelector("#veiculosdiv");
  div.innerHTML = ""; // Limpar qualquer conteúdo anterior

  // Supondo que você tenha uma lista de veículos em uma variável `veiculos`
  veiculos.forEach(function(veiculo) {
     var elemento = document.createElement("div");
     // Classe do Bootstrap
     elemento.className = "card mb-3";
     
     // Criando o card dinamicamente
     elemento.innerHTML = `
          <div class="row no-gutters">
              <div class="col-md-4">
                  <img src="${veiculo.imagem}" class="card-img" alt="Imagem do veículo">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <p class="card-title estilofonte">${veiculo.modelo}</p>
                      <p class="card-text">Marca: ${veiculo.marca}</p>
                      <p class="card-text">Ano: ${veiculo.ano}</p>
                      <p class="card-text">Cor: ${veiculo.cor}</p>
                      <p class="card-text">Tipo: ${veiculo.tipo}</p>
                      <p class="card-text">Quilometragem: ${veiculo.quilometragem}</p>
                      <p class="card-text">Numero de Portas: ${veiculo.portas}</p>
                      <button class="btn btn-danger" onclick="excluirVeiculo(${veiculo.id})">Excluir</button>
                  </div>
              </div>
          </div>
      `;

     div.appendChild(elemento); // Adicionar o card à div
  });
}



document.addEventListener('DOMContentLoaded', exibirVeiculos);
