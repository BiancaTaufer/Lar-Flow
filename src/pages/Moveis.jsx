import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTimes,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";

function Moveis({ categoriaInicial = "Todos" }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(categoriaInicial);

  useEffect(() => {
    setCategoriaSelecionada(categoriaInicial);
  }, [categoriaInicial]);

  const [produto, setProduto] = useState({
    nome: "",
    categoria: "",
    quantidade: 1,
    valor: "",
    status: "Pendente",
  });

  const [produtoEditando, setProdutoEditando] = useState(null);

  const listaInicial = [
    { id: "sala-estar-1", nome: "Sofá", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-estar-2", nome: "Rack", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-estar-3", nome: "Painel de TV", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-estar-4", nome: "Mesa lateral", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-estar-5", nome: "Tapete", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-estar-6", nome: "Cortina", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-estar-7", nome: "Luminária", categoria: "Sala de Estar", quantidade: 1, valor: "", status: "Pendente" },

    { id: "sala-jantar-1", nome: "Mesa de jantar", categoria: "Sala de Jantar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-jantar-2", nome: "Cadeiras", categoria: "Sala de Jantar", quantidade: 6, valor: "", status: "Pendente" },
    { id: "sala-jantar-3", nome: "Aparador", categoria: "Sala de Jantar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-jantar-4", nome: "Buffet", categoria: "Sala de Jantar", quantidade: 1, valor: "", status: "Pendente" },
    { id: "sala-jantar-5", nome: "Luminária pendente", categoria: "Sala de Jantar", quantidade: 1, valor: "", status: "Pendente" },

    { id: "cozinha-1", nome: "Geladeira", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-2", nome: "Fogão", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-3", nome: "Micro-ondas", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-4", nome: "Air fryer", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-5", nome: "Cafeteira", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-6", nome: "Jogo de panelas", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-7", nome: "Louças", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },
    { id: "cozinha-8", nome: "Talheres", categoria: "Cozinha", quantidade: 1, valor: "", status: "Pendente" },

    { id: "quarto-1", nome: "Cama", categoria: "Quarto", quantidade: 1, valor: "", status: "Pendente" },
    { id: "quarto-2", nome: "Colchão", categoria: "Quarto", quantidade: 1, valor: "", status: "Pendente" },
    { id: "quarto-3", nome: "Guarda-roupa", categoria: "Quarto", quantidade: 1, valor: "", status: "Pendente" },
    { id: "quarto-4", nome: "Criado-mudo", categoria: "Quarto", quantidade: 2, valor: "", status: "Pendente" },
    { id: "quarto-5", nome: "Cômoda", categoria: "Quarto", quantidade: 1, valor: "", status: "Pendente" },
    { id: "quarto-6", nome: "Cortina", categoria: "Quarto", quantidade: 1, valor: "", status: "Pendente" },
    { id: "quarto-7", nome: "Espelho", categoria: "Quarto", quantidade: 1, valor: "", status: "Pendente" },

    { id: "banheiro-1", nome: "Armário", categoria: "Banheiro", quantidade: 1, valor: "", status: "Pendente" },
    { id: "banheiro-2", nome: "Espelho", categoria: "Banheiro", quantidade: 1, valor: "", status: "Pendente" },
    { id: "banheiro-3", nome: "Toalhas", categoria: "Banheiro", quantidade: 4, valor: "", status: "Pendente" },
    { id: "banheiro-4", nome: "Tapete", categoria: "Banheiro", quantidade: 2, valor: "", status: "Pendente" },
    { id: "banheiro-5", nome: "Porta-toalhas", categoria: "Banheiro", quantidade: 1, valor: "", status: "Pendente" },
    { id: "banheiro-6", nome: "Kit de banheiro", categoria: "Banheiro", quantidade: 1, valor: "", status: "Pendente" },

    { id: "lavanderia-1", nome: "Máquina de lavar", categoria: "Lavanderia", quantidade: 1, valor: "", status: "Pendente" },
    { id: "lavanderia-2", nome: "Secadora", categoria: "Lavanderia", quantidade: 1, valor: "", status: "Pendente" },
    { id: "lavanderia-3", nome: "Varal", categoria: "Lavanderia", quantidade: 1, valor: "", status: "Pendente" },
    { id: "lavanderia-4", nome: "Cesto de roupa", categoria: "Lavanderia", quantidade: 2, valor: "", status: "Pendente" },
    { id: "lavanderia-5", nome: "Tábua de passar", categoria: "Lavanderia", quantidade: 1, valor: "", status: "Pendente" },
    { id: "lavanderia-6", nome: "Armário", categoria: "Lavanderia", quantidade: 1, valor: "", status: "Pendente" },

    { id: "escritorio-1", nome: "Mesa", categoria: "Escritório", quantidade: 1, valor: "", status: "Pendente" },
    { id: "escritorio-2", nome: "Cadeira", categoria: "Escritório", quantidade: 1, valor: "", status: "Pendente" },
    { id: "escritorio-3", nome: "Estante", categoria: "Escritório", quantidade: 1, valor: "", status: "Pendente" },
    { id: "escritorio-4", nome: "Luminária", categoria: "Escritório", quantidade: 1, valor: "", status: "Pendente" },
    { id: "escritorio-5", nome: "Gaveteiro", categoria: "Escritório", quantidade: 1, valor: "", status: "Pendente" },
  ];

  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos) {
      const produtosConvertidos = JSON.parse(produtosSalvos);

      return produtosConvertidos.map((item) => ({
        ...item,
        quantidade: Number(item.quantidade) || 1,
      }));
    }

    return listaInicial;
  });

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));

    window.dispatchEvent(
      new Event("larflow-data-updated")
    );
  }, [produtos]);

  function salvarProduto(e) {
    e.preventDefault();

    if (!produto.nome || !produto.categoria) {
      alert("Preencha o nome e a categoria.");
      return;
    }

    if (!produto.quantidade || Number(produto.quantidade) < 1) {
      alert("Informe uma quantidade válida.");
      return;
    }

    if (
      produto.categoria !== "Presente" &&
      produto.status === "Comprado" &&
      !produto.valor
    ) {
      alert("Informe o valor do produto comprado.");
      return;
    }

    const produtoParaSalvar = {
      ...produto,
      quantidade: Number(produto.quantidade),
      valor: produto.categoria === "Presente" ? "" : produto.valor,
    };

    if (produtoEditando) {
      const produtosAtualizados = produtos.map((item) =>
        item.id === produtoEditando
          ? { ...produtoParaSalvar, id: produtoEditando }
          : item
      );

      setProdutos(produtosAtualizados);
    } else {
      setProdutos([
        ...produtos,
        { ...produtoParaSalvar, id: `produto-${Date.now()}` },
      ]);
    }

    limparFormulario();
  }

  function editarProduto(item) {
    setProduto({
      nome: item.nome,
      categoria: item.categoria,
      quantidade: Number(item.quantidade) || 1,
      valor: item.categoria === "Presente" ? "" : item.valor || "",
      status: item.status,
    });

    setProdutoEditando(item.id);
    setMostrarFormulario(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function excluirProduto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) return;

    setProdutos(produtos.filter((item) => item.id !== id));
  }

  function limparFormulario() {
    setProduto({
      nome: "",
      categoria: "",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    });

    setProdutoEditando(null);
    setMostrarFormulario(false);
  }

  const produtosFiltrados = produtos.filter(
    (item) =>
      categoriaSelecionada === "Todos" ||
      item.categoria === categoriaSelecionada
  );

  const ambientes = [
    { valor: "Sala de Estar", nome: "Sala de Estar", icone: "🛋️" },
    { valor: "Sala de Jantar", nome: "Sala de Jantar", icone: "🍽️" },
    { valor: "Cozinha", nome: "Cozinha", icone: "🍳" },
    { valor: "Quarto", nome: "Quarto", icone: "🛏️" },
    { valor: "Banheiro", nome: "Banheiro", icone: "🛁" },
    { valor: "Lavanderia", nome: "Lavanderia", icone: "🧺" },
    { valor: "Escritório", nome: "Escritório", icone: "💻" },
    { valor: "Presente", nome: "Presentes", icone: "🎁" },
    { valor: "Outros", nome: "Outros", icone: "📦" },
  ];

  const resumoAmbientes = ambientes.map((ambiente) => {
    const itens = produtos.filter(
      (produto) => produto.categoria === ambiente.valor
    );

    const unidades = itens.reduce(
      (total, produto) => total + (Number(produto.quantidade) || 1),
      0
    );

    const unidadesCompradas = itens
      .filter((produto) => produto.status === "Comprado")
      .reduce(
        (total, produto) => total + (Number(produto.quantidade) || 1),
        0
      );

    const progresso =
      unidades > 0 ? Math.round((unidadesCompradas / unidades) * 100) : 0;

    return {
      ...ambiente,
      itens: itens.length,
      unidades,
      unidadesCompradas,
      progresso,
    };
  });

  const totalUnidades = produtos.reduce(
    (total, produto) => total + (Number(produto.quantidade) || 1),
    0
  );

  const totalCompradas = produtos
    .filter((produto) => produto.status === "Comprado")
    .reduce(
      (total, produto) => total + (Number(produto.quantidade) || 1),
      0
    );

  return (
    <div className="moveis-page">
      <div className="page-header">
        <div>
          <h1>🛋️ Móveis</h1>
          <p>Organize tudo o que você precisa para o seu lar.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            if (mostrarFormulario) limparFormulario();
            else setMostrarFormulario(true);
          }}
          type="button"
        >
          {mostrarFormulario ? <FaTimes /> : <FaPlus />}
          {mostrarFormulario ? "Fechar" : "Adicionar Produto"}
        </button>
      </div>

      {mostrarFormulario && (
        <form className="product-form" onSubmit={salvarProduto}>
          <h2>
            {produtoEditando ? "Editar produto" : "Adicionar novo produto"}
          </h2>

          <div className="form-group">
            <label>Nome do produto</label>
            <input
              type="text"
              placeholder="Ex: Guarda-roupa"
              value={produto.nome}
              onChange={(e) =>
                setProduto({ ...produto, nome: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              value={produto.categoria}
              onChange={(e) => {
                const novaCategoria = e.target.value;
                setProduto({
                  ...produto,
                  categoria: novaCategoria,
                  valor: novaCategoria === "Presente" ? "" : produto.valor,
                });
              }}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Sala de Estar">🛋️ Sala de Estar</option>
              <option value="Sala de Jantar">🍽️ Sala de Jantar</option>
              <option value="Cozinha">🍳 Cozinha</option>
              <option value="Quarto">🛏️ Quarto</option>
              <option value="Banheiro">🛁 Banheiro</option>
              <option value="Lavanderia">🧺 Lavanderia</option>
              <option value="Escritório">💻 Escritório</option>
              <option value="Presente">🎁 Presente</option>
              <option value="Outros">📦 Outros</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Ex: 2"
              value={produto.quantidade}
              onChange={(e) =>
                setProduto({ ...produto, quantidade: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={produto.status}
              onChange={(e) => {
                const novoStatus = e.target.value;
                setProduto({
                  ...produto,
                  status: novoStatus,
                  valor:
                    novoStatus === "Pendente" || produto.categoria === "Presente"
                      ? ""
                      : produto.valor,
                });
              }}
            >
              <option value="Pendente">Pendente</option>
              <option value="Comprado">Comprado</option>
            </select>
          </div>

          {produto.status === "Comprado" &&
            produto.categoria !== "Presente" && (
              <div className="form-group">
                <label>Valor pago</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 2500"
                  value={produto.valor}
                  onChange={(e) =>
                    setProduto({ ...produto, valor: e.target.value })
                  }
                />
              </div>
            )}

          <div className="form-actions-inline">
            <button type="submit" className="save-button">
              {produtoEditando ? "Salvar alterações" : "Adicionar produto"}
            </button>

            {produtoEditando && (
              <button
                type="button"
                className="compra-modal-cancelar"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      <section className="ambientes-section">
        <div className="ambientes-header">
          <div>
            <span className="section-kicker">ORGANIZAÇÃO</span>
            <h2>Ambientes do seu lar</h2>
            <p>
              {totalUnidades} unidades no total · {totalCompradas} compradas
            </p>
          </div>

          <button
            type="button"
            className={`ambiente-todos-button ${
              categoriaSelecionada === "Todos" ? "ativo" : ""
            }`}
            onClick={() => {
              setCategoriaSelecionada("Todos");

              setTimeout(() => {
                document
                  .getElementById("tabela-produtos")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }, 50);
            }}
          >
            <FaHome />
            Ver todos
          </button>
        </div>

        <div className="ambientes-grid">
          {resumoAmbientes.map((ambiente) => (
            <button
              key={ambiente.valor}
              type="button"
              className={`ambiente-card ${
                categoriaSelecionada === ambiente.valor ? "ativo" : ""
              }`}
              onClick={() => {
                setCategoriaSelecionada(ambiente.valor);

                setTimeout(() => {
                  document
                    .getElementById("tabela-produtos")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }, 50);
              }}
            >
              <div className="ambiente-card-topo">
                <span className="ambiente-icone">{ambiente.icone}</span>

                <span className="ambiente-chevron">›</span>
              </div>

              <div className="ambiente-card-title">
                {ambiente.nome}
              </div>

              <div className="ambiente-card-meta">
                {ambiente.unidades} {ambiente.unidades === 1 ? "unidade" : "unidades"}
                <span>·</span>
                {ambiente.unidadesCompradas} compradas
              </div>

              <div className="ambiente-progress">
                <div className="ambiente-progress-bg">
                  <div
                    className="ambiente-progress-fill"
                    style={{ width: `${ambiente.progresso}%` }}
                  />
                </div>

                <strong>{ambiente.progresso}%</strong>
              </div>
            </button>
          ))}
        </div>
      </section>


      <div className="products-table" id="tabela-produtos">
        <div className="table-header">
          <span>Produto</span>
          <span>Categoria</span>
          <span>Quantidade</span>
          <span>Valor</span>
          <span>Status</span>
          <span>Ações</span>
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="moveis-empty-state">
            <FaCheckCircle />
            <h3>Nenhum item nessa categoria</h3>
            <p>Adicione um produto ou escolha outro ambiente.</p>
          </div>
        ) : (
          produtosFiltrados.map((item) => (
            <div className="table-row" key={item.id}>
              <span>{item.nome}</span>
              <span>{item.categoria}</span>
              <span>{item.quantidade || 1}</span>
              <span>
                {item.categoria !== "Presente" &&
                item.status === "Comprado" &&
                item.valor
                  ? `R$ ${Number(item.valor).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  : "—"}
              </span>
              <span
                className={
                  item.status === "Comprado"
                    ? "status-bought"
                    : "status-pending"
                }
              >
                {item.status === "Comprado" ? "✓ Comprado" : "Pendente"}
              </span>

              <div className="table-actions">
                <button
                  className="edit-button"
                  onClick={() => editarProduto(item)}
                  type="button"
                  title="Editar produto"
                >
                  <FaEdit />
                </button>

                <button
                  className="delete-button"
                  onClick={() => excluirProduto(item.id)}
                  type="button"
                  title="Excluir produto"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Moveis;