# 工业自动化能力展示站

这是旧静态站旁边的独立 Vite / React / TypeScript 子项目。全部内容和素材在本地，运行时不请求数据库、接口、CDN 或远程字体。

## 本地启动

首次联网安装依赖后：

```powershell
npm install
.\Start-Showcase.ps1
```

浏览器访问 `http://127.0.0.1:4173/#/`。

桌面上的“工业自动化能力展示站”快捷方式会自动启动服务并打开浏览器。服务运行期间保留 PowerShell 窗口；关闭该窗口即可停止站点。

## 验证

```powershell
npm run typecheck
npm run lint
npm run test
npm run build
```

视觉偏好、文案真实性和截图隐私仍需人工验收。

浏览器验收减少动画分支时，可访问 `http://127.0.0.1:4173/?motion=reduced#/`。默认入口仍读取操作系统的 `prefers-reduced-motion` 设置。
