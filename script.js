document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-btn');
    const langOptions = document.querySelectorAll('[data-lang]');
    const html = document.documentElement;
    
    // --- TRANSLATION DATA ---
    const translations = {
        en: {
            nav: { home: "Home", about: "About", solutions: "Expertise", contact: "Contact", cta: "WhatsApp Me" },
            hero: { 
                title: "BEYOND CODE.", subtitle: "DEFINING THE", highlight: "FUTURE", 
                desc: "Bridging the gap between High-End Software and Physical Infrastructure. We provide Full-Stack Development, Farm Automation, and Technical Support.",
                btn1: "Start Project", btn2: "Our Services"
            },
            solutions: {
                title: "OUR EXPERTISE",
                c1: { title: "Web Development", desc: "High-performance websites and applications using React.js, Next.js, and Modern CSS." },
                c2: { title: "Network & Connectivity", desc: "Complete setup of Farm/Office Wi-Fi, VoIP systems, and Starlink integration for remote areas." },
                c3: { title: "Security Systems", desc: "Installation and configuration of CCTV, IP Cameras, and remote monitoring systems." },
                c4: { title: "Solar Energy Tech", desc: "Technical support, maintenance, and setup of solar panel systems and energy monitoring dashboards." },
                c5: { title: "Process Automation", desc: "Custom scripts and bots to automate daily tasks, data entry, and job applications." },
                c6: { title: "Management Systems", desc: "Implementation and support for ERPs and inventory control systems." }
            },
            innov: { title1: "THE HYBRID", title2: "WORKER", desc: "Krin Tech is not just a software house. We are hands-on problem solvers. From coding complex algorithms to fixing physical hardware on-site." },
            cta: { title: "Have a project or problem?", highlight: "Let's Fix It.", desc: "Software or Hardware, we are ready.", btn: "Contact via WhatsApp" }
        },
        pt: {
            nav: { home: "Início", about: "Sobre", solutions: "Serviços", contact: "Contato", cta: "WhatsApp" },
            hero: { 
                title: "ALÉM DO CÓDIGO.", subtitle: "DEFININDO O", highlight: "FUTURO", 
                desc: "A ponte entre Software de Alto Nível e Infraestrutura Física. Oferecemos Desenvolvimento Full-Stack, Automação Rural e Suporte Técnico.",
                btn1: "Iniciar Projeto", btn2: "Nossos Serviços"
            },
            solutions: {
                title: "NOSSA EXPERTISE",
                c1: { title: "Desenvolvimento Web", desc: "Sites e aplicações de alta performance usando React.js, Next.js e CSS Moderno." },
                c2: { title: "Redes & Conectividade", desc: "Configuração completa de Wi-Fi Rural/Escritório, VoIP e integração Starlink." },
                c3: { title: "Sistemas de Segurança", desc: "Instalação e configuração de CFTV, Câmeras IP e sistemas de monitoramento remoto." },
                c4: { title: "Tecnologia Solar", desc: "Suporte técnico, manutenção e configuração de sistemas de painéis solares." },
                c5: { title: "Automação de Processos", desc: "Scripts e bots personalizados para automatizar tarefas diárias e preenchimento de dados." },
                c6: { title: "Sistemas de Gestão", desc: "Implementação e suporte para ERPs e controle de estoque/almoxarifado." }
            },
            innov: { title1: "O PROFISSIONAL", title2: "HÍBRIDO", desc: "A Krin Tech não é apenas uma software house. Somos solucionadores de problemas. Desde codificar algoritmos complexos até consertar hardware no local." },
            cta: { title: "Tem um projeto ou problema?", highlight: "Vamos Resolver.", desc: "Software ou Hardware, estamos prontos.", btn: "Chamar no WhatsApp" }
        },
        es: {
            nav: { home: "Inicio", about: "Sobre", solutions: "Servicios", contact: "Contacto", cta: "WhatsApp" },
            hero: { title: "MÁS ALLÁ DEL CÓDIGO.", subtitle: "DEFINIENDO EL", highlight: "FUTURO", desc: "El puente entre Software de Alto Nivel e Infraestructura Física. Desarrollo Full-Stack y Soporte Técnico.", btn1: "Iniciar Proyecto", btn2: "Servicios" },
            solutions: { title: "NUESTRA EXPERIENCIA", c1: { title: "Desarrollo Web", desc: "Sitios de alto rendimiento con React.js." }, c2: { title: "Redes y Conectividad", desc: "Configuración de Wi-Fi y Starlink." }, c3: { title: "Seguridad", desc: "Cámaras IP y monitoreo." }, c4: { title: "Energía Solar", desc: "Mantenimiento y soporte técnico." }, c5: { title: "Automatización", desc: "Scripts y bots personalizados." }, c6: { title: "Sistemas de Gestión", desc: "ERP y control de inventario." } },
            innov: { title1: "EL TRABAJADOR", title2: "HÍBRIDO", desc: "Solucionamos problemas reales. Desde el código hasta el hardware." },
            cta: { title: "¿Tienes un proyecto?", highlight: "Resolvámoslo.", desc: "Software o Hardware.", btn: "WhatsApp" }
        },
        fr: {
            nav: { home: "Accueil", about: "À Propos", solutions: "Services", contact: "Contact", cta: "WhatsApp" },
            hero: { title: "AU-DELÀ DU CODE.", subtitle: "DÉFINIR LE", highlight: "FUTUR", desc: "Le pont entre le logiciel et l'infrastructure physique. Développement Full-Stack et Support Technique.", btn1: "Lancer Projet", btn2: "Services" },
            solutions: { title: "NOTRE EXPERTISE", c1: { title: "Dév Web", desc: "Sites performants avec React.js." }, c2: { title: "Réseaux", desc: "Configuration Wi-Fi et Starlink." }, c3: { title: "Sécurité", desc: "Caméras IP et surveillance." }, c4: { title: "Énergie Solaire", desc: "Maintenance technique." }, c5: { title: "Automatisation", desc: "Scripts et bots." }, c6: { title: "Gestion", desc: "ERP et inventaire." } },
            innov: { title1: "LE TRAVAILLEUR", title2: "HYBRIDE", desc: "Nous résolvons des problèmes réels. Du code au matériel." },
            cta: { title: "Avez-vous un projet?", highlight: "Réparons-le.", desc: "Logiciel ou Matériel.", btn: "WhatsApp" }
        }
    };

    // --- THEME & LANG LOGIC ---
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('krin-theme', theme);
        const icon = themeBtn.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    const savedTheme = localStorage.getItem('krin-theme') || 'dark';
    setTheme(savedTheme);
    themeBtn.addEventListener('click', () => setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

    function setLanguage(lang) {
        localStorage.setItem('krin-lang', lang);
        langBtn.innerHTML = `${lang.toUpperCase()} <i class="fas fa-chevron-down"></i>`;
        const data = translations[lang];
        document.querySelectorAll('[data-translate]').forEach(el => {
            const keys = el.getAttribute('data-translate').split('.');
            let val = data;
            keys.forEach(k => val = val ? val[k] : null);
            if (val) el.textContent = val;
        });
    }
    const savedLang = localStorage.getItem('krin-lang') || 'en';
    setLanguage(savedLang);
    langOptions.forEach(opt => opt.addEventListener('click', (e) => { e.preventDefault(); setLanguage(opt.getAttribute('data-lang')); }));

    // --- ANIMATIONS ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); menuToggle.querySelector('i').classList.toggle('fa-bars'); menuToggle.querySelector('i').classList.toggle('fa-times'); });
    
    const canvas = document.getElementById('tech-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); };
    class Particle {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2 + 0.5; this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * 0.5 - 0.25; }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; }
        draw() { ctx.fillStyle = '#00E5FF'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    function initParticles() { particlesArray = []; const num = (canvas.width * canvas.height) / 10000; for (let i = 0; i < num; i++) particlesArray.push(new Particle()); }
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
    window.addEventListener('resize', resizeCanvas); resizeCanvas(); animate();

    const revealElements = document.querySelectorAll('.scroll-reveal');
    window.addEventListener('scroll', () => {
        const h = window.innerHeight;
        revealElements.forEach(el => { if (el.getBoundingClientRect().top < h - 100) el.classList.add('active'); });
    });
});