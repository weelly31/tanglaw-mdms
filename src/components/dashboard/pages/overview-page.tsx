"use client";

import Link from "next/link";
import { useState } from "react";
import { AddMemberModal } from "@/components/dashboard/add-member-modal";
import { initialMembers, type Member } from "@/components/dashboard/data";
import { MemberTable } from "@/components/dashboard/member-table";
import { useDashboardIdentity } from "@/components/dashboard/use-dashboard-identity";
import { Icon } from "@/components/icon";

function MetricCard({ label, value, change, icon, tint, bars }: { label: string; value: string; change: string; icon: "users" | "heart" | "activity" | "shield"; tint: string; bars: number[] }) {
  return <article className="metric-card"><div className="metric-top"><span className={`metric-icon ${tint}`}><Icon name={icon} size={18} /></span><span className="metric-change"><Icon name="trend" size={13} /> {change}</span></div><p className="metric-label">{label}</p><div className="metric-bottom"><strong className="metric-value">{value}</strong><div className="sparkline" aria-hidden="true">{bars.map((bar, index) => <i key={index} style={{ height: `${bar}%` }} />)}</div></div><span className="metric-footnote">vs. previous quarter</span></article>;
}

const programs = [
  ["program-care", "Competence & Skills Training", "Practical skills for sustainable livelihoods", "562"],
  ["program-nutrition", "Child & Family Nutrition", "Healthier homes, stronger communities", "1,150"],
  ["program-relief", "Relief & Empowerment", "Standing alongside families in need", "1,370"],
  ["program-education", "Educational Advancement", "Creating brighter paths for young people", "78"],
] as const;

export default function OverviewPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const identity = useDashboardIdentity();
  function addMember(member: Member) {
    setMembers((current) => [member, ...current]);
    setShowAdd(false);
  }
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> {identity.dateLabel}</div><h1>{identity.greeting}, {identity.name} <span className="wave">✳</span></h1><p>Here&apos;s what&apos;s happening across your community today.</p></div><div className="heading-actions"><button className="button button-secondary"><Icon name="calendar" size={16} /> This month <Icon name="chevron-down" size={14} /></button><button className="button button-primary" onClick={() => setShowAdd(true)}><Icon name="plus" size={17} /> Add member</button></div></div>
    <section className="metric-grid" aria-label="Area statistics">
      <MetricCard label="Total members" value="4,286" change="+8.2%" icon="users" tint="tint-indigo" bars={[35, 49, 38, 58, 45, 73, 59, 84, 66, 100]} />
      <MetricCard label="ComDev pastors" value="328" change="+4.6%" icon="heart" tint="tint-rose" bars={[40, 54, 41, 66, 51, 72, 63, 87, 74, 100]} />
      <MetricCard label="Small group leaders" value="1,164" change="+6.1%" icon="activity" tint="tint-teal" bars={[30, 47, 38, 59, 52, 69, 62, 83, 77, 100]} />
      <MetricCard label="Small group members" value="2,794" change="+3.8%" icon="shield" tint="tint-amber" bars={[39, 34, 53, 47, 60, 56, 75, 66, 85, 100]} />
    </section>
    <section className="overview-grid">
      <article className="panel engagement-panel"><div className="panel-heading"><div><h2>Community overview</h2><p>Member engagement across the Metro East Area</p></div><button className="button button-quiet">Last 6 months <Icon name="chevron-down" size={14} /></button></div><div className="chart-summary"><div><strong>4,286</strong><span>Total registered members</span></div><div className="chart-legend"><span><i className="legend-indigo" />Active</span><span><i className="legend-mint" />New this month</span></div></div><div className="chart-area" aria-label="Monthly member activity chart"><div className="chart-y-labels"><span>5k</span><span>4k</span><span>3k</span><span>2k</span><span>1k</span></div><div className="chart-bars">{[["Jan", 49, 15], ["Feb", 57, 12], ["Mar", 54, 19], ["Apr", 68, 17], ["May", 65, 22], ["Jun", 78, 18], ["Jul", 73, 26], ["Aug", 85, 21], ["Sep", 79, 29], ["Oct", 93, 24], ["Nov", 0, 0], ["Dec", 0, 0]].map(([month, active, added]) => <div className="bar-group" key={month as string}><div className="bar-pair">{Number(active) > 0 && <><i className="chart-bar-active" style={{ height: `${active}%` }} /><i className="chart-bar-added" style={{ height: `${added}%` }} /></>}</div><span>{month}</span></div>)}</div><div className="chart-gridlines"><i /><i /><i /><i /><i /></div></div></article>
      <article className="panel distribution-panel"><div className="panel-heading"><div><h2>Member distribution</h2><p>By ministry group</p></div><button className="more-button" aria-label="More distribution options"><Icon name="more" /></button></div><div className="distribution-total"><strong>4,286</strong><span>members in total</span></div><div className="distribution-list"><div className="distribution-item"><span className="distribution-symbol d-indigo"><Icon name="users" size={15} /></span><div className="distribution-info"><div><strong>Small group members</strong><span>65.2%</span></div><div className="progress-track"><i className="progress-indigo" style={{ width: "65.2%" }} /></div></div><b>2,794</b></div><div className="distribution-item"><span className="distribution-symbol d-teal"><Icon name="activity" size={15} /></span><div className="distribution-info"><div><strong>Small group leaders</strong><span>27.2%</span></div><div className="progress-track"><i className="progress-teal" style={{ width: "27.2%" }} /></div></div><b>1,164</b></div><div className="distribution-item"><span className="distribution-symbol d-rose"><Icon name="heart" size={15} /></span><div className="distribution-info"><div><strong>ComDev pastors</strong><span>7.6%</span></div><div className="progress-track"><i className="progress-rose" style={{ width: "7.6%" }} /></div></div><b>328</b></div></div><Link className="text-link" href="/dashboard/masterlist">View all members <Icon name="chevron-right" size={15} /></Link></article>
    </section>
    <section className="program-section"><div className="section-heading"><div><h2>Community programs</h2><p>See how your area is making a difference.</p></div><Link className="text-link" href="/dashboard/cares-program">Explore programs <Icon name="chevron-right" size={15} /></Link></div><div className="program-grid">{programs.map(([className, name, description, count]) => <Link className={`program-card ${className}`} href="/dashboard/cares-program" key={name}><div className="program-card-top"><span className="program-mark"><Icon name="heart" size={17} /></span><span className="program-tag">CARES</span></div><strong>{name}</strong><span className="program-description">{description}</span><div className="program-card-bottom"><span><b>{count}</b> beneficiaries</span><span className="program-arrow"><Icon name="chevron-right" size={16} /></span></div></Link>)}</div></section>
    <section className="panel recent-panel"><div className="panel-heading"><div><h2>Recently added members</h2><p>The latest people added to your area masterlist</p></div><Link className="text-link" href="/dashboard/masterlist">View masterlist <Icon name="chevron-right" size={15} /></Link></div><MemberTable members={members.slice(0, 4)} /></section>
    {showAdd && <AddMemberModal close={() => setShowAdd(false)} addMember={addMember} />}
  </>;
}
