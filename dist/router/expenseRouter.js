"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenses_1 = require("../services/expenses");
const expenseRouter = (0, express_1.Router)();
expenseRouter.get('', expenses_1.getExpenses); // query by date and category
expenseRouter.post('', expenses_1.postExpenses);
expenseRouter.get('/:id', expenses_1.getExpense);
expenseRouter.patch('/:id', expenses_1.patchExpense);
expenseRouter.delete('/:id', expenses_1.deleteExpense);
exports.default = expenseRouter;
