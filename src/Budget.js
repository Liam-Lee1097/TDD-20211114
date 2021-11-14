const dayjs = require('dayjs');

class Budget {
    constructor(dateString, amount) {
        this.date = dayjs(dateString);
        this.amount = amount;
    }


}

module.exports = Budget;
