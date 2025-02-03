"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = require("./routers");
const app = (0, express_1.default)();
(0, routers_1.routes)(app);
app.listen(3000, () => {
    console.log("SERVIDOR NA PORTA 3000");
});
//# sourceMappingURL=server.js.map