import { test } from "node:test";
import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import Errors from "../src/application/middlewares/errors";
import AppError from "../src/application/errors/appError";

function run(error: unknown) {
  const res: any = { statusCode: 0, body: undefined };
  res.status = (c: number) => ((res.statusCode = c), res);
  res.json = (b: unknown) => ((res.body = b), res);
  const origError = console.error;
  let logged = 0;
  console.error = () => { logged++; };
  try {
    Errors(error, { method: "GET", originalUrl: "/x" } as any, res, () => {});
  } finally {
    console.error = origError;
  }
  return { status: res.statusCode, body: res.body, logged };
}

const known = (code: string) =>
  new Prisma.PrismaClientKnownRequestError("detalhe interno", { code, clientVersion: "6.5.0" });

test("AppError preserva status e mensagem, sem log", () => {
  const r = run(new AppError("Item já cadastrado", 409));
  assert.equal(r.status, 409);
  assert.deepEqual(r.body, { status: "error", statusCode: 409, message: "Item já cadastrado" });
  assert.equal(r.logged, 0);
});

test("Prisma P2002 -> 409 sem vazar detalhes", () => {
  const r = run(known("P2002"));
  assert.equal(r.status, 409);
  assert.equal(r.body.statusCode, 409);
  assert.ok(!r.body.message.includes("detalhe interno"));
  assert.equal(r.logged, 0);
});

test("Prisma P2025 -> 404", () => {
  const r = run(known("P2025"));
  assert.equal(r.status, 404);
  assert.equal(r.body.message, "Registro não encontrado.");
});

test("Prisma validation -> 400", () => {
  const r = run(new Prisma.PrismaClientValidationError("x", { clientVersion: "6.5.0" }));
  assert.equal(r.status, 400);
});

test("erro genérico -> 500 com mensagem genérica e log", () => {
  const r = run(new Error("segredo interno"));
  assert.equal(r.status, 500);
  assert.deepEqual(r.body, { status: "error", statusCode: 500, message: "Erro interno do servidor." });
  assert.equal(r.logged, 1);
});
