// ==========================================================================
// 1. BASE DE DADOS OPERACIONAIS DO PARANÁ (DERAL / EMBRAPA)
// ==========================================================================
const dadosModos = {
  "agricultura": {
    "titulo": "MÓDULO DIGITAL: ECOSSISTEMA AGRÍCOLA",
    "labelVida": "Saúde Biofísica do Solo",
    "labelEspaco": "Tamanho da Área (Alqueires)",
    "imagem": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
    "culturas": {
      "soja": {
        "nome": "Soja (Safra)",
        "ciclo": "4 meses",
        "cicloAnosMin": 0.25,
        "tipoTempo": "curto",
        "custo": 3200,
        "faturamento": 5800,
        "carbono": -120,
        "saudeBase": 80,
        "lixiviacao": 15
      },
      "milho": {
        "nome": "Milho Safrinha",
        "ciclo": "5 meses",
        "cicloAnosMin": 0.25,
        "tipoTempo": "curto",
        "custo": 2600,
        "faturamento": 4400,
        "carbono": -80,
        "saudeBase": 70,
        "lixiviacao": 25
      },
      "eucalipto": {
        "nome": "Silvicultura (Eucalipto)",
        "ciclo": "7 anos",
        "cicloAnosMin": 7,
        "tipoTempo": "longo",
        "custo": 7000,
        "faturamento": 22000,
        "carbono": -600,
        "saudeBase": 90,
        "lixiviacao": 5
      }
    },
    "manejos": [
      { "id": "direto", "nome": "Plantio Direto na Palha (Sustentável)" },
      { "id": "convencional", "nome": "Arado Convencional (Alto Desgaste)" }
    ]
  },
  "pecuaria": {
    "titulo": "MÓDULO DIGITAL: PECUÁRIA INTEGRADA SUSTENTÁVEL",
    "labelVida": "Índice de Bem-Estar Animal",
    "labelEspaco": "Área de Pastagem (Alqueires)",
    "imagem": "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80",
    "culturas": {
      "bovino": {
        "nome": "Bovinocultura de Corte",
        "ciclo": "3 anos",
        "cicloAnosMin": 3,
        "tipoTempo": "longo",
        "custo": 1800,
        "faturamento": 3200,
        "carbono": 450,
        "saudeBase": 75,
        "lixiviacao": 30,
        "manejos": [
          { "id": "rotacionado", "nome": "Pasto Rotacionado Voisin" },
          { "id": "extensivo", "nome": "Pastagem Convencional" }
        ],
        "alimentacao": [
          { "id": "pasto", "nome": "Pastagem Natural" },
          { "id": "silagem", "nome": "Silagem de Milho" }
        ]
      },
      "aves": {
        "nome": "Avicultura (Frangos)",
        "ciclo": "42 dias",
        "cicloAnosMin": 0.25,
        "tipoTempo": "curto",
        "custo": 5,
        "faturamento": 7,
        "carbono": 12,
        "saudeBase": 85,
        "lixiviacao": 40,
        "manejos": [
          { "id": "dark_house", "nome": "Aviário Dark House" },
          { "id": "convencional_ave", "nome": "Aviário Convencional" }
        ],
        "alimentacao": [
          { "id": "racao_fase", "nome": "Ração por Fases" },
          { "id": "racao_comum", "nome": "Ração Comum" }
        ]
      },
      "suinos": {
        "nome": "Suinocultura",
        "ciclo": "140 dias",
        "cicloAnosMin": 0.5,
        "tipoTempo": "curto",
        "custo": 310,
        "faturamento": 420,
        "carbono": 85,
        "saudeBase": 65,
        "lixiviacao": 55,
        "manejos": [
          { "id": "sistema_siscal", "nome": "Sistema SISCAL" },
          { "id": "confinamento_suino", "nome": "Confinamento" }
        ],
        "alimentacao": [
          { "id": "racao_milho_soja", "nome": "Ração Concentrada" },
          { "id": "racao_residuos", "nome": "Ração com Subprodutos" }
        ]
      },
      "tilapia": {
        "nome": "Piscicultura (Tilápia)",
        "ciclo": "6 meses",
        "cicloAnosMin": 0.5,
        "tipoTempo": "curto",
        "custo": 9,
        "faturamento": 14,
        "carbono": 8,
        "saudeBase": 80,
        "lixiviacao": 20,
        "manejos": [
          { "id": "tanque_escavado", "nome": "Tanques Escavados" },
          { "id": "tanques_rede", "nome": "Tanques-Rede" }
        ],
        "alimentacao": [
          { "id": "extrusada_alta", "nome": "Ração Alta Proteína" },
          { "id": "extrusada_comum", "nome": "Ração Comum" }
        ]
      }
    }
  }
};

