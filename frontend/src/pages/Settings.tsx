import { useState } from "react";
import { IcCheck, IcSettings, IcUsers, IcShield, IcBell, IcDatabase, IcHospital } from "../components/Icons";

const sections = [
  { id: "institucional", label: "Información institucional", icon: <IcHospital size={15} /> },
  { id: "usuarios", label: "Configuración de usuarios", icon: <IcUsers size={15} /> },
  { id: "seguridad", label: "Seguridad", icon: <IcShield size={15} /> },
  { id: "notificaciones", label: "Notificaciones", icon: <IcBell size={15} /> },
  { id: "bd", label: "Base de datos", icon: <IcDatabase size={15} /> },
  { id: "respaldos", label: "Respaldos", icon: <IcDatabase size={15} /> },
  { id: "preferencias", label: "Preferencias del sistema", icon: <IcSettings size={15} /> },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("institucional");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Configuración del sistema</h1>
          <p className="page-subtitle">Parámetros generales de SAMI</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <IcCheck size={13} /> Guardar cambios
        </button>
      </div>

      {saved && (
        <div className="alert alert-success" style={{ marginBottom: 16 }}>
          <IcCheck size={14} /> Configuración guardada correctamente.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: "8px 0", height: "fit-content" }}>
          {sections.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500,
                color: activeSection === s.id ? "var(--secondary)" : "var(--text-secondary)",
                background: activeSection === s.id ? "var(--secondary-light)" : "transparent",
                borderLeft: `3px solid ${activeSection === s.id ? "var(--secondary)" : "transparent"}`,
                transition: "all 0.1s",
              }}
            >
              {s.icon}
              {s.label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeSection === "institucional" && (
            <div className="card">
              <div className="card-title" style={{ marginBottom: 20 }}>Información institucional</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div className="form-group" style={{ gridColumn: "1/-1" }}>
                  <label className="form-label">Nombre del hospital</label>
                  <input className="form-input" defaultValue="Hospital General Altotonga &quot;Eufrosina Camacho&quot;" />
                </div>
                <div className="form-group">
                  <label className="form-label">Municipio</label>
                  <input className="form-input" defaultValue="Altotonga" />
                </div>
                <div className="form-group">
                  <label className="form-label">Estado</label>
                  <input className="form-input" defaultValue="Veracruz" />
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono principal</label>
                  <input className="form-input" defaultValue="228-412-5500" />
                </div>
                <div className="form-group">
                  <label className="form-label">Correo institucional</label>
                  <input className="form-input" type="email" defaultValue="contacto@hgaltotonga.gob.mx" />
                </div>
                <div className="form-group" style={{ gridColumn: "1/-1" }}>
                  <label className="form-label">Dirección</label>
                  <input className="form-input" defaultValue="Av. Veracruz S/N, Centro, Altotonga, Ver. C.P. 93700" />
                </div>
                <div className="form-group">
                  <label className="form-label">Jurisdicción sanitaria</label>
                  <input className="form-input" defaultValue="Jurisdicción VI Martínez de la Torre" />
                </div>
                <div className="form-group">
                  <label className="form-label">Clave CLUES</label>
                  <input className="form-input mono" defaultValue="VESSA000033" />
                </div>
              </div>
            </div>
          )}

          {activeSection === "seguridad" && (
            <div className="card">
              <div className="card-title" style={{ marginBottom: 20 }}>Configuración de seguridad</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Tiempo de sesión inactiva (minutos)", type: "number", default: "30" },
                  { label: "Intentos máximos de inicio de sesión", type: "number", default: "5" },
                  { label: "Longitud mínima de contraseña", type: "number", default: "8" },
                ].map((f, i) => (
                  <div key={i} className="form-group" style={{ maxWidth: 320 }}>
                    <label className="form-label">{f.label}</label>
                    <input className="form-input" type={f.type} defaultValue={f.default} />
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Requerir mayúsculas en contraseña", checked: true },
                    { label: "Requerir caracteres especiales", checked: true },
                    { label: "Autenticación de dos factores (2FA)", checked: false },
                    { label: "Registrar todos los accesos fallidos", checked: true },
                    { label: "Bloquear usuario después de intentos fallidos", checked: true },
                  ].map((opt, i) => (
                    <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked={opt.checked} style={{ accentColor: "var(--secondary)", width: 16, height: 16 }} />
                      <span style={{ fontSize: 13.5, color: "var(--text)" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "notificaciones" && (
            <div className="card">
              <div className="card-title" style={{ marginBottom: 20 }}>Configuración de notificaciones</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Notificar stock bajo en farmacia", desc: "Alerta cuando el inventario esté por debajo del mínimo", checked: true },
                  { label: "Notificar medicamentos por caducar", desc: "Alerta 30 días antes de la fecha de caducidad", checked: true },
                  { label: "Notificar respaldo completado", desc: "Confirmar cuando el respaldo automático se ejecute", checked: true },
                  { label: "Notificar nuevos usuarios registrados", desc: "Alerta al administrador cuando se crea una cuenta", checked: false },
                  { label: "Notificar intentos de acceso fallidos", desc: "Alerta por actividad sospechosa", checked: true },
                  { label: "Notificar citas programadas del día", desc: "Resumen diario a las 7:00 AM", checked: false },
                ].map((opt, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                    padding: "12px 14px", borderRadius: 8, border: "1px solid var(--border)",
                    gap: 16,
                  }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{opt.desc}</div>
                    </div>
                    <label style={{ position: "relative", width: 40, height: 22, flexShrink: 0, cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked={opt.checked} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: "absolute", inset: 0, borderRadius: 11,
                        background: opt.checked ? "var(--secondary)" : "#e2e8f0",
                        transition: "background 0.2s",
                      }}>
                        <span style={{
                          position: "absolute", width: 16, height: 16, borderRadius: "50%",
                          background: "#fff", top: 3, left: opt.checked ? 21 : 3,
                          transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "bd" && (
            <div className="card">
              <div className="card-title" style={{ marginBottom: 20 }}>Configuración de base de datos</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div className="form-group">
                  <label className="form-label">Motor de base de datos</label>
                  <select className="form-select">
                    <option>PostgreSQL 15</option>
                    <option>MySQL 8</option>
                    <option>MariaDB 10.6</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Host</label>
                  <input className="form-input mono" defaultValue="localhost" />
                </div>
                <div className="form-group">
                  <label className="form-label">Puerto</label>
                  <input className="form-input mono" defaultValue="5432" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nombre de la BD</label>
                  <input className="form-input mono" defaultValue="sami_db" />
                </div>
              </div>
              <div style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)", marginTop: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--success)" }}>Conexión activa</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>Latencia: 2ms · PostgreSQL 15.3</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "preferencias" && (
            <div className="card">
              <div className="card-title" style={{ marginBottom: 20 }}>Preferencias del sistema</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div className="form-group">
                  <label className="form-label">Idioma del sistema</label>
                  <select className="form-select"><option>Español (México)</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Zona horaria</label>
                  <select className="form-select"><option>América/Mexico_City (UTC-6)</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Formato de fecha</label>
                  <select className="form-select"><option>DD/MM/AAAA</option><option>AAAA-MM-DD</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Registros por página</label>
                  <select className="form-select"><option>20</option><option>50</option><option>100</option></select>
                </div>
              </div>
            </div>
          )}

          {["usuarios", "respaldos"].includes(activeSection) && (
            <div className="card" style={{ textAlign: "center", padding: "48px" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>⚙️</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700 }}>
                {sections.find(s => s.id === activeSection)?.label}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
                Esta sección de configuración está disponible para el rol de Administrador y TI.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
