import { Icon } from "@/components/icon";

const programs = [
  { name: "Competence & Skills Training", count: "562", type: "Skills development", color: "program-care" },
  { name: "Child & Family Nutrition", count: "1,150", type: "Family wellbeing", color: "program-nutrition" },
  { name: "Relief & Empowerment", count: "1,370", type: "Community support", color: "program-relief" },
  { name: "Educational Advancement", count: "78", type: "Youth development", color: "program-education" },
];

export default function CaresPage() {
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> METRO EAST AREA</div><h1>CARES Program</h1><p>Programs creating meaningful change in our communities.</p></div><div className="heading-actions"><button className="button button-primary"><Icon name="plus" size={17} /> Add program</button></div></div>
    <div className="program-detail-grid">{programs.map((program) => <article className={`program-detail-card ${program.color}`} key={program.name}><div className="program-card-top"><span className="program-mark"><Icon name="heart" size={17} /></span><span className="program-tag">ACTIVE</span></div><span className="detail-type">{program.type}</span><h2>{program.name}</h2><p>Building a stronger, healthier and more connected Metro East community.</p><div className="detail-count"><strong>{program.count}</strong><span>beneficiaries</span></div><div className="detail-progress"><span>Annual target</span><b>72%</b><div className="progress-track"><i style={{ width: "72%" }} /></div></div></article>)}</div>
  </>;
}
