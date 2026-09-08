import { useState } from "react";
import { users } from "../data/mock";
import { IcSearch, IcPlus, IcEdit, IcLock, IcKey, IcFilter } from "../components/Icons";

function RoleBadge({ rol }: { rol: string }) {
  const map: Record<string, string> = {
    "Administrador": "badge-danger",
    "Médico": "badge-info",
    "Enfermería": "badge-success",
    "Recepción": "badge-primary",
    "Farmacia": "badge-warning",
    "TI": "badge-muted",
    "Dirección": "badge-danger",
  };
  return <span className={`badge ${map[rol] || "badge-muted"}`}>{rol}</span>;
}

function EstadoBadge({ estado }: { estado: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: estado === "Activo" ? "var(--success)" : estado === "Bloqueado" ? "var(--danger)" : "var(--text-muted)",
      }} />
      <span style={{
        fontSize: 12.5, fontWeight: 500,
        color: estado === "Activo" ? "var(--success)" : estado === "Bloqueado" ? "var(--danger)" : "var(--text-muted)",
      }}>{estado}</span>
    </div>
  );
}

export default function Users() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [blockModal, setBlockModal] = useState<string | null>(null);

  const filtered = users.filter(u =>
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.usuario.toLowerCase().includes(search.toLowerCase()) ||
    u.rol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Usuarios del sistema</h1>
          <p className="page-subtitle">Gestión de acceso y credenciales</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <IcPlus /> Nuevo usuario
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Usuarios activos", value: users.filter(u => u.estado === "Activo").length, color: "var(--success)", bg: "var(--success-light)" },
          { label: "Usuarios bloqueados", value: users.filter(u => u.estado === "Bloqueado").length, color: "var(--danger)", bg: "var(--danger-light)" },
          { label: "Total de usuarios", value: users.length, color: "var(--primary)", bg: "var(--primary-light)" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div className="search-bar">
            <IcSearch />
            <input className="search-input" placeholder="Buscar usuarios..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: 160 }}>
            <option>Todos los roles</option>
            {["Administrador","Médico","Enfermería","Recepción","Farmacia","TI"].map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="form-select" style={{ width: 140 }}>
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Bloqueado</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Área</th>
                <th>Último acceso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 12 }}>{u.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{u.nombre}</td>
                  <td><span className="mono" style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{u.usuario}</span></td>
                  <td><RoleBadge rol={u.rol} /></td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{u.area}</td>
                  <td><span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{u.ultimo}</span></td>
                  <td><EstadoBadge estado={u.estado} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="Editar"><IcEdit /></button>
                      <button className="btn-icon" title={u.estado === "Bloqueado" ? "Desbloquear" : "Bloquear"}
                        onClick={() => setBlockModal(u.usuario)}
                        style={{ color: u.estado === "Bloqueado" ? "var(--success)" : "var(--warning)" }}>
                        <IcLock />
                      </button>
                      <button className="btn-icon" title="Restablecer contraseña"><IcKey /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New user modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Nuevo usuario</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              {[
                { label: "Nombre completo" }, { label: "Usuario" },
                { label: "Correo electrónico", col: "1/-1" as const }, { label: "Contraseña inicial" },
                { label: "Confirmar contraseña" }, { label: "Rol" }, { label: "Área" },
              ].map((f, i) => (
                <div key={i} className="form-group" style={f.col ? { gridColumn: f.col } : {}}>
                  <label className="form-label">{f.label}</label>
                  {f.label === "Rol" || f.label === "Área" ? (
                    <select className="form-select">
                      <option>Seleccionar...</option>
                      {f.label === "Rol" && ["Administrador","Médico","Enfermería","Recepción","Farmacia","TI"].map(r => <option key={r}>{r}</option>)}
                    </select>
                  ) : (
                    <input className="form-input" type={f.label.toLowerCase().includes("contraseña") ? "password" : "text"} placeholder={f.label} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Crear usuario</button>
            </div>
          </div>
        </div>
      )}

      {/* Block confirm modal */}
      {blockModal && (
        <div className="modal-overlay" onClick={() => setBlockModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: "var(--warning-light)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
              }}>
                <IcLock size={20} style={{ color: "var(--warning)" }} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                Bloquear usuario
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
                ¿Desea bloquear al usuario <strong>{blockModal}</strong>? No podrá iniciar sesión hasta que sea desbloqueado.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button className="btn btn-outline" onClick={() => setBlockModal(null)}>Cancelar</button>
                <button className="btn" style={{ background: "var(--warning)", color: "#fff" }} onClick={() => setBlockModal(null)}>
                  <IcLock size={12} /> Bloquear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
