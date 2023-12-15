import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
    const formName = await request.json();
    

    try {
        if (!formName) throw new Error('Form name required');
        await sql`INSERT INTO forms (name) VALUES (${formName});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    const forms = await sql`SELECT * FROM forms;`;
    return NextResponse.json({ forms }, { status: 200 }); 
}