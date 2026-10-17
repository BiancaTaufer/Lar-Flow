
import { useState } from "react";

function Sidebar({
  onNavigate,
  aberta = false,
  onClose,
}) {
  const [gruposAbertos, setGruposAbertos] = useState({
    visao: true,
    casa: true,
    financeiro: true,
    sistema: true,
  });

  function alternarGrupo(grupo) {
    setGruposAbertos((atual) => ({
      ...atual,
      [grupo]: !atual[grupo],
    }));
  }

  function navegar(pagina, categoria = "Todos") {
    onNavigate(pagina, categoria);

    if (onClose) {
      onClose();
    }
  }

  return (
    <aside
      className={`sidebar ${
        aberta ? "sidebar-aberta" : ""
      }`}
    >
      {/* MARCA */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">🏡</div>

        <div>
          <h2>LarFlow</h2>
          <p>Organize. Planeje. Viva.</p>
        </div>

        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          ×
        </button>
      </div>

      {/* NAVEGAÇÃO */}
      <nav className="sidebar-nav">
        {/* VISÃO GERAL */}
        <button
          type="button"
          className="sidebar-group-button"
          onClick={() => alternarGrupo("visao")}
          aria-expanded={gruposAbertos.visao}
        >
          <span className="sidebar-group-title">
            VISÃO GERAL
          </span>

          <span className="sidebar-group-arrow">
            {gruposAbertos.visao ? "⌃" : "⌄"}
          </span>
        </button>

        {gruposAbertos.visao && (
          <div className="sidebar-group-content">
            <button
              type="button"
              onClick={() => navegar("dashboard")}
            >
              <span className="sidebar-menu-icon">📊</span>
              <span>Dashboard</span>
            </button>
          </div>
        )}

        {/* MINHA CASA */}
        <button
          type="button"
          className="sidebar-group-button"
          onClick={() => alternarGrupo("casa")}
          aria-expanded={gruposAbertos.casa}
        >
          <span className="sidebar-group-title">
            MINHA CASA
          </span>

          <span className="sidebar-group-arrow">
            {gruposAbertos.casa ? "⌃" : "⌄"}
          </span>
        </button>

        {gruposAbertos.casa && (
          <div className="sidebar-group-content">
            <button
              type="button"
              onClick={() => navegar("moveis")}
            >
              <span className="sidebar-menu-icon">🛋️</span>
              <span>Móveis</span>
            </button>

            <button
              type="button"
              onClick={() => navegar("compras")}
            >
              <span className="sidebar-menu-icon">🛒</span>
              <span>Compras</span>
            </button>

            <button
              type="button"
              onClick={() => navegar("checklist")}
            >
              <span className="sidebar-menu-icon">✅</span>
              <span>Checklist</span>
            </button>
          </div>
        )}

        {/* FINANCEIRO */}
        <button
          type="button"
          className="sidebar-group-button"
          onClick={() => alternarGrupo("financeiro")}
          aria-expanded={gruposAbertos.financeiro}
        >
          <span className="sidebar-group-title">
            FINANCEIRO
          </span>

          <span className="sidebar-group-arrow">
            {gruposAbertos.financeiro ? "⌃" : "⌄"}
          </span>
        </button>

        {gruposAbertos.financeiro && (
          <div className="sidebar-group-content">
            <button
              type="button"
              onClick={() => navegar("gastos")}
            >
              <span className="sidebar-menu-icon">💰</span>
              <span>Gastos</span>
            </button>
          </div>
        )}

        {/* SISTEMA */}
        <button
          type="button"
          className="sidebar-group-button"
          onClick={() => alternarGrupo("sistema")}
          aria-expanded={gruposAbertos.sistema}
        >
          <span className="sidebar-group-title">
            SISTEMA
          </span>

          <span className="sidebar-group-arrow">
            {gruposAbertos.sistema ? "⌃" : "⌄"}
          </span>
        </button>

        {gruposAbertos.sistema && (
          <div className="sidebar-group-content">
            <button
              type="button"
              onClick={() => navegar("configuracoes")}
            >
              <span className="sidebar-menu-icon">⚙️</span>
              <span>Configurações</span>
            </button>
          </div>
        )}
      </nav>

      {/* RODAPÉ */}
      <div className="sidebar-footer">
        <span>LarFlow</span>
        <small>Seu lar, mais organizado.</small>
      </div>
    </aside>
  );
}

export default Sidebar;
