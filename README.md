# 工业自动化能力展示站

这是一个独立的 Vite / React / TypeScript 工业自动化能力展示站。全部内容和素材随站点发布，运行时不请求数据库、接口、CDN 或远程字体。

## 在线访问

GitHub Pages：<https://2286015860.github.io/industrial-automation-showcase/>

## 本地启动

首次联网安装依赖后：

```powershell
npm install
.\Start-Showcase.ps1
```

浏览器访问 `http://127.0.0.1:4173/#/`。

服务运行期间保留 PowerShell 窗口；关闭该窗口即可停止站点。

## GitHub Pages 发布

推送到远端 `main` 分支后，`.github/workflows/deploy-pages.yml` 会依次执行类型检查、Lint、测试和生产构建，通过后发布 `dist`。站点使用 `HashRouter` 和相对资源基路径，可在 GitHub Pages 的项目子路径下直接访问五个路由。

## 验证

```powershell
npm run typecheck
npm run lint
npm run test
npm run build
```

视觉偏好、文案真实性和截图隐私仍需人工验收。

浏览器验收减少动画分支时，可访问 `http://127.0.0.1:4173/?motion=reduced#/`。默认入口仍读取操作系统的 `prefers-reduced-motion` 设置。
