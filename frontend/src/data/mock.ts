export const currentUser = {
  name: "Dr. Carlos Ramírez",
  role: "Administrador",
  area: "Dirección",
  avatar: "CR",
};

export const patients = [
  { id: "P-0001", nombre: "María González Hernández", nacimiento: "1985-03-12", sexo: "F", telefono: "228-541-0032", curp: "GOHM850312MVZNRR08", registro: "2024-01-15", estado: "Activo" },
  { id: "P-0002", nombre: "José Luis Martínez Pérez", nacimiento: "1972-07-24", sexo: "M", telefono: "228-332-1194", curp: "MAPJ720724HVZRRS02", registro: "2024-02-03", estado: "Activo" },
  { id: "P-0003", nombre: "Ana Sofía Ramírez López", nacimiento: "1998-11-05", sexo: "F", telefono: "228-765-4400", curp: "RALA981105MVZMNN01", registro: "2024-02-18", estado: "Activo" },
  { id: "P-0004", nombre: "Pedro Antonio García Flores", nacimiento: "1965-09-30", sexo: "M", telefono: "228-120-3381", curp: "GAFP650930HVZRLR04", registro: "2024-03-07", estado: "Inactivo" },
  { id: "P-0005", nombre: "Lucía Elena Torres Mendoza", nacimiento: "1990-06-18", sexo: "F", telefono: "228-904-2215", curp: "TOML900618MVZRRSC7", registro: "2024-03-22", estado: "Activo" },
  { id: "P-0006", nombre: "Roberto Hernández Cruz", nacimiento: "1958-12-01", sexo: "M", telefono: "228-330-9907", curp: "HECR581201HVZRRB06", registro: "2024-04-10", estado: "Activo" },
  { id: "P-0007", nombre: "Carmen Ivonne Sánchez Ruiz", nacimiento: "2001-04-14", sexo: "F", telefono: "228-544-6623", curp: "SARC010414MVZNRM01", registro: "2024-04-29", estado: "Activo" },
  { id: "P-0008", nombre: "Miguel Ángel Vargas Díaz", nacimiento: "1980-02-28", sexo: "M", telefono: "228-811-7730", curp: "VADM800228HVZRNG09", registro: "2024-05-14", estado: "Activo" },
];

export const appointments = [
  { id: "C-001", hora: "08:00", paciente: "María González H.", medico: "Dr. Adolfo Castillo", area: "Medicina General", estado: "Confirmada", fecha: "2026-09-08" },
  { id: "C-002", hora: "08:30", paciente: "José L. Martínez P.", medico: "Dra. Patricia Leal", area: "Pediatría", estado: "Atendida", fecha: "2026-09-08" },
  { id: "C-003", hora: "09:00", paciente: "Ana Sofía Ramírez", medico: "Dr. Enrique Morales", area: "Ginecología", estado: "Confirmada", fecha: "2026-09-08" },
  { id: "C-004", hora: "09:30", paciente: "Pedro García F.", medico: "Dr. Adolfo Castillo", area: "Medicina General", estado: "Pendiente", fecha: "2026-09-08" },
  { id: "C-005", hora: "10:00", paciente: "Lucía Torres M.", medico: "Dra. Verónica Núñez", area: "Dermatología", estado: "Cancelada", fecha: "2026-09-08" },
  { id: "C-006", hora: "10:30", paciente: "Roberto Hernández", medico: "Dr. Enrique Morales", area: "Cardiología", estado: "Confirmada", fecha: "2026-09-08" },
  { id: "C-007", hora: "11:00", paciente: "Carmen Sánchez R.", medico: "Dra. Patricia Leal", area: "Pediatría", estado: "Pendiente", fecha: "2026-09-08" },
];

