import { Router, Request, Response } from "express";
import { getExpenses, postExpenses, getExpense, patchExpense, deleteExpense } from "../services/expenses";

const expenseRouter = Router()

expenseRouter.get('', getExpenses) // query by date and category
expenseRouter.post('', postExpenses)
expenseRouter.get('/:id', getExpense)
expenseRouter.patch('/:id', patchExpense)
expenseRouter.delete('/:id', deleteExpense)



export default expenseRouter