# 诡秘生存挑战

**你能在诡秘世界活到第几天？**

An unofficial *Lord of the Mysteries* survival quiz, built with vanilla JavaScript.

从廷根市的一条阴暗小巷醒来，走过二十次命运的岔路。每题四个选择，只有一条生路；答错后可以查看死亡回放，再向愚者祈祷一次奇迹。

- **20 道剧情选择题**：从普通人到高序列存在，时间轴记录你的旅程。
- **死亡回放与成就**：看看自己为什么没能活下来，以及解锁了什么离谱称号。
- **当前题复活**：不必从第一题重新开始，复活时会重新排列选项。
- **纯静态、可离线游玩**：无账号、无后端、无运行时 CDN；支持手机布局和键盘操作。

## 开始游玩

下载仓库 ZIP 并解压，双击根目录的 **`index.html`** 即可开始。请保留旁边的 `assets/` 文件夹。

也可以在仓库目录启动本地网页服务：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000`。玩家不需要安装 Node.js 或执行构建。

每题点击一个选项；键盘可使用 Tab 选择、Enter 或空格确认。死亡后，“向愚者祈祷奇迹”重试当前题，“结束”返回首页。通关后可以重新体验。

当前不保存进度，刷新页面会重新开始。题目含世界观剧透，部分情境和判定为小游戏的娱乐性改编。

## 在 GitHub 上提供游玩链接

GitHub 的代码文件页面不会直接运行 HTML；**GitHub Pages** 可以把本仓库发布成网页，再把链接放进 README。

本仓库已准备好根目录 `index.html`、预先生成的样式和 `.nojekyll`。首次发布由仓库管理员操作：

1. 打开 **Settings → Pages**。
2. 在 **Build and deployment** 中选择 **Deploy from a branch**。
3. 选择 **main** 分支、**/ (root)** 目录，点击 **Save**。
4. 等待部署完成，使用 Pages 设置页显示的站点地址。

若仓库命名为 `lord-of-mysteries-survival`，默认地址为 `https://yufanyang214-lab.github.io/lord-of-mysteries-survival/`。**首次启用前，这个地址还不能游玩。** 仓库改名后，项目站点地址也会改变，需要更新分享链接。

GitHub Free 的 Pages 面向公开仓库；私有仓库是否可用取决于账号方案。详见 [GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

## 项目结构

| 文件 | 用途 |
| --- | --- |
| `index.html` | 游戏入口，直接打开即可运行 |
| `assets/questions.js` | 剧情、选项、成就与阶段配置 |
| `assets/game.js` | 首页、答题、死亡、通关视图及状态切换 |
| `assets/styles.css` | 已生成并提交的样式，供玩家直接使用 |
| `styles/input.css` / `tailwind.config.cjs` | 样式源文件和主题配置 |
| `tests/game.test.cjs` | 连点、复活和完整通关等回归检查 |
| `docs/design.md` | 最初的产品设计记录 |

## 修改与验证

只修改剧情时，编辑 `assets/questions.js` 后刷新网页即可。保持每题四个选项、一个正确答案，并为错误选项写明 `reason`。增加题目时还需更新阶段范围与首页题数文案。

修改样式或 HTML / JavaScript 中的 Tailwind 类名后，重新生成样式并一起提交：

```bash
npm ci
npm run build
npm test
```

Node.js 22 用于 CI。构建依赖锁定在 `package-lock.json` 中；游戏运行本身只需要浏览器。CI 会检查游戏流程，以及提交的 CSS 是否与源文件一致。

## 关于作品

这是个人制作的非官方同人练习项目，世界观与角色来自爱潜水的乌贼的《诡秘之主》，与原作者及官方无关联。保留最初的黑金配色、文字冒险和结局设计，用来探索轻量的浏览器互动体验。

原仓库名为 `LoM`，现按 `lord-of-mysteries-survival` 整理项目名称与目录。
