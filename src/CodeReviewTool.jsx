import { useState, useEffect } from "react";

const SAMPLE_FILES = [
  {
    id: 1,
    name: "auth.service.ts",
    language: "typescript",
    status: "changes-requested",
    additions: 42,
    deletions: 11,
    lines: [
      { n: 1,  type: "context",  text: "import { Injectable } from '@nestjs/common';" },
      { n: 2,  type: "context",  text: "import { JwtService } from '@nestjs/jwt';" },
      { n: 3,  type: "context",  text: "import { UsersService } from '../users/users.service';" },
      { n: 4,  type: "context",  text: "" },
      { n: 5,  type: "context",  text: "@Injectable()" },
      { n: 6,  type: "context",  text: "export class AuthService {" },
      { n: 7,  type: "context",  text: "  constructor(" },
      { n: 8,  type: "context",  text: "    private usersService: UsersService," },
      { n: 9,  type: "context",  text: "    private jwtService: JwtService," },
      { n: 10, type: "context",  text: "  ) {}" },
      { n: 11, type: "context",  text: "" },
      { n: 12, type: "removed",  text: "  async validateUser(username: string, pass: string): Promise<any> {" },
      { n: 13, type: "removed",  text: "    const user = await this.usersService.findOne(username);" },
      { n: 14, type: "removed",  text: "    if (user && user.password === pass) {" },
      { n: 15, type: "added",    text: "  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'> | null> {" },
      { n: 16, type: "added",    text: "    const user = await this.usersService.findOne(username);" },
      { n: 17, type: "added",    text: "    if (user && await bcrypt.compare(pass, user.password)) {" },
      { n: 18, type: "context",  text: "      const { password, ...result } = user;" },
      { n: 19, type: "context",  text: "      return result;" },
      { n: 20, type: "context",  text: "    }" },
      { n: 21, type: "context",  text: "    return null;" },
      { n: 22, type: "context",  text: "  }" },
      { n: 23, type: "context",  text: "" },
      { n: 24, type: "removed",  text: "  async login(user: any) {" },
      { n: 25, type: "added",    text: "  async login(user: Omit<User, 'password'>) {" },
      { n: 26, type: "context",  text: "    const payload = { username: user.username, sub: user.userId };" },
      { n: 27, type: "context",  text: "    return {" },
      { n: 28, type: "removed",  text: "      access_token: this.jwtService.sign(payload)," },
      { n: 29, type: "added",    text: "      access_token: this.jwtService.sign(payload, { expiresIn: '15m' })," },
      { n: 30, type: "added",    text: "      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })," },
      { n: 31, type: "context",  text: "    };" },
      { n: 32, type: "context",  text: "  }" },
      { n: 33, type: "context",  text: "}" },
    ],
  },
  {
    id: 2,
    name: "user.controller.ts",
    language: "typescript",
    status: "approved",
    additions: 18,
    deletions: 3,
    lines: [
      { n: 1,  type: "context", text: "import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';" },
      { n: 2,  type: "context", text: "import { UsersService } from './users.service';" },
      { n: 3,  type: "context", text: "import { JwtAuthGuard } from '../auth/jwt-auth.guard';" },
      { n: 4,  type: "context", text: "" },
      { n: 5,  type: "context", text: "@Controller('users')" },
      { n: 6,  type: "context", text: "export class UsersController {" },
      { n: 7,  type: "context", text: "  constructor(private readonly usersService: UsersService) {}" },
      { n: 8,  type: "context", text: "" },
      { n: 9,  type: "removed", text: "  @Get()" },
      { n: 10, type: "added",   text: "  @Get()" },
      { n: 11, type: "added",   text: "  @UseGuards(JwtAuthGuard)" },
      { n: 12, type: "context", text: "  findAll() {" },
      { n: 13, type: "context", text: "    return this.usersService.findAll();" },
      { n: 14, type: "context", text: "  }" },
      { n: 15, type: "context", text: "}" },
    ],
  },
  {
    id: 3,
    name: "database.config.ts",
    language: "typescript",
    status: "commented",
    additions: 7,
    deletions: 2,
    lines: [
      { n: 1,  type: "context", text: "import { TypeOrmModuleOptions } from '@nestjs/typeorm';" },
      { n: 2,  type: "context", text: "" },
      { n: 3,  type: "removed", text: "export const databaseConfig: TypeOrmModuleOptions = {" },
      { n: 4,  type: "added",   text: "export const databaseConfig = (): TypeOrmModuleOptions => ({" },
      { n: 5,  type: "context", text: "  type: 'postgres'," },
      { n: 6,  type: "removed", text: "  host: 'localhost'," },
      { n: 7,  type: "added",   text: "  host: process.env.DB_HOST ?? 'localhost'," },
      { n: 8,  type: "added",   text: "  port: parseInt(process.env.DB_PORT ?? '5432', 10)," },
      { n: 9,  type: "context", text: "  username: process.env.DB_USER," },
      { n: 10, type: "context", text: "  password: process.env.DB_PASS," },
      { n: 11, type: "context", text: "  database: process.env.DB_NAME," },
      { n: 12, type: "context", text: "  synchronize: false," },
      { n: 13, type: "added",   text: "  logging: true," },
      { n: 14, type: "added",   text: "});" },
    ],
  },
];

