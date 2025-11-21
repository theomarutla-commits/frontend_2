import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import logo from './assets/icycon-logo.svg'

type Theme = 'light' | 'dark'
type AuthMode = 'login' | 'signup'

const modules = [
  {
    title: 'SEO & GEO/AEO',
    description: 'Technical scans, schemas, keyword mapping, llms.txt, citation builder.',
    chips: ['Snippets & PAA', 'Answer-ready blocks', 'Local + map pack'],
  },
  {
    title: 'Social',
    description: 'Scripts, posts, scheduling, moderation rules, channel-ready assets.',
    chips: ['Shorts + clips', 'Brand-safe guardrails', 'Auto-schedule'],
  },
  {
    title: 'Email & SMS',
    description: 'Flows, deliverability insights, CASL/CAN-SPAM gates, revenue tracking.',
    chips: ['Pre-send QA', 'Suppressions', 'Revenue per recipient'],
  },
  {
    title: 'ASO',
    description: 'Metadata generator, review responder, screenshot copy variants.',
    chips: ['Tiered rollouts', 'Keyword heatmaps', 'Review macros'],
  },
]

const automationItems = [
  'Posts and videos scheduled with moderation rules applied.',
  'Sitemaps and structured data auto-updated after prompt outputs.',
  'Directory submissions and GBP updates pushed with approvals.',
  'Compliance gates block non-compliant outreach before send.',
]

const metrics = [
  { label: 'Cost per qualified visit', value: '-$1.20', note: '↓ 18% vs last week', emphasis: true },
  { label: 'Conversion rate', value: '4.9%', note: '+0.8 pts with multi-channel prompts' },
  { label: 'Answer-engine citations', value: '38%', note: 'Across PAA / map pack / AI answers' },
  { label: 'Deliverability', value: '98.4%', note: 'GDPR / CASL / CAN-SPAM enforced' },
]

const experiments = [
  { name: 'Long-tail SEO clusters → social threads', status: 'Queued', impact: 'Traffic', owner: 'Growth' },
  { name: 'Local schema refresh + llms.txt', status: 'Running', impact: 'Answer-engine', owner: 'SEO' },
  { name: 'New subscriber nurture SMS', status: 'Staged', impact: 'Revenue', owner: 'Lifecycle' },
]

const templates = [
  'SEO brief + schema',
  'Blog draft + answer blocks',
  'Social thread + short scripts',
  'Email + SMS flow',
]

