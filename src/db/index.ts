import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from "./schema"
import postgres from 'postgres'

export const db = drizzle(process.env.DATABASE_URL!, { schema });

async function main() {
    const client = postgres(process.env.DATABASE_URL!)
    drizzle({ client });
}

main();
