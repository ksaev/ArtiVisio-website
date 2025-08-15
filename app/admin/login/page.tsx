'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha"
import confetti from "canvas-confetti"



export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [toastStatus, setToastStatus] = useState<"loading" | "success" | "error" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastProgress, setToastProgress] = useState(100);
  const recaptchaRef = useRef<ReCAPTCHA>(null)


  const launchConfetti = () => {
    confetti({
      particleCount: 1000,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#6B4226", "#A67C52", "#E76F51", "#2D2D2D"]
    })
  }

  useEffect(() => {
    if (toastStatus === "success") {
      setShowToast(true);
      setToastProgress(100);

      // Animation de la barre de progression
      const interval = setInterval(() => {
        setToastProgress(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 100); // 100ms * 100 = 10s

      // Cacher après 10s
      const timeout = setTimeout(() => {
        setShowToast(false);
        setToastStatus(null);
        setToastProgress(100); // reset
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [toastStatus]);

  useEffect(() => {
    if (toastStatus === "error") {
      setShowToast(true);
      setToastProgress(100);

      // Animation de la barre de progression
      const interval = setInterval(() => {
        setToastProgress(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 100); // 100ms * 100 = 10s

      // Cacher après 10s
      const timeout = setTimeout(() => {
        setShowToast(false);
        setToastStatus(null);
        setToastProgress(100); // reset
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [toastStatus]);



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToastStatus("loading")
    setShowToast(true)
    const res = await fetch('/api/control/authentification', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setToastStatus("success")
      router.push('/admin/dashboard');
    } else {
      setToastStatus("error")
      toast.error('Échec de la connexion');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F] px-4 pt-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white rounded-2xl shadow-lg border border-[#F97316]">
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-[#6B4C3B]">Espace Administrateur</h1>
              <p className="text-sm text-gray-600">Connexion sécurisée - Artivisio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#6B4C3B]">Email</label>
                <Input
                  placeholder="Nom d'utilisateur"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B4C3B]">Mot de passe</label>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F97316] hover:bg-[#ea6b0f] text-white font-semibold"
              >
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>

      </motion.div>
        {showToast && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white border border-amber-500 px-6 py-3 rounded-lg shadow-md w-[90%] max-w-md">
            <span className="text-primary font-semibold flex items-center gap-2">
              {toastStatus === "loading" && "⏳ Connexion en cours..."}
              {toastStatus === "success" && "🎉 Connexion réussie avec succès"}
              {toastStatus === "error" && "❌ Nom d'utilisateur ou mot de passe incorrect"}
            </span>

            {toastStatus === "error" && (
              <div className="relative mt-2 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-primary rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${toastProgress}%` }}
                />
              </div>
            )}
          </div>
        )}

    </div>
    
  );
}
