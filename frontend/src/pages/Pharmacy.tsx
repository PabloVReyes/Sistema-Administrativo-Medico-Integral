import { useState } from "react";
import { pharmacy } from "../data/mock";
import { IcSearch, IcPlus, IcAlert, IcEdit } from "../components/Icons";

function StockBadge({ estado }: { estado: string }) {
  const map: Record<string, { cls: string; icon?: boolean }> = {
    "Disponible": { cls: "badge-success" },
    "Stock Bajo": { cls: "badge-warning", icon: true },
    "Agotado": { cls: "badge-danger", icon: true },
    "Por Caducar": { cls: "badge-warning", icon: true },
  };
  const s = map[estado] || { cls: "badge-muted" };
  return (
    <span className={`badge ${s.cls}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {s.icon && <IcAlert size={10} />}
      {estado}
    </span>
  );
}

export default function Pharmacy() {
  const [search, setSearch] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [modalType, setModalType] = useState<"nuevo" | "entrada" | "salida" | null>(null);

  const filtered = pharmacy.filter(p =>
    (p.producto.toLowerCase().includes(search.toLowerCase()) || p.codigo.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategoria || p.categoria === filterCategoria) &&
    (!filterEstado || p.estado === filterEstado)
  );

  const alertas = pharmacy.filter(p => p.estado !== "Disponible");

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Farmacia e inventario</h1>
          <p className="page-subtitle">{pharmacy.length} productos registrados</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={() => setModalType("entrada")}>+ Entrada</button>
          <button className="btn btn-outline" onClick={() => setModalType("salida")}>– Salida</button>
          <button className="btn btn-primary" onClick={() => setModalType("nuevo")}>
            <IcPlus /> Nuevo producto
          </button>
        </div>
      </div>

      {/* Alerts */}
      {alertas.length > 0 && (
        <div className="alert alert-warning" style={{ marginBottom: 16 }}>
          <IcAlert size={14} />
          <span>
            <strong>{alertas.length} alertas de inventario:</strong>{" "}
            {alertas.map(a => `${a.producto} (${a.estado})`).join(" · ")}
          </span>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total de productos", value: pharmacy.length, color: "var(--primary)", bg: "var(--primary-light)" },
          { label: "Disponibles", value: pharmacy.filter(p => p.estado === "Disponible").length, color: "var(--success)", bg: "var(--success-light)" },
          { label: "Stock bajo / Agotado", value: pharmacy.filter(p => ["Stock Bajo","Agotado"].includes(p.estado)).length, color: "var(--danger)", bg: "var(--danger-light)" },
          { label: "Por caducar", value: pharmacy.filter(p => p.estado === "Por Caducar").length, color: "var(--warning)", bg: "var(--warning-light)" },
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
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="search-bar">
            <IcSearch />
            <input className="search-input" placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: 160 }} value={filterCategoria} onChange={e => setFilterCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            {[...new Set(pharmacy.map(p => p.categoria))].map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="form-select" style={{ width: 160 }} value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            {["Disponible","Stock Bajo","Agotado","Por Caducar"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Existencias</th>
                <th>Unidad</th>
                <th>Lote</th>
                <th>Caducidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.codigo} style={{
                  background: p.estado === "Agotado" ? "rgba(220,38,38,0.03)" :
                    p.estado === "Stock Bajo" ? "rgba(217,119,6,0.03)" : undefined,
                }}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 12 }}>{p.codigo}</span></td>
                  <td style={{ fontWeight: 500 }}>{p.producto}</td>
                  <td><span className="badge badge-muted">{p.categoria}</span></td>
                  <td>
                    <span style={{
                      fontWeight: 700, fontSize: 14,
                      color: p.estado === "Agotado" ? "var(--danger)" :
                        p.estado === "Stock Bajo" ? "var(--warning)" : "var(--text)",
                    }}>
                      {p.existencias}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{p.unidad}</td>
                  <td><span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{p.lote}</span></td>
                  <td>
                    <span className="mono" style={{
                      fontSize: 12,
                      color: p.estado === "Por Caducar" ? "var(--warning)" : "var(--text-secondary)",
                      fontWeight: p.estado === "Por Caducar" ? 600 : 400,
                    }}>
                      {p.caducidad}
                    </span>
                  </td>
                  <td><StockBadge estado={p.estado} /></td>
                  <td>
                    <button className="btn-icon"><IcEdit size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="modal-title">
              {modalType === "nuevo" ? "Nuevo producto" : modalType === "entrada" ? "Registrar entrada" : "Registrar salida"}
            </div>
            {modalType === "nuevo" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                {["Código", "Producto", "Categoría", "Unidad", "Existencias iniciales", "Lote", "Fecha de caducidad", "Proveedor"].map((f, i) => (
                  <div key={i} className="form-group" style={i < 2 ? { gridColumn: "1/-1" } : {}}>
                    <label className="form-label">{f}</label>
                    <input className="form-input" placeholder={f} type={f.includes("Fecha") ? "date" : "text"} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label className="form-label">Producto</label>
                  <select className="form-select">
                    <option>Seleccionar producto</option>
                    {pharmacy.map(p => <option key={p.codigo}>{p.producto}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cantidad</label>
                  <input className="form-input" type="number" placeholder="0" min="1" />
                </div>
                <div className="form-group">
                  <label className="form-label">Observaciones</label>
                  <input className="form-input" placeholder="Motivo de la operación" />
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-outline" onClick={() => setModalType(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setModalType(null)}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
