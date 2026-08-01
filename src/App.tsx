import { useEffect, useState } from 'react'
import logoSrc from '@/imports/logo'
import heroBg from '@/imports/bg.jpg'

/* ─── design tokens ─── */
const C = {
  black: '#050505',
  panel: '#0D0D0D',
  panel2: '#131313',
  white: '#F5F4F1',
  grey: '#9A9A9A',
  greyDim: '#6E6E6E',
  line: 'rgba(255,255,255,.22)',
  lineFaint: 'rgba(255,255,255,.09)',
  ghost: 'rgba(255,255,255,.04)',
}

/* ─── shared primitives ─── */
function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase',
      color: C.grey, fontWeight: 400,
      display: 'flex', alignItems: 'center', gap: 18,
      justifyContent: center ? 'center' : undefined,
    }}>
      <span style={{ width: 44, height: 1, background: C.line, flexShrink: 0, display: 'block' }} />
      {children}
      {center && <span style={{ width: 44, height: 1, background: C.line, flexShrink: 0, display: 'block' }} />}
    </div>
  )
}

function Tick() {
  const base: React.CSSProperties = {
    position: 'absolute', width: 22, height: 22,
    borderColor: C.line, borderStyle: 'solid', borderWidth: 0,
  }
  return (
    <>
      <span style={{ ...base, top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...base, top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 }} />
      <span style={{ ...base, bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...base, bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </>
  )
}

/* ─── NAV ─── */
function Nav() {
  const [open, setOpen] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const links: [string, string][] = [['Home', '#top'], ['Practice Area', '#practice'], ['About Us', '#the-firm'], ['Testimonials', '#reviews'], ['Contact', '#contact']]

  // hide the floating burger once the footer scrolls into view
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), { threshold: 0 })
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])
  return (
    <header style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <nav className="site-nav" style={{
        display: 'flex', alignItems: 'center', gap: 56,
        padding: '34px 56px 0', maxWidth: 1520, margin: '0 auto',
      }}>
        {/* burger — mobile only (CSS controls visibility) */}
        <button className={`burger${atFooter ? ' burger-hidden' : ''}`} aria-label="Open menu" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>

        <a href="#top" className="nav-logo-link" style={{ flexShrink: 0 }}>
          <img className="nav-logo" src={logoSrc} alt="Farhat & Associates" style={{ height: 72, width: 'auto', display: 'block' }} />
        </a>

        <div className="nav-links" style={{
          display: 'flex', flex: 1, justifyContent: 'center',
          gap: 'clamp(28px,4vw,64px)',
          fontSize: 11.5, letterSpacing: '0.32em', textTransform: 'uppercase',
        }}>
          {links.map(([l, href]) => (
            <a key={l} href={href}
              style={{ paddingBottom: 5, borderBottom: '1px solid transparent', opacity: 0.85, transition: 'opacity .3s,border-color .3s', color: C.white }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = '1'; el.style.borderColor = C.line }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = '0.85'; el.style.borderColor = 'transparent' }}
            >{l}</a>
          ))}
        </div>

        <a className="nav-cta" href="tel:5192554382"
          style={{ border: `1px solid ${C.line}`, color: C.white, padding: '13px 28px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'background .3s,color .3s,border-color .3s' }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = C.white; el.style.color = C.black; el.style.borderColor = C.white }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = C.white; el.style.borderColor = C.line }}
        >519 · 255 · 4382</a>
      </nav>

      {/* mobile menu overlay */}
      {open && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
          <nav>
            {links.map(([l, href]) => (
              <a key={l} href={href} onClick={() => setOpen(false)}>{l}</a>
            ))}
          </nav>
          <a className="mobile-menu-phone" href="tel:5192554382">519 · 255 · 4382</a>
        </div>
      )}
    </header>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="top" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative',
      background: `linear-gradient(180deg,rgba(5,5,5,.55) 0%,rgba(5,5,5,.72) 60%,rgba(5,5,5,.95) 100%), url(${heroBg}) center/cover no-repeat`,
    }}>
      {/* architectural frame */}
      <div className="hero-frame" style={{ position: 'absolute', inset: '150px 28px 28px', pointerEvents: 'none' }}>
        <Tick />
      </div>

      <div className="hero-inner" style={{ position: 'relative', padding: '210px 0 150px', maxWidth: 920, margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <Eyebrow center>Windsor, Ontario · Law Office</Eyebrow>

        {/* typographic plaque */}
        <svg className="plaque" viewBox="0 0 860 358" role="img" aria-label="Counsel that holds — in deals and in disputes"
          style={{ width: '100%', maxWidth: 580, margin: '44px auto 0', display: 'block' }}>
          <line x1="0" y1="4" x2="860" y2="4" stroke={C.line} strokeWidth="2" />
          <text x="0" y="168" textLength="860" lengthAdjust="spacing" fontSize="176"
            fill={C.white} fontFamily="'Marcellus',serif">COUNSEL</text>
          <text x="0" y="246" textLength="860" lengthAdjust="spacing" fontSize="60"
            fill={C.white} fontFamily="'Marcellus',serif">THAT HOLDS</text>
          <line x1="0" y1="280" x2="860" y2="280" stroke={C.line} strokeWidth="1.5" />
          <text x="0" y="338" textLength="860" lengthAdjust="spacing" fontSize="32"
            fill={C.grey} fontFamily="'Marcellus',serif">IN DEALS &amp; IN DISPUTES</text>
          <line x1="0" y1="356" x2="860" y2="356" stroke={C.line} strokeWidth="1.5" />
        </svg>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 64 }}>
          <a href="#contact"
            style={{ background: C.white, color: C.black, padding: '18px 44px', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 700, transition: 'background .3s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#DDDBD6')}
            onMouseLeave={e => (e.currentTarget.style.background = C.white)}
          >Request a Consultation</a>
          <a href="#practice"
            style={{ color: C.white, fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', borderBottom: `1px solid ${C.line}`, paddingBottom: 7, transition: 'border-color .3s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.white)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.line)}
          >Areas of Practice</a>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(5,5,5,.6)', backdropFilter: 'blur(4px)' }}>
        <Strip />
      </div>
    </section>
  )
}

