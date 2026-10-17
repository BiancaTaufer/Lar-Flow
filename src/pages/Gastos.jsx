import { useEffect, useMemo, useState } from "react";

import SummaryCard from "../components/SummaryCard";

import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaGift,
  FaChartPie,
  FaWallet,
} from "react-icons/fa";

function Gastos() {
  const [produtos, setProdutos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  // =========================================================
  // ORÇAMENTO
  // =========================================================

  const [orcamento, setOrcamento] = useState(() => {
    const valorSalvo = localStorage.getItem("orcamentoCasa");
    return valorSalvo ? Number(valorSalvo) : 0;
  });

  const [mostrarOrcamentoForm, setMostrarOrcamentoForm] = useState(false);
  const [novoOrcamento, setNovoOrcamento] = useState("");

  // =========================================================
  // CARREGAR PRODUTOS
  // =========================================================

  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if (!produtosSalvos) {
      setProdutos([]);
      return;
    }

    try {
      const produtosConvertidos = JSON.parse(produtosSalvos);

      setProdutos(
        produtosConvertidos.map((produto) => ({
          ...produto,
          quantidade: Number(produto.quantidade) || 1,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProdutos([]);
    }
  }, []);

  // =========================================================
  // PRODUTOS COMPRADOS
  // =========================================================

  const produtosComprados = produtos.filter(
    (produto) => produto.status === "Comprado"
  );

  // =========================================================
  // PRESENTES
  // =========================================================

  const presentes = produtosComprados.filter(
    (produto) => produto.categoria === "Presente"
  );

  // =========================================================
  // COMPRAS PAGAS
  // =========================================================

  const comprasPagas = produtosComprados.filter(
    (produto) =>
      produto.categoria !== "Presente" &&
      Number(produto.valor || 0) > 0
  );

  // =========================================================
  // TOTAL GASTO
  // =========================================================

  const totalGasto = comprasPagas.reduce(
    (total, produto) => total + Number(produto.valor || 0),
    0
  );

  // =========================================================
  // ORÇAMENTO RESTANTE
  // =========================================================

  const valorRestante = Math.max(orcamento - totalGasto, 0);

  const percentualOrcamento =
    orcamento > 0
      ? Math.round((totalGasto / orcamento) * 100)
      : 0;

  const percentualBarraOrcamento = Math.min(percentualOrcamento, 100);

  const orcamentoUltrapassado =
    orcamento > 0 && totalGasto > orcamento;

  // =========================================================
  // TOTAL DE UNIDADES COMPRADAS
  // =========================================================

  const unidadesCompradas = produtosComprados.reduce(
    (total, produto) =>
      total + (Number(produto.quantidade) || 1),
    0
  );

  // =========================================================
  // VALOR FORMATADO
  // =========================================================

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // =========================================================
  // SALVAR ORÇAMENTO
  // =========================================================

  function salvarOrcamento(event) {
    event.preventDefault();

    const valor = Number(novoOrcamento);

    if (!valor || valor <= 0) {
      alert("Informe um orçamento válido.");
      return;
    }

    setOrcamento(valor);

    localStorage.setItem(
      "orcamentoCasa",
      String(valor)
    );

    window.dispatchEvent(
      new Event("larflow-data-updated")
    );

    setNovoOrcamento("");
    setMostrarOrcamentoForm(false);
  }

  // =========================================================
  // CATEGORIAS DISPONÍVEIS
  // =========================================================

  const categorias = useMemo(() => {
    const lista = produtosComprados
      .map((produto) => produto.categoria)
      .filter(Boolean);

    return ["Todos", ...new Set(lista)];
  }, [produtosComprados]);

  // =========================================================
  // PRODUTOS FILTRADOS
  // =========================================================

  const produtosFiltrados =
    filtroCategoria === "Todos"
      ? comprasPagas
      : comprasPagas.filter(
          (produto) =>
            produto.categoria === filtroCategoria
        );

  // =========================================================
  // TOTAL POR AMBIENTE
  // =========================================================

  const gastosPorCategoria = useMemo(() => {
    const resultado = {};

    comprasPagas.forEach((produto) => {
      const categoria = produto.categoria || "Outros";

      if (!resultado[categoria]) {
        resultado[categoria] = 0;
      }

      resultado[categoria] += Number(produto.valor || 0);
    });

    return Object.entries(resultado).sort(
      (a, b) => b[1] - a[1]
    );
  }, [comprasPagas]);

  return (
    <div className="gastos-page">

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

      <div className="page-header">
        <div>
          <span className="dashboard-overline">
            FINANCEIRO
          </span>

          <h1>💰 Gastos</h1>

          <p>
            Acompanhe quanto você já investiu no seu lar.
          </p>
        </div>

        <button
          type="button"
          className="add-button"
          onClick={() => setMostrarOrcamentoForm(!mostrarOrcamentoForm)}
        >
          <FaWallet />
          {orcamento > 0 ? "Alterar orçamento" : "Definir orçamento"}
        </button>
      </div>

      {/* =====================================================
          FORMULÁRIO DE ORÇAMENTO
      ===================================================== */}

      {mostrarOrcamentoForm && (
        <form
          className="orcamento-form"
          onSubmit={salvarOrcamento}
        >
          <div>
            <span className="dashboard-overline">
              PLANEJAMENTO
            </span>

            <h2>
              {orcamento > 0
                ? "Alterar orçamento da casa"
                : "Definir orçamento da casa"}
            </h2>

            <p>
              Informe quanto você pretende investir no seu lar.
            </p>
          </div>

          <div className="form-group orcamento-form-group">
            <label htmlFor="orcamentoCasa">
              Orçamento total
            </label>

            <div className="orcamento-input">
              <span>R$</span>

              <input
                id="orcamentoCasa"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 25000"
                value={novoOrcamento}
                onChange={(e) =>
                  setNovoOrcamento(e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-actions-inline">
            <button
              type="submit"
              className="save-button"
            >
              Salvar orçamento
            </button>

            <button
              type="button"
              className="compra-modal-cancelar"
              onClick={() => {
                setNovoOrcamento("");
                setMostrarOrcamentoForm(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* =====================================================
          RESUMO
      ===================================================== */}

      <div className="summary-grid gastos-summary-grid">

        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Total Gasto"
          value={formatarMoeda(totalGasto)}
        />

        <SummaryCard
          icon={<FaShoppingBag />}
          title="Itens Comprados"
          value={unidadesCompradas}
        />

        <SummaryCard
          icon={<FaGift />}
          title="Presentes"
          value={presentes.reduce(
            (total, produto) =>
              total + (Number(produto.quantidade) || 1),
            0
          )}
        />

        <SummaryCard
          icon={<FaChartPie />}
          title="Compras Pagas"
          value={comprasPagas.length}
        />

      </div>

      {/* =====================================================
          ORÇAMENTO
      ===================================================== */}

      <section className="gastos-section orcamento-section">

        <div className="orcamento-header">
          <div>
            <span className="dashboard-overline">
              ORÇAMENTO
            </span>

            <h2>
              Planejamento da casa
            </h2>

            <p>
              {orcamento > 0
                ? "Acompanhe quanto do seu orçamento já foi utilizado."
                : "Defina um orçamento para acompanhar sua evolução."}
            </p>
          </div>

          {orcamento > 0 && (
            <div className="orcamento-values">
              <span>Orçamento</span>
              <strong>{formatarMoeda(orcamento)}</strong>
            </div>
          )}
        </div>

        {orcamento === 0 ? (
          <div className="orcamento-vazio">
            <FaWallet />

            <div>
              <h3>
                Nenhum orçamento definido
              </h3>

              <p>
                Defina um limite para saber quanto você ainda pode investir.
              </p>
            </div>

            <button
              type="button"
              className="save-button"
              onClick={() => setMostrarOrcamentoForm(true)}
            >
              Definir agora
            </button>
          </div>
        ) : (
          <>
            <div className="orcamento-resumo">
              <div>
                <span>Gasto até agora</span>
                <strong>{formatarMoeda(totalGasto)}</strong>
              </div>

              <div>
                <span>
                  {orcamentoUltrapassado
                    ? "Acima do orçamento"
                    : "Restante"}
                </span>

                <strong
                  className={
                    orcamentoUltrapassado
                      ? "orcamento-excedido"
                      : "orcamento-restante"
                  }
                >
                  {orcamentoUltrapassado
                    ? formatarMoeda(totalGasto - orcamento)
                    : formatarMoeda(valorRestante)}
                </strong>
              </div>

              <div>
                <span>Utilizado</span>
                <strong>{percentualOrcamento}%</strong>
              </div>
            </div>

            <div className="orcamento-barra-bg">
              <div
                className={`orcamento-barra-fill ${
                  orcamentoUltrapassado
                    ? "excedido"
                    : percentualOrcamento >= 80
                    ? "atencao"
                    : ""
                }`}
                style={{
                  width: `${percentualBarraOrcamento}%`,
                }}
              />
            </div>

            <div className="orcamento-barra-legenda">
              <span>
                {formatarMoeda(totalGasto)}
              </span>

              <span>
                {formatarMoeda(orcamento)}
              </span>
            </div>

            {orcamentoUltrapassado ? (
              <div className="orcamento-alerta excedido">
                <strong>
                  Atenção: orçamento ultrapassado.
                </strong>

                <span>
                  Você está {formatarMoeda(totalGasto - orcamento)}
                  {" "}acima do limite definido.
                </span>
              </div>
            ) : percentualOrcamento >= 80 ? (
              <div className="orcamento-alerta atencao">
                <strong>
                  Seu orçamento está próximo do limite.
                </strong>

                <span>
                  Restam {formatarMoeda(valorRestante)}.
                </span>
              </div>
            ) : (
              <div className="orcamento-alerta normal">
                <strong>
                  Orçamento sob controle.
                </strong>

                <span>
                  Você ainda tem {formatarMoeda(valorRestante)} disponíveis.
                </span>
              </div>
            )}
          </>
        )}
      </section>

      {/* =====================================================
          GASTOS POR AMBIENTE
      ===================================================== */}

      <section className="gastos-section">

        <div className="gastos-section-header">
          <div>
            <span className="dashboard-overline">
              DISTRIBUIÇÃO
            </span>

            <h2>
              Gastos por ambiente
            </h2>

            <p>
              Veja onde seu dinheiro está sendo investido.
            </p>
          </div>
        </div>

        {gastosPorCategoria.length === 0 ? (
          <div className="gastos-empty">
            <FaMoneyBillWave />

            <h3>
              Ainda não há gastos registrados
            </h3>

            <p>
              Registre suas compras na página de Compras para começar.
            </p>
          </div>
        ) : (
          <div className="gastos-categorias">
            {gastosPorCategoria.map(
              ([categoria, valor]) => {
                const porcentagem =
                  totalGasto > 0
                    ? Math.round(
                        (valor / totalGasto) * 100
                      )
                    : 0;

                return (
                  <button
                    type="button"
                    key={categoria}
                    className={`gasto-categoria-card ${
                      filtroCategoria === categoria
                        ? "ativo"
                        : ""
                    }`}
                    onClick={() =>
                      setFiltroCategoria(
                        filtroCategoria === categoria
                          ? "Todos"
                          : categoria
                      )
                    }
                  >
                    <div className="gasto-categoria-topo">
                      <div>
                        <h3>{categoria}</h3>

                        <span>
                          {porcentagem}% do total
                        </span>
                      </div>

                      <strong>
                        {formatarMoeda(valor)}
                      </strong>
                    </div>

                    <div className="gasto-barra">
                      <span
                        style={{
                          width: `${porcentagem}%`,
                        }}
                      />
                    </div>
                  </button>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          LISTA DE GASTOS
      ===================================================== */}

      <section className="gastos-section">

        <div className="gastos-section-header">

          <div>
            <span className="dashboard-overline">
              DETALHAMENTO
            </span>

            <h2>
              Compras registradas
            </h2>

            <p>
              {filtroCategoria === "Todos"
                ? "Todos os produtos pagos."
                : `Exibindo compras de ${filtroCategoria}.`}
            </p>
          </div>

          {filtroCategoria !== "Todos" && (
            <button
              type="button"
              className="dashboard-clear-filter"
              onClick={() =>
                setFiltroCategoria("Todos")
              }
            >
              Limpar filtro
            </button>
          )}

        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="gastos-empty">
            <h3>
              Nenhuma compra encontrada
            </h3>

            <p>
              Ainda não existem compras pagas nessa categoria.
            </p>
          </div>
        ) : (
          <div className="gastos-tabela">

            <div className="gastos-tabela-header">
              <span>Produto</span>
              <span>Categoria</span>
              <span>Quantidade</span>
              <span>Valor</span>
              <span>Status</span>
            </div>

            {produtosFiltrados.map(
              (produto) => (
                <div
                  className="gastos-tabela-row"
                  key={produto.id}
                >
                  <div className="gastos-produto">
                    <strong>
                      {produto.nome}
                    </strong>

                    {Number(produto.quantidade) > 1 && (
                      <span>
                        {produto.quantidade} unidades
                      </span>
                    )}
                  </div>

                  <span>
                    {produto.categoria}
                  </span>

                  <span>
                    {produto.quantidade || 1}
                  </span>

                  <strong className="gasto-valor">
                    {formatarMoeda(
                      Number(produto.valor || 0)
                    )}
                  </strong>

                  <span className="status-bought">
                    ✓ Pago
                  </span>
                </div>
              )
            )}

          </div>
        )}

      </section>

    </div>
  );
}

export default Gastos;