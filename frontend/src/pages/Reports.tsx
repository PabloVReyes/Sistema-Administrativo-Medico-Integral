import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";
import { IcDownload, IcChart, IcFilter } from "../components/Icons";

const reportData = [
  { mes: "Ene", pacientes: 42, citas: 138, consultas: 120 },
  { mes: "Feb", pacientes: 38, citas: 125, consultas: 110 },
  { mes: "Mar", pacientes: 55, citas: 180, consultas: 165 },
  { mes: "Abr", pacientes: 48, citas: 155, consultas: 142 },
  { mes: "May", pacientes: 61, citas: 200, consultas: 185 },
  { mes: "Jun", pacientes: 52, citas: 170, consultas: 158 },
  { mes: "Jul", pacientes: 58, citas: 188, consultas: 172 },
  { mes: "Ago", pacientes: 65, citas: 210, consultas: 195 },
  { mes: "Sep", pacientes: 35, citas: 115, consultas: 105 },
];

const areaData = [
  { area: "Medicina General", consultas: 320, promDias: 1.2 },
  { area: "Pediatría", consultas: 198, promDias: 1.5 },
  { area: "Ginecología", consultas: 145, promDias: 2.1 },
  { area: "Cardiología", consultas: 87, promDias: 2.8 },
  { area: "Dermatología", consultas: 76, promDias: 1.8 },
];

export default function Reports() {
  const [tipoReporte, setTipoReporte] = useState("pacientes");
  const [fechaInicio, setFechaInicio] = useState("2026-01-01");
  const [fechaFin, setFechaFin] = useState("2026-09-08");
  const [area, setArea] = useState("");
  const [hasResults, setHasResults] = useState(false);

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Reportes institucionales</h1>
          <p className="page-subtitle">Consulta y exportación de información estadística</p>
        </div>
        <button className="btn btn-outline">
          <IcDownload size={13} /> Exportar
        </button>
      </div>

      {/* Filter card */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header" style={{ marginBottom: 14 }}>
          <span className="card-title">Parámetros del reporte</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 14 }}>
          <div>
            <label className="form-label">Fecha inicial</label>
            <input className="form-input" type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Fecha final</label>
            <input className="form-input" type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Área</label>
            <select className="form-select" value={area} onChange={e => setArea(e.target.value)}>
              <option value="">Todas</option>
              {["Medicina General","Pediatría","Ginecología","Cardiología","Dermatología","Farmacia","Urgencias"].map(a => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Médico</label>
            <select className="form-select">
              <option value="">Todos</option>
              <option>Dr. Adolfo Castillo</option>
              <option>Dra. Patricia Leal</option>
              <option>Dr. Enrique Morales</option>
            </select>
          </div>
          <div>
            <label className="form-label">Tipo de reporte</label>
            <select className="form-select" value={tipoReporte} onChange={e => setTipoReporte(e.target.value)}>
              {[
                { value: "pacientes", label: "Pacientes registrados" },
                { value: "citas", label: "Citas médicas" },
                { value: "consultas", label: "Consultas" },
                { value: "expedientes", label: "Expedientes" },
                { value: "inventario", label: "Inventario" },
                { value: "usuarios", label: "Actividad de usuarios" },
              ].map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-primary" onClick={() => setHasResults(true)}>
            <IcFilter size={13} /> Consultar
          </button>
          <button className="btn btn-secondary" onClick={() => setHasResults(true)}>
            <IcChart size={13} /> Generar reporte
          </button>
          {hasResults && (
            <button className="btn btn-outline" style={{ marginLeft: "auto" }}>
              <IcDownload size={13} /> Exportar PDF
            </button>
          )}
        </div>
      </div>

      {hasResults && (
        <>
          {/* Summary stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Pacientes registrados", value: "454" },
              { label: "Citas programadas", value: "1,481" },
              { label: "Consultas realizadas", value: "1,352" },
              { label: "Tasa de atención", value: "91.3%" },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16, marginBottom: 16 }}>
            <div className="card">
              <div className="card-header">
                <span className="card-title">Actividad mensual (2026)</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={reportData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="pacientes" stroke="#1a3a5c" strokeWidth={2} name="Pacientes" dot={false} />
                  <Line type="monotone" dataKey="citas" stroke="#0891b2" strokeWidth={2} name="Citas" dot={false} />
                  <Line type="monotone" dataKey="consultas" stroke="#16a34a" strokeWidth={2} name="Consultas" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-header">
                <span className="card-title">Consultas por área</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={areaData} layout="vertical" barSize={18}>
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="area" tick={{ fontSize: 10, fill: "#475569" }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip contentStyle={{ border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "rgba(26,58,92,0.05)" }} />
                  <Bar dataKey="consultas" name="Consultas" fill="#0891b2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Results table */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Detalle del reporte</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Ene — Sep 2026</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Pacientes</th>
                    <th>Citas</th>
                    <th>Consultas</th>
                    <th>Tasa atención</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{r.mes} 2026</td>
                      <td>{r.pacientes}</td>
                      <td>{r.citas}</td>
                      <td>{r.consultas}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{
                              width: `${Math.round(r.consultas / r.citas * 100)}%`,
                              height: "100%", background: "var(--success)", borderRadius: 3,
                            }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--success)", minWidth: 35 }}>
                            {Math.round(r.consultas / r.citas * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!hasResults && (
        <div className="card" style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
            Configure los parámetros y consulte el reporte
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Seleccione el rango de fechas, área, médico y tipo de reporte, luego haga clic en "Consultar".
          </div>
        </div>
      )}
    </div>
  );
}
