import { useState, useEffect } from "react";
import { IcSearch, IcPlus, IcEdit, IcTrash, IcFilter, IcShield, IcUsers, IcMenu } from "../components/Icons";
import { getRolesApi } from "../services/api";

interface RolesProps {
  onNewPatient: () => void;
  onViewRecord: () => void;
}

interface RolePermission {
  name: string;
  action: string;
  resource: string;
  description: string;
}

export default function Roles({ onNewPatient, onViewRecord }: RolesProps) {
  // FILTROS PRIMEROS - los hooks de React deben estar en orden consistente
  const [filterPermiso, setFilterPermiso] = useState("");

  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Cargar roles y permisos del API (o datos mock si no hay token)
  useEffect(() => {
    const token = localStorage.getItem("sami_token");
    if (token) {
      Promise.all([
        fetch("http://localhost:3000/api/roles", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json()),
        fetch("http://localhost:3000/api/permissions", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json()),
      ]).then(([rolesResp, permsResp]) => {
        if (rolesResp && rolesResp.success && rolesResp.data && Array.isArray(rolesResp.data)) {
          setRoles(rolesResp.data);
        } else {
          // Fallback a datos mock si la API no devuelve datos esperados
          const mockRoles = [
            { id: "R-001", name: "Administrador", description: "Administrador del sistema con acceso total", permissions: 21, isActive: true },
            { id: "R-002", name: "Médico", description: "Personal médico con consulta y registro de expedientes", permissions: 7, isActive: true },
            { id: "R-003", name: "Enfermería", description: "Personal de enfermería con acceso a pacientes y citas", permissions: 4, isActive: true },
            { id: "R-004", name: "Recepción", description: "Personal de recepción para registro de pacientes y citas", permissions: 2, isActive: true },
            { id: "R-005", name: "Dirección", description: "Personal directivo con acceso a reportes y configuración", permissions: 3, isActive: true },
            { id: "R-006", name: "Farmacia", description: "Farmacéutico con acceso a inventario y medicamentos", permissions: 2, isActive: true },
            { id: "R-007", name: "Auditor", description: "Auditor del sistema con consulta de registros", permissions: 1, isActive: true },
          ];
          setRoles(mockRoles);
        }
        if (permsResp && permsResp.success && permsResp.data && Array.isArray(permsResp.data)) {
          setPermissions(permsResp.data);
        } else {
          // Fallback a datos mock
          const mockPerms = [
            { name: "patients.read", action: "read", resource: "patients", description: "Consultar pacientes" },
            { name: "patients.create", action: "create", resource: "patients", description: "Registrar paciente" },
            { name: "patients.update", action: "update", resource: "patients", description: "Actualizar paciente" },
            { name: "patients.delete", action: "delete", resource: "patients", description: "Eliminar paciente" },
            { name: "records.read", action: "read", resource: "clinicalrecords", description: "Consultar expedientes clínicos" },
            { name: "records.create", action: "create", resource: "clinicalrecords", description: "Registrar consulta" },
            { name: "appointments.read", action: "read", resource: "appointments", description: "Consultar citas" },
            { name: "appointments.create", action: "create", resource: "appointments", description: "Programar cita" },
            { name: "users.read", action: "read", resource: "users", description: "Consultar usuarios" },
            { name: "roles.read", action: "read", resource: "roles", description: "Consultar roles" },
            { name: "reports.read", action: "read", resource: "reports", description: "Consultar reportes" },
            { name: "audit.read", action: "read", resource: "audit", description: "Consultar auditoría" },
          ];
          setPermissions(mockPerms);
        }
        setLoading(false);
      });
    } else {
      // Sin token: cargar datos mock inmediatamente
      const mockRoles = [
        { id: "R-001", name: "Administrador", description: "Administrador del sistema con acceso total", permissions: 21, isActive: true },
        { id: "R-002", name: "Médico", description: "Personal médico con consulta y registro de expedientes", permissions: 7, isActive: true },
        { id: "R-003", name: "Enfermería", description: "Personal de enfermería con acceso a pacientes y citas", permissions: 4, isActive: true },
        { id: "R-004", name: "Recepción", description: "Personal de recepción para registro de pacientes y citas", permissions: 2, isActive: true },
        { id: "R-005", name: "Dirección", description: "Personal directivo con acceso a reportes y configuración", permissions: 3, isActive: true },
        { id: "R-006", name: "Farmacia", description: "Farmacéutico con acceso a inventario y medicamentos", permissions: 2, isActive: true },
        { id: "R-007", name: "Auditor", description: "Auditor del sistema con consulta de registros", permissions: 1, isActive: true },
      ];
      const mockPerms = [
        { name: "patients.read", action: "read", resource: "patients", description: "Consultar pacientes" },
        { name: "patients.create", action: "create", resource: "patients", description: "Registrar paciente" },
        { name: "patients.update", action: "update", resource: "patients", description: "Actualizar paciente" },
        { name: "patients.delete", action: "delete", resource: "patients", description: "Eliminar paciente" },
        { name: "records.read", action: "read", resource: "clinicalrecords", description: "Consultar expedientes clínicos" },
        { name: "records.create", action: "create", resource: "clinicalrecords", description: "Registrar consulta" },
        { name: "appointments.read", action: "read", resource: "appointments", description: "Consultar citas" },
        { name: "appointments.create", action: "create", resource: "appointments", description: "Programar cita" },
        { name: "users.read", action: "read", resource: "users", description: "Consultar usuarios" },
        { name: "roles.read", action: "read", resource: "roles", description: "Consultar roles" },
        { name: "reports.read", action: "read", resource: "reports", description: "Consultar reportes" },
        { name: "audit.read", action: "read", resource: "audit", description: "Consultar auditoría" },
      ];
      setRoles(mockRoles);
      setPermissions(mockPerms);
      setLoading(false);
    }
  }, []);

  // 2. Computar roles filtrados DESPUÉS de tener los estados de filtro
  const filtered = roles.filter(r => {
    const q = search.toLowerCase();
    return (
      (r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) &&
      (!filterPermiso || r.permissions.toString().includes(filterPermiso))
    );
  });

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Roles y Permisos</h1>
          <p className="page-subtitle">{roles.length} roles definidos en el sistema</p>
        </div>
        <button className="btn btn-primary" onClick={onNewPatient}>
          <IcPlus /> Nuevo rol
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="search-bar">
            <IcSearch />
            <input
              className="search-input"
              placeholder="Buscar por nombre o rol..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IcFilter size={14} style={{ color: "var(--text-muted)" }} />
            <select className="form-select" style={{ width: 200 }} value={filterPermiso} onChange={e => setFilterPermiso(e.target.value)}>
              <option value="">Filtrar por permiso</option>
              <option value="patients.read">patients.read - Consultar pacientes</option>
              <option value="patients.create">patients.create - Registrar paciente</option>
              <option value="patients.update">patients.update - Actualizar paciente</option>
              <option value="patients.delete">patients.delete - Eliminar paciente</option>
              <option value="records.read">records.read - Consultar expedientes</option>
              <option value="records.create">records.create - Registrar consulta</option>
              <option value="appointments.read">appointments.read - Consultar citas</option>
              <option value="appointments.create">appointments.create - Programar cita</option>
              <option value="users.read">users.read - Consultar usuarios</option>
              <option value="roles.read">roles.read - Consultar roles</option>
              <option value="reports.read">reports.read - Consultar reportes</option>
              <option value="audit.read">audit.read - Consultar auditoría</option>
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
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Permisos</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td><span className="mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{r.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{r.description}</td>
                  <td>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.permissions} permisos</span>
                  </td>
                  <td>
                    <span className={`badge ${r.isActive ? "badge-success" : "badge-muted"}`}>
                      {r.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="Ver"><IcShield /></button>
                      <button className="btn-icon" title="Editar"><IcEdit /></button>
                      <button
                        className="btn-icon"
                        title="Eliminar"
                        style={{ color: "var(--danger)" }}
                        onClick={() => setDeleteModal(r.id)}
                      >
                        <IcTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                    No se encontraron roles con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission details section */}
      {permissions.length > 0 && (
        <div className="card" style={{ marginTop: 24, paddingTop: 16, borderTop: "3px solid var(--primary)" }}>
          <div className="card-header">
            <span className="card-title">Permisos del sistema</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {permissions.map(p => (
              <div key={p.name} style={{ padding: 12, borderRadius: 8, border: "1px solid var(--border-light)" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {p.action.toUpperCase()} {p.resource}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
          Mostrando {filtered.length} de {roles.length} roles
        </div>
      </div>
    </div>
  );
}