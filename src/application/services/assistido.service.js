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
class AssistidoService {
    constructor(assistidoRepository) {
        this.assistidoRepository = assistidoRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.assistidoRepository.selectAll();
            return index;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.assistidoRepository.selectById(id);
            if (!show) {
                throw new appError_1.default("Assistido não encontrado", status.NOT_FOUND);
            }
            return show;
        });
    }
    getByDocumento(documento) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.assistidoRepository.selectByDocumento(documento);
            if (!show) {
                throw new appError_1.default("Assistido não encontrado", status.NOT_FOUND);
            }
            return show;
        });
    }
    insert(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.nome || !input.documento) {
                throw new appError_1.default("Preencha todos os dados", status.BAD_REQUEST);
            }
            const assistidoByDocumento = yield this.assistidoRepository.selectByDocumento(input.documento);
            if (assistidoByDocumento) {
                throw new appError_1.default("Documento já cadastrado", status.INTERNAL_SERVER);
            }
            const assistido = yield this.assistidoRepository.insert(input);
            return assistido;
        });
    }
    update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const assistido = yield this.assistidoRepository.selectById(id);
            if (!assistido) {
                throw new appError_1.default("Assistido não encontrado", status.INTERNAL_SERVER);
            }
            const assistidoAtualizado = yield this.assistidoRepository.update(id, input);
            return assistidoAtualizado;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const assistido = yield this.assistidoRepository.selectById(id);
            if (!assistido) {
                throw new appError_1.default("Assistido não encontrado", status.INTERNAL_SERVER);
            }
            const deleteAssistido = yield this.assistidoRepository.delete(id);
            return;
        });
    }
    countAllAssistidos() {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.assistidoRepository.countAllAssistidos();
            if (!show) {
                throw new appError_1.default("Nenhum assistido cadastrado", status.NOT_FOUND);
            }
            return show;
        });
    }
}
exports.default = AssistidoService;
