# ReviewFlow — Collaborative Code Review Tool

A modern, interactive code review interface built with **React + Vite**. Supports inline commenting, emoji reactions, diff viewing, and review submission — all in the browser.

🔗 **[Live Demo](https://your-demo-link.vercel.app)** &nbsp;|&nbsp; ⭐ Star this repo if you find it useful

![ReviewFlow Screenshot](https://placehold.co/1200x600/1e293b/818cf8?text=ReviewFlow+–+Code+Review+Tool)

---

## ✨ Features

- **Syntax-highlighted diff viewer** — line-by-line added/removed/context view across multiple files
- **Inline commenting** — hover any line and click `+ Comment` to start a thread
- **Threaded discussions** — reply to comments, resolve threads, react with emoji
- **Review submission** — Approve, Request Changes, or Comment with a summary
- **CI checks panel** — visual pass/fail status for each pipeline check
- **Reviewer status tracking** — see who approved, who requested changes
- **Collapsible file panels** — expand/collapse individual files in the diff
- **Toast notifications** — instant feedback on every action
- **Optimistic UI** — all interactions feel instant with no loading spinners

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | CSS-in-JS (inline styles, zero dependencies) |
| State | React `useState` / `useEffect` |
| Deployment | Vercel |

No external UI libraries. No CSS frameworks. Built from scratch to demonstrate component architecture and state management skills.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/code-review-tool.git
cd code-review-tool

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── App.jsx              # Root component, global state
├── components/
│   ├── DiffViewer.jsx   # Line-by-line diff renderer
│   ├── CommentThread.jsx # Threaded comment UI
│   ├── FileCard.jsx     # Collapsible file panel
│   ├── Sidebar.jsx      # PR meta, reviewers, CI checks, review form
│   ├── Avatar.jsx       # User avatar with initials
│   ├── StatusBadge.jsx  # Approved / Changes requested / Commented
│   └── Toast.jsx        # Notification popup
├── data/
│   └── mockData.js      # Sample PR, files, and comments
└── main.jsx
```

---

## 🧠 Key Implementation Details

### Inline Comment System
Comments are keyed by `fileId-lineNumber` (e.g. `"1-14"`). This lets the diff renderer look up threads for any line in O(1) and render them inline between table rows.

```js
// Comment lookup pattern
const threadComments = comments[`${file.id}-${line.n}`];
```

### Diff Rendering
Each file's diff is rendered as an HTML `<table>` with three columns: line number, change type (`+` / `−`), and code content. Row background color is derived from `line.type`:

```js
const lineColor = {
  added:   "#f0fdf4",
  removed: "#fff1f2",
  context: "#ffffff",
};
```

### Optimistic Updates
All user actions (post comment, react, resolve) update React state immediately and show a toast — no loading states needed since there's no async network call.

---

## 🗺️ Planned Features

- [ ] Real GitHub OAuth login (GitHub API integration)
- [ ] WebSocket-based real-time comment sync (Socket.io)
- [ ] PostgreSQL backend for persistent comments and reviews
- [ ] Syntax highlighting via Prism.js or Shiki
- [ ] File tree navigation sidebar
- [ ] PR list / dashboard view
- [ ] Dark mode

---

## 📸 Screenshots

| Diff View with Inline Comments | Review Submission |
|---|---|
| ![Diff](https://placehold.co/580x360/f8fafc/1e293b?text=Diff+View) | ![Review](https://placehold.co/580x360/f8fafc/1e293b?text=Review+Panel) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a PR

---

## 📄 License

MIT © [Your Name](https://github.com/your-username)
