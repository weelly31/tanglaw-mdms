import { initialMembers } from "@/components/dashboard/data";
import { MemberTable } from "@/components/dashboard/member-table";
import { Icon } from "@/components/icon";

export default function DirectoryPage({ type }: { type: "SGL" | "SGM" }) {
  const leaders = type === "SGL";
  const title = leaders ? "Small Group Leaders" : "Small Group Members";
  const members = initialMembers.filter((member) => member.ministry === type);
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> METRO EAST AREA</div><h1>{title}</h1><p>Review and manage your {leaders ? "small group leaders" : "small group members"}.</p></div><div className="heading-actions"><button className="button button-primary"><Icon name="plus" size={17} /> Add member</button></div></div>
    <section className="panel masterlist-panel"><div className="panel-heading"><div><h2>{leaders ? "Leader" : "Member"} directory</h2><p>Members assigned to your Metro East Area groups.</p></div><button className="button button-secondary"><Icon name="download" size={15} /> Export list</button></div><div className="table-toolbar"><label className="table-search"><Icon name="search" size={17} /><input placeholder={`Search ${title.toLowerCase()}...`} aria-label={`Search ${title}`} /></label><button className="button button-secondary"><Icon name="filter" size={16} /> Filters</button></div><MemberTable members={members} /></section>
  </>;
}
