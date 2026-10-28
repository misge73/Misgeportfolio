/* ============================================================
   misgana-portfolio — main.js
   Modular vanilla JS: nav, reveals, projects, form, etc.
   ============================================================ */

(() => {
  "use strict";

  /* ---------- Project data ---------- */
  // Edit this array to add/update projects. Mark unfinished projects honestly.
  const PROJECTS = [
    {
      title: "WCUOCMS — University Cost-Sharing Management System",
      titleAm: "WCUOCMS — የዩኒቨርሲቲ ወጪ-ማጋራት አስተዳደር ስርዓት",
      description:
        "A university cost-sharing management system built to handle student cost-sharing workflows. Backend-driven with PHP and MySQL. Status: in development — core modules implemented, polishing and testing ongoing.",
      descriptionAm:
        "የተማሪዎች ወጪ-ማጋራት ሂደቶችን ለማስተናገድ የተገነባ የዩኒቨርሲቲ ወጪ-ማጋራት አስተዳደር ስርዓት። በPHP እና MySQL የተገነባ። ሁኔታ: በልማት ላይ — ዋና ሞዱሎች ተተግብረዋል፣ ማሟላት እና ሙከራ በሂደት ላይ።",
      image: "assets/images/project-wcuocms.svg",
      badge: "In Development",
      badgeAm: "በልማት ላይ",
      stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      demo: "", // add live demo URL when deployed
      source: "", // add repository URL when public
      status: "Not hosted yet — still in development. Demo & source links coming soon.",
      statusAm: "እስካሁን አልተሰማራም — በልማት ላይ። የማሳያ እና ምንጭ ሊንኮች በቅርቡ።"
    },
    {
      title: "Hadiya Zone Science and Technology Department Website",
      titleAm: "የሃዲያ ዞን ሳይንስና ቴክኖሎጂ መምሪያ ድረ-ገጽ",
      description:
        "A bilingual (local language + English) website for the Hadiya Zone Science and Technology Department. Focused on clear information architecture, responsive layout, and accessible content.",
      descriptionAm:
        "ለሃዲያ ዞን ሳይንስና ቴክኖሎጂ መምሪያ የተዘጋጀ ሁለት ቋንቋ (አካባቢያዊ + እንግሊዝኛ) ድረ-ገጽ። በግልጽ የመረጃ አወቃቀር፣ ምላሽ ሰጪ አቀማመጥ እና ተደራሽ ይዘት ላይ ያተኮረ።",
      image: "assets/images/project-hadiya.svg",
      badge: "Completed",
      badgeAm: "ተጠናቋል",
      stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      demo: "", // add live demo URL when deployed
      source: "", // add repository URL when public
      status: "Not hosted yet — still in development. Demo & source links coming soon.",
      statusAm: "እስካሁን አልተሰማራም — በልማት ላይ። የማሳያ እና ምንጭ ሊንኮች በቅርቡ።"
    },
    {
      title: "Additional Project Slot",
      titleAm: "ተጨማሪ ፕሮጀክት ቦታ",
      description:
        "Reserved slot for future projects. Replace this card with a real project: title, description, screenshot, stack, and links.",
      descriptionAm:
        "ለወደፊት ፕሮጀክቶች የተያዘ ቦታ። ይህንን ካርድ በእውነተኛ ፕሮጀክት (ርዕስ፣ መግለጫ፣ ስክሪንሾት፣ ቴክኖሎጂዎች እና ሊንኮች) ይተኩት።",
      image: "assets/images/project-placeholder.svg",
      badge: "Coming Soon",
      badgeAm: "በቅርቡ",
      stack: ["HTML", "CSS", "JavaScript"],
      demo: "",
      source: "",
      status: "Placeholder card — replace with a real project when ready.",
      statusAm: "ምትክ ካርድ — ዝግጁ ሲሆን በእውነተኛ ፕሮጀክት ይተኩት።"
    }
  ];

  /* ---------- Utilities ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Parallax background (desktop only) ---------- */
  const updateBgParallax = () => {
    if (prefersReducedMotion()) {
      document.documentElement.style.setProperty("--bg-offset", "0px");
      return;
    }
    if (window.innerWidth < 900) {
      document.documentElement.style.setProperty("--bg-offset", "0px");
      return;
    }
    const offset = Math.min(window.scrollY * 0.12, 70);
    document.documentElement.style.setProperty("--bg-offset", offset + "px");
  };
  window.addEventListener("scroll", updateBgParallax, { passive: true });
  window.addEventListener("resize", updateBgParallax);
  updateBgParallax();

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const navToggle = $("#nav-toggle");
  const navMenu = $("#nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close on link click (mobile)
    $$(".nav__link, .nav__cta", navMenu).forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navMenu.classList.contains("is-open")) return;
      if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Header scroll state ---------- */
  const header = $("#site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth scroll for anchor links (enhance) ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      // Update URL hash without jumping
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion()) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* ---------- Active nav link highlighting ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__link");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const activeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((l) => {
              l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => activeIO.observe(s));
  }

  /* ---------- Project cards rendering ---------- */
  const renderProjects = (lang) => {
    const projectsGrid = $("#projects-grid");
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";
    const isAm = lang === "am";
    const fragment = document.createDocumentFragment();
    PROJECTS.forEach((p) => {
      const card = document.createElement("article");
      card.className = "project-card reveal";

      const media = document.createElement("div");
      media.className = "project-card__media";
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = isAm && p.titleAm ? p.titleAm : p.title;
      img.loading = "lazy";
      img.width = 800;
      img.height = 450;
      media.appendChild(img);
      if (p.badge) {
        const badge = document.createElement("span");
        badge.className = "project-card__badge";
        badge.textContent = isAm && p.badgeAm ? p.badgeAm : p.badge;
        media.appendChild(badge);
      }
      card.appendChild(media);

      const body = document.createElement("div");
      body.className = "project-card__body";

      const title = document.createElement("h3");
      title.className = "project-card__title";
      title.textContent = isAm && p.titleAm ? p.titleAm : p.title;
      body.appendChild(title);

      const desc = document.createElement("p");
      desc.className = "project-card__desc";
      desc.textContent = isAm && p.descriptionAm ? p.descriptionAm : p.description;
      body.appendChild(desc);

      if (p.stack && p.stack.length) {
        const stack = document.createElement("div");
        stack.className = "project-card__stack";
        p.stack.forEach((s) => {
          const tag = document.createElement("span");
          tag.textContent = s;
          stack.appendChild(tag);
        });
        body.appendChild(stack);
      }

      if (p.status) {
        const status = document.createElement("p");
        status.className = "project-card__status";
        status.textContent = isAm && p.statusAm ? p.statusAm : p.status;
        body.appendChild(status);
      }

      const links = document.createElement("div");
      links.className = "project-card__links";

      const makeLink = (href, label, icon) => {
        if (href) {
          const a = document.createElement("a");
          a.href = href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.innerHTML = `${label} <span aria-hidden="true">${icon}</span>`;
          return a;
        }
        const span = document.createElement("span");
        span.className = "project-card__coming-soon";
        span.textContent = `${label} — ${isAm ? "በቅርቡ" : "Coming soon"}`;
        return span;
      };

      links.appendChild(makeLink(p.demo, "Live Demo", "↗"));
      links.appendChild(makeLink(p.source, "Source", "⌥"));
      body.appendChild(links);

      card.appendChild(body);
      fragment.appendChild(card);
    });
    projectsGrid.appendChild(fragment);

    // Observe newly added reveals
    if (!prefersReducedMotion() && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      $$(".reveal", projectsGrid).forEach((el) => io.observe(el));
    } else {
      $$(".reveal", projectsGrid).forEach((el) => el.classList.add("is-visible"));
    }

    // 3D tilt
    if (!prefersReducedMotion()) {
      $$(".project-card", projectsGrid).forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `translateY(-6px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
    }
  };

  /* ---------- Language switching ---------- */
  const I18N = window.I18N || { en: {}, am: {} };
  const applyLang = (lang) => {
    lang = lang === "am" ? "am" : "en";
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = I18N[lang] && I18N[lang][key];
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = I18N[lang] && I18N[lang][key];
      if (val != null) el.setAttribute("placeholder", val);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const val = I18N[lang] && I18N[lang][key];
      if (val != null) el.innerHTML = val;
    });
    const yEl = $("#year");
    if (yEl) yEl.textContent = new Date().getFullYear();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    renderProjects(lang);
  };
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
  let initialLang = "en";
  applyLang(initialLang);

  /* ---------- Contact form (mailto fallback) ---------- */
  const form = $("#contact-form");
  const status = $("#form-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        if (status) status.textContent = "Please fill in all fields.";
        return;
      }
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:misganabekele167@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      if (status) status.textContent = "Opening your email client…";
    });
  }

  /* ---------- 3D tilt on project cards (subtle) ---------- */
  if (!prefersReducedMotion()) {
    $$(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
})();
