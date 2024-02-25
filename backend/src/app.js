"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const buyersRoute_1 = __importDefault(require("./routes/buyersRoute"));
const vendorsRoute_1 = __importDefault(require("./routes/vendorsRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(appointmentRoutes_1.default);
app.use(vendorsRoute_1.default);
app.use(buyersRoute_1.default);
//define a basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
