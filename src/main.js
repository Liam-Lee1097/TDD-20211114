const Budget = require('./Budget');
const BudgetRepo = require('./BudgetRepo');
const BudgetService = require('./BudgetService');

let budgetRepo;
let budgetService;
initBudget([['202106', 3000], ['202107', 0]]);

function initBudget(budgetRawList) {
    budgetRepo = new BudgetRepo(budgetRawList.map(budgetRaw => new Budget(budgetRaw[0], budgetRaw[1])));
    budgetService = new BudgetService(budgetRepo);
    console.log('budgetRawList', budgetRawList);
}

console.log('query', budgetService.query('20210601', '20210630')[0]);
