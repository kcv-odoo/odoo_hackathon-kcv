"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genderEnum = exports.CreateUserDto = void 0;
const user_auth_dto_1 = require("./user.auth.dto");
class CreateUserDto extends user_auth_dto_1.UserAuthDto {
}
exports.CreateUserDto = CreateUserDto;
var genderEnum;
(function (genderEnum) {
    genderEnum["Male"] = "male";
    genderEnum["Female"] = "female";
    genderEnum["Others"] = "others";
})(genderEnum || (exports.genderEnum = genderEnum = {}));
//# sourceMappingURL=user.dto.js.map