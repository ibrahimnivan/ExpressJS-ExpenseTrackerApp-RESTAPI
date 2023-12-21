"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const expenseRouter_1 = __importDefault(require("./router/expenseRouter"));
dotenv_1.default.config(); // tidak berada di dalam if
console.log('dirname', __dirname);
console.log("NODE_ENV:", process.env.NODE_ENV);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('', (req, res, next) => {
    try {
        res.send("kunaon");
    }
    catch (error) {
        next(error);
    }
});
// Router
app.use("/expenses", expenseRouter_1.default);
app.listen(port, () => {
    console.log("Server is running on port", port);
});
