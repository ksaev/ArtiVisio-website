"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import countries from "@/data/countries_full.json";
import sectors from "@/data/sectors.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateOfferForm() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    sector: "",
    description: "",
    requirements: "",
    mail: "",
    expire: "",
    countryId: "",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // ---------------------------------
  // Soumission du formulaire
  // ---------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();
      if (!token) {
        toast.error("Validation CAPTCHA requise.");
        setLoading(false);
        return;
      }

      const payload = { ...formData, recaptchaToken: token };

      const res = await fetch("/api/control/authentification/offres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la création de l'offre.");
        setLoading(false);
        return;
      }

      const offerId = data.offer.id;

      // Notification
      const payloadNotif = {
        headings: {
          en: `Nouvelle opportunité d'emploi chez ${formData.company}`,
        },
        contents: {
          en: `Découvrez dès maintenant notre dernière offre : "${formData.title}". Postulez vite !`,
        },
        url: `https://dev.artivisio.com/offres-emploi?id=${offerId}`,
        included_segments: ["All"],
        big_picture:
          "https://dev.artivisio.com/assets/images/job-offer-default.webp",
        small_picture:
          "https://dev.artivisio.com/assets/images/job-offer-default.webp",
        android_accent_color: "FF8C00",
      };

      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadNotif),
      });

      confetti({ particleCount: 150, spread: 100 });
      toast.success("✅ Offre publiée avec succès");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Erreur inattendue.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // Analyse texte brut (parser simple)
  // ---------------------------------
  const handleParseStructuredOffer = async () => {
    if (!rawText.trim()) {
      toast.error("Veuillez coller une offre");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/parse-structured-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error("Impossible d'analyser l'offre");
        setLoading(false);
        return;
      }

      const parsed = result.data;

      // Normalisation type contrat
      const validTypes = [
        "CDDI",
        "CDI",
        "CDD",
        "Freelance",
        "Stage",
        "Consultant",
        "Volontariat",
        "Non precisé",
      ];
      const contractType = validTypes.includes(parsed.type)
        ? parsed.type
        : "Non precisé";

      setFormData((prev) => ({
        ...prev,
        title: parsed.title || "",
        company: parsed.company || "",
        location: parsed.location || "",
        countryId: parsed.countryId || "",
        salary: parsed.salary || "Négociable",
        type: contractType,
        sector: parsed.sector || "",
        description: parsed.description || "",
        requirements: parsed.requirements || "",
        mail: parsed.mail || "",
        link: parsed.link || "",
        expire: parsed.expire || "",
      }));

      toast.success("Formulaire rempli automatiquement");
    } catch (error) {
      console.error(error);
      toast.error("Erreur analyse");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // Analyse IA
  // ---------------------------------
  const analyzeOffer = async () => {
    if (!rawText) {
      toast.error("Veuillez coller une offre brute");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/ai/parse-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });

      const data = await res.json();
      if (!data.result) {
        toast.error("Analyse IA impossible");
        return;
      }

      const parsed = JSON.parse(data.result);

      // Normalisation
      const validTypes = [
        "CDDI",
        "CDI",
        "CDD",
        "Freelance",
        "Stage",
        "Consultant",
        "Volontariat",
        "Non precisé",
      ];
      const contractType = validTypes.includes(parsed.type)
        ? parsed.type
        : "Non precisé";
      const sectorMatch = sectors.find((s) =>
        s.label.toLowerCase().includes((parsed.sector || "").toLowerCase()),
      );
      const sectorId = sectorMatch ? sectorMatch.id : "";

      setFormData((prev) => ({
        ...prev,
        title: parsed.title || "",
        company: parsed.company || "",
        location: parsed.location || "",
        salary: parsed.salary || "Négociable",
        type: contractType,
        sector: sectorId,
        description: parsed.description || "",
        requirements: parsed.requirements || "",
        mail: parsed.mail || "",
        link: parsed.link || "",
      }));

      toast.success("Offre analysée avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur analyse IA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pt-20">
      <Card className="shadow-xl bg-[#FAF6F1] border border-[#8B5E3C] rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-4xl text-center font-bold text-[#8B5E3C] mb-2">
            Publication d'une Offre d'Emploi
          </h1>
          <p className="text-center text-[#D97706] text-lg font-medium">
            Cher Administrateur, soyez attentif à la saisie des informations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3 mb-6">
              <Label className="text-lg font-medium">
                Coller une offre brute (analyse automatique IA)
              </Label>
              <Textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={6}
                placeholder="Collez ici une offre d'emploi brute..."
                className="bg-white"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handleParseStructuredOffer}
                  className="bg-[#8B5E3C] hover:bg-[#70492d]"
                >
                  ⚡ Remplir automatiquement
                </Button>
                <Button
                  type="button"
                  onClick={analyzeOffer}
                  className="bg-[#D97706] hover:bg-[#b95e00]"
                >
                  🤖 Analyse IA
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Titre */}
              <div>
                <Label className="text-lg font-medium pb-2">Titre *</Label>
                <Input
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Développeur Web"
                  className="bg-white text-2xl"
                />
              </div>
              {/* Entreprise */}
              <div>
                <Label className="text-lg font-medium pb-2">Entreprise *</Label>
                <Input
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nom de l'entreprise"
                  className="bg-white"
                />
              </div>
              {/* Location */}
              <div>
                <Label className="text-lg font-medium pb-2">Ville / Lieu</Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Abidjan, Dakar..."
                  className="bg-white"
                />
              </div>
              {/* Pays */}
              <div>
                <Label className="text-lg font-medium pb-2">Pays *</Label>
                <Select
                  value={formData.countryId}
                  onValueChange={(val) => handleSelectChange("countryId", val)}
                  required
                >
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
              {/* Salaire */}
              <div>
                <Label className="text-lg font-medium pb-2">Salaire</Label>
                <Input
                  name="salary"
                  placeholder="Négociable"
                  value={formData.salary}
                  onChange={handleChange}
                  className="bg-white"
                />
              </div>
              {/* Type */}
              <div>
                <Label className="text-lg font-medium pb-2">
                  Type de contrat *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(val) => handleSelectChange("type", val)}
                  required
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "CDDI",
                      "CDI",
                      "CDD",
                      "Freelance",
                      "Stage",
                      "Consultant",
                      "Volontariat",
                      "Non precisé",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Secteur */}
              <div>
                <Label className="text-lg font-medium pb-2">Secteur *</Label>
                <Select
                  value={formData.sector}
                  onValueChange={(val) => handleSelectChange("sector", val)}
                  required
                >
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
              {/* Date */}
              <div>
                <Label className="text-lg font-medium pb-2">
                  Date d'expiration *
                </Label>
                <Input
                  type="date"
                  name="expire"
                  required
                  value={formData.expire}
                  onChange={handleChange}
                  className="bg-white"
                />
              </div>
              {/* Email */}
              <div>
                <Label className="text-lg font-medium pb-2">
                  Email de réception
                </Label>
                <Input
                  type="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder="email@exemple.com"
                  className="bg-white"
                />
              </div>
              {/* Lien */}
              <div>
                <Label className="text-lg font-medium pb-2">
                  Lien candidature
                </Label>
                <Input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://offredemploi.com"
                  className="bg-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-lg font-medium pb-2">
                Description complète *
              </Label>
              <Textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={10}
                placeholder="Décrivez les missions, le contexte, les objectifs de poste..."
                className="bg-white"
              />
            </div>

            {/* Requirements */}
            <div>
              <Label className="text-lg font-medium pb-2">
                Compétences & Exigences *
              </Label>
              <Textarea
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                rows={7}
                placeholder={`Ex : maîtrise de React \n expérience pédagogique \n rigueur \n travail en équipe \n communication ...`}
                className="bg-white"
              />
            </div>

            {/* ReCAPTCHA */}
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              size="invisible"
              ref={recaptchaRef}
            />

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg bg-[#D97706] hover:bg-[#b95e00] text-white font-semibold rounded-xl"
              >
                {loading ? "Publication en cours..." : "🚀 Publier l’offre"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
