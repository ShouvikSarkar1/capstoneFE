import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../App.css';

const Footer = () => {
    return (
      <div className="Footer">
        <footer className="footer-container">
          <div className="social-icons">
            <a href="#!" role="button"><i className="bi bi-facebook"></i></a>
            <a href="#!" role="button"><i className="bi bi-twitter"></i></a>
            <a href="#!" role="button"><i className="bi bi-google"></i></a>
            <a href="#!" role="button"><i className="bi bi-instagram"></i></a>
            <a href="#!" role="button"><i className="bi bi-linkedin"></i></a>
            <a href="#!" role="button"><i className="bi bi-github"></i></a>
          </div>

          <p className="footer-text">© 2025 GigFinder. All rights reserved.</p>
        </footer>
      </div>
    );
};

export default Footer;