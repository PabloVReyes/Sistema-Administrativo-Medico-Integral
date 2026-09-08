import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { appointments, recentActivity, dashboardChartData } from "../data/mock";
import { IcPatients, IcCalendar, IcClipboard, IcUsers, IcAlert, IcCheck } from "../components/Icons";

const PIE_COLORS = ["#1a3a5c", "#0891b2", "#0e4d6b", "#6eb5d0", "#c3dde9"];

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    "Confirmada": "badge-success",
    "Atendida": "badge-info",
    "Pendiente": "badge-warning",
    "Cancelada": "badge-danger",
  };
  return <span className={`badge ${map[estado] || "badge-muted"}`}>{estado}</span>;
}

const activityIcons: Record<string, { bg: string; color: string }> = {
  cita: { bg: "#dbeafe", color: "#1e40af" },
  paciente: { bg: "#dcfce7", color: "#15803d" },
  farmacia: { bg: "#fef3c7", color: "#92400e" },
  expediente: { bg: "#e0f7fa", color: "#0e7490" },
  consulta: { bg: "#ede9fe", color: "#6d28d9" },
  usuario: { bg: "#fee2e2", color: "#991b1b" },
};

export default function Dashboard() {
  const stats = [
    { label: "Pacientes Registrados", value: "1,248", change: "+12 este mes", icon: <IcPatients size={22} />, bg: "#1a3a5c", color: "#fff" },
    { label: "Citas Programadas Hoy", value: "34", change: "7 pendientes", icon: <IcCalendar size={22} />, bg: "#0891b2", color: "#fff" },
    { label: "Consultas Realizadas", value: "18", change: "Hoy", icon: <IcClipboard size={22} />, bg: "#16a34a", color: "#fff" },
    { label: "Usuarios Activos", value: "7", change: "1 bloqueado", icon: <IcUsers size={22} />, bg: "#7c3aed", color: "#fff" },
    { label: "Alertas del Sistema", value: "3", change: "Requieren atención", icon: <IcAlert size={22} />, bg: "#d97706", color: "#fff" },
  ];

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

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Citas por día */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Citas por día (semana actual)</span>
            <select className="form-select" style={{ width: "auto", padding: "4px 28px 4px 8px", fontSize: 12 }}>
              <option>Esta semana</option>
              <option>Semana pasada</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dashboardChartData.citasPorDia} barSize={28}>
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, background: "#fff" }}
                cursor={{ fill: "rgba(26,58,92,0.05)" }}
              />
              <Bar dataKey="citas" name="Citas" fill="#0891b2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Consultas por área */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Consultas por área</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={dashboardChartData.consultasPorArea}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="consultas"
                nameKey="area"
              >
                {dashboardChartData.consultasPorArea.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, background: "#fff" }}
                formatter={(v, n) => [v, n]}
              />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pacientes del mes + Próximas citas row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginBottom: 24 }}>
        {/* Pacientes del mes */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pacientes — septiembre</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={dashboardChartData.pacientesMes}>
              <XAxis dataKey="semana" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="pacientes" stroke="#1a3a5c" strokeWidth={2.5} dot={{ r: 4, fill: "#1a3a5c" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Próximas citas */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Próximas citas — hoy</span>
            <span style={{ fontSize: 12, color: "var(--secondary)", cursor: "pointer", fontWeight: 600 }}>Ver todas</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Área</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((a) => (
                  <tr key={a.id}>
                    <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{a.hora}</span></td>
                    <td style={{ fontWeight: 500 }}>{a.paciente}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{a.medico}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{a.area}</td>
                    <td><StatusBadge estado={a.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Actividad reciente</span>
          <span style={{ fontSize: 12, color: "var(--secondary)", cursor: "pointer", fontWeight: 600 }}>Ver auditoría</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {recentActivity.map((a, i) => {
            const style = activityIcons[a.type] || activityIcons.consulta;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "9px 0",
                borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border-light)" : "none",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: style.bg, color: style.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IcCheck size={13} />
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
