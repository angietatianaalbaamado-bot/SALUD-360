# MÃ³dulo 7 â€” Laboratorio e ImÃ¡genes

Este mÃ³dulo cubre las 12 tablas asignadas:
`laboratory_orders`, `laboratory_tests`, `laboratory_results`, `laboratory_categories`,
`imaging_orders`, `imaging_results`, `imaging_types`,
`procedures`, `procedure_types`, `surgery_rooms`,
`vaccines`, `vaccination_records`.

## CÃ³mo integrarlo en tu copia local (siguiendo las 5 reglas del equipo)

### 1. Crea tu rama desde `develop` actualizado
```bash
git checkout develop
git pull origin develop
git checkout -b feature/laboratory-imaging
```

### 2. Copia la carpeta del mÃ³dulo
Copia todo el contenido de `src/laboratory-imaging/` dentro de la carpeta `src/` de tu proyecto NestJS (junto a `patients/`, `pharmacy/`, etc.). **No toques `app.module.ts` todavÃ­a.**

### 3. Cuando estÃ©s listo para conectarlo, avisa en el grupo y agrega en `app.module.ts`:
```ts
import { LaboratoryImagingModule } from './laboratory-imaging/laboratory-imaging.module';

@Module({
  imports: [
    // ...mÃ³dulos existentes de tus compaÃ±eros
    LaboratoryImagingModule,
  ],
})
export class AppModule {}
```

### 4. Base de datos local
Mientras desarrollas, apunta tu `.env` / configuraciÃ³n de TypeORM a **tu propia base de datos PostgreSQL local**, con `synchronize: true` solo ahÃ­. TypeORM crearÃ¡ automÃ¡ticamente las 12 tablas con los nombres exactos del diagrama ER porque cada entidad usa `@Entity('nombre_exacto_de_la_tabla')`.

### 5. Referencias sueltas (no relaciones reales aÃºn)
Los campos `patient_id`, `doctor_id` y `applied_by` estÃ¡n como columnas numÃ©ricas simples (`@Column`), **no** como `@ManyToOne`, porque los mÃ³dulos de Pacientes y Personal MÃ©dico todavÃ­a no existen conectados. Esto sigue la regla 4 â€” cuando el equipo decida conectar relaciones reales entre mÃ³dulos, ahÃ­ se cambian esos campos.

## Estructura de carpetas
```
laboratory-imaging/
â”œâ”€â”€ entities/              (las 12 entidades TypeORM)
â”œâ”€â”€ laboratory/             (categorÃ­as, pruebas, Ã³rdenes y resultados de laboratorio)
â”œâ”€â”€ imaging/                 (tipos, Ã³rdenes y resultados de imÃ¡genes)
â”œâ”€â”€ procedures/               (tipos de procedimiento, procedimientos, quirÃ³fanos)
â”œâ”€â”€ vaccination/               (vacunas y registros de vacunaciÃ³n)
â””â”€â”€ laboratory-imaging.module.ts
```

## Endpoints disponibles

| Recurso | Endpoints |
|---|---|
| Laboratorio | `GET/POST /laboratory/categories`, `GET/POST /laboratory/tests`, `GET/POST/PATCH /laboratory/orders`, `POST /laboratory/results`, `GET /laboratory/orders/:orderId/results` |
| ImÃ¡genes | `GET/POST /imaging/types`, `GET/POST/PATCH /imaging/orders`, `POST /imaging/results` |
| Procedimientos | `GET/POST /procedures/types`, `GET/POST /procedures/surgery-rooms`, `GET/POST/PATCH /procedures` |
| VacunaciÃ³n | `GET/POST /vaccination/vaccines`, `GET /vaccination/records`, `GET /vaccination/records/patient/:patientId`, `POST /vaccination/records` |

## Pendiente (a criterio de tu compaÃ±ero)
- DTOs con `class-validator` para las validaciones de entrada (los controladores reciben `@Body() body: any` por simplicidad; se puede endurecer despuÃ©s).
- Ajustar nombres de columnas si el diagrama ER (`salud360_modelo_er.dbml`) usa nombres distintos a los asumidos aquÃ­ â€” revisar antes de dar por definitivas las entidades (regla 3).
