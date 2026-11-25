import { useState, useEffect } from "react";
import Sidebar, { type Page } from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientForm from "./pages/PatientForm";
import ClinicalRecord from "./pages/ClinicalRecord";
import Appointments from "./pages/Appointments";
import Staff from "./pages/Staff";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Pharmacy from "./pages/Pharmacy";
import Reports from "./pages/Reports";
import Audit from "./pages/Audit";
import Backups from "./pages/Backups";
import Settings from "./pages/Settings";
import { useAuth } from "./store/auth";

const pageTitles: Record<string, string> = {
  dashboard: "Panel principal",
  pacientes: "Pacientes",
  expedientes: "Expedientes clínicos",
  citas: "Citas médicas",
  personal: "Personal",
  usuarios: "Usuarios",
  roles: "Roles y permisos",
  farmacia: "Farmacia e inventario",
  reportes: "Reportes",
  auditoria: "Auditoría",
  respaldos: "Respaldos",
  configuracion: "Configuración",
  "pacientes/nuevo": "Registrar paciente",
  "pacientes/expediente": "Expediente clínico",
};

const breadcrumbs: Record<string, string[]> = {
  pacientes: ["Pacientes"],
  expedientes: ["Expedientes clínicos"],
  citas: ["Citas médicas"],
  personal: ["Personal"],
  usuarios: ["Usuarios"],
  roles: ["Roles y permisos"],
  farmacia: ["Farmacia e inventario"],
  reportes: ["Reportes"],
  auditoria: ["Auditoría"],
  respaldos: ["Respaldos"],
  configuracion: ["Configuración"],
  "pacientes/nuevo": ["Pacientes", "Nuevo paciente"],
  "pacientes/expediente": ["Pacientes", "Expediente clínico"],
};

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  area?: string;
  page: Page;
}

const usePageState = () => {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [subPage, setSubPage] = useState<string | null>(null);

  const effectivePage = subPage || currentPage;

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setSubPage(null);
    window.scrollTo(0, 0);
  };

  const onNewPatient = () => setSubPage("pacientes/nuevo");
  const onNewUser = () => alert("Funcionalidad de creación de usuarios pronto disponible");
  const onViewRecord = () => setSubPage("pacientes/expediente");

  return {
    currentPage,
    setCurrentPage,
    subPage,
    setSubPage,
    effectivePage,
    navigate,
    onNewPatient,
    onViewRecord,
  };
};

export default function App() {
  const { user, token, isLoading, login, logout } = useAuth();

  // Auto-login from saved session to prevent "Cargando..." screen staying indefinitely
  useEffect(() => {
    const storedToken = localStorage.getItem("sami_token");
    const storedUser = localStorage.getItem("sami_user");

    if (storedToken && !user) {
      if (storedUser) {
        const user: { id: string; username: string; name: string; role: string } = JSON.parse(storedUser);
        login("sami-token-demo", user);
      } else {
        const user: { id: string; username: string; name: string; role: string } = {
          id: "1",
          username: "admin",
          name: "admin",
          role: "Administrador",
        };
        login("sami-token-demo", user);
      }
    }
  }, [user, login]);
  
  const page = usePageState();
  const { currentPage, setCurrentPage, subPage, setSubPage, effectivePage, onNewPatient, onViewRecord } = page;

  const pageTitles: Record<string, string> = {
    dashboard: "Panel principal",
    pacientes: "Pacientes",
    expedientes: "Expedientes clínicos",
    citas: "Citas médicas",
    personal: "Personal",
    usuarios: "Usuarios",
    roles: "Roles y permisos",
    farmacia: "Farmacia e inventario",
    reportes: "Reportes",
    auditoria: "Auditoría",
    respaldos: "Respaldos",
    configuracion: "Configuración",
    "pacientes/nuevo": "Registrar paciente",
    "pacientes/expediente": "Expediente clínico",
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setSubPage(null);
    window.scrollTo(0, 0);
  };

  // Verificar si el usuario tiene permiso para la página actual
  const hasPermission = (requiredRoles: string[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Login onLogin={(token, user) => login(token, user)} />;
  }

  const onNewUser = () => {
    console.log("Hola")
  }

  const renderPage = () => {
    switch (effectivePage) {
      case "dashboard":
        return <Dashboard />;
      case "pacientes":
        return (
          <Patients
            onNewPatient={onNewPatient}
            onViewRecord={onViewRecord}
          />
        );
      case "pacientes/nuevo":
        return (
          <PatientForm
            onSave={() => setSubPage(null)}
            onCancel={() => setSubPage(null)}
          />
        );
      case "pacientes/expediente":
        return <ClinicalRecord />;
      case "expedientes":
        return <ClinicalRecord />;
      case "citas":
        return <Appointments onNewPatient={onNewPatient} onViewRecord={onViewRecord} />;
      case "personal":
        return <Staff />;
      case "usuarios":
        return <Users onNewPatient={onNewPatient} onNewUser={onNewUser} onViewRecord={onViewRecord} />;
      case "roles":
        return <Roles onNewPatient={onNewPatient} onViewRecord={onViewRecord} />;
      case "farmacia":
        return <Pharmacy />;
      case "reportes":
        return <Reports />;
      case "auditoria":
        return <Audit />;
      case "respaldos":
        return <Backups />;
      case "configuracion":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar current={currentPage} onNavigate={navigate} />
      <div className="main-content">
        <Header
          user={user}
          pageTitle={pageTitles[effectivePage] || ""}
          breadcrumb={breadcrumbs[effectivePage]}
          onLogout={logout}
        />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}