/* ─── STRIP ─── */
function Strip() {
  const items = [
    { text: 'Real Estate' }, { text: '·', dim: true }, { text: 'Corporate' }, { text: '·', dim: true },
    { text: 'Litigation' }, { text: '·', dim: true }, { text: '★ 4.9 — 605 Google Reviews' }, { text: '·', dim: true },
    { text: 'Windsor, Ontario' }, { text: '·', dim: true },
  ]
  // Duplicate for seamless loop
  const track = [...items, ...items]
  return (
    <div aria-hidden="true" style={{
      borderTop: `1px solid ${C.lineFaint}`, borderBottom: `1px solid ${C.lineFaint}`,
      padding: '26px 0', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        fontFamily: "'Marcellus',serif", fontSize: 15, letterSpacing: '0.5em', textTransform: 'uppercase',
        color: C.grey,
        animation: 'marquee 28s linear infinite',
        width: 'max-content',
      }}>
        {track.map((item, i) => (
          <span key={i} style={{ margin: '0 34px', color: item.dim ? C.greyDim : undefined }}>{item.text}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── PRACTICE ─── */
const practices = [
  { letter: 'R', kicker: 'Purchase · Sale', title: 'Real Estate', body: 'Residential and commercial transactions closed with precision — title, financing, and development matters handled start to finish, communicated without jargon.', cta: 'Discuss a transaction' },
  { letter: 'C', kicker: 'Formation · Governance · Contracts', title: 'Corporate', body: "Incorporations, shareholder agreements, and commercial contracts — structured deliberately, so your business holds up when it's tested.", cta: 'Structure your business' },
  { letter: 'L', kicker: 'Property · Commercial · Contract', title: 'Litigation', body: 'Disputes advanced with strategy and restraint — resolved at the table where possible, and pursued to trial when it counts.', cta: 'Resolve a dispute' },
]

function PracticeCard({ letter, kicker, title, body, cta, onSelect }: typeof practices[0] & { onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRight: `1px solid ${C.lineFaint}`,
        padding: '72px 44px 64px',
        position: 'relative', overflow: 'hidden',
        minHeight: 520, display: 'flex', flexDirection: 'column',
        background: hovered ? C.panel2 : 'transparent',
        transition: 'background .4s',
      }}>
      <span aria-hidden="true" style={{
        position: 'absolute', right: -18, top: -46,
        fontFamily: "'Marcellus',serif", fontSize: 300, lineHeight: 1,
        color: hovered ? 'rgba(255,255,255,.07)' : C.ghost,
        userSelect: 'none', pointerEvents: 'none', transition: 'color .4s',
      }}>{letter}</span>

      <span style={{ fontSize: 10, letterSpacing: '0.44em', textTransform: 'uppercase', color: C.greyDim, minHeight: 40, display: 'block', position: 'relative' }}>{kicker}</span>

      <h3 style={{ fontSize: 30, margin: '44px 0 20px', position: 'relative', fontFamily: "'Marcellus',serif", fontWeight: 400 }}>
        <span style={{ display: 'block', width: 44, height: 1, background: C.line, marginBottom: 26 }} />
        {title}
      </h3>
      <p style={{ color: C.grey, fontSize: 15.5, marginBottom: 44, position: 'relative', lineHeight: 1.75 }}>{body}</p>

      <a href="#contact" onClick={onSelect} style={{
        color: C.white, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: 14, marginTop: 'auto', position: 'relative',
      }}>
        {cta}
        <span style={{ transition: 'transform .3s', display: 'inline-block', transform: hovered ? 'translateX(6px)' : 'none' }}>→</span>
      </a>
    </div>
  )
}

function Practice({ onSelectMatter }: { onSelectMatter: (matter: string) => void }) {
  return (
    <section id="practice" style={{
      padding: '150px 0', position: 'relative',
      background: C.panel,
      borderTop: `1px solid ${C.lineFaint}`,
      borderBottom: `1px solid ${C.lineFaint}`,
    }}>
      <span className="rail" style={{
        position: 'absolute', left: 14, top: '50%', transform: 'rotate(180deg) translateY(50%)',
        writingMode: 'vertical-rl', fontSize: 10, letterSpacing: '0.5em',
        textTransform: 'uppercase', color: C.greyDim, whiteSpace: 'nowrap',
      }}>Areas of Practice — Farhat &amp; Associates</span>

      <div className="wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px', position: 'relative' }}>
        <div className="practice-head" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 40, marginBottom: 80 }}>
          <div>
            <Eyebrow>Areas of Practice</Eyebrow>
            <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: 'clamp(38px,4.6vw,60px)', margin: '26px 0 22px', lineHeight: 1.12 }}>
              Three disciplines.<br />One standard.
            </h2>
          </div>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 15, letterSpacing: '0.4em', color: C.greyDim, textTransform: 'uppercase' }}>
            Depth, not breadth
          </div>
        </div>

        <div className="practice-grid">
          {practices.map(p => <PracticeCard key={p.title} {...p} onSelect={() => onSelectMatter(p.title)} />)}
        </div>

        {/* full scope — Rashid Farhat's stated areas of practice, verbatim */}
        <div className="scope">
          <Eyebrow>Full Scope of Practice</Eyebrow>
          <ul className="scope-list">
            {[
              'Residential & Commercial Real Estate Transactions',
              'Business Law',
              'Commercial Real Estate',
              'Corporate Reorganizations',
              'Business Acquisitions and Sales',
              'Secured and Unsecured Financing Transactions',
              'Commercial Contract Negotiations',
              'Mortgages',
              'Mortgage Remedies & Enforcement',
              'Expropriation Law',
              'Ontario Municipal Board Matters',
              'Land Development — Rezoning & Site Plan Control',
              'Tenancies and Lease Agreements',
              'Municipal Law',
              'Wills and Trusts',
            ].map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ─── PULL QUOTE ─── */
function QuoteBand() {
  return (
    <section style={{
      padding: '170px 0', textAlign: 'center', position: 'relative',
      background: `radial-gradient(900px 480px at 50% 50%,rgba(255,255,255,.045),transparent 65%),${C.black}`,
    }}>
      <div className="wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        <span aria-hidden="true" style={{
          fontFamily: "'Marcellus',serif", fontSize: 130, lineHeight: 0.4,
          color: 'rgba(255,255,255,.14)', display: 'block', marginBottom: 34,
        }}>&ldquo;</span>
        <blockquote style={{
          fontFamily: "'Marcellus',serif", fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.3,
          maxWidth: 980, margin: '0 auto 42px',
        }}>
          Serious matters deserve a lawyer&apos;s attention —<br />
          <em style={{ fontStyle: 'normal', color: C.grey }}>not an intake queue.</em>
        </blockquote>
        <cite style={{ fontStyle: 'normal', fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: C.grey }}>
          The conviction the firm was built on
        </cite>
      </div>
    </section>
  )
}

