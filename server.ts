import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import app from './backend/src/app.js';
import { env } from './backend/src/config/env.js';
import connectDB from './backend/src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Connect to database
  await connectDB();

  const PORT = env.PORT;

  // Vite middleware for development
  if (env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serving static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 Server running in ${env.NODE_ENV} mode
📡 URL: http://0.0.0.0:${PORT}
🔗 API Health: http://0.0.0.0:${PORT}/api/health
    `);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
