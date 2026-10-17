import { useEffect, useState } from "react";

import {
  FaBell,
  FaUserCircle,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCheckCircle,
  FaGift,
  FaTimes,
  FaBars,
} from "react-icons/fa";

function Header({ onNavigate, dadosVersion, onOpenSidebar }) {
  const [produtos, setProdutos] = useState([]);
  const [mostrarNotificacoes, setMostrarNotificacoes] =
    useState(false);

  const [nomeUsuario, setNomeUsuario] = useState(() => {
    return (
      localStorage.getItem("larflowNomeUsuario") ||
      "Bianca"
    );
  });

  const [nomeLar, setNomeLar] = useState(() => {
    return (
      localStorage.getItem("larflowNomeLar") ||
      "LarFlow"
    );
  });

  // =========================================================
  // CARREGAR PRODUTOS
  // =========================================================

  useEffect(() => {
    function carregarProdutos() {
      const produtosSalvos =
        localStorage.getItem("produtos");

      setNomeUsuario(
        localStorage.getItem("larflowNomeUsuario") ||
        "Bianca"
      );

      setNomeLar(
        localStorage.getItem("larflowNomeLar") ||
        "LarFlow"
      );

      if (!produtosSalvos) {
        setProdutos([]);
        return;
      }

      try {
        const dados = JSON.parse(produtosSalvos);

        if (Array.isArray(dados)) {
          setProdutos(dados);
        } else {
          setProdutos([]);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar notificações:",
          error
        );

        setProdutos([]);
      }
    }

    carregarProdutos();

    // Atualiza quando houver alteração em outra aba
    window.addEventListener(
      "storage",
      carregarProdutos
    );

    return () => {
      window.removeEventListener(
        "storage",
        carregarProdutos
      );
    };
  }, [dadosVersion]);

  // =========================================================
  // DADOS
  // =========================================================

  const produtosPendentes = produtos.filter(
    (produto) =>
      produto.status !== "Comprado"
  );

  const produtosComprados = produtos.filter(
    (produto) =>
      produto.status === "Comprado"
  );

  const unidadesPendentes =
    produtosPendentes.reduce(
      (total, produto) =>
        total +
        (Number(produto.quantidade) || 1),
      0
    );

  const unidadesCompradas =
    produtosComprados.reduce(
      (total, produto) =>
        total +
        (Number(produto.quantidade) || 1),
      0
    );

  const totalUnidades =
    unidadesPendentes +
    unidadesCompradas;

  const progresso =
    totalUnidades > 0
      ? Math.round(
          (unidadesCompradas /
            totalUnidades) *
            100
        )
      : 0;

  // =========================================================
  // PRESENTES
  // =========================================================

  const presentes = produtosComprados.filter(
    (produto) =>
      produto.categoria === "Presente"
  );

  const unidadesPresentes =
    presentes.reduce(
      (total, produto) =>
        total +
        (Number(produto.quantidade) || 1),
      0
    );

  // =========================================================
  // ORÇAMENTO
  // =========================================================

  const orcamento = Number(
    localStorage.getItem(
      "orcamentoCasa"
    ) || 0
  );

  const totalGasto =
    produtosComprados
      .filter(
        (produto) =>
          produto.categoria !==
            "Presente" &&
          Number(produto.valor || 0) > 0
      )
      .reduce(
        (total, produto) =>
          total +
          Number(produto.valor || 0),
        0
      );

  const percentualOrcamento =
    orcamento > 0
      ? Math.round(
          (totalGasto / orcamento) *
            100
        )
      : 0;

  const orcamentoProximoDoLimite =
    orcamento > 0 &&
    percentualOrcamento >= 80;

  const orcamentoUltrapassado =
    orcamento > 0 &&
    totalGasto > orcamento;

  // =========================================================
  // QUANTIDADE DE NOTIFICAÇÕES
  // =========================================================

  let quantidadeNotificacoes = 0;

  if (unidadesPendentes > 0) {
    quantidadeNotificacoes++;
  }

  if (orcamentoProximoDoLimite) {
    quantidadeNotificacoes++;
  }

  if (unidadesCompradas > 0) {
    quantidadeNotificacoes++;
  }

  if (unidadesPresentes > 0) {
    quantidadeNotificacoes++;
  }

  // =========================================================
  // NAVEGAÇÃO
  // =========================================================

  function irPara(
    pagina,
    categoria = "Todos"
  ) {
    setMostrarNotificacoes(false);

    if (onNavigate) {
      onNavigate(
        pagina,
        categoria
      );
    }
  }

  return (
    <header className="header">

      <button
        type="button"
        className="mobile-menu-button"
        onClick={onOpenSidebar}
        aria-label="Abrir menu"
      >
        <FaBars />
      </button>

      {/* =====================================================
          MARCA
      ===================================================== */}

      <div className="header-brand">

        <span className="header-icon">
          🏡
        </span>

        <div>

          <h1>{nomeLar}</h1>

          <p>
            Organize o seu lar de forma
            prática e eficiente.
          </p>

        </div>

      </div>

      {/* =====================================================
          LADO DIREITO
      ===================================================== */}

      <div className="header-right">

        {/* ===================================================
            NOTIFICAÇÕES
        =================================================== */}

        <div className="notification-wrapper">

          <button
            type="button"
            className={`notification-button ${
              mostrarNotificacoes
                ? "notification-active"
                : ""
            }`}
            onClick={() =>
              setMostrarNotificacoes(
                !mostrarNotificacoes
              )
            }
            aria-label="Notificações"
          >

            <FaBell />

            {quantidadeNotificacoes > 0 && (
              <span className="notification-badge">
                {quantidadeNotificacoes}
              </span>
            )}

          </button>

          {/* =================================================
              PAINEL
          ================================================= */}

          {mostrarNotificacoes && (

            <div className="notification-panel">

              <div className="notification-panel-header">

                <div>

                  <span>
                    NOTIFICAÇÕES
                  </span>

                  <h3>
                    O que precisa da sua atenção
                  </h3>

                </div>

                <button
                  type="button"
                  className="notification-close"
                  onClick={() =>
                    setMostrarNotificacoes(
                      false
                    )
                  }
                  aria-label="Fechar notificações"
                >
                  <FaTimes />
                </button>

              </div>

              <div className="notification-list">

                {/* =================================================
                    COMPRAS PENDENTES
                ================================================= */}

                {unidadesPendentes > 0 && (

                  <button
                    type="button"
                    className="notification-item"
                    onClick={() =>
                      irPara("compras")
                    }
                  >

                    <div className="notification-item-icon pending">
                      <FaShoppingCart />
                    </div>

                    <div className="notification-item-content">

                      <strong>
                        Compras pendentes
                      </strong>

                      <span>
                        Você ainda tem{" "}
                        {unidadesPendentes}{" "}
                        {unidadesPendentes === 1
                          ? "item"
                          : "itens"}{" "}
                        para comprar.
                      </span>

                    </div>

                  </button>

                )}

                {/* =================================================
                    ORÇAMENTO
                ================================================= */}

                {orcamentoProximoDoLimite &&
                  orcamento > 0 && (

                  <button
                    type="button"
                    className="notification-item"
                    onClick={() =>
                      irPara("gastos")
                    }
                  >

                    <div className="notification-item-icon budget">
                      <FaMoneyBillWave />
                    </div>

                    <div className="notification-item-content">

                      <strong>
                        {orcamentoUltrapassado
                          ? "Orçamento ultrapassado"
                          : "Orçamento próximo do limite"}
                      </strong>

                      <span>
                        Você já utilizou{" "}
                        {percentualOrcamento}%
                        {" "}do orçamento.
                      </span>

                    </div>

                  </button>

                )}

                {/* =================================================
                    PROGRESSO
                ================================================= */}

                {unidadesCompradas > 0 && (

                  <button
                    type="button"
                    className="notification-item"
                    onClick={() =>
                      irPara("dashboard")
                    }
                  >

                    <div className="notification-item-icon success">
                      <FaCheckCircle />
                    </div>

                    <div className="notification-item-content">

                      <strong>
                        Progresso da casa
                      </strong>

                      <span>
                        {progresso}% do seu lar
                        já está concluído.
                      </span>

                    </div>

                  </button>

                )}

                {/* =================================================
                    PRESENTES
                ================================================= */}

                {unidadesPresentes > 0 && (

                  <button
                    type="button"
                    className="notification-item"
                    onClick={() =>
                      irPara("compras")
                    }
                  >

                    <div className="notification-item-icon gift">
                      <FaGift />
                    </div>

                    <div className="notification-item-content">

                      <strong>
                        Presentes recebidos
                      </strong>

                      <span>
                        Você já recebeu{" "}
                        {unidadesPresentes}{" "}
                        {unidadesPresentes === 1
                          ? "item"
                          : "itens"}{" "}
                        como presente.
                      </span>

                    </div>

                  </button>

                )}

                {/* =================================================
                    NENHUMA NOTIFICAÇÃO
                ================================================= */}

                {quantidadeNotificacoes === 0 && (

                  <div className="notifications-empty">

                    <FaCheckCircle />

                    <h4>
                      Tudo em ordem
                    </h4>

                    <p>
                      Não há nada que precise
                      da sua atenção agora.
                    </p>

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

        {/* =====================================================
            USUÁRIO
        ===================================================== */}

        <div className="user">

          <span>
            {nomeUsuario}
          </span>

          <FaUserCircle />

        </div>

      </div>

    </header>
  );
}

export default Header;