let modoAtivo = "agricultura";
let tamanhoFonteAtual = 100;

// DOM MAPPING
const telaBoasVindas = document.getElementById("tela-boas-vindas");
const telaSimulador = document.getElementById("tela-simulador");
const btnVoltarMenu = document.getElementById("btn-voltar-menu");
const seletorRegiao = document.getElementById("selecao-regiao");
const seletorSolo = document.getElementById("tipo-solo");
const seletorCultura = document.getElementById("selecao-cultura");
const seletorManejo = document.getElementById("pratica-manejo");
const seletorAlimentacao = document.getElementById("tipo-alimentacao");
const seletorCicloPadrao = document.getElementById("selecao-ciclo-padrao");
const seletorClima = document.getElementById("clima-dia");
const seletorEnergia = document.getElementById("matriz-energia");
const seletorFrota = document.getElementById("tipo-frota");
const seletorFiltroHUD = document.getElementById("filtro-hud-visao");
const blocoAlimentacao = document.getElementById("bloco-alimentacao");
const blocoCabecas = document.getElementById("bloco-cabecas");
const inputArea = document.getElementById("tamanho-area");
const inputCabecas = document.getElementById("quantidade-cabecas");
const inputTempo = document.getElementById("tempo-simulacao");
const labelArea = document.getElementById("label-area");
const labelCabecas = document.getElementById("label-cabecas");
const btnSimular = document.getElementById("btn-simular");
const btnReset = document.getElementById("btn-reset");

const txtModoAtivo = document.getElementById("txt-modo-ativo");
const txtRenderSetor = document.getElementById("txt-render-setor");
const txtLabelVida = document.getElementById("txt-label-vida");
const infoCicloPadrao = document.getElementById("info-ciclo-padrao");
const terminalLinhas = document.getElementById("terminal-linhas");
const hudCentroSaude = document.getElementById("hud-centro-saude");
const txtHudPorcentagem = document.getElementById("txt-hud-porcentagem");
const txtStatusBiologico = document.getElementById("txt-status-biologico");

const txtInvestimento = document.getElementById("txt-investimento");
const txtRendaBruta = document.getElementById("txt-renda-bruta");
const txtLucro = document.getElementById("txt-lucro");
const txtCarbono = document.getElementById("txt-carbono");
const txtSolo = document.getElementById("txt-solo");
const txtQuimico = document.getElementById("txt-quimico");
const progressoSolo = document.getElementById("progresso-solo");
const progressoQuimico = document.getElementById("progresso-quimico");

const txtVariacaoMercado = document.getElementById("txt-variacao-mercado");
const txtTelemetriaFrota = document.getElementById("txt-telemetria-frota");

const btnAumentarFonte = document.getElementById("btn-aumentar-fonte");
const btnDiminuirFonte = document.getElementById("btn-diminuir-fonte");
const btnAlternarContraste = document.getElementById("btn-alternar-contraste");

function logTerminal(mensagem, erro = false) {
    if (terminalLinhas) {
        const cor = erro ? "color: #ef4444;" : "";
        if (terminalLinhas.innerHTML.includes("Aguardando inicialização")) {
            terminalLinhas.innerHTML = `> <span style="${cor}">${mensagem}</span>`;
        } else {
            terminalLinhas.innerHTML += `<br>> <span style="${cor}">${mensagem}</span>`;
        }
        terminalLinhas.scrollTop = terminalLinhas.scrollHeight;
    }
}

