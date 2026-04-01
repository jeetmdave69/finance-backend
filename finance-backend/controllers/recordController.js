const Record = require('../models/record');

// create record
exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, notes } = req.body;

        // basic validation
        if (!amount || !type || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const record = new Record({
            amount,
            type,
            category,
            date,
            notes
        });

        await record.save();
        res.status(201).json(record);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get records (with filters)
exports.getRecords = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let filter = {};

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const records = await Record.find(filter).sort({ date: -1 });

        res.json(records);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update record
exports.updateRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(record);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete record
exports.deleteRecord = async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);

        res.json({ message: "Record deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};