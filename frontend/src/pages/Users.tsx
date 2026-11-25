import { useState, useEffect } from "react";
import { IcSearch, IcPlus, IcEdit, IcTrash, IcUsers, IcLockOpen, IcUserX, IcFilter } from "../components/Icons";
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from "../services/api";

interface UsersProps {
  onNewPatient: () => void;
  onNewUser: () => void;
  onViewRecord: () => void;
}

interface UserTable {
  id: string;
  name: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function Users({ onNewPatient, onNewUser, onViewRecord }: UsersProps) {
  // FILTROS PRIMEROS - los hooks de React deben estar en orden consistente
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [users, setUsers] = useState<UserTable[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Cargar usuarios del API (o datos mock si no hay token)
  useEffect(() => {
    const token = localStorage.getItem("sami_token");
    console.log("[Usuarios] Token encontrado:", token ? "SÍ" : "NO");

    if (token) {
      console.log("[Usuarios] Llamando API con token...");
      fetch("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log("[Usuarios] Respuesta API status:", res.status);
          return res.json();
        })
        .then((data) => {
          console.log("[Usuarios] Datos recibidos del API:", data);
          if (data && data.success && data.data && Array.isArray(data.data)) {
            console.log("[Usuarios] estableciendo", data.data.length, "usuarios reales");
            setUsers(data.data);
          } else {
            console.log("[Usuarios] API no retornó datos esperados, usando mock");
            // Fallback a datos mock si la API no devuelve datos esperados
            const mockUsers = [
              { id: "U-001", name: "Administrador del Sistema", username: "admin", role: "Administrador", isActive: true, createdAt: "01/01/2024" },
              { id: "U-002", name: "Dr. Carlos Hernández", username: "chernandez", role: "Médico", isActive: true, createdAt: "15/03/2024" },
              { id: "U-003", name: "Enfermera María López", username: "mlopez", role: "Enfermería", isActive: true, createdAt: "20/02/2024" },
              { id: "U-004", name: "Personal de Recepción", username: "recepcion", role: "Recepción", isActive: true, createdAt: "10/01/2024" },
              { id: "U-005", name: "Farmacéutico", username: "farmacia", role: "Farmacia", isActive: true, createdAt: "05/04/2024" },
            ];
            setUsers(mockUsers);
          }
          console.log("[Usuarios] loading setto FALSE");
          setLoading(false);
        })
        .catch((error) => {
          console.error("[Usuarios] Error en fetch:", error);
          // Fallback a datos mock en caso de error
          const mockUsers = [
            { id: "U-001", name: "Administrador del Sistema", username: "admin", role: "Administrador", isActive: true, createdAt: "01/01/2024" },
            { id: "U-002", name: "Dr. Carlos Hernández", username: "chernandez", role: "Médico", isActive: true, createdAt: "15/03/2024" },
          ];
          console.log("[Usuarios] Error, usando mock fallback");
          setUsers(mockUsers);
          setLoading(false);
        });
    } else {
      console.log("[Usuarios] Sin token, usando datos mock inmediatos");
      // Sin token: cargar datos mock inmediatamente
      const mockUsers = [
        { id: "U-001", name: "Administrador del Sistema", username: "admin", role: "Administrador", isActive: true, createdAt: "01/01/2024" },
        { id: "U-002", name: "Dr. Carlos Hernández", username: "chernandez", role: "Médico", isActive: true, createdAt: "15/03/2024" },
        { id: "U-003", name: "Enfermera María López", username: "mlopez", role: "Enfermería", isActive: true, createdAt: "20/02/2024" },
        { id: "U-004", name: "Personal de Recepción", username: "recepcion", role: "Recepción", isActive: true, createdAt: "10/01/2024" },
        { id: "U-005", name: "Farmacéutico", username: "farmacia", role: "Farmacia", isActive: true, createdAt: "05/04/2024" },
      ];
      setUsers(mockUsers);
      console.log("[Usuarios] loading setto FALSE (sin token)");
      setLoading(false);
    }
  }, []);

  // 2. Computar usuarios filtrados DESPUÉS de tener los estados de filtro
  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      (u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)) &&
      (!filterRole || u.role === filterRole) &&
      (!filterStatus || (filterStatus === "Activo" && u.isActive) || (filterStatus === "Inactivo" && !u.isActive))
    );
  });

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Usuarios</h1>
          <p className="page-subtitle">{users.length} usuarios registrados en el sistema</p>
        </div>
        <button className="btn btn-primary" onClick={onNewUser}>
          <IcPlus /> Nuevo usuario
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="search-bar">
            <IcSearch />
            <input
              className="search-input"
              placeholder="Buscar por nombre o usuario..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IcFilter size={14} style={{ color: "var(--text-muted)" }} />
            <select className="form-select" style={{ width: 180 }} value={filterRole} onChange={e => setFilterRole(e.target.value)}>
              <option value="">Rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Médico">Médico</option>
              <option value="Enfermería">Enfermería</option>
              <option value="Recepción">Recepción</option>
              <option value="Farmacia">Farmacia</option>
              <option value="Auditor">Auditor</option>
            </select>
            <select className="form-select" style={{ width: 130 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
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
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>F. Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{u.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{u.name}</td>
                  <td><span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{u.username}</span></td>
                  <td>
                    <span style={{
                      display: "inline-block", padding: "3px 8px", borderRadius: 4,
                      fontSize: 11, fontWeight: 600,
                      background: u.role === "Administrador" ? "var(--primary)" : u.role === "Médico" ? "#0891b2" : u.role === "Enfermería" ? "#16a34a" : u.role === "Recepción" ? "#6d28d9" : "#f59e0b",
                      color: u.role === "Administrador" ? "#fff" : u.role === "Médico" ? "#fff" : u.role === "Enfermería" ? "#fff" : u.role === "Recepción" ? "#fff" : "#fff",
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${u.isActive ? "badge-success" : "badge-muted"}`}>
                      {u.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{u.createdAt}</td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="Ver"><IcUsers /></button>
                      <button className="btn-icon" title="Editar"><IcEdit /></button>
                      <button
                        className="btn-icon"
                        title="Eliminar"
                        style={{ color: "var(--danger)" }}
                        onClick={() => setDeleteModal(u.id)}
                      >
                        <IcTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                    No se encontraron usuarios con esos criterios.
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
          Mostrando {filtered.length} de {users.length} usuarios
        </div>
      </div>
    </div>
  );
}