function inicializarModo(escolha) {
    modoAtivo = escolha;
    if (telaBoasVindas) telaBoasVindas.style.display = "none";
    if (telaSimulador) telaSimulador.style.display = "grid";

    const dados = dadosModos[modoAtivo];
    if (txtModoAtivo) {
        txtModoAtivo.textContent = modoAtivo === "agricultura" ? "Agro" : "Pecuária";
        txtModoAtivo.className = `tag-modo modo-${modoAtivo === "agricultura" ? "agro" : "pec"}`;
    }
    if (txtRenderSetor) txtRenderSetor.textContent = dados.titulo;
    if (labelArea) labelArea.textContent = dados.labelEspaco;

    const imagemFazenda = document.querySelector(".imagem-fazenda") || document.getElementById("imagem-fazenda-bg");
    if (imagemFazenda) {
        imagemFazenda.style.backgroundImage = `url('${dados.imagem}')`;
    }

    if (modoAtivo === "agricultura") {
        if (blocoAlimentacao) blocoAlimentacao.style.display = "none";
        if (blocoCabecas) blocoCabecas.style.display = "none";
    } else {
        if (blocoAlimentacao) blocoAlimentacao.style.display = "block";
        if (blocoCabecas) blocoCabecas.style.display = "block";
    }

    if (seletorCultura) {
        seletorCultura.innerHTML = "";
        Object.keys(dados.culturas).forEach(chave => {
            seletorCultura.innerHTML += `<option value="${chave}">${dados.culturas[chave].nome}</option>`;
        });
    }

    atualizarManejosEAlimentacao();
    atualizarInfoCiclo();
    renderizarOpcoesTempo();
    resetarMetricas();
    logTerminal(`Módulo telemétrico de ${modoAtivo.toUpperCase()} ativado.`);
}

function atualizarManejosEAlimentacao() {
    if (!seletorCultura) return;
    const dados = dadosModos[modoAtivo];
    const culturaChave = seletorCultura.value;

    if (modoAtivo === "agricultura") {
        if (seletorManejo) {
            seletorManejo.innerHTML = "";
            dados.manejos.forEach(m => seletorManejo.innerHTML += `<option value="${m.id}">${m.nome}</option>`);
        }
    } else {
        const animalSelecionado = dados.culturas[culturaChave];
        if (animalSelecionado) {
            if (seletorManejo) {
                seletorManejo.innerHTML = "";
                animalSelecionado.manejos.forEach(m => seletorManejo.innerHTML += `<option value="${m.id}">${m.nome}</option>`);
            }
            if (seletorAlimentacao) {
                seletorAlimentacao.innerHTML = "";
                animalSelecionado.alimentacao.forEach(a => seletorAlimentacao.innerHTML += `<option value="${a.id}">${a.nome}</option>`);
            }
        }
    }
}

function renderizarOpcoesTempo() {
    if (!seletorCultura || !inputTempo) return;
    const culturaChave = seletorCultura.value;
    const cultura = dadosModos[modoAtivo].culturas[culturaChave];
    if (!cultura) return;

    inputTempo.innerHTML = "";
    if (cultura.tipoTempo === "curto") {
        inputTempo.innerHTML = `
            <option value="0.25">3 Meses (Ciclo Rápido)</option>
            <option value="0.5">6 Meses</option>
            <option value="1" selected>1 Ano</option>
            <option value="3">3 Anos</option>
            <option value="5">5 Anos</option>
            <option value="10">10 Anos (Longo Prazo)</option>
        `;
    } else {
        inputTempo.innerHTML = `
            <option value="1">1 Ano</option>
            <option value="3">3 Anos</option>
            <option value="5">5 Anos</option>
            <option value="7" selected>7 Anos (Maturidade)</option>
            <option value="10">10 Anos</option>
        `;
    }
}

function atualizarInfoCiclo() {
    if (!seletorCultura || !infoCicloPadrao) return;
    const culturaChave = seletorCultura.value;
    const cultura = dadosModos[modoAtivo].culturas[culturaChave];
    
    if (cultura) infoCicloPadrao.textContent = `⏱️ Ciclo Exigido: ${cultura.ciclo}`;

    if (culturaChave === "tilapia") {
        if (txtLabelVida) txtLabelVida.textContent = "Qualidade Biofísica da Água";
        if (labelCabecas) labelCabecas.textContent = "Quantidade de Alevinos";
    } else {
        if (txtLabelVida) txtLabelVida.textContent = modoAtivo === "agricultura" ? "Saúde Biofísica do Solo" : "Índice de Bem-Estar Animal";
        if (modoAtivo === "pecuaria" && labelCabecas) {
            labelCabecas.textContent = culturaChave === "aves" ? "Quantidade de Aves" : "Quantidade de Cabeças";
        }
    }
}

