import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeDocumento, hashDocumento } from "../src/application/utils/documento.hash";
import AssistidoService from "../src/application/services/assistido.service";
import AppError from "../src/application/errors/appError";

test("normalizeDocumento remove não dígitos e trata nulos", () => {
  assert.equal(normalizeDocumento("123.456.789-00"), "12345678900");
  assert.equal(normalizeDocumento(" 12 34 "), "1234");
  assert.equal(normalizeDocumento(undefined), "");
  assert.equal(normalizeDocumento(null), "");
});

test("hashDocumento: igual com/sem pontuação, diferente para outro documento", () => {
  const h = hashDocumento("123.456.789-00");
  assert.match(h, /^[0-9a-f]{64}$/);
  assert.equal(h, hashDocumento("12345678900"));
  assert.notEqual(h, hashDocumento("12345678901"));
});

test("hashDocumento depende da chave e exige chave válida", () => {
  const original = process.env.DOCUMENTO_HASH_KEY;
  try {
    const h1 = hashDocumento("12345678900");
    process.env.DOCUMENTO_HASH_KEY = "2".repeat(64);
    assert.notEqual(hashDocumento("12345678900"), h1);
    delete process.env.DOCUMENTO_HASH_KEY;
    assert.throws(() => hashDocumento("1"), /DOCUMENTO_HASH_KEY/);
  } finally {
    process.env.DOCUMENTO_HASH_KEY = original;
  }
});

function repo(byDoc: any, calls: { byDoc: number; update: number }): any {
  return {
    selectAll: async () => [],
    selectById: async (id: number) => ({ id, nome: "X", documento: "1" }),
    selectByDocumento: async () => { calls.byDoc++; return byDoc; },
    insert: async (i: any) => ({ id: 9, ...i }),
    update: async (id: number, i: any) => { calls.update++; return { id, ...i }; },
    delete: async () => {}, countAllAssistidos: async () => 0,
  };
}
const is409 = (e: any) => e instanceof AppError && e.statusCode === 409 && e.message === "Documento já cadastrado";

test("insert com documento duplicado -> 409", async () => {
  const c = { byDoc: 0, update: 0 };
  const s = new AssistidoService(repo({ id: 1 }, c));
  await assert.rejects(s.insert({ nome: "B", documento: "12345678900", data_nascimento: "2000-01-01" } as any), is409);
});

test("update mantendo o próprio documento -> OK", async () => {
  const c = { byDoc: 0, update: 0 };
  const s = new AssistidoService(repo({ id: 1 }, c));
  await s.update(1, { documento: "123.456.789-00" } as any);
  assert.equal(c.update, 1);
});

test("update para documento de outro assistido -> 409", async () => {
  const c = { byDoc: 0, update: 0 };
  const s = new AssistidoService(repo({ id: 1 }, c));
  await assert.rejects(s.update(2, { documento: "12345678900" } as any), is409);
  assert.equal(c.update, 0);
});

test("update sem documento não consulta duplicidade", async () => {
  const c = { byDoc: 0, update: 0 };
  const s = new AssistidoService(repo({ id: 1 }, c));
  await s.update(2, { nome: "Novo" } as any);
  assert.equal(c.byDoc, 0);
  assert.equal(c.update, 1);
});
