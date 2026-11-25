// Seed de datos para SAMI - Sistema Administrativo Médico Integral
// Datos de prueba para RBAC, roles y permisos
// Ejecutar con: npx prisma db seed

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ejecutando seed de datos...");

  // 1. Permisos - definir la matriz de permisos del sistema
  const permissions = [
    // Pacientes
    { name: "patients.read", action: "read", resource: "patients", description: "Consultar pacientes" },
    { name: "patients.create", action: "create", resource: "patients", description: "Registrar paciente" },
    { name: "patients.update", action: "update", resource: "patients", description: "Actualizar paciente" },
    { name: "patients.delete", action: "delete", resource: "patients", description: "Eliminar paciente" },

    // Expedientes clínicos
    { name: "records.read", action: "read", resource: "clinicalrecords", description: "Consultar expedientes clínicos" },
    { name: "records.create", action: "create", resource: "clinicalrecords", description: "Registrar consulta" },
    { name: "records.update", action: "update", resource: "clinicalrecords", description: "Actualizar expediente" },

    // Citas
    { name: "appointments.read", action: "read", resource: "appointments", description: "Consultar citas" },
    { name: "appointments.create", action: "create", resource: "appointments", description: "Programar cita" },
    { name: "appointments.update", action: "update", resource: "appointments", description: "Actualizar cita" },
    { name: "appointments.delete", action: "delete", resource: "appointments", description: "Cancelar cita" },

    // Usuarios
    { name: "users.read", action: "read", resource: "users", description: "Consultar usuarios" },
    { name: "users.create", action: "create", resource: "users", description: "Registrar usuario" },
    { name: "users.update", action: "update", resource: "users", description: "Actualizar usuario" },
    { name: "users.disable", action: "delete", resource: "users", description: "Bloquear/Desbloquear usuario" },

    // Roles
    { name: "roles.read", action: "read", resource: "roles", description: "Consultar roles" },
    { name: "roles.manage", action: "manage", resource: "roles", description: "Gestionar roles y permisos" },

    // Reportes
    { name: "reports.read", action: "read", resource: "reports", description: "Consultar reportes" },
    { name: "reports.export", action: "export", resource: "reports", description: "Exportar reporte" },

    // Auditoría
    { name: "audit.read", action: "read", resource: "audit", description: "Consultar auditoría" },

    // Configuración
    { name: "configurations.read", action: "read", resource: "config", description: "Consultar configuración" },
  ];

  for (const perm of permissions) {
    await prisma.permission.create({
      data: {
        name: perm.name,
        action: perm.action,
        resource: perm.resource,
        description: perm.description,
      },
    });
  }
  console.log(`✅ ${permissions.length} permisos creados`);

  // 2. Roles - definir los roles del hospital
  const roles = [
    {
      name: "Administrador",
      description: "Administrador del sistema con acceso total",
    },
    {
      name: "Médico",
      description: "Personal médico con consulta y registro de expedientes",
    },
    {
      name: "Enfermería",
      description: "Personal de enfermería con acceso a pacientes y citas",
    },
    {
      name: "Recepción",
      description: "Personal de recepción para registro de pacientes y citas",
    },
    {
      name: "Dirección",
      description: "Personal directivo con acceso a reportes y configuración",
    },
    {
      name: "Farmacia",
      description: "Farmacéutico con acceso a inventario y medicamentos",
    },
    {
      name: "Auditor",
      description: "Auditor del sistema con consulta de registros",
    },
  ];

  for (const role of roles) {
    const createdRole = await prisma.role.create({
      data: {
        name: role.name,
        description: role.description,
      },
    });

    // Asignar permisos según el perfil del rol
    let rolePermissions: string[] = [];

    switch (role.name) {
      case "Administrador":
        rolePermissions = permissions.map((p) => p.name);
        break;

      case "Médico":
        rolePermissions = [
          "patients.read",
          "patients.create",
          "records.read",
          "records.create",
          "appointments.read",
          "appointments.create",
          "users.read",
        ];
        break;

      case "Enfermería":
        rolePermissions = [
          "patients.read",
          "patients.create",
          "appointments.read",
          "appointments.create",
        ];
        break;

      case "Recepción":
        rolePermissions = [
          "patients.create",
          "appointments.create",
        ];
        break;

      case "Dirección":
        rolePermissions = [
          "reports.read",
          "reports.export",
          "configurations.read",
        ];
        break;

      case "Farmacia":
        rolePermissions = [
          "patients.read",
          "records.read",
        ];
        break;

      case "Auditor":
        rolePermissions = ["audit.read"];
        break;
    }

    for (const permName of rolePermissions) {
      const permission = permissions.find((p) => p.name === permName);
      if (permission) {
        await prisma.permission.create({
          data: {
            name: permName,
            action: permission.action,
            resource: permission.resource,
            description: permission.description,
            role: {
              connect: { id: createdRole.id },
            },
          },
        });
      }
    }
  }
  console.log("✅ Roles y permisos asignados");

  // 3. Usuario administrador de desarrollo
  const adminUser = await prisma.user.create({
    data: {
      name: "Administrador del Sistema",
      username: "admin",
      passwordHash: "$2b$10$J.ExAMPLE.HASH.FOR.DEMO.PURPOSES.ONLY",
      role: {
        connect: { name: "Administrador" },
      },
    },
  });

  // Asignar el rol de administrador al usuario
  const adminRole = await prisma.role.findUnique({ where: { name: "Administrador" } });
  if (adminRole) {
    await prisma.userRole.create({
      data: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    });
  }

  console.log("✅ Usuario administrador creado");
  console.log("   - Username: admin");
  console.log("   - Role: Administrador");
  console.log("   ⚠️  NOTA: La contraseña es un ejemplo, cambiar en producción");
  console.log(
    "   - Para cambiar la contraseña, actualizar passwordHash en la base de datos usando bcrypt"
  );

  console.log("🌱 Seed completado exitosamente");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });