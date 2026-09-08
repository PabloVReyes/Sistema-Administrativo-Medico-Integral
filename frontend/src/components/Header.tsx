import { useState } from "react";
import { IcBell, IcChevronDown, IcLogout, IcSettings, IcUsers } from "./Icons";
import { currentUser } from "../data/mock";

interface HeaderProps {
  pageTitle: string;
  breadcrumb?: string[];
  onLogout: () => void;
}

export default function Header({ pageTitle, breadcrumb, onLogout }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { msg: "Stock bajo: Amoxicilina 500mg", time: "hace 10 min", type: "warning" },
    { msg: "Medicamento por caducar: Atorvastatina", time: "hace 25 min", type: "warning" },
    { msg: "Respaldo automático completado", time: "hace 2 hrs", type: "success" },
    { msg: "Nuevo usuario bloqueado: mf.orta", time: "hace 3 hrs", type: "info" },
  ];

  return (
    <div className="header">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="breadcrumb" style={{ marginBottom: 2 }}>
            <span>Inicio</span>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="sep">›</span>
                <span className={i === breadcrumb.length - 1 ? "current" : ""}>{crumb}</span>
              </span>
            ))}
          </div>
        )}
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 17, fontWeight: 700, color: "var(--text)", margin: 0,
        }}>{pageTitle}</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            className="btn-icon"
            style={{ width: 36, height: 36, border: "none" }}
            onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}
          >
            <IcBell size={18} />
            <span className="notif-dot" />
          </button>
          {notifOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "#fff", border: "1px solid var(--border)",
              borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              width: 300, zIndex: 200,
            }}>
              <div style={{
                padding: "12px 16px", fontWeight: 700, fontSize: 13,
                borderBottom: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span>Notificaciones</span>
                <span className="badge badge-danger">{notifications.length}</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} style={{
                  padding: "10px 16px", borderBottom: "1px solid var(--border-light)",
                  display: "flex", gap: 10, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0,
                    background: n.type === "warning" ? "var(--warning)" : n.type === "success" ? "var(--success)" : "var(--info)",
                  }} />
                  <div>
                    <div style={{ fontSize: 12.5, color: "var(--text)", fontWeight: 500 }}>{n.msg}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "8px 16px", textAlign: "center" }}>
                <span style={{ fontSize: 12, color: "var(--secondary)", cursor: "pointer", fontWeight: 600 }}>
                  Ver todas
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: "var(--border)" }} />

        {/* User menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "none", border: "none", cursor: "pointer", padding: "4px 6px",
              borderRadius: 8, transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--primary-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
          >
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "var(--primary)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
            }}>
              {currentUser.avatar}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{currentUser.role}</div>
            </div>
            <IcChevronDown size={14} />
          </button>

          {menuOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "#fff", border: "1px solid var(--border)",
              borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              width: 200, zIndex: 200,
            }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{currentUser.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{currentUser.area}</div>
              </div>
              {[
                { icon: <IcUsers size={14} />, label: "Mi perfil" },
                { icon: <IcSettings size={14} />, label: "Preferencias" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 16px", cursor: "pointer", color: "var(--text-secondary)",
                  fontSize: 13, fontWeight: 500, transition: "background 0.1s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  {item.icon} {item.label}
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  onClick={onLogout}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "9px 16px", cursor: "pointer", color: "var(--danger)",
                    fontSize: 13, fontWeight: 500, transition: "background 0.1s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--danger-light)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <IcLogout size={14} /> Cerrar sesión
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
