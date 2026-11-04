import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const PROPOSALS_FILE = path.join(DATA_DIR, 'propostas.json');

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PROPOSALS_FILE)) {
  fs.writeFileSync(PROPOSALS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

export interface StoredProposal {
  id: string;
  createdAt: string;
  name: string;
  specialty: string;
  city: string;
  whatsapp: string;
  email: string;
  patientVolume: string;
  message: string;
  status: string;
}

function getProposals(): StoredProposal[] {
  try {
    const raw = fs.readFileSync(PROPOSALS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveProposals(proposals: StoredProposal[]): void {
  fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals, null, 2), 'utf-8');
}

// POST endpoint: Store proposal securely
app.post('/api/propostas', (req, res) => {
  try {
    const { name, specialty, city, whatsapp, email, patientVolume, message } = req.body || {};

    if (!name || !specialty || !city || !whatsapp || !email || !patientVolume) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos obrigatórios devem ser preenchidos.',
      });
    }

    const proposals = getProposals();
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const protocol = `ISB-${dateStr}-${randomSuffix}`;

    const newProposal: StoredProposal = {
      id: protocol,
      createdAt: timestamp.toISOString(),
      name: String(name).trim(),
      specialty: String(specialty).trim(),
      city: String(city).trim(),
      whatsapp: String(whatsapp).trim(),
      email: String(email).trim(),
      patientVolume: String(patientVolume).trim(),
      message: message ? String(message).trim() : '',
      status: 'aguardando_envio_whatsapp',
    };

    proposals.unshift(newProposal);
    saveProposals(proposals);

    return res.status(201).json({
      success: true,
      protocol: newProposal.id,
      createdAt: newProposal.createdAt,
      message: 'Solicitação armazenada com segurança no banco de dados local.',
    });
  } catch (error) {
    console.error('Erro ao processar proposta:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno ao salvar a solicitação.',
    });
  }
});

// GET endpoint: List stored proposals (and CSV export)
app.get('/api/propostas', (req, res) => {
  const proposals = getProposals();
  const format = req.query.format;

  if (format === 'csv') {
    const headers = ['Protocolo', 'Data e Hora', 'Nome', 'Especialidade', 'Cidade', 'WhatsApp', 'E-mail', 'Volume Pacientes', 'Observações'];
    const rows = proposals.map((p) => [
      `"${p.id || ''}"`,
      `"${p.createdAt || ''}"`,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${(p.specialty || '').replace(/"/g, '""')}"`,
      `"${(p.city || '').replace(/"/g, '""')}"`,
      `"${(p.whatsapp || '').replace(/"/g, '""')}"`,
      `"${(p.email || '').replace(/"/g, '""')}"`,
      `"${(p.patientVolume || '').replace(/"/g, '""')}"`,
      `"${(p.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="propostas_isabela_assessoria.csv"');
    return res.send(csvContent);
  }

  return res.json({
    success: true,
    count: proposals.length,
    proposals,
  });
});

async function main() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Isabela Assessoria] Servidor ativo em http://0.0.0.0:${port}`);
  });
}

main().catch((err) => {
  console.error('Falha ao iniciar servidor:', err);
});
