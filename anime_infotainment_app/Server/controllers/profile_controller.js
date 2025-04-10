import User from '../models/user.js';


const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      console.error('User ID not found in req.user after verifyToken');
      return res.status(401).json({ message: 'Authentication error' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
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

    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export default { getProfile, updateProfile };