import { formatarIMC, formatarMedida } from '../utils/imc.js';
import estilos from './ResultadoIMC.module.css';

export default function ResultadoIMC({ imc, faixa, medidas }) {
  return (
    <section className={estilos.card} aria-labelledby="resultado-titulo" aria-live="polite" aria-atomic="true">
      <p className={estilos.eyebrow} id="resultado-titulo">SEU RESULTADO</p>
      {medidas ? (
        <>
          <div className={estilos.valor}><strong>{formatarIMC(imc)}</strong><span>kg/m²</span></div>
          <h2 className={estilos.classificacao}>{faixa.nome}</h2>
          <p className={estilos.detalhe}>{formatarMedida(medidas.peso)} kg ÷ ({formatarMedida(medidas.altura)} m × {formatarMedida(medidas.altura)} m)</p>
          <p className={estilos.nota}>Veja sua faixa destacada na tabela abaixo.</p>
        </>
      ) : (
        <>
          <div className={estilos.espera} aria-hidden="true">—</div>
          <h2 className={estilos.classificacao}>Pronto para calcular?</h2>
          <p className={estilos.detalhe}>Preencha altura e peso para ver seu IMC e a classificação correspondente.</p>
        </>
      )}
    </section>
  );
}
