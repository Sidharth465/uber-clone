import { neon } from "@neondatabase/serverless";

export async function POST(req) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  try {
    // Parse JSON from request body
    const { name, email, clerkId } = await req.json();
    
    // Check required fields
    if (!email || !name || !clerkId) {
      return new Response(JSON.stringify({ error: "Missing required field", status: 400 }), {
        status: 400,
      });
    }

    // Insert data into the database
    const user = await sql`
      INSERT INTO users (name, email, clerk_id)
      VALUES (${name}, ${email}, ${clerkId})
    `;

    // Return response with user data and status 201
    return new Response(JSON.stringify({ data: user, status: 201 }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error, status: 500 }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
