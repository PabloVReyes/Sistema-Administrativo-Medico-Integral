import { useEffect, useState } from "react";
import { IcPatients, IcCalendar, IcClipboard, IcUsers, IcAlert, IcCheck, IcEye, IcPlus, IcUserX } from "../components/Icons";

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    "Confirmada": "badge-success",
    "Atendida": "badge-info",
    "Pendiente": "badge-warning",
    "Cancelada": "badge-danger",
  };
  return <span className={`badge ${map[estado] || "badge-muted"}`}>{estado}</span>;
}

function StatusBadge2({ estado }: { estado: string }) {
  const map2: Record<string, string> = {
    "Pendiente": "badge-warning",
    "Confirmada": "badge-success",
    "Atendida": "badge-info",
    "Cancelada": "badge-danger",
  };
  return <span className={`badge ${map2[estado] || "badge-muted"}`}>{estado}</span>;
}

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: "Pacientes Registrados", value: "0", change: "+0 este mes", icon: <IcPatients size={22} />, bg: "#1a3a5c", color: "#fff" },
    { label: "Citas Programadas Hoy", value: "0", change: "0 pendientes", icon: <IcCalendar size={22} />, bg: "#0891b2", color: "#fff" },
    { label: "Consultas Realizadas", value: "0", change: "Hoy", icon: <IcClipboard size={22} />, bg: "#16a34a", color: "#fff" },
    { label: "Usuarios Activos", value: "0", change: "0 bloqueado", icon: <IcUsers size={22} />, bg: "#7c3aed", color: "#fff" },
    { label: "Alertas del Sistema", value: "0", change: "Requieren atención", icon: <IcAlert size={22} />, bg: "#d97706", color: "#fff" },
  ]);

  const [recentActivity, setRecentActivity] = useState<
    { time: string; action: string; user: string; type: string }[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("sami_token");
    const tokenPresent = !!token;

    // Cargar estadísticas desde el API
    if (tokenPresent) {
      fetch("http://localhost:3000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((dashboardResp) => {
          if (dashboardResp?.success) {
            setStats((prev) => [
              {
                label: "Pacientes Registrados",
                value: dashboardResp.data.totalPatients?.toString() || "0",
                change: "+" + (dashboardResp.data.newPatientsThisMonth || 0) + " este mes",
                icon: <IcPatients size={22} />,
                bg: "#1a3a5c",
                color: "#fff",
              },
              {
                label: "Citas Programadas Hoy",
                value: dashboardResp.data.todaysAppointments?.toString() || "0",
                change:
                  dashboardResp.data.pendingAppointments > 0
                    ? `${dashboardResp.data.pendingAppointments} pendientes`
                    : "0 pendientes",
                icon: <IcCalendar size={22} />,
                bg: "#0891b2",
                color: "#fff",
              },
              {
                label: "Consultas Realizadas",
                value: dashboardResp.data.totalConsultas?.toString() || "0",
                change: "Hoy",
                icon: <IcClipboard size={22} />,
                bg: "#16a34a",
                color: "#fff",
              },
              {
                label: "Usuarios Activos",
                value: dashboardResp.data.activeUsers?.toString() || "0",
                change: "",
                icon: <IcUsers size={22} />,
                bg: "#7c3aed",
                color: "#fff",
              },
              {
                label: "Alertas del Sistema",
                value: dashboardResp.data.systemAlerts?.toString() || "0",
                change: "",
                icon: <IcAlert size={22} />,
                bg: "#d97706",
                color: "#fff",
              },
            ]);
          }
        })
        .catch(() => {
          // Error calling API, keep default stats
        });
    }

    // Si no hay token, cargar datos mock iniciales
    if (!tokenPresent) {
      const mockStats = [
        { label: "Pacientes Registrados", value: "1,248", change: "+12 este mes", icon: <IcPatients size={22} />, bg: "#1a3a5c", color: "#fff" },
        { label: "Citas Programadas Hoy", value: "34", change: "7 pendientes", icon: <IcCalendar size={22} />, bg: "#0891b2", color: "#fff" },
        { label: "Consultas Realizadas", value: "18", change: "Hoy", icon: <IcClipboard size={22} />, bg: "#16a34a", color: "#fff" },
        { label: "Usuarios Activos", value: "7", change: "1 bloqueado", icon: <IcUsers size={22} />, bg: "#7c3aed", color: "#fff" },
        { label: "Alertas del Sistema", value: "3", change: "Requieren atención", icon: <IcAlert size={22} />, bg: "#d97706", color: "#fff" },
      ];
      setStats(mockStats);

      setRecentActivity([
        { time: "09:12", action: "Cita C-006 confirmada", user: "s.lopez", type: "cita" },
        { time: "09:05", action: "Nuevo paciente registrado: Carmen Sánchez R.", user: "s.lopez", type: "paciente" },
        { time: "08:45", action: "Salida farmacia: Paracetamol x 20", user: "l.torres", type: "farmacia" },
        { time: "08:30", action: "Expediente P-0002 actualizado", user: "a.castillo", type: "expediente" },
        { time: "08:15", action: "Nueva consulta registrada: José Martínez", user: "a.castillo", type: "consulta" },
        { time: "07:55", action: "Usuario mf.orta bloqueado", user: "c.ramirez", type: "usuario" },
      ]);
    }
  }, [localStorage.getItem("sami_token")]);

  const activityIcons = {
    cita: { bg: "#dbeafe", color: "#1e40af" },
    paciente: { bg: "#dcfce7", color: "#15803d" },
    farmacia: { bg: "#fef3c7", color: "#92400e" },
    expediente: { bg: "#e0f7fa", color: "#0e7490" },
    consulta: { bg: "#ede9fe", color: "#6d28d9" },
    usuario: { bg: "#fee2e2", color: "#991b1b" },
  } as const;

  type ActivityIconKey = keyof typeof activityIcons;

  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 }}>{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts section - simplified HTML/CSS grids instead of Recharts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Citas por día - simple bar chart using CSS grid */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Citas por día (semana actual)</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            marginTop: 16,
            height: 120,
          }}>
            <div style={{
              background: "#0891b2",
              height: 30,
              borderRadius: [4, 4, 0, 0].map((r) => `var(--radius-${r})`).join(" ") || "4px",
              transition: "height 0.3s",
              position: "relative",
              cursor: "pointer",
            }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "0 0 4px 4px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                24
              </span>
            </div>
            <div style={{ background: "#0891b2", height: 24, borderRadius: "4px" }}>
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                18
              </span>
            </div>
            <div style={{ background: "#6eb5d0", height: 28, borderRadius: "4px" }}>
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                21
              </span>
            </div>
            <div style={{ background: "#1a3a5c", height: 35, borderRadius: "4px" }}>
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                28
              </span>
            </div>
            <div style={{ background: "#0e4d6b", height: 30, borderRadius: "4px" }}>
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                32
              </span>
            </div>
            <div style={{ background: "#6eb5d0", height: 14, borderRadius: "4px" }}>
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                14
              </span>
            </div>
            <div style={{ background: "#1a3a5c", height: 6, borderRadius: "4px" }}>
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                6
              </span>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>
            Lun Mar Mié Jue Vie Sáb Dom
          </div>
        </div>

        {/* Consultas por área - simple pie chart using CSS */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Consultas por área</span>
          </div>
          <div style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            marginTop: 16,
            height: 100,
            justifyContent: "center",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 50, background: "#1a3a5c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>45</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 8px" }}>Medicina General</span>
            <div style={{ width: 40, height: 40, borderRadius: 50, background: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>28</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 8px" }}>Pediatría</span>
            <div style={{ width: 40, height: 40, borderRadius: 50, background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>19</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 8px" }}>Ginecología</span>
            <div style={{ width: 40, height: 40, borderRadius: 50, background: "#0e7490", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>12</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 8px" }}>Cardiología</span>
            <div style={{ width: 40, height: 40, borderRadius: 50, background: "#6d28d9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>10</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Dermatología</span>
          </div>
        </div>
      </div>

      {/* Pacientes del mes + Próximas citas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Pacientes del mes - simple line using divs */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pacientes — septiembre</span>
          </div>
          <div style={{ height: 80, display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: "#1a3a5c", borderRadius: 50 }}></div>
            <div style={{ width: 30, height: 22, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
            <div style={{ width: 30, height: 28, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
            <div style={{ width: 30, height: 35, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
            <div style={{ width: 30, height: 31, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
            <div style={{ width: 30, height: 28, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
            <div style={{ width: 30, height: 35, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
            <div style={{ width: 30, height: 31, background: "#1a3a5c", borderRadius: "0 0 50 50" }}></div>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>
            S1 S2 S3 S4
          </div>
        </div>

        {/* Próximas citas */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Próximas citas — hoy</span>
            <span style={{ fontSize: 12, color: "var(--secondary)", cursor: "pointer", fontWeight: 600 }}>Ver todas</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span className="mono" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 12 }}>09:00</span>
              <span style={{ fontWeight: 500 }}>María González Pérez</span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Dr. Hernández</span>
              <StatusBadge2 estado="Confirmada" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span className="mono" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 12 }}>10:30</span>
              <span style={{ fontWeight: 500 }}>Juan Rodríguez López</span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Dr. Martínez</span>
              <StatusBadge2 estado="Pendiente" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span className="mono" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 12 }}>11:00</span>
              <span style={{ fontWeight: 500 }}>Ana Martínez García</span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Dr. López</span>
              <StatusBadge2 estado="Confirmada" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <span className="card-title">Actividad reciente</span>
          <span style={{ fontSize: 12, color: "var(--secondary)", cursor: "pointer", fontWeight: 600 }}>Ver auditoría</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {recentActivity.map((a, i) => {
            const style = activityIcons[a.type as ActivityIconKey] || activityIcons.consulta;
            return (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "9px 0",
                borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border-light)" : "none",
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: style.bg,
                  color: style.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}>
                  {a.type === "cita" && <IcCheck size={13} />}
                  {a.type === "paciente" && <IcPatients size={13} />}
                  {a.type === "farmacia" && <IcClipboard size={13} />}
                  {a.type === "expediente" && <IcEye size={13} />}
                  {a.type === "consulta" && <IcPlus size={13} />}
                  {a.type === "usuario" && <IcUserX size={13} />}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{a.action}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>por {a.user}</span>
                </div>
                <span className="mono" style={{ color: "var(--text-muted)", fontSize: 11 }}>{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}