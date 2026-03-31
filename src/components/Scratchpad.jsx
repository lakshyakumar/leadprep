import { useState, useEffect } from 'react';

export default function Scratchpad() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('leadprep_scratchpad');
    if (saved) setText(saved);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);
    localStorage.setItem('leadprep_scratchpad', val);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the scratchpad?')) {
      setText('');
      localStorage.removeItem('leadprep_scratchpad');
    }
  };

  return (
    <div className={`scratchpad-container ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="scratchpad-panel">
          <div className="scratchpad-header">
            <h3>📝 Notes & Scratchpad</h3>
            <button onClick={handleClear} className="clear-btn">Clear</button>
          </div>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Type your notes, edge cases, or UTF-8 text here (e.g. 🚀, 你好)..."
            className="scratchpad-textarea"
          />
        </div>
      )}
      <button className="scratchpad-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕ Close Scratchpad' : '📝 Scratchpad'}
      </button>
    </div>
  );
}
