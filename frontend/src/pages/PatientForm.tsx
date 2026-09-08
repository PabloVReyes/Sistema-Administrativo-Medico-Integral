import { useState } from "react";
import { IcCheck, IcX, IcAlert } from "../components/Icons";

interface PatientFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function PatientForm({ onSave, onCancel }: PatientFormProps) {
  const [form, setForm] = useState({
    nombre: "", apPaterno: "", apMaterno: "", nacimiento: "", sexo: "", curp: "",
    telefono: "", correo: "", calle: "", colonia: "", municipio: "",
    sangre: "", alergias: "", emergenciaNombre: "", emergenciaTel: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es requerido";
    if (!form.apPaterno.trim()) e.apPaterno = "El apellido paterno es requerido";
    if (!form.nacimiento) e.nacimiento = "La fecha de nacimiento es requerida";
    if (!form.sexo) e.sexo = "El sexo es requerido";
    if (form.curp && form.curp.length !== 18) e.curp = "La CURP debe tener 18 caracteres";
    if (form.telefono && !/^\d{3}-?\d{3}-?\d{4}$/.test(form.telefono.replace(/\s/g, "")))
      e.telefono = "Formato inválido (ej. 228-541-0032)";
    if (form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      e.correo = "Correo electrónico inválido";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(onSave, 1000);
  };

  const Field = ({ label, id, required = false, error, children }: {
    label: string; id: string; required?: boolean; error?: string; children: React.ReactNode;
  }) => (
    <div className="form-group">
      <label className="form-label">{label}{required && <span style={{ color: "var(--danger)", marginLeft: 2 }}>*</span>}</label>
      {children}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, color: "var(--danger)", fontSize: 11.5 }}>
          <IcAlert size={11} /> {error}
        </div>
      )}
    </div>
  );

  if (saved) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "var(--success-light)", display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <IcCheck size={28} style={{ color: "var(--success)" }} />
        </div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700 }}>Paciente registrado</h2>
        <p style={{ color: "var(--text-muted)" }}>El expediente fue creado exitosamente.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="page-title">Nuevo paciente</h1>
          <p className="page-subtitle">Complete la información para registrar al paciente</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={onCancel}><IcX size={13} /> Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}><IcCheck size={13} /> Guardar paciente</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Sección 1: Datos personales */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>1</div>
            <span className="card-title">Datos personales</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 16px" }}>
            <Field label="Nombre(s)" id="nombre" required error={errors.nombre}>
              <input className={`form-input${errors.nombre ? " border-red-400" : ""}`}
                value={form.nombre} onChange={e => set("nombre", e.target.value)} placeholder="Ej. María Sofía" />
            </Field>
            <Field label="Apellido paterno" id="apPaterno" required error={errors.apPaterno}>
              <input className="form-input" value={form.apPaterno} onChange={e => set("apPaterno", e.target.value)} placeholder="Ej. González" />
            </Field>
            <Field label="Apellido materno" id="apMaterno">
              <input className="form-input" value={form.apMaterno} onChange={e => set("apMaterno", e.target.value)} placeholder="Ej. Hernández" />
            </Field>
            <Field label="Fecha de nacimiento" id="nacimiento" required error={errors.nacimiento}>
              <input className="form-input" type="date" value={form.nacimiento} onChange={e => set("nacimiento", e.target.value)} />
            </Field>
            <Field label="Sexo" id="sexo" required error={errors.sexo}>
              <select className="form-select" value={form.sexo} onChange={e => set("sexo", e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </Field>
            <Field label="CURP" id="curp" error={errors.curp}>
              <input className="form-input mono" value={form.curp} onChange={e => set("curp", e.target.value.toUpperCase())}
                placeholder="XXXX000000XXXXXXXX" maxLength={18} style={{ textTransform: "uppercase" }} />
            </Field>
          </div>
        </div>

        {/* Sección 2: Datos de contacto */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--secondary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>2</div>
            <span className="card-title">Datos de contacto</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Teléfono" id="telefono" error={errors.telefono}>
              <input className="form-input mono" value={form.telefono} onChange={e => set("telefono", e.target.value)} placeholder="228-541-0032" />
            </Field>
            <Field label="Correo electrónico" id="correo" error={errors.correo}>
              <input className="form-input" type="email" value={form.correo} onChange={e => set("correo", e.target.value)} placeholder="paciente@correo.com" />
            </Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0 16px" }}>
            <Field label="Calle y número" id="calle">
              <input className="form-input" value={form.calle} onChange={e => set("calle", e.target.value)} placeholder="Ej. Av. Hidalgo 124" />
            </Field>
            <Field label="Colonia" id="colonia">
              <input className="form-input" value={form.colonia} onChange={e => set("colonia", e.target.value)} placeholder="Centro" />
            </Field>
            <Field label="Municipio" id="municipio">
              <input className="form-input" value={form.municipio} onChange={e => set("municipio", e.target.value)} placeholder="Altotonga" />
            </Field>
          </div>
        </div>

        {/* Sección 3: Información adicional */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#7c3aed", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>3</div>
            <span className="card-title">Información adicional</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0 16px" }}>
            <Field label="Tipo de sangre" id="sangre">
              <select className="form-select" value={form.sangre} onChange={e => set("sangre", e.target.value)}>
                <option value="">Desconocido</option>
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Alergias conocidas" id="alergias">
              <input className="form-input" value={form.alergias} onChange={e => set("alergias", e.target.value)}
                placeholder="Ej. Penicilina, Aspirina, Látex (separadas por coma)" />
            </Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Nombre del contacto de emergencia" id="emergenciaNombre">
              <input className="form-input" value={form.emergenciaNombre} onChange={e => set("emergenciaNombre", e.target.value)}
                placeholder="Nombre completo" />
            </Field>
            <Field label="Teléfono de emergencia" id="emergenciaTel">
              <input className="form-input mono" value={form.emergenciaTel} onChange={e => set("emergenciaTel", e.target.value)}
                placeholder="228-000-0000" />
            </Field>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-outline" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="btn btn-primary"><IcCheck size={13} /> Guardar paciente</button>
        </div>
      </form>
    </div>
  );
}
