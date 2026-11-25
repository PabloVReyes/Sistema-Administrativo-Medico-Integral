import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "sami-development-secret-key-2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

// Extender el tipo Request para incluir el usuario autenticado
interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
    role: string;
  };
}

// Generar token JWT
function generateToken(userId: string, username: string, role: string): string {
  // Type assertion to avoid the expiresIn type issue
  return jwt.sign(
    { userId, username, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );
}

// Middleware de autenticación JWT
function authenticateToken(req: AuthRequest, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. Token no proporcionado.",
    });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Sesión expirada. Por favor, inicie sesión nuevamente.",
        });
      }
      return res.status(403).json({
        success: false,
        message: "Token inválido.",
      });
    }
    req.user = user;
    next();
  });
}

// Middleware de autorización por rol
function authorize(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: any) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "No tiene permisos para realizar esta acción.",
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "No tiene permisos suficientes para acceder a este recurso.",
      });
    }
    next();
  };
}

// ============================================================
// RUTAS DE AUTENTICACIÓN
// ============================================================

// Login - autenticar usuario y generar token
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son obligatorios.",
    });
  }

  // TODO: Validar contra base de datos con bcrypt
  // Por ahora, autenticación simple para desarrollo
  if (username === "admin" && password === "admin123") {
    const user = { userId: "1", username, role: "Administrador" };
    const token = generateToken(user.userId, user.username, user.role);
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: { token, user: {
        id: user.userId,
        username: user.username,
        role: user.role,
      }},
    });
  }

  return res.status(401).json({
    success: false,
    message: "Usuario o contraseña incorrectos.",
  });
});

// Verificar token (endpoint público para testing)
app.get("/api/auth/me", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

// ============================================================
// RUTAS DE PRUEBA CON RBAC
// ============================================================

// Dashboard - accessible to authenticated users
app.get("/api/dashboard", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      message: "Dashboard accessible",
      userRole: req.user?.role,
    },
  });
});

// Pacientes - require Admin or specific role
app.get("/api/patients", authenticateToken, authorize(["Administrador", "Médico", "Enfermería"]), (_req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      message: "Lista de pacientes",
    },
  });
});

// Citas - require appropriate role
app.get("/api/appointments", authenticateToken, authorize(["Administrador", "Médico", "Recepción"]), (_req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      message: "Lista de citas",
    },
  });
});

// Usuarios - solo Admin
app.get("/api/users", authenticateToken, authorize(["Administrador"]), (_req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      message: "Lista de usuarios",
    },
  });
});

// Roles - require appropriate role
app.get("/api/roles", authenticateToken, authorize(["Administrador", "Dirección"]), (_req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      message: "Roles y permisos",
    },
  });
});

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Server
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});