function resetarMetricas() {
    if (txtInvestimento) txtInvestimento.textContent = "R$ 0";
    if (txtRendaBruta) txtRendaBruta.textContent = "R$ 0";
    if (txtLucro) { txtLucro.textContent = "R$ 0,00"; txtLucro.style.color = "var(--text-primary)"; }
    if (txtCarbono) txtCarbono.textContent = "0 kg CO2e";
    if (txtSolo) txtSolo.textContent = "0%";
    if (txtQuimico) txtQuimico.textContent = "0%";
    if (progressoSolo) progressoSolo.style.width = "0%";
    if (progressoQuimico) progressoQuimico.style.width = "0%";
    if (hudCentroSaude) hudCentroSaude.style.display = "none";
    if (txtStatusBiologico) { txtStatusBiologico.textContent = "Aguardando..."; txtStatusBiologico.style.color = "#f59e0b"; }
    
    if (txtVariacaoMercado) { txtVariacaoMercado.textContent = "---"; txtVariacaoMercado.className = "texto-laranja"; }
    if (txtTelemetriaFrota) { txtTelemetriaFrota.textContent = "---"; txtTelemetriaFrota.className = "texto-laranja"; }

    const camadaFiltro = document.querySelector(".filtro-clima");
    if (camadaFiltro) camadaFiltro.className = "filtro-clima";
    
    const caixaMaquete = document.querySelector(".caixa-maquete");
    if (caixaMaquete) {
        caixaMaquete.style.borderColor = "var(--glass-border)";
        caixaMaquete.style.boxShadow = "none";
    }
    if (seletorFiltroHUD) seletorFiltroHUD.value = "normal";

    window.speechSynthesis.cancel();
}

function emitirRecomendacaoVoz(lucro, saudeFinal, culturaNome) {
    window.speechSynthesis.cancel();
    let texto = `A saúde ambiental para a cultura de ${culturaNome} está calculada em ${saudeFinal} por cento. `;
    texto += lucro > 0 ? "A operação gera superávit financeiro." : "Atenção ao risco de déficit operacional.";
    
    const locucao = new SpeechSynthesisUtterance(texto);
    locucao.lang = "pt-BR";
    window.speechSynthesis.speak(locucao);
}

