"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAppService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
let ClientAppService = class ClientAppService {
    async getApp(file) {
        const basePath = 'dist/client';
        const filePath = (0, path_1.resolve)((0, path_1.join)(basePath, file ? 'static' + file : 'index.html'));
        return new Promise((resolve, reject) => {
            (0, fs_1.readFile)(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
};
ClientAppService = __decorate([
    (0, common_1.Injectable)()
], ClientAppService);
exports.ClientAppService = ClientAppService;
//# sourceMappingURL=client-app.service.js.map