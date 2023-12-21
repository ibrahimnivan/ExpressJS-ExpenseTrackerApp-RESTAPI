"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseRouter = (0, express_1.Router)();
expenseRouter.get('', (req, res) => {
    res.send("Hello from expanseRouter");
});
exports.default = expenseRouter;
