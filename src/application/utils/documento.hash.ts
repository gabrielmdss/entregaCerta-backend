import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

/** Remove tudo que não for dígito (ex.: "123.456.789-00" -> "12345678900"). */
export function normalizeDocumento(documento: unknown): string {
  return String(documento ?? '').replace(/\D/g, '');
}

// Carregamento lazy: a chave só é exigida quando um hash é calculado.
function getHashKey(): Buffer {
  const hex = process.env.DOCUMENTO_HASH_KEY;
  if (!hex || !/^[0-9a-fA-F]{64}$/.test(hex)) {
    throw new Error('DOCUMENTO_HASH_KEY ausente ou inválida (esperado 64 caracteres hexadecimais).');
  }
  return Buffer.from(hex, 'hex');
}

/** HMAC-SHA256 (hex) do documento normalizado; determinístico para busca/unicidade. */
export function hashDocumento(documento: unknown): string {
  return crypto.createHmac('sha256', getHashKey()).update(normalizeDocumento(documento)).digest('hex');
}
