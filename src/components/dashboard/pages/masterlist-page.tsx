"use client";

import { useMemo, useState } from "react";
import { AddMemberModal } from "@/components/dashboard/add-member-modal";
import { initialMembers, type Member } from "@/components/dashboard/data";
import { MemberTable } from "@/components/dashboard/member-table";
import { Icon } from "@/components/icon";

export default function MasterlistPage() {
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All members");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = useMemo(() => members.filter((member) => `${member.name} ${member.id} ${member.area} ${member.ministry}`.toLowerCase().includes(query.toLowerCase()) && (filter === "All members" || member.status === filter)), [members, query, filter]);
  function addMember(member: Member) {
    setMembers((current) => [member, ...current]);
    setShowAdd(false);
  }
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> PEOPLE &amp; COMMUNITY</div><h1>Masterlist</h1><p>A complete record of the people in your community.</p></div><div className="heading-actions"><button className="button button-secondary"><Icon name="download" size={16} /> Export</button><button className="button button-primary" onClick={() => setShowAdd(true)}><Icon name="plus" size={17} /> Add member</button></div></div>
    <div className="masterlist-stats"><div><span>Total members</span><strong>4,286</strong><small><Icon name="trend" size={13} /> 8.2% this quarter</small></div><div><span>Active members</span><strong>4,102</strong><small>95.7% of masterlist</small></div><div><span>New this month</span><strong>{48 + members.length - initialMembers.length}</strong><small>Across 12 local areas</small></div><div><span>Need follow-up</span><strong>136</strong><small>Review recommended</small></div></div>
    <section className="panel masterlist-panel"><div className="panel-heading"><div><h2>All members <span className="subtle-count">4,286</span></h2><p>Manage and review your area&apos;s member records.</p></div><button className="button button-secondary"><Icon name="download" size={15} /> Export list</button></div><div className="table-toolbar"><label className="table-search"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, ID or area..." aria-label="Search members" /><kbd>⌘ F</kbd></label><div className="toolbar-right"><button className="button button-secondary"><Icon name="filter" size={16} /> Filters</button><select className="select-button" aria-label="Filter by member status" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All members</option><option>Active</option><option>For follow-up</option><option>New member</option></select></div></div><MemberTable members={filtered} /><div className="table-footer"><span>Showing <b>{filtered.length ? 1 : 0}–{filtered.length}</b> of <b>4,286</b> members</span><div><button className="pagination-button" aria-label="Previous page"><Icon name="chevron-left" size={15} /></button><button className="pagination-button pagination-current">1</button><button className="pagination-button">2</button><button className="pagination-button">3</button><span className="pagination-ellipsis">...</span><button className="pagination-button">43</button><button className="pagination-button" aria-label="Next page"><Icon name="chevron-right" size={15} /></button></div></div></section>
    {showAdd && <AddMemberModal close={() => setShowAdd(false)} addMember={addMember} />}
  </>;
}
