import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Built by Lakshya Kumar</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/lakshya-kumar-52735737/" target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <span className="footer-divider">•</span>
          <a href="https://github.com/lakshyakumar" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <span className="footer-divider">•</span>
          <a href="https://lakshyakumar.github.io/lakshyakumar/" target="_blank" rel="noopener noreferrer" className="footer-link">
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  )
}
