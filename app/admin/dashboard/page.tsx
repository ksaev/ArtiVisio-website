"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import { Trash2, PlusCircle } from "lucide-react";

type JobOffer = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  sector: string;
  description: string;
  requirements: string;
  posted: string;
  expire: string;
  mail: string;
  countryId: string;
  clickCount: number;
  shareCount: number;
};

type DashboardData = {
  offers: JobOffer[];
  stats: {
    activeCount: number;
    expiredCount: number;
    totalClicks: number;
    totalShares: number;
  };
};

const COLORS = [
  "#6B4226", // marron foncé Artivisio
  "#A65A2A", // marron moyen
  "#D18C4E", // marron clair/orangé
  "#F0AD4E", // orangé clair
  "#5A3E2B", // marron sombre
  "#8C5E3C", // marron chaud
  "#B07F4F", // marron doux
];

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedExpiredIds, setSelectedExpiredIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      setLoading(true);
      const res = await fetch("/api/control/authentification/offers-control");
      if (!res.ok) throw new Error("Erreur chargement offres");
      const data: DashboardData = await res.json();
      setDashboard(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Helper : calcule nombre d'offres par secteur pour graphique camembert
  function getSectorDistribution(offers: JobOffer[]) {
    const map: Record<string, number> = {};
    offers.forEach(o => (map[o.sector] = (map[o.sector] || 0) + 1));
    return Object.entries(map).map(([sector, count]) => ({ name: sector, value: count }));
  }

  // Filtrage de base par recherche
  const filteredOffers = dashboard?.offers.filter(offer =>
    [offer.title, offer.company, offer.location, offer.sector]
      .some(field => field.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  const today = new Date();

  const filteredActive = filteredOffers.filter(o => new Date(o.expire) >= today);
  const filteredExpired = filteredOffers.filter(o => new Date(o.expire) < today);

  // Gestion sélection offres expirées
  function toggleSelectExpired(id: number) {
    setSelectedExpiredIds(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  }

  // Suppression d’une offre
  async function handleDelete(id: number) {
    if (!confirm("Confirmer la suppression de cette offre ?")) return;
    try {
      const res = await fetch(`/api/admin/login/dashboard?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      fetchDashboard();
      setSelectedExpiredIds(prev => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    } catch {
      alert("Erreur lors de la suppression");
    }
  }

  // Suppression groupée des offres expirées sélectionnées
  async function handleDeleteSelectedExpired() {
    if (selectedExpiredIds.size === 0) {
      alert("Aucune offre expirée sélectionnée.");
      return;
    }
    if (!confirm(`Supprimer les ${selectedExpiredIds.size} offres expirées sélectionnées ?`)) return;

    try {
      for (const id of selectedExpiredIds) {
        const res = await fetch(`/api/admin/login/dashboard?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erreur suppression");
      }
      fetchDashboard();
      setSelectedExpiredIds(new Set());
    } catch {
      alert("Erreur lors de la suppression en masse.");
    }
  }

  if (loading) return <div className="text-center mt-24 text-xl font-semibold text-[#5a3e2b]">Chargement...</div>;
  if (error) return <div className="text-center mt-24 text-red-600 text-xl font-semibold">Erreur : {error}</div>;
  if (!dashboard) return null;

  return (
    <div className="p-10 bg-[#f9f5ef] min-h-screen font-sans text-[#5a3e2b] max-w-[1300px] mx-auto select-none">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <h1 className="text-4xl font-extrabold tracking-wide">Dashboard Offres d'Emploi</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Recherche par titre, société, localisation, secteur..."
            className="border border-[#d6b189] rounded px-4 py-2 w-full sm:w-80 text-base placeholder:text-[#a57a45] focus:outline-none focus:ring-3 focus:ring-orange-400 transition"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={() => window.location.href = "/admin/dashboard/create-offer"}
            className="flex items-center gap-2 bg-[#a65a2a] hover:bg-[#924e23] text-white px-5 py-2 rounded-lg font-semibold text-base transition-shadow shadow-md hover:shadow-lg"
            title="Créer une nouvelle offre"
          >
            <PlusCircle size={20} /> Créer une offre
          </button>
        </div>
      </header>

      {/* Statistiques cartes */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-14">
        <StatCard label="Offres Actives" value={dashboard.stats.activeCount} color={COLORS[1]} />
        <StatCard label="Offres Expirées" value={dashboard.stats.expiredCount} color={COLORS[2]} />
        <StatCard label="Clics Totaux" value={dashboard.stats.totalClicks} color={COLORS[3]} />
        <StatCard label="Partages Totaux" value={dashboard.stats.totalShares} color={COLORS[4]} />
      </section>

      {/* Graphiques */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16">
        {/* Répartition offres par secteur (PieChart) */}
      <div className="bg-white rounded-xl shadow-md p-2 overflow-visible">
        <h3 className="text-2xl font-semibold mb-4 border-b border-[#d6b189] pb-2">Répartition par Secteur</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={getSectorDistribution(dashboard.offers)}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent, x, y }) => (
                <text
                  x={x}
                  y={y}
                  transform={`rotate(-10 ${x},${y})`} // 
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={11}
                  fill="#5a3e2b"
                >
                  {`${name} ${(percent * 100).toFixed(0)}%`}
                </text>
              )}
              labelLine={false}
              fontSize={10}
            >
              {getSectorDistribution(dashboard.offers).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>


        {/* Clics et Partages - BarChart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 border-b border-[#d6b189] pb-2">Clics vs Partages</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={dashboard.offers}
              margin={{ top: 5, right: 15, left: 10, bottom: 60 }}
            >
              <XAxis
                dataKey="title"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="clickCount" fill={COLORS[1]} name="Clics" />
              <Bar dataKey="shareCount" fill={COLORS[3]} name="Partages" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tendances expiration offres - LineChart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 border-b border-[#d6b189] pb-2">Expiration Offres (Timeline)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={generateExpirationTimeline(dashboard.offers)}
              margin={{ top: 5, right: 20, left: 15, bottom: 30 }}
            >
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="count"
                stroke={COLORS[2]}
                strokeWidth={2}
                name="Offres expirées"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Table offres actives */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 border-b border-[#d6b189] pb-3">
          Offres Actives ({filteredActive.length})
        </h2>
        <OfferTable offers={filteredActive} onDelete={handleDelete} />
      </section>

      {/* Offres expirées avec sélection et suppression groupée */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold border-b border-[#d6b189] pb-3">
            Offres Expirées ({filteredExpired.length})
          </h2>

          <button
            disabled={selectedExpiredIds.size === 0}
            onClick={handleDeleteSelectedExpired}
            className={`flex items-center gap-2 bg-red-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition
              ${selectedExpiredIds.size === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}
            title={selectedExpiredIds.size === 0 ? "Sélectionnez des offres expirées" : `Supprimer ${selectedExpiredIds.size} offres`}
          >
            <Trash2 size={20} /> Supprimer sélection
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-[#d6b189] text-[#5a3e2b] font-semibold">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    aria-label="Sélectionner toutes les offres expirées"
                    checked={selectedExpiredIds.size === filteredExpired.length && filteredExpired.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedExpiredIds(new Set(filteredExpired.map(o => o.id)));
                      } else {
                        setSelectedExpiredIds(new Set());
                      }
                    }}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Société</th>
                <th className="p-3 text-left">Localisation</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Secteur</th>
                <th className="p-3 text-left">Salaire</th>
                <th className="p-3 text-left">Publié</th>
                <th className="p-3 text-left">Expire</th>
                <th className="p-3 text-left">Clics</th>
                <th className="p-3 text-left">Partages</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpired.length === 0 ? (
                <tr>
                  <td colSpan={12} className="p-6 text-center text-gray-500 text-lg">
                    Aucune offre expirée trouvée.
                  </td>
                </tr>
              ) : (
                filteredExpired.map((offer) => (
                  <tr
                    key={offer.id}
                    className="border-b border-gray-200 hover:bg-[#fcefe6] transition cursor-default"
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedExpiredIds.has(offer.id)}
                        onChange={() => toggleSelectExpired(offer.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="p-3">{offer.title}</td>
                    <td className="p-3">{offer.company}</td>
                    <td className="p-3">{offer.location}</td>
                    <td className="p-3">{offer.type}</td>
                    <td className="p-3">{offer.sector}</td>
                    <td className="p-3">{offer.salary}</td>
                    <td className="p-3">{new Date(offer.posted).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(offer.expire).toLocaleDateString()}</td>
                    <td className="p-3">{offer.clickCount}</td>
                    <td className="p-3">{offer.shareCount}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="text-red-600 hover:underline"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Composant StatCard pour affichage cartes statistiques
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="rounded-xl shadow-md p-5 flex flex-col justify-center items-center"
      style={{ backgroundColor: color, color: "white" }}
    >
      <span className="text-base font-semibold mb-1">{label}</span>
      <span className="text-3xl font-extrabold">{value}</span>
    </div>
  );
}

// Composant table simple (réutilisable)
function OfferTable({
  offers,
  onDelete,
}: {
  offers: JobOffer[];
  onDelete: (id: number) => void;
}) {
  if (offers.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg font-medium">
        Aucune offre trouvée.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead className="bg-[#d6b189] text-[#5a3e2b] font-semibold">
          <tr>
            <th className="p-3 text-left">Titre</th>
            <th className="p-3 text-left">Société</th>
            <th className="p-3 text-left">Localisation</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Secteur</th>
            <th className="p-3 text-left">Salaire</th>
            <th className="p-3 text-left">Publié</th>
            <th className="p-3 text-left">Expire</th>
            <th className="p-3 text-left">Clics</th>
            <th className="p-3 text-left">Partages</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr
              key={offer.id}
              className="border-b border-gray-200 hover:bg-[#fdf5e6] transition cursor-default"
            >
              <td className="p-3">{offer.title}</td>
              <td className="p-3">{offer.company}</td>
              <td className="p-3">{offer.location}</td>
              <td className="p-3">{offer.type}</td>
              <td className="p-3">{offer.sector}</td>
              <td className="p-3">{offer.salary}</td>
              <td className="p-3">{new Date(offer.posted).toLocaleDateString()}</td>
              <td className="p-3">{new Date(offer.expire).toLocaleDateString()}</td>
              <td className="p-3">{offer.clickCount}</td>
              <td className="p-3">{offer.shareCount}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => onDelete(offer.id)}
                  className="text-red-600 hover:underline"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Génère les données pour timeline expiration (nombre offres expirées par date)
function generateExpirationTimeline(offers: JobOffer[]) {
  // Récupère toutes les dates d'expiration <= aujourd'hui triées
  const today = new Date();
  const filtered = offers
    .filter(o => new Date(o.expire) <= today)
    .map(o => new Date(o.expire).toISOString().slice(0, 10))
    .sort();

  // Compte nombre d'offres expirées par date
  const map: Record<string, number> = {};
  filtered.forEach(date => (map[date] = (map[date] || 0) + 1));

  // Transforme en tableau trié
  const data = Object.entries(map)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  return data;
}
