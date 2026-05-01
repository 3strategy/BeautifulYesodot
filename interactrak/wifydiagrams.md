---
layout: page
title: WifiNetAnalyzer diagrams
lang: en
full-width: true
---

<!-- interactive -->

<style>
.wify-page {
  direction: ltr;
  text-align: left;
}

.wify-page h2 {
  margin-top: 2.25rem;
}

.wify-note {
  border: 1px solid var(--navbar-border-col);
  border-radius: 12px;
  padding: 1rem 1.15rem;
  margin: 1.25rem 0;
  background: var(--backn-col);
}

.wify-path {
  direction: ltr;
  text-align: left;
  overflow-wrap: anywhere;
}

.wify-diagram-section {
  border: 1px solid var(--navbar-border-col);
  border-radius: 12px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  background: var(--backn-col);
}

.wify-diagram-title {
  margin-top: 0;
}

.wify-diagram-render {
  width: 100%;
  overflow-x: auto;
  padding: 0.75rem;
  background: var(--page-col);
  border-radius: 8px;
}

.wify-diagram-source summary {
  cursor: pointer;
}

.wify-session-select {
  width: 100%;
  max-width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--navbar-border-col);
  border-radius: 8px;
  background: var(--page-col);
  color: var(--text-col);
}
</style>

## Live Firebase Mermaid

<div id="wify-diagrams-status"></div>
<div id="wify-diagrams-account"></div>
<div id="wify-diagrams-root" class="hidden"></div>

</div>

<script>
window.WIFY_DIAGRAMS_CONFIG = {
  firebaseConfig: {
    apiKey: "AIzaSyB1PN88qSK_iLk2tquUtHEr-243P9-9C8U",
    authDomain: "guysfbfinal.firebaseapp.com",
    databaseURL: "https://guysfbfinal-default-rtdb.firebaseio.com",
    projectId: "guysfbfinal",
    storageBucket: "guysfbfinal.firebasestorage.app",
    messagingSenderId: "305446301273",
    appId: "1:305446301273:web:87f1865be1a45edad9cb48"
  },
  sessionsRootPath: "/wifi/diagnosticSessions",
  mermaidPath: "/wifi/diagnosticSessions/personal/YtfYwYQ5FxOFk50npfDWF0Ekq7i1/YtfYwYQ5FxOFk50npfDWF0Ekq7i1/2be0ed61-6a1f-43cd-ae74-738de2624aa4/mermaidMarkdown",
  allowedUids: [
    "YtfYwYQ5FxOFk50npfDWF0Ekq7i1"
  ],
  statusMountId: "wify-diagrams-status",
  accountMountId: "wify-diagrams-account",
  mountId: "wify-diagrams-root"
};
</script>

<script src="{{ '/assets/js/wify-diagrams.js' | relative_url }}?v=20260430-5"></script>
