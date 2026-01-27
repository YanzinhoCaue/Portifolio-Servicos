document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-btn');
    const langOptions = document.querySelectorAll('[data-lang]');
    const html = document.documentElement;
    
    // --- TRANSLATION DATA ---
    const translations = {
        en: {
            nav: { home: "Home", about: "About", solutions: "Expertise", contact: "Contact", cta: "WhatsApp Me", projects: "Projects" },
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
                c4: { title: "Traffic Management", desc: "Solutions for traffic flow management and optimization with advanced technologies." },
                c7: { title: "Business Analysis", desc: "Strategic consulting and in-depth data analysis for business growth." },
                c8: { title: "System Analysis", desc: "Complete evaluation and optimization of systems for maximum operational efficiency." },
                c9: { title: "Q&A Tester", desc: "Complete quality testing and validation of software and application features." },
                c10: { title: "Programmer", desc: "Custom software and application development with best coding practices." },
                c11: { title: "Audiovisual Production", desc: "Creation of high-quality visual content, videos and multimedia productions." },
                c12: { title: "Art Designer", desc: "Creative design and development of visual identity for brands and projects." },
                c13: { title: "Problem Solving", desc: "Rapid diagnosis and resolution of technical and operational issues." },
                c14: { title: "Photography", desc: "Professional photography services for events, products and digital content." },
                c15: { title: "Hardware Infrastructure", desc: "Planning, installation and complete maintenance of hardware infrastructure." }
            },
            innov: { title1: "THE HYBRID", title2: "WORKER", desc: "Krin Tech is not just a software house. We are hands-on problem solvers. From coding complex algorithms to fixing physical hardware on-site." },
            projects: { 
                title: "OUR PROJECTS", viewProject: "View Project", 
                p1: { desc: "Complete digital menu system for restaurants with real-time order management and modern interface." },
                traffic: { title: "Traffic Management", desc: "Strategic campaigns and ROI optimization for digital ads." },
                business: { title: "Business Analysis", desc: "Market insights and data-driven decisions for growth." },
                marketing: { title: "Marketing & Analytics", desc: "Complete digital marketing solutions with traffic management, conversion optimization, and detailed business analysis for strategic growth." },
                artdesign: { title: "Art Design", desc: "Creative visual concepts and illustrations." },
                branding: { title: "Brand Design", desc: "Complete visual identity and brand strategy." },
                photography: { title: "Photography", desc: "Professional product and corporate photography." },
                design: { title: "Design & Visual Identity", desc: "From concept to final product: art design, brand identity, and professional photography to elevate your visual presence." },
                webdesign: { title: "Web Design", desc: "Modern and responsive interface design." },
                programming: { title: "Programming", desc: "Full-stack development and custom solutions." },
                cybersec: { title: "Cyber Security", desc: "Protection and vulnerability assessment." },
                tech: { title: "Technology & Development", desc: "Complete web development solutions with modern design, robust programming, and security protocols to protect your digital assets." },
                socialmedia: { title: "Social Media", desc: "Content strategy and community management." },
                videoediting: { title: "Video Editing", desc: "Professional video production and editing." },
                content: { title: "Content & Media", desc: "Engaging social media strategies and high-quality video production to amplify your brand's message and reach your audience." },
                comingsoon: "Coming Soon",
                benotified: "Be Notified"
            },
            cta: { title: "Have a project or problem?", highlight: "Let's Fix It.", desc: "Software or Hardware, we are ready.", btn: "Contact via WhatsApp" }
        },
        pt: {
            nav: { home: "Início", about: "Sobre", solutions: "Serviços", contact: "Contato", cta: "WhatsApp", projects: "Projetos" },
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
                c4: { title: "Gestão de Tráfego", desc: "Soluções de gerenciamento e otimização de fluxo de tráfego com tecnologias avançadas." },
                c7: { title: "Análise de Negócios", desc: "Consultoria estratégica e análise profunda de dados para crescimento empresarial." },
                c8: { title: "Análise de Sistemas", desc: "Avaliação completa e otimização de sistemas para máxima eficiência operacional." },
                c9: { title: "Q&A Tester", desc: "Testes completos de qualidade e validação de funcionalidades em software e aplicações." },
                c10: { title: "Programador", desc: "Desenvolvimento customizado de software e aplicações com as melhores práticas de codificação." },
                c11: { title: "Produção de Audiovisuais", desc: "Criação de conteúdo visual de alta qualidade, vídeos e produções multimídia." },
                c12: { title: "Art Designer", desc: "Design criativo e desenvolvimento de identidade visual para marcas e projetos." },
                c13: { title: "Solução de Problemas", desc: "Diagnóstico e resolução rápida de problemas técnicos e operacionais." },
                c14: { title: "Fotografia", desc: "Serviços profissionais de fotografia para eventos, produtos e conteúdo digital." },
                c15: { title: "Infraestrutura de Hardwares", desc: "Planejamento, instalação e manutenção completa de infraestrutura de hardwares." }
            },
            innov: { title1: "O PROFISSIONAL", title2: "HÍBRIDO", desc: "A Krin Tech não é apenas uma software house. Somos solucionadores de problemas. Desde codificar algoritmos complexos até consertar hardware no local." },
            projects: { 
                title: "NOSSOS PROJETOS", viewProject: "Ver Projeto", 
                p1: { desc: "Sistema completo de cardápio digital para restaurantes com gestão de pedidos em tempo real e interface moderna." },
                traffic: { title: "Gestão de Tráfego", desc: "Campanhas estratégicas e otimização de ROI em anúncios digitais." },
                business: { title: "Análise de Negócios", desc: "Insights de mercado e decisões baseadas em dados para crescimento." },
                marketing: { title: "Marketing & Análises", desc: "Soluções completas de marketing digital com gestão de tráfego, otimização de conversão e análise detalhada de negócios para crescimento estratégico." },
                artdesign: { title: "Art Design", desc: "Conceitos visuais criativos e ilustrações." },
                branding: { title: "Design de Marcas", desc: "Identidade visual completa e estratégia de marca." },
                photography: { title: "Fotografia", desc: "Fotografia profissional de produtos e corporativa." },
                design: { title: "Design & Identidade Visual", desc: "Do conceito ao produto final: art design, identidade de marca e fotografia profissional para elevar sua presença visual." },
                webdesign: { title: "Web Design", desc: "Design de interface moderno e responsivo." },
                programming: { title: "Programação", desc: "Desenvolvimento full-stack e soluções personalizadas." },
                cybersec: { title: "Segurança Cibernética", desc: "Proteção e avaliação de vulnerabilidades." },
                tech: { title: "Tecnologia & Desenvolvimento", desc: "Soluções completas de desenvolvimento web com design moderno, programação robusta e protocolos de segurança para proteger seus ativos digitais." },
                socialmedia: { title: "Redes Sociais", desc: "Estratégia de conteúdo e gestão de comunidade." },
                videoediting: { title: "Edição de Vídeo", desc: "Produção e edição profissional de vídeos." },
                content: { title: "Conteúdo & Mídia", desc: "Estratégias envolventes de mídia social e produção de vídeo de alta qualidade para amplificar a mensagem da sua marca e alcançar seu público." },
                comingsoon: "Em Breve",
                benotified: "Seja Notificado"
            },
            cta: { title: "Tem um projeto ou problema?", highlight: "Vamos Resolver.", desc: "Software ou Hardware, estamos prontos.", btn: "Chamar no WhatsApp" }
        },
        es: {
            nav: { home: "Inicio", about: "Sobre", solutions: "Servicios", contact: "Contacto", cta: "WhatsApp", projects: "Proyectos" },
            hero: { title: "MÁS ALLÁ DEL CÓDIGO.", subtitle: "DEFINIENDO EL", highlight: "FUTURO", desc: "El puente entre Software de Alto Nivel e Infraestructura Física. Desarrollo Full-Stack y Soporte Técnico.", btn1: "Iniciar Proyecto", btn2: "Servicios" },
            solutions: { title: "NUESTRA EXPERIENCIA", c1: { title: "Desarrollo Web", desc: "Sitios de alto rendimiento con React.js." }, c2: { title: "Redes y Conectividad", desc: "Configuración de Wi-Fi y Starlink." }, c3: { title: "Seguridad", desc: "Cámaras IP y monitoreo." }, c4: { title: "Gestión de Tráfico", desc: "Soluciones avanzadas de gestión de tráfico." }, c7: { title: "Análisis de Negocios", desc: "Consultoría y análisis de datos." }, c8: { title: "Análisis de Sistemas", desc: "Evaluación y optimización de sistemas." }, c9: { title: "Q&A Tester", desc: "Pruebas de calidad completas." }, c10: { title: "Programador", desc: "Desarrollo personalizado de software." }, c11: { title: "Producción Audiovisual", desc: "Contenido visual y producción multimedia." }, c12: { title: "Diseñador de Arte", desc: "Diseño creativo e identidad visual." }, c13: { title: "Solución de Problemas", desc: "Diagnóstico y resolución rápida." }, c14: { title: "Fotografía", desc: "Servicios fotográficos profesionales." }, c15: { title: "Infraestructura de Hardware", desc: "Planificación e instalación de hardware." } },
            innov: { title1: "EL TRABAJADOR", title2: "HÍBRIDO", desc: "Solucionamos problemas reales. Desde el código hasta el hardware." },
            projects: { 
                title: "NUESTROS PROYECTOS", viewProject: "Ver Proyecto", 
                p1: { desc: "Sistema completo de menú digital para restaurantes con gestión de pedidos en tiempo real e interfaz moderna." },
                traffic: { title: "Gestión de Tráfico", desc: "Campañas estratégicas y optimización de ROI en anuncios digitales." },
                business: { title: "Análisis de Negocios", desc: "Insights de mercado y decisiones basadas en datos." },
                marketing: { title: "Marketing y Análisis", desc: "Soluciones completas de marketing digital con gestión de tráfico, optimización de conversión y análisis detallado de negocios." },
                artdesign: { title: "Diseño Artístico", desc: "Conceptos visuales creativos e ilustraciones." },
                branding: { title: "Diseño de Marca", desc: "Identidad visual completa y estrategia de marca." },
                photography: { title: "Fotografía", desc: "Fotografía profesional de productos y corporativa." },
                design: { title: "Diseño e Identidad Visual", desc: "Del concepto al producto final: diseño artístico, identidad de marca y fotografía profesional." },
                webdesign: { title: "Diseño Web", desc: "Diseño de interfaz moderno y responsivo." },
                programming: { title: "Programación", desc: "Desarrollo full-stack y soluciones personalizadas." },
                cybersec: { title: "Seguridad Cibernética", desc: "Protección y evaluación de vulnerabilidades." },
                tech: { title: "Tecnología y Desarrollo", desc: "Soluciones completas de desarrollo web con diseño moderno, programación robusta y protocolos de seguridad." },
                socialmedia: { title: "Redes Sociales", desc: "Estrategia de contenido y gestión de comunidad." },
                videoediting: { title: "Edición de Video", desc: "Producción y edición profesional de videos." },
                content: { title: "Contenido y Medios", desc: "Estrategias atractivas de redes sociales y producción de video de alta calidad." },
                comingsoon: "Próximamente",
                benotified: "Sé Notificado"
            },
            cta: { title: "¿Tienes un proyecto?", highlight: "Resolvámoslo.", desc: "Software o Hardware.", btn: "WhatsApp" }
        },
        fr: {
            nav: { home: "Accueil", about: "À Propos", solutions: "Services", contact: "Contact", cta: "WhatsApp", projects: "Projets" },
            hero: { title: "AU-DELÀ DU CODE.", subtitle: "DÉFINIR LE", highlight: "FUTUR", desc: "Le pont entre le logiciel et l'infrastructure physique. Développement Full-Stack et Support Technique.", btn1: "Lancer Projet", btn2: "Services" },
            solutions: { title: "NOTRE EXPERTISE", c1: { title: "Dév Web", desc: "Sites performants avec React.js." }, c2: { title: "Réseaux", desc: "Configuration Wi-Fi et Starlink." }, c3: { title: "Sécurité", desc: "Caméras IP et surveillance." }, c4: { title: "Gestion du Trafic", desc: "Solutions avancées de gestion." }, c7: { title: "Analyse d'Affaires", desc: "Consulting et analyse données." }, c8: { title: "Analyse Systèmes", desc: "Évaluation et optimisation." }, c9: { title: "Q&A Tester", desc: "Tests de qualité complets." }, c10: { title: "Programmeur", desc: "Développement logiciel sur mesure." }, c11: { title: "Production Audiovisuelle", desc: "Contenu visuel et multimedia." }, c12: { title: "Créatif Design", desc: "Design créatif et identité visuelle." }, c13: { title: "Résolution Problèmes", desc: "Diagnostic et résolution rapide." }, c14: { title: "Photographie", desc: "Services photographiques pros." }, c15: { title: "Infrastructure Hardware", desc: "Planification et installation hardware." } },
            innov: { title1: "LE TRAVAILLEUR", title2: "HYBRIDE", desc: "Nous résolvons des problèmes réels. Du code au matériel." },
            projects: { 
                title: "NOS PROJETS", viewProject: "Voir le Projet", 
                p1: { desc: "Système de menu numérique complet pour restaurants avec gestion des commandes en temps réel." },
                traffic: { title: "Gestion du Trafic", desc: "Campagnes stratégiques et optimisation du ROI." },
                business: { title: "Analyse d'Affaires", desc: "Insights marché et décisions basées sur les données." },
                marketing: { title: "Marketing et Analyses", desc: "Solutions complètes de marketing digital avec gestion du trafic et analyse détaillée." },
                artdesign: { title: "Design Artistique", desc: "Concepts visuels créatifs et illustrations." },
                branding: { title: "Design de Marque", desc: "Identité visuelle complète et stratégie de marque." },
                photography: { title: "Photographie", desc: "Photographie professionnelle de produits et d'entreprise." },
                design: { title: "Design et Identité Visuelle", desc: "Du concept au produit final: design artistique, identité de marque et photographie professionnelle." },
                webdesign: { title: "Web Design", desc: "Design d'interface moderne et responsive." },
                programming: { title: "Programmation", desc: "Développement full-stack et solutions personnalisées." },
                cybersec: { title: "Cybersécurité", desc: "Protection et évaluation des vulnérabilités." },
                tech: { title: "Technologie et Développement", desc: "Solutions complètes de développement web avec design moderne et protocoles de sécurité." },
                socialmedia: { title: "Réseaux Sociaux", desc: "Stratégie de contenu et gestion de communauté." },
                videoediting: { title: "Montage Vidéo", desc: "Production et montage vidéo professionnels." },
                content: { title: "Contenu et Médias", desc: "Stratégies engageantes de médias sociaux et production vidéo de haute qualité." },
                comingsoon: "À Venir",
                benotified: "Soyez Notifié"
            },
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

    // --- CAROUSEL FUNCTIONALITY ---
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });

    // Initialize first slide
    showSlide(0);

    // Auto-play carousel (opcional - comente se não quiser)
    // setInterval(nextSlide, 5000);
});