import { useEffect, useMemo, useRef, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import SummaryCard from "../components/SummaryCard";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaShoppingCart,
  FaMoneyBillWave,
  FaGift,
  FaArrowRight,
  FaPlus,
  FaWallet,
  FaHome,
} from "react-icons/fa";

function Dashboard({ onNavigate }) {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [ambienteSelecionado, setAmbienteSelecionado] =
    useState(null);
  const [mostrarProdutos, setMostrarProdutos] =
    useState(false);

  const produtosSectionRef = useRef(null);

  const [orcamento, setOrcamento] = useState(() => {
    return Number(
      localStorage.getItem("orcamentoCasa") || 0
    );
  });

  // =========================================================
  // CARREGAR DADOS
  // =========================================================

  useEffect(() => {
    function carregarDados() {
      const produtosSalvos =
        localStorage.getItem("produtos");

      try {
        if (!produtosSalvos) {
          setProdutos([]);
        } else {
          const produtosConvertidos =
            JSON.parse(produtosSalvos);

          if (Array.isArray(produtosConvertidos)) {
            setProdutos(
              produtosConvertidos.map((produto) => ({
                ...produto,
                quantidade:
                  Number(produto.quantidade) || 1,
              }))
            );
          } else {
            setProdutos([]);
          }
        }
      } catch (error) {
        console.error(
          "Erro ao carregar produtos:",
          error
        );

        setProdutos([]);
      }

      setOrcamento(
        Number(
          localStorage.getItem(
            "orcamentoCasa"
          ) || 0
        )
      );
    }

    carregarDados();

    window.addEventListener(
      "storage",
      carregarDados
    );

    window.addEventListener(
      "larflow-data-updated",
      carregarDados
    );

    return () => {
      window.removeEventListener(
        "storage",
        carregarDados
      );

      window.removeEventListener(
        "larflow-data-updated",
        carregarDados
      );
    };
  }, []);

  // =========================================================
  // AMBIENTES
  // =========================================================

  const ambientes = [
    {
      valor: "Sala de Estar",
      nome: "Sala de Estar",
      icone: "🛋️",
    },
    {
      valor: "Sala de Jantar",
      nome: "Sala de Jantar",
      icone: "🍽️",
    },
    {
      valor: "Cozinha",
      nome: "Cozinha",
      icone: "🍳",
    },
    {
      valor: "Quarto",
      nome: "Quarto",
      icone: "🛏️",
    },
    {
      valor: "Banheiro",
      nome: "Banheiro",
      icone: "🛁",
    },
    {
      valor: "Lavanderia",
      nome: "Lavanderia",
      icone: "🧺",
    },
    {
      valor: "Escritório",
      nome: "Escritório",
      icone: "💻",
    },
  ];

  // =========================================================
  // PRODUTOS / UNIDADES
  // =========================================================

  const produtosComprados = produtos.filter(
    (produto) =>
      produto.status === "Comprado"
  );

  const produtosPendentes = produtos.filter(
    (produto) =>
      produto.status !== "Comprado"
  );

  const totalItens = produtos.length;

  const totalUnidades = produtos.reduce(
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

  const unidadesPendentes =
    produtosPendentes.reduce(
      (total, produto) =>
        total +
        (Number(produto.quantidade) || 1),
      0
    );

  const valorTotalGasto =
    produtosComprados.reduce(
      (total, produto) =>
        total + Number(produto.valor || 0),
      0
    );

  const presentes = produtos.filter(
    (produto) =>
      produto.categoria === "Presente" &&
      produto.status === "Comprado"
  );

  const unidadesPresentes =
    presentes.reduce(
      (total, produto) =>
        total +
        (Number(produto.quantidade) || 1),
      0
    );

  const progresso =
    totalUnidades > 0
      ? Math.round(
          (unidadesCompradas /
            totalUnidades) *
            100
        )
      : 0;

  // =========================================================
  // ORÇAMENTO
  // =========================================================

  const percentualOrcamento =
    orcamento > 0
      ? Math.round(
          (valorTotalGasto /
            orcamento) *
            100
        )
      : 0;

  const valorRestante =
    Math.max(
      orcamento - valorTotalGasto,
      0
    );

  const orcamentoUltrapassado =
    orcamento > 0 &&
    valorTotalGasto > orcamento;

  // =========================================================
  // FORMATAÇÃO
  // =========================================================

  function formatarMoeda(valor) {
    return Number(
      valor || 0
    ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // =========================================================
  // AMBIENTES
  // =========================================================

  const dadosAmbientes = useMemo(
    () =>
      ambientes.map((ambiente) => {
        const itens =
          produtos.filter(
            (produto) =>
              produto.categoria ===
              ambiente.valor
          );

        const unidades =
          itens.reduce(
            (total, produto) =>
              total +
              (Number(
                produto.quantidade
              ) || 1),
            0
          );

        const unidadesCompradasAmbiente =
          itens
            .filter(
              (produto) =>
                produto.status ===
                "Comprado"
            )
            .reduce(
              (total, produto) =>
                total +
                (Number(
                  produto.quantidade
                ) || 1),
              0
            );

        const progressoAmbiente =
          unidades > 0
            ? Math.round(
                (unidadesCompradasAmbiente /
                  unidades) *
                  100
              )
            : 0;

        return {
          ...ambiente,
          itens: itens.length,
          unidades,
          unidadesCompradas:
            unidadesCompradasAmbiente,
          progresso:
            progressoAmbiente,
        };
      }),
    [produtos]
  );

  // =========================================================
  // FILTROS
  // =========================================================

  const produtosExibidos = useMemo(() => {
    let resultado = [
      ...produtos,
    ];

    if (ambienteSelecionado) {
      resultado =
        resultado.filter(
          (produto) =>
            produto.categoria ===
            ambienteSelecionado
        );
    }

    if (filtro === "Comprados") {
      resultado =
        resultado.filter(
          (produto) =>
            produto.status ===
            "Comprado"
        );
    }

    if (filtro === "Pendentes") {
      resultado =
        resultado.filter(
          (produto) =>
            produto.status !==
            "Comprado"
        );
    }

    return resultado;
  }, [
    produtos,
    ambienteSelecionado,
    filtro,
  ]);

  function alternarFiltro(
    novoFiltro
  ) {
    setFiltro((atual) =>
      atual === novoFiltro
        ? "Todos"
        : novoFiltro
    );

    setAmbienteSelecionado(
      null
    );
  }

  function selecionarAmbiente(
    ambiente
  ) {
    setAmbienteSelecionado(
      (atual) =>
        atual === ambiente
          ? null
          : ambiente
    );

    setFiltro("Todos");
    setMostrarProdutos(true);

    setTimeout(() => {
      produtosSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  function mostrarListaProdutos(
    novoFiltro = "Todos"
  ) {
    setFiltro(novoFiltro);
    setAmbienteSelecionado(null);
    setMostrarProdutos(true);

    setTimeout(() => {
      produtosSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  function abrirAmbienteNoMoveis(
    ambiente
  ) {
    onNavigate(
      "moveis",
      ambiente
    );
  }

  // =========================================================
  // PRÓXIMA AÇÃO
  // =========================================================

  const proximaAcao = useMemo(() => {
    if (unidadesPendentes > 0) {
      return {
        tipo: "compras",
        icone: <FaShoppingCart />,
        titulo:
          "Você ainda tem compras pendentes",
        descricao:
          `${unidadesPendentes} ${
            unidadesPendentes === 1
              ? "unidade"
              : "unidades"
          } aguardando compra.`,
        botao: "Ver compras",
      };
    }

    if (
      orcamento > 0 &&
      percentualOrcamento >= 80
    ) {
      return {
        tipo: "gastos",
        icone: <FaWallet />,
        titulo:
          orcamentoUltrapassado
            ? "Seu orçamento foi ultrapassado"
            : "Seu orçamento está próximo do limite",
        descricao:
          orcamentoUltrapassado
            ? `Você ultrapassou em ${formatarMoeda(
                valorTotalGasto -
                  orcamento
              )}.`
            : `Restam ${formatarMoeda(
                valorRestante
              )}.`,
        botao: "Ver gastos",
      };
    }

    if (progresso === 100) {
      return {
        tipo: "dashboard",
        icone: <FaCheckCircle />,
        titulo:
          "Casa concluída",
        descricao:
          "Todos os itens cadastrados já foram concluídos.",
        botao: "Ver progresso",
      };
    }

    if (totalItens === 0) {
      return {
        tipo: "moveis",
        icone: <FaPlus />,
        titulo:
          "Comece sua lista",
        descricao:
          "Adicione os produtos que você precisa para sua casa.",
        botao: "Adicionar produto",
      };
    }

    return {
      tipo: "moveis",
      icone: <FaHome />,
      titulo:
        "Continue organizando sua casa",
      descricao:
        `${progresso}% do seu lar já está concluído.`,
      botao: "Ver móveis",
    };
  }, [
    unidadesPendentes,
    orcamento,
    percentualOrcamento,
    orcamentoUltrapassado,
    valorRestante,
    valorTotalGasto,
    progresso,
    totalItens,
  ]);

  function executarProximaAcao() {
    if (proximaAcao.tipo === "moveis") {
      onNavigate("moveis");
      return;
    }

    if (
      proximaAcao.tipo ===
      "compras"
    ) {
      onNavigate("compras");
      return;
    }

    if (
      proximaAcao.tipo ===
      "gastos"
    ) {
      onNavigate("gastos");
      return;
    }

    onNavigate("dashboard");
  }

  return (
    <div className="dashboard">

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

      <div className="dashboard-header">
        <div>
          <span className="dashboard-overline">
            VISÃO GERAL
          </span>

          <h2>
            Sua casa em progresso
          </h2>

          <p>
            Acompanhe suas compras e veja
            quanto falta para deixar tudo pronto.
          </p>
        </div>
      </div>

      {/* =====================================================
          CARDS RESUMO
      ===================================================== */}

      <div className="summary-grid">

        <div
          className={`dashboard-card-wrapper ${
            mostrarProdutos &&
            filtro === "Todos" &&
            !ambienteSelecionado
              ? "dashboard-card-ativo"
              : ""
          }`}
          onClick={() =>
            mostrarListaProdutos("Todos")
          }
        >
          <SummaryCard
            icon={<FaBoxOpen />}
            title="Produtos"
            value={totalItens}
          />
        </div>

        <div
          className={`dashboard-card-wrapper ${
            filtro ===
            "Comprados"
              ? "dashboard-card-ativo"
              : ""
          }`}
          onClick={() =>
            mostrarListaProdutos("Comprados")
          }
        >
          <SummaryCard
            icon={<FaCheckCircle />}
            title="Comprados"
            value={unidadesCompradas}
          />
        </div>

        <div
          className={`dashboard-card-wrapper ${
            filtro ===
            "Pendentes"
              ? "dashboard-card-ativo"
              : ""
          }`}
          onClick={() =>
            mostrarListaProdutos("Pendentes")
          }
        >
          <SummaryCard
            icon={<FaShoppingCart />}
            title="Pendentes"
            value={unidadesPendentes}
          />
        </div>

        <div
          className="dashboard-card-wrapper"
          onClick={() =>
            onNavigate("gastos")
          }
        >
          <SummaryCard
            icon={<FaMoneyBillWave />}
            title="Total Gasto"
            value={formatarMoeda(
              valorTotalGasto
            )}
          />
        </div>

      </div>

      {/* =====================================================
          FILTRO / PRODUTOS
      ===================================================== */}

      {mostrarProdutos && (

        <div
          className="dashboard-products"
          ref={produtosSectionRef}
        >

          <div className="dashboard-products-header">

            <div>

              <span className="dashboard-overline">
                ITENS CORRESPONDENTES
              </span>

              <h3>
                {ambienteSelecionado
                  ? ambienteSelecionado
                  : filtro === "Comprados"
                  ? "Produtos comprados"
                  : filtro === "Pendentes"
                  ? "Produtos pendentes"
                  : "Todos os produtos"}
              </h3>

              <p>
                {produtosExibidos.length}{" "}
                {produtosExibidos.length === 1
                  ? "produto encontrado"
                  : "produtos encontrados"}
              </p>

            </div>

            <button
              type="button"
              className="dashboard-clear-filter"
              onClick={() => {
                setFiltro("Todos");
                setAmbienteSelecionado(null);
                setMostrarProdutos(false);
              }}
            >
              Limpar
            </button>

          </div>

          {produtosExibidos.length ===
          0 ? (

            <div className="dashboard-empty">

              <h4>
                Nenhum produto encontrado
              </h4>

              <p>
                Ainda não existem produtos nesse filtro.
              </p>

            </div>

          ) : (

            <div className="dashboard-product-list">

              {produtosExibidos.map(
                (produto) => (

                  <div
                    className="dashboard-product-item"
                    key={produto.id}
                  >

                    <div
                      className={`dashboard-product-icon ${
                        produto.status ===
                        "Comprado"
                          ? "dashboard-product-icon-bought"
                          : "dashboard-product-icon-pending"
                      }`}
                    >
                      {produto.status ===
                      "Comprado" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaShoppingCart />
                      )}
                    </div>

                    <div className="dashboard-product-info">

                      <strong>
                        {produto.nome}

                        {Number(
                          produto.quantidade
                        ) > 1
                          ? ` (${produto.quantidade})`
                          : ""}
                      </strong>

                      <span>
                        {produto.categoria}
                      </span>

                    </div>

                    <div className="dashboard-product-value">

                      {produto.categoria ===
                      "Presente" ? (
                        <span className="dashboard-present">
                          🎁 Presente
                        </span>
                      ) : produto.status ===
                        "Comprado" &&
                        produto.valor ? (
                        formatarMoeda(
                          Number(
                            produto.valor
                          )
                        )
                      ) : (
                        "A definir"
                      )}

                    </div>

                    <div
                      className={`dashboard-product-status ${
                        produto.status ===
                        "Comprado"
                          ? "dashboard-status-bought"
                          : "dashboard-status-pending"
                      }`}
                    >
                      {produto.status ===
                      "Comprado"
                        ? "Comprado"
                        : "Pendente"}
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      )}

      {/* =====================================================
          AÇÃO PRINCIPAL
      ===================================================== */}

      <section className="dashboard-next-action">

        <div className="dashboard-next-action-icon">
          {proximaAcao.icone}
        </div>

        <div className="dashboard-next-action-content">

          <span className="dashboard-overline">
            PRÓXIMO PASSO
          </span>

          <h3>
            {proximaAcao.titulo}
          </h3>

          <p>
            {proximaAcao.descricao}
          </p>

        </div>

        <button
          type="button"
          className="dashboard-next-action-button"
          onClick={
            executarProximaAcao
          }
        >
          {proximaAcao.botao}
          <FaArrowRight />
        </button>

      </section>

      {/* =====================================================
          AÇÕES RÁPIDAS
      ===================================================== */}

      <section className="dashboard-quick-actions">

        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-overline">
              ATALHOS
            </span>

            <h3>
              Ações rápidas
            </h3>

            <p>
              Acesse as funções mais usadas em um clique.
            </p>
          </div>
        </div>

        <div className="dashboard-quick-actions-grid">

          <button
            type="button"
            className="dashboard-quick-action"
            onClick={() =>
              onNavigate("moveis")
            }
          >
            <span>
              <FaPlus />
            </span>

            <div>
              <strong>
                Adicionar produto
              </strong>

              <small>
                Cadastre um novo item
              </small>
            </div>

            <FaArrowRight />
          </button>

          <button
            type="button"
            className="dashboard-quick-action"
            onClick={() =>
              onNavigate(
                "compras"
              )
            }
          >
            <span>
              <FaShoppingCart />
            </span>

            <div>
              <strong>
                Ver compras
              </strong>

              <small>
                Confira pendências
              </small>
            </div>

            <FaArrowRight />
          </button>

          <button
            type="button"
            className="dashboard-quick-action"
            onClick={() =>
              onNavigate(
                "gastos"
              )
            }
          >
            <span>
              <FaWallet />
            </span>

            <div>
              <strong>
                Ver gastos
              </strong>

              <small>
                Acompanhe seu orçamento
              </small>
            </div>

            <FaArrowRight />
          </button>

          <button
            type="button"
            className="dashboard-quick-action"
            onClick={() =>
              onNavigate(
                "configuracoes"
              )
            }
          >
            <span>
              ⚙️
            </span>

            <div>
              <strong>
                Configurações
              </strong>

              <small>
                Personalize o LarFlow
              </small>
            </div>

            <FaArrowRight />
          </button>

        </div>

      </section>

      {/* =====================================================
          RESUMO DE UNIDADES
      ===================================================== */}

      <div className="dashboard-unidades">

        <div className="dashboard-unidades-item">
          <span>
            Total de unidades
          </span>

          <strong>
            {totalUnidades}
          </strong>
        </div>

        <div className="dashboard-unidades-item">
          <span>
            Compradas
          </span>

          <strong>
            {unidadesCompradas}
          </strong>
        </div>

        <div className="dashboard-unidades-item">
          <span>
            Pendentes
          </span>

          <strong>
            {unidadesPendentes}
          </strong>
        </div>

      </div>

      {/* =====================================================
          PROGRESSO
      ===================================================== */}

      <div className="dashboard-progress-card">

        <div className="dashboard-progress-heading">

          <div>
            <span className="dashboard-overline">
              PROGRESSO
            </span>

            <h3>
              Preparação do seu lar
            </h3>
          </div>

          <strong>
            {progresso}%
          </strong>

        </div>

        <ProgressBar
          progresso={progresso}
        />

        <p>
          {unidadesCompradas} de{" "}
          {totalUnidades} unidades já foram concluídas.
        </p>

      </div>

      {/* =====================================================
          ORÇAMENTO RESUMIDO
      ===================================================== */}

      {orcamento > 0 && (
        <section className="dashboard-budget-mini">

          <div>
            <span className="dashboard-overline">
              ORÇAMENTO
            </span>

            <h3>
              Controle financeiro
            </h3>

            <p>
              {orcamentoUltrapassado
                ? `Você ultrapassou seu orçamento em ${formatarMoeda(
                    valorTotalGasto -
                      orcamento
                  )}.`
                : `Você utilizou ${percentualOrcamento}% do orçamento.`}
            </p>
          </div>

          <div className="dashboard-budget-values">

            <strong
              className={
                orcamentoUltrapassado
                  ? "dashboard-budget-danger"
                  : ""
              }
            >
              {formatarMoeda(
                valorTotalGasto
              )}
            </strong>

            <span>
              de {formatarMoeda(
                orcamento
              )}
            </span>

          </div>

          <div className="dashboard-budget-bar">
            <span
              className={
                orcamentoUltrapassado
                  ? "danger"
                  : percentualOrcamento >= 80
                  ? "attention"
                  : ""
              }
              style={{
                width: `${Math.min(
                  percentualOrcamento,
                  100
                )}%`,
              }}
            />
          </div>

        </section>
      )}

      {/* =====================================================
          AMBIENTES
      ===================================================== */}

      <section className="dashboard-ambientes">

        <div className="dashboard-section-heading">

          <div>
            <span className="dashboard-overline">
              ORGANIZAÇÃO
            </span>

            <h3>
              Progresso por ambiente
            </h3>

            <p>
              Comece pelos ambientes que já têm itens cadastrados.
            </p>
          </div>

        </div>

        <div className="dashboard-ambientes-grid">

          {dadosAmbientes.map(
            (ambiente) => (
              <button
                type="button"
                key={ambiente.valor}
                className={`dashboard-ambiente-card ${
                  ambiente.unidades === 0
                    ? "vazio"
                    : ""
                } ${
                  ambienteSelecionado ===
                  ambiente.valor
                    ? "selecionado"
                    : ""
                }`}
                onClick={() =>
                  selecionarAmbiente(
                    ambiente.valor
                  )
                }
              >

                <div className="dashboard-ambiente-top">

                  <span className="dashboard-ambiente-icon">
                    {ambiente.icone}
                  </span>

                  <FaArrowRight className="dashboard-ambiente-arrow" />

                </div>

                <h4>
                  {ambiente.nome}
                </h4>

                <div className="dashboard-ambiente-meta">

                  <span>
                    {ambiente.unidades}{" "}
                    {ambiente.unidades === 1
                      ? "unidade"
                      : "unidades"}
                  </span>

                  <span>
                    {ambiente.unidadesCompradas}{" "}
                    compradas
                  </span>

                </div>

                <div className="dashboard-ambiente-progress">

                  <div className="dashboard-ambiente-bar">
                    <span
                      style={{
                        width: `${ambiente.progresso}%`,
                      }}
                    />
                  </div>

                  <strong>
                    {ambiente.progresso}%
                  </strong>

                </div>

              </button>
            )
          )}

        </div>

        {ambienteSelecionado && (
          <div className="dashboard-ambiente-action">

            <span>
              Visualizando{" "}
              {ambienteSelecionado}
            </span>

            <button
              type="button"
              className="dashboard-clear-filter"
              onClick={() =>
                abrirAmbienteNoMoveis(
                  ambienteSelecionado
                )
              }
            >
              Abrir em Móveis
              <FaArrowRight />
            </button>

          </div>
        )}

      </section>

      {/* =====================================================
          PRESENTES
      ===================================================== */}

      <div className="dashboard-presentes-card">

        <div className="dashboard-presentes-icon">
          <FaGift />
        </div>

        <div>

          <h3>
            Presentes recebidos
          </h3>

          <p>
            Produtos marcados como presente
            não entram nos seus gastos.
          </p>

        </div>

        <strong>
          {unidadesPresentes}
        </strong>

      </div>



    </div>
  );
}

export default Dashboard;