import { useEffect, useState } from "react";

import {
  FaShoppingCart,
  FaCheckCircle,
  FaRegCircle,
  FaTimes,
  FaSearch,
  FaGift,
} from "react-icons/fa";

function Compras() {
  const [produtos, setProdutos] = useState([]);

  // =========================================================
  // PESQUISA
  // =========================================================

  const [pesquisa, setPesquisa] = useState("");

  // =========================================================
  // FILTRO POR STATUS
  // =========================================================

  const [filtroStatus, setFiltroStatus] = useState("Todos");

  // =========================================================
  // PRODUTO SELECIONADO PARA REGISTRAR COMPRA
  // =========================================================

  const [produtoSelecionado, setProdutoSelecionado] =
    useState(null);

  // =========================================================
  // VALOR INFORMADO NA COMPRA
  // =========================================================

  const [valorCompra, setValorCompra] = useState("");

  // =========================================================
  // DEFINE SE A COMPRA FOI UM PRESENTE
  // =========================================================

  const [presenteCompra, setPresenteCompra] = useState(false);

  // =========================================================
  // CARREGAR PRODUTOS
  // =========================================================

  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos) {
      const produtosConvertidos = JSON.parse(produtosSalvos);

      // Garante quantidade para produtos antigos
      setProdutos(
        produtosConvertidos.map((produto) => ({
          ...produto,
          quantidade: Number(produto.quantidade) || 1,
        }))
      );
    }
  }, []);

  // =========================================================
  // INICIAR COMPRA
  // =========================================================

  function iniciarCompra(produto) {
    // Se já estiver comprado, volta para pendente
    if (produto.status === "Comprado") {
      const produtosAtualizados = produtos.map((item) =>
        item.id === produto.id
          ? {
              ...item,
              status: "Pendente",
            }
          : item
      );

      setProdutos(produtosAtualizados);

      localStorage.setItem(
        "produtos",
        JSON.stringify(produtosAtualizados)
      );

      window.dispatchEvent(
        new Event("larflow-data-updated")
      );

      return;
    }

    // Abre modal
    setProdutoSelecionado(produto);

    // Limpa os dados do modal
    setValorCompra("");

    // Se o produto já era presente, mantém marcado
    setPresenteCompra(produto.categoria === "Presente");
  }

  // =========================================================
  // CONFIRMAR COMPRA
  // =========================================================

  function confirmarCompra() {
    if (!produtoSelecionado) {
      return;
    }

    // Se não for presente, precisa informar o valor
    if (
      !presenteCompra &&
      (!valorCompra || Number(valorCompra) <= 0)
    ) {
      alert("Informe o valor pago pelo produto.");
      return;
    }

    const produtosAtualizados = produtos.map((produto) =>
      produto.id === produtoSelecionado.id
        ? {
            ...produto,

            status: "Comprado",

            // Se for presente, não existe valor
            valor: presenteCompra
              ? ""
              : valorCompra,

            // Se for presente, muda a categoria
            categoria: presenteCompra
              ? "Presente"
              : produto.categoria,
          }
        : produto
    );

    setProdutos(produtosAtualizados);

    localStorage.setItem(
      "produtos",
      JSON.stringify(produtosAtualizados)
    );

    window.dispatchEvent(
      new Event("larflow-data-updated")
    );

    // Fecha o modal
    setProdutoSelecionado(null);

    setValorCompra("");

    setPresenteCompra(false);
  }

  // =========================================================
  // CANCELAR
  // =========================================================

  function cancelarCompra() {
    setProdutoSelecionado(null);

    setValorCompra("");

    setPresenteCompra(false);
  }

  // =========================================================
  // RESUMO
  // =========================================================

  const produtosPendentes = produtos.filter(
    (produto) => produto.status !== "Comprado"
  );

  const produtosComprados = produtos.filter(
    (produto) => produto.status === "Comprado"
  );

  // =========================================================
  // PESQUISA + FILTRO DE STATUS
  // =========================================================

  const produtosFiltrados = produtos.filter((produto) => {
    const texto = pesquisa.toLowerCase().trim();

    // Pesquisa por nome ou categoria
    const correspondePesquisa =
      !texto ||
      produto.nome?.toLowerCase().includes(texto) ||
      produto.categoria?.toLowerCase().includes(texto);

    // Filtro por status
    const correspondeStatus =
      filtroStatus === "Todos" ||
      (filtroStatus === "Pendentes" &&
        produto.status !== "Comprado") ||
      (filtroStatus === "Comprados" &&
        produto.status === "Comprado");

    return correspondePesquisa && correspondeStatus;
  });

  return (
    <div className="compras-page">

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

      <div className="page-header">

        <div>
          <h1>🛒 Compras</h1>

          <p>
            Organize o que falta para o seu lar.
          </p>
        </div>

      </div>

      {/* =====================================================
          RESUMO / FILTROS
      ===================================================== */}

      <div className="compras-resumo">

        {/* PENDENTES */}

        <button
          type="button"
          className={`compra-resumo-card ${
            filtroStatus === "Pendentes"
              ? "compra-resumo-card-ativo"
              : ""
          }`}
          onClick={() =>
            setFiltroStatus(
              filtroStatus === "Pendentes"
                ? "Todos"
                : "Pendentes"
            )
          }
        >
          <div className="compra-resumo-icon">
            <FaShoppingCart />
          </div>

          <div>
            <span>Pendentes</span>

            <strong>
              {produtosPendentes.length}
            </strong>
          </div>
        </button>

        {/* COMPRADOS */}

        <button
          type="button"
          className={`compra-resumo-card ${
            filtroStatus === "Comprados"
              ? "compra-resumo-card-ativo"
              : ""
          }`}
          onClick={() =>
            setFiltroStatus(
              filtroStatus === "Comprados"
                ? "Todos"
                : "Comprados"
            )
          }
        >
          <div className="compra-resumo-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Comprados</span>

            <strong>
              {produtosComprados.length}
            </strong>
          </div>
        </button>

      </div>

      {/* =====================================================
          LISTA DE COMPRAS
      ===================================================== */}

      <div className="compras-lista">

        {/* PESQUISA */}

        <div className="compras-pesquisa">

          <FaSearch />

          <input
            type="text"
            placeholder="Pesquisar produto ou categoria..."
            value={pesquisa}
            onChange={(e) =>
              setPesquisa(e.target.value)
            }
          />

          {pesquisa && (
            <button
              type="button"
              className="limpar-pesquisa"
              onClick={() => setPesquisa("")}
              title="Limpar pesquisa"
            >
              <FaTimes />
            </button>
          )}

        </div>

        {/* CABEÇALHO DA LISTA */}

        <div className="compras-lista-header">

          <div>
            <h2>Lista de compras</h2>

            <p>
              {filtroStatus === "Pendentes"
                ? "Exibindo apenas produtos pendentes."
                : filtroStatus === "Comprados"
                ? "Exibindo apenas produtos comprados."
                : "Marque os itens conforme forem comprados."}
            </p>
          </div>

        </div>

        {/* ===================================================
            NENHUM PRODUTO
        =================================================== */}

        {produtos.length === 0 ? (

          <div className="compras-vazia">

            <FaShoppingCart />

            <h3>Nenhum produto cadastrado</h3>

            <p>
              Adicione produtos na página de Móveis
              para começar sua lista de compras.
            </p>

          </div>

        ) : produtosFiltrados.length === 0 ? (

          <div className="compras-vazia">

            <FaSearch />

            <h3>Nenhum produto encontrado</h3>

            <p>
              Não encontramos produtos para os
              filtros selecionados.
            </p>

            {(pesquisa || filtroStatus !== "Todos") && (
              <button
                type="button"
                className="save-button"
                onClick={() => {
                  setPesquisa("");
                  setFiltroStatus("Todos");
                }}
              >
                Limpar filtros
              </button>
            )}

          </div>

        ) : (

          <div className="compras-itens">

            {produtosFiltrados.map((produto) => (

              <div
                className={`compra-item ${
                  produto.status === "Comprado"
                    ? "compra-item-comprado"
                    : ""
                }`}
                key={produto.id}
              >

                {/* =================================================
                    CHECK
                ================================================= */}

                <button
                  className="compra-check"
                  onClick={() =>
                    iniciarCompra(produto)
                  }
                  type="button"
                  title={
                    produto.status === "Comprado"
                      ? "Marcar como pendente"
                      : "Marcar como comprado"
                  }
                >
                  {produto.status === "Comprado" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaRegCircle />
                  )}
                </button>

                {/* =================================================
                    INFORMAÇÕES
                ================================================= */}

                <div className="compra-info">

                  <strong>
                    {produto.nome}

                    {Number(produto.quantidade) > 1
                      ? ` (${produto.quantidade})`
                      : ""}
                  </strong>

                  <span>
                    {produto.categoria}
                  </span>

                </div>

                {/* =================================================
                    VALOR
                ================================================= */}

                <div className="compra-valor">

                  {produto.categoria === "Presente" ? (

                    <span className="valor-presente">
                      🎁 Presente
                    </span>

                  ) : produto.status === "Comprado" &&
                    produto.valor ? (

                    `R$ ${Number(
                      produto.valor
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`

                  ) : (

                    "A definir"

                  )}

                </div>

                {/* =================================================
                    STATUS
                ================================================= */}

                <div
                  className={
                    produto.status === "Comprado"
                      ? "compra-status comprado"
                      : "compra-status pendente"
                  }
                >
                  {produto.status === "Comprado"
                    ? "Comprado"
                    : "Pendente"}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* =====================================================
          MODAL - REGISTRAR COMPRA
      ===================================================== */}

      {produtoSelecionado && (

        <div
          className="compra-modal-overlay"
          onClick={cancelarCompra}
        >

          <div
            className="compra-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =================================================
                CABEÇALHO
            ================================================= */}

            <div className="compra-modal-header">

              <div>

                <span className="compra-modal-label">
                  REGISTRAR COMPRA
                </span>

                <h2>
                  {produtoSelecionado.nome}
                </h2>

              </div>

              <button
                className="compra-modal-close"
                onClick={cancelarCompra}
                type="button"
                aria-label="Fechar"
              >
                <FaTimes />
              </button>

            </div>

            {/* CATEGORIA */}

            <p className="compra-modal-categoria">
              {produtoSelecionado.categoria}
            </p>

            {/* =================================================
                VALOR
            ================================================= */}

            <div className="compra-modal-form">

              <label htmlFor="valorCompra">
                Valor pago
              </label>

              <div
                className={`valor-input ${
                  presenteCompra
                    ? "valor-desabilitado"
                    : ""
                }`}
              >

                <span>R$</span>

                <input
                  id="valorCompra"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={
                    presenteCompra
                      ? "Presente"
                      : "0,00"
                  }
                  value={
                    presenteCompra
                      ? ""
                      : valorCompra
                  }
                  onChange={(e) =>
                    setValorCompra(
                      e.target.value
                    )
                  }
                  disabled={presenteCompra}
                  autoFocus
                />

              </div>

            </div>

            {/* =================================================
                OPÇÃO PRESENTE
            ================================================= */}

            <label
              className={`opcao-presente ${
                presenteCompra
                  ? "opcao-presente-ativa"
                  : ""
              }`}
            >

              <input
                type="checkbox"
                checked={presenteCompra}
                onChange={(e) => {
                  const marcado =
                    e.target.checked;

                  setPresenteCompra(marcado);

                  if (marcado) {
                    setValorCompra("");
                  }
                }}
              />

              <span className="presente-icone">
                <FaGift />
              </span>

              <span className="presente-texto">
                <strong>Foi um presente</strong>
              </span>

            </label>

            {/* =================================================
                BOTÕES
            ================================================= */}

            <div className="compra-modal-actions">

              <button
                type="button"
                className="compra-modal-cancelar"
                onClick={cancelarCompra}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="compra-modal-confirmar"
                onClick={confirmarCompra}
              >
                <FaCheckCircle />
                Confirmar compra
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Compras;