function processarSimulacao() {
    const dados = dadosModos[modoAtivo];
    const culturaChave = seletorCultura.value;
    const cultura = dados.culturas[culturaChave];
    const anosSelecionados = parseFloat(inputTempo.value) || 1;
    const modificadorCiclo = seletorCicloPadrao.value;

    let anosMinimosExigidos = cultura.cicloAnosMin;
    if (modificadorCiclo === "estendido") anosMinimosExigidos += 0.25;
    if (modificadorCiclo === "intensivo" && anosMinimosExigidos > 0.25) anosMinimosExigidos -= 0.25;

    if (anosSelecionados < anosMinimosExigidos) {
        let msgTempo = anosMinimosExigidos < 1 ? `${anosMinimosExigidos * 12} meses` : `${anosMinimosExigidos} ano(s)`;
        logTerminal(`❌ ERRO: Simulação interrompida. Tempo mínimo: ${msgTempo}.`, true);
        alert(`Ciclo insuficiente! Esta operação exige pelo menos ${msgTempo}.`);
        resetarMetricas();
        return;
    }

    logTerminal("Processando matriz de dados do Gêmeo Digital...");

    let multiplicadorEscala = modoAtivo === "agricultura" ? (parseFloat(inputArea.value) || 0) : (parseFloat(inputCabecas.value) || 0);

    let saudeCalculada = cultura.saudeBase;
    if (seletorSolo.value === "arenoso") saudeCalculada -= 15;
    if (seletorSolo.value === "terra_vermelha") saudeCalculada += 5;

    if (seletorManejo && (seletorManejo.value === "convencional" || seletorManejo.value === "extensivo")) {
        saudeCalculada -= (10 * anosSelecionados);
    } else {
        saudeCalculada += (4 * anosSelecionados);
    }

    let custoTotal = cultura.custo * multiplicadorEscala * anosSelecionados;
    let receitaTotal = cultura.faturamento * multiplicadorEscala * anosSelecionados;

    let stringPreco = "Estável", classePreco = "texto-verde";
    let stringFrota = "Diesel Standard", classeFrota = "texto-laranja";

    if (seletorRegiao.value === "oeste") { stringPreco = "Alta (Exportação)"; receitaTotal *= 1.12; }
    
    if (seletorClima.value === "seco") { 
        stringPreco = "Baixa (Escassez)"; 
        receitaTotal *= 0.60; 
        saudeCalculada -= 15; 
    } else if (seletorClima.value === "geada") {
        stringPreco = "Instável (Quebra de Safra)";
        classePreco = "texto-vermelho";
        saudeCalculada -= 35;
        if (culturaChave === "soja" || culturaChave === "milho" || culturaChave === "tilapia") {
            receitaTotal *= 0.45;
        }
        logTerminal("⚠️ ALERTA DE GEADA ATIVO: Danos severos detectados nos tecidos celulares foliares/térmicos.");
    }

    if (seletorFrota.value === "eletrico") { 
        stringFrota = "Ecológica (Elétrica)"; 
        custoTotal *= 0.90; 
        classeFrota = "texto-verde"; 
    }
    if (seletorEnergia.value === "solar") custoTotal *= 0.92;

    if (txtVariacaoMercado) { txtVariacaoMercado.textContent = stringPreco; txtVariacaoMercado.className = classePreco; }
    if (txtTelemetriaFrota) { txtTelemetriaFrota.textContent = stringFrota; txtTelemetriaFrota.className = classeFrota; }

    saudeCalculada = Math.max(0, Math.min(100, Math.round(saudeCalculada)));
    let contaminacaoCalculada = Math.max(0, Math.min(100, cultura.lixiviacao + (seletorManejo.value === "convencional" ? 20 : 0)));
    let saudeFinal = Math.max(0, Math.min(100, Math.round(saudeCalculada - (contaminacaoCalculada * 0.2))));

    let lucroTotal = receitaTotal - custoTotal;
    let pegadaCarbono = cultura.carbono * multiplicadorEscala * anosSelecionados;

    if (txtInvestimento) txtInvestimento.textContent = custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    if (txtRendaBruta) txtRendaBruta.textContent = receitaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    if (txtLucro) {
        txtLucro.textContent = lucroTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
        txtLucro.style.color = lucroTotal >= 0 ? "#10b981" : "#ef4444";
    }
    if (txtCarbono) txtCarbono.textContent = `${Math.round(pegadaCarbono).toLocaleString('pt-BR')} kg CO2e`;
    if (txtSolo) txtSolo.textContent = `${saudeCalculada}%`;
    if (txtQuimico) txtQuimico.textContent = `${contaminacaoCalculada}%`;
    if (progressoSolo) progressoSolo.style.width = `${saudeCalculada}%`;
    if (progressoQuimico) progressoQuimico.style.width = `${contaminacaoCalculada}%`;

    if (txtStatusBiologico) {
        txtStatusBiologico.textContent = saudeFinal > 70 ? "Sustentável" : (saudeFinal > 40 ? "Moderado" : "Degradado");
        txtStatusBiologico.style.color = saudeFinal > 70 ? "#10b981" : (saudeFinal > 40 ? "#f59e0b" : "#ef4444");
    }

    if (hudCentroSaude && txtHudPorcentagem) {
        hudCentroSaude.style.display = "flex";
        txtHudPorcentagem.textContent = `${saudeFinal}%`;
    }

    logTerminal(`Simulação concluída com sucesso para o ciclo selecionado.`);
    emitirRecomendacaoVoz(lucroTotal, saudeFinal, cultura.nome);
}

function gerenciarMudancaFiltro(valorFiltro) {
    const camadaFiltro = document.querySelector(".filtro-clima");
    const caixaMaquete = document.querySelector(".caixa-maquete");
    if (!camadaFiltro || !caixaMaquete) return;

    caixaMaquete.style.transition = "all 0.4s ease";

    if (valorFiltro === "ndvi") {
        camadaFiltro.className = "filtro-clima hud-ndvi";
        caixaMaquete.style.borderColor = "#10b981";
        caixaMaquete.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.35)";
        logTerminal("🛰️ FILTRO SATELITAL: Sensoriamento NDVI ativado. Monitorando densidade de clorofila.");
    } else if (valorFiltro === "termico") {
        camadaFiltro.className = "filtro-clima hud-termico";
        caixaMaquete.style.borderColor = "#ef4444";
        caixaMaquete.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.35)";
        logTerminal("🌡️ FILTRO TELEMÉTRICO: Análise térmica ativada. Monitorando radiação e estresse hídrico.");
    } else {
        camadaFiltro.className = "filtro-clima";
        caixaMaquete.style.borderColor = "var(--glass-border)";
        caixaMaquete.style.boxShadow = "none";
        logTerminal("📺 Filtro óptico redefinido para o modo de visão visível padrão.");
    }
}

