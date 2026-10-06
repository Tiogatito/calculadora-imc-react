export const faixasIMC = [
  { id: 'baixo-peso', nome: 'Abaixo do peso', limite: 18.5, intervalo: 'Menor que 18,5' },
  { id: 'normal', nome: 'Peso normal', limite: 25, intervalo: '18,5 a menos de 25' },
  { id: 'sobrepeso', nome: 'Sobrepeso', limite: 30, intervalo: '25 a menos de 30' },
  { id: 'obesidade-i', nome: 'Obesidade grau I', limite: 35, intervalo: '30 a menos de 35' },
  { id: 'obesidade-ii', nome: 'Obesidade grau II', limite: 40, intervalo: '35 a menos de 40' },
  { id: 'obesidade-iii', nome: 'Obesidade grau III', limite: Infinity, intervalo: '40 ou mais' },
];

export function lerDecimal(texto) {
  const valor = texto.trim();
  if (!/^\d+(?:[.,]\d+)?$/.test(valor)) return NaN;
  return Number(valor.replace(',', '.'));
}

export function validarMedidas(valores) {
  const altura = lerDecimal(valores.altura);
  const peso = lerDecimal(valores.peso);
  const erros = {};

  if (!Number.isFinite(altura) || altura <= 0) {
    erros.altura = 'Informe uma altura válida, maior que zero.';
  } else if (altura > 3) {
    erros.altura = 'Use metros: por exemplo, 1,75 em vez de 175. O limite é 3 m.';
  }
  if (!Number.isFinite(peso) || peso <= 0) {
    erros.peso = 'Informe um peso válido, maior que zero.';
  }
  if (Object.keys(erros).length === 0) {
    const imc = peso / (altura * altura);
    if (!Number.isFinite(imc) || imc <= 0) {
      erros.altura = 'Não foi possível calcular com essas medidas. Confira os valores.';
    }
  }
  return { erros, medidas: { altura, peso } };
}

export function calcularIMC({ altura, peso }) {
  return peso / (altura * altura);
}

export function classificarIMC(imc) {
  return faixasIMC.find((faixa) => imc < faixa.limite);
}

const formatoIMC = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const formatoMedida = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 12 });

export function formatarIMC(imc) {
  if (imc < 0.01) return 'Menor que 0,01';
  // Mantém o valor exibido na mesma faixa do cálculo original.
  return formatoIMC.format(Math.floor(imc * 100) / 100);
}

export function formatarMedida(valor) {
  return formatoMedida.format(valor);
}
