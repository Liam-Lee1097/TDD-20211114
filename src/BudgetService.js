const _ = require('lodash');
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
const duration = require('dayjs/plugin/duration');
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(customParseFormat)

class BudgetService {
    constructor(repo) {
        /**
         * @type {BudgetRepo}
         */
        this.repo = repo;
    }

    /**
     *
     * @public
     * @param {String} startDate YYYYMMDD
     * @param {String} endDate YYYYMMDD
     * @returns {Number}
     */
    query(startDate, endDate) {
        let totalAmount = 0;
        let budgetEachDayByMonth = {};
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        const effectiveDaysOfMonth = this.getEffectiveDays(start, end);
        const budgetList = this.repo.budgetList;
        budgetList.forEach(function (budget) {
            budgetEachDayByMonth[budget.date.format('YYYYMM')] = budget.amount / budget.date.endOf('month').date();
        })
        Object.keys(effectiveDaysOfMonth).forEach(function (key) {
            if (key in budgetEachDayByMonth) {
                totalAmount = effectiveDaysOfMonth[key] * budgetEachDayByMonth[key] + totalAmount;
            }
        })
        return totalAmount;
    }

    getEffectiveDays(startDate, endDate) {
        let daysEachMonth = {};
        const betweenMonth = endDate.diff(startDate, 'month');
        if (endDate.diff(startDate, 'day') === 0) {
            daysEachMonth[startDate.format('YYYYMM')] = 1
        } else if (startDate.month() === endDate.month() && startDate.year() === endDate.year()) {
            daysEachMonth[startDate.format('YYYYMM')] = endDate.date() - startDate.date() + 1;
        } else {
            const sDayCount = dayjs(startDate).endOf('month').date() - dayjs(startDate).date() + 1;
            daysEachMonth[startDate.format('YYYYMM')] = sDayCount;
            for (let i = 1; i <= betweenMonth; i++) {
                daysEachMonth[dayjs(startDate).add(i, 'month').format('YYYYMM')] = dayjs(startDate).add(i, 'month').endOf('month').date();
            }
            const eDayCount = dayjs(endDate).date() - dayjs(endDate).startOf('month').date() + 1;
            daysEachMonth[endDate.format('YYYYMM')] = eDayCount;
        }
        return daysEachMonth;
    }
}

module.exports = BudgetService;
