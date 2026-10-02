"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import type { Member } from "@/components/dashboard/data";

export function AddMemberModal({ close, addMember }: { close: () => void; addMember: (member: Member) => void }) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    if (!name) {
      setError("Please enter the member's name.");
      return;
    }
    const area = String(formData.get("area"));
    const ministry = String(formData.get("ministry"));
    const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
    addMember({ name, area, ministry, id: `ME-2026-${String(Date.now()).slice(-4)}`, status: "New member", initials, color: "blue" });
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="member-modal" role="dialog" aria-modal="true" aria-labelledby="add-member-title"><div className="modal-heading"><div><span className="modal-icon"><Icon name="users" size={20} /></span><h2 id="add-member-title">Add a member</h2><p>Enter the basic details to add someone to your area masterlist.</p></div><button className="icon-button" aria-label="Close dialog" onClick={close}><Icon name="x" /></button></div><form onSubmit={handleSubmit}><label>Full name <span>*</span><input name="name" placeholder="e.g. Ana D. Santos" required autoFocus /></label><div className="form-row"><label>Local area <span>*</span><select name="area" defaultValue="" required><option value="" disabled>Select an area</option><option>Antipolo</option><option>Marikina</option><option>Mandaluyong</option><option>Pasig</option><option>Quezon City</option></select></label><label>Ministry group <span>*</span><select name="ministry" defaultValue="" required><option value="" disabled>Select group</option><option>ComDev Pastor</option><option>SGL</option><option>SGM</option></select></label></div><label>Contact number <input name="phone" placeholder="+63 9XX XXX XXXX" /></label>{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="button button-secondary" onClick={close}>Cancel</button><button type="submit" className="button button-primary"><Icon name="plus" size={16} /> Add to masterlist</button></div></form></section></div>;
}
