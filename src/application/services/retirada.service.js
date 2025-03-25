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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../errors/appError"));
const status = __importStar(require("../../constraints/http.status"));
class RetiradaService {
    constructor(retiradaRepository) {
        this.retiradaRepository = retiradaRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.retiradaRepository.selectAll();
            return index;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.retiradaRepository.selectById(id);
            if (!show) {
                throw new appError_1.default("Retirada não encontrada", status.NOT_FOUND);
            }
            return show;
        });
    }
    getByAssistidoId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.retiradaRepository.selectByAssistidoId(id);
            if (!show) {
                throw new appError_1.default("Retirada não encontrada", status.NOT_FOUND);
            }
            return show;
        });
    }
    insert(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.assistido_id) {
                throw new appError_1.default("Preencha todos os dados", status.BAD_REQUEST);
            }
            const retirada = yield this.retiradaRepository.insert(input);
            return retirada;
        });
    }
    update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const retirada = yield this.retiradaRepository.selectById(id);
            if (!retirada) {
                throw new appError_1.default("Retirada não encontrada", status.INTERNAL_SERVER);
            }
            const retiradaAtualizada = yield this.retiradaRepository.update(id, input);
            return retiradaAtualizada;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const retirada = yield this.retiradaRepository.selectById(id);
            if (!retirada) {
                throw new appError_1.default("Retirada não encontrado", status.INTERNAL_SERVER);
            }
            const deleteRetirada = yield this.retiradaRepository.delete(id);
            return;
        });
    }
    countRetiradasByAssistidoId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.retiradaRepository.countRetiradasByAssistido(id);
            if (!show) {
                throw new appError_1.default("Retirada não encontrada", status.NOT_FOUND);
            }
            return show;
        });
    }
    selectRetiradasByData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.retiradaRepository.selectByData(data);
            if (!index) {
                throw new appError_1.default("Retirada não encontrada nesta data", status.NOT_FOUND);
            }
            return index;
        });
    }
    selectRetiradaByDataIntervalo(dataInicial, dataFinal) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataInicial || !dataFinal) {
                throw new appError_1.default("As datas de início e fim são obrigatórias.", status.BAD_REQUEST);
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(dataInicial) || !dateRegex.test(dataFinal)) {
                throw new appError_1.default("As datas devem estar no formato 'AAAA-MM-DD'.", status.BAD_REQUEST);
            }
            if (new Date(dataInicial) > new Date(dataFinal)) {
                throw new appError_1.default("A data inicial não pode ser posterior à data final.", status.BAD_REQUEST);
            }
            const retiradas = yield this.retiradaRepository.selectByDataIntervalo(dataInicial, dataFinal);
            if (!retiradas) {
                throw new appError_1.default("Nenhuma retirada encontrada no intervalo especificado.", status.NOT_FOUND);
            }
            return retiradas;
        });
    }
    countRetiradasMesByAno(ano) {
        return __awaiter(this, void 0, void 0, function* () {
            const retiradas = yield this.retiradaRepository.countByMes(ano);
            if (!retiradas || !retiradas.length) {
                throw new appError_1.default("Retiradas não encontradas neste ano", status.NOT_FOUND);
            }
            return retiradas;
        });
    }
}
exports.default = RetiradaService;
