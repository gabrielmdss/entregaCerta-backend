import { test } from "node:test";
import assert from "node:assert/strict";
import { agruparRetiradasPorMes } from "../src/application/utils/retiradas.por.mes";

const nomeMes = (mes: number) =>
  new Date(Date.UTC(2026, mes - 1, 1)).toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  });

test("retirada do dia 1º à meia-noite UTC conta no próprio mês", () => {
  const resultado = agruparRetiradasPorMes([
    new Date("2026-09-01T00:00:00.000Z"),
    new Date("2026-09-15T00:00:00.000Z"),
    new Date("2026-08-31T00:00:00.000Z"),
  ]);

  assert.deepEqual(
    resultado.find((r) => r.mes === `${nomeMes(9)} de 2026`)?.total,
    2
  );
  assert.deepEqual(
    resultado.find((r) => r.mes === `${nomeMes(8)} de 2026`)?.total,
    1
  );
});

test("virada de ano em UTC não muda o ano do agrupamento", () => {
  const resultado = agruparRetiradasPorMes([
    new Date("2026-01-01T00:00:00.000Z"),
  ]);

  assert.deepEqual(resultado, [{ mes: `${nomeMes(1)} de 2026`, total: 1 }]);
});

test("lista vazia retorna array vazio", () => {
  assert.deepEqual(agruparRetiradasPorMes([]), []);
});
