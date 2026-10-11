// Ambiente isolado para testes: não depende do .env nem do banco local.
process.env.CRYPTO_KEY = process.env.CRYPTO_KEY || "0".repeat(64);
process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/test_nao_usado";
process.env.DOCUMENTO_HASH_KEY = "1".repeat(64);
