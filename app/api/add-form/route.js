import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const formName = searchParams.get('formName');
 
  try {
    if (!formName) throw new Error('Form name required');
    await sql`INSERT INTO forms (name) VALUES (${formName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const forms = await sql`SELECT * FROM forms;`;
  return NextResponse.json({ forms }, { status: 200 });
}