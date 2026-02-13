document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;

    // ===== Typing na HERO (1x ao abrir) =====
    (function runHeroTypingOnce() {
        const headline = document.querySelector('.hero-headline[data-hero-typing]');
        if (!headline) return;

        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targets = Array.from(headline.querySelectorAll('[data-type]'));
        if (targets.length === 0) return;

        if (reduceMotion) {
            targets.forEach((el) => (el.textContent = el.getAttribute('data-type') || ''));
            return;
        }

        targets.forEach((el) => (el.textContent = ''));

        let index = 0;
        let charIndex = 0;

        const getDelay = (ch) => {
            if (ch === '.' || ch === '!' || ch === '?') return 260;
            if (ch === ',') return 140;
            if (ch === ' ') return 18;
            return 22;
        };

        const step = () => {
            const el = targets[index];
            const full = el.getAttribute('data-type') || '';

            targets.forEach((t) => t.classList.remove('typing-active'));
            el.classList.add('typing-active');

            if (charIndex < full.length) {
                const ch = full.charAt(charIndex);
                el.textContent += ch;
                charIndex++;
                window.setTimeout(step, getDelay(ch));
                return;
            }

            // próximo bloco
            el.classList.remove('typing-active');
            index++;
            charIndex = 0;

            if (index < targets.length) {
                window.setTimeout(step, 120);
                return;
            }

            // terminou
        };

        window.setTimeout(step, 120);
    })();

    // ===== HUD Glitch realtime (menu + botões) =====
    (function runHudGlitchRealtime() {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const targets = Array.from(document.querySelectorAll('.nav-list a, .btn, .icon-btn'));
        if (targets.length === 0) return;

        targets.forEach((el) => el.classList.add('hud-glitch-target'));

        let glitchTimer = null;
        let syncFlashTimer = null;
        const root = document.documentElement;
        const signalEl = document.createElement('div');
        signalEl.className = 'hud-signal';
        signalEl.setAttribute('aria-hidden', 'true');
        document.body.appendChild(signalEl);
        let signalTimer = null;

        const pulseGlitch = (el, duration = 120) => {
            if (!el) return;
            el.classList.remove('is-glitching');
            void el.offsetWidth;
            el.classList.add('is-glitching');
            window.setTimeout(() => {
                el.classList.remove('is-glitching');
            }, duration);
        };

        const scheduleGlitch = () => {
            const nextIn = 260 + Math.random() * 1200;
            glitchTimer = window.setTimeout(() => {
                if (document.hidden) {
                    scheduleGlitch();
                    return;
                }

                const target = targets[Math.floor(Math.random() * targets.length)];
                pulseGlitch(target, 95 + Math.random() * 120);
                scheduleGlitch();
            }, nextIn);
        };

        scheduleGlitch();

        const pulseHudFromMeteor = (strength = 'medium') => {
            const level = strength === 'strong' || strength === 'weak' ? strength : 'medium';
            const config = level === 'strong'
                ? { burstCount: 6, baseDuration: 185, flashDuration: 260 }
                : level === 'weak'
                    ? { burstCount: 2, baseDuration: 105, flashDuration: 140 }
                    : { burstCount: 4, baseDuration: 145, flashDuration: 200 };
            const label = level === 'strong' ? 'SIGNAL: STRONG' : level === 'weak' ? 'SIGNAL: WEAK' : 'SIGNAL: MEDIUM';

            signalEl.textContent = label;
            signalEl.classList.remove('level-weak', 'level-medium', 'level-strong');
            signalEl.classList.add(`level-${level}`, 'show');

            if (signalTimer) window.clearTimeout(signalTimer);
            signalTimer = window.setTimeout(() => {
                signalEl.classList.remove('show');
            }, level === 'strong' ? 720 : 520);

            root.classList.remove('hud-space-sync', 'hud-space-sync--weak', 'hud-space-sync--medium', 'hud-space-sync--strong');
            void root.offsetWidth;
            root.classList.add(`hud-space-sync--${level}`);
            root.classList.add('hud-space-sync');

            if (syncFlashTimer) window.clearTimeout(syncFlashTimer);
            syncFlashTimer = window.setTimeout(() => {
                root.classList.remove('hud-space-sync', 'hud-space-sync--weak', 'hud-space-sync--medium', 'hud-space-sync--strong');
            }, config.flashDuration);

            for (let i = 0; i < config.burstCount; i++) {
                const target = targets[Math.floor(Math.random() * targets.length)];
                pulseGlitch(target, config.baseDuration + Math.random() * 95);
            }
        };

        window.__krinHudSpacePulse = pulseHudFromMeteor;

        document.addEventListener('visibilitychange', () => {
            if (glitchTimer) window.clearTimeout(glitchTimer);
            if (!document.hidden) scheduleGlitch();
        });

        targets.forEach((el) => {
            el.addEventListener('mouseenter', () => pulseGlitch(el, 120));
            el.addEventListener('focus', () => pulseGlitch(el, 120));
        });
    })();

    // animações da seção Antes/Depois simplificadas no CSS para evitar inconsistência

    // ===== Universo (estrelas + estrelas cadentes) =====
    const spaceCanvas = document.getElementById('space-canvas');
    const spaceCtx = spaceCanvas && spaceCanvas.getContext ? spaceCanvas.getContext('2d') : null;

    const spaceState = {
        w: 0,
        h: 0,
        dpr: 1,
        stars: [],
        meteors: [],
        nextMeteorAt: 0,
        lastTs: 0,
    };

    function resizeSpace() {
        if (!spaceCanvas || !spaceCtx) return;

        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        const w = Math.floor(window.innerWidth);
        const h = Math.floor(window.innerHeight);

        spaceState.w = w;
        spaceState.h = h;
        spaceState.dpr = dpr;

        spaceCanvas.width = Math.floor(w * dpr);
        spaceCanvas.height = Math.floor(h * dpr);
        spaceCanvas.style.width = w + 'px';
        spaceCanvas.style.height = h + 'px';

        spaceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // densidade de estrelas baseada na área
        const targetStars = Math.max(180, Math.min(560, Math.floor((w * h) / 7000)));
        const stars = [];
        for (let i = 0; i < targetStars; i++) {
            const r = Math.random();
            const radius = r < 0.82 ? 0.6 : r < 0.97 ? 1.0 : 1.6;
            const depth = 0.25 + Math.random() * 0.95;
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius,
                depth,
                vx: (Math.random() * 2 - 1) * 6 * depth,
                vy: (8 + Math.random() * 18) * depth,
                baseA: 0.25 + Math.random() * 0.65,
                tw: 0.6 + Math.random() * 1.8,
                phase: Math.random() * Math.PI * 2,
            });
        }
        spaceState.stars = stars;

        // agenda primeiro meteoro
        spaceState.nextMeteorAt = performance.now() + (1800 + Math.random() * 3800);
    }

    function spawnMeteor(ts) {
        const w = spaceState.w;
        const h = spaceState.h;

        // nasce fora da tela (topo) e sempre desce
        const goLeft = Math.random() < 0.55;
        const x = goLeft ? w + 80 : -80;
        const y = -60 + Math.random() * (h * 0.28);
        const speed = 1000 + Math.random() * 1100; // px/s
        const angleDeg = goLeft
            ? (140 + Math.random() * 18) // down-left
            : (40 + Math.random() * 18);  // down-right
        const angle = (Math.PI * angleDeg) / 180;

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed; // sin positivo = desce
        const len = 140 + Math.random() * 160;
        const energyScore = speed * len;

        let meteorStrength = 'medium';
        if (energyScore > 480000) meteorStrength = 'strong';
        else if (energyScore < 300000) meteorStrength = 'weak';

        spaceState.meteors.push({
            x,
            y,
            vx,
            vy,
            len,
            life: 0,
            maxLife: 0.65 + Math.random() * 0.35,
            bornAt: ts,
            strength: meteorStrength,
        });

        if (typeof window.__krinHudSpacePulse === 'function') {
            window.__krinHudSpacePulse(meteorStrength);
        }

        // próximo meteoro em alguns segundos
        spaceState.nextMeteorAt = ts + (2200 + Math.random() * 5200);
    }

    function drawSpace(ts) {
        if (!spaceCanvas || !spaceCtx) return;
        if (document.hidden) {
            spaceState.lastTs = ts;
            requestAnimationFrame(drawSpace);
            return;
        }

        const dt = Math.min(0.05, (ts - (spaceState.lastTs || ts)) / 1000);
        spaceState.lastTs = ts;

        const w = spaceState.w;
        const h = spaceState.h;

        spaceCtx.clearRect(0, 0, w, h);

        // base escura
        spaceCtx.fillStyle = '#05050a';
        spaceCtx.fillRect(0, 0, w, h);

        // nebulosa/supernova roxa + toque azul
        const nebula1 = spaceCtx.createRadialGradient(w * 0.68, h * 0.34, 0, w * 0.68, h * 0.34, Math.max(w, h) * 0.65);
        nebula1.addColorStop(0, 'rgba(139,92,246,0.20)');
        nebula1.addColorStop(0.35, 'rgba(139,92,246,0.11)');
        nebula1.addColorStop(1, 'rgba(139,92,246,0)');
        spaceCtx.fillStyle = nebula1;
        spaceCtx.fillRect(0, 0, w, h);

        const nebula2 = spaceCtx.createRadialGradient(w * 0.22, h * 0.18, 0, w * 0.22, h * 0.18, Math.max(w, h) * 0.55);
        nebula2.addColorStop(0, 'rgba(108,231,255,0.10)');
        nebula2.addColorStop(0.4, 'rgba(108,231,255,0.05)');
        nebula2.addColorStop(1, 'rgba(108,231,255,0)');
        spaceCtx.fillStyle = nebula2;
        spaceCtx.fillRect(0, 0, w, h);

        // vinheta para profundidade
        const vignette = spaceCtx.createRadialGradient(w * 0.5, h * 0.52, Math.min(w, h) * 0.18, w * 0.5, h * 0.52, Math.max(w, h) * 0.82);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.62)');
        spaceCtx.fillStyle = vignette;
        spaceCtx.fillRect(0, 0, w, h);

        // estrelas (movimento + twinkle)
        for (const s of spaceState.stars) {
            s.x += s.vx * dt;
            s.y += s.vy * dt;

            if (s.x < -10) s.x = w + 10;
            if (s.x > w + 10) s.x = -10;
            if (s.y > h + 10) s.y = -10;

            const a = s.baseA * (0.70 + 0.30 * Math.sin(ts / 1000 * s.tw + s.phase));
            spaceCtx.globalAlpha = a;
            spaceCtx.fillStyle = 'rgba(255,255,255,1)';
            spaceCtx.beginPath();
            spaceCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            spaceCtx.fill();
        }
        spaceCtx.globalAlpha = 1;

        // meteoro ocasional
        if (ts >= spaceState.nextMeteorAt && spaceState.meteors.length < 2) {
            spawnMeteor(ts);
        }

        // desenha e atualiza meteoros
        const nextMeteors = [];
        for (const m of spaceState.meteors) {
            m.life += dt;
            m.x += m.vx * dt;
            m.y += m.vy * dt;

            const t = Math.min(1, m.life / m.maxLife);
            const alpha = (t < 0.18 ? t / 0.18 : 1) * (t > 0.85 ? (1 - t) / 0.15 : 1);

            // cauda
            const nx = m.vx;
            const ny = m.vy;
            const nLen = Math.hypot(nx, ny) || 1;
            const ux = nx / nLen;
            const uy = ny / nLen;
            const x2 = m.x - ux * m.len;
            const y2 = m.y - uy * m.len;

            const grad = spaceCtx.createLinearGradient(m.x, m.y, x2, y2);
            grad.addColorStop(0, `rgba(255,255,255,${0.90 * alpha})`);
            grad.addColorStop(0.35, `rgba(108,231,255,${0.55 * alpha})`);
            grad.addColorStop(0.75, `rgba(139,92,246,${0.22 * alpha})`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');

            spaceCtx.lineWidth = 2.2;
            spaceCtx.lineCap = 'round';
            spaceCtx.strokeStyle = grad;
            spaceCtx.beginPath();
            spaceCtx.moveTo(m.x, m.y);
            spaceCtx.lineTo(x2, y2);
            spaceCtx.stroke();

            if (m.life < m.maxLife && m.x > -200 && m.y < h + 200) {
                nextMeteors.push(m);
            }
        }
        spaceState.meteors = nextMeteors;

        requestAnimationFrame(drawSpace);
    }

    // ===== Tema =====
    const THEME_KEY = 'krin-theme';
    const themeBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        const next = theme === 'light' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);

        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') || 'dark';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ===== Menu mobile =====
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    function setNavOpen(open) {
        if (!navToggle || !navList) return;
        navList.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');

        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
    }

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            setNavOpen(!navList.classList.contains('open'));
        });

        navList.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            if (window.matchMedia('(max-width: 760px)').matches) setNavOpen(false);
        });
    }

    // ===== Link ativo do menu no scroll =====
    (function runScrollSpy() {
        const trackedLinks = Array.from(document.querySelectorAll('.nav-list a[href^="#"], .footer-links a[href^="#"]'));
        if (trackedLinks.length === 0) return;

        const sectionById = new Map();
        trackedLinks.forEach((link) => {
            const hash = link.getAttribute('href') || '';
            const id = hash.replace('#', '').trim();
            if (!id) return;
            const section = document.getElementById(id);
            if (section) sectionById.set(id, section);
        });

        if (sectionById.size === 0) return;

        const setActiveById = (id) => {
            trackedLinks.forEach((link) => {
                const targetId = (link.getAttribute('href') || '').replace('#', '').trim();
                link.classList.toggle('is-active', targetId === id);
            });
        };

        let currentActiveId = '';
        const observer = new IntersectionObserver(
            (entries) => {
                let bestEntry = null;
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                        bestEntry = entry;
                    }
                }

                if (!bestEntry) return;
                const nextId = bestEntry.target.id;
                if (!nextId || nextId === currentActiveId) return;
                currentActiveId = nextId;
                setActiveById(nextId);
            },
            {
                root: null,
                rootMargin: '-38% 0px -45% 0px',
                threshold: [0.18, 0.32, 0.5, 0.7],
            }
        );

        sectionById.forEach((section) => observer.observe(section));

        trackedLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const id = (link.getAttribute('href') || '').replace('#', '').trim();
                if (!id) return;
                currentActiveId = id;
                setActiveById(id);
            });
        });

        const initialFromHash = (window.location.hash || '').replace('#', '').trim();
        if (initialFromHash && sectionById.has(initialFromHash)) {
            currentActiveId = initialFromHash;
            setActiveById(initialFromHash);
            return;
        }

        const firstId = sectionById.keys().next().value;
        if (firstId) {
            currentActiveId = firstId;
            setActiveById(firstId);
        }
    })();

    // ===== Pré-seleção do nível (tiers) =====
    const form = document.getElementById('diagnostico-form');
    const interesseSelect = form ? form.querySelector('select[name="interesse"]') : null;

    document.querySelectorAll('.tier-cta[data-tier]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const tier = btn.getAttribute('data-tier');
            if (interesseSelect && tier) interesseSelect.value = tier;
        });
    });

    if (spaceCanvas && spaceCtx) {
        resizeSpace();
        window.addEventListener('resize', () => {
            // evita flood em resize
            clearTimeout(window.__spaceResizeTimer);
            window.__spaceResizeTimer = setTimeout(resizeSpace, 120);
        });
        requestAnimationFrame(drawSpace);
    }
});