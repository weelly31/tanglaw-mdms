import type { Member } from "@/components/dashboard/data";
import { Icon } from "@/components/icon";

export function MemberTable({ members }: { members: Member[] }) {
  return (
    <div className="table-scroll"><table className="member-table"><thead><tr><th>MEMBER</th><th>MEMBER ID</th><th>AREA</th><th>MINISTRY</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>
      {members.map((member) => <tr key={member.id}><td><div className="member-cell"><span className={`member-avatar avatar-${member.color}`}>{member.initials}</span><strong>{member.name}</strong></div></td><td className="id-cell">{member.id}</td><td>{member.area}</td><td>{member.ministry}</td><td><span className={`status-pill ${member.status === "Active" ? "status-active" : member.status === "New member" ? "status-new" : "status-follow"}`}><i />{member.status}</span></td><td><button className="row-more" aria-label={`More options for ${member.name}`}><Icon name="more" size={17} /></button></td></tr>)}
      {members.length === 0 && <tr><td colSpan={6} className="empty-row">No members match your search.</td></tr>}
    </tbody></table></div>
  );
}
