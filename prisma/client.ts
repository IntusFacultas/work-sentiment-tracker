

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const generateClient = () => {
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const client = new PrismaClient({ adapter })
    if (process.env.NODE_ENV !== 'production') {
        global.prisma = client
    }
    return client
};

declare global {
    var prisma: ReturnType<typeof generateClient>;
}

export const prisma = global.prisma || generateClient()


