function SummaryCard({ icon, title, value }) {
  return (
    <div className="summary-card">
      <div className="summary-icon">
        {icon}
      </div>

      <div className="summary-info">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default SummaryCard;