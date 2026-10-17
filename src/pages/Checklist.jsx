
import { useEffect, useState } from "react";

const tarefasIniciais = [
  { id: 1, titulo: "Definir o orçamento da casa", categoria: "Planejamento", concluida: false },
  { id: 2, titulo: "Medir os ambientes", categoria: "Planejamento", concluida: false },
  { id: 3, titulo: "Comprar os móveis essenciais", categoria: "Compras", concluida: false },
  { id: 4, titulo: "Organizar a cozinha", categoria: "Organização", concluida: false },
  { id: 5, titulo: "Organizar o quarto", categoria: "Organização", concluida: false },
  { id: 6, titulo: "Conferir instalações elétricas", categoria: "Manutenção", concluida: false },
];

export default function Checklist() {
  const [tarefas, setTarefas] = useState(() => {
    try {
      const salvas = localStorage.getItem("larflowChecklist");
      return salvas ? JSON.parse(salvas) : tarefasIniciais;
    } catch {
      return tarefasIniciais;
    }
  });

  const [novaTarefa, setNovaTarefa] = useState("");
  const [categoria, setCategoria] = useState("Organização");

  useEffect(() => {
    localStorage.setItem("larflowChecklist", JSON.stringify(tarefas));
  }, [tarefas]);

  const concluidas = tarefas.filter((t) => t.concluida).length;
  const progresso = tarefas.length
    ? Math.round((concluidas / tarefas.length) * 100)
    : 0;

  function adicionarTarefa(event) {
    event.preventDefault();
    if (!novaTarefa.trim()) return;

    setTarefas((atuais) => [
      ...atuais,
      {
        id: Date.now(),
        titulo: novaTarefa.trim(),
        categoria,
        concluida: false,
      },
    ]);
    setNovaTarefa("");
  }

  function alternarTarefa(id) {
    setTarefas((atuais) =>
      atuais.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  function excluirTarefa(id) {
    setTarefas((atuais) => atuais.filter((t) => t.id !== id));
  }

  const cardStyle = {
    background: "#fffdf9",
    border: "1px solid #e7e2d8",
    borderRadius: 12,
    padding: 16,
  };

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", paddingBottom: 32 }}>
      <header style={{ marginBottom: 24 }}>
        <span style={{ color: "#ad8956", fontSize: 12, letterSpacing: 2 }}>
          ORGANIZAÇÃO
        </span>
        <h2 style={{ color: "#304b3d", marginBottom: 8 }}>
          Checklist da casa
        </h2>
        <p style={{ color: "#778078" }}>
          Organize as tarefas e acompanhe o que já foi concluído.
        </p>
      </header>

      <section style={{ ...cardStyle, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Progresso geral</strong>
          <strong>{progresso}%</strong>
        </div>
        <div
          style={{
            height: 10,
            background: "#e5e8e3",
            borderRadius: 20,
            marginTop: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progresso}%`,
              background: "#506f5c",
              transition: "width 0.2s",
            }}
          />
        </div>
        <p style={{ color: "#778078", fontSize: 14 }}>
          {concluidas} de {tarefas.length} tarefas concluídas
        </p>
      </section>

      <form
        onSubmit={adicionarTarefa}
        style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}
      >
        <input
          value={novaTarefa}
          onChange={(event) => setNovaTarefa(event.target.value)}
          placeholder="Digite uma nova tarefa..."
          aria-label="Nome da nova tarefa"
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            padding: 13,
            border: "1px solid #deded5",
            borderRadius: 10,
          }}
        />
        <select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          aria-label="Categoria da tarefa"
          style={{ padding: 12, border: "1px solid #deded5", borderRadius: 10 }}
        >
          <option>Planejamento</option>
          <option>Compras</option>
          <option>Organização</option>
          <option>Manutenção</option>
        </select>
        <button
          type="submit"
          style={{
            background: "#506f5c",
            color: "white",
            border: 0,
            borderRadius: 10,
            padding: "12px 18px",
            cursor: "pointer",
          }}
        >
          + Adicionar tarefa
        </button>
      </form>

      <div style={{ display: "grid", gap: 12 }}>
        {tarefas.map((tarefa) => (
          <article
            key={tarefa.id}
            style={{
              ...cardStyle,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <input
              type="checkbox"
              checked={Boolean(tarefa.concluida)}
              onChange={() => alternarTarefa(tarefa.id)}
              aria-label={`Concluir ${tarefa.titulo}`}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  textDecoration: tarefa.concluida ? "line-through" : "none",
                  color: tarefa.concluida ? "#8a938b" : "#304b3d",
                }}
              >
                {tarefa.titulo}
              </div>
              <small style={{ color: "#778078" }}>{tarefa.categoria}</small>
            </div>
            <button
              type="button"
              onClick={() => excluirTarefa(tarefa.id)}
              aria-label={`Excluir ${tarefa.titulo}`}
              style={{
                background: "#f7eeeb",
                color: "#9c5c50",
                border: 0,
                borderRadius: 8,
                padding: 9,
                cursor: "pointer",
              }}
            >
              Excluir
            </button>
          </article>
        ))}

        {tarefas.length === 0 && (
          <p style={{ color: "#778078", textAlign: "center", padding: 24 }}>
            Nenhuma tarefa cadastrada. Adicione a primeira acima.
          </p>
        )}
      </div>
    </section>
  );
}