// ==========================================================================
// 3. LOGICA DE ACESSIBILIDADE DIRETA (IGNORA TRAVAS DO CSS)
// ==========================================================================
function alterarTamanhoFonte(acao) {
    if (acao === "aumentar" && tamanhoFonteAtual < 140) {
        tamanhoFonteAtual += 10;
    } else if (acao === "diminuir" && tamanhoFonteAtual > 85) {
        tamanhoFonteAtual -= 10;
    }
    
    document.body.style.fontSize = `${tamanhoFonteAtual}%`;
    
    const elementos = document.querySelectorAll("p, span, h1, h2, h3, h4, label, select, input, button");
    elementos.forEach(el => {
        el.style.fontSize = `${tamanhoFonteAtual}%`;
    });
    
    logTerminal(`Acessibilidade: Fontes ajustadas para ${tamanhoFonteAtual}%.`);
}

function alternarAltoContraste() {
    document.body.classList.toggle("alto-contraste-ativo");
    const ativo = document.body.classList.contains("alto-contraste-ativo");
    
    const conteineres = document.querySelectorAll(".painel-lateral, .card-metrica, .caixa-maquete, .caixa-terminal, header, .faixa-recorde, .menu-inicial-container, .cartao-apresentacao");
    const textos = document.querySelectorAll("p, span, h1, h2, h3, h4, label");
    const controles = document.querySelectorAll("select, input, button");

    if (ativo) {
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#FFFF00";

        conteineres.forEach(c => {
            c.style.backgroundColor = "#000000";
            c.style.color = "#FFFFFF";
            c.style.border = "2px solid #FFFFFF";
            c.style.backgroundImage = "none";
        });

        textos.forEach(t => t.style.color = "#FFFFFF");
        controles.forEach(ctrl => {
            ctrl.style.backgroundColor = "#000000";
            ctrl.style.color = "#FFFF00";
            ctrl.style.border = "2px solid #FFFF00";
        });
        logTerminal("Acessibilidade: Alto Contraste Ativado.");
    } else {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";

        conteineres.forEach(c => {
            c.style.backgroundColor = "";
            c.style.color = "";
            c.style.border = "";
            c.style.backgroundImage = "";
        });

        textos.forEach(t => t.style.color = "");
        controles.forEach(ctrl => {
            ctrl.style.backgroundColor = "";
            ctrl.style.color = "";
            ctrl.style.border = "";
        });
        logTerminal("Acessibilidade: Contraste restaurado.");
    }
}

// LISTENERS CONFIGURADOS
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-hub-opcao").forEach(btn => {
        btn.addEventListener("click", () => inicializarModo(btn.getAttribute("data-escolha")));
    });

    if (btnVoltarMenu) {
        btnVoltarMenu.addEventListener("click", () => {
            if (telaSimulador) telaSimulador.style.display = "none";
            if (telaBoasVindas) telaBoasVindas.style.display = "flex";
            resetarMetricas();
        });
    }

    if (seletorCultura) {
        seletorCultura.addEventListener("change", () => {
            atualizarManejosEAlimentacao();
            atualizarInfoCiclo();
            renderizarOpcoesTempo();
            resetarMetricas();
        });
    }

    if (seletorFiltroHUD) {
        seletorFiltroHUD.addEventListener("change", (e) => {
            gerenciarMudancaFiltro(e.target.value);
        });
    }

    if (btnSimular) btnSimular.addEventListener("click", processarSimulacao);
    if (btnReset) btnReset.addEventListener("click", resetarMetricas);

    // BINDINGS ACESSIBILIDADE
    if (btnAumentarFonte) btnAumentarFonte.addEventListener("click", () => alterarTamanhoFonte("aumentar"));
    if (btnDiminuirFonte) btnDiminuirFonte.addEventListener("click", () => alterarTamanhoFonte("diminuir"));
    if (btnAlternarContraste) btnAlternarContraste.addEventListener("click", alternarAltoContraste);
});