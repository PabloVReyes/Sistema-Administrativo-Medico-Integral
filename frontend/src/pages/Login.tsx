import { useState } from "react";
import { IcHospital, IcAlert, IcLock } from "../components/Icons";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!usuario || !password) {
      setError("Ingrese su usuario y contraseña.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (usuario === "admin" && password === "admin123") {
        onLogin();
      } else {
        setError("Usuario o contraseña incorrectos. Intente nuevamente.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-page">
      {/* Background pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(8,145,178,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {/* Hospital name above card */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Hospital General Altotonga
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
            "Eufrosina Camacho" · Altotonga, Veracruz
          </div>
        </div>

        <div className="login-card">
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 16,
              background: "linear-gradient(135deg, #1a3a5c 0%, #0891b2 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 8px 20px rgba(26,58,92,0.3)",
            }}>
              <IcHospital size={36} className="" />
            </div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 28, fontWeight: 800, color: "var(--primary)",
              letterSpacing: "-0.02em",
            }}>SAMI</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500, marginTop: 2 }}>
              Sistema Administrativo Médico Integral
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" style={{ marginBottom: 16 }}>
                <IcAlert size={14} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Usuario</label>
              <input
                className="form-input"
                type="text"
                placeholder="Nombre de usuario"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px", marginTop: 4, fontSize: 14 }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    animation: "spin 0.7s linear infinite", display: "inline-block",
                  }} />
                  Verificando...
                </span>
              ) : "Iniciar sesión"}
            </button>

            <div style={{ textAlign: "center", marginTop: 14 }}>
              <span style={{ fontSize: 13, color: "var(--secondary)", cursor: "pointer", fontWeight: 500 }}>
                ¿Olvidaste tu contraseña?
              </span>
            </div>
          </form>

          <div style={{
            marginTop: 24, padding: "12px 14px",
            background: "#f8fafc", borderRadius: 8,
            border: "1px solid var(--border)",
            display: "flex", alignItems: "flex-start", gap: 8,
          }}>
            <IcLock size={14} style={{ flexShrink: 0, marginTop: 1, color: "var(--text-muted)" }} />
            <p style={{ fontSize: 11.5, color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
              El acceso está restringido a personal autorizado del Hospital General Altotonga. Los intentos de acceso no autorizados son monitoreados y pueden ser reportados.
            </p>
          </div>

          <div style={{ marginTop: 16, textAlign: "center", fontSize: 11.5, color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text-secondary)" }}>Demo:</strong> usuario <code>admin</code> / contraseña <code>admin123</code>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
