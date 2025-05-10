# Monorepo

La estructura es la misma que ya conocemos, en packages/app se encuentran las
aplicaciones, en packages/lib las librerías.

## Instalación

Antes de poder ejecutar la aplicación por primera vez, es necesario inicializar
el server y la base de datos:

1. `npm install` Hay veces que falla porque no encuentra la carpeta next en
   ecommerce/node_modules. Esto parece ser un error de Next.js y la solución es
   bastante tricky.
2. `npm run ecommerce-generate-db-client` Crea los objetos necesarios para poder
   trabajar con la base de datos
3. `npm run ecommerce-generate-db` Crea las tablas en la base de datos. **Este
   comando borra todo de la base primero**
4. **Ejecutar `src/lib/ecommerce/migrations/20250510171028_/initDatabase.sql` en
   `pgAdmin` para tener algunos datos de prueba.
5. Para levantar el server hay dos opciones:
   1. `npm run ecommerce-develop` Levanta el server en modo desarrollo, ideal
      para realizar cambios.
   2. `npm run ecommerce-production` Levanta el server en modo producción, ideal
      para ver el rendimiento real del sistema (mucho más rápido).

## Desarrollo de librerías

Ya se incluye una libería en `src/lib/common`.

Si la intención es agregar una librería nueva deberían copiarse los archivos de
common, de modo de generar una estructura unifore.
