const Budget = require('./Budget');

class BudgetRepo {

  constructor(budgetList) {
    /**
     * @type {Array<Budget>}
     */
    this.budgetList = budgetList;
  }
  getAll() {
    return this.budgetList;
  }
}

module.exports = BudgetRepo;
