'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

import countries from '@/data/countries_full.json';
import sectors from '@/data/sectors.json';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function CreateOfferForm() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    sector: '',
    description: '',
    requirements: '',
    mail: '',
    expire: '',
    countryId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!token) {
        toast.error('Validation CAPTCHA requise.');
        setLoading(false);
        return;
      }

      const payload = { ...formData, recaptchaToken: token };

      const res = await fetch('/api/admin/login/offres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Erreur lors de la création de l\'offre');
        setLoading(false);
        return;
      }

      confetti({ particleCount: 150, spread: 100 });
      toast.success('✅ Offre publiée avec succès');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Erreur inattendue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card className="shadow-xl bg-[#FAF6F1] border border-[#8B5E3C] rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-4xl text-center font-bold text-[#8B5E3C] mb-2">
            Publication d'une Offre d'Emploi
          </h1>
          <p className="text-center text-[#D97706] text-lg font-medium">
            Cher Administrateur, soyez attentif à la saisie des informations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg font-medium pb-2">Titre de l'offre *</Label>
                <Input name="title" required onChange={handleChange} value={formData.title} placeholder="Développeur Web" className="bg-white text-2xl" />
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Entreprise *</Label>
                <Input name="company" required onChange={handleChange} value={formData.company} placeholder="Nom de l'entreprise" className="bg-white" />
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Ville / Lieu *</Label>
                <Input name="location" required onChange={handleChange} value={formData.location} placeholder="Abidjan, Dakar..." className="bg-white" />
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Pays *</Label>
                <Select value={formData.countryId} onValueChange={(val) => handleSelectChange('countryId', val)} required>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choisir un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Salaire *</Label>
                <Input name="salary" required onChange={handleChange} value={formData.salary} placeholder="Ex: 500 000 FCFA / mois" className="bg-white" />
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Type de contrat *</Label>
                <Select value={formData.type} onValueChange={(val) => handleSelectChange('type', val)} required>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Stage">Stage</SelectItem>
                    <SelectItem value="Consultant">Consultant</SelectItem>
                    <SelectItem value="Volontariat">Volontariat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Secteur *</Label>
                <Select value={formData.sector} onValueChange={(val) => handleSelectChange('sector', val)} required>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choisir un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-lg font-medium pb-2">Date d'expiration *</Label>
                <Input type="date" name="expire" required onChange={handleChange} value={formData.expire} className="bg-white" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-lg font-medium pb-2">Email de réception des candidatures *</Label>
                <Input type="email" name="mail" required onChange={handleChange} value={formData.mail} placeholder="email@exemple.com" className="bg-white" />
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium pb-2">Description complète *</Label>
              <Textarea
                name="description"
                required
                onChange={handleChange}
                value={formData.description}
                rows={10}
                placeholder="Décrivez les missions, le contexte, les objectifs de poste..."
                className="bg-white"
              />
            </div>

            <div>
              <Label className="text-lg font-medium pb-2">Compétences & Exigences *</Label>
              <Textarea
                name="requirements"
                required
                onChange={handleChange}
                value={formData.requirements}
                rows={7}
                placeholder="Ex : maîtrise de React / expérience pédagogique / rigueur..."
                className="bg-white"
              />
            </div>

            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size="invisible" ref={recaptchaRef} />

            <div className="pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg bg-[#D97706] hover:bg-[#b95e00] text-white font-semibold rounded-xl"
              >
                {loading ? 'Publication en cours...' : '🚀 Publier l’offre'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