export const staff = [
  { id: "S-001", nombre: "Dr. Adolfo Castillo Vega", puesto: "Médico General", area: "Consulta Externa", especialidad: "Medicina General", telefono: "228-412-5530", correo: "a.castillo@sami.mx", estado: "Activo" },
  { id: "S-002", nombre: "Dra. Patricia Leal Moreno", puesto: "Médico Pediatra", area: "Pediatría", especialidad: "Pediatría", telefono: "228-412-5531", correo: "p.leal@sami.mx", estado: "Activo" },
  { id: "S-003", nombre: "Dr. Enrique Morales Díaz", puesto: "Médico Especialista", area: "Ginecología", especialidad: "Ginecología y Obstetricia", telefono: "228-412-5532", correo: "e.morales@sami.mx", estado: "Activo" },
  { id: "S-004", nombre: "Enf. Rosa Juárez Salinas", puesto: "Enfermera Jefe", area: "Urgencias", especialidad: "Enfermería General", telefono: "228-412-5540", correo: "r.juarez@sami.mx", estado: "Activo" },
  { id: "S-005", nombre: "Enf. Juan Carlos Ríos", puesto: "Enfermero", area: "Hospitalización", especialidad: "Enfermería General", telefono: "228-412-5541", correo: "jc.rios@sami.mx", estado: "Activo" },
  { id: "S-006", nombre: "Dra. Verónica Núñez Paz", puesto: "Médico Dermatóloga", area: "Dermatología", especialidad: "Dermatología", telefono: "228-412-5533", correo: "v.nunez@sami.mx", estado: "Activo" },
  { id: "S-007", nombre: "Farm. Luis Torres Alva", puesto: "Farmacéutico", area: "Farmacia", especialidad: "Farmacología Clínica", telefono: "228-412-5560", correo: "l.torres@sami.mx", estado: "Activo" },
  { id: "S-008", nombre: "C.P. Gloria Mendez Lira", puesto: "Contadora", area: "Administración", especialidad: "Administración Hospitalaria", telefono: "228-412-5570", correo: "g.mendez@sami.mx", estado: "Inactivo" },
];

export const users = [
  { id: "U-001", nombre: "Carlos Ramírez Ortiz", usuario: "c.ramirez", rol: "Administrador", area: "Dirección", ultimo: "2026-09-08 07:42", estado: "Activo" },
  { id: "U-002", nombre: "Adolfo Castillo Vega", usuario: "a.castillo", rol: "Médico", area: "Consulta Externa", ultimo: "2026-09-08 08:15", estado: "Activo" },
  { id: "U-003", nombre: "Patricia Leal Moreno", usuario: "p.leal", rol: "Médico", area: "Pediatría", ultimo: "2026-09-07 16:30", estado: "Activo" },
  { id: "U-004", nombre: "Rosa Juárez Salinas", usuario: "r.juarez", rol: "Enfermería", area: "Urgencias", ultimo: "2026-09-08 07:00", estado: "Activo" },
  { id: "U-005", nombre: "Sandra López Reyes", usuario: "s.lopez", rol: "Recepción", area: "Consulta Externa", ultimo: "2026-09-08 08:00", estado: "Activo" },
  { id: "U-006", nombre: "Luis Torres Alva", usuario: "l.torres", rol: "Farmacia", area: "Farmacia", ultimo: "2026-09-06 17:45", estado: "Activo" },
  { id: "U-007", nombre: "Hector Vázquez Nava", usuario: "h.vazquez", rol: "TI", area: "Tecnologías de la Información", ultimo: "2026-09-05 12:22", estado: "Activo" },
  { id: "U-008", nombre: "María Fernanda Orta", usuario: "mf.orta", rol: "Recepción", area: "Urgencias", ultimo: "2026-08-20 10:00", estado: "Bloqueado" },
];

export const pharmacy = [
  { codigo: "MED-001", producto: "Paracetamol 500mg", categoria: "Analgésico", existencias: 320, unidad: "Tableta", lote: "LT-2024-09", caducidad: "2027-03-15", estado: "Disponible" },
  { codigo: "MED-002", producto: "Amoxicilina 500mg", categoria: "Antibiótico", existencias: 45, unidad: "Cápsula", lote: "LT-2024-10", caducidad: "2026-11-30", estado: "Stock Bajo" },
  { codigo: "MED-003", producto: "Ibuprofeno 400mg", categoria: "Antiinflamatorio", existencias: 0, unidad: "Tableta", lote: "LT-2024-08", caducidad: "2026-12-31", estado: "Agotado" },
  { codigo: "MED-004", producto: "Metformina 850mg", categoria: "Antidiabético", existencias: 210, unidad: "Tableta", lote: "LT-2025-01", caducidad: "2027-06-30", estado: "Disponible" },
  { codigo: "INS-001", producto: "Jeringa 5ml", categoria: "Insumo", existencias: 500, unidad: "Pieza", lote: "LT-2025-02", caducidad: "2028-01-01", estado: "Disponible" },
  { codigo: "MED-005", producto: "Atorvastatina 40mg", categoria: "Cardioprotector", existencias: 30, unidad: "Tableta", lote: "LT-2024-07", caducidad: "2026-10-15", estado: "Por Caducar" },
  { codigo: "INS-002", producto: "Guantes látex M", categoria: "Insumo", existencias: 200, unidad: "Par", lote: "LT-2025-03", caducidad: "2029-06-01", estado: "Disponible" },
  { codigo: "MED-006", producto: "Omeprazol 20mg", categoria: "Gastrointestinal", existencias: 75, unidad: "Cápsula", lote: "LT-2025-04", caducidad: "2027-09-30", estado: "Disponible" },
];

