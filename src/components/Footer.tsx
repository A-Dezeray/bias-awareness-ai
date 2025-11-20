import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content glass-card">
        <div className="footer-main">
          <h3 className="footer-title">Thank You for Exploring</h3>
          <p className="footer-message">
            Understanding bias in AI is the first step toward building more equitable technology.
            Every engineer who learns these concepts has the power to make systems fairer for everyone.
          </p>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-note">
            Built with React + TypeScript + Vite | Designed for ethical technology education
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} The Crowe Code Blog
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
