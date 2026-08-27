import { ScrollTargetButton } from './ScrollTargetButton'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>STATIC AUTOMATION SHOWCASE / LOCAL ONLY</p>
      <p>内容按项目证据、源码或案例复盘、后续方向区分</p>
      <ScrollTargetButton targetId="main-content">回到本页顶部</ScrollTargetButton>
    </footer>
  )
}
