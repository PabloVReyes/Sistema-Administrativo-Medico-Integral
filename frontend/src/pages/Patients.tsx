import { useState, useEffect } from "react";
import { IcSearch, IcPlus, IcEye, IcEdit, IcTrash, IcClipboard, IcFilter } from "../components/Icons";
import { getPatientsApi } from "../services/api";

interface PatientsProps {
  onNewPatient: () => void;
  onViewRecord: (id: string) => void;
}

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    "Confirmada": "badge-success",
    "Atendida": "badge-info",
    "Pendiente": "badge-warning",
    "Cancelada": "badge-danger",
  };
  const className = map[estado] || "badge-muted";
  return <span className={`badge ${className}`}>{estado}</span>;
}

function SexoBadge({ sexo }: { sexo: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "F": { bg: "#fce7f3", color: "#9d174d" },
    "M": { bg: "#dbeafe", color: "#1e40af" },
  };
  const style = map[sexo] || { bg: "var(--border-light)", color: "var(--text-muted)" };
  return <span style={{ display: "inline-block", width: 24, height: 24, borderRadius: 6, textAlign: "center", lineHeight: "24px", fontSize: 11, fontWeight: 700, background: style.bg, color: style.color }}>{sexo}</span>;
}

export default function Patients({ onNewPatient, onViewRecord }: PatientsProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterSexo, setFilterSexo] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar pacientes del API
    const token = localStorage.getItem("sami_token");
    if (token) {
      fetch("http://localhost:3000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setPatients(data.data);
          } else {
            setPatients([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setPatients([]);
          setLoading(false);
        });
    } else {
      setPatients([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Si no hay token, cargar datos mock iniciales para mostrar algo
    if (!localStorage.getItem("sami_token")) {
      // Datos mock temporales mientras no hay autenticación
      const mockPatients = [
        { id: "P-001", nombre: "María González Pérez", curp: "GUPM850412MHRSRL04", sexo: "F", telefono: "5551234567", nacimiento: "12/05/1985", registro: "01/01/2024", estado: "Activo" },
        { id: "P-002", nombre: "Juan Rodríguez López", curp: "ROJJ900620HNRLRC09", sexo: "M", telefono: "5559876543", nacimiento: "23/08/1990", registro: "15/03/2024", estado: "Activo" },
        { id: "P-003", nombre: "Carlos Martínez Rodríguez", curp: "MARR010105HNRLRC17", sexo: "M", telefono: "5557894561", nacimiento: "01/02/1988", registro: "20/02/2024", estado: "Inactivo" },
        { id: "P-004", nombre: "Ana Martínez García", curp: "GARM920512MWQRRL08", sexo: "F", telefono: "5556543210", nacimiento: "18/11/1992", registro: "10/01/2024", estado: "Activo" },
        { id: "P-005", nombre: "Laura Sánchez Torres", curp: "SANL980320HNRLRC23", sexo: "F", telefono: "5553216549", nacimiento: "30/07/1998", registro: "05/04/2024", estado: "Activo" },
      ];
      setPatients(mockPatients);
      setLoading(false);
    }
  }, []);

  const filtered = patients.filter(p => {
    const q = search.toLowerCase();
    return (
      (p.nombre.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.curp.toLowerCase().includes(q)) &&
      (!filterSexo || p.sexo === filterSexo) &&
      (!filterEstado || p.estado === filterEstado)
    );
  });

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Pacientes</h1>
          <p className="page-subtitle">{patients.length} pacientes registrados en el sistema</p>
        </div>
        <button className="btn btn-primary" onClick={onNewPatient}>
          <IcPlus /> Nuevo paciente
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="search-bar">
            <IcSearch />
            <input
              className="search-input"
              placeholder="Buscar por nombre, ID, CURP..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IcFilter size={14} style={{ color: "var(--text-muted)" }} />
            <select className="form-select" style={{ width: 120 }} value={filterSexo} onChange={e => setFilterSexo(e.target.value)}>
              <option value="">Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <select className="form-select" style={{ width: 130 }} value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
              <option value="">Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--text-muted)" }}>
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre completo</th>
                <th>F. Nacimiento</th>
                <th>Sexo</th>
                <th>Teléfono</th>
                <th>CURP</th>
                <th>F. Registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{p.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{p.nacimiento}</td>
                  <td>
                    <SexoBadge sexo={p.sexo} />
                  </td>
                  <td className="mono" style={{ fontSize: 12.5 }}>{p.telefono}</td>
                  <td><span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{p.curp}</span></td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{p.registro}</td>
                  <td>
                    <span className={`badge ${p.estado === "Activo" ? "badge-success" : "badge-muted"}`}>
                      {p.estado}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="Ver"><IcEye /></button>
                      <button className="btn-icon" title="Editar"><IcEdit /></button>
                      <button className="btn-icon" title="Ver expediente" onClick={() => onViewRecord?.(p.id)}>
                        <IcClipboard />
                      </button>
                      <button
                        className="btn-icon"
                        title="Eliminar"
                        style={{ color: "var(--danger)" }}
                        onClick={() => setDeleteModal(p.id)}
                      >
                        <IcTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                    No se encontraron pacientes con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
            Mostrando {filtered.length} de {patients.length} pacientes
          </div>
          <div className="pagination">
            {[1, 2, 3, "...", 8].map((p, i) => (
              <button
                key={i}
                className={`page-btn${p === page ? " active" : ""}`}
                onClick={() => typeof p === "number" && setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "var(--danger-light)", margin: "0 auto 14px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IcTrash size={22} style={{ color: "var(--danger)" }} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                Eliminar paciente
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 13.5 }}>
                ¿Está seguro que desea eliminar el paciente <strong>{deleteModal}</strong>? Esta acción no puede deshacerse.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="btn btn-outline" onClick={() => setDeleteModal(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={() => setDeleteModal(null)}>
                <IcTrash size={13} /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}