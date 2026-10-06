import { useRef } from 'react';
import estilos from './FormularioIMC.module.css';

export default function FormularioIMC({ valores, erros, onChange, onCalcular, onLimpar }) {
  const alturaRef = useRef(null);
  const pesoRef = useRef(null);

  function enviar(evento) {
    evento.preventDefault();
    const primeiroErro = onCalcular();
    if (primeiroErro === 'altura') alturaRef.current.focus();
    if (primeiroErro === 'peso') pesoRef.current.focus();
  }

  return (
    <section className={estilos.card} aria-labelledby="formulario-titulo">
      <div className={estilos.heading}>
        <span className={estilos.numero} aria-hidden="true">01</span>
        <div><h2 id="formulario-titulo">Suas medidas</h2><p>Dois valores. Um cálculo simples.</p></div>
      </div>
      <form onSubmit={enviar} noValidate>
        <div className={estilos.campo}>
          <label htmlFor="altura">Altura <span>em metros</span></label>
          <div className={estilos.inputWrap}>
            <input id="altura" name="altura" ref={alturaRef} value={valores.altura}
              onChange={(evento) => onChange('altura', evento.target.value)}
              type="text" inputMode="decimal" placeholder="Ex.: 1,75" maxLength={16} required
              aria-invalid={Boolean(erros.altura)} aria-describedby={erros.altura ? 'altura-ajuda altura-erro' : 'altura-ajuda'} />
            <span aria-hidden="true">m</span>
          </div>
          <p className={estilos.ajuda} id="altura-ajuda">Use vírgula ou ponto para os decimais.</p>
          {erros.altura ? <p id="altura-erro" className={estilos.erro}>{erros.altura}</p> : null}
        </div>
        <div className={estilos.campo}>
          <label htmlFor="peso">Peso <span>em quilogramas</span></label>
          <div className={estilos.inputWrap}>
            <input id="peso" name="peso" ref={pesoRef} value={valores.peso}
              onChange={(evento) => onChange('peso', evento.target.value)}
              type="text" inputMode="decimal" placeholder="Ex.: 70" maxLength={16} required
              aria-invalid={Boolean(erros.peso)} aria-describedby={erros.peso ? 'peso-ajuda peso-erro' : 'peso-ajuda'} />
            <span aria-hidden="true">kg</span>
          </div>
          <p className={estilos.ajuda} id="peso-ajuda">Informe o peso em kg, sem a unidade.</p>
          {erros.peso ? <p id="peso-erro" className={estilos.erro}>{erros.peso}</p> : null}
        </div>
        <div className={estilos.acoes}>
          <button className={estilos.calcular} type="submit">Calcular IMC <span aria-hidden="true">→</span></button>
          <button className={estilos.limpar} type="button" onClick={() => { onLimpar(); alturaRef.current.focus(); }}>Limpar</button>
        </div>
      </form>
      <p className={estilos.privacidade}>O cálculo acontece aqui, no seu navegador.</p>
    </section>
  );
}
