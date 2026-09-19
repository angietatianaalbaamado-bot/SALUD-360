# Módulo: Seguridad y Accesos

## Entidades incluidas

- `users`, `roles`, `permissions`, `role_permissions`, `user_roles`, `sessions`, `audit_logs`

## Endpoints implementados

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| POST | `/auth/register` | Crear un usuario nuevo (encripta la contraseña con bcrypt) | No |
| POST | `/auth/login` | Iniciar sesión, devuelve un JWT | No |
| GET | `/auth/me` | Ver el perfil del usuario autenticado | Sí (JWT) |

## Cómo usarlo desde otro módulo

Para proteger un endpoint con autenticación, en cualquier controlador:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Get('ruta-protegida')
miMetodo(@Request() req) {
  // req.user.userId tiene el ID del usuario autenticado
}
```

## Seguridad implementada

- Contraseñas nunca se guardan en texto plano — se usa `bcrypt` con 10 rounds
- El campo `password_hash` nunca se devuelve en las respuestas (se excluye manualmente)
- Login y registro quedan registrados en `audit_logs`
- Token JWT configurable por variables de entorno (`JWT_SECRET`, `JWT_EXPIRES_IN` en `.env`)

## Pendiente por hacer

- Endpoint para asignar roles a un usuario (`POST /auth/users/:id/roles`)
- CRUD de roles y permisos (crear/editar/eliminar)
- Recuperación de contraseña (forgot password)
- Registrar `ip_address` real en la tabla `sessions` (ahora mismo esa tabla existe en el SQL pero no se usa activamente — el JWT es stateless)

## Cómo probar

```bash
npm run start:dev
```

Swagger en `http://localhost:3000/api/docs`, sección "Seguridad y Accesos". Prueba primero `/auth/register`, luego `/auth/login` para obtener el token, y pégalo en el botón "Authorize" de Swagger para probar `/auth/me`.
