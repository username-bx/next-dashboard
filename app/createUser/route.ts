import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

const client = await db.connect();

// async function createUser() {
//   const user = {
//     id: uuidv4(),
//     name: "Altman",
//     email: "a@gmail.com",
//     password: "123",
//   };
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
// }

async function updateUser() {
    const user = {
        password: "123456",
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
      client.sql`
        UPDATE users
        SET password = ${hashedPassword}
        WHERE name = 'Altman'
      `;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    // await createUser();
    await updateUser();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
