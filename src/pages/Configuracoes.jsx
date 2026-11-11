import { useEffect, useRef, useState } from "react";

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

import {
  obterConfig,
  salvarConfig,
  exportarBackup as exportarBackupApi,
  importarBackup as importarBackupApi,
  restaurarListaInicial as restaurarListaApi,
  apagarTudo,
} from "../services/api";

function Configuracoes({ tema, setTema }) {
  // =========================================================
  // PERFIL
  // =========================================================

  const [nomeUsuario, setNomeUsuario] = useState("Bianca");
  const [nomeLar, setNomeLar] = useState("LarFlow");

  const [mensagem, setMensagem] =
    useState("");

  const arquivoInputRef = useRef(null);

  // Carrega nome e nome do lar salvos no banco
  useEffect(() => {
    obterConfig()
      .then((config) => {
        setNomeUsuario(config.nome_usuario);
        setNomeLar(config.nome_lar);
      })
      .catch((erro) =>
        console.error("Erro ao carregar configurações:", erro)
      );
  }, []);

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

  async function salvarPerfil(event) {
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

    try {
      await salvarConfig({ nome_usuario: nome, nome_lar: lar });
      mostrarMensagem("Configurações salvas com sucesso.");
    } catch (erro) {
      mostrarMensagem(erro.message);
    }
  }

  // =========================================================
  // TEMA
  // =========================================================

  function alterarTema(novoTema) {
    // Muda na tela na hora e salva no banco
    setTema(novoTema);

    salvarConfig({ tema: novoTema }).catch((erro) =>
      console.error("Erro ao salvar tema:", erro)
    );
  }

  // =========================================================
  // EXPORTAR BACKUP (dados vêm do banco)
  // =========================================================

  async function exportarBackup() {
    try {
      const backup = await exportarBackupApi();

      const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "larflow-backup.json";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      mostrarMensagem("Backup exportado com sucesso.");
    } catch (error) {
      console.error("Erro ao exportar backup:", error);
      mostrarMensagem("Não foi possível exportar o backup.");
    }
  }

  // =========================================================
  // IMPORTAR BACKUP (envia o arquivo para o banco)
  // =========================================================

  function importarBackup(event) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const leitor = new FileReader();

    leitor.onload = async () => {
      try {
        const dados = JSON.parse(leitor.result);

        if (
          !dados ||
          typeof dados !== "object" ||
          !Array.isArray(dados.produtos)
        ) {
          throw new Error("Formato de backup inválido.");
        }

        await importarBackupApi(dados);

        // Atualiza os campos da tela com o que foi importado
        const config = await obterConfig();
        setNomeUsuario(config.nome_usuario);
        setNomeLar(config.nome_lar);
        setTema(config.tema);

        localStorage.setItem("larflowIntroConcluida", "true");

        mostrarMensagem("Backup importado com sucesso.");
      } catch (error) {
        console.error("Erro ao importar backup:", error);
        mostrarMensagem(
          error.message || "Não foi possível importar o backup."
        );
      } finally {
        event.target.value = "";
      }
    };

    leitor.onerror = () => {
      mostrarMensagem("Não foi possível ler o arquivo.");
      event.target.value = "";
    };

    leitor.readAsText(arquivo);
  }

  // =========================================================
  // RESTAURAR LISTA INICIAL
  // =========================================================

  async function restaurarListaInicial() {
    const confirmar = window.confirm(
      "Isso substituirá sua lista atual pela lista inicial do LarFlow. Deseja continuar?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await restaurarListaApi();
      mostrarMensagem("Lista inicial restaurada.");
    } catch (erro) {
      mostrarMensagem(erro.message);
    }
  }

  // =========================================================
  // APAGAR TODOS OS DADOS
  // =========================================================

  async function apagarTodosOsDados() {
    const primeiraConfirmacao = window.confirm(
      "Tem certeza que deseja apagar todos os dados do LarFlow?"
    );

    if (!primeiraConfirmacao) {
      return;
    }

    const segundaConfirmacao = window.confirm(
      "Essa ação não poderá ser desfeita. Deseja realmente apagar tudo?"
    );

    if (!segundaConfirmacao) {
      return;
    }

    try {
      await apagarTudo();
    } catch (erro) {
      mostrarMensagem(erro.message);
      return;
    }

    setNomeUsuario("Bianca");
    setNomeLar("LarFlow");

    setTema("claro");

    mostrarMensagem("Todos os dados foram apagados.");
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