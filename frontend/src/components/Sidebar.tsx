import {
  IcHome, IcPatients, IcClipboard, IcCalendar, IcStaff, IcUsers,
  IcShield, IcPill, IcChart, IcAudit, IcDatabase, IcSettings, IcHospital,
} from "./Icons";

type Page =
  | "dashboard" | "pacientes" | "expedientes" | "citas" | "personal"
  | "usuarios" | "roles" | "farmacia" | "reportes" | "auditoria"
  | "respaldos" | "configuracion";

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: React.ReactNode; section?: string }[] = [
  { page: "dashboard", label: "Inicio", icon: <IcHome /> },
  { page: "pacientes", label: "Pacientes", icon: <IcPatients />, section: "Clínico" },
  { page: "expedientes", label: "Expedientes clínicos", icon: <IcClipboard /> },
  { page: "citas", label: "Citas médicas", icon: <IcCalendar /> },
  { page: "personal", label: "Personal", icon: <IcStaff />, section: "Administración" },
  { page: "usuarios", label: "Usuarios", icon: <IcUsers /> },
  { page: "roles", label: "Roles y permisos", icon: <IcShield /> },
  { page: "farmacia", label: "Farmacia e inventario", icon: <IcPill /> },
  { page: "reportes", label: "Reportes", icon: <IcChart />, section: "Sistema" },
  { page: "auditoria", label: "Auditoría", icon: <IcAudit /> },
  { page: "respaldos", label: "Respaldos", icon: <IcDatabase /> },
  { page: "configuracion", label: "Configuración", icon: <IcSettings /> },
];

export default function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 8,
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <IcHospital size={22} className="" />
          </div>
          <div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.1,
            }}>SAMI</div>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "0.02em" }}>
              Sistema Administrativo<br />Médico Integral
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.4)",
          fontWeight: 500, letterSpacing: "0.01em",
        }}>
          Hospital Gral. Altotonga
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div key={item.page}>
            {item.section && (
              <div className="nav-section-title">{item.section}</div>
            )}
            <div
              className={`nav-item${current === item.page ? " active" : ""}`}
              onClick={() => onNavigate(item.page)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </nav>

      <div style={{
        padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)",
        fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center",
      }}>
        SAMI v2.4.1 · © 2026
      </div>
    </div>
  );
}

export type { Page };
