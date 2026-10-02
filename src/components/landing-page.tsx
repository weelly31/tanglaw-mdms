"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FoundationLogo } from "@/components/foundation-logo";
import { saveDashboardName } from "@/components/dashboard/use-dashboard-identity";
import { Icon } from "@/components/icon";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    saveDashboardName(name);
    router.push("/dashboard");
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand">
          <FoundationLogo className="foundation-logo" />
          <div className="brand-copy"><span className="brand-name">Tanglaw</span><span className="brand-caption">TOUCH CARE FOUNDATION</span></div>
        </div>
        <div className="login-story">
          <div className="login-visual-kicker"><span /> GROW IN FAITH. GROW IN PURPOSE.</div>
          <h1>Grow in faith.<br />Grow in <em>purpose.</em><br />Grow together.</h1>
          <p>Every journey begins with a step. Nurture your faith, strengthen your spirit, and build a community where everyone is encouraged to grow, serve, and move forward together.</p>
          <div className="story-stats"><div><strong>4,286</strong><span>members cared for</span></div><i /><div><strong>12</strong><span>local communities</span></div></div>
        </div>
        <div className="login-visual-bottom"><span>Faith grows stronger in community.</span><span>Tanglaw Touch Care Foundation</span></div>
        <div className="visual-orb orb-one" /><div className="visual-orb orb-two" /><div className="visual-grid" />
      </section>
      <section className="login-side">
        <div className="login-side-brand"><FoundationLogo className="foundation-logo" /><div className="brand-copy"><span className="brand-name">Tanglaw</span><span className="brand-caption">TOUCH CARE FOUNDATION</span></div></div>
        <div className="login-mobile-story"><h1>Grow in faith.<br />Grow in <em>purpose.</em><br />Grow together.</h1><p>Every journey begins with a step. Nurture your faith, strengthen your spirit, and build a community where everyone is encouraged to grow, serve, and move forward together.</p></div>
        <div className="login-form-wrap">
          <div className="login-welcome"><span className="login-eyebrow">WELCOME BACK</span><h2>Sign in to your<br />workspace</h2><p>Pick up where your community left off.</p></div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <div className="login-input-wrap"><Icon name="users" size={17} /><input id="name" name="name" type="text" autoComplete="name" placeholder="Enter your name" required /></div>
            <label htmlFor="email">Email address</label>
            <div className="login-input-wrap"><Icon name="users" size={17} /><input id="email" name="email" type="email" autoComplete="email" placeholder="you@organization.org" required /></div>
            <div className="password-label"><label htmlFor="password">Password</label><button type="button" className="forgot-link">Forgot password?</button></div>
            <div className="login-input-wrap"><Icon name="shield" size={17} /><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="password-toggle" onClick={() => setShowPassword(!showPassword)}><Icon name={showPassword ? "x" : "help"} size={16} /></button></div>
            <label className="remember-me"><input type="checkbox" defaultChecked /> <span>Keep me signed in</span></label>
            <button className="button button-primary login-submit" type="submit">Sign in <Icon name="chevron-right" size={17} /></button>
          </form>
          <div className="login-help"><span>New to Tanglaw Touch Care Foundation?</span> <button>Ask your area administrator</button></div>
        </div>
        <div className="login-footer"><span>© 2026 Tanglaw Touch Care Foundation</span><Link href="/dashboard">Dashboard preview</Link></div>
      </section>
    </main>
  );
}
