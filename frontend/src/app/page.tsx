"use client";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  ShieldCheck,
  Sparkles,
  Zap,
  Terminal,
  GraduationCap,
  GitBranch,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="landing">
      <nav className="navbar">
        <Link
    href="/"
    style={{
        display: "flex",
        alignItems: "center",
        gap: "13px",
        color: "white",
        textDecoration: "none",
        fontSize: "24px",
        fontWeight: 800,
        whiteSpace: "nowrap",
        flexShrink: 0,
    }}
    >
  <span
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "52px",
      height: "52px",
      flexShrink: 0,
      borderRadius: "14px",
      color: "#a78bfa",
      background: "linear-gradient(135deg,#312e81,#172554)",
      border: "1px solid #6366f1",
      boxSizing: "border-box",
    }}
  >
    <Code2 size={30} />
  </span>

  <span style={{ display: "block", lineHeight: 1.2 }}>
    CodeReview
    <small
      style={{
        display: "block",
        marginTop: "3px",
        fontSize: "10px",
        letterSpacing: "3px",
        color: "#94a3b8",
      }}
    >
      ACADEMY
    </small>
  </span>
    </Link>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="login-btn">
            Login
          </Link>
          <Link href="/register" className="signup-btn">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="announcement">
            <Sparkles size={15} />
            YOUR NEXT-GENERATION CODING COMPANION
          </div>

          <h1>
            Write Better Code.
            <br />
            <span>Think Smarter.</span>
            <br />
            Build the Future.
          </h1>

          <p className="hero-description">
            Take your programming skills to the next level.
            Upload your code, explore your projects, and
            discover a smarter way to improve with AI-powered
            code review.
          </p>

          <div className="hero-actions">
            <Link href="/register" className="primary-cta">
              Start Learning Free <ArrowRight size={19} />
            </Link>
            <Link href="/login" className="secondary-cta">
              Explore Your Workspace
            </Link>
          </div>

          <div className="trust-line">
            <ShieldCheck size={17} />
            Built for developers and future engineers
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow glow-one" />
          <div className="glow glow-two" />

          <div className="code-window">
            <div className="window-top">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>intelligent_review.ts</span>
              <Sparkles size={16} />
            </div>

            <div className="code-body">
              <div><span className="line">01</span> <span className="purple">const</span> <span className="blue">review</span> = <span className="purple">async</span> () =&gt; {"{"}</div>
              <div><span className="line">02</span> &nbsp; <span className="purple">const</span> code = <span className="green">"your-code"</span>;</div>
              <div><span className="line">03</span> &nbsp; <span className="purple">const</span> result = <span className="purple">await</span></div>
              <div><span className="line">04</span> &nbsp; &nbsp; AI.<span className="blue">analyze</span>(code);</div>
              <div><span className="line">05</span> </div>
              <div><span className="line">06</span> &nbsp; <span className="purple">return</span> result.<span className="blue">improve</span>();</div>
              <div><span className="line">07</span> {"}"};</div>
            </div>

            <div className="review-status">
              <div className="status-icon">
                <BrainCircuit size={21} />
              </div>
              <div>
                <strong>Code intelligence</strong>
                <span>Ready to analyze your project</span>
              </div>
              <span className="live-dot" />
            </div>
          </div>

          <div className="floating-card floating-top">
            <Sparkles size={18} />
            <span>Smarter coding starts here</span>
          </div>

          <div className="floating-card floating-bottom">
            <CheckCircle2 size={19} />
            <span>Developer workspace ready</span>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-heading">
          <span>POWERFUL CAPABILITIES</span>
          <h2>Your code deserves <span>more.</span></h2>
          <p>
            Everything you need to explore, manage and improve
            your coding projects in one workspace.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon purple-icon">
              <BrainCircuit size={25} />
            </div>
            <h3>AI-Powered Code Review</h3>
            <p>
              Get intelligent insights into your code and
              identify potential improvements.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon blue-icon">
              <Terminal size={25} />
            </div>
            <h3>Smart Code Workspace</h3>
            <p>
              Upload and explore your source files in an
              interactive coding environment.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon cyan-icon">
              <GitBranch size={25} />
            </div>
            <h3>Project Management</h3>
            <p>
              Save your coding projects and return to your
              work whenever you need it.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon pink-icon">
              <GraduationCap size={25} />
            </div>
            <h3>Learn and Improve</h3>
            <p>
              Understand your code better and develop
              stronger programming habits.
            </p>
          </article>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-content">
          <span className="section-label">SIMPLE WORKFLOW</span>
          <h2>From code to <span>confidence.</span></h2>
          <p>
            Start with your project and move toward writing
            cleaner, more reliable code.
          </p>

          <div className="steps">
            <div className="step">
              <span>01</span>
              <div>
                <h3>Upload your code</h3>
                <p>Bring your Python, JavaScript or TypeScript projects.</p>
              </div>
            </div>
            <div className="step">
              <span>02</span>
              <div>
                <h3>Explore your workspace</h3>
                <p>Browse your files and work with your source code.</p>
              </div>
            </div>
            <div className="step">
              <span>03</span>
              <div>
                <h3>Review and improve</h3>
                <p>Use code review insights to identify opportunities to improve.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="how-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="center-brain">
            <BrainCircuit size={70} />
            <span>AI CORE</span>
          </div>
          <div className="orbit-icon icon-one"><Code2 /></div>
          <div className="orbit-icon icon-two"><Zap /></div>
          <div className="orbit-icon icon-three"><ShieldCheck /></div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" />
        <Sparkles size={27} />
        <h2>Ready to level up your coding?</h2>
        <p>
          Your journey toward smarter development starts here.
        </p>
        <Link href="/register" className="primary-cta">
          Create Your Free Account <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="footer">
        <Link href="/" className="brand footer-brand">
          <span className="brand-icon">
            <Code2 size={21} />
          </span>
          <span>
            CodeReview
            <small>ACADEMY</small>
          </span>
        </Link>
        <p>© 2026 AI Code Review Academy. Built for better developers.</p>
      </footer>

      <style jsx>{`
        .landing {
          min-height: 100vh;
          overflow: hidden;
          background: #070b17;
          color: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
        }

        .navbar {
          height: 82px;
          max-width: 1240px;
          margin: auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148,163,184,.12);
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 13px;
            color: white;
            text-decoration: none;
            font-size: 30px !important;
            font-weight: 800;
            letter-spacing: -.5px;
            white-space: nowrap;
        }

        .brand-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 65px !important;
            height: 65px !important;
            box-sizing: border-box;
            border-radius: 14px;
            color: #a78bfa;
            background: linear-gradient(135deg,#312e81,#172554);
            border: 1px solid #6366f1;
        }

        .brand-icon svg {
            width: 35px !important;
            height: 35px !important;
            flex-shrink: 0;
        }

        .brand small {
            display: block;
            margin-top: 3px;
            font-size: 10px;
            letter-spacing: 3px;
            color: #94a3b8;
        }

        .nav-links, .nav-actions {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links a, .login-btn {
          color: #aab5ca;
          text-decoration: none;
          font-size: 14px;
          transition: color .2s;
        }

        .nav-links a:hover, .login-btn:hover {
          color: white;
        }

        .nav-actions { gap: 22px; }

        .signup-btn, .primary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 10px;
          padding: 13px 19px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          background: linear-gradient(110deg,#6366f1,#9333ea);
          box-shadow: 0 0 25px rgba(99,102,241,.25);
          transition: transform .2s, box-shadow .2s;
        }

        .signup-btn:hover, .primary-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 35px rgba(139,92,246,.45);
        }

        .hero {
          max-width: 1240px;
          min-height: 625px;
          margin: auto;
          padding: 85px 32px 90px;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          align-items: center;
          gap: 50px;
        }

        .announcement, .section-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .announcement {
          padding: 10px 14px;
          border: 1px solid rgba(129,140,248,.25);
          background: rgba(99,102,241,.09);
          border-radius: 30px;
        }

        .hero h1 {
          margin: 28px 0 22px;
          font-size: clamp(43px,5.5vw,70px);
          line-height: 1.09;
          letter-spacing: -3.5px;
          font-weight: 850;
        }

        .hero h1 span, .section-heading h2 span,
        .how-content h2 span {
          background: linear-gradient(100deg,#818cf8,#c084fc,#67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-description {
          max-width: 530px;
          color: #9caac2;
          font-size: 16px;
          line-height: 1.9;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 32px;
        }

        .secondary-cta {
          display: inline-flex;
          align-items: center;
          padding: 13px 19px;
          border: 1px solid #34415b;
          border-radius: 10px;
          color: #dbe4f5;
          text-decoration: none;
          font-size: 14px;
          transition: background .2s;
        }

        .secondary-cta:hover { background: #172033; }

        .trust-line {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 35px;
          color: #7f90aa;
          font-size: 12px;
        }

        .trust-line :global(svg) { color: #34d399; }

        .hero-visual {
          min-height: 430px;
          display: grid;
          place-items: center;
          position: relative;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(75px);
          pointer-events: none;
        }

        .glow-one {
          width: 260px;
          height: 260px;
          background: rgba(99,102,241,.27);
          top: 40px;
          left: 20px;
        }

        .glow-two {
          width: 220px;
          height: 220px;
          background: rgba(168,85,247,.2);
          bottom: 20px;
          right: 5px;
        }

        .code-window {
          z-index: 1;
          width: min(100%, 470px);
          overflow: hidden;
          border: 1px solid rgba(129,140,248,.35);
          border-radius: 17px;
          background: rgba(15,23,42,.94);
          box-shadow: 0 25px 90px rgba(0,0,0,.5),
                      0 0 50px rgba(99,102,241,.13);
          transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
        }

        .window-top {
          height: 53px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #253149;
          color: #8795ae;
          font-size: 12px;
        }

        .window-top :global(svg) {
          margin-left: auto;
          color: #a78bfa;
        }

        .window-dots { display: flex; gap: 6px; }
        .window-dots i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #f87171;
        }
        .window-dots i:nth-child(2) { background: #fbbf24; }
        .window-dots i:nth-child(3) { background: #34d399; }

        .code-body {
          padding: 28px 20px;
          min-height: 215px;
          color: #dbeafe;
          font-family: monospace;
          font-size: 13px;
          line-height: 2.25;
          white-space: nowrap;
        }

        .line { color: #64748b; margin-right: 15px; }
        .purple { color: #c084fc; }
        .blue { color: #67e8f9; }
        .green { color: #86efac; }

        .review-status {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 17px 20px;
          border-top: 1px solid #253149;
          background: rgba(30,41,59,.5);
        }

        .status-icon {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          color: #c4b5fd;
          background: rgba(139,92,246,.16);
        }

        .review-status strong, .review-status span {
          display: block;
        }

        .review-status strong { font-size: 13px; }
        .review-status div:nth-child(2) span {
          margin-top: 5px;
          color: #8493aa;
          font-size: 11px;
        }

        .live-dot {
          width: 9px;
          height: 9px;
          margin-left: auto;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 12px #34d399;
        }

        .floating-card {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 15px;
          border: 1px solid #34415b;
          border-radius: 12px;
          background: #111a2c;
          color: #dbeafe;
          font-size: 11px;
          box-shadow: 0 12px 35px rgba(0,0,0,.35);
        }

        .floating-top { top: 35px; right: -5px; }
        .floating-top :global(svg) { color: #c084fc; }
        .floating-bottom { bottom: 35px; left: -5px; }
        .floating-bottom :global(svg) { color: #34d399; }

        .features {
          padding: 100px 32px;
          background: #0a1020;
          border-top: 1px solid #1c2940;
          border-bottom: 1px solid #1c2940;
        }

        .section-heading {
          max-width: 650px;
          margin: 0 auto 50px;
          text-align: center;
        }

        .section-heading h2, .how-content h2 {
          margin: 16px 0;
          font-size: clamp(32px,4vw,45px);
          letter-spacing: -1.8px;
        }

        .section-heading p, .how-content > p {
          color: #91a0b8;
          line-height: 1.8;
          font-size: 14px;
        }

        .feature-grid {
          max-width: 1120px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 18px;
        }

        .feature-card {
          padding: 27px 23px;
          border: 1px solid #26334b;
          border-radius: 15px;
          background: linear-gradient(145deg,#111b30,#0c1425);
          transition: transform .25s, border-color .25s;
        }

        .feature-card:hover {
          transform: translateY(-7px);
          border-color: #818cf8;
        }

        .feature-icon {
          width: 49px;
          height: 49px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          margin-bottom: 22px;
        }

        .purple-icon { color: #c4b5fd; background: #312e81; }
        .blue-icon { color: #93c5fd; background: #172554; }
        .cyan-icon { color: #67e8f9; background: #164e63; }
        .pink-icon { color: #f0abfc; background: #701a75; }

        .feature-card h3 { font-size: 16px; margin-bottom: 12px; }
        .feature-card p {
          color: #91a0b8;
          font-size: 13px;
          line-height: 1.8;
        }

        .how-section {
          max-width: 1120px;
          margin: auto;
          padding: 110px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .how-content h2 { line-height: 1.2; }

        .steps { margin-top: 35px; }

        .step {
          display: flex;
          gap: 20px;
          padding: 18px 0;
          border-bottom: 1px solid #243047;
        }

        .step > span {
          color: #a78bfa;
          font-family: monospace;
          font-size: 17px;
          font-weight: bold;
        }

        .step h3 { font-size: 15px; margin-bottom: 7px; }
        .step p { color: #91a0b8; font-size: 12px; line-height: 1.7; }

        .how-visual {
          position: relative;
          height: 390px;
          display: grid;
          place-items: center;
        }

        .orbit {
          position: absolute;
          border: 1px solid rgba(129,140,248,.28);
          border-radius: 50%;
        }

        .orbit-one { width: 270px; height: 270px; }
        .orbit-two { width: 365px; height: 365px; border-style: dashed; }

        .center-brain {
          width: 145px;
          height: 145px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid #818cf8;
          border-radius: 35px;
          color: #c4b5fd;
          background: linear-gradient(145deg,#312e81,#172554);
          box-shadow: 0 0 70px rgba(99,102,241,.25);
          z-index: 1;
        }

        .center-brain span {
          font-size: 10px;
          letter-spacing: 3px;
          font-weight: bold;
        }

        .orbit-icon {
          position: absolute;
          z-index: 2;
          width: 53px;
          height: 53px;
          display: grid;
          place-items: center;
          border: 1px solid #455276;
          border-radius: 16px;
          color: #c4b5fd;
          background: #121d35;
        }

        .icon-one { top: 35px; left: 50%; transform: translateX(-50%); }
        .icon-two { bottom: 55px; left: 12%; color: #67e8f9; }
        .icon-three { bottom: 55px; right: 12%; color: #86efac; }

        .final-cta {
          position: relative;
          overflow: hidden;
          margin: 10px 32px 90px;
          padding: 70px 20px;
          text-align: center;
          border: 1px solid #45418b;
          border-radius: 22px;
          background: linear-gradient(115deg,#171c45,#21143c,#10283b);
        }

        .cta-glow {
          position: absolute;
          width: 300px;
          height: 200px;
          top: -120px;
          left: calc(50% - 150px);
          border-radius: 50%;
          background: #818cf8;
          filter: blur(90px);
          opacity: .3;
        }

        .final-cta > :global(svg) {
          position: relative;
          color: #c4b5fd;
        }

        .final-cta h2 {
          position: relative;
          margin: 20px 0 12px;
          font-size: clamp(26px,4vw,40px);
          letter-spacing: -1px;
        }

        .final-cta p {
          position: relative;
          margin-bottom: 27px;
          color: #b3bdd2;
          font-size: 14px;
        }

        .final-cta .primary-cta { position: relative; }

        .footer {
          max-width: 1240px;
          margin: auto;
          padding: 25px 32px 35px;
          border-top: 1px solid #1c2940;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footer-brand .brand-icon { width: 37px; height: 37px; }
        .footer p { color: #718096; font-size: 11px; }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding-top: 65px; }
          .hero-content { text-align: center; }
          .hero-description { margin: auto; }
          .hero-actions, .trust-line { justify-content: center; }
          .hero-visual { margin-top: 15px; }
          .feature-grid { grid-template-columns: repeat(2,1fr); }
          .how-section { gap: 20px; }
        }

        @media (max-width: 600px) {
          .navbar { padding: 0 18px; height: 72px; }
          .nav-links { display: none; }
          .nav-actions { gap: 13px; }
          .signup-btn { padding: 11px 12px; font-size: 12px; }
          .login-btn { font-size: 12px; }
          .hero { padding: 65px 20px; gap: 25px; }
          .hero h1 { letter-spacing: -2px; }
          .hero-description { font-size: 14px; }
          .hero-actions { flex-direction: column; }
          .hero-actions a { width: 100%; box-sizing: border-box; }
          .hero-visual { min-height: 350px; }
          .code-window { transform: none; }
          .code-body { font-size: 10px; padding: 20px 12px; }
          .floating-card { font-size: 9px; padding: 10px; }
          .floating-top { right: 0; }
          .floating-bottom { left: 0; }
          .features { padding: 75px 20px; }
          .feature-grid { grid-template-columns: 1fr; }
          .how-section { grid-template-columns: 1fr; padding: 75px 22px; }
          .how-visual { height: 330px; }
          .orbit-two { width: 300px; height: 300px; }
          .orbit-one { width: 220px; height: 220px; }
          .final-cta { margin: 0 15px 60px; padding: 55px 18px; }
          .footer { flex-direction: column; text-align: center; }
        }
      `}</style>
    </main>
  );
}
