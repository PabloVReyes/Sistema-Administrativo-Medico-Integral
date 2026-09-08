import { useState } from "react";
import { auditLog } from "../data/mock";
import { IcSearch, IcCheck, IcX, IcDownload } from "../components/Icons";

export default function Audit() {
  const [search, setSearch] = useState("");
  const [filterModulo, setFilterModulo] = useState("");
  const [filterResultado, setFilterResultado] = useState("");

  const filtered = auditLog.filter(a =>
    (a.usuario.toLowerCase().includes(search.toLowerCase()) || a.accion.toLowerCase().includes(search.toLowerCase())) &&
    (!filterModulo || a.modulo === filterModulo) &&
    (!filterResultado || a.resultado === filterResultado)
  );

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Auditoría del sistema</h1>
          <p className="page-subtitle">Registro de todas las actividades realizadas</p>
        </div>
        <button className="btn btn-outline"><IcDownload size={13} /> Exportar</button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total de eventos", value: auditLog.length, color: "var(--primary)", bg: "var(--primary-light)" },
          { label: "Exitosos", value: auditLog.filter(a => a.resultado === "Éxito").length, color: "var(--success)", bg: "var(--success-light)" },
          { label: "Rechazados", value: auditLog.filter(a => a.resultado === "Rechazado").length, color: "var(--danger)", bg: "var(--danger-light)" },
          { label: "Usuarios activos hoy", value: new Set(auditLog.map(a => a.usuario)).size, color: "var(--secondary)", bg: "var(--secondary-light)" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</span>
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="search-bar">
            <IcSearch />
            <input className="search-input" placeholder="Buscar usuario o acción..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div>
            <label className="form-label" style={{ marginBottom: 0, marginRight: 6 }}>Desde</label>
            <input className="form-input" type="date" defaultValue="2026-09-08" style={{ width: 150, display: "inline-block" }} />
          </div>
          <div>
            <label className="form-label" style={{ marginBottom: 0, marginRight: 6 }}>Hasta</label>
            <input className="form-input" type="date" defaultValue="2026-09-08" style={{ width: 150, display: "inline-block" }} />
          </div>
          <select className="form-select" style={{ width: 160 }} value={filterModulo} onChange={e => setFilterModulo(e.target.value)}>
            <option value="">Todos los módulos</option>
            {[...new Set(auditLog.map(a => a.modulo))].map(m => <option key={m}>{m}</option>)}
          </select>
          <select className="form-select" style={{ width: 150 }} value={filterResultado} onChange={e => setFilterResultado(e.target.value)}>
            <option value="">Todos los resultados</option>
            <option value="Éxito">Éxito</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha y hora</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Acción</th>
                <th>Módulo</th>
                <th>Dirección IP</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i}>
                  <td><span className="mono" style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>{a.fecha}</span></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: "var(--primary-light)", color: "var(--primary)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 700,
                      }}>
                        {a.usuario.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="mono" style={{ fontSize: 12.5, fontWeight: 500 }}>{a.usuario}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-muted">{a.rol}</span></td>
                  <td style={{ fontWeight: 500, fontSize: 13 }}>{a.accion}</td>
                  <td><span className="badge badge-primary">{a.modulo}</span></td>
                  <td><span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{a.ip}</span></td>
                  <td>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: a.resultado === "Éxito" ? "var(--success-light)" : "var(--danger-light)",
                      color: a.resultado === "Éxito" ? "#15803d" : "#991b1b",
                    }}>
                      {a.resultado === "Éxito" ? <IcCheck size={11} /> : <IcX size={11} />}
                      {a.resultado}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
            Mostrando {filtered.length} de {auditLog.length} registros
          </div>
          <div className="pagination">
            {[1, 2, 3, "...", 12].map((p, i) => (
              <button key={i} className={`page-btn${p === 1 ? " active" : ""}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