/* ─── PRINCIPAL ─── */
function Principal() {
  return (
    <section id="the-firm" style={{
      padding: '150px 0', position: 'relative',
      background: C.panel,
      borderTop: `1px solid ${C.lineFaint}`,
      borderBottom: `1px solid ${C.lineFaint}`,
    }}>
      <div className="wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        <div className="principal-grid" style={{ display: 'grid', gridTemplateColumns: '460px 1fr', gap: 100, alignItems: 'center' }}>
          {/* portrait */}
          <div style={{
            aspectRatio: '4/5', position: 'relative',
            background: `radial-gradient(440px 340px at 50% 22%,rgba(255,255,255,.07),transparent 70%),linear-gradient(168deg,#161616 0%,#090909 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Tick />
            <span style={{ fontFamily: "'Marcellus',serif", fontSize: 150, color: 'rgba(255,255,255,.10)', letterSpacing: '0.04em' }}>RF</span>
            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.greyDim }}>
              Portrait — Rashid Farhat
            </div>
          </div>

          {/* copy */}
          <div className="principal-copy">
            <Eyebrow>The Firm</Eyebrow>
            <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: 'clamp(34px,4vw,52px)', margin: '24px 0 26px', lineHeight: 1.14 }}>
              Counsel you deal with directly.
            </h2>
            <p style={{ color: C.white, fontSize: 19, marginBottom: 22, maxWidth: 560, lineHeight: 1.75 }}>
              Every file at Farhat &amp; Associates is handled with the discretion, candour, and preparation that serious matters demand.
            </p>
            <p style={{ color: C.grey, fontSize: 16.5, marginBottom: 22, maxWidth: 560, lineHeight: 1.75 }}>
              [Placeholder — replace with Mr. Farhat&apos;s verified biography: call to the bar, education, notable practice history, and community involvement in Windsor–Essex.]
            </p>

            {/* signature line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 44 }}>
              <span style={{ width: 44, height: 1, background: C.line, display: 'block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Marcellus',serif", fontSize: 21, letterSpacing: '0.08em' }}>Rashid Farhat</span>
              <span style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.greyDim }}>Founder</span>
            </div>

            {/* credentials */}
            <div className="credentials" style={{ display: 'flex', marginTop: 48, borderTop: `1px solid ${C.lineFaint}` }}>
              {['Law Society of Ontario', 'Windsor–Essex', 'Serving clients since 2015'].map((item, i, arr) => (
                <div key={item} style={{
                  padding: '26px 36px 0 0', marginRight: 36,
                  fontSize: 10.5, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.grey,
                  borderRight: i < arr.length - 1 ? `1px solid ${C.lineFaint}` : 'none',
                }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── REVIEWS ─── */
function Reviews() {
  return (
    <section id="reviews" style={{ padding: '150px 0', position: 'relative' }}>
      <span className="rail" style={{
        position: 'absolute', right: 14, top: '50%',
        writingMode: 'vertical-rl', fontSize: 10, letterSpacing: '0.5em',
        textTransform: 'uppercase', color: C.greyDim, whiteSpace: 'nowrap',
      }}>Client Perspectives — On the Record</span>

      <div className="wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        {/* section head */}
        <div style={{ marginBottom: 80 }}>
          <Eyebrow>Client Perspectives</Eyebrow>
          <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: 'clamp(38px,4.6vw,60px)', margin: '26px 0 22px', lineHeight: 1.12 }}>
            4.9 stars. 605 reviews.<br />On the record.
          </h2>
          <p style={{ color: C.grey, fontSize: 17, maxWidth: 560, lineHeight: 1.75 }}>
            Drawn from the firm&apos;s public Google Business profile — where clients most often mention clear explanations, quick responses, and seamless closings.
          </p>
        </div>

        {/* review marquee — one continuous row sliding right to left */}
        <div className="review-marquee" aria-label="Client reviews">
          <div className="review-track">
            {(() => {
              const reviews = [
                { body: "They've guided us so many times through real estate transactions as well as other matters, from maintaining our corporate minute books to litigation matters. Fantastic team!", cite: 'Marla C.' },
                { body: "I've used this real estate law firm for my last two home purchases and couldn't be happier. They take the time to explain everything in detail, which made the entire process smooth and stress-free.", cite: 'Ronald J.' },
                { body: 'Excellent experiences for several business-related legal matters. At all times, the team was extremely professional, efficient, and easy to work with.', cite: 'Kirk R.' },
                { body: 'Rashid has been the lawyer my clients and I have trusted for over 10 years. He is extremely professional, thorough, and patient.', cite: 'Maggie L.' },
                { body: 'Professional, knowledgeable, thorough, prompt communication, attention to detail, honest, and outstanding service from start to finish!', cite: 'Nancy P.' },
                { body: 'Rashid and his staff were great! The entire process of closing our house was quick and efficient.', cite: 'Chris M.' },
                { body: 'Made the whole process incredibly easy, simple, and stress-free. Excellent communication and amazing service from start to finish.', cite: 'Sreang M.' },
                { body: 'Rashid has guided us through complex real estate transactions and has been a trusted ally throughout the entire process.', cite: 'Glenn P.' },
              ]
              return [...reviews, ...reviews].map((r, i) => (
                <div className="review-card" key={`${r.cite}-${i}`} aria-hidden={i >= reviews.length}>
                  <div style={{ color: C.grey, letterSpacing: '0.34em', fontSize: 12, marginBottom: 18 }}>★★★★★</div>
                  <blockquote style={{ fontFamily: "'Marcellus',serif", fontSize: 19, lineHeight: 1.5, marginBottom: 20 }}>
                    &ldquo;{r.body}&rdquo;
                  </blockquote>
                  <cite style={{ fontStyle: 'normal', color: C.greyDim, fontSize: 10.5, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{r.cite} — Google Review</cite>
                </div>
              ))
            })()}
          </div>
        </div>

        <div style={{ marginTop: 64, color: C.greyDim, fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
          ★ 4.9 · 605 Google Reviews · Reproduced from the firm&apos;s public Google Business profile
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
function Contact({ form, setForm }: {
  form: { name: string; email: string; matter: string; description: string }
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; matter: string; description: string }>>
}) {
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${C.line}`,
    color: C.white, fontFamily: "'Lato',sans-serif", fontSize: 16, fontWeight: 300,
    padding: '9px 0', outline: 'none',
  }

  const contactItems: { label: string; value: string; href?: string }[] = [
    { label: 'Office', value: '1 Hanna St W., Windsor, ON N8X 1C7', href: 'https://www.google.com/maps?cid=12618145535706963737' },
    { label: 'Phone', value: '519 · 255 · 4382', href: 'tel:5192554382' },
    { label: 'Fax', value: '519 · 915 · 7349', href: 'tel:5199157349' },
    { label: 'Email', value: 'info@farhatlaw.ca', href: 'mailto:info@farhatlaw.ca' },
    { label: 'Hours', value: 'Monday – Friday · 9 a.m. – 5 p.m.' },
  ]

  return (
    <section id="contact" style={{ padding: '150px 0', background: C.panel, borderTop: `1px solid ${C.lineFaint}` }}>
      <div className="wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: 110, alignItems: 'start' }}>
          {/* left info */}
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: 'clamp(40px,5vw,68px)', margin: '26px 0 24px', lineHeight: 1.08 }}>
              Begin with a conversation.
            </h2>
            <p style={{ color: C.grey, maxWidth: 440, fontSize: 17, lineHeight: 1.75 }}>
              Reach the firm directly, or send the details of your matter — responses are prompt, and always in confidence.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 56 }}>
              {contactItems.map(item => (
                <li key={item.label} className="contact-li" style={{
                  display: 'grid', gridTemplateColumns: '130px 1fr', gap: 24,
                  borderBottom: `1px solid ${C.lineFaint}`, padding: '24px 0',
                  fontSize: 16, alignItems: 'baseline',
                }}>
                  <span style={{ color: C.greyDim, fontSize: 10.5, letterSpacing: '0.34em', textTransform: 'uppercase' }}>{item.label}</span>
                  <span style={{ color: C.white }}>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ color: C.white }}>{item.value}</a>
                      : item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* form panel */}
          <div className="form-panel" style={{ background: C.black, padding: '56px 52px', position: 'relative' }}>
            <Tick />
            {sent ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 32, marginBottom: 16 }}>Thank you.</div>
                <p style={{ color: C.grey, lineHeight: 1.75 }}>Your request has been received. We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Marcellus',serif", fontWeight: 400, fontSize: 26, marginBottom: 10 }}>Request a Consultation</h3>
                <div style={{ color: C.grey, fontSize: 14, marginBottom: 38 }}>Confidential. No obligation. Responses within one business day.</div>

                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.greyDim, marginBottom: 10 }}>Full Name</label>
                  <input style={inputStyle} type="text" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.greyDim, marginBottom: 10 }}>Email</label>
                  <input style={inputStyle} type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.greyDim, marginBottom: 10 }}>Matter Type</label>
                  <select style={{ ...inputStyle, appearance: 'none' }} value={form.matter} onChange={e => setForm(p => ({ ...p, matter: e.target.value }))}>
                    {['Real Estate', 'Corporate', 'Litigation', 'Other'].map(o => <option key={o} style={{ background: C.panel }}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.greyDim, marginBottom: 10 }}>Brief Description</label>
                  <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical' }} placeholder="A few sentences about your matter" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                </div>

                <button
                  type="button"
                  onClick={() => setSent(true)}
                  style={{
                    display: 'inline-block', marginTop: 12,
                    background: C.white, color: C.black,
                    border: 'none', cursor: 'pointer',
                    fontFamily: "'Lato',sans-serif",
                    width: '100%', textAlign: 'center',
                    padding: '18px 44px', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 700,
                    transition: 'background .3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#DDDBD6')}
                  onMouseLeave={e => (e.currentTarget.style.background = C.white)}
                >Send Request</button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ padding: '110px 0 50px', color: C.grey, position: 'relative', overflow: 'hidden', borderTop: `1px solid ${C.lineFaint}` }}>
      <div aria-hidden="true" style={{
        position: 'absolute', left: '50%', bottom: '-4%', transform: 'translateX(-50%)',
        fontFamily: "'Marcellus',serif", fontSize: 'min(13vw,170px)', lineHeight: 1, letterSpacing: '0.06em',
        color: 'rgba(255,255,255,.03)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
      }}>FARHAT &amp; ASSOCIATES</div>

      <div className="wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px', position: 'relative' }}>
        <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap', marginBottom: 80 }}>
          <img className="footer-logo" src={logoSrc} alt="Farhat & Associates" style={{ height: 64, width: 'auto', display: 'block' }} />

          {[
            { head: 'Practice', links: [['Real Estate', '#practice'], ['Corporate', '#practice'], ['Litigation', '#practice']] },
            { head: 'Firm', links: [['Rashid Farhat', '#the-firm'], ['Client Reviews', '#reviews'], ['Consultations', '#contact']] },
            { head: 'Office', links: [['1 Hanna St W.', 'https://www.google.com/maps?cid=12618145535706963737'], ['Windsor, ON N8X 1C7', 'https://www.google.com/maps?cid=12618145535706963737'], ['519 · 255 · 4382', 'tel:5192554382'], ['info@farhatlaw.ca', 'mailto:info@farhatlaw.ca']] },
            { head: 'Connect', links: [['farhatlaw.ca', 'https://www.farhatlaw.ca'], ['Facebook', 'https://facebook.com/windsorlawyer'], ['rfarhat@farhatlaw.ca', 'mailto:rfarhat@farhatlaw.ca']] },
          ].map(col => (
            <div key={col.head}>
              <div style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.greyDim, marginBottom: 20 }}>{col.head}</div>
              {col.links.map(([text, href]) => (
                href
                  ? <a key={text} href={href} style={{ display: 'block', fontSize: 14.5, marginBottom: 10, color: C.grey, transition: 'color .3s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.grey)}
                  >{text}</a>
                  : <span key={text} style={{ display: 'block', fontSize: 14.5, marginBottom: 10, color: C.grey }}>{text}</span>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', position: 'relative', borderTop: `1px solid ${C.lineFaint}`, paddingTop: 32, fontSize: 12, color: C.greyDim }}>
          <span>© 2026 Farhat &amp; Associates Law Firm</span>
          <span className="footer-tagline">Real Estate · Corporate · Litigation — Windsor, Ontario</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── APP ─── */
export default function App() {
  const [form, setForm] = useState({ name: '', email: '', matter: 'Real Estate', description: '' })

  const handleSelectMatter = (matter: string) => {
    setForm(p => ({ ...p, matter }))
  }

  return (
    <div className="app-root" style={{ background: C.black, color: C.white }}>
      <Nav />
      <Hero />
      <Principal />
      <QuoteBand />
      <Practice onSelectMatter={handleSelectMatter} />
      <Reviews />
      <Contact form={form} setForm={setForm} />
      <Footer />
    </div>
  )
}
