import { capabilities } from '../data/capabilities'
import { IntentNavLink } from './IntentLink'

export function SiteHeader() {
  return (
    <header className="site-header">
      <IntentNavLink className="brand-lockup" to="/" aria-label="返回能力图谱主页">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>
          <b>CONTROL / EVIDENCE</b>
          <small>工业自动化能力图谱</small>
        </span>
      </IntentNavLink>

      <nav className="primary-nav" aria-label="能力详情">
        {capabilities.map((capability) => (
          <IntentNavLink
            key={capability.id}
            to={capability.route}
            className={({ isActive }) =>
              `nav-domain${isActive ? ' is-active' : ''}`
            }
            style={{ '--nav-accent': capability.accent } as React.CSSProperties}
          >
            <span>{capability.order}</span>
            <b>{capability.shortName}</b>
          </IntentNavLink>
        ))}
      </nav>

      <div className="local-status" aria-label="运行状态：本地静态站">
        <span aria-hidden="true" />
        LOCAL / STATIC
      </div>
    </header>
  )
}

