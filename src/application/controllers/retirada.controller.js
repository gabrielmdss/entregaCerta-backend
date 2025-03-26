"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const status = __importStar(require("../../constraints/http.status"));
class RetiradaController {
    constructor(retiradaService) {
        this.retiradaService = retiradaService;
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = yield this.retiradaService.getAll();
                return response.status(status.SUCCESS).json(index);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    getById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const show = yield this.retiradaService.getById(+id);
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    getByAssistidoId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const show = yield this.retiradaService.getByAssistidoId(+id);
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    insert(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = request.body;
                const insert = yield this.retiradaService.insert(input);
                return response.status(status.CREATED).json(insert);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { input } = request.body;
                const update = yield this.retiradaService.update(+id, input);
                return response.status(status.SUCCESS).json(update);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteRetirada = yield this.retiradaService.delete(+id);
                return response.status(status.NO_CONTENT).json(deleteRetirada);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    countRetiradasByAssistidoId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const show = yield this.retiradaService.countRetiradasByAssistidoId(+id);
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    selectRetiradasByData(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = request.params;
                const show = yield this.retiradaService.selectRetiradasByData(data);
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    selectRetiradasByDataIntervalo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dataInicial, dataFinal } = request.params;
                const show = yield this.retiradaService.selectRetiradaByDataIntervalo(dataInicial, dataFinal);
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    countRetiradasMesByAno(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ano } = request.params;
                const show = yield this.retiradaService.countRetiradasMesByAno(ano);
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    selectLastFiveRetiradas(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const show = yield this.retiradaService.selectLastFiveRetiradas();
                return response.status(status.SUCCESS).json(show);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
}
exports.default = RetiradaController;
