import { useState } from 'react';
import FormularioIMC from './components/FormularioIMC.jsx';
import ResultadoIMC from './components/ResultadoIMC.jsx';
import TabelaIMC from './components/TabelaIMC.jsx';
import { validarMedidas, calcularIMC, classificarIMC } from './utils/imc.js';
import estilos from './App.module.css';

const camposVazios = { altura: '', peso: '' };

export default function App() {
  const [valores, setValores] = useState(camposVazios);
  const [erros, setErros] = useState({});
  const [medidas, setMedidas] = useState(null);
  const imc = medidas ? calcularIMC(medidas) : null;
  const faixa = medidas ? classificarIMC(imc) : null;

  function alterarCampo(campo, valor) {
    setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErros((anteriores) => ({ ...anteriores, [campo]: undefined }));
    setMedidas(null);
  }

  function calcular() {
    const resultado = validarMedidas(valores);
    setErros(resultado.erros);
    if (Object.keys(resultado.erros).length > 0) {
      setMedidas(null);
      return Object.keys(resultado.erros)[0];
    }
    setMedidas(resultado.medidas);
    return null;
  }

  function limpar() {
    setValores(camposVazios);
    setErros({});
    setMedidas(null);
  }

  return (
    <>
      <a className="skipLink" href="#calculadora">Ir para a calculadora</a>
      <header className={estilos.header}>
        <a className={estilos.marca} href="#inicio" aria-label="IMC, início">
          <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="currentColor"/><path d="M7 17h5l3-8 3 15 3-7h4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>imc<span className={estilos.ponto}>.</span></span>
        </a>
        <span className={estilos.headerNota}>Um número para entender melhor.</span>
      </header>
      <main id="inicio" className={estilos.main}>
        <div className={estilos.intro}>
          <p className={estilos.eyebrow}>ÍNDICE DE MASSA CORPORAL</p>
          <h1>Suas medidas.<br /><span>Seu IMC.</span></h1>
          <p>Informe sua altura e seu peso. Nós fazemos a conta e mostramos onde o resultado se encaixa.</p>
        </div>
        <div className={estilos.layout} id="calculadora" tabIndex="-1">
          <div className={estilos.colunaFormulario}>
            <FormularioIMC valores={valores} erros={erros} onChange={alterarCampo} onCalcular={calcular} onLimpar={limpar} />
            <div className={estilos.formula}><span>COMO É CALCULADO</span><p>IMC = peso (kg) ÷ altura² (m)</p></div>
          </div>
          <div className={estilos.colunaResultado}>
            <ResultadoIMC imc={imc} faixa={faixa} medidas={medidas} />
            <TabelaIMC faixaSelecionada={faixa?.id} />
          </div>
        </div>
        <aside className={estilos.aviso} aria-label="Sobre o resultado">
          <strong>Uma referência, não um diagnóstico.</strong>
          <p>Esta classificação geral é destinada a adultos. O IMC é uma estimativa e não substitui a avaliação de um profissional de saúde.</p>
        </aside>
      </main>
      <footer className={estilos.footer}><span>Calculadora de IMC</span><span>React · Módulo 28</span></footer>
    </>
  );
}
