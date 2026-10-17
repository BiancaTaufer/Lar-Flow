import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Moveis from "./pages/Moveis";
import Compras from "./pages/Compras";
import Gastos from "./pages/Gastos";
import Configuracoes from "./pages/Configuracoes";
import Checklist from "./pages/Checklist";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("dashboard");
  const [categoriaInicial, setCategoriaInicial] = useState("Todos");

  const [sidebarAberta, setSidebarAberta] = useState(false);

  const [tema, setTema] = useState(() => {
    return (
      localStorage.getItem("larflowTema") ||
      "claro"
    );
  });

  const [dadosVersion, setDadosVersion] = useState(0);

  useEffect(() => {
    function atualizarDados() {
      setDadosVersion((valorAtual) => valorAtual + 1);
    }

    window.addEventListener(
      "larflow-data-updated",
      atualizarDados
    );

    return () => {
      window.removeEventListener(
        "larflow-data-updated",
        atualizarDados
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      tema
    );

    localStorage.setItem(
      "larflowTema",
      tema
    );
  }, [tema]);

  const [mostrarBoasVindas, setMostrarBoasVindas] =
    useState(() => {
      return (
        localStorage.getItem(
          "larflowIntroConcluida"
        ) !== "true"
      );
    });

  function navegar(
    pagina,
    categoria = "Todos"
  ) {
    setCategoriaInicial(categoria);
    setPaginaAtual(pagina);
    setSidebarAberta(false);
  }

  function iniciarLarFlow() {
    localStorage.setItem(
      "larflowIntroConcluida",
      "true"
    );

    setMostrarBoasVindas(false);
    setPaginaAtual("dashboard");
  }

  return (
    <div className="app">

      <Sidebar
        onNavigate={navegar}
        aberta={sidebarAberta}
        onClose={() => setSidebarAberta(false)}
      />

      {sidebarAberta && (
        <button
          type="button"
          className="mobile-sidebar-overlay"
          aria-label="Fechar menu"
          onClick={() => setSidebarAberta(false)}
        />
      )}

      <main className="content">

        <Header
          onNavigate={navegar}
          dadosVersion={dadosVersion}
          onOpenSidebar={() =>
            setSidebarAberta(true)
          }
        />

        {paginaAtual === "dashboard" && (
          <Dashboard
            onNavigate={navegar}
          />
        )}

        {paginaAtual === "moveis" && (
          <Moveis
            categoriaInicial={categoriaInicial}
          />
        )}

        {paginaAtual === "compras" && (
          <Compras />
        )}

        {paginaAtual === "gastos" && (
          <Gastos />
        )}

        {paginaAtual === "configuracoes" && (
          <Configuracoes
            tema={tema}
            setTema={setTema}
          />
        )}

        {paginaAtual === "checklist" && (
  <Checklist />
)}

      </main>

      {mostrarBoasVindas && (
        <div className="larflow-welcome-overlay">
          <div className="larflow-welcome-card">

            <div className="larflow-welcome-icon">
              🏡
            </div>

            <span className="larflow-welcome-overline">
              BEM-VINDA AO
            </span>

            <h1>LarFlow</h1>

            <p>
              Organize sua casa, acompanhe suas
              compras e tenha uma visão clara dos
              gastos do seu lar.
            </p>

            <div className="larflow-welcome-features">

              <div>
                <span>✓</span>
                <p>
                  Organize cada ambiente da sua casa.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Acompanhe suas compras e pendências.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Controle seu orçamento e seus gastos.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="larflow-welcome-button"
              onClick={iniciarLarFlow}
            >
              Começar meu LarFlow
            </button>

            <small>
              Sua lista inicial será preparada automaticamente.
            </small>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;