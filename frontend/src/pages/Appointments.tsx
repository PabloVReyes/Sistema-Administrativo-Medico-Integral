import { useState, useEffect } from "react";
import { IcSearch, IcPlus, IcEdit, IcTrash, IcCalendar, IcEye, IcFilter } from "../components/Icons";
import { getAppointmentsApi, createAppointmentApi, updateAppointmentApi } from "../services/api";

interface AppointmentsProps {
  onNewPatient: () => void;
  onViewRecord: () => void;
}

function EstadoCitaBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    "Pendiente": "badge-warning",
    "Confirmada": "badge-success",
    "Atendida": "badge-info",
    "Cancelada": "badge-danger",
  };
  return <span className={`badge ${map[estado] || "badge-muted"}`}>{estado}</span>;
}

export default function Appointments({ onNewPatient, onViewRecord }: AppointmentsProps) {
  // FILTROS PRIMEROS - los hooks de React deben estar en orden consistente
  const [filterMedico, setFilterMedico] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Cargar citas del API (o datos mock si no hay token)
  useEffect(() => {
    const token = localStorage.getItem("sami_token");
    if (token) {
      fetch("http://localhost:3000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Respuesta API citas:", data);
          if (data && data.success && data.data && Array.isArray(data.data)) {
            setAppointments(data.data);
          } else {
            // Fallback a datos mock si la API no devuelve datos esperados
            const mockAppointments = [
              { id: "C-001", paciente: "María González Pérez", medico: "Dr. Hernández", fecha: "2024-01-15", hora: "09:00", area: "Medicina General", estado: "Confirmada" },
              { id: "C-002", paciente: "Juan Rodríguez López", medico: "Dr. Martínez", fecha: "2024-01-15", hora: "10:30", area: "Pediatría", estado: "Pendiente" },
              { id: "C-003", paciente: "Carlos Martínez", medico: "Dr. López", fecha: "2024-01-15", hora: "11:00", area: "Ginecología", estado: "Confirmada" },
              { id: "C-004", paciente: "Laura Sánchez", medico: "Dr. Hernández", fecha: "2024-01-16", hora: "08:00", area: "Medicina General", estado: "Pendiente" },
              { id: "C-005", paciente: "Pedro Gómez", medico: "Dr. Martínez", fecha: "2024-01-16", hora: "14:30", area: "Pediatría", estado: "Confirmada" },
            ];
            setAppointments(mockAppointments);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error cargando citas:", error);
          // Fallback a datos mock en caso de error
          const mockAppointments = [
            { id: "C-001", paciente: "María González Pérez", medico: "Dr. Hernández", fecha: "2024-01-15", hora: "09:00", area: "Medicina General", estado: "Confirmada" },
            { id: "C-002", paciente: "Juan Rodríguez López", medico: "Dr. Martínez", fecha: "2024-01-15", hora: "10:30", area: "Pediatría", estado: "Pendiente" },
          ];
          setAppointments(mockAppointments);
          setLoading(false);
        });
    } else {
      // Sin token: cargar datos mock inmediatamente
      const mockAppointments = [
        { id: "C-001", paciente: "María González Pérez", medico: "Dr. Hernández", fecha: "2024-01-15", hora: "09:00", area: "Medicina General", estado: "Confirmada" },
        { id: "C-002", paciente: "Juan Rodríguez López", medico: "Dr. Martínez", fecha: "2024-01-15", hora: "10:30", area: "Pediatría", estado: "Pendiente" },
        { id: "C-003", paciente: "Carlos Martínez", medico: "Dr. López", fecha: "2024-01-15", hora: "11:00", area: "Ginecología", estado: "Confirmada" },
        { id: "C-004", paciente: "Laura Sánchez", medico: "Dr. Hernández", fecha: "2024-01-16", hora: "08:00", area: "Medicina General", estado: "Pendiente" },
        { id: "C-005", paciente: "Pedro Gómez", medico: "Dr. Martínez", fecha: "2024-01-16", hora: "14:30", area: "Pediatría", estado: "Confirmada" },
      ];
      setAppointments(mockAppointments);
      setLoading(false);
    }
  }, []);

  // 2. Computar citas filtradas DESPUÉS de tener los estados de filtro
  const filtered = appointments.filter(a => {
    const q = search.toLowerCase();
    return (
      (a.paciente.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)) &&
      (!filterMedico || a.medico.toLowerCase().includes(filterMedico.toLowerCase())) &&
      (!filterArea || a.area.toLowerCase().includes(filterArea.toLowerCase())) &&
      (!filterEstado || a.estado === filterEstado)
    );
  });

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Citas Médicas</h1>
          <p className="page-subtitle">{appointments.length} citas en el sistema</p>
        </div>
        <button className="btn btn-primary" onClick={onNewPatient}>
          <IcPlus /> Nueva cita
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="search-bar">
            <IcSearch />
            <input
              className="search-input"
              placeholder="Buscar por paciente, médico o ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IcFilter size={14} style={{ color: "var(--text-muted)" }} />
            <select className="form-select" style={{ width: 150 }} value={filterMedico} onChange={e => setFilterMedico(e.target.value)}>
              <option value="">Médico</option>
              <option value="Dr. Hernández">Dr. Hernández</option>
              <option value="Dr. Martínez">Dr. Martínez</option>
              <option value="Dr. López">Dr. López</option>
            </select>
            <select className="form-select" style={{ width: 130 }} value={filterArea} onChange={e => setFilterArea(e.target.value)}>
              <option value="">Área</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Pediatría">Pediatría</option>
              <option value="Ginecología">Ginecología</option>
            </select>
            <select className="form-select" style={{ width: 130 }} value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
              <option value="">Estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Atendida">Atendida</option>
              <option value="Cancelada">Cancelada</option>
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
                <th>Paciente</th>
                <th>Médico</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Área</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{a.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{a.paciente}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{a.medico}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{a.fecha}</td>
                  <td style={{ fontWeight: 500 }}>{a.hora}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{a.area}</td>
                  <td>
                    <EstadoCitaBadge estado={a.estado} />
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="Ver"><IcEye /></button>
                      <button className="btn-icon" title="Editar"><IcEdit /></button>
                      <button
                        className="btn-icon"
                        title="Cancelar"
                        style={{ color: "var(--danger)" }}
                        onClick={() => setDeleteModal(a.id)}
                      >
                        <IcTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                    No se encontraron citas con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
          Mostrando {filtered.length} de {appointments.length} citas
        </div>
      </div>
    </div>
  );
}