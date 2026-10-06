# Calculadora de IMC

Exercício do módulo 28 — Introdução ao React. Formulário com altura e peso, cálculo do índice de massa corporal e classificação em uma tabela.

## Executar

Requer Node.js 24.x e npm.

```sh
npm ci
npm run dev
```

Para gerar a versão de produção: `npm run build`. Para visualizá-la localmente: `npm run preview`.

## Implementação

- React com Vite, JSX e componentes separados para formulário, resultado e tabela.
- `useState`, campos controlados, eventos `onChange`/`onSubmit` e comunicação por props.
- Cálculo e classificação derivados das medidas confirmadas, sem efeitos ou estado redundante.
- Renderização condicional e lista de faixas com `map` e chaves estáveis.
- Estilos isolados com CSS Modules; variáveis e estilos globais em `global.css`.
- Interface responsiva, rótulos, navegação por teclado, erros associados aos campos, foco no primeiro campo inválido e resultado anunciado por `aria-live`.

## Cálculo e entradas

`IMC = peso em kg / (altura em metros × altura em metros)`.

Aceita números positivos com vírgula ou ponto decimal, sem separadores de milhares. Altura limitada a 3 metros para evitar a entrada acidental em centímetros. Entradas vazias, zero, texto, sinais negativos, notação científica e resultados não finitos são rejeitados. Alterar uma medida limpa o resultado anterior; Limpar restaura o formulário e o foco na altura.

Classificação feita sobre o valor completo: abaixo de 18,5; de 18,5 a menos de 25; de 25 a menos de 30; de 30 a menos de 35; de 35 a menos de 40; a partir de 40. O resultado é exibido com duas casas decimais truncadas, para não arredondar para a faixa seguinte. Resultados positivos inferiores a 0,01 são exibidos como “Menor que 0,01”.

Exemplo: 83 kg e 1,75 m → IMC 27,10, sobrepeso. A linha correspondente fica destacada com o texto “Seu resultado”. A tabela continua disponível antes do cálculo.

Referências: [Ministério da Saúde — obesidade](https://bvsms.saude.gov.br/bvs/dicas/215_obesidade.html) e [faixas de IMC](https://bvsms.saude.gov.br/bvs/saudelegis/gm/2013/prt0424_19_03_2013.html). A classificação geral é destinada a adultos; o IMC não substitui avaliação profissional.

## Publicação

Importe este repositório na Vercel usando o preset Vite. O arquivo `vercel.json` configura o comando de build e a saída `dist`. O cálculo é local: as medidas não são enviadas a uma API nem salvas em armazenamento persistente.
