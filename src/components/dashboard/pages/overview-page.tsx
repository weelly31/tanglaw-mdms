"use client";

import Link from "next/link";
import { useState } from "react";
import { AddMemberModal } from "@/components/dashboard/add-member-modal";
import { initialMembers, type Member } from "@/components/dashboard/data";
import { MemberTable } from "@/components/dashboard/member-table";
import { useDashboardIdentity } from "@/components/dashboard/use-dashboard-identity";
import { Icon } from "@/components/icon";

type MetricIcon = "heart" | "activity" | "shield" | "users";

function RegionalMetricCard({
  label,
  value,
  icon,
  theme,
  details,
}: {
  label: string;
  value: string;
  icon: MetricIcon;
  theme: string;
  details: { label: string; count: string }[];
}) {
  return (
    <article className={`regional-metric ${theme}`}>
      <div className="regional-metric-heading">
        <span className="regional-metric-icon"><Icon name={icon} size={18} /></span>
        <span className="regional-metric-label">{label}</span>
      </div>
      <div className="regional-metric-content">
        <strong className="regional-metric-total">{value}</strong>
        {details.length > 0 && (
          <dl className="regional-metric-details">
            {details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.count}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

const engagementOutcomes = [
  { label: "Evangelized", count: "260", detail: "First steps of faith", color: "outcome-indigo" },
  { label: "Edified", count: "154", detail: "Growing in community", color: "outcome-teal" },
  { label: "Endorsed", count: "8", detail: "Ready to serve", color: "outcome-amber" },
];

const caresPrograms = [
  { title: "Competence & Skills Training", description: "Skills for sustainable livelihoods", beneficiaries: "562", color: "care-indigo", icon: "activity" },
  { title: "Assistance to Child & Family Nutrition", description: "Healthier homes and families", beneficiaries: "1,150", color: "care-teal", icon: "heart" },
  { title: "Relief & Empowerment", description: "Support for families in need", beneficiaries: "1,370", color: "care-rose", icon: "shield" },
  { title: "Educational Advancement", description: "More opportunities for learners", beneficiaries: "7", color: "care-amber", icon: "file" },
] as const;

const recentActivity = [
  { initials: "MS", name: "Marites D. Santos", action: "was added to the masterlist", time: "12 min ago", color: "peach" },
  { initials: "JM", name: "Joel R. Manalo", action: "completed SGL profile review", time: "1 hr ago", color: "blue" },
  { initials: "LV", name: "Liza P. Villanueva", action: "was marked for follow-up", time: "3 hrs ago", color: "purple" },
];

const upcomingEvents = [
  { date: "08", month: "OCT", title: "Small Group Leaders Huddle", time: "9:00 AM · Taytay Community Hall", color: "event-indigo" },
  { date: "14", month: "OCT", title: "Family Nutrition Workshop", time: "10:30 AM · Antipolo Center", color: "event-teal" },
  { date: "22", month: "OCT", title: "Metro East Area Gathering", time: "2:00 PM · Marikina City", color: "event-rose" },
];

export default function OverviewPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const identity = useDashboardIdentity();

  function addMember(member: Member) {
    setMembers((current) => [member, ...current]);
    setShowAdd(false);
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow"><span className="status-dot" /> {identity.dateLabel}</div>
          <h1>{identity.greeting}, {identity.name} <span className="wave">✳</span></h1>
          <p>Here&apos;s your Metro East Area at a glance.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-secondary"><Icon name="calendar" size={16} /> This month <Icon name="chevron-down" size={14} /></button>
          <button className="button button-primary" onClick={() => setShowAdd(true)}><Icon name="plus" size={17} /> Add member</button>
        </div>
      </div>

      <section className="area-overview-section" aria-labelledby="area-overview-title">
        <div className="dashboard-section-heading">
          <div><span className="section-kicker">YOUR COMMUNITY</span><h2 id="area-overview-title">Metro East Area</h2></div>
          <Link className="text-link" href="/dashboard/masterlist">View masterlist <Icon name="chevron-right" size={15} /></Link>
        </div>
        <div className="regional-metric-grid">
          <RegionalMetricCard label="ComDev Pastors" value="13" icon="heart" theme="regional-indigo" details={[{ label: "1st year", count: "4" }, { label: "2nd year", count: "3" }, { label: "3rd year", count: "3" }, { label: "In training", count: "3" }]} />
          <RegionalMetricCard label="Small Group Leaders" value="41" icon="activity" theme="regional-green" details={[{ label: "Explore", count: "16" }, { label: "Engage", count: "7" }, { label: "Expand", count: "8" }, { label: "Explode", count: "10" }]} />
          <RegionalMetricCard label="Small Group Members" value="109" icon="shield" theme="regional-plum" details={[{ label: "Explore", count: "25" }, { label: "Engage", count: "37" }, { label: "Expand", count: "32" }, { label: "Explode", count: "15" }]} />
          <article className="regional-total-card">
            <span className="regional-total-icon"><Icon name="users" size={19} /></span>
            <span className="regional-total-label">Total members</span>
            <strong>977</strong>
            <div className="regional-total-breakdown"><span>Before TTC</span><b>969</b></div>
            <div className="regional-total-breakdown"><span>Added during partnership</span><b className="new-member-count">+8</b></div>
          </article>
        </div>
      </section>

      <section className="engagement-outcomes" aria-label="Faith journey outcomes">
        {engagementOutcomes.map((outcome) => (
          <article className={`outcome-card ${outcome.color}`} key={outcome.label}>
            <span className="outcome-icon"><Icon name="check" size={15} /></span>
            <div className="outcome-copy"><strong>{outcome.label}</strong><span>{outcome.detail}</span></div>
            <b>{outcome.count}</b>
          </article>
        ))}
      </section>

      <section className="cares-overview-section">
        <div className="dashboard-section-heading">
          <div><span className="section-kicker">MAKING A DIFFERENCE</span><h2>CARES Program</h2><p>People reached through community care and development.</p></div>
          <Link className="text-link" href="/dashboard/cares-program">Explore programs <Icon name="chevron-right" size={15} /></Link>
        </div>
        <div className="cares-overview-grid">
          {caresPrograms.map((program) => (
            <Link href="/dashboard/cares-program" className={`cares-overview-card ${program.color}`} key={program.title}>
              <div className="cares-card-icon"><Icon name={program.icon} size={18} /></div>
              <span className="care-label">CARES PROGRAM</span>
              <strong className="cares-card-title">{program.title}</strong>
              <span className="cares-card-description">{program.description}</span>
              <div className="cares-card-footer"><span>Beneficiaries</span><b>{program.beneficiaries}</b><Icon name="chevron-right" size={15} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className={`dashboard-more ${showMobileDetails ? "dashboard-more-expanded" : ""}`}>
        <button className="dashboard-more-toggle" type="button" aria-expanded={showMobileDetails} onClick={() => setShowMobileDetails((expanded) => !expanded)}>
          <span>{showMobileDetails ? "Hide" : "View"} activity, follow-ups &amp; members</span>
          <Icon name="chevron-down" size={16} />
        </button>
        <div className="dashboard-more-content">
          <div className="dashboard-lower-grid">
            <article className="panel activity-panel">
              <div className="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your area</p></div><button className="more-button" aria-label="More activity options"><Icon name="more" /></button></div>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div className="activity-item" key={activity.name}>
                    <span className={`member-avatar avatar-${activity.color}`}>{activity.initials}</span>
                    <div className="activity-item-copy"><p><strong>{activity.name}</strong> {activity.action}</p><span>{activity.time}</span></div>
                  </div>
                ))}
              </div>
              <Link className="text-link panel-bottom-link" href="/dashboard/masterlist">Open masterlist <Icon name="chevron-right" size={15} /></Link>
            </article>

            <article className="panel follow-up-panel">
              <div className="panel-heading"><div><h2>Needs follow-up</h2><p>Members to check in with</p></div><span className="follow-up-count">136</span></div>
              <div className="follow-up-highlight"><span className="follow-up-highlight-icon"><Icon name="clock" size={17} /></span><div><strong>Keep every connection growing</strong><p>Review members who may need a personal check-in.</p></div></div>
              <div className="follow-up-stats"><div><strong>24</strong><span>New this week</span></div><div><strong>8</strong><span>Overdue check-ins</span></div><div><strong>12</strong><span>Local areas</span></div></div>
              <Link className="button button-secondary follow-up-action" href="/dashboard/masterlist">Review follow-ups <Icon name="chevron-right" size={15} /></Link>
            </article>

            <article className="panel events-panel">
              <div className="panel-heading"><div><h2>Upcoming events</h2><p>Gatherings and activities this month</p></div><Link className="text-link" href="/dashboard/calendar">Full calendar <Icon name="chevron-right" size={14} /></Link></div>
              <div className="upcoming-event-list">
                {upcomingEvents.map((event) => (
                  <div className="upcoming-event" key={event.title}>
                    <div className={`upcoming-event-date ${event.color}`}><strong>{event.date}</strong><span>{event.month}</span></div>
                    <div className="upcoming-event-copy"><strong>{event.title}</strong><span>{event.time}</span></div>
                    <Icon name="chevron-right" size={15} className="upcoming-event-arrow" />
                  </div>
                ))}
              </div>
            </article>
          </div>

          <section className="panel recent-panel">
            <div className="panel-heading"><div><h2>Recently added members</h2><p>The latest people added to your area masterlist</p></div><Link className="text-link" href="/dashboard/masterlist">View masterlist <Icon name="chevron-right" size={15} /></Link></div>
            <MemberTable members={members.slice(0, 4)} />
          </section>
        </div>
      </section>

      {showAdd && <AddMemberModal close={() => setShowAdd(false)} addMember={addMember} />}
    </>
  );
}
