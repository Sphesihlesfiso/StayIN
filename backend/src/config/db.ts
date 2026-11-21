import { PrismaClient } from "@prisma/client";
/**
 *Type-safe database client for TypeScript & Node.js
 *@example
    
```
const prisma = new PrismaClient()
// Fetch zero or more Amenities
const amenities = await prisma.amenity.findMany()
```
*/



const prisma=new PrismaClient();

export default prisma