const channels = ['SEO', 'GEO/AEO', 'Social', 'Email/SMS', 'ASO']
const featureLinks = [
  { label: 'Prompt Engine', to: '/' },
  { label: 'Modules', to: '/modules' },
  { label: 'Automation', to: '/automation' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Access', to: '/access' },
  { label: 'About', to: '/about' },
]

const featureKPIs = [
  { label: 'Prompt Engine', primary: '142 briefs', secondary: '68% publish rate', delta: '+12% vs last week', status: 'Healthy' },
  { label: 'Automation', primary: '318 runs', secondary: '94.2% success', delta: '+6.2% uptime', status: 'Stable' },
  { label: 'Compliance', primary: '27 blocks', secondary: '8 warnings', delta: '+3 policy hits', status: 'Watch' },
  { label: 'Analytics', primary: '1.8k events', secondary: '82% data freshness', delta: '+9 pts freshness', status: 'Healthy' },
]

const featureTrends = [
  { label: 'Prompt Engine', values: [62, 68, 64, 70, 74, 76, 81] },
  { label: 'Automation', values: [88, 86, 90, 92, 91, 93, 94] },
  { label: 'Compliance', values: [32, 28, 30, 35, 33, 31, 29] },
  { label: 'Analytics', values: [70, 72, 75, 78, 79, 80, 82] },
]

const channelMix = [
  { label: 'SEO / AEO', value: 62 },
  { label: 'Social', value: 18 },
  { label: 'Email / SMS', value: 14 },
  { label: 'ASO', value: 6 },
]

const accessStats = [
  { label: 'Active workspaces', value: '42', note: '+5 this week' },
  { label: 'Team members', value: '311', note: '42 pending invites' },
  { label: 'SSO sessions', value: '1,284', note: '+9.3% WoW' },
  { label: 'Guardrail blocks', value: '27', note: 'Policy: GDPR / CASL' },
]

function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [isAuthed, setIsAuthed] = useState<boolean>(false)
  const [autoTheme, setAutoTheme] = useState<boolean>(true)
  const [featuresOpen, setFeaturesOpen] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark')
    document.body.classList.toggle('theme-light', theme === 'light')
  }, [theme])

  useEffect(() => {
    if (!autoTheme) return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.anchor-target'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const idx = sections.indexOf(visible.target as HTMLElement)
          const nextTheme: Theme = idx % 2 === 0 ? 'dark' : 'light'
          setTheme((prev) => (prev === nextTheme ? prev : nextTheme))
        }
      },
      { threshold: [0.3, 0.6, 0.85], rootMargin: '0px 0px -25% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [autoTheme, location.pathname])

  useEffect(() => {
    setFeaturesOpen(false)
  }, [location.pathname])

  const handleThemeToggle = () => {
    setAutoTheme(false)
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="logo-stack">
          <img src={logo} alt="ICYCON" className="brand-logo" />
          <div className="eyebrow">Prompting OS for multi-channel growth</div>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <div className={`dropdown ${featuresOpen ? 'open' : ''}`}>
            <button
              className="dropdown-trigger"
              onClick={() => setFeaturesOpen((open) => !open)}
              aria-expanded={featuresOpen}
              aria-haspopup="true"
            >
              Features <span className="caret">▾</span>
            </button>
            <div className="dropdown-menu">
              {featureLinks.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setFeaturesOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {!isAuthed && <Link to="/login">Login</Link>}
          {!isAuthed && <Link to="/signup">Sign up</Link>}
          {isAuthed && <Link to="/signout">Sign out</Link>}
        </nav>
        <div className="top-actions">
          {!autoTheme && (
            <button className="auto-theme-btn" onClick={() => setAutoTheme(true)}>
              Auto theme on scroll
            </button>
          )}
          <button className="theme-toggle" onClick={handleThemeToggle}>
            <span className={`toggle-thumb ${theme}`} />
            <span>{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
          </button>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="page-summary card">
                <h2>Everything you need to prompt, automate, and measure.</h2>
                <p className="muted">
                  Craft channel-ready prompts, automate publishing with guardrails, and monitor impact across SEO, social,
                  email/SMS, and app stores—all in one workspace.
                </p>
              </div>
              <Hero />
              <PromptEngine />
              {isAuthed && (
                <>
                  <ModulesPage />
                  <AutomationCompliancePage />
                  <AnalyticsPage />
                </>
              )}
              <ExperimentQueue />
            </>
          }
        />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/automation" element={<AutomationCompliancePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/access" element={<AccessPage authMode={authMode} setAuthMode={setAuthMode} setAuthed={setIsAuthed} />} />
        <Route path="/login" element={<StandaloneAuth mode="login" setAuthed={setIsAuthed} />} />
        <Route path="/signup" element={<StandaloneAuth mode="signup" setAuthed={setIsAuthed} />} />
        <Route path="/signout" element={<SignoutPage setAuthed={setIsAuthed} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App

function Hero() {
  return (
    <section id="hero" className="hero-grid anchor-target">
      <div className="hero">
        <div className="pill gradient">Growth-oriented prompting OS</div>
        <h1>Convert intent into SEO, social, email, and answer-engine impact.</h1>
        <p className="lede">
          Generate structured prompts, automate delivery, and stay compliant by default. Designed for founders, growth
          teams, and agencies that need repeatable, cross-channel outputs.
        </p>
        <div className="cta-row">
          <button className="btn primary">Generate a brief</button>
          <button className="btn ghost">See compliance gates</button>
        </div>
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-label">Cost per qualified visit</div>
            <div className="kpi-value">↓ 18%</div>
            <div className="muted">with multi-channel prompts</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Conversion rate</div>
            <div className="kpi-value">+0.8 pts</div>
            <div className="muted">post-automation launch</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Answer-engine inclusion</div>
            <div className="kpi-value">38%</div>
            <div className="muted">with citation builder</div>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-frame">
          <div className="orbit glow" />
          <div className="orbit spectrum" />
          <img src={logo} alt="ICYCON emblem" className="hero-image" />
          <div className="orbit ring" />
        </div>
        <p className="muted">Craft prompts, ship everywhere, stay compliant.</p>
      </div>
    </section>
  )
}

function PromptEngine() {
  return (
    <section className="hero-grid anchor-target">
      <div className="card prompt-card">
        <div className="card-head">
          <div>
            <p className="eyebrow">Prompt Engine</p>
            <h2>Generate cross-channel outputs</h2>
          </div>
          <div className="pill subtle">Reusable business profile</div>
        </div>
        <div className="field">
          <label>Business profile</label>
          <div className="input-row">
            <input defaultValue="ICYCON • SaaS for prompt-led growth teams" />
            <button className="btn ghost">Save</button>
          </div>
        </div>
        <div className="field">
          <label>Goal</label>
          <input defaultValue="Increase discoverability in snippets + AI answers and drive qualified demos." />
        </div>
        <div className="field">
          <label>Channels</label>
          <div className="chip-row">
            {channels.map((channel) => (
              <span key={channel} className="chip active">
                {channel}
              </span>
            ))}
          </div>
        </div>
        <div className="field">
          <label>Templates</label>
          <div className="template-grid">
            {templates.map((template) => (
              <div key={template} className="template">
                <div className="template-title">{template}</div>
                <div className="muted">Structured prompt + in-app publishing</div>
              </div>
            ))}
          </div>
        </div>
        <div className="actions">
          <button className="btn primary wide">Generate prompts</button>
          <button className="btn secondary">Export & schedule</button>
        </div>
      </div>

      <div className="card">
        <div className="section-head">
          <div>
            <p className="eyebrow">Experiment queue</p>
            <h3>Prioritize prompts and automations with clear ownership.</h3>
          </div>
          <button className="btn secondary">Add experiment</button>
        </div>
        <ExperimentList />
      </div>
    </section>
  )
}

function ModulesPage() {
  return (
    <section id="modules" className="modules anchor-target">
      <div className="section-head">
        <div>
          <p className="eyebrow">Multi-channel modules</p>
          <h3>SEO, GEO/AEO, social, email/SMS, and ASO packaged for ops teams.</h3>
        </div>
        <div className="pill subtle">API-friendly • Plugin-like architecture</div>
      </div>
      <div className="module-grid">
        {modules.map((module) => (
          <div key={module.title} className="card module-card">
            <div className="module-top">
              <h4>{module.title}</h4>
              <p className="muted">{module.description}</p>
            </div>
            <div className="chip-row muted">
              {module.chips.map((chip) => (
                <span key={chip} className="chip soft">
                  {chip}
                </span>
              ))}
            </div>
            <div className="module-footer">
              <span className="pill gradient thin">Automated</span>
              <button className="text-link">Open workspace →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function AutomationCompliancePage() {
  return (
    <section id="automation" className="dual-grid anchor-target">
      <div className="card automation">
        <div className="card-head">
          <div>
            <p className="eyebrow">Automation</p>
            <h3>Ship content while keeping every update in sync.</h3>
          </div>
          <span className="pill subtle">High reliability</span>
        </div>
        <ul className="list">
          {automationItems.map((item) => (
            <li key={item}>
              <span className="dot" />
              {item}
            </li>
          ))}
        </ul>
        <div className="automation-footer">
          <div className="muted">Scheduling • Sitemaps • GBP • Directories</div>
          <button className="btn secondary">View runbook</button>
        </div>
      </div>

      <div className="card compliance">
        <div className="card-head">
          <div>
            <p className="eyebrow">Compliance</p>
            <h3>Guardrails built in.</h3>
          </div>
          <span className="pill subtle">GDPR / CASL / CAN-SPAM</span>
        </div>
        <div className="compliance-grid">
          <div className="pill contrast">Blocks non-compliant outreach</div>
          <div className="pill contrast">Warns on review policies</div>
          <div className="pill contrast">Platform violation checks</div>
          <div className="pill contrast">Deliverability QA</div>
        </div>
        <div className="muted">Policy-aware prompts keep every channel safe by default.</div>
      </div>
    </section>
  )
}

function AnalyticsPage() {
  return (
    <section id="analytics" className="analytics anchor-target">
      <div className="section-head">
        <div>
          <p className="eyebrow">Analytics</p>
          <h3>See how prompt automation moves the KPIs.</h3>
        </div>
        <div className="pill subtle">Answer-engine inclusion • Social engagement • Deliverability</div>
      </div>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className={`card metric ${metric.emphasis ? 'emphasis' : ''}`}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className="muted">{metric.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function AccessPage({
  authMode,
  setAuthMode,
  setAuthed,
}: {
  authMode: AuthMode
  setAuthMode: (mode: AuthMode) => void
  setAuthed: (val: boolean) => void
}) {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthed(true)
    navigate('/')
  }

  return (
    <section id="access" className="auth card anchor-target">
      <div className="section-head">
        <div>
          <p className="eyebrow">Access</p>
          <h3>Login or create an account to sync prompts, automations, and compliance settings.</h3>
        </div>
        <div className="auth-toggle">
          <button className={`pill ${authMode === 'login' ? 'gradient' : 'subtle'}`} onClick={() => setAuthMode('login')}>
            Login
          </button>
          <button className={`pill ${authMode === 'signup' ? 'gradient' : 'subtle'}`} onClick={() => setAuthMode('signup')}>
            Sign up
          </button>
        </div>
      </div>
      <div className="auth-grid">
        <div className="auth-copy">
          <h4>{authMode === 'login' ? 'Welcome back.' : 'Create your workspace.'}</h4>
          <p className="muted">
            {authMode === 'login'
              ? 'Resume your saved briefs, publishing queues, and compliance guardrails.'
              : 'Launch a workspace for your team with reusable templates and channel automation.'}
          </p>
          <ul className="list">
            <li>
              <span className="dot" />
              SSO-ready (Google, Microsoft)
            </li>
            <li>
              <span className="dot" />
              Role-based access for SEO, social, lifecycle
            </li>
            <li>
              <span className="dot" />
              Saved profiles and exports stay synced
            </li>
          </ul>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" required />
          </label>
          {authMode === 'signup' && (
            <>
              <label>
                Workspace name
                <input type="text" placeholder="Acme Growth" required />
              </label>
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                <span>Enable compliance guardrails (GDPR / CASL / CAN-SPAM)</span>
              </label>
            </>
          )}
          <button className="btn primary wide" type="submit">
            {authMode === 'login' ? 'Login' : 'Create account'}
          </button>
          <button
            className="btn ghost wide"
            type="button"
            onClick={() => {
              setAuthed(true)
              navigate('/')
            }}
          >
            Continue with SSO
          </button>
        </form>
      </div>
    </section>
  )
}

function ExperimentQueue() {
  return (
    <section className="experiments card">
      <div className="section-head">
        <div>
          <p className="eyebrow">Experiment queue</p>
          <h3>Prioritize prompts and automations with clear ownership.</h3>
        </div>
        <button className="btn secondary">Add experiment</button>
      </div>
      <ExperimentList />
    </section>
  )
}

function ExperimentList() {
  return (
    <div className="experiment-list">
      {experiments.map((exp) => (
        <div key={exp.name} className="experiment-row">
          <div>
            <div className="experiment-name">{exp.name}</div>
            <div className="muted">
              {exp.impact} • {exp.owner}
            </div>
          </div>
          <span className="pill subtle">{exp.status}</span>
        </div>
      ))}
    </div>
  )
}

function StandaloneAuth({ mode, setAuthed }: { mode: AuthMode; setAuthed: (val: boolean) => void }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthed(true)
    navigate('/')
  }

  return (
    <section className="auth card anchor-target">
      <div className="section-head">
        <div>
          <p className="eyebrow">{isLogin ? 'Login' : 'Create account'}</p>
          <h3>{isLogin ? 'Access your workspace' : 'Create your workspace'}</h3>
        </div>
        <Link className="pill subtle" to={isLogin ? '/signup' : '/login'}>
          {isLogin ? 'Go to Sign up' : 'Go to Login'}
        </Link>
      </div>
      <div className="auth-grid">
        <div className="auth-copy">
          <h4>{isLogin ? 'Welcome back.' : 'Let’s get you set up.'}</h4>
          <p className="muted">
            {isLogin
              ? 'Resume your saved briefs, queues, and guardrails.'
              : 'Launch a workspace with reusable templates and automation.'}
          </p>
          <ul className="list">
            <li>
              <span className="dot" />
              SSO-ready (Google, Microsoft)
            </li>
            <li>
              <span className="dot" />
              Role-based access for SEO, social, lifecycle
            </li>
            <li>
              <span className="dot" />
              Saved profiles and exports stay synced
            </li>
          </ul>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" required />
          </label>
          {!isLogin && (
            <>
              <label>
                Workspace name
                <input type="text" placeholder="Acme Growth" required />
              </label>
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                <span>Enable compliance guardrails (GDPR / CASL / CAN-SPAM)</span>
              </label>
            </>
          )}
          <button className="btn primary wide" type="submit">
            {isLogin ? 'Login' : 'Create account'}
          </button>
          <button
            className="btn ghost wide"
            type="button"
            onClick={() => {
              setAuthed(true)
              navigate('/')
            }}
          >
            Continue with SSO
          </button>
        </form>
      </div>
    </section>
  )
}

function SignoutPage({ setAuthed }: { setAuthed: (val: boolean) => void }) {
  const navigate = useNavigate()

  useEffect(() => {
    setAuthed(false)
  }, [setAuthed])

  return (
    <section className="auth card anchor-target">
      <div className="section-head">
        <div>
          <p className="eyebrow">Signed out</p>
          <h3>You’ve been signed out of ICYCON.</h3>
        </div>
        <Link className="pill subtle" to="/login">
          Login again
        </Link>
      </div>
      <div className="auth-grid">
        <div className="auth-copy">
          <h4>Ready when you are.</h4>
          <p className="muted">Your saved prompts, automations, and guardrails will be available after you sign in.</p>
        </div>
        <div className="auth-form">
          <button className="btn primary wide" onClick={() => navigate('/')}>
            Return home
          </button>
          <button className="btn ghost wide" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="about anchor-target">
      <div className="about-hero">
        <div className="about-orb orb-a" />
        <div className="about-orb orb-b" />
        <div className="about-copy">
          <p className="eyebrow">About ICYCON</p>
          <h2>Building a prompting OS for every growth team.</h2>
          <p className="lede">
            ICYCON blends structured prompts, automation, and compliance guardrails so founders and operators can ship
            faster across SEO, social, email/SMS, and app stores.
          </p>
          <div className="about-cta">
            <button className="btn primary">See our story</button>
            <button className="btn ghost">Meet the team</button>
          </div>
        </div>
        <div className="about-visual card">
          <div className="panel-head">
            <p className="eyebrow">What we do</p>
            <h4>Ops-ready prompting</h4>
          </div>
          <ul className="list">
            <li>
              <span className="dot" />
              Reusable business profiles feed prompts and automations.
            </li>
            <li>
              <span className="dot" />
              Compliance guardrails (GDPR / CASL / CAN-SPAM) on by default.
            </li>
            <li>
              <span className="dot" />
              Scheduling, sitemaps, and submissions shipped automatically.
            </li>
          </ul>
          <div className="about-badges">
            <span className="pill gradient thin">Cross-channel</span>
            <span className="pill subtle thin">LLM-safe</span>
            <span className="pill subtle thin">API-friendly</span>
          </div>
        </div>
      </div>

      <div className="about-grid">
        <div className="card about-card">
          <p className="eyebrow">Mission</p>
          <h3>Ship intent to every channel with guardrails.</h3>
          <p className="muted">
            We turn prompts into channel-ready outputs, wired to publish and stay compliant—so teams move faster without
            trading off safety.
          </p>
        </div>
        <div className="card about-card">
          <p className="eyebrow">Team</p>
          <h3>Ops, growth, and AI operators.</h3>
          <p className="muted">
            Built by practitioners from search, lifecycle, and platform safety. We obsess over durable automations and
            clean data.
          </p>
        </div>
        <div className="card about-card">
          <p className="eyebrow">Approach</p>
          <h3>Structured prompts + automation.</h3>
          <p className="muted">
            Templates, runbooks, and policy gates keep every prompt on-brand, on-road, and ready to ship to snippets,
            feeds, inboxes, and stores.
          </p>
        </div>
      </div>
    </section>
  )
}
