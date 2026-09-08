import { useState } from "react";
import { IcCheck } from "../components/Icons";

const roles = ["Administrador", "Médico", "Enfermería", "Recepción", "Farmacia", "Dirección", "TI"];
const permisos = ["Consultar", "Crear", "Editar", "Eliminar", "Exportar", "Administrar"];

const defaultMatrix: Record<string, Record<string, boolean>> = {
  "Administrador": { Consultar: true, Crear: true, Editar: true, Eliminar: true, Exportar: true, Administrar: true },
  "Médico": { Consultar: true, Crear: true, Editar: true, Eliminar: false, Exportar: true, Administrar: false },
  "Enfermería": { Consultar: true, Crear: true, Editar: true, Eliminar: false, Exportar: false, Administrar: false },
  "Recepción": { Consultar: true, Crear: true, Editar: false, Eliminar: false, Exportar: false, Administrar: false },
  "Farmacia": { Consultar: true, Crear: true, Editar: true, Eliminar: false, Exportar: true, Administrar: false },
  "Dirección": { Consultar: true, Crear: false, Editar: false, Eliminar: false, Exportar: true, Administrar: false },
  "TI": { Consultar: true, Crear: true, Editar: true, Eliminar: true, Exportar: true, Administrar: true },
};

const roleColors: Record<string, string> = {
  "Administrador": "#dc2626",
  "Médico": "#0284c7",
  "Enfermería": "#16a34a",
  "Recepción": "#1a3a5c",
  "Farmacia": "#d97706",
  "Dirección": "#7c3aed",
  "TI": "#475569",
};

export default function Roles() {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [saved, setSaved] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const toggle = (rol: string, permiso: string) => {
    setMatrix(m => ({
      ...m,
      [rol]: { ...m[rol], [permiso]: !m[rol][permiso] },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Roles y permisos</h1>
          <p className="page-subtitle">Matriz de control de acceso por rol</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <IcCheck size={13} /> Guardar cambios
        </button>
      </div>

      {saved && (
        <div className="alert alert-success" style={{ marginBottom: 16 }}>
          <IcCheck size={14} /> Permisos guardados exitosamente.
        </div>
      )}

      {/* Role cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 20 }}>
        {roles.map(rol => (
          <div
            key={rol}
            onClick={() => setSelectedRole(selectedRole === rol ? null : rol)}
            style={{
              padding: "12px 8px", borderRadius: 8, cursor: "pointer",
              textAlign: "center", border: `2px solid ${selectedRole === rol ? roleColors[rol] : "var(--border)"}`,
              background: selectedRole === rol ? `${roleColors[rol]}12` : "#fff",
              transition: "all 0.15s",
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: roleColors[rol], color: "#fff",
              margin: "0 auto 6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
            }}>
              {rol.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>{rol}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>
              {Object.values(matrix[rol]).filter(Boolean).length}/{permisos.length} permisos
            </div>
          </div>
        ))}
      </div>

      {/* Permission matrix */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Matriz de permisos</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Haga clic en una casilla para cambiar el permiso
          </span>
        </div>
        <div className="table-wrap">
          <table className="perm-matrix">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 160 }}>Permiso</th>
                {roles.map(rol => (
                  <th key={rol} style={{ minWidth: 100 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: roleColors[rol], color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, fontWeight: 700,
                      }}>
                        {rol.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontSize: 10.5, fontWeight: 600 }}>{rol}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permisos.map(permiso => (
                <tr key={permiso}>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{permiso}</td>
                  {roles.map(rol => (
                    <td key={rol} style={{ textAlign: "center" }}>
                      <div
                        onClick={() => toggle(rol, permiso)}
                        style={{
                          width: 28, height: 28, borderRadius: 6, cursor: "pointer",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          border: `2px solid ${matrix[rol][permiso] ? roleColors[rol] : "var(--border)"}`,
                          background: matrix[rol][permiso] ? `${roleColors[rol]}15` : "#fff",
                          transition: "all 0.1s",
                        }}
                      >
                        {matrix[rol][permiso] && (
                          <IcCheck size={13} style={{ color: roleColors[rol] }} />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 600 }}>Leyenda:</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#dcfce7", border: "2px solid #16a34a" }} />
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Permiso habilitado</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#fff", border: "2px solid var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Permiso deshabilitado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
