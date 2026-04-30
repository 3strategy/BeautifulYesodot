(function () {
  const FIREBASE_VERSION = "11.4.0";

  const DEFAULT_LABELS = {
    loadingTitle: "Loading Wi-Fi diagram",
    loadingMessage: "Connecting to Firebase and reading the selected Mermaid topology...",
    signInTitle: "Google sign-in required",
    signInMessage: "Sign in with the same Google account used by WifiNetAnalyzer.",
    signInButtonLabel: "Sign in with Google",
    unauthorizedTitle: "No access to Wi-Fi diagrams",
    unauthorizedMessage: "This page is currently limited to configured admin accounts.",
    loadErrorTitle: "Could not load diagram",
    loadErrorMessage: "Firebase returned an error, or the stored Mermaid content could not be rendered.",
    signOutLabel: "Sign out",
    accountSignedInPrefix: "Signed in as",
    refreshLabel: "Refresh",
    liveTitle: "Live Firebase diagram",
    sourceTitle: "Mermaid source from RTDB",
    emptyMessage: "No Mermaid markdown was found at the configured RTDB path.",
    sessionsTitle: "Available diagnostic sessions",
    sessionsEmptyMessage: "No diagnostic sessions with Mermaid markdown were found.",
    fallbackSessionLabel: "Configured demo session",
  };

  function runWhenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  }

  function normalizeConfig(rawConfig) {
    return {
      firebaseConfig: rawConfig?.firebaseConfig || null,
      mermaidPath: rawConfig?.mermaidPath || "",
      sessionsRootPath: rawConfig?.sessionsRootPath || "/wifi/diagnosticSessions",
      allowedUids: Array.isArray(rawConfig?.allowedUids) ? rawConfig.allowedUids : [],
      statusMountId: rawConfig?.statusMountId || "wify-diagrams-status",
      accountMountId: rawConfig?.accountMountId || "wify-diagrams-account",
      mountId: rawConfig?.mountId || "wify-diagrams-root",
      labels: {
        ...DEFAULT_LABELS,
        ...(rawConfig?.labels || {}),
      },
    };
  }

  function clearNode(node) {
    if (!node) return;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function setHidden(node, hidden) {
    if (!node) return;
    node.classList.toggle("hidden", hidden);
  }

  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  function createButton(label, onClick, extraClassName) {
    const button = createElement("button", `quiz-btn ${extraClassName || ""}`.trim(), label);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  function toPath(path) {
    return String(path || "").replace(/^\/+|\/+$/g, "");
  }

  function renderCard(target, spec) {
    clearNode(target);

    const card = createElement("div", `tracked-quiz-card tracked-quiz-card-${spec.tone || "note"}`);
    card.appendChild(createElement("h2", "tracked-quiz-card-title", spec.title));

    if (spec.message) {
      card.appendChild(createElement("p", "tracked-quiz-card-text", spec.message));
    }

    if (Array.isArray(spec.extraLines) && spec.extraLines.length) {
      const meta = createElement("div", "tracked-quiz-card-meta");
      spec.extraLines.forEach((line) => meta.appendChild(createElement("div", "tracked-quiz-card-meta-line", line)));
      card.appendChild(meta);
    }

    if (Array.isArray(spec.actions) && spec.actions.length) {
      const actions = createElement("div", "tracked-quiz-card-actions");
      spec.actions.forEach((action) => actions.appendChild(createButton(action.label, action.onClick, action.className)));
      card.appendChild(actions);
    }

    target.appendChild(card);
  }

  function renderAccountBar(target, spec) {
    clearNode(target);
    if (!spec?.user) return;

    const bar = createElement("div", "tracked-quiz-account-bar");
    const meta = createElement("div", "tracked-quiz-account-meta");
    meta.appendChild(createElement(
      "div",
      "tracked-quiz-account-user",
      `${spec.labels.accountSignedInPrefix}: ${spec.user.displayName || spec.user.email || spec.user.uid}`
    ));

    const actions = createElement("div", "tracked-quiz-account-actions");
    if (typeof spec.onRefresh === "function") {
      actions.appendChild(createButton(spec.labels.refreshLabel, spec.onRefresh, "tracked-quiz-btn-secondary"));
    }
    if (typeof spec.onSignOut === "function") {
      actions.appendChild(createButton(spec.labels.signOutLabel, spec.onSignOut, "tracked-quiz-btn-secondary"));
    }

    bar.appendChild(meta);
    bar.appendChild(actions);
    target.appendChild(bar);
  }

  async function loadFirebaseModules() {
    const baseUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
    const modules = await Promise.all([
      import(`${baseUrl}/firebase-app.js`),
      import(`${baseUrl}/firebase-auth.js`),
      import(`${baseUrl}/firebase-database.js`),
    ]);

    return Object.assign({}, ...modules);
  }

  function normalizeMermaidSource(value) {
    if (typeof value !== "string") return "";

    let source = value.trim();
    source = source.replace(/^```mermaid\s*/i, "");
    source = source.replace(/^```\s*/i, "");
    source = source.replace(/\s*```$/i, "").trim();

    if (/^mermaidgraph\b/i.test(source)) {
      source = source.replace(/^mermaidgraph\b/i, "graph");
    }

    source = normalizeLegacyStatementBreaks(source);
    return repairUnsafeNodeLabels(source);
  }

  function repairUnsafeNodeLabels(source) {
    return source.replace(/\b([A-Za-z][A-Za-z0-9_-]*)\[([^\]\n]+)\]/g, (match, nodeId, label) => {
      if (/^\s*".*"\s*$/.test(label)) return match;
      const repairedLabel = label
        .replace(/"/g, "'")
        .replace(/\[/g, "(")
        .replace(/\]/g, ")");
      return `${nodeId}["${repairedLabel}"]`;
    });
  }

  function normalizeLegacyStatementBreaks(source) {
    const normalized = source
      .replace(/^(graph\s+(?:LR|RL|TD|TB|BT))\s+/i, "$1\n  ")
      .replace(/\s{2,}(?=(?:[A-Za-z][A-Za-z0-9_-]*\s*-->|[A-Za-z][A-Za-z0-9_-]*\[))/g, "\n  ")
      .trim();

    return normalized;
  }

  async function waitForMermaid() {
    for (let i = 0; i < 40; i += 1) {
      if (window.mermaid?.render) return window.mermaid;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return null;
  }

  async function renderMermaid(target, source, labels) {
    clearNode(target);

    const section = createElement("section", "wify-diagram-section");
    section.appendChild(createElement("h2", "wify-diagram-title", labels.liveTitle));

    const diagram = createElement("div", "wify-diagram-render mermaid mermaid-ltr");
    section.appendChild(diagram);

    const sourceDetails = createElement("details", "wify-diagram-source");
    sourceDetails.appendChild(createElement("summary", "", labels.sourceTitle));
    const pre = createElement("pre", "");
    const code = createElement("code", "", source);
    pre.appendChild(code);
    sourceDetails.appendChild(pre);
    section.appendChild(sourceDetails);

    target.appendChild(section);

    const mermaid = await waitForMermaid();
    if (!mermaid) {
      diagram.textContent = source;
      return;
    }

    try {
      const id = `wify-live-mermaid-${Date.now()}`;
      const result = await mermaid.render(id, source);
      diagram.innerHTML = result.svg;
      if (typeof result.bindFunctions === "function") {
        result.bindFunctions(diagram);
      }
    } catch (error) {
      diagram.textContent = source;
      renderCard(target, {
        tone: "warning",
        title: labels.loadErrorTitle,
        message: labels.loadErrorMessage,
        extraLines: [error?.message || String(error)],
      });
    }
  }

  function buildSessionListFromRoot(rawRoot, sessionsRootPath) {
    const sessions = [];
    const root = rawRoot && typeof rawRoot === "object" ? rawRoot : {};

    Object.entries(root).forEach(([scopeType, scopes]) => {
      if (!scopes || typeof scopes !== "object") return;
      Object.entries(scopes).forEach(([scopeId, writers]) => {
        if (!writers || typeof writers !== "object") return;
        Object.entries(writers).forEach(([writerUid, writerSessions]) => {
          if (!writerSessions || typeof writerSessions !== "object") return;
          Object.entries(writerSessions).forEach(([sessionId, session]) => {
            addSession(sessions, {
              sessionsRootPath,
              scopeType,
              scopeId,
              writerUid,
              sessionId,
              session,
            });
          });
        });
      });
    });

    return sortSessions(sessions);
  }

  function buildSessionListFromWriter(rawWriterSessions, sessionsRootPath, scopeType, scopeId, writerUid) {
    const sessions = [];
    const writerSessions = rawWriterSessions && typeof rawWriterSessions === "object" ? rawWriterSessions : {};

    Object.entries(writerSessions).forEach(([sessionId, session]) => {
      addSession(sessions, {
        sessionsRootPath,
        scopeType,
        scopeId,
        writerUid,
        sessionId,
        session,
      });
    });

    return sortSessions(sessions);
  }

  function buildSessionListFromSchool(rawSchoolSessions, sessionsRootPath, schoolId) {
    const sessions = [];
    const schoolSessions = rawSchoolSessions && typeof rawSchoolSessions === "object" ? rawSchoolSessions : {};

    Object.entries(schoolSessions).forEach(([writerUid, writerSessions]) => {
      if (!writerSessions || typeof writerSessions !== "object") return;
      Object.entries(writerSessions).forEach(([sessionId, session]) => {
        addSession(sessions, {
          sessionsRootPath,
          scopeType: "school",
          scopeId: schoolId,
          writerUid,
          sessionId,
          session,
        });
      });
    });

    return sortSessions(sessions);
  }

  function addSession(sessions, spec) {
    const { sessionsRootPath, scopeType, scopeId, writerUid, sessionId, session } = spec;
    if (!session || typeof session !== "object" || typeof session.mermaidMarkdown !== "string") return;

    const scopeName = session.environmentScope?.displayName || scopeId;
    const capturedAt = Number(session.capturedAt) || 0;
    sessions.push({
      label: `${formatTimestamp(capturedAt)} | ${scopeType}/${scopeName} | ${session.requestedTransport || "probe"} | ${sessionId}`,
      path: `${toPath(sessionsRootPath)}/${scopeType}/${scopeId}/${writerUid}/${sessionId}/mermaidMarkdown`,
      session,
      capturedAt,
    });
  }

  function sortSessions(sessions) {
    sessions.sort((a, b) => b.capturedAt - a.capturedAt);
    return sessions;
  }

  function withFallbackSession(sessions, fallbackMermaidPath, labels) {
    if (!sessions.length && fallbackMermaidPath) {
      sessions.push({
        label: labels.fallbackSessionLabel,
        path: toPath(fallbackMermaidPath),
        session: null,
        capturedAt: 0,
      });
    }

    return sessions;
  }

  function dedupeSessions(sessions) {
    const seen = new Set();
    return sortSessions(sessions.filter((session) => {
      if (seen.has(session.path)) return false;
      seen.add(session.path);
      return true;
    }));
  }

  function formatTimestamp(value) {
    if (!Number.isFinite(value) || value <= 0) return "unknown time";
    return new Date(value).toLocaleString("en-IL", {
      timeZone: "Asia/Jerusalem",
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  function renderSessionPicker(target, sessions, selectedPath, labels, onSelect) {
    clearNode(target);

    const section = createElement("section", "wify-diagram-section");
    section.appendChild(createElement("h2", "wify-diagram-title", labels.sessionsTitle));

    if (!sessions.length) {
      section.appendChild(createElement("p", "", labels.sessionsEmptyMessage));
      target.appendChild(section);
      return;
    }

    const select = createElement("select", "wify-session-select");
    sessions.forEach((session) => {
      const option = createElement("option", "", session.label);
      option.value = session.path;
      option.selected = session.path === selectedPath;
      select.appendChild(option);
    });
    select.addEventListener("change", () => onSelect(select.value));
    section.appendChild(select);

    const selected = sessions.find((session) => session.path === selectedPath);
    if (selected) {
      const meta = createElement("div", "tracked-quiz-card-meta");
      meta.appendChild(createElement("div", "tracked-quiz-card-meta-line", `RTDB: /${selected.path}`));
      if (selected.session?.uid) meta.appendChild(createElement("div", "tracked-quiz-card-meta-line", `Writer UID: ${selected.session.uid}`));
      if (selected.session?.environmentScope?.displayName) {
        meta.appendChild(createElement("div", "tracked-quiz-card-meta-line", `Scope: ${selected.session.environmentScope.displayName}`));
      }
      section.appendChild(meta);
    }

    target.appendChild(section);
  }

  async function bootWifyDiagrams() {
    const rawConfig = window.WIFY_DIAGRAMS_CONFIG;
    if (!rawConfig) return;

    const config = normalizeConfig(rawConfig);
    const statusMount = document.getElementById(config.statusMountId);
    const accountMount = document.getElementById(config.accountMountId);
    const rootMount = document.getElementById(config.mountId);

    if (!statusMount || !accountMount || !rootMount) return;

    if (!config.firebaseConfig || !config.mermaidPath) {
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.loadErrorTitle,
        message: "Missing Firebase configuration or RTDB path.",
      });
      return;
    }

    setHidden(rootMount, true);
    renderCard(statusMount, {
      tone: "note",
      title: config.labels.loadingTitle,
      message: config.labels.loadingMessage,
    });

    const firebase = await loadFirebaseModules();
    const {
      initializeApp,
      getAuth,
      GoogleAuthProvider,
      onAuthStateChanged,
      signInWithPopup,
      signOut,
      getDatabase,
      ref,
      get,
    } = firebase;

    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    async function signInHandler() {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        renderCard(statusMount, {
          tone: "error",
          title: config.labels.loadErrorTitle,
          message: error?.message || config.labels.loadErrorMessage,
          actions: [
            {
              label: config.labels.signInButtonLabel,
              onClick: signInHandler,
            },
          ],
        });
      }
    }

    let sessionOptions = [];
    let selectedMermaidPath = toPath(config.mermaidPath);

    async function readSessionOptions(user) {
      const discovered = [];
      try {
        const snapshot = await get(ref(db, toPath(config.sessionsRootPath)));
        discovered.push(...buildSessionListFromRoot(snapshot.val(), config.sessionsRootPath));
      } catch (error) {
        // Root listing is usually blocked by RTDB rules; fall through to allowed scoped reads.
      }

      if (user?.uid) {
        try {
          const personalPath = `${toPath(config.sessionsRootPath)}/personal/${user.uid}/${user.uid}`;
          const snapshot = await get(ref(db, personalPath));
          discovered.push(...buildSessionListFromWriter(
            snapshot.val(),
            config.sessionsRootPath,
            "personal",
            user.uid,
            user.uid
          ));
        } catch (error) {
          // Personal scoped read may be blocked for accounts without sessions.
        }
      }

      try {
        const schoolsSnapshot = await get(ref(db, "wifi/schools"));
        const schools = schoolsSnapshot.val() && typeof schoolsSnapshot.val() === "object"
          ? Object.keys(schoolsSnapshot.val())
          : [];
        const schoolSnapshots = await Promise.all(
          schools.map(async (schoolId) => {
            try {
              const schoolPath = `${toPath(config.sessionsRootPath)}/school/${schoolId}`;
              const snapshot = await get(ref(db, schoolPath));
              return buildSessionListFromSchool(snapshot.val(), config.sessionsRootPath, schoolId);
            } catch (error) {
              return [];
            }
          })
        );
        schoolSnapshots.forEach((sessions) => discovered.push(...sessions));
      } catch (error) {
        // School discovery depends on /wifi/schools read access.
      }

      sessionOptions = withFallbackSession(dedupeSessions(discovered), config.mermaidPath, config.labels);
      if (sessionOptions.length && !sessionOptions.some((session) => session.path === selectedMermaidPath)) {
        selectedMermaidPath = sessionOptions[0].path;
      }
    }

    async function loadAndRender(user, requestedPath) {
      if (requestedPath) selectedMermaidPath = toPath(requestedPath);
      renderAccountBar(accountMount, {
        user,
        labels: config.labels,
        onRefresh: () => loadAndRender(user),
        onSignOut: async () => signOut(auth),
      });

      renderCard(statusMount, {
        tone: "note",
        title: config.labels.loadingTitle,
        message: config.labels.loadingMessage,
        extraLines: [`/${selectedMermaidPath}`],
      });
      setHidden(rootMount, true);

      await readSessionOptions(user);
      const snapshot = await get(ref(db, selectedMermaidPath));
      const source = normalizeMermaidSource(snapshot.val());

      if (!source) {
        setHidden(rootMount, true);
        renderCard(statusMount, {
          tone: "warning",
          title: config.labels.loadErrorTitle,
          message: config.labels.emptyMessage,
          extraLines: [`/${selectedMermaidPath}`],
        });
        return;
      }

      clearNode(statusMount);
      renderSessionPicker(statusMount, sessionOptions, selectedMermaidPath, config.labels, (path) => {
        loadAndRender(user, path).catch((error) => {
          renderCard(statusMount, {
            tone: "error",
            title: config.labels.loadErrorTitle,
            message: error?.message || config.labels.loadErrorMessage,
          });
        });
      });
      await renderMermaid(rootMount, source, config.labels);
      setHidden(rootMount, false);
    }

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        clearNode(accountMount);
        setHidden(rootMount, true);
        renderCard(statusMount, {
          tone: "note",
          title: config.labels.signInTitle,
          message: config.labels.signInMessage,
          actions: [
            {
              label: config.labels.signInButtonLabel,
              onClick: signInHandler,
            },
          ],
        });
        return;
      }

      if (config.allowedUids.length && !config.allowedUids.includes(user.uid)) {
        clearNode(accountMount);
        setHidden(rootMount, true);
        renderCard(statusMount, {
          tone: "warning",
          title: config.labels.unauthorizedTitle,
          message: config.labels.unauthorizedMessage,
          extraLines: [user.email || user.uid],
          actions: [
            {
              label: config.labels.signOutLabel,
              onClick: async () => signOut(auth),
            },
          ],
        });
        return;
      }

      try {
        await loadAndRender(user);
      } catch (error) {
        setHidden(rootMount, true);
        renderCard(statusMount, {
          tone: "error",
          title: config.labels.loadErrorTitle,
          message: config.labels.loadErrorMessage,
          extraLines: [error?.message || String(error)],
        });
      }
    });
  }

  runWhenReady(() => {
    bootWifyDiagrams().catch((error) => {
      const config = normalizeConfig(window.WIFY_DIAGRAMS_CONFIG || {});
      const statusMount = document.getElementById(config.statusMountId);
      if (!statusMount) return;
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.loadErrorTitle,
        message: error?.message || config.labels.loadErrorMessage,
      });
    });
  });
})();
