import User from '../models/user.js';
// No need to import jwt here

const getProfile = async (req, res) => {
  try {
    // The 'verifyToken' middleware already found the user and attached it to req.user
    // We just need the user's ID from the attached user object.
    const userId = req.user?.id; // Use optional chaining just in case

    if (!userId) {
       // This case should ideally be caught by middleware, but good to double-check
       console.error('User ID not found in req.user after verifyToken');
       return res.status(401).json({ message: 'Authentication error' });
    }

    // Find the user using the ID provided by the middleware
    const user = await User.findById(userId).select('-password'); // Exclude password hash

    if (!user) {
      // This might happen if the user was deleted between token generation and now
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send user data (without password)
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
       console.error('User ID not found in req.user for update');
       return res.status(401).json({ message: 'Authentication error' });
    }

    // Find user by ID from middleware and update with request body
    // { new: true } returns the updated document
    // Prevent password updates through this route for security
    const { password, ...updateData } = req.body; // Exclude password from updateData

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send back updated user data
  } catch (error) {
    console.error('Error updating profile:', error);
    // Add more specific error checking if needed (e.g., validation errors)
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export default { getProfile, updateProfile };