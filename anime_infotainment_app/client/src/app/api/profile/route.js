import dbConnect from '../../lib/dbConnect';
import User from '../../server/models/user'; // Adjust the path as needed
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    await dbConnect();
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return Response.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const token = req.headers.get('authorization')?.split(' ')[1];
    const { name, email, birthday, country } = await req.json();

    if (!token) {
      return Response.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { name, email, birthday, country },
      { new: true }
    );

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}