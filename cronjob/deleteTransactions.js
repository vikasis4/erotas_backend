const Transactions = require('../modals/transactions');

const cleanTransactions = async () => {
    var dateS = new Date();
    dateS.setHours(0)
    dateS.setMinutes(50)
    await Transactions.deleteMany({ paid: false, createdAt: { $lt: dateS } });
}

module.exports = cleanTransactions