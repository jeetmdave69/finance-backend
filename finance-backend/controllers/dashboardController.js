const Record = require('../models/record');

// get summary
exports.getSummary = async (req, res) => {
    try {
        const records = await Record.find();

        let totalIncome = 0;
        let totalExpense = 0;

        const categoryMap = {};

        records.forEach(record => {
            if (record.type === 'income') {
                totalIncome += record.amount;
            } else {
                totalExpense += record.amount;
            }

            // category breakdown
            if (!categoryMap[record.category]) {
                categoryMap[record.category] = 0;
            }

            categoryMap[record.category] += record.amount;
        });

        const balance = totalIncome - totalExpense;

        res.json({
            totalIncome,
            totalExpense,
            balance,
            categoryBreakdown: categoryMap
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};