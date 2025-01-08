  "use strict"

  const veiculos = [];

  function cadastrarveiculo(event){
      event.preventDefault();
      
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
  
    //criando objeto
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


  veiculos.push(veiculo);
    
    
      localStorage.setItem("veiculos", JSON.stringify(veiculos));

        alert("Veículo cadastrado com sucesso!");

      // Redirecionar para a página de exibição
        window.location.href = "listagem.html";
    
  }

  function exibirVeiculos(){
    const veiculosList = document.getElementById("veiculosdiv");
    const veiculos = JSON.parse(localStorage.getItem("veiculos")) 

    if (veiculos.length === 0) {
      veiculosList.innerHTML = "<p>Nenhum veículo cadastrado.</p>";
      return;
    }

    veiculos.forEach((veiculo, index) => {
      veiculosList.innerHTML += `
        <div>
          <h3>Veículo ${index + 1}</h3>
          <p><strong>Marca:</strong> ${veiculo.marca}</p>
          <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
          <p><strong>Ano:</strong> ${veiculo.ano}</p>
          <p><strong>Cor:</strong> ${veiculo.cor}</p>
          <p><strong>Tipo:</strong> ${veiculo.tipo}</p>
          <p><strong>Quilometragem:</strong> ${veiculo.quilometragem} km</p>
          <p><strong>Portas:</strong> ${veiculo.portas}</p>
          <p><strong>Imagem:</strong> <img src="${veiculo.imagem}" alt="Imagem do veículo" style="max-width:200px;"></p>
        </div>
        <hr>
      `;
    });
  }
