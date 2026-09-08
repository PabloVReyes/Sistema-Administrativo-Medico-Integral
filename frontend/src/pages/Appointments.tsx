import { useState } from "react";
import { appointments } from "../data/mock";
import { IcPlus, IcChevronRight } from "../components/Icons";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    "Confirmada": "badge-success",
    "Atendida": "badge-info",
    "Pendiente": "badge-warning",
    "Cancelada": "badge-danger",
  };
  return <span className={`badge ${map[estado] || "badge-muted"}`}>{estado}</span>;
}

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: 0, otherMonth: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, otherMonth: false });
  while (cells.length % 7 !== 0) cells.push({ day: 0, otherMonth: true });
  return cells;
}

export default function Appointments() {
  const [view, setView] = useState<"mensual" | "semanal" | "diaria">("mensual");
  const [month, setMonth] = useState(8); // September (0-indexed)
  const [year] = useState(2026);
  const [filterMedico, setFilterMedico] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [showModal, setShowModal] = useState(false);

  const calCells = buildCalendar(year, month);
  const today = 8;

  const apptDays = new Set(appointments.map(() => today));

  const filtered = appointments.filter(a =>
    (!filterMedico || a.medico.includes(filterMedico)) &&
    (!filterArea || a.area === filterArea) &&
    (!filterEstado || a.estado === filterEstado)
  );

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Citas médicas</h1>
          <p className="page-subtitle">Agenda y programación de consultas</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["mensual","semanal","diaria"] as const).map(v => (
            <button key={v} className={`btn ${view === v ? "btn-primary" : "btn-outline"}`}
              style={{ textTransform: "capitalize" }} onClick={() => setView(v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
          <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
            <IcPlus size={13} /> Nueva cita
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 600 }}>Filtros:</span>
          <select className="form-select" style={{ width: 200 }} value={filterMedico} onChange={e => setFilterMedico(e.target.value)}>
            <option value="">Todos los médicos</option>
            {[...new Set(appointments.map(a => a.medico))].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select className="form-select" style={{ width: 180 }} value={filterArea} onChange={e => setFilterArea(e.target.value)}>
            <option value="">Todas las áreas</option>
            {[...new Set(appointments.map(a => a.area))].map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <select className="form-select" style={{ width: 160 }} value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            {["Confirmada","Pendiente","Atendida","Cancelada"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn btn-outline btn-sm" onClick={() => setMonth(m => Math.max(0, m - 1))}>‹</button>
            <span style={{ fontWeight: 600, fontSize: 13.5, minWidth: 140, textAlign: "center" }}>
              {MONTHS[month]} {year}
            </span>
            <button className="btn btn-outline btn-sm" onClick={() => setMonth(m => Math.min(11, m + 1))}>›</button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
        {/* Calendar */}
        <div className="card">
          <div className="cal-grid">
            {DAYS.map(d => (
              <div key={d} className="cal-day-header">{d}</div>
            ))}
            {calCells.map((cell, i) => (
              <div
                key={i}
                className={`cal-day${cell.otherMonth ? " other-month" : ""}${!cell.otherMonth && cell.day === today ? " today" : ""}`}
              >
                {cell.day > 0 && (
                  <>
                    <span className="cal-day-num">{cell.day}</span>
                    {apptDays.has(cell.day) && !cell.otherMonth && cell.day === today && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
                        <div className="cal-event" style={{ background: "#dcfce7", color: "#15803d" }}>C-001 08:00</div>
                        <div className="cal-event" style={{ background: "#dbeafe", color: "#1e40af" }}>C-002 08:30</div>
                        <div className="cal-event" style={{ background: "#fef3c7", color: "#92400e" }}>+5 más</div>
                      </div>
                    )}
                    {[3, 10, 15, 22].includes(cell.day) && !cell.otherMonth && (
                      <div className="cal-event" style={{ background: "#e0f7fa", color: "#0e7490" }}>
                        {cell.day === 3 ? "2 citas" : cell.day === 10 ? "4 citas" : cell.day === 15 ? "3 citas" : "5 citas"}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Today's appointments */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Citas del día</span>
            <span className="badge badge-primary">8 Sep 2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(a => (
              <div key={a.id} style={{
                padding: "10px 12px", borderRadius: 8,
                border: "1px solid var(--border)",
                display: "flex", flexDirection: "column", gap: 4,
                borderLeft: `3px solid ${
                  a.estado === "Confirmada" ? "var(--success)" :
                  a.estado === "Atendida" ? "var(--info)" :
                  a.estado === "Cancelada" ? "var(--danger)" : "var(--warning)"
                }`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="mono" style={{ fontWeight: 700, color: "var(--primary)", fontSize: 13 }}>{a.hora}</span>
                  <StatusBadge estado={a.estado} />
                </div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{a.paciente}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{a.medico}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>{a.area}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nueva cita modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Nueva cita médica</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              {[
                { label: "Paciente", placeholder: "Buscar paciente..." },
                { label: "Médico", placeholder: "Seleccionar médico" },
                { label: "Área / Especialidad", placeholder: "Área" },
                { label: "Fecha", type: "date" },
                { label: "Hora", type: "time" },
                { label: "Motivo de consulta", placeholder: "Descripción breve" },
              ].map((f, i) => (
                <div className="form-group" key={i} style={i === 5 ? { gridColumn: "1/-1" } : {}}>
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" type={f.type || "text"} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                <IcPlus size={13} /> Crear cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
