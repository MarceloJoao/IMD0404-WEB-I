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
  alert('Veiculo cadastrado com sucesso!');

  
}