import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const gifts = [
  { name: "Set de pañales", detail: "Talla RN o etapa 1", icon: "Baby" },
  { name: "Toallitas húmedas y algodón", detail: "Paquetes grandes para el cambio", icon: "Sparkles" },
  { name: "Manta y muxilita", detail: "Suavecitas para sus siestas", icon: "Moon" },
  { name: "Set de biberones anticólico", detail: "Tamaño recién nacida", icon: "Milk" },
  { name: "Chupones y cadena chuponera", detail: "De silicona, preferiblemente", icon: "Heart" },
  { name: "Ropita de recién nacida", detail: "Talla 0, tonos suaves", icon: "Shirt" },
  { name: "Libros de tela y cuentos de nido", detail: "Para sus primeras lecturas", icon: "BookOpen" },
  { name: "Set de baño", detail: "Esponja, jabón neutro y toalla con capucha", icon: "Bath" },
  { name: "Cochecito o portabebé", detail: "El regalo grande de la lista", icon: "Backpack" },
  { name: "Kit de aseo", detail: "Cepillo, tijeras de punta redonda y cortauñas", icon: "Stethoscope" },
  { name: "Sonajeros y peluches blanditos", detail: "Que hagan sonidos suaves", icon: "Music" },
  { name: "Cesta de higiene", detail: "Crema, shampoo neutro y vaselina", icon: "Flower2" },
];

async function main() {
  const count = await db.gift.count();
  if (count === 0) {
    await db.gift.createMany({ data: gifts });
    console.log(`Seed listo: ${gifts.length} regalos creados.`);
  } else {
    console.log(`La lista ya tiene ${count} regalos; no se repite el seed.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
