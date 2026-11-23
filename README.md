# Invitación Baby Shower — Patito de Limonada

Invitación digital interactiva para un Baby Shower de niña, estilo libro de cuentos ilustrado con temática de patito y limonada rosa.

## Cómo funciona

La invitación es una página web con la forma de un libro de cuentos:

1. **Portada** — libro cerrado con el patito de mascota; al tocarlo se abre con una animación 3D (rotación sobre el lomo del libro).
2. **Historia** — páginas del cuento con el patito leyendo y el texto de la invitación.
3. **Cuenta regresiva** — días, horas, minutos y segundos hasta el evento.
4. **Confirmar asistencia (RSVP)** — formulario que registra el nombre y ofrece confirmar por WhatsApp.
5. **Lista de regalos** — los invitados reservan un regalo; el sistema bloquea cada regalo al primer reservante para evitar duplicados.

## Stack técnico

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Prisma + SQLite
- Framer Motion para las animaciones

## Estructura

```
src/
  app/                  Páginas y rutas de API (RSVP y regalos)
  components/
    baby-shower/        Escenas de la invitación (portada, historia, RSVP, regalos)
    ui/                 Componentes shadcn/ui usados
  lib/
    event-config.ts     Datos del evento: nombre de la bebé, fecha, lugar, WhatsApp
    db.ts               Cliente Prisma
prisma/schema.prisma   Modelos: Gift (regalos) y Rsvp (confirmaciones)
```

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install        # o: bun install

# 2. Configurar la base de datos
#    Crear un archivo .env con:
#    DATABASE_URL="file:./db/custom.db"
npx prisma db push

# 3. Cargar la lista inicial de regalos
npx tsx scripts/seed-gifts.ts

# 4. Desarrollo
npm run dev        # http://localhost:3000
```

## Imágenes

Las ilustraciones del patito y el libro viven en `public/images/`:

| Archivo | Uso |
| --- | --- |
| `book-closed.png` / `book-open.png` | Portada y libro abierto |
| `hero-book-tree.png` | Escena principal del árbol |
| `duck-cover.png` | Mascota en la portada |
| `duck-reading.png` | Patito leyendo (página de historia) |
| `duck-letter.png` | Patito con la carta (sección RSVP) |
| `duck-envelope.png` / `duck-gifts.png` / `duck-mascot.png` | Decoración de regalos y detalles |
| `duck-favicon.png` | Favicon |

## Personalizar el evento

Todos los datos del evento se centralizan en `src/lib/event-config.ts`: nombre de la bebé, fecha y hora, lugar, organizadora y número de WhatsApp para las confirmaciones.
