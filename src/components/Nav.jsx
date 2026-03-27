export default function Nav({ sections, activeSection, onNavigate }) {
  return (
    <nav className="nav">
      <div className="nav-brand">LEADPREP</div>
      {sections.map(s => (
        <button
          key={s.id}
          className={`nav-btn${activeSection === s.id ? ' active' : ''}`}
          onClick={() => onNavigate(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  )
}
