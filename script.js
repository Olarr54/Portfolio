/* ============================================
    OLA ROTIMI PORTFOLIO — SCRIPT.JS
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ CUSTOM CURSOR ============
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursor) { 
            cursor.style.left = mouseX + 'px'; 
            cursor.style.top = mouseY + 'px'; 
        }
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        if (trail) { 
            trail.style.left = trailX + 'px'; 
            trail.style.top = trailY + 'px'; 
        }
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    document.querySelectorAll('a, button, .info-card, .case-card, .contact-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            if (trail) trail.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            if (trail) trail.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // ============ LOADER ============
    const bootLineIds = ['b1','b2','b3','b4','b5','b6','b7'];
    const loaderFill = document.getElementById('loaderFill');
    const loaderPct = document.getElementById('loaderPct');
    const loaderEl = document.getElementById('loader');
    let currentLine = 0;
    let pct = 0;

    document.body.style.overflow = 'hidden';

    function animatePct(target) {
        const start = pct;
        const startTime = performance.now();
        function step(now) {
            const progress = Math.min((now - startTime) / 300, 1);
            pct = Math.round(start + (target - start) * progress);
            if (loaderFill) loaderFill.style.width = pct + '%';
            if (loaderPct) loaderPct.textContent = pct + '%';
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function showNextLine() {
        if (currentLine < bootLineIds.length) {
            const lineEl = document.getElementById(bootLineIds[currentLine]);
            if (lineEl) lineEl.classList.add('show');
            currentLine++;
            animatePct(Math.round((currentLine / bootLineIds.length) * 100));
            const delay = currentLine === 6 ? 800 : 420;
            setTimeout(showNextLine, delay);
        } else {
            setTimeout(() => {
                if (loaderEl) loaderEl.classList.add('fade-out');
                document.body.style.overflow = 'visible';
                setTimeout(() => {
                    if (loaderEl) loaderEl.style.display = 'none';
                    triggerHeroAnimations();
                }, 600);
            }, 900);
        }
    }

    setTimeout(showNextLine, 400);

    // ============ HERO ANIMATIONS ============
    function triggerHeroAnimations() {
        document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
        });
        startCounters();
    }

    function startCounters() {
        document.querySelectorAll('.stat-num').forEach(el => {
            const target = parseInt(el.dataset.target) || 0;
            let count = 0;
            const inc = target / 40;
            const timer = setInterval(() => {
                count += inc;
                if (count >= target) { 
                    el.textContent = target; 
                    clearInterval(timer); 
                } else {
                    el.textContent = Math.floor(count);
                }
            }, 30);
        });
    }

    // ============ SCROLL REVEAL ============
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => entry.target.classList.add('visible'), delay);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // ============ NAV SCROLL & ACTIVE LINK ============
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === '#' + id ? 'var(--blue)' : '';
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    // ============ SKILL TAGS STAGGER ============
    document.querySelectorAll('.skill-tags span').forEach((tag, i) => {
        tag.style.transitionDelay = (i * 30) + 'ms';
    });

    // ============ BRAIN DRAWING ============
    const brainPaths = document.querySelectorAll('.brain-path');
    const brainSparks = document.querySelectorAll('.brain-spark');
    const brainLabels = document.querySelectorAll('.brain-label');
    const brainCaption = document.getElementById('brainCaption');
    let brainAnimated = false;

    const captions = [
        'drawing the outer structure...',
        'adding the folds...',
        'neurons connecting...',
        'ideas lighting up...',
        'brain: online ✓'
    ];

    function animateBrain() {
        if (brainAnimated) return;
        brainAnimated = true;

        brainPaths.forEach(path => {
            const len = path.getTotalLength();
            path.style.strokeDasharray = len;
            path.style.strokeDashoffset = len;
            path.classList.add('drawn'); // Trigger the CSS transition
        });

        if (brainCaption) brainCaption.textContent = captions[0];
        
        setTimeout(() => { if (brainCaption) brainCaption.textContent = captions[1]; }, 1000);
        
        setTimeout(() => {
            if (brainCaption) brainCaption.textContent = captions[2];
            brainSparks.forEach((spark, i) => {
                setTimeout(() => spark.classList.add('lit'), i * 200);
            });
        }, 2500);

        setTimeout(() => {
            if (brainCaption) brainCaption.textContent = captions[3];
            brainLabels.forEach((lbl, i) => {
                setTimeout(() => lbl.classList.add('visible-label'), i * 150);
            });
        }, 3500);

        setTimeout(() => { if (brainCaption) brainCaption.textContent = captions[4]; }, 4500);
    }

    const thinkingSection = document.getElementById('thinking');
    if (thinkingSection) {
        const brainObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) animateBrain();
        }, { threshold: 0.2 });
        brainObserver.observe(thinkingSection);
    }

    // ============ GROWTH CHART ============
    const chartLine = document.getElementById('chartLine');
    const chartFill = document.getElementById('chartFill');
    let chartAnimated = false;

    const chartPoints = [
        { x: 80,  y: 340 },
        { x: 310, y: 260 },
        { x: 580, y: 155 },
        { x: 820, y: 60  }
    ];

    function lerp(a, b, t) { return a + (b - a) * t; }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function animateChart() {
        if (chartAnimated || !chartLine || !chartFill) return;
        chartAnimated = true;

        const totalDuration = 1800;
        const startTime = performance.now();
        const totalSegments = chartPoints.length - 1;

        function step(now) {
            const easedProgress = easeOut(Math.min((now - startTime) / totalDuration, 1));
            const rawIndex = easedProgress * totalSegments;
            const segIndex = Math.min(Math.floor(rawIndex), totalSegments - 1);
            const segProgress = rawIndex - segIndex;

            let pts = [];
            for (let i = 0; i <= segIndex; i++) {
                pts.push(`${chartPoints[i].x},${chartPoints[i].y}`);
            }
            if (segIndex < totalSegments) {
                const cx = lerp(chartPoints[segIndex].x, chartPoints[segIndex+1].x, segProgress);
                const cy = lerp(chartPoints[segIndex].y, chartPoints[segIndex+1].y, segProgress);
                pts.push(`${cx.toFixed(1)},${cy.toFixed(1)}`);
            }

            chartLine.setAttribute('points', pts.join(' '));
            const lastX = pts[pts.length-1].split(',')[0];
            chartFill.setAttribute('points', pts.concat([`${lastX},400`, '80,400']).join(' '));
            chartFill.setAttribute('opacity', '1');

            chartPoints.forEach((pt, i) => {
                const threshold = i / totalSegments;
                if (easedProgress >= threshold) {
                    const dot = document.getElementById('cd' + (i+1));
                    const tooltip = document.getElementById('ct' + (i+1));
                    if (dot) dot.setAttribute('opacity', '1');
                    if (tooltip && easedProgress >= threshold + 0.05) tooltip.setAttribute('opacity', '1');
                }
            });

            if (easedProgress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

  // ============ GROWTH CHART ROBUST TRIGGER ============
const journeySection = document.getElementById('journey');

if (journeySection) {
    const startChartIfVisible = (entries, observer) => {
        entries.forEach(entry => {
            // Trigger if the section is 10% visible
            if (entry.isIntersecting) {
                setTimeout(animateChart, 300);
                // Once it starts, stop watching so it doesn't repeat
                observer.unobserve(entry.target);
            }
        });
    };

    const chartObserver = new IntersectionObserver(startChartIfVisible, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it hits the viewport
    });

    chartObserver.observe(journeySection);

    // FALLBACK: If the page loads and we are already at the bottom
    // this force-starts the animation after the loader is gone.
    setTimeout(() => {
        const rect = journeySection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !chartAnimated) {
            animateChart();
        }
    }, 2000); // Wait for loader to clear
}

    // ============ STAGGER INFO CARDS ============
    document.querySelectorAll('.info-card').forEach((card, i) => {
        if (!card.dataset.delay) card.dataset.delay = i * 100;
    });

    console.log('%c OLA_ROTIMI.SYS LOADED SUCCESSFULLY ', 'background: #0B1FF5; color: #FFE600; font-family: monospace; padding: 8px 16px; font-size: 14px;');

});