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
  "#6B4226",
  "#A65A2A",
  "#D18C4E",
  "#F0AD4E",
  "#5A3E2B",
  "#8C5E3C",
  "#B07F4F",
];

export default function AdminDashboard() {

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {

    const res = await fetch(
      "/api/control/authentification/offers-control",
      { cache: "no-store" }
    );

    const data = await res.json();

    setDashboard(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="text-center mt-24 text-xl font-semibold">
        Chargement...
      </div>
    );
  }

  if (!dashboard) return null;

  const sectorData = getSectorDistribution(dashboard.offers);

  const filtered = dashboard.offers.filter((offer) =>
    [offer.title, offer.company, offer.location, offer.sector]
      .some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
  );

  const today = new Date();

  const active = filtered.filter(
    (o) => new Date(o.expire) >= today
  );

  const expired = filtered.filter(
    (o) => new Date(o.expire) < today
  );

  return (
    <div className="p-6 max-w-[1300px] mx-auto">

      <header className="flex justify-between mb-10">

        <h1 className="text-4xl font-bold">
          Dashboard Offres
        </h1>

        <button
          onClick={() =>
            window.location.href = "/admin/dashboard/create-offer"
          }
          className="flex items-center gap-2 bg-orange-700 text-white px-4 py-2 rounded"
        >
          <PlusCircle size={18}/>
          Créer
        </button>

      </header>

      {/* statistiques */}

      <section className="grid grid-cols-4 gap-6 mb-12">

        <StatCard label="Actives" value={dashboard.stats.activeCount} color={COLORS[1]} />
        <StatCard label="Expirées" value={dashboard.stats.expiredCount} color={COLORS[2]} />
        <StatCard label="Clics" value={dashboard.stats.totalClicks} color={COLORS[3]} />
        <StatCard label="Partages" value={dashboard.stats.totalShares} color={COLORS[4]} />

      </section>

      {/* graphiques */}

      <section className="grid lg:grid-cols-3 gap-6 mb-14">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-xl font-semibold mb-4">
            Répartition secteur
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <PieChart>

              <Pie
                data={sectorData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                isAnimationActive={false}
              >

                {sectorData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-xl font-semibold mb-4">
            Clics / Partages
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={dashboard.offers}>

              <XAxis dataKey="title" hide />
              <YAxis/>

              <Tooltip/>
              <Legend/>

              <Bar dataKey="clickCount" fill={COLORS[1]}/>
              <Bar dataKey="shareCount" fill={COLORS[3]}/>

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-xl font-semibold mb-4">
            Expiration timeline
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <LineChart data={generateExpirationTimeline(dashboard.offers)}>

              <XAxis dataKey="date"/>
              <YAxis/>

              <Tooltip/>

              <Line
                type="monotone"
                dataKey="count"
                stroke={COLORS[2]}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </section>

      {/* tableau */}

      <OfferTable
        title="Offres actives"
        offers={active}
        reload={fetchDashboard}
      />

      <OfferTable
        title="Offres expirées"
        offers={expired}
        reload={fetchDashboard}
      />

    </div>
  );
}

function StatCard({ label, value, color }:{
  label:string
  value:number
  color:string
}){

  return(
    <div
      className="rounded-xl p-6 text-white text-center shadow"
      style={{backgroundColor:color}}
    >
      <div className="text-sm">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}

function OfferTable({
  title,
  offers,
  reload
}:{
  title:string
  offers:JobOffer[]
  reload:()=>void
}){

  async function remove(id:number){

    if(!confirm("Supprimer cette offre ?")) return

    await fetch(`/api/control/authentification/offers-control?id=${id}`,{
      method:"DELETE"
    })

    reload()
  }

  return(

    <section className="mb-14">

      <h2 className="text-2xl font-semibold mb-4">
        {title} ({offers.length})
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Titre</th>
              <th>Société</th>
              <th>Localisation</th>
              <th>Expire</th>
              <th>Clics</th>
              <th>Partages</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {offers.map((o)=>(

              <tr key={o.id} className="border-t">

                <td className="p-3">{o.title}</td>
                <td>{o.company}</td>
                <td>{o.location}</td>
                <td>{new Date(o.expire).toLocaleDateString()}</td>
                <td>{o.clickCount}</td>
                <td>{o.shareCount}</td>

                <td>

                  <button
                    onClick={()=>remove(o.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18}/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  )
}

function getSectorDistribution(offers:JobOffer[]){

  const map:Record<string,number>={}

  offers.forEach(o=>{
    map[o.sector]=(map[o.sector]||0)+1
  })

  return Object.entries(map).map(([name,value])=>({
    name,
    value
  }))
}

function generateExpirationTimeline(offers:JobOffer[]){

  const today=new Date()

  const map:Record<string,number>={}

  offers
  .filter(o=>new Date(o.expire)<=today)
  .forEach(o=>{

    const d=new Date(o.expire)
      .toISOString()
      .slice(0,10)

    map[d]=(map[d]||0)+1
  })

  return Object.entries(map).map(([date,count])=>({
    date,
    count
  }))
}