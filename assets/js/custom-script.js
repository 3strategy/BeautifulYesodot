// Cookie helper functions
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Toggle theme function
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    setCookie("theme", "dark", 365);
  } else {
    body.classList.add("light-theme");
    setCookie("theme", "light", 365);
  }
}

// call this to toggle “big text+layout”
function toggleSize() {
  const body = document.body;
  if (body.classList.contains("large-theme")) {
    body.classList.remove("large-theme");
    setCookie("size", "normal", 365);
  } else {
    body.classList.add("large-theme");
    setCookie("size", "large", 365);
  }
}

function getPresentationContainer() {
  return document.querySelector(".post-content")
    || document.querySelector(".page-content")
    || document.querySelector("article");
}

function wrapPresentationSlides(container) {
  if (!container || container.dataset.presentationWrapped === "true") return;

  const nodes = Array.from(container.childNodes);
  if (!nodes.length) return;

  const fragment = document.createDocumentFragment();
  let slide = document.createElement("section");
  slide.className = "presentation-slide";
  let hasContent = false;

  nodes.forEach((node) => {
    const isHr = node.nodeType === 1 && node.tagName === "HR";

    slide.appendChild(node);

    if (isHr) {
      if (hasContent) {
        fragment.appendChild(slide);
        slide = document.createElement("section");
        slide.className = "presentation-slide";
        hasContent = false;
      }
      return;
    }

    if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== "")) {
      hasContent = true;
    }
  });

  if (slide.childNodes.length) {
    fragment.appendChild(slide);
  }

  container.appendChild(fragment);
  container.dataset.presentationWrapped = "true";
}

function unwrapPresentationSlides(container) {
  if (!container || container.dataset.presentationWrapped !== "true") return;

  const slides = Array.from(container.children).filter((child) =>
    child.classList && child.classList.contains("presentation-slide")
  );
  if (!slides.length) {
    delete container.dataset.presentationWrapped;
    return;
  }

  const fragment = document.createDocumentFragment();
  slides.forEach((slide) => {
    while (slide.firstChild) {
      fragment.appendChild(slide.firstChild);
    }
  });

  slides.forEach((slide) => slide.remove());
  container.appendChild(fragment);
  delete container.dataset.presentationWrapped;
}

function togglePresentationMode() {
  const body = document.body;
  const isPresentation = body.classList.toggle("presentation-mode");
  const container = getPresentationContainer();

  if (isPresentation) {
    wrapPresentationSlides(container);
    window.scrollTo(0, 0);
  } else {
    unwrapPresentationSlides(container);
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && document.body.classList.contains("presentation-mode")) {
    togglePresentationMode();
  }
});

// Convert fenced ```mermaid code blocks to <div class="mermaid"> before Mermaid runs
document.addEventListener('DOMContentLoaded', function () {
  try {
    const codeBlocks = document.querySelectorAll('pre > code.language-mermaid');
    codeBlocks.forEach((code) => {
      const pre = code.parentElement;
      const container = document.createElement('div');
      container.className = 'mermaid';
      // textContent decodes any HTML entities into raw Mermaid source
      container.textContent = code.textContent;
      // Replace the whole <pre> block with the Mermaid container
      pre.replaceWith(container);
    });
  } catch (e) {
    // no-op: fail-safe so other scripts continue to run
    console && console.warn && console.warn('Mermaid fence conversion failed:', e);
  }
});

// on load, restore both theme & size
window.onload = function() {
  // existing theme restore
  const theme = getCookie("theme");
  if (theme === "light") document.body.classList.add("light-theme");

  // new size restore
  const size = getCookie("size");
  if (size === "large") document.body.classList.add("large-theme");
}
