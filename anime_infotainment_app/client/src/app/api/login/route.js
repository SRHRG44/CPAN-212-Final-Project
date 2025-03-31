import dbConnect from '../../lib/dbConnect';
import User from '../../server/models/user'; // Adjust the path as needed
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return Response.json({ token, message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return Response.json({ message: 'Error logging in' }, { status: 500 });
  }
}