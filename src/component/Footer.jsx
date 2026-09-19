function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">

                {/* Address Section */}
                <div className="footer-section">
                    <h3>📍 Address</h3>
                    <p>Himachal Pradesh Bilaspur Ghumarwin</p>
                    <p>BCA || MERN STACK</p>
                </div>

                {/* Social Links Section */}
                <div className="footer-section">
                    <h3>🔗 Connect With Me</h3>
                    <div className="social-links">
                        <a href="https://github.com/AmitSharma-web" target="_blank" rel="noreferrer">


                            <i className="fa-brands fa-github" style={{ color: "rgb(0, 0, 0)" }}></i>

                        </a>
                        <a href="https://www.linkedin.com/in/amit-sharma-820a2b2b0/" target="_blank" rel="noreferrer">

                            <i class="fa-brands fa-square-linkedin" style={{ color: " rgb(0, 0, 0)" }}></i>

                        </a>
                    </div>
                </div>

            </div>


            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Anshu's Job Tracker. Built with React.</p>
            </div>
        </footer>
    );
}

export default Footer;