const INITIAL_COMMENTS = {
  "1-14": [
    {
      id: "c1", author: "sarah.chen", avatar: "SC", time: "2h ago",
      text: "Using `any` here loses all type safety. Can we define a proper `User` interface?",
      resolved: false, reactions: { "👍": 3, "🔥": 1 },
    },
  ],
  "1-28": [
    {
      id: "c2", author: "marcus.dev", avatar: "MD", time: "1h ago",
      text: "JWT expiry of 15 minutes is good! But we should implement token rotation on refresh too.",
      resolved: false, reactions: { "👍": 2 },
    },
  ],
  "3-6": [
    {
      id: "c3", author: "priya.k", avatar: "PK", time: "45m ago",
      text: "Hardcoded 'localhost' is a footgun in production. Great catch adding env fallback.",
      resolved: true, reactions: { "❤️": 2, "👍": 1 },
    },
  ],
};

const PR_INFO = {
  title: "feat: replace plaintext password storage with bcrypt + JWT refresh tokens",
  author: "alex.rivers",
  avatar: "AR",
  branch: "feature/secure-auth",
  base: "main",
  number: 247,
  description: "Fixes critical security vulnerability where passwords were stored and compared in plaintext. Adds bcrypt hashing, proper TypeScript types, and refresh token support.",
  reviewers: [
    { name: "sarah.chen", avatar: "SC", status: "changes-requested" },
    { name: "marcus.dev", avatar: "MD", status: "commented" },
    { name: "priya.k",    avatar: "PK", status: "approved" },
  ],
  checks: [
    { name: "CI / unit tests", status: "pass" },
    { name: "CI / e2e tests",  status: "pass" },
    { name: "Security scan",   status: "pass" },
    { name: "Coverage ≥80%",   status: "fail" },
  ],
};

// ─── helpers ────────────────────────────────────────────────────────────────

function Avatar({ initials, size = 28, color }) {
  const colors = {
    AR: "#6366f1", SC: "#ec4899", MD: "#f59e0b",
    PK: "#10b981", you: "#6366f1",
  };
  const bg = color || colors[initials] || "#6366f1";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, color: "#fff",
      flexShrink: 0, fontFamily: "monospace",
    }}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    approved:           { label: "Approved",          bg: "#d1fae5", color: "#065f46" },
    "changes-requested":{ label: "Changes requested", bg: "#fee2e2", color: "#991b1b" },
    commented:          { label: "Commented",         bg: "#e0e7ff", color: "#3730a3" },
    pass:               { label: "✓ Pass",            bg: "#d1fae5", color: "#065f46" },
    fail:               { label: "✗ Fail",            bg: "#fee2e2", color: "#991b1b" },
  };
  const s = map[status] || { label: status, bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 12, fontSize: 11,
      fontWeight: 600, background: s.bg, color: s.color,
    }}>{s.label}</span>
  );
}

