import dbConnect from '../../lib/dbConnect';
import User from '../../server/models/user'; // Adjust the path as needed
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const { first_name, last_name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return Response.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json({ message: 'Error registering user' }, { status: 500 });
  }
}