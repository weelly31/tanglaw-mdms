export default function SettingsPage() {
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> WORKSPACE PREFERENCES</div><h1>Settings</h1><p>Manage your workspace preferences.</p></div></div>
    <section className="panel settings-panel"><div className="settings-section"><div><h2>Workspace profile</h2><p>Basic information for your area workspace.</p></div><div className="settings-fields"><label>Workspace name<input defaultValue="Metro East Area" /></label><label>Area administrator<input defaultValue="Maria Reyes" /></label><label>Contact email<input defaultValue="maria.reyes@tanglaw.org" /></label><button className="button button-primary">Save changes</button></div></div><div className="settings-section"><div><h2>Notifications</h2><p>Choose which activity updates you receive.</p></div><div className="settings-toggle-list">{["New member registrations", "Program activity updates", "Weekly area summary"].map((item, index) => <label key={item}>{item}<input type="checkbox" defaultChecked={index !== 1} /></label>)}</div></div></section>
  </>;
}
