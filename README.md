# 静界 · Realm of Stillness

> 🌙 年轻修行人的精神角落 — 交流感受，分享智慧，不涉宗教，只谈心境。

静界是一个面向年轻修行人的轻量级网站，采用 **玻璃拟态（Glassmorphism）** 设计风格。通过视频和文字分享，为追求内心宁静的年轻人提供一个纯粹的精神交流空间。

---

## ✨ 特点

- **去宗教化**：关注内心觉知，而非宗教形式
- **玻璃高贵感 UI**：基于 Glassmorphism 设计的现代界面
- **视频分享**：佛学智慧与生活感悟的视频内容
- **心语交流**：修行路上的感受与体悟分享空间
- **响应式设计**：完美适配桌面端和移动端

## 🏗️ 项目结构

```
jingjie/
├── index.html          # 首页
├── videos.html         # 影音页面
├── experience.html     # 心语分享
├── about.html          # 关于页面
├── 404.html            # 自定义 404 页面
├── robots.txt          # 搜索引擎爬虫规则
├── sitemap.xml         # 站点地图
├── css/
│   └── style.css       # 完整设计系统
├── js/
│   └── main.js         # 交互逻辑
└── README.md           # 项目说明
```

## 🎨 设计系统

| 设计元素 | 说明 |
|---------|------|
| **配色** | 深空底色 + 金色点缀 |
| **玻璃效果** | backdrop-filter: blur(24px)，半透明背景 |
| **字体** | Noto Serif SC（标题）+ Noto Sans SC（正文）|
| **动效** | 渐变光晕浮动 + 滚动渐入动画 |
| **布局** | CSS Grid + Flexbox 响应式设计 |

## 🚀 本地预览

直接用浏览器打开 `index.html` 即可预览：

```bash
# 使用 Python 启动本地服务器（推荐）
python3 -m http.server 8000 --directory .

# 或使用 Node.js
npx serve .
```

访问 `http://localhost:8000` 即可查看。

## 📦 内容管理

### 添加视频

编辑 `js/main.js`，找到 `videoData` 数组（已预留注释模板），按格式添加视频条目：

```javascript
{
  id: 1,
  title: '静坐入门 · 安住当下',
  description: '从呼吸开始，学习如何安住于当下的每一刻。',
  category: 'meditation',   // meditation | wisdom | life
  date: '2026-05',
  thumbnail: 'images/thumb-1.jpg',
  url: 'https://your-video-url'
}
```

然后取消 `renderVideos()` 和 filter 按钮相关代码的注释，并隐藏或删除 `empty-state` 容器。

### 添加心语

在 `experience.html` 的 `.experience-grid` 中添加新的卡片块即可。

## 🌐 部署到 GitHub Pages

1. 将本仓库推送到 GitHub
2. 进入仓库 Settings → Pages
3. 选择 `main` 分支，根目录 `/`
4. 等待几分钟，即可通过 `https://你的用户名.github.io/jingjie/` 访问

## 🤝 贡献

欢迎提交 Issue 和 PR！让我们一起把这片静界建设得更美好。

## 📄 开源协议

MIT License — 自由使用，自由修改。
