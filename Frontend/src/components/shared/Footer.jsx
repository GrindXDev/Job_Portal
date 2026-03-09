import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#1e293b", color: "#94a3b8", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "32px" }}>

          {/* Brand */}
          <div>
            <h2 style={{ color: "#f1f5f9", fontSize: "20px", margin: "0 0 8px" }}>JobPortal</h2>
            <p style={{ fontSize: "14px", maxWidth: "220px", lineHeight: "1.6", margin: 0 }}>
              Connecting job seekers with top employers across India.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: "12px", fontSize: "14px" }}>For Job Seekers</p>
              {["Browse Jobs", "Upload Resume", "Job Alerts", "Career Tips"].map(link => (
                <p key={link} style={{ marginBottom: "8px" }}>
                  <a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}
                    onMouseEnter={e => e.target.style.color = "#f1f5f9"}
                    onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                    {link}
                  </a>
                </p>
              ))}
            </div>

            <div>
              <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: "12px", fontSize: "14px" }}>For Employers</p>
              {["Post a Job", "Search Resumes", "Pricing", "Contact Us"].map(link => (
                <p key={link} style={{ marginBottom: "8px" }}>
                  <a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}
                    onMouseEnter={e => e.target.style.color = "#f1f5f9"}
                    onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                    {link}
                  </a>
                </p>
              ))}
            </div>

            <div>
              <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: "12px", fontSize: "14px" }}>Company</p>
              {["About Us", "Blog", "Privacy Policy", "Terms of Service"].map(link => (
                <p key={link} style={{ marginBottom: "8px" }}>
                  <a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}
                    onMouseEnter={e => e.target.style.color = "#f1f5f9"}
                    onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                    {link}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "#334155", marginBottom: "24px" }} />

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", margin: 0 }}>
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Twitter,  href: "https://twitter.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
            ].map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: "#94a3b8", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
                onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;