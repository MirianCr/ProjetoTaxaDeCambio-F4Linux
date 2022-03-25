function criarMoeda(nome,sigla,valor){
  return{nome, sigla, valor};
}
let moedas = {
  usd: criarMoeda('Dólar', 'USD', 4.8961117),
  eur: criarMoeda('Euro', 'EUR', 5.3689448),
  gbp: criarMoeda('Libra', 'GBP', 6.4506694),
  jpy: criarMoeda('Iene', 'JPY', 0.40533287), /*japao*/
  ars: criarMoeda('ArgentinePeso', 'ARS', 0.044321752),
  cad: criarMoeda('CanadaDollar', 'CAD',3.8860749),
  rub: criarMoeda('RubleRussia', 'RUB', 0.048829216),
  bit: criarMoeda('Bitcoin', 'BCH', 1,773.298),
  doge:criarMoeda('Dogecoin','DOGE', 0.59662462 ),

}
let casa = {
  taxa: 0.10
}
casa.proporCompra = function (moeda, quantidade){
  let valorAjustado = moeda.valor - (moeda.valor * this.taxa);
  return valorAjustado * quantidade;
}

casa.proporVenda = function (moeda, quantidade){
  let valorAjustado = moeda.valor * (1 + this.taxa);
  return valorAjustado * quantidade;
}

casa.proporTroca = function(moeda1, qtd1, moeda2, qtd2){
  let valorCompra = this.proporCompra(moeda1, qtd1),
      valorVenda = this.proporVenda(moeda2,qtd2);

  return valorVenda - valorCompra;
}


let tabela = [];
casa.criarTabela = function (moedas) {
  for (let moeda in moedas) {
    tabela.push({
        "Moeda": moedas[moeda].nome + '( ' + moedas[moeda].sigla + ')',
        "Valor de compra": this.proporCompra(moedas[moeda], 1),
        "Valor de Venda": this.proporVenda(moedas[moeda], 1)
    });
  }

}

console.log(casa.criarTabela(moedas));
console.table(tabela);
console.log(casa.proporCompra(moedas.usd,500));
console.log(casa.proporVenda(moedas.usd,500));

console.log("O cliente esta vendendo 1000 dolares," + "A casa vai comprar por"+ ':' + casa.proporCompra(moedas.usd,1000));
console.log("O cliente quer comprar 500 euros, " + "A casa vai vender por" + ':' + casa.proporVenda(moedas.eur,500));
console.log("O valor de troca de dolares pra euros é: " + casa.proporTroca(moedas.usd,1000,moedas.eur,500))
