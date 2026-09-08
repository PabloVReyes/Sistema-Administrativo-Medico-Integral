import { useState } from "react";
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

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [subPage, setSubPage] = useState<string | null>(null);

  const effectivePage = subPage || currentPage;

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setSubPage(null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (effectivePage) {
      case "dashboard":
        return <Dashboard />;
      case "pacientes":
        return (
          <Patients
            onNewPatient={() => setSubPage("pacientes/nuevo")}
            onViewRecord={() => setSubPage("pacientes/expediente")}
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
        return <Appointments />;
      case "personal":
        return <Staff />;
      case "usuarios":
        return <Users />;
      case "roles":
        return <Roles />;
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
          pageTitle={pageTitles[effectivePage] || ""}
          breadcrumb={breadcrumbs[effectivePage]}
          onLogout={() => setLoggedIn(false)}
        />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
