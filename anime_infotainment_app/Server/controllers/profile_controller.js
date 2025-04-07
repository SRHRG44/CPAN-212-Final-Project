import User from '../models/user.js';

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
        res.json(user);
    } catch (error) {
        console.error('Error getting profile:', error);
        res.status(500).json({ message: 'Error getting profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
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