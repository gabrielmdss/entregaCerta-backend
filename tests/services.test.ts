import { test } from "node:test";
import assert from "node:assert/strict";
import EstoqueService from "../src/application/services/estoque.service";
import AssistidoService from "../src/application/services/assistido.service";
import RetiradaService from "../src/application/services/retirada.service";
import AppError from "../src/application/errors/appError";

const fail = () => { throw new Error("escrita não deveria ocorrer"); };

async function expectStatus(p: Promise<unknown>, statusCode: number, message?: string) {
  await assert.rejects(p, (e: any) => {
    assert.ok(e instanceof AppError);
    assert.equal(e.statusCode, statusCode);
    if (message) assert.equal(e.message, message);
    return true;
  });
}

function estoqueRepo(item: any = null, byDesc: any = null): any {
  return {
    selectAll: async () => [], selectById: async () => item, selectByDescricao: async () => byDesc,
    insert: fail, update: fail, delete: fail, adjustStock: async (id: number, q: number) => ({ ...item, quantidade: item.quantidade + q }),
  };
}

test("estoque: ajuste com estoque insuficiente -> 400", async () => {
  const s = new EstoqueService(estoqueRepo({ id: 1, descricao: "Cesta", quantidade: 2 }));
  await expectStatus(s.adjustStock(1, -5), 400, "Quantidade de Cesta(s) insuficiente");
});
test("estoque: ajuste válido continua funcionando", async () => {
  const s = new EstoqueService(estoqueRepo({ id: 1, descricao: "Cesta", quantidade: 2 }));
  assert.equal((await s.adjustStock(1, -2))?.quantidade, 0);
});
test("estoque: ajuste de item inexistente -> 404", async () => {
  await expectStatus(new EstoqueService(estoqueRepo()).adjustStock(99, 1), 404);
});
test("estoque: item duplicado -> 409", async () => {
  const s = new EstoqueService(estoqueRepo(null, { id: 1, descricao: "Cesta", quantidade: 1 }));
  await expectStatus(s.insert({ descricao: "Cesta", quantidade: 1 } as any), 409, "Item já cadastrado");
});
test("estoque: dados faltando -> 400", async () => {
  await expectStatus(new EstoqueService(estoqueRepo()).insert({} as any), 400);
});
test("estoque: update/delete inexistente -> 404", async () => {
  const s = new EstoqueService(estoqueRepo());
  await expectStatus(s.update(9, {} as any), 404);
  await expectStatus(s.delete(9), 404);
});

function assistidoRepo(item: any = null): any {
  return { selectAll: async () => [], selectById: async () => item, selectByDocumento: async () => item,
    insert: fail, update: fail, delete: fail, countAllAssistidos: async () => 0 };
}
test("assistido: documento duplicado -> 409", async () => {
  const s = new AssistidoService(assistidoRepo({ id: 1 }));
  await expectStatus(s.insert({ nome: "A", documento: "1", data_nascimento: "2000-01-01" } as any), 409, "Documento já cadastrado");
});
test("assistido: update/delete inexistente -> 404; total vazio continua 404", async () => {
  const s = new AssistidoService(assistidoRepo());
  await expectStatus(s.update(9, { nome: "A" } as any), 404);
  await expectStatus(s.delete(9), 404);
  await expectStatus(s.countAllAssistidos(), 404);
});

function retiradaRepo(): any {
  return { selectById: async () => null, update: fail, delete: fail, insert: fail,
    selectLastFive: async () => [], countByMes: async () => [], selectByDataIntervalo: async () => [] };
}
test("retirada: update/delete inexistente -> 404; listas vazias continuam 404", async () => {
  const s = new RetiradaService(retiradaRepo(), estoqueRepo(), assistidoRepo());
  await expectStatus(s.update(9, {} as any), 404);
  await expectStatus(s.delete(9), 404);
  await expectStatus(s.selectLastFiveRetiradas(), 404);
  await expectStatus(s.countRetiradasMesByAno("2026"), 404);
  await expectStatus(s.selectRetiradaByDataIntervalo("2026-01-01", "2026-01-31"), 404);
});
test("retirada: estoque de cesta insuficiente -> 400", async () => {
  const s = new RetiradaService(retiradaRepo(), estoqueRepo(null, { id: 1, descricao: "Cesta", quantidade: 0 }), assistidoRepo({ id: 1 }));
  await expectStatus(s.insert({ assistido_id: 1 } as any), 400, "Estoque insuficiente");
});
