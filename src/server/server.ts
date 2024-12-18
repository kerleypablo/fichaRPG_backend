import express from 'express';
import dotenv from 'dotenv';
import characterRoutes from '../routes/characterRoutes';
import authRoutes from '../routes/authRoutes';
import raceRoutes from '../routes/raceRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rotas
app.use('/api/characters', characterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', raceRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
