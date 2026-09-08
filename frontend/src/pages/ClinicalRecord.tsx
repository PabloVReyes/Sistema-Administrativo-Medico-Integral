import { useState } from "react";
import { IcPlus, IcAlert } from "../components/Icons";

const consultas = [
  {
    fecha: "2026-08-15", hora: "10:30", medico: "Dr. Adolfo Castillo", area: "Medicina General",
    motivo: "Dolor de cabeza persistente, fatiga y mareos",
    diagnostico: "Hipertensión arterial estadio I",
    tratamiento: "Losartán 50mg cada 24h, dieta baja en sodio, ejercicio moderado",
    notas: "PA: 148/92 mmHg. FC: 88 lpm. FR: 18 rpm. T: 36.5°C",
  },
  {
    fecha: "2026-06-03", hora: "09:00", medico: "Dr. Adolfo Castillo", area: "Medicina General",
    motivo: "Revisión de control de presión arterial",
    diagnostico: "Hipertensión arterial controlada",
    tratamiento: "Continuar con Losartán 50mg, seguimiento mensual",
    notas: "PA: 132/85 mmHg. Mejoría notable. Paciente cumple con tratamiento.",
  },
  {
    fecha: "2026-03-20", hora: "11:15", medico: "Dra. Verónica Núñez", area: "Dermatología",
    motivo: "Erupción cutánea en brazos y cuello",
    diagnostico: "Dermatitis de contacto",
    tratamiento: "Hidrocortisona crema 1% tópica, antihistamínico oral",
    notas: "Probable alergia a nuevo jabón de ropa. Se indica evitar el agente causal.",
  },
];

const medicamentos = [
  { nombre: "Losartán 50mg", dosis: "1 tableta cada 24h", inicio: "2026-08-15", estado: "En curso" },
  { nombre: "Hidrocortisona crema 1%", dosis: "Aplicación tópica cada 12h", inicio: "2026-03-20", estado: "Terminado" },
];

export default function ClinicalRecord() {
  const [activeTab, setActiveTab] = useState("resumen");

  const patient = {
    nombre: "María González Hernández",
    id: "P-0001", edad: "41 años", sexo: "Femenino",
    sangre: "O+", alergias: "Penicilina",
  };

  const tabs = ["resumen", "antecedentes", "consultas", "diagnosticos", "medicamentos", "estudios", "notas"];
  const tabLabels: Record<string, string> = {
    resumen: "Resumen", antecedentes: "Antecedentes", consultas: "Consultas",
    diagnosticos: "Diagnósticos", medicamentos: "Medicamentos", estudios: "Estudios", notas: "Notas médicas",
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Expediente clínico</h1>
          <p className="page-subtitle">Historial médico completo del paciente</p>
        </div>
        <button className="btn btn-primary"><IcPlus size={13} /> Nueva consulta</button>
      </div>

      {/* Patient header */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "linear-gradient(135deg, #1a3a5c, #0891b2)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 800, flexShrink: 0,
          }}>
            MG
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800 }}>
              {patient.nombre}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
              {[
                { label: "ID", value: patient.id },
                { label: "Edad", value: patient.edad },
                { label: "Sexo", value: patient.sexo },
              ].map(item => (
                <span key={item.label} style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{item.label}: </span>
                  {item.value}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ textAlign: "center", padding: "8px 16px", background: "#dbeafe", borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#1e40af" }}>{patient.sangre}</div>
              <div style={{ fontSize: 10, color: "#3b82f6", fontWeight: 600, textTransform: "uppercase" }}>Grupo sanguíneo</div>
            </div>
            <div style={{ padding: "8px 16px", background: "var(--danger-light)", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <IcAlert size={14} style={{ color: "var(--danger)" }} />
              <div>
                <div style={{ fontSize: 10, color: "var(--danger)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Alergia</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#991b1b" }}>{patient.alergias}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="tabs" style={{ marginTop: -4 }}>
          {tabs.map(t => (
            <div key={t} className={`tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
              {tabLabels[t]}
            </div>
          ))}
        </div>

        {activeTab === "resumen" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "var(--text)" }}>Última consulta</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>
                  <strong>{consultas[0].fecha}</strong> — {consultas[0].medico}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{consultas[0].diagnostico}</div>
              </div>
              <div style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "var(--text)" }}>Tratamiento activo</div>
                {medicamentos.filter(m => m.estado === "En curso").map((m, i) => (
                  <div key={i} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{m.nombre}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.dosis}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Historial de consultas</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {consultas.map((c, i) => (
                <div key={i} style={{
                  display: "flex", gap: 16, padding: 14,
                  background: "#f8fafc", borderRadius: 8,
                  border: "1px solid var(--border)",
                }}>
                  <div style={{
                    width: 2, borderRadius: 2, background: "var(--secondary)",
                    alignSelf: "stretch", flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{c.diagnostico}</span>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.fecha} — {c.hora}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 4 }}>
                      <strong>Médico:</strong> {c.medico} · <strong>Área:</strong> {c.area}
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 4 }}>
                      <strong>Motivo:</strong> {c.motivo}
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 4 }}>
                      <strong>Tratamiento:</strong> {c.tratamiento}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                      {c.notas}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "consultas" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {consultas.map((c, i) => (
              <div key={i} style={{ padding: 16, border: "1px solid var(--border)", borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <span className="badge badge-info" style={{ marginRight: 8 }}>{c.area}</span>
                    <span style={{ fontWeight: 700 }}>{c.diagnostico}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.fecha} a las {c.hora}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
                  <div><span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Médico: </span>{c.medico}</div>
                  <div><span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Motivo: </span>{c.motivo}</div>
                  <div style={{ gridColumn: "1/-1" }}><span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Tratamiento: </span>{c.tratamiento}</div>
                  <div style={{ gridColumn: "1/-1" }}><span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{c.notas}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "medicamentos" && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Dosis</th>
                  <th>Inicio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{m.nombre}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{m.dosis}</td>
                    <td className="mono" style={{ fontSize: 12 }}>{m.inicio}</td>
                    <td>
                      <span className={`badge ${m.estado === "En curso" ? "badge-success" : "badge-muted"}`}>
                        {m.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "antecedentes" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { title: "Antecedentes heredofamiliares", content: "Padre: Hipertensión arterial. Madre: Diabetes mellitus tipo 2." },
              { title: "Antecedentes patológicos personales", content: "Hipertensión arterial diagnosticada en 2026. Sin cirugías previas. Sin alergias a medicamentos salvo Penicilina." },
              { title: "Antecedentes no patológicos", content: "No fumadora. No consume alcohol. Dieta variada. Actividad física ocasional." },
              { title: "Antecedentes gineco-obstétricos", content: "G2P2A0. Menarca a los 13 años. Ciclos regulares. Sin uso actual de anticonceptivos." },
            ].map((a, i) => (
              <div key={i} style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "var(--primary)" }}>{a.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{a.content}</div>
              </div>
            ))}
          </div>
        )}

        {["diagnosticos", "estudios", "notas"].includes(activeTab) && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
            <div style={{ fontWeight: 600 }}>Sin registros</div>
            <div style={{ fontSize: 12.5, marginTop: 4 }}>No hay {tabLabels[activeTab].toLowerCase()} registrados para este paciente.</div>
          </div>
        )}
      </div>
    </div>
  );
}
