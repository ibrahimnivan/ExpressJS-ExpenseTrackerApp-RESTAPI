"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.patchExpense = exports.getExpense = exports.postExpenses = exports.getExpenses = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const enum_1 = require("../../common/enum");
const constant_1 = require("../../common/constant");
const moment_1 = __importDefault(require("moment"));
const getFilePath = () => {
    return path_1.default.join(__dirname, "../../../data/expenses.json");
};
const getCurrentId = (expenses) => {
    if (!expenses || !Array.isArray(expenses) || expenses.length === 0) { //jika array masih kosong
        return 1;
    }
    const lastId = expenses[expenses.length - 1].id;
    return lastId + 1;
};
const readFileFromJson = () => {
    const jsonPath = getFilePath();
    const expenses = (0, fs_1.readFileSync)(jsonPath, "utf-8");
    return JSON.parse(expenses);
};
const writeFileIntoJson = (data) => {
    const jsonPath = getFilePath();
    (0, fs_1.writeFileSync)(jsonPath, JSON.stringify(data, null, 2), "utf-8");
    return data;
};
const getExpenses = (req, res) => {
    const { category, startdate, enddate } = req.query; // for category sorting
    let expenses = readFileFromJson();
    if (category) {
        expenses = expenses.filter((expense) => expense.category.toLowerCase() === String(category).toLowerCase());
    }
    if (startdate && enddate) {
        const startDateMoment = (0, moment_1.default)(String(startdate));
        const endDateMoment = (0, moment_1.default)(String(enddate));
        if (startDateMoment.isAfter(endDateMoment)) {
            return res.status(enum_1.HttpStatus.BAD_REQUEST).json({
                code: enum_1.HttpStatus.BAD_REQUEST,
                message: "startdate is newer than enddate"
            });
        }
        expenses = expenses.filter((expense) => (0, moment_1.default)(expense.date).isSameOrBefore(endDateMoment) && (0, moment_1.default)(expense.date).isSameOrAfter(startDateMoment));
    }
    return res.status(enum_1.HttpStatus.OK).json({
        code: enum_1.HttpStatus.OK,
        message: constant_1.SUCCESS,
        data: expenses,
    });
};
exports.getExpenses = getExpenses;
const postExpenses = (req, res) => {
    const { name, nominal, category } = req.body;
    if (!name || !nominal || !category) {
        return res.status(enum_1.HttpStatus.BAD_REQUEST).json({
            code: enum_1.HttpStatus.BAD_REQUEST,
            message: "required field cannot be empty",
        });
    }
    const inputPayload = {
        name,
        nominal,
        category
    };
    const expenses = readFileFromJson();
    const currentId = getCurrentId(expenses);
    const currrentDate = (0, moment_1.default)().toDate();
    const expense = Object.assign({ id: currentId, date: currrentDate }, inputPayload);
    expenses.push(expense);
    writeFileIntoJson(expenses);
    return res.status(enum_1.HttpStatus.CREATED).json({
        code: enum_1.HttpStatus.CREATED,
        message: constant_1.SUCCESS,
        data: expenses
    });
};
exports.postExpenses = postExpenses;
const getExpense = (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(enum_1.HttpStatus.BAD_REQUEST).json({
            code: enum_1.HttpStatus.BAD_REQUEST,
            message: "Id must be integer",
        });
    }
    const expenses = readFileFromJson();
    const expense = expenses.find(item => item.id === parseInt(id));
    // validasi
    if (!expense) {
        return res.status(enum_1.HttpStatus.NOT_FOUND).json({
            code: enum_1.HttpStatus.NOT_FOUND,
            message: `Expense with id ${id} not found`
        });
    }
    console.log("expense", expense);
    return res.status(enum_1.HttpStatus.OK).json({
        code: enum_1.HttpStatus.OK,
        message: constant_1.SUCCESS,
        data: expense,
    });
};
exports.getExpense = getExpense;
// PATCH
const patchExpense = (req, res) => {
    const { id } = req.params;
    const { name, nominal, category } = req.body;
    if (isNaN(parseInt(id))) {
        return res.status(enum_1.HttpStatus.BAD_REQUEST).json({
            code: enum_1.HttpStatus.BAD_REQUEST,
            message: "Id must be integer",
        });
    }
    const expenses = readFileFromJson();
    const expense = expenses.find(item => item.id === parseInt(id));
    // validasi
    if (!expense) {
        return res.status(enum_1.HttpStatus.NOT_FOUND).json({
            code: enum_1.HttpStatus.NOT_FOUND,
            message: `Expense with id ${id} not found`
        });
    }
    const indexOfCurrentExpense = expenses.map((expense) => expense.id).indexOf(parseInt(id)); // mencari index dari id
    const newExpense = {
        id: expense.id,
        name: name || expense.name,
        nominal: nominal || expense.nominal,
        category: category || expense.category,
        date: expense.date
    };
    expenses.splice(indexOfCurrentExpense, 1, newExpense); // for replace
    writeFileIntoJson(expenses);
    return res.status(enum_1.HttpStatus.OK).json({
        code: enum_1.HttpStatus.OK,
        message: constant_1.SUCCESS,
        data: expenses,
    });
};
exports.patchExpense = patchExpense;
// DELETE
const deleteExpense = (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(enum_1.HttpStatus.BAD_REQUEST).json({
            code: enum_1.HttpStatus.BAD_REQUEST,
            message: "Id must be integer",
        });
    }
    const expenses = readFileFromJson();
    const expense = expenses.find(item => item.id === parseInt(id));
    // validasi
    if (!expense) {
        return res.status(enum_1.HttpStatus.NOT_FOUND).json({
            code: enum_1.HttpStatus.NOT_FOUND,
            message: `Expense with id ${id} not found`
        });
    }
    const indexOfCurrentExpense = expenses.map((expense) => expense.id).indexOf(parseInt(id)); // mencari index dari id
    expenses.splice(indexOfCurrentExpense, 1); // for delete
    writeFileIntoJson(expenses);
    return res.status(enum_1.HttpStatus.OK).json({
        code: enum_1.HttpStatus.OK,
        message: constant_1.SUCCESS,
        data: expenses,
    });
};
exports.deleteExpense = deleteExpense;
