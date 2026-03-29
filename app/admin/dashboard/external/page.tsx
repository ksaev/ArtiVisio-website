{
  /*"use client";

import { useEffect, useState } from "react";
import { JobOffer } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Offer = JobOffer & { probability?: number };

export default function ExternalOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/external");
      const data = await res.json();

      if (!data || !Array.isArray(data)) {
        toast.error("Aucune offre disponible");
        setOffers([]);
        return;
      }

      setOffers(data);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de récupérer les offres externes");
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(offerId: number) {
    try {
      const res = await fetch(`/api/jobs/external/accept`, {
        method: "POST",
        body: JSON.stringify({ id: offerId }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (!res.ok || !result.success)
        throw new Error(result.message || "Erreur serveur");

      toast.success("Offre acceptée et ajoutée aux offres internes !");
      setOffers((prev) => prev.filter((o) => o.id !== offerId));
    } catch (err) {
      console.error(err);
      toast.error("Impossible d'accepter l'offre");
    }
  }

  async function handleReject(offerId: number) {
    try {
      const res = await fetch(`/api/jobs/external/reject`, {
        method: "POST",
        body: JSON.stringify({ id: offerId }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (!res.ok || !result.success)
        throw new Error(result.message || "Erreur serveur");

      toast.success("Offre rejetée et supprimée !");
      setOffers((prev) => prev.filter((o) => o.id !== offerId));
    } catch (err) {
      console.error(err);
      toast.error("Impossible de rejeter l'offre");
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Offres Externes</h1>
        <Button
          onClick={() => router.push("/admin/dashboard/create-offer")}
          className="bg-purple-700 text-white hover:bg-purple-800"
        >
          Aller aux offres internes / saisie manuelle
        </Button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Chargement des offres...</p>
      )}

      {!loading && offers.length === 0 && (
        <p className="text-center text-gray-500">
          Aucune offre externe disponible.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {offer.title}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {offer.company} - {offer.location || "N/A"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{offer.description}</p>

              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                  Clicks: {offer.clickCount ?? 0}
                </span>
                {offer.probability !== undefined && (
                  <span className="px-2 py-1 bg-yellow-200 rounded text-xs">
                    Probabilité: {(offer.probability * 100).toFixed(1)}%
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleAccept(offer.id)}
                >
                  Accepter
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleReject(offer.id)}
                >
                  Rejeter
                </Button>
                <a
                  href={offer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-purple-700 hover:underline text-sm"
                >
                  Voir en ligne
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}*/
}
