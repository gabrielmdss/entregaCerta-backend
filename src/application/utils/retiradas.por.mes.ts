import { IRetiradasPorMes } from "../../domain/entity/retirada.entity";

// As datas de retirada são gravadas à meia-noite UTC; agrupar pelo fuso do
// servidor jogaria as retiradas do dia 1º no mês anterior.
export function agruparRetiradasPorMes(datas: Date[]): IRetiradasPorMes[] {
  const retiradasAgrupadas: Record<string, number> = {};

  datas.forEach((data) => {
    const mesAno = `${data.getUTCMonth() + 1}-${data.getUTCFullYear()}`;
    retiradasAgrupadas[mesAno] = (retiradasAgrupadas[mesAno] ?? 0) + 1;
  });

  return Object.keys(retiradasAgrupadas).map((key) => {
    const [mes, ano] = key.split("-").map(Number);
    const mesNome = new Date(Date.UTC(ano, mes - 1, 1)).toLocaleString(
      "default",
      { month: "long", timeZone: "UTC" }
    );
    return {
      mes: `${mesNome} de ${ano}`,
      total: retiradasAgrupadas[key],
    };
  });
}
