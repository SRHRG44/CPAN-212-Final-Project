import { MongoClient } from 'mongodb';

import dbConnect from '../../lib/dbConnect';
import Contact from '../../server/models/contact'; // Adjust the path as needed

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, message } = await req.json();

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();
    return Response.json({ message: 'Form submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return Response.json({ message: 'Failed to submit form' }, { status: 500 });
  }
}