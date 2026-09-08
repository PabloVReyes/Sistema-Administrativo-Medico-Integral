import { useState } from "react";
import { backups } from "../data/mock";
import { IcDatabase, IcDownload, IcRefresh, IcAlert, IcCheck } from "../components/Icons";

export default function Backups() {
  const [showRestoreModal, setShowRestoreModal] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => { setCreating(false); setCreated(true); setTimeout(() => setCreated(false), 3000); }, 2000);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Gestión de respaldos</h1>
          <p className="page-subtitle">Copias de seguridad de la base de datos del sistema</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>
          {creating ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff", borderRadius: "50%",
                animation: "spin 0.7s linear infinite", display: "inline-block",
              }} />
              Creando...
            </span>
          ) : (
            <><IcDatabase size={13} /> Crear respaldo</>
          )}
        </button>
      </div>

      {created && (
        <div className="alert alert-success" style={{ marginBottom: 16 }}>
          <IcCheck size={14} /> Respaldo creado exitosamente. Tamaño: 2.4 GB.
        </div>
      )}

      {/* Info cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Último respaldo", value: "Hace 7 hrs", sub: "2026-09-08 02:00", color: "var(--success)", bg: "var(--success-light)" },
          { label: "Total de respaldos", value: `${backups.length}`, sub: "Almacenados en sistema", color: "var(--primary)", bg: "var(--primary-light)" },
          { label: "Espacio total", value: "13.6 GB", sub: "Capacidad total: 50 GB", color: "var(--secondary)", bg: "var(--secondary-light)" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <IcDatabase size={20} style={{ color: s.color }} />
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: 20 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Historial de respaldos</span>
          <div style={{ display: "flex", gap: 6 }}>
            <select className="form-select" style={{ width: 130, padding: "5px 28px 5px 10px", fontSize: 12 }}>
              <option>Todos los tipos</option>
              <option>Automático</option>
              <option>Manual</option>
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha y hora</th>
                <th>Tipo</th>
                <th>Tamaño</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b, i) => (
                <tr key={i}>
                  <td><span className="mono" style={{ fontSize: 12.5 }}>{b.fecha}</span></td>
                  <td>
                    <span className={`badge ${b.tipo === "Manual" ? "badge-primary" : "badge-muted"}`}>
                      {b.tipo}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{b.tamaño}</td>
                  <td>
                    <span className={`badge ${
                      b.estado === "Completado" ? "badge-success" : "badge-danger"
                    }`}>
                      {b.estado === "Completado" ? <IcCheck size={10} /> : <IcAlert size={10} />}
                      {" "}{b.estado}
                    </span>
                  </td>
                  <td><span className="mono" style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{b.responsable}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-outline btn-sm">
                        <IcDownload size={12} /> Descargar
                      </button>
                      {b.estado === "Completado" && (
                        <button
                          className="btn btn-sm"
                          style={{ background: "var(--warning-light)", color: "var(--warning)", border: "1px solid #fde68a" }}
                          onClick={() => setShowRestoreModal(b.fecha)}
                        >
                          <IcRefresh size={12} /> Restaurar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore confirmation modal */}
      {showRestoreModal && (
        <div className="modal-overlay" onClick={() => setShowRestoreModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "var(--warning-light)", margin: "0 auto 14px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IcAlert size={26} style={{ color: "var(--warning)" }} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
                ⚠️ Advertencia: Restaurar respaldo
              </h3>
              <div className="alert alert-warning" style={{ textAlign: "left", marginBottom: 12 }}>
                <IcAlert size={13} />
                <span>Esta operación <strong>reemplazará todos los datos actuales</strong> del sistema con los del respaldo seleccionado. Esta acción no puede deshacerse.</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>
                <strong>Respaldo a restaurar:</strong>
              </p>
              <span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{showRestoreModal}</span>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="btn btn-outline" onClick={() => setShowRestoreModal(null)} style={{ flex: 1 }}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={() => setShowRestoreModal(null)} style={{ flex: 1 }}>
                <IcRefresh size={12} /> Confirmar restauración
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