// ─── inline comment thread ───────────────────────────────────────────────────

function CommentThread({ comments, onReact, onResolve, onReply, lineKey }) {
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    if (!draft.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onReply(lineKey, draft.trim());
      setDraft("");
      setSubmitting(false);
    }, 400);
  }

  return (
    <tr>
      <td colSpan={3} style={{ background: "#f8faff", padding: "0 0 2px 0" }}>
        <div style={{ borderLeft: "3px solid #6366f1", margin: "0 0 0 40px", background: "#f0f4ff", padding: "12px 16px" }}>
          {comments.map(c => (
            <div key={c.id} style={{ marginBottom: 12, opacity: c.resolved ? 0.55 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Avatar initials={c.avatar} size={22} />
                <span style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{c.author}</span>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{c.time}</span>
                {c.resolved && <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>resolved</span>}
                {!c.resolved && (
                  <button onClick={() => onResolve(lineKey, c.id)} style={{
                    marginLeft: "auto", fontSize: 11, color: "#6366f1", background: "none",
                    border: "1px solid #c7d2fe", borderRadius: 6, padding: "1px 8px", cursor: "pointer",
                  }}>Resolve</button>
                )}
              </div>
              <div style={{ fontSize: 13, color: "#334155", paddingLeft: 30, lineHeight: 1.5 }}>{c.text}</div>
              <div style={{ display: "flex", gap: 6, paddingLeft: 30, marginTop: 6 }}>
                {Object.entries(c.reactions).map(([emoji, count]) => (
                  <button key={emoji} onClick={() => onReact(lineKey, c.id, emoji)} style={{
                    background: "#e0e7ff", border: "none", borderRadius: 12,
                    padding: "2px 8px", fontSize: 12, cursor: "pointer", color: "#3730a3",
                  }}>{emoji} {count}</button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 8, paddingLeft: 30, alignItems: "flex-end" }}>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
              placeholder="Reply… (⌘Enter to submit)"
              rows={2}
              style={{
                flex: 1, fontSize: 13, padding: "6px 10px", borderRadius: 8,
                border: "1px solid #c7d2fe", resize: "none", fontFamily: "inherit",
                background: "#fff", color: "#1e293b", outline: "none",
              }}
            />
            <button onClick={handleSubmit} disabled={submitting || !draft.trim()} style={{
              background: submitting ? "#a5b4fc" : "#6366f1", color: "#fff",
              border: "none", borderRadius: 8, padding: "6px 14px",
              cursor: draft.trim() ? "pointer" : "default", fontSize: 13, fontWeight: 600,
            }}>{submitting ? "…" : "Reply"}</button>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── diff viewer ─────────────────────────────────────────────────────────────

function DiffViewer({ file, comments, onAddComment, onReact, onResolve, onReply }) {
  const [hoveredLine, setHoveredLine] = useState(null);
  const [addingComment, setAddingComment] = useState(null);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const lineColor = { added: "#f0fdf4", removed: "#fff1f2", context: "#ffffff" };
  const lineNumberColor = { added: "#86efac", removed: "#fca5a5", context: "#94a3b8" };
  const linePrefix = { added: "+", removed: "−", context: " " };

  function handleAddComment(lineKey) {
    if (!draft.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onAddComment(lineKey, draft.trim());
      setDraft("");
      setAddingComment(null);
      setSubmitting(false);
    }, 400);
  }

  const rows = [];
  file.lines.forEach((line) => {
    const lineKey = `${file.id}-${line.n}`;
    const threadComments = comments[lineKey];

    rows.push(
      <tr key={lineKey}
        onMouseEnter={() => setHoveredLine(lineKey)}
        onMouseLeave={() => setHoveredLine(null)}
        style={{ background: lineColor[line.type] }}
      >
        <td style={{
          width: 36, textAlign: "right", paddingRight: 8, color: lineNumberColor[line.type],
          fontSize: 12, fontFamily: "monospace", userSelect: "none", verticalAlign: "top",
          paddingTop: 2, borderRight: "1px solid #e2e8f0",
        }}>{line.n}</td>
        <td style={{
          width: 20, textAlign: "center", fontSize: 13, fontFamily: "monospace",
          color: line.type === "added" ? "#16a34a" : line.type === "removed" ? "#dc2626" : "#cbd5e1",
          userSelect: "none",
        }}>{linePrefix[line.type]}</td>
        <td style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13,
          color: "#1e293b", padding: "2px 12px 2px 4px", whiteSpace: "pre", position: "relative",
        }}>
          {line.text}
          {hoveredLine === lineKey && (
            <button onClick={() => { setAddingComment(lineKey); setDraft(""); }} style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              background: "#6366f1", color: "#fff", border: "none", borderRadius: 6,
              padding: "2px 8px", fontSize: 11, cursor: "pointer", fontWeight: 700,
              opacity: 0.92,
            }}>+ Comment</button>
          )}
        </td>
      </tr>
    );

    if (addingComment === lineKey) {
      rows.push(
        <tr key={`add-${lineKey}`}>
          <td colSpan={3} style={{ background: "#f0f4ff", padding: "0 0 2px 40px" }}>
            <div style={{ borderLeft: "3px solid #6366f1", padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-end" }}>
              <Avatar initials="AR" size={24} />
              <textarea
                autoFocus
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAddComment(lineKey);
                  if (e.key === "Escape") setAddingComment(null);
                }}
                placeholder="Leave a comment… (⌘Enter to submit, Esc to cancel)"
                rows={2}
                style={{
                  flex: 1, fontSize: 13, padding: "6px 10px", borderRadius: 8,
                  border: "1px solid #c7d2fe", resize: "none", fontFamily: "inherit",
                  background: "#fff", color: "#1e293b", outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setAddingComment(null)} style={{
                  background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8,
                  padding: "6px 12px", fontSize: 13, cursor: "pointer", color: "#64748b",
                }}>Cancel</button>
                <button onClick={() => handleAddComment(lineKey)} disabled={submitting || !draft.trim()} style={{
                  background: "#6366f1", color: "#fff", border: "none", borderRadius: 8,
                  padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600,
                }}>Comment</button>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    if (threadComments?.length) {
      rows.push(
        <CommentThread key={`thread-${lineKey}`}
          comments={threadComments}
          lineKey={lineKey}
          onReact={onReact}
          onResolve={onResolve}
          onReply={onReply}
        />
      );
    }
  });

  return (
    <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #e2e8f0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: 44 }} />
          <col style={{ width: 24 }} />
          <col />
        </colgroup>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

// ─── file card ────────────────────────────────────────────────────────────────

function FileCard({ file, comments, onAddComment, onReact, onResolve, onReply }) {
  const [open, setOpen] = useState(file.id === 1);
  const commentCount = file.lines.filter(l => comments[`${file.id}-${l.n}`]?.length).length;

  return (
    <div style={{ marginBottom: 16, borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
        background: "#f8fafc", cursor: "pointer", userSelect: "none",
      }}>
        <span style={{ fontSize: 16 }}>{open ? "▾" : "▸"}</span>
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, color: "#1e293b", flex: 1 }}>
          {file.name}
        </span>
        {commentCount > 0 && (
          <span style={{ fontSize: 12, color: "#6366f1", background: "#e0e7ff", borderRadius: 10, padding: "1px 8px", fontWeight: 600 }}>
            💬 {commentCount}
          </span>
        )}
        <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>+{file.additions}</span>
        <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600 }}>−{file.deletions}</span>
        <StatusBadge status={file.status} />
      </div>
      {open && (
        <DiffViewer file={file} comments={comments}
          onAddComment={onAddComment} onReact={onReact}
          onResolve={onResolve} onReply={onReply} />
      )}
    </div>
  );
}

// ─── sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ onSubmitReview }) {
  const [verdict, setVerdict] = useState(null);
  const [summary, setSummary] = useState("");

  return (
    <div style={{ width: 280, flexShrink: 0 }}>
      {/* PR Meta */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, marginBottom: 10 }}>PULL REQUEST</div>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 10, lineHeight: 1.4 }}>
          #{PR_INFO.number} {PR_INFO.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Avatar initials={PR_INFO.avatar} size={24} />
          <span style={{ fontSize: 13, color: "#475569" }}>{PR_INFO.author}</span>
        </div>
        <div style={{ fontSize: 12, color: "#64748b", background: "#f8fafc", borderRadius: 6, padding: "6px 10px", fontFamily: "monospace" }}>
          {PR_INFO.branch} → {PR_INFO.base}
        </div>
        <div style={{ fontSize: 12, color: "#64748b", marginTop: 10, lineHeight: 1.5 }}>
          {PR_INFO.description}
        </div>
      </div>

      {/* Reviewers */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, marginBottom: 10 }}>REVIEWERS</div>
        {PR_INFO.reviewers.map(r => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Avatar initials={r.avatar} size={24} />
            <span style={{ fontSize: 13, color: "#475569", flex: 1 }}>{r.name}</span>
            <StatusBadge status={r.status} />
          </div>
        ))}
      </div>

      {/* CI Checks */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, marginBottom: 10 }}>CHECKS</div>
        {PR_INFO.checks.map(c => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <span style={{ fontSize: 14 }}>{c.status === "pass" ? "✅" : "❌"}</span>
            <span style={{ fontSize: 12, color: "#475569" }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Submit Review */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, marginBottom: 12 }}>SUBMIT REVIEW</div>
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          placeholder="Overall review summary…"
          rows={3}
          style={{
            width: "100%", fontSize: 13, padding: "8px 10px", borderRadius: 8,
            border: "1px solid #e2e8f0", resize: "none", fontFamily: "inherit",
            background: "#f8fafc", color: "#1e293b", outline: "none", boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
          {["approved", "changes-requested", "commented"].map(v => (
            <button key={v} onClick={() => setVerdict(v)} style={{
              padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
              border: verdict === v ? "none" : "1px solid #e2e8f0",
              background: verdict === v
                ? (v === "approved" ? "#d1fae5" : v === "changes-requested" ? "#fee2e2" : "#e0e7ff")
                : "#fff",
              color: verdict === v
                ? (v === "approved" ? "#065f46" : v === "changes-requested" ? "#991b1b" : "#3730a3")
                : "#64748b",
            }}>
              {v === "approved" ? "✓ Approve" : v === "changes-requested" ? "✗ Request changes" : "💬 Comment only"}
            </button>
          ))}
        </div>
        <button
          onClick={() => { if (verdict) onSubmitReview(verdict, summary); }}
          disabled={!verdict}
          style={{
            marginTop: 12, width: "100%", padding: "9px 0",
            background: verdict ? "#6366f1" : "#e2e8f0",
            color: verdict ? "#fff" : "#94a3b8",
            border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13,
            cursor: verdict ? "pointer" : "default", transition: "background 0.15s",
          }}
        >Submit review</button>
      </div>
    </div>
  );
}

// ─── toast ────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
      background: "#1e293b", color: "#fff", padding: "10px 22px",
      borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 999,
      boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    }}>{message}</div>
  );
}

