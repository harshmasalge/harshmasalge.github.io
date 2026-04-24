/* ========================================
   AI Portfolio — JavaScript
   Neural Network Background + Interactions
   ======================================== */

(function () {
    "use strict";

    // ── Neural Network Canvas Background ──
    const canvas = document.getElementById("neural-bg");
    const ctx = canvas.getContext("2d");
    let nodes = [];
    let mouse = { x: -9999, y: -9999 };
    const NODE_COUNT_DESKTOP = 80;
    const NODE_COUNT_MOBILE = 40;
    const CONNECTION_DIST = 160;
    const MOUSE_DIST = 200;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function getNodeCount() {
        return window.innerWidth < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    }

    function initNodes() {
        nodes = [];
        const count = getNodeCount();
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
            });
        }
    }

    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes + mouse glow
        for (const node of nodes) {
            // Mouse interaction glow
            const mx = node.x - mouse.x;
            const my = node.y - mouse.y;
            const mDist = Math.sqrt(mx * mx + my * my);
            let glow = 0;
            if (mDist < MOUSE_DIST) {
                glow = 1 - mDist / MOUSE_DIST;
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + glow * 2, 0, Math.PI * 2);
            const r = Math.round(139 * glow);
            const g = Math.round(92 + 120 * (1 - glow));
            const b = Math.round(246 * glow + 255 * (1 - glow));
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.4 + glow * 0.6})`;
            ctx.fill();

            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        }

        requestAnimationFrame(drawNetwork);
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        initNodes();
    });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    resizeCanvas();
    initNodes();
    drawNetwork();

    // ── Typewriter Effect ──
    const typewriterEl = document.getElementById("typewriter");
    const phrases = [
        "Building Intelligent Systems.",
        "Deep Learning Enthusiast.",
        "Agentic AI Explorer.",
        "MLOps & Deployment.",
        "IIT Gandhinagar '28.",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typewrite() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typewrite, 400);
                return;
            }
            setTimeout(typewrite, 35);
        } else {
            typewriterEl.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typewrite, 1800);
                return;
            }
            setTimeout(typewrite, 70);
        }
    }
    setTimeout(typewrite, 1000);

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // ── Mobile Nav Toggle ──
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navLinks.classList.toggle("open");
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navLinks.classList.remove("open");
        });
    });

    // ── Scroll Reveal (Intersection Observer) ──
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
})();
