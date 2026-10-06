"use client";

import Link from "next/link";
import { useDashboardIdentity } from "@/components/dashboard/use-dashboard-identity";
import { Icon } from "@/components/icon";

const comdevProfile = {
  pastor: "Ptr. Marites D. Santos",
  church: "Metro East Community Church",
  membersBeforeTtc: 969,
  mouDate: "March 15, 2024",
};

const threeEs = [
  { label: "Evangelized", description: "First steps of faith", count: 260, tone: "navy" },
  { label: "Edified", description: "Growing in community", count: 154, tone: "blue" },
  { label: "Endorsed", description: "Ready to serve", count: 8, tone: "gold" },
] as const;

const partnershipStats = [
  { label: "Members during TTC Partnership", value: 8, icon: "users", featured: true },
  { label: "Small Group Leaders (SGL)", value: 41, icon: "activity", featured: false },
  { label: "Small Group Members (SGM)", value: 109, icon: "shield", featured: false },
  { label: "Outreach", value: 6, icon: "heart", featured: false },
  { label: "Daughter Churches", value: 3, icon: "home", featured: false },
  { label: "Pastors", value: 13, icon: "users", featured: false },
] as const;

const caresImpact = [
  { label: "Competence & Skills Training for Livelihood", evangelized: 562 },
  { label: "Assistance to Child & Family Nutrition", evangelized: 1150 },
  { label: "Relief & Empowerment", evangelized: 1370 },
  { label: "Educational Advancement", evangelized: 7 },
  { label: "Spiritual Development", evangelized: 320 },
];

const numberFormat = new Intl.NumberFormat("en-US");
const toneColors = { navy: "#1f2f68", blue: "#6f90cf", gold: "#d1a73d" };

function ThreeEsDonut() {
  const total = threeEs.reduce((sum, item) => sum + item.count, 0);
  const gradient = threeEs.map((item, index) => {
    const before = threeEs.slice(0, index).reduce((sum, previous) => sum + previous.count, 0);
    const start = (before / total) * 100;
    const end = ((before + item.count) / total) * 100;
    return `${toneColors[item.tone]} ${start}% ${end}%`;
  }).join(", ");

  return (
    <div className="cd-donut" style={{ background: `conic-gradient(${gradient})` }} role="img" aria-label={`3 E's distribution of ${total} people`}>
      <div className="cd-donut-hole"><strong>{numberFormat.format(total)}</strong><span>Total reached</span></div>
    </div>
  );
}

export default function OverviewPage() {
  const identity = useDashboardIdentity();
  const caresTotal = caresImpact.reduce((sum, item) => sum + item.evangelized, 0);
  const caresMax = Math.max(...caresImpact.map((item) => item.evangelized));

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow"><span className="status-dot" /> {identity.dateLabel}</div>
          <h1>ComDev Dashboard</h1>
          <p>{identity.greeting}, {identity.name}. Here&apos;s the partnership overview at a glance.</p>
        </div>
        <div className="heading-actions">
          <Link className="button button-secondary" href="/dashboard/reports"><Icon name="file" size={16} /> Reports</Link>
          <Link className="button button-primary" href="/dashboard/masterlist"><Icon name="users" size={16} /> View masterlist</Link>
        </div>
      </div>

      <section className="cd-profile" aria-label="ComDev profile">
        <div className="cd-profile-main">
          <span className="cd-profile-avatar"><Icon name="heart" size={22} /></span>
          <div>
            <span className="cd-label">Name of Pastor</span>
            <strong className="cd-profile-name">{comdevProfile.pastor}</strong>
          </div>
        </div>
        <dl className="cd-profile-details">
          <div><dt>Name of Church</dt><dd>{comdevProfile.church}</dd></div>
          <div><dt>Members Before TTC</dt><dd>{numberFormat.format(comdevProfile.membersBeforeTtc)}</dd></div>
          <div><dt>Date of MOU</dt><dd>{comdevProfile.mouDate}</dd></div>
        </dl>
      </section>

      <section className="cd-section" aria-labelledby="three-es-title">
        <div className="dashboard-section-heading">
          <div><span className="section-kicker">FAITH JOURNEY</span><h2 id="three-es-title">The 3 E&apos;s</h2></div>
        </div>
        <div className="panel cd-three-es">
          <ThreeEsDonut />
          <div className="cd-three-es-list">
            {threeEs.map((item) => (
              <article className={`cd-e-card cd-tone-${item.tone}`} key={item.label}>
                <span className="cd-e-icon"><Icon name="check" size={15} /></span>
                <div className="cd-e-copy"><strong>{item.label}</strong><span>{item.description}</span></div>
                <b>{numberFormat.format(item.count)}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cd-section" aria-labelledby="partnership-title">
        <div className="dashboard-section-heading">
          <div><span className="section-kicker">TTC PARTNERSHIP</span><h2 id="partnership-title">Partnership overview</h2></div>
        </div>
        <div className="cd-stat-grid">
          {partnershipStats.map((stat) => (
            <article className={`cd-stat ${stat.featured ? "cd-stat-featured" : ""}`} key={stat.label}>
              <span className="cd-stat-icon"><Icon name={stat.icon} size={17} /></span>
              <strong>{numberFormat.format(stat.value)}</strong>
              <span className="cd-stat-label">{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cd-section" aria-labelledby="cares-title">
        <div className="dashboard-section-heading">
          <div><span className="section-kicker">IMPLEMENTATION AND IMPACT</span><h2 id="cares-title">C.A.R.E.S. — Number Evangelized</h2></div>
          <Link className="text-link" href="/dashboard/cares-program">Explore programs <Icon name="chevron-right" size={15} /></Link>
        </div>
        <div className="panel cd-cares">
          <div className="cd-cares-total"><strong>{numberFormat.format(caresTotal)}</strong><span>Total evangelized through C.A.R.E.S.</span></div>
          <ul className="cd-cares-list">
            {caresImpact.map((item) => (
              <li key={item.label}>
                <div className="cd-cares-row"><span>{item.label}</span><b>{numberFormat.format(item.evangelized)}</b></div>
                <div className="cd-bar-track"><i style={{ width: `${Math.max((item.evangelized / caresMax) * 100, 1.5)}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
