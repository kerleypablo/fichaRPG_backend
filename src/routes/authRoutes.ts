import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import jwt from 'jsonwebtoken';

const router = Router();

// Cadastro com E-mail e Senha
router.post('/signup', (req: Request, res: Response): void => {
  (async () => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      res.status(200).json({ message: 'Usuário cadastrado com sucesso!', user: data.user });
    } catch (err) {
      res.status(500).json({ message: 'Erro no servidor', error: err });
    }
  })();
});

// Login com E-mail e Senha
router.post('/login', (req: Request, res: Response): void => {
  (async () => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        res.status(401).json({ message: 'Credenciais inválidas.' });
        return;
      }

      // Gerar JWT
      const token = jwt.sign(
        { id: data.user?.id, email: data.user?.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, user: data.user });
    } catch (err) {
      res.status(500).json({ message: 'Erro no servidor', error: err });
    }
  })();
});

export default router;
