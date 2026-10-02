import { Icon } from "@/components/icon";

const reports = [
  ["Masterlist summary", "Member records, growth and area breakdown", "4,286 records"],
  ["Program impact", "Beneficiaries and outcomes by program", "4 programs"],
  ["Leader engagement", "Small group leadership and activity", "1,164 leaders"],
];

export default function ReportsPage() {
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> METRO EAST AREA</div><h1>Reports</h1><p>Insights and reports for your area.</p></div></div>
    <div className="report-grid">{reports.map(([name, detail, meta]) => <button className="panel report-card" key={name}><span className="report-icon"><Icon name="file" size={20} /></span><strong>{name}</strong><span>{detail}</span><small>{meta} <Icon name="chevron-right" size={14} /></small></button>)}</div>
  </>;
}
