function ProgressBar({ progresso }) {
  return (
    <div className="progress-container">

      <div className="progress-header">
        <span>Progresso das compras</span>
        <strong>{progresso}%</strong>
      </div>

      <div className="progress-background">
        <div
          className="progress-fill"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      <p>
        0 de 0 produtos comprados
      </p>

    </div>
  );
}

export default ProgressBar;