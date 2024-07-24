const WatchList = require('../models/Watchlist');

const getAllWatchList = async (req, res) => {
    const { user } = req.user.id;
    try {
        const watchList = await WatchList.find(user);
        return res.status(200).json(watchList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createWatchList = async (req, res) => {
    console.log(req.body)
    const { movieId } = req.body;
    console.log(movieId)
    const user = req.user.id; // Assuming req.user is set by auth middleware
    try {
        const watchList = await WatchList.create({ user, movieId });
        return res.status(201).json(watchList);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Cannot create watchlist" });
    }
}

const deleteWatchList = async (req, res) => {
    const { movieId } = req.query;
    console.log(req.query);
    const user = req.user.id; // Assuming req.user is set by auth middleware
    console.log(user)
    try {
        await WatchList.deleteMany({user, movieId});
        return res.status(200).json({ message: 'Watchlist deleted successfully' });
    } catch (error) {
        return res.status(401).json({ message: "Cannot delete watchlist" });
    }
}

module.exports = { getAllWatchList, createWatchList, deleteWatchList };