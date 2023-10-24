"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = require("mongoose");
const connectToDatabase = async () => {
    try {
        await (0, mongoose_1.connect)(`mongodb+srv://lambeezra:${process.env.MONGODB_PASSWORD}@cluster0.dnh9ww4.mongodb.net/?retryWrites=true&w=majority`);
    }
    catch (e) {
        console.log(e);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=connection.js.map