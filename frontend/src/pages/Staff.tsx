import { useState } from "react";
import { staff } from "../data/mock";
import { IcSearch, IcPlus, IcEye, IcEdit, IcFilter } from "../components/Icons";

export default function Staff() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = staff.filter(s =>
    s.nombre.toLowerCase().includes(search.toLowerCase()) ||
    s.puesto.toLowerCase().includes(search.toLowerCase()) ||
    s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Personal</h1>
          <p className="page-subtitle">{staff.length} miembros del personal registrados</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <IcPlus /> Registrar personal
        </button>
      </div>

      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div className="search-bar">
            <IcSearch />
            <input
              className="search-input"
              placeholder="Buscar personal..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="form-select" style={{ width: 160 }}>
            <option>Todas las áreas</option>
            {[...new Set(staff.map(s => s.area))].map(a => <option key={a}>{a}</option>)}
          </select>
          <select className="form-select" style={{ width: 130 }}>
            <option>Todos los puestos</option>
            <option>Médico</option>
            <option>Enfermero/a</option>
            <option>Farmacéutico</option>
            <option>Administrativo</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre completo</th>
                <th>Puesto</th>
                <th>Área</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{s.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{s.nombre}</td>
                  <td>
                    <span className="badge badge-primary">{s.puesto}</span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{s.area}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{s.especialidad}</td>
                  <td className="mono" style={{ fontSize: 12.5 }}>{s.telefono}</td>
                  <td style={{ fontSize: 12.5, color: "var(--secondary)" }}>{s.correo}</td>
                  <td>
                    <span className={`badge ${s.estado === "Activo" ? "badge-success" : "badge-muted"}`}>
                      {s.estado}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="Ver"><IcEye /></button>
                      <button className="btn-icon" title="Editar"><IcEdit /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Registrar personal</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              {[
                "Nombre(s)", "Apellido paterno", "Apellido materno", "Puesto",
                "Área", "Especialidad", "Teléfono", "Correo institucional",
              ].map((label, i) => (
                <div className="form-group" key={i}>
                  <label className="form-label">{label}</label>
                  <input className="form-input" placeholder={label} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