// ─── main app ─────────────────────────────────────────────────────────────────

export default function App() {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [toast, setToast] = useState(null);
  const [tab, setTab] = useState("files");

  function showToast(msg) {
    setToast(msg);
  }

  function addComment(lineKey, text) {
    setComments(prev => ({
      ...prev,
      [lineKey]: [
        ...(prev[lineKey] || []),
        {
          id: `c${Date.now()}`, author: "you", avatar: "AR",
          time: "just now", text,
          resolved: false, reactions: {},
        },
      ],
    }));
    showToast("Comment posted");
  }

  function replyComment(lineKey, text) {
    addComment(lineKey, text);
  }

  function reactComment(lineKey, commentId, emoji) {
    setComments(prev => ({
      ...prev,
      [lineKey]: prev[lineKey].map(c =>
        c.id === commentId
          ? { ...c, reactions: { ...c.reactions, [emoji]: (c.reactions[emoji] || 0) + 1 } }
          : c
      ),
    }));
  }

  function resolveComment(lineKey, commentId) {
    setComments(prev => ({
      ...prev,
      [lineKey]: prev[lineKey].map(c =>
        c.id === commentId ? { ...c, resolved: true } : c
      ),
    }));
    showToast("Thread resolved");
  }

  function submitReview(verdict, summary) {
    const labels = { approved: "✓ Approved", "changes-requested": "✗ Changes requested", commented: "💬 Comment submitted" };
    showToast(`Review submitted — ${labels[verdict]}`);
  }

  const totalComments = Object.values(comments).flat().length;
  const totalAdditions = SAMPLE_FILES.reduce((s, f) => s + f.additions, 0);
  const totalDeletions = SAMPLE_FILES.reduce((s, f) => s + f.deletions, 0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "#1e293b", borderBottom: "1px solid #334155",
        padding: "0 24px", display: "flex", alignItems: "center", gap: 16, height: 52,
      }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: -0.5, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#818cf8" }}>◈</span> ReviewFlow
        </div>
        <span style={{ color: "#475569", fontSize: 13 }}>/</span>
        <span style={{ color: "#94a3b8", fontSize: 13 }}>backend-api</span>
        <span style={{ color: "#475569", fontSize: 13 }}>/</span>
        <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>PR #{PR_INFO.number}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Logged in as</span>
          <Avatar initials="AR" size={28} />
        </div>
      </div>

      {/* Title bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
          {PR_INFO.title}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <StatusBadge status="changes-requested" />
          <span style={{ fontSize: 12, color: "#64748b" }}>
            <span style={{ color: "#16a34a", fontWeight: 600 }}>+{totalAdditions}</span>
            {" / "}
            <span style={{ color: "#dc2626", fontWeight: 600 }}>−{totalDeletions}</span>
            {" across "}<strong>{SAMPLE_FILES.length}</strong> files
          </span>
          <span style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>💬 {totalComments} comments</span>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 14, borderBottom: "1px solid #e2e8f0" }}>
          {["files", "overview"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "6px 18px", fontSize: 13, fontWeight: 600, background: "none",
              border: "none", cursor: "pointer", borderBottom: tab === t ? "2px solid #6366f1" : "2px solid transparent",
              color: tab === t ? "#6366f1" : "#64748b", textTransform: "capitalize",
            }}>{t === "files" ? `Files (${SAMPLE_FILES.length})` : "Overview"}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {tab === "files" ? (
            SAMPLE_FILES.map(file => (
              <FileCard key={file.id} file={file} comments={comments}
                onAddComment={addComment} onReact={reactComment}
                onResolve={resolveComment} onReply={replyComment} />
            ))
          ) : (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b", marginBottom: 12 }}>PR Description</div>
              <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 14 }}>{PR_INFO.description}</p>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 10 }}>Changed files</div>
                {SAMPLE_FILES.map(f => (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 13, color: "#334155", flex: 1 }}>{f.name}</span>
                    <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>+{f.additions}</span>
                    <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600 }}>−{f.deletions}</span>
                    <StatusBadge status={f.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar onSubmitReview={submitReview} />
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
