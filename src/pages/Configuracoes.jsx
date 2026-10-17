import { useRef, useState } from "react";

import {
  FaUser,
  FaSave,
  FaDownload,
  FaUpload,
  FaUndo,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

function Configuracoes({ tema, setTema }) {
  // =========================================================
  // PERFIL
  // =========================================================

  const [nomeUsuario, setNomeUsuario] =
    useState(() => {
      return (
        localStorage.getItem(
          "larflowNomeUsuario"
        ) || "Bianca"
      );
    });

  const [nomeLar, setNomeLar] =
    useState(() => {
      return (
        localStorage.getItem(
          "larflowNomeLar"
        ) || "LarFlow"
      );
    });

  const [mensagem, setMensagem] =
    useState("");

  const arquivoInputRef = useRef(null);

  // =========================================================
  // LISTA INICIAL
  // =========================================================

  const listaInicial = [
    // Sala de Estar
    {
      id: "sala-estar-1",
      nome: "Sofá",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-estar-2",
      nome: "Rack",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-estar-3",
      nome: "Painel de TV",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-estar-4",
      nome: "Mesa lateral",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-estar-5",
      nome: "Tapete",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-estar-6",
      nome: "Cortina",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-estar-7",
      nome: "Luminária",
      categoria: "Sala de Estar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },

    // Sala de Jantar
    {
      id: "sala-jantar-1",
      nome: "Mesa de jantar",
      categoria: "Sala de Jantar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-jantar-2",
      nome: "Cadeiras",
      categoria: "Sala de Jantar",
      quantidade: 6,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-jantar-3",
      nome: "Aparador",
      categoria: "Sala de Jantar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-jantar-4",
      nome: "Buffet",
      categoria: "Sala de Jantar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "sala-jantar-5",
      nome: "Luminária pendente",
      categoria: "Sala de Jantar",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },

    // Cozinha
    {
      id: "cozinha-1",
      nome: "Geladeira",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-2",
      nome: "Fogão",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-3",
      nome: "Micro-ondas",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-4",
      nome: "Air fryer",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-5",
      nome: "Cafeteira",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-6",
      nome: "Jogo de panelas",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-7",
      nome: "Louças",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "cozinha-8",
      nome: "Talheres",
      categoria: "Cozinha",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },

    // Quarto
    {
      id: "quarto-1",
      nome: "Cama",
      categoria: "Quarto",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "quarto-2",
      nome: "Colchão",
      categoria: "Quarto",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "quarto-3",
      nome: "Guarda-roupa",
      categoria: "Quarto",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "quarto-4",
      nome: "Criado-mudo",
      categoria: "Quarto",
      quantidade: 2,
      valor: "",
      status: "Pendente",
    },
    {
      id: "quarto-5",
      nome: "Cômoda",
      categoria: "Quarto",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "quarto-6",
      nome: "Cortina",
      categoria: "Quarto",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "quarto-7",
      nome: "Espelho",
      categoria: "Quarto",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },

    // Banheiro
    {
      id: "banheiro-1",
      nome: "Armário",
      categoria: "Banheiro",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "banheiro-2",
      nome: "Espelho",
      categoria: "Banheiro",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "banheiro-3",
      nome: "Toalhas",
      categoria: "Banheiro",
      quantidade: 4,
      valor: "",
      status: "Pendente",
    },
    {
      id: "banheiro-4",
      nome: "Tapete",
      categoria: "Banheiro",
      quantidade: 2,
      valor: "",
      status: "Pendente",
    },
    {
      id: "banheiro-5",
      nome: "Porta-toalhas",
      categoria: "Banheiro",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "banheiro-6",
      nome: "Kit de banheiro",
      categoria: "Banheiro",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },

    // Lavanderia
    {
      id: "lavanderia-1",
      nome: "Máquina de lavar",
      categoria: "Lavanderia",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "lavanderia-2",
      nome: "Secadora",
      categoria: "Lavanderia",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "lavanderia-3",
      nome: "Varal",
      categoria: "Lavanderia",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "lavanderia-4",
      nome: "Cesto de roupa",
      categoria: "Lavanderia",
      quantidade: 2,
      valor: "",
      status: "Pendente",
    },
    {
      id: "lavanderia-5",
      nome: "Tábua de passar",
      categoria: "Lavanderia",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "lavanderia-6",
      nome: "Armário",
      categoria: "Lavanderia",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },

    // Escritório
    {
      id: "escritorio-1",
      nome: "Mesa",
      categoria: "Escritório",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "escritorio-2",
      nome: "Cadeira",
      categoria: "Escritório",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "escritorio-3",
      nome: "Estante",
      categoria: "Escritório",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "escritorio-4",
      nome: "Luminária",
      categoria: "Escritório",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
    {
      id: "escritorio-5",
      nome: "Gaveteiro",
      categoria: "Escritório",
      quantidade: 1,
      valor: "",
      status: "Pendente",
    },
  ];

  // =========================================================
  // MENSAGEM
  // =========================================================

  function mostrarMensagem(texto) {
    setMensagem(texto);

    window.setTimeout(() => {
      setMensagem("");
    }, 3000);
  }

  // =========================================================
  // SALVAR PERFIL
  // =========================================================

  function salvarPerfil(event) {
    event.preventDefault();

    const nome = nomeUsuario.trim();
    const lar = nomeLar.trim();

    if (!nome) {
      mostrarMensagem("Informe o seu nome.");
      return;
    }

    if (!lar) {
      mostrarMensagem("Informe o nome do seu lar.");
      return;
    }

    localStorage.setItem(
      "larflowNomeUsuario",
      nome
    );

    localStorage.setItem(
      "larflowNomeLar",
      lar
    );

    window.dispatchEvent(
      new Event("larflow-data-updated")
    );

    mostrarMensagem(
      "Configurações salvas com sucesso."
    );
  }

  // =========================================================
  // TEMA
  // =========================================================

  function alterarTema(novoTema) {
    setTema(novoTema);

    localStorage.setItem(
      "larflowTema",
      novoTema
    );

    window.dispatchEvent(
      new Event("larflow-data-updated")
    );
  }

  // =========================================================
  // EXPORTAR BACKUP
  // =========================================================

  function exportarBackup() {
    try {
      const produtosSalvos =
        localStorage.getItem("produtos");

      const backup = {
        app: "LarFlow",
        versao: 1,
        exportadoEm:
          new Date().toISOString(),

        nomeUsuario:
          localStorage.getItem(
            "larflowNomeUsuario"
          ) || "Bianca",

        nomeLar:
          localStorage.getItem(
            "larflowNomeLar"
          ) || "LarFlow",

        tema:
          localStorage.getItem(
            "larflowTema"
          ) || "claro",

        orcamentoCasa:
          Number(
            localStorage.getItem(
              "orcamentoCasa"
            ) || 0
          ),

        produtos: produtosSalvos
          ? JSON.parse(produtosSalvos)
          : [],
      };

      const blob = new Blob(
        [
          JSON.stringify(
            backup,
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "larflow-backup.json";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      mostrarMensagem(
        "Backup exportado com sucesso."
      );
    } catch (error) {
      console.error(
        "Erro ao exportar backup:",
        error
      );

      mostrarMensagem(
        "Não foi possível exportar o backup."
      );
    }
  }

  // =========================================================
  // IMPORTAR BACKUP
  // =========================================================

  function importarBackup(event) {
    const arquivo =
      event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const leitor =
      new FileReader();

    leitor.onload = () => {
      try {
        const dados =
          JSON.parse(
            leitor.result
          );

        if (
          !dados ||
          typeof dados !== "object" ||
          !Array.isArray(
            dados.produtos
          )
        ) {
          throw new Error(
            "Formato de backup inválido."
          );
        }

        const produtosNormalizados =
          dados.produtos.map(
            (produto) => ({
              ...produto,
              quantidade:
                Number(
                  produto.quantidade
                ) || 1,
            })
          );

        localStorage.setItem(
          "produtos",
          JSON.stringify(
            produtosNormalizados
          )
        );

        if (
          typeof dados.nomeUsuario ===
          "string" &&
          dados.nomeUsuario.trim()
        ) {
          localStorage.setItem(
            "larflowNomeUsuario",
            dados.nomeUsuario
          );

          setNomeUsuario(
            dados.nomeUsuario
          );
        }

        if (
          typeof dados.nomeLar ===
          "string" &&
          dados.nomeLar.trim()
        ) {
          localStorage.setItem(
            "larflowNomeLar",
            dados.nomeLar
          );

          setNomeLar(
            dados.nomeLar
          );
        }

        if (
          typeof dados.tema ===
            "string" &&
          ["claro", "escuro"].includes(
            dados.tema
          )
        ) {
          setTema(dados.tema);

          localStorage.setItem(
            "larflowTema",
            dados.tema
          );
        }

        if (
          Number(
            dados.orcamentoCasa
          ) >= 0
        ) {
          localStorage.setItem(
            "orcamentoCasa",
            String(
              Number(
                dados.orcamentoCasa
              )
            )
          );
        }

        localStorage.setItem(
          "larflowIntroConcluida",
          "true"
        );

        window.dispatchEvent(
          new Event(
            "larflow-data-updated"
          )
        );

        mostrarMensagem(
          "Backup importado com sucesso."
        );
      } catch (error) {
        console.error(
          "Erro ao importar backup:",
          error
        );

        mostrarMensagem(
          "Não foi possível importar o backup."
        );
      } finally {
        event.target.value = "";
      }
    };

    leitor.onerror = () => {
      mostrarMensagem(
        "Não foi possível ler o arquivo."
      );

      event.target.value = "";
    };

    leitor.readAsText(arquivo);
  }

  // =========================================================
  // RESTAURAR LISTA INICIAL
  // =========================================================

  function restaurarListaInicial() {
    const confirmar =
      window.confirm(
        "Isso substituirá sua lista atual pela lista inicial do LarFlow. Deseja continuar?"
      );

    if (!confirmar) {
      return;
    }

    const listaNormalizada =
      listaInicial.map(
        (produto) => ({
          ...produto,
          quantidade:
            Number(
              produto.quantidade
            ) || 1,
        })
      );

    localStorage.setItem(
      "produtos",
      JSON.stringify(
        listaNormalizada
      )
    );

    window.dispatchEvent(
      new Event(
        "larflow-data-updated"
      )
    );

    mostrarMensagem(
      "Lista inicial restaurada."
    );
  }

  // =========================================================
  // APAGAR TODOS OS DADOS
  // =========================================================

  function apagarTodosOsDados() {
    const primeiraConfirmacao =
      window.confirm(
        "Tem certeza que deseja apagar todos os dados do LarFlow?"
      );

    if (!primeiraConfirmacao) {
      return;
    }

    const segundaConfirmacao =
      window.confirm(
        "Essa ação não poderá ser desfeita. Deseja realmente apagar tudo?"
      );

    if (!segundaConfirmacao) {
      return;
    }

    localStorage.removeItem("produtos");
    localStorage.removeItem("orcamentoCasa");
    localStorage.removeItem("larflowNomeUsuario");
    localStorage.removeItem("larflowNomeLar");
    localStorage.removeItem("larflowTema");

    window.dispatchEvent(
      new Event(
        "larflow-data-updated"
      )
    );

    setNomeUsuario("Bianca");
    setNomeLar("LarFlow");

    setTema("claro");

    mostrarMensagem(
      "Todos os dados foram apagados."
    );
  }

  return (
    <div className="configuracoes-page">

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

      <div className="page-header">
        <div>
          <span className="dashboard-overline">
            PERSONALIZAÇÃO
          </span>

          <h1>
            ⚙️ Configurações
          </h1>

          <p>
            Personalize o LarFlow e gerencie seus dados.
          </p>
        </div>
      </div>

      {/* =====================================================
          MENSAGEM
      ===================================================== */}

      {mensagem && (
        <div className="configuracoes-mensagem">
          <FaCheckCircle />

          <span>
            {mensagem}
          </span>
        </div>
      )}

      {/* =====================================================
          PERFIL
      ===================================================== */}

      <section className="configuracoes-section">

        <div className="configuracoes-section-header">

          <div className="configuracoes-section-icon">
            <FaUser />
          </div>

          <div>
            <h2>Perfil</h2>

            <p>
              Personalize como o LarFlow identifica você.
            </p>
          </div>

        </div>

        <form
          className="configuracoes-form"
          onSubmit={salvarPerfil}
        >

          <div className="form-group">
            <label htmlFor="nomeUsuario">
              Seu nome
            </label>

            <input
              id="nomeUsuario"
              type="text"
              value={nomeUsuario}
              placeholder="Ex: Bianca"
              onChange={(event) =>
                setNomeUsuario(
                  event.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="nomeLar">
              Nome do lar
            </label>

            <input
              id="nomeLar"
              type="text"
              value={nomeLar}
              placeholder="Ex: Nosso Lar"
              onChange={(event) =>
                setNomeLar(
                  event.target.value
                )
              }
            />
          </div>

          <button
            type="submit"
            className="save-button"
          >
            <FaSave />
            Salvar alterações
          </button>

        </form>

      </section>

      {/* =====================================================
          APARÊNCIA
      ===================================================== */}

      <section className="configuracoes-section">

        <div className="configuracoes-section-header">

          <div className="configuracoes-section-icon">
            {tema === "escuro"
              ? "🌙"
              : "☀️"}
          </div>

          <div>
            <h2>
              Aparência
            </h2>

            <p>
              Escolha como o LarFlow será exibido.
            </p>
          </div>

        </div>

        <div className="configuracoes-tema-grid">

          <button
            type="button"
            className={`configuracoes-tema-card ${
              tema === "claro"
                ? "ativo"
                : ""
            }`}
            onClick={() =>
              alterarTema("claro")
            }
          >

            <div className="configuracoes-tema-icon">
              ☀️
            </div>

            <div>
              <strong>
                Tema Claro
              </strong>

              <span>
                Visual claro e suave.
              </span>
            </div>

            {tema === "claro" && (
              <span className="configuracoes-tema-check">
                ✓
              </span>
            )}

          </button>

          <button
            type="button"
            className={`configuracoes-tema-card ${
              tema === "escuro"
                ? "ativo"
                : ""
            }`}
            onClick={() =>
              alterarTema("escuro")
            }
          >

            <div className="configuracoes-tema-icon">
              🌙
            </div>

            <div>
              <strong>
                Tema Escuro
              </strong>

              <span>
                Visual escuro para ambientes com pouca luz.
              </span>
            </div>

            {tema === "escuro" && (
              <span className="configuracoes-tema-check">
                ✓
              </span>
            )}

          </button>

        </div>

      </section>

      {/* =====================================================
          DADOS E BACKUP
      ===================================================== */}

      <section className="configuracoes-section">

        <div className="configuracoes-section-header">

          <div className="configuracoes-section-icon">
            <FaDownload />
          </div>

          <div>
            <h2>
              Dados e backup
            </h2>

            <p>
              Salve uma cópia ou recupere seus dados quando quiser.
            </p>
          </div>

        </div>

        <div className="configuracoes-acoes">

          <button
            type="button"
            className="configuracoes-action-card"
            onClick={exportarBackup}
          >

            <FaDownload />

            <div>
              <strong>
                Exportar backup
              </strong>

              <span>
                Baixe todos os seus dados em um arquivo JSON.
              </span>
            </div>

          </button>

          <button
            type="button"
            className="configuracoes-action-card"
            onClick={() =>
              arquivoInputRef.current?.click()
            }
          >

            <FaUpload />

            <div>
              <strong>
                Importar backup
              </strong>

              <span>
                Restaure seus produtos, orçamento, tema e perfil.
              </span>
            </div>

          </button>

        </div>

        <input
          ref={arquivoInputRef}
          type="file"
          accept=".json,application/json"
          onChange={importarBackup}
          style={{ display: "none" }}
        />

      </section>

      {/* =====================================================
          LISTA DA CASA
      ===================================================== */}

      <section className="configuracoes-section">

        <div className="configuracoes-section-header">

          <div className="configuracoes-section-icon">
            <FaUndo />
          </div>

          <div>
            <h2>
              Lista da casa
            </h2>

            <p>
              Restaure a lista inicial preparada pelo LarFlow.
            </p>
          </div>

        </div>

        <div className="configuracoes-seguranca">

          <div>
            <strong>
              Restaurar lista inicial
            </strong>

            <span>
              Substitui sua lista atual pelos produtos padrão.
            </span>
          </div>

          <button
            type="button"
            className="configuracoes-button-secondary"
            onClick={
              restaurarListaInicial
            }
          >
            <FaUndo />
            Restaurar
          </button>

        </div>

      </section>

      {/* =====================================================
          ZONA DE SEGURANÇA
      ===================================================== */}

      <section className="configuracoes-section configuracoes-danger">

        <div className="configuracoes-section-header">

          <div className="configuracoes-section-icon danger">
            <FaExclamationTriangle />
          </div>

          <div>
            <h2>
              Zona de segurança
            </h2>

            <p>
              Estas ações podem apagar dados permanentemente.
            </p>
          </div>

        </div>

        <div className="configuracoes-seguranca">

          <div>
            <strong>
              Apagar todos os dados
            </strong>

            <span>
              Remove produtos, orçamento, perfil e configurações.
            </span>
          </div>

          <button
            type="button"
            className="configuracoes-button-danger"
            onClick={
              apagarTodosOsDados
            }
          >
            <FaTrash />
            Apagar tudo
          </button>

        </div>

      </section>

    </div>
  );
}

export default Configuracoes;