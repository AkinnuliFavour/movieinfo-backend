const WatchList = require('../models/watchList');

const getAllWatchList = async (req, res) => {
    const { user } = req.body;
    try {
        const watchList = await WatchList.find(user);
        return res.status(200).json(watchList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createWatchList = async (req, res) => {
    const { user, url } = req.body;
    try {
        const watchList = await WatchList.create({ user, url });
        return res.status(201).json(watchList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteWatchList = async (req, res) => {
    const { id } = req.params;
    try {
        await WatchList.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Watchlist deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllWatchList, createWatchList, deleteWatchList };