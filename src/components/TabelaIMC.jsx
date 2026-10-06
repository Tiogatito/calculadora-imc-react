import { faixasIMC } from '../utils/imc.js';
import estilos from './TabelaIMC.module.css';

export default function TabelaIMC({ faixaSelecionada }) {
  return (
    <section className={estilos.card} aria-labelledby="tabela-titulo">
      <div className={estilos.heading}><h2 id="tabela-titulo">Entenda a classificação</h2><span>ADULTOS</span></div>
      <table>
        <caption className="srOnly">Faixas de índice de massa corporal em kg por metro quadrado</caption>
        <thead><tr><th scope="col">IMC (kg/m²)</th><th scope="col">Classificação</th></tr></thead>
        <tbody>
          {faixasIMC.map((faixa) => {
            const selecionada = faixa.id === faixaSelecionada;
            return (
              <tr key={faixa.id} className={selecionada ? estilos.selecionada : undefined}>
                <td>{faixa.intervalo}</td>
                <th scope="row">{faixa.nome}{selecionada ? <span className={estilos.selo}>Seu resultado</span> : null}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className={estilos.fonte}>Referência: <a href="https://bvsms.saude.gov.br/bvs/dicas/215_obesidade.html" target="_blank" rel="noopener noreferrer">Ministério da Saúde<span className="srOnly"> (abre em nova aba)</span></a> e <a href="https://bvsms.saude.gov.br/bvs/saudelegis/gm/2013/prt0424_19_03_2013.html" target="_blank" rel="noopener noreferrer">faixas de IMC<span className="srOnly"> (abre em nova aba)</span></a>.</p>
    </section>
  );
}