export const auditLog = [
  { fecha: "2026-09-08 07:42:13", usuario: "c.ramirez", rol: "Administrador", accion: "Inicio de sesión", modulo: "Autenticación", ip: "192.168.1.10", resultado: "Éxito" },
  { fecha: "2026-09-08 07:45:30", usuario: "c.ramirez", rol: "Administrador", accion: "Consulta reporte", modulo: "Reportes", ip: "192.168.1.10", resultado: "Éxito" },
  { fecha: "2026-09-08 08:00:05", usuario: "s.lopez", rol: "Recepción", accion: "Registro de cita", modulo: "Citas", ip: "192.168.1.22", resultado: "Éxito" },
  { fecha: "2026-09-08 08:12:44", usuario: "a.castillo", rol: "Médico", accion: "Acceso a expediente", modulo: "Expedientes", ip: "192.168.1.15", resultado: "Éxito" },
  { fecha: "2026-09-08 08:15:01", usuario: "a.castillo", rol: "Médico", accion: "Nueva consulta", modulo: "Expedientes", ip: "192.168.1.15", resultado: "Éxito" },
  { fecha: "2026-09-08 08:30:20", usuario: "mf.orta", rol: "Recepción", accion: "Intento de acceso", modulo: "Usuarios", ip: "192.168.1.30", resultado: "Rechazado" },
  { fecha: "2026-09-08 08:45:55", usuario: "l.torres", rol: "Farmacia", accion: "Salida de medicamento", modulo: "Farmacia", ip: "192.168.1.18", resultado: "Éxito" },
  { fecha: "2026-09-08 09:00:12", usuario: "r.juarez", rol: "Enfermería", accion: "Actualización de paciente", modulo: "Pacientes", ip: "192.168.1.12", resultado: "Éxito" },
];

export const backups = [
  { fecha: "2026-09-08 02:00:00", tipo: "Automático", tamaño: "2.4 GB", estado: "Completado", responsable: "Sistema SAMI" },
  { fecha: "2026-09-07 02:00:00", tipo: "Automático", tamaño: "2.3 GB", estado: "Completado", responsable: "Sistema SAMI" },
  { fecha: "2026-09-06 02:00:00", tipo: "Automático", tamaño: "2.3 GB", estado: "Completado", responsable: "Sistema SAMI" },
  { fecha: "2026-09-05 14:30:00", tipo: "Manual", tamaño: "2.2 GB", estado: "Completado", responsable: "h.vazquez" },
  { fecha: "2026-09-05 02:00:00", tipo: "Automático", tamaño: "2.2 GB", estado: "Completado", responsable: "Sistema SAMI" },
  { fecha: "2026-09-04 02:00:00", tipo: "Automático", tamaño: "2.1 GB", estado: "Fallido", responsable: "Sistema SAMI" },
];

export const recentActivity = [
  { time: "09:12", action: "Cita C-006 confirmada", user: "s.lopez", type: "cita" },
  { time: "09:05", action: "Nuevo paciente registrado: Carmen Sánchez R.", user: "s.lopez", type: "paciente" },
  { time: "08:45", action: "Salida farmacia: Paracetamol x 20", user: "l.torres", type: "farmacia" },
  { time: "08:30", action: "Expediente P-0002 actualizado", user: "a.castillo", type: "expediente" },
  { time: "08:15", action: "Nueva consulta registrada: José Martínez", user: "a.castillo", type: "consulta" },
  { time: "07:55", action: "Usuario mf.orta bloqueado", user: "c.ramirez", type: "usuario" },
];

export const dashboardChartData = {
  citasPorDia: [
    { dia: "Lun", citas: 18 },
    { dia: "Mar", citas: 24 },
    { dia: "Mié", citas: 21 },
    { dia: "Jue", citas: 28 },
    { dia: "Vie", citas: 32 },
    { dia: "Sáb", citas: 14 },
    { dia: "Dom", citas: 6 },
  ],
  consultasPorArea: [
    { area: "Medicina General", consultas: 45 },
    { area: "Pediatría", consultas: 28 },
    { area: "Ginecología", consultas: 19 },
    { area: "Cardiología", consultas: 12 },
    { area: "Dermatología", consultas: 10 },
  ],
  pacientesMes: [
    { semana: "S1", pacientes: 22 },
    { semana: "S2", pacientes: 31 },
    { semana: "S3", pacientes: 28 },
    { semana: "S4", pacientes: 35 },
  ],
};
