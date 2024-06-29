"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const firebase_config_1 = __importDefault(require("./firebase/firebase.config"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: ['log', 'error'] });
    app.enableCors({
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    });
    firebase_config_1.default.setupFirebase();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map