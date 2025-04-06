import User from '../../../server/models/user'; // Corrected path
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose'; // Import mongoose

export async function POST(req) {
  try {
    // Directly handle database connection
    if (mongoose.connection.readyState !== 1) { // Check if not connected
      const MONGODB_URI = process.env.MONGODB_URI;

      if (!MONGODB_URI) {
        throw new Error(
          'Please define the MONGODB_URI environment variable inside .env.local'
        );
      }

      await mongoose.connect(MONGODB_URI);
    }

    const { first_name, last_name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already in use." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return new Response(JSON.stringify({ message: "User registered successfully." }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ message: "Registration failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}