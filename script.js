// Countdown Timer
function initCountdown() {
    // Termine: 30 Ottobre 2025 alle 15:30 (ora locale)
    const targetDate = new Date('2025-10-30T15:30:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Countdown finished
            document.querySelectorAll('.countdown-number').forEach(el => {
                el.textContent = '00';
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const countdownNumbers = document.querySelectorAll('.countdown-number');
        if (countdownNumbers.length >= 4) {
            countdownNumbers[0].textContent = days.toString().padStart(2, '0');
            countdownNumbers[1].textContent = hours.toString().padStart(2, '0');
            countdownNumbers[2].textContent = minutes.toString().padStart(2, '0');
            countdownNumbers[3].textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gallery navigation
function initGallery() {
    const leftNav = document.querySelector('.gallery-nav-left');
    const rightNav = document.querySelector('.gallery-nav-right');
    const screenshotMain = document.querySelector('.screenshot-main');
    const currentSlide = document.querySelector('.current-slide');
    const totalSlides = document.querySelector('.total-slides');
    
    // Array of media items (images and video)
    const mediaItems = [
        { type: 'image', src: 'ss_215a2a14e57ca970977f4d2e7efa8c917d530f65.600x338.jpg', alt: 'Backrooms Screenshot 1' },
        { type: 'image', src: 'ss_9d66abfd2bb42421430e279b88c7282b8474b77c.600x338.jpg', alt: 'Backrooms Screenshot 2' },
        { type: 'image', src: 'ss_bc5031e736f439ab19f9aa0d49e00f82fdb56dda.600x338.jpg', alt: 'Backrooms Screenshot 3' },
        { type: 'image', src: 'ss_d8baa5ef875e60df3dffdb76ee2d268fcd6d62b4.600x338.jpg', alt: 'Backrooms Screenshot 4' },
        { type: 'image', src: 'ss_e9d4de2d1ad1faaaebca5114006e7885e1ab884a.600x338.jpg', alt: 'Backrooms Screenshot 5' },
        { type: 'video', src: 'https://www.youtube.com/embed/tu8uCkTr008', title: 'Backrooms Lost Dimension - Gameplay Trailer' }
    ];
    
    let currentIndex = 0;
    
    function updateMedia() {
        if (!screenshotMain) return;
        
        const currentItem = mediaItems[currentIndex];
        
        // Clear existing content
        screenshotMain.innerHTML = '';
        
        if (currentItem.type === 'image') {
            const img = document.createElement('img');
            img.src = currentItem.src;
            img.alt = currentItem.alt;
            img.className = 'screenshot-image';
            
            // Add error handling for images
            img.onerror = function() {
                console.log('Image failed to load:', currentItem.src);
                // Fallback to a placeholder or default image
                this.src = 'https://via.placeholder.com/800x450/1a1a1a/ffffff?text=Backrooms+Screenshot';
            };
            
            screenshotMain.appendChild(img);
        } else if (currentItem.type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = currentItem.src;
            iframe.title = currentItem.title;
            iframe.className = 'screenshot-video';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            screenshotMain.appendChild(iframe);
        }
        
        // Update counter
        if (currentSlide) currentSlide.textContent = currentIndex + 1;
        if (totalSlides) totalSlides.textContent = mediaItems.length;
    }
    
    if (leftNav) {
        leftNav.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            updateMedia();
        });
    }
    
    if (rightNav) {
        rightNav.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % mediaItems.length;
            updateMedia();
        });
    }
    
    // Initialize
    updateMedia();
}

// Button interactions
function initButtonInteractions() {
    // Nessun popup: i link aprono direttamente le pagine (CTA già sono <a>)
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Mobile menu toggle (for responsive design)
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-nav');
    const langDesktop = document.getElementById('lang-select');
    const langMobile = document.getElementById('lang-select-mobile');

    if (!toggle || !drawer) return;

    // sync lingua tra desktop e mobile
    const saved = localStorage.getItem('lang') || 'en';
    if (langMobile) langMobile.value = saved;
    if (langDesktop) langDesktop.value = saved;

    function openDrawer() {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        if (drawer.classList.contains('open')) closeDrawer(); else openDrawer();
    });

    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
    });

    // chiudi toccando fuori dal contenuto del drawer
    const content = drawer.querySelector('.mobile-nav-content');
    if (content) {
        content.addEventListener('click', (e) => e.stopPropagation());
    }

    // chiudi il menu quando si clicca su un link (tranne il selettore lingua)
    const mobileLinks = drawer.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    // cambia lingua dal menu mobile
    if (langMobile) {
        langMobile.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('lang', lang);
            if (langDesktop) langDesktop.value = lang;
            // riapplica subito le traduzioni
            const event = new Event('change');
            if (langDesktop) langDesktop.dispatchEvent(event);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initSmoothScrolling();
    initGallery();
    initButtonInteractions();
    initHeaderScroll();
    initScrollAnimations();
    initMobileMenu();
    initI18n();
    
    console.log('Backrooms Lost Dimension website initialized!');
});

// Add some visual effects
function addVisualEffects() {
    // Hover effects sui pulsanti (parallax rimosso per mantenere la hero fissa)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize visual effects
addVisualEffects();

// ==========================
// Internationalization (i18n)
// ==========================
function initI18n() {
    const strings = {
        en: {
            'nav.home': 'Home',
            'nav.privacy': 'Privacy Policy',
            'btn.wishlistSteam': 'Wishlist on Steam',
            'btn.wishlistEpic': 'Wishlist on Epic',
            'cta.watchTrailer': 'Watch Trailer',
            'hero.subtitle': 'A Single-Player Horror Adventure',
            'hero.description': 'Explore unsettling levels, solve unique puzzles, and survive terrifying encounters while following an original story. Free content updates with new levels will expand the experience and keep the nightmare evolving.',
            'release.title': 'Epic Games Store Release',
            'release.exclusiveLine': 'October 30, 2025 • 6-month Epic Games Store exclusive',
            'release.steamLine': 'Steam release: May 1, 2026',
            'countdown.days': 'Days',
            'countdown.hours': 'Hours',
            'countdown.minutes': 'Minutes',
            'countdown.seconds': 'Seconds',
            'features.title': 'Game Features',
            'features.subtitle': 'Immerse yourself in a terrifying world filled with mysteries, puzzles, and endless corridors',
            'features.immersion.title': 'Immersive Experience',
            'features.immersion.desc': 'Explore a dark and captivating world, where every room hides secrets and every corner can surprise you.',
            'features.levels.title': '300+ Levels',
            'features.levels.desc': '10 levels per chapter with over 300 levels total designed to test your skills and ingenuity.',
            'features.puzzles.title': 'Solve Puzzles',
            'features.puzzles.desc': 'Challenge your mind with creative and intricate puzzles that unlock new areas and reveal secrets.',
            'features.story.title': 'Story Fragments',
            'features.story.desc': 'Discover the story piece by piece through short narrative sequences as you explore the world.',
            'features.early.title': 'Early Access',
            'features.early.desc': 'Experience the game during development with regular updates and community feedback integration.',
            'features.updates.title': 'Free Updates',
            'features.updates.desc': 'Continuous content expansions with new levels, features, and improvements at no additional cost.',
            'screenshots.title': 'Screenshots',
            'screenshots.subtitle': 'Explore the haunting visuals and atmospheric environments of the Backrooms',
            'early.title': 'Coming to Early Access',
            'early.desc': 'Be part of the development journey! The game will launch in Early Access, allowing you to experience the nightmare while providing valuable feedback that shapes the final experience.',
            'early.item1': '10 Initial Levels',
            'early.item2': 'Regular Free Updates',
            'early.item3': 'Community Feedback',
            'footer.description': 'A single-player horror adventure that will test your courage and puzzle-solving skills. Enter the endless maze of the Backrooms and discover the truth behind the Lost Dimension.',
            'footer.quick': 'Quick Links',
            'footer.release': 'Release Dates',
            'footer.tags': 'Game Tags',
            'tags.horror': 'Horror',
            'tags.adventure': 'Adventure',
            'tags.exploration': 'Exploration',
            'tags.puzzle': 'Puzzle',
            'tags.single': 'Single-Player',
            'tags.indie': 'Indie',
            'tags.early': 'Early Access',
            'tags.psych': 'Psychological Horror',
            'tags.survival': 'Survival Horror',
            'tags.fp': 'First-Person',
            // Privacy page
            'privacy.back': 'Back to Home',
            'privacy.title': 'Privacy Policy',
            'privacy.intro': 'Your privacy is important to us. This policy explains how we handle your information.',
            'privacy.collect.title': 'Information We Collect',
            'privacy.collect.p': 'When you play Backrooms: Lost Dimension, we may collect the following types of information:',
            'privacy.collect.game.label': 'Game Progress Data:',
            'privacy.collect.game.desc': 'Your save files, level completion, and achievements to provide a seamless gaming experience.',
            'privacy.collect.tech.label': 'Technical Information:',
            'privacy.collect.tech.desc': 'Hardware specifications and performance data to optimize the game for your system.',
            'privacy.collect.crash.label': 'Crash Reports:',
            'privacy.collect.crash.desc': 'Automated error reports to help us fix bugs and improve stability.',
            'privacy.collect.analytics.label': 'Analytics Data:',
            'privacy.collect.analytics.desc': 'Anonymous gameplay statistics to understand how players interact with the game.',
            'privacy.use.title': 'How We Use Your Information',
            'privacy.use.p': 'We use the collected information for the following purposes:',
            'privacy.use.li1': 'To provide and maintain the game service',
            'privacy.use.li2': 'To improve gameplay experience and fix technical issues',
            'privacy.use.li3': 'To develop new features and content updates',
            'privacy.use.li4': 'To communicate with players about updates and support',
            'privacy.use.li5': 'To ensure fair play and prevent cheating',
            'privacy.security.title': 'Data Security',
            'privacy.security.p': 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your game data is encrypted both in transit and at rest, and we regularly update our security practices to maintain the highest level of protection.',
            'privacy.third.title': 'Third-Party Services',
            'privacy.third.p': 'Backrooms: Lost Dimension may integrate with third-party services:',
            'privacy.third.steam.label': 'Steam:',
            'privacy.third.steam.desc': 'For game distribution, achievements, and social features',
            'privacy.third.epic.label': 'Epic Games Store:',
            'privacy.third.epic.desc': 'For game distribution and account management',
            'privacy.third.discord.label': 'Discord:',
            'privacy.third.discord.desc': 'For community features and support (optional)',
            'privacy.third.note': 'Each service has its own privacy policy, and we encourage you to review them.',
            'privacy.rights.title': 'Your Rights',
            'privacy.rights.p': 'Depending on your location, you may have the following rights regarding your personal data:',
            'privacy.rights.li1': 'The right to access your personal data',
            'privacy.rights.li2': 'The right to correct inaccurate data',
            'privacy.rights.li3': 'The right to delete your data',
            'privacy.rights.li4': 'The right to restrict processing',
            'privacy.rights.li5': 'The right to data portability',
            'privacy.children.title': "Children's Privacy",
            'privacy.children.p': 'Backrooms: Lost Dimension contains mature content and is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.',
            'privacy.changes.title': 'Changes to This Policy',
            'privacy.changes.p': 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically for any changes.',
            'privacy.contact.title': 'Contact Us',
            'privacy.contact.p': 'If you have any questions about this Privacy Policy or our data practices, please contact us:',
            'privacy.contact.developer.label': 'Developer:',
            'privacy.contact.email.label': 'Email:',
            'privacy.contact.discord.label': 'Discord:',
            'privacy.contact.steam.label': 'Steam:',
            'privacy.lastUpdated': 'Last updated: September 2025',
        },
        it: {
            'nav.home': 'Home',
            'nav.privacy': 'Privacy Policy',
            'btn.wishlistSteam': 'Aggiungi alla wishlist su Steam',
            'btn.wishlistEpic': 'Aggiungi alla wishlist su Epic',
            'cta.watchTrailer': 'Guarda il Trailer',
            'hero.subtitle': 'Un’avventura horror per giocatore singolo',
            'hero.description': 'Esplora livelli inquietanti, risolvi enigmi unici e sopravvivi a incontri terrificanti seguendo una storia originale. Aggiornamenti gratuiti con nuovi livelli espanderanno l’esperienza e terranno vivo l’incubo.',
            'release.title': 'Uscita su Epic Games Store',
            'release.exclusiveLine': '30 ottobre 2025 • Esclusiva Epic Games Store di 6 mesi',
            'release.steamLine': 'Uscita su Steam: 1 maggio 2026',
            'countdown.days': 'Giorni',
            'countdown.hours': 'Ore',
            'countdown.minutes': 'Minuti',
            'countdown.seconds': 'Secondi',
            'features.title': 'Caratteristiche del Gioco',
            'features.subtitle': 'Immergiti in un mondo terrificante pieno di misteri, enigmi e corridoi senza fine',
            'features.immersion.title': 'Esperienza Immersiva',
            'features.immersion.desc': 'Esplora un mondo oscuro e avvincente, dove ogni stanza nasconde segreti e ogni angolo può sorprenderti.',
            'features.levels.title': '300+ Livelli',
            'features.levels.desc': '10 livelli per capitolo con oltre 300 livelli totali progettati per mettere alla prova le tue abilità e l’ingegno.',
            'features.puzzles.title': 'Risolvi Enigmi',
            'features.puzzles.desc': 'Metti alla prova la mente con enigmi creativi e intricati che sbloccano nuove aree e rivelano segreti.',
            'features.story.title': 'Frammenti di Storia',
            'features.story.desc': 'Scopri la storia poco a poco tramite brevi sequenze narrative mentre esplori il mondo.',
            'features.early.title': 'Accesso Anticipato',
            'features.early.desc': 'Vivi il gioco durante lo sviluppo con aggiornamenti regolari e integrazione del feedback della community.',
            'features.updates.title': 'Aggiornamenti Gratuiti',
            'features.updates.desc': 'Espansioni di contenuti con nuovi livelli, funzionalità e miglioramenti senza costi aggiuntivi.',
            'screenshots.title': 'Screenshot',
            'screenshots.subtitle': 'Esplora le inquietanti atmosfere e gli ambienti dei Backrooms',
            'early.title': 'In Arrivo in Accesso Anticipato',
            'early.desc': 'Partecipa al percorso di sviluppo! Il gioco arriverà in Accesso Anticipato, permettendoti di vivere l’incubo e fornire preziosi feedback per plasmare l’esperienza finale.',
            'early.item1': '10 Livelli Iniziali',
            'early.item2': 'Aggiornamenti Gratuiti Regolari',
            'early.item3': 'Feedback della Community',
            'footer.description': 'Un’avventura horror per giocatore singolo che metterà alla prova il tuo coraggio e le tue abilità logiche. Entra nel labirinto infinito dei Backrooms e scopri la verità dietro la Lost Dimension.',
            'footer.quick': 'Link Rapidi',
            'footer.release': 'Date di Uscita',
            'footer.tags': 'Tag di Gioco',
            'tags.horror': 'Horror',
            'tags.adventure': 'Avventura',
            'tags.exploration': 'Esplorazione',
            'tags.puzzle': 'Puzzle',
            'tags.single': 'Giocatore Singolo',
            'tags.indie': 'Indie',
            'tags.early': 'Accesso Anticipato',
            'tags.psych': 'Horror Psicologico',
            'tags.survival': 'Survival Horror',
            'tags.fp': 'In Prima Persona',
            // Privacy page
            'privacy.back': 'Torna alla Home',
            'privacy.title': 'Privacy Policy',
            'privacy.intro': 'La tua privacy è importante per noi. Questa policy spiega come gestiamo le tue informazioni.',
            'privacy.collect.title': 'Informazioni che Raccogliamo',
            'privacy.collect.p': 'Quando giochi a Backrooms: Lost Dimension, potremmo raccogliere le seguenti tipologie di dati:',
            'privacy.collect.game.label': 'Dati di Progresso di Gioco:',
            'privacy.collect.game.desc': 'Salvataggi, completamento livelli e achievement per garantire un’esperienza fluida.',
            'privacy.collect.tech.label': 'Informazioni Tecniche:',
            'privacy.collect.tech.desc': 'Specifiche hardware e dati prestazionali per ottimizzare il gioco per il tuo sistema.',
            'privacy.collect.crash.label': 'Report di Crash:',
            'privacy.collect.crash.desc': 'Report automatici per correggere bug e migliorare la stabilità.',
            'privacy.collect.analytics.label': 'Dati di Analytics:',
            'privacy.collect.analytics.desc': 'Statistiche anonime di gioco per comprendere come i giocatori interagiscono con il gioco.',
            'privacy.use.title': 'Come Utilizziamo le Informazioni',
            'privacy.use.p': 'Utilizziamo le informazioni raccolte per i seguenti scopi:',
            'privacy.use.li1': 'Fornire e mantenere il servizio di gioco',
            'privacy.use.li2': 'Migliorare l’esperienza e risolvere problemi tecnici',
            'privacy.use.li3': 'Sviluppare nuove funzionalità e aggiornamenti di contenuti',
            'privacy.use.li4': 'Comunicare con i giocatori su aggiornamenti e supporto',
            'privacy.use.li5': 'Garantire il fair play e prevenire i cheat',
            'privacy.security.title': 'Sicurezza dei Dati',
            'privacy.security.p': 'Applichiamo misure tecniche e organizzative per proteggere i dati personali da accessi non autorizzati, alterazioni, divulgazioni o distruzioni. I tuoi dati sono cifrati in transito e a riposo e aggiorniamo regolarmente le pratiche di sicurezza.',
            'privacy.third.title': 'Servizi di Terze Parti',
            'privacy.third.p': 'Backrooms: Lost Dimension può integrarsi con servizi di terze parti:',
            'privacy.third.steam.label': 'Steam:',
            'privacy.third.steam.desc': 'Distribuzione del gioco, achievement e funzionalità social.',
            'privacy.third.epic.label': 'Epic Games Store:',
            'privacy.third.epic.desc': 'Distribuzione del gioco e gestione account.',
            'privacy.third.discord.label': 'Discord:',
            'privacy.third.discord.desc': 'Funzionalità di community e supporto (opzionali).',
            'privacy.third.note': 'Ogni servizio ha la propria privacy policy: ti invitiamo a consultarle.',
            'privacy.rights.title': 'I Tuoi Diritti',
            'privacy.rights.p': 'In base alla tua posizione, potresti avere i seguenti diritti sui tuoi dati personali:',
            'privacy.rights.li1': 'Diritto di accesso ai dati personali',
            'privacy.rights.li2': 'Diritto di rettifica dei dati inesatti',
            'privacy.rights.li3': 'Diritto alla cancellazione dei dati',
            'privacy.rights.li4': 'Diritto di limitazione del trattamento',
            'privacy.rights.li5': 'Diritto alla portabilità dei dati',
            'privacy.children.title': 'Privacy dei Minori',
            'privacy.children.p': 'Il gioco contiene contenuti maturi e non è destinato a minori di 13 anni. Non raccogliamo consapevolmente dati personali di minori di 13 anni. Se ritieni che siano stati raccolti, contattaci subito.',
            'privacy.changes.title': 'Modifiche a Questa Policy',
            'privacy.changes.p': 'Aggiorniamo periodicamente questa Privacy Policy. Le modifiche saranno pubblicate in questa pagina con una nuova data di revisione.',
            'privacy.contact.title': 'Contattaci',
            'privacy.contact.p': 'Per domande su questa Privacy Policy o sul trattamento dei dati:',
            'privacy.contact.developer.label': 'Developer:',
            'privacy.contact.email.label': 'Email:',
            'privacy.contact.discord.label': 'Discord:',
            'privacy.contact.steam.label': 'Steam:',
            'privacy.lastUpdated': 'Ultimo aggiornamento: September 2025',
        },
        fr: {
            'nav.home': 'Accueil',
            'nav.privacy': 'Politique de confidentialité',
            'btn.wishlistSteam': 'Ajouter à la liste de souhaits Steam',
            'btn.wishlistEpic': 'Ajouter à la liste de souhaits Epic',
            'cta.watchTrailer': 'Regarder la bande-annonce',
            'hero.subtitle': 'Une aventure d’horreur solo',
            'hero.description': 'Explorez des niveaux inquiétants, résolvez des énigmes uniques et survivez à des rencontres terrifiantes tout en suivant une histoire originale. Des mises à jour gratuites avec de nouveaux niveaux feront évoluer l’expérience.',
            'release.title': 'Sortie sur Epic Games Store',
            'release.exclusiveLine': '30 octobre 2025 • Exclusivité Epic Games Store pendant 6 mois',
            'release.steamLine': 'Sortie Steam : 1 mai 2026',
            'countdown.days': 'Jours',
            'countdown.hours': 'Heures',
            'countdown.minutes': 'Minutes',
            'countdown.seconds': 'Secondes',
            'features.title': 'Fonctionnalités du jeu',
            'features.subtitle': 'Plongez dans un monde terrifiant rempli de mystères, d’énigmes et de couloirs sans fin',
            'features.immersion.title': 'Expérience immersive',
            'features.immersion.desc': 'Explorez un monde sombre et captivant où chaque pièce cache des secrets et chaque coin peut vous surprendre.',
            'features.levels.title': '300+ niveaux',
            'features.levels.desc': '10 niveaux par chapitre, plus de 300 au total pour tester vos compétences et votre ingéniosité.',
            'features.puzzles.title': 'Résolvez des énigmes',
            'features.puzzles.desc': 'Stimulez votre esprit avec des énigmes créatives et complexes qui débloquent de nouvelles zones et révèlent des secrets.',
            'features.story.title': 'Fragments d’histoire',
            'features.story.desc': 'Découvrez l’histoire morceau par morceau à travers de courtes séquences narratives.',
            'features.early.title': 'Accès anticipé',
            'features.early.desc': 'Vivez le jeu pendant le développement avec des mises à jour régulières et les retours de la communauté.',
            'features.updates.title': 'Mises à jour gratuites',
            'features.updates.desc': 'Extensions de contenu continues avec de nouveaux niveaux, fonctionnalités et améliorations sans coût supplémentaire.',
            'screenshots.title': 'Captures d’écran',
            'screenshots.subtitle': 'Explorez les visuels hantés et les environnements atmosphériques des Backrooms',
            'early.title': 'Bientôt en Accès Anticipé',
            'early.desc': 'Participez au développement ! Le jeu sera lancé en Accès Anticipé, vous permettant de vivre le cauchemar tout en donnant des retours précieux.',
            'early.item1': '10 niveaux initiaux',
            'early.item2': 'Mises à jour gratuites régulières',
            'early.item3': 'Commentaires de la communauté',
            'footer.description': 'Une aventure d’horreur solo qui mettra à l’épreuve votre courage et vos compétences de réflexion.',
            'footer.quick': 'Liens rapides',
            'footer.release': 'Dates de sortie',
            'footer.tags': 'Tags du jeu',
            'tags.horror': 'Horreur',
            'tags.adventure': 'Aventure',
            'tags.exploration': 'Exploration',
            'tags.puzzle': 'Puzzle',
            'tags.single': 'Solo',
            'tags.indie': 'Indé',
            'tags.early': 'Accès anticipé',
            'tags.psych': 'Horreur psychologique',
            'tags.survival': 'Survival horror',
            'tags.fp': 'Vue à la première personne',
            // Privacy page
            'privacy.back': "Retour à l’accueil",
            'privacy.title': 'Politique de confidentialité',
            'privacy.intro': 'Votre vie privée est importante. Cette politique explique comment nous traitons vos informations.',
            'privacy.collect.title': 'Informations que nous collectons',
            'privacy.collect.p': 'Lorsque vous jouez à Backrooms: Lost Dimension, nous pouvons collecter les types d’informations suivants :',
            'privacy.collect.game.label': 'Données de progression de jeu :',
            'privacy.collect.game.desc': 'Sauvegardes, progression des niveaux et succès pour une expérience fluide.',
            'privacy.collect.tech.label': 'Informations techniques :',
            'privacy.collect.tech.desc': 'Spécifications matérielles et données de performance pour optimiser le jeu.',
            'privacy.collect.crash.label': 'Rapports d’incident :',
            'privacy.collect.crash.desc': 'Rapports automatisés pour corriger les bugs et améliorer la stabilité.',
            'privacy.collect.analytics.label': 'Données analytiques :',
            'privacy.collect.analytics.desc': 'Statistiques de jeu anonymes pour comprendre l’usage.',
            'privacy.use.title': 'Comment nous utilisons vos informations',
            'privacy.use.p': 'Nous utilisons les informations collectées pour :',
            'privacy.use.li1': 'Fournir et maintenir le service de jeu',
            'privacy.use.li2': 'Améliorer l’expérience et corriger les problèmes techniques',
            'privacy.use.li3': 'Développer de nouvelles fonctionnalités et mises à jour',
            'privacy.use.li4': 'Communiquer avec les joueurs au sujet des mises à jour et du support',
            'privacy.use.li5': 'Assurer le fair-play et prévenir la triche',
            'privacy.security.title': 'Sécurité des données',
            'privacy.security.p': 'Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données personnelles...',
            'privacy.third.title': 'Services tiers',
            'privacy.third.p': 'Le jeu peut intégrer des services tiers :',
            'privacy.third.steam.label': 'Steam :',
            'privacy.third.steam.desc': 'Distribution, succès et fonctionnalités sociales',
            'privacy.third.epic.label': 'Epic Games Store :',
            'privacy.third.epic.desc': 'Distribution et gestion de compte',
            'privacy.third.discord.label': 'Discord :',
            'privacy.third.discord.desc': 'Fonctionnalités communautaires et support (optionnel)',
            'privacy.third.note': 'Chaque service possède sa propre politique de confidentialité.',
            'privacy.rights.title': 'Vos droits',
            'privacy.rights.p': 'Selon votre localisation, vous pouvez disposer des droits suivants :',
            'privacy.rights.li1': 'Droit d’accès',
            'privacy.rights.li2': 'Droit de rectification',
            'privacy.rights.li3': 'Droit à l’effacement',
            'privacy.rights.li4': 'Droit à la limitation du traitement',
            'privacy.rights.li5': 'Droit à la portabilité des données',
            'privacy.children.title': 'Confidentialité des enfants',
            'privacy.children.p': 'Contenu mature, non destiné aux moins de 13 ans. Aucune collecte intentionnelle de données.',
            'privacy.changes.title': 'Modifications de cette politique',
            'privacy.changes.p': 'Des mises à jour peuvent être publiées avec une nouvelle date de révision.',
            'privacy.contact.title': 'Contactez-nous',
            'privacy.contact.p': 'Pour toute question concernant cette politique :',
            'privacy.contact.developer.label': 'Développeur :',
            'privacy.contact.email.label': 'Email :',
            'privacy.contact.discord.label': 'Discord :',
            'privacy.contact.steam.label': 'Steam :',
            'privacy.lastUpdated': 'Dernière mise à jour : septembre 2025',
        },
        de: {
            'nav.home': 'Startseite',
            'nav.privacy': 'Datenschutz',
            'btn.wishlistSteam': 'Zur Steam-Wunschliste hinzufügen',
            'btn.wishlistEpic': 'Zur Epic-Wunschliste hinzufügen',
            'cta.watchTrailer': 'Trailer ansehen',
            'hero.subtitle': 'Ein Einzelspieler-Horror-Abenteuer',
            'hero.description': 'Erkunde unheimliche Levels, löse einzigartige Rätsel und überlebe furchterregende Begegnungen, während du einer originalen Geschichte folgst. Kostenlose Inhaltsupdates mit neuen Levels erweitern das Erlebnis.',
            'release.title': 'Erscheinung im Epic Games Store',
            'release.exclusiveLine': '30. Oktober 2025 • 6-monatige Epic-Exklusivität',
            'release.steamLine': 'Steam-Veröffentlichung: 1. Mai 2026',
            'countdown.days': 'Tage',
            'countdown.hours': 'Stunden',
            'countdown.minutes': 'Minuten',
            'countdown.seconds': 'Sekunden',
            'features.title': 'Spiel-Features',
            'features.subtitle': 'Tauche ein in eine furchterregende Welt voller Geheimnisse, Rätsel und endloser Korridore',
            'features.immersion.title': 'Immersives Erlebnis',
            'features.immersion.desc': 'Erkunde eine dunkle und fesselnde Welt, in der jeder Raum Geheimnisse birgt und jede Ecke überraschen kann.',
            'features.levels.title': '300+ Level',
            'features.levels.desc': '10 Level pro Kapitel, über 300 insgesamt, um deine Fähigkeiten und deinen Einfallsreichtum zu testen.',
            'features.puzzles.title': 'Rätsel lösen',
            'features.puzzles.desc': 'Fordere deinen Geist mit kreativen und komplexen Rätseln heraus, die neue Bereiche freischalten und Geheimnisse enthüllen.',
            'features.story.title': 'Geschichtsfragmente',
            'features.story.desc': 'Entdecke die Geschichte Stück für Stück durch kurze Erzählsequenzen.',
            'features.early.title': 'Early Access',
            'features.early.desc': 'Erlebe das Spiel während der Entwicklung mit regelmäßigen Updates und Community-Feedback.',
            'features.updates.title': 'Kostenlose Updates',
            'features.updates.desc': 'Kontinuierliche Inhaltserweiterungen mit neuen Levels, Features und Verbesserungen ohne zusätzliche Kosten.',
            'screenshots.title': 'Screenshots',
            'screenshots.subtitle': 'Erkunde die unheimlichen Bilder und atmosphärischen Umgebungen der Backrooms',
            'early.title': 'Bald im Early Access',
            'early.desc': 'Sei Teil der Entwicklung! Das Spiel startet im Early Access und ermöglicht dir, das Grauen zu erleben und wertvolles Feedback zu geben.',
            'early.item1': '10 Anfangslevel',
            'early.item2': 'Regelmäßige kostenlose Updates',
            'early.item3': 'Community-Feedback',
            'footer.description': 'Ein Einzelspieler-Horror-Abenteuer, das deinen Mut und deine Rätsel-Fähigkeiten testet.',
            'footer.quick': 'Schnelllinks',
            'footer.release': 'Veröffentlichungstermine',
            'footer.tags': 'Spiel-Tags',
            'tags.horror': 'Horror',
            'tags.adventure': 'Abenteuer',
            'tags.exploration': 'Erkundung',
            'tags.puzzle': 'Puzzle',
            'tags.single': 'Einzelspieler',
            'tags.indie': 'Indie',
            'tags.early': 'Early Access',
            'tags.psych': 'Psychologischer Horror',
            'tags.survival': 'Survival-Horror',
            'tags.fp': 'Ego-Perspektive',
            // Privacy page
            'privacy.back': 'Zurück zur Startseite',
            'privacy.title': 'Datenschutzerklärung',
            'privacy.intro': 'Ihre Privatsphäre ist uns wichtig. Diese Richtlinie erklärt, wie wir Informationen verarbeiten.',
            'privacy.collect.title': 'Welche Daten wir erheben',
            'privacy.collect.p': 'Beim Spielen von Backrooms: Lost Dimension können wir folgende Daten erheben:',
            'privacy.collect.game.label': 'Spieldaten:',
            'privacy.collect.game.desc': 'Spielstände, Level-Fortschritt und Erfolge für ein nahtloses Erlebnis.',
            'privacy.collect.tech.label': 'Technische Informationen:',
            'privacy.collect.tech.desc': 'Hardware-Spezifikationen und Leistungsdaten zur Optimierung.',
            'privacy.collect.crash.label': 'Absturzberichte:',
            'privacy.collect.crash.desc': 'Automatisierte Berichte zur Fehlerbehebung und Stabilitätsverbesserung.',
            'privacy.collect.analytics.label': 'Analysedaten:',
            'privacy.collect.analytics.desc': 'Anonyme Spielstatistiken zum Verständnis der Nutzung.',
            'privacy.use.title': 'Wie wir Ihre Informationen verwenden',
            'privacy.use.p': 'Wir nutzen die gesammelten Informationen für:',
            'privacy.use.li1': 'Bereitstellung und Wartung des Spieldienstes',
            'privacy.use.li2': 'Verbesserung des Gameplays und Behebung technischer Probleme',
            'privacy.use.li3': 'Entwicklung neuer Funktionen und Inhaltsupdates',
            'privacy.use.li4': 'Kommunikation mit Spielern über Updates und Support',
            'privacy.use.li5': 'Sicherstellung von Fair Play und Verhinderung von Cheating',
            'privacy.security.title': 'Datensicherheit',
            'privacy.security.p': 'Wir setzen technische und organisatorische Maßnahmen ein, um personenbezogene Daten zu schützen...',
            'privacy.third.title': 'Dienste Dritter',
            'privacy.third.p': 'Das Spiel kann Dienste Dritter integrieren:',
            'privacy.third.steam.label': 'Steam:',
            'privacy.third.steam.desc': 'Distribution, Erfolge und soziale Funktionen',
            'privacy.third.epic.label': 'Epic Games Store:',
            'privacy.third.epic.desc': 'Distribution und Kontoverwaltung',
            'privacy.third.discord.label': 'Discord:',
            'privacy.third.discord.desc': 'Community-Funktionen und Support (optional)',
            'privacy.third.note': 'Jeder Dienst hat eigene Datenschutzrichtlinien.',
            'privacy.rights.title': 'Ihre Rechte',
            'privacy.rights.p': 'Je nach Standort haben Sie folgende Rechte:',
            'privacy.rights.li1': 'Recht auf Auskunft',
            'privacy.rights.li2': 'Recht auf Berichtigung',
            'privacy.rights.li3': 'Recht auf Löschung',
            'privacy.rights.li4': 'Recht auf Einschränkung der Verarbeitung',
            'privacy.rights.li5': 'Recht auf Datenübertragbarkeit',
            'privacy.children.title': 'Datenschutz von Kindern',
            'privacy.children.p': 'Inhalte für Erwachsene; nicht für Kinder unter 13 Jahren bestimmt.',
            'privacy.changes.title': 'Änderungen dieser Richtlinie',
            'privacy.changes.p': 'Aktualisierungen werden mit einem neuen Revisionsdatum veröffentlicht.',
            'privacy.contact.title': 'Kontakt',
            'privacy.contact.p': 'Bei Fragen zu dieser Richtlinie:',
            'privacy.contact.developer.label': 'Entwickler:',
            'privacy.contact.email.label': 'E-Mail:',
            'privacy.contact.discord.label': 'Discord:',
            'privacy.contact.steam.label': 'Steam:',
            'privacy.lastUpdated': 'Zuletzt aktualisiert: September 2025',
        },
        es: {
            'nav.home': 'Inicio',
            'nav.privacy': 'Política de privacidad',
            'btn.wishlistSteam': 'Añadir a la lista de deseados en Steam',
            'btn.wishlistEpic': 'Añadir a la lista de deseados en Epic',
            'cta.watchTrailer': 'Ver tráiler',
            'hero.subtitle': 'Una aventura de terror para un jugador',
            'hero.description': 'Explora niveles inquietantes, resuelve rompecabezas únicos y sobrevive a encuentros terroríficos siguiendo una historia original. Actualizaciones gratuitas con nuevos niveles ampliarán la experiencia.',
            'release.title': 'Lanzamiento en Epic Games Store',
            'release.exclusiveLine': '30 de octubre de 2025 • Exclusiva de Epic durante 6 meses',
            'release.steamLine': 'Lanzamiento en Steam: 1 de mayo de 2026',
            'countdown.days': 'Días',
            'countdown.hours': 'Horas',
            'countdown.minutes': 'Minutos',
            'countdown.seconds': 'Segundos',
            'features.title': 'Características del juego',
            'features.subtitle': 'Sumérgete en un mundo aterrador lleno de misterios, acertijos y pasillos interminables',
            'features.immersion.title': 'Experiencia inmersiva',
            'features.immersion.desc': 'Explora un mundo oscuro y cautivador donde cada sala oculta secretos y cada esquina puede sorprenderte.',
            'features.levels.title': '300+ niveles',
            'features.levels.desc': '10 niveles por capítulo y más de 300 en total diseñados para poner a prueba tus habilidades e ingenio.',
            'features.puzzles.title': 'Resuelve acertijos',
            'features.puzzles.desc': 'Desafía tu mente con acertijos creativos y complejos que desbloquean nuevas áreas y revelan secretos.',
            'features.story.title': 'Fragmentos de historia',
            'features.story.desc': 'Descubre la historia poco a poco mediante breves secuencias narrativas mientras exploras el mundo.',
            'features.early.title': 'Acceso anticipado',
            'features.early.desc': 'Experimenta el juego durante el desarrollo con actualizaciones regulares e integración del feedback de la comunidad.',
            'features.updates.title': 'Actualizaciones gratuitas',
            'features.updates.desc': 'Expansiones continuas con nuevos niveles, funciones y mejoras sin coste adicional.',
            'screenshots.title': 'Capturas',
            'screenshots.subtitle': 'Explora los inquietantes escenarios y atmósferas de los Backrooms',
            'early.title': 'Próximamente en Acceso Anticipado',
            'early.desc': '¡Sé parte del desarrollo! El juego se lanzará en Acceso Anticipado, permitiéndote vivir la pesadilla y aportar valiosos comentarios.',
            'early.item1': '10 niveles iniciales',
            'early.item2': 'Actualizaciones gratuitas regulares',
            'early.item3': 'Feedback de la comunidad',
            'footer.description': 'Una aventura de terror para un jugador que pondrá a prueba tu valentía y tus habilidades con los rompecabezas.',
            'footer.quick': 'Enlaces rápidos',
            'footer.release': 'Fechas de lanzamiento',
            'footer.tags': 'Etiquetas del juego',
            'tags.horror': 'Terror',
            'tags.adventure': 'Aventura',
            'tags.exploration': 'Exploración',
            'tags.puzzle': 'Puzzle',
            'tags.single': 'Un jugador',
            'tags.indie': 'Indie',
            'tags.early': 'Acceso anticipado',
            'tags.psych': 'Terror psicológico',
            'tags.survival': 'Survival horror',
            'tags.fp': 'Primera persona',
            // Privacy page
            'privacy.back': 'Volver al inicio',
            'privacy.title': 'Política de privacidad',
            'privacy.intro': 'Tu privacidad es importante para nosotros. Esta política explica cómo tratamos tu información.',
            'privacy.collect.title': 'Información que recopilamos',
            'privacy.collect.p': 'Cuando juegas a Backrooms: Lost Dimension, podemos recopilar los siguientes tipos de información:',
            'privacy.collect.game.label': 'Datos de progreso de juego:',
            'privacy.collect.game.desc': 'Archivos guardados, progreso de niveles y logros para una experiencia fluida.',
            'privacy.collect.tech.label': 'Información técnica:',
            'privacy.collect.tech.desc': 'Especificaciones de hardware y datos de rendimiento para optimizar el juego.',
            'privacy.collect.crash.label': 'Informes de errores:',
            'privacy.collect.crash.desc': 'Informes automáticos para corregir fallos y mejorar la estabilidad.',
            'privacy.collect.analytics.label': 'Datos analíticos:',
            'privacy.collect.analytics.desc': 'Estadísticas de juego anónimas para entender cómo interactúan los jugadores.',
            'privacy.use.title': 'Cómo usamos tu información',
            'privacy.use.p': 'Usamos la información recopilada para:',
            'privacy.use.li1': 'Proporcionar y mantener el servicio del juego',
            'privacy.use.li2': 'Mejorar la experiencia y solucionar problemas técnicos',
            'privacy.use.li3': 'Desarrollar nuevas funciones y actualizaciones de contenido',
            'privacy.use.li4': 'Comunicarnos con los jugadores sobre actualizaciones y soporte',
            'privacy.use.li5': 'Garantizar el juego justo y prevenir trampas',
            'privacy.security.title': 'Seguridad de los datos',
            'privacy.security.p': 'Aplicamos medidas técnicas y organizativas para proteger los datos personales...',
            'privacy.third.title': 'Servicios de terceros',
            'privacy.third.p': 'El juego puede integrarse con servicios de terceros:',
            'privacy.third.steam.label': 'Steam:',
            'privacy.third.steam.desc': 'Distribución del juego, logros y funciones sociales',
            'privacy.third.epic.label': 'Epic Games Store:',
            'privacy.third.epic.desc': 'Distribución y gestión de cuentas',
            'privacy.third.discord.label': 'Discord:',
            'privacy.third.discord.desc': 'Funciones de comunidad y soporte (opcional)',
            'privacy.third.note': 'Cada servicio tiene su propia política de privacidad.',
            'privacy.rights.title': 'Tus derechos',
            'privacy.rights.p': 'Según tu ubicación, puedes tener los siguientes derechos:',
            'privacy.rights.li1': 'Derecho de acceso',
            'privacy.rights.li2': 'Derecho de rectificación',
            'privacy.rights.li3': 'Derecho de supresión',
            'privacy.rights.li4': 'Derecho a restringir el tratamiento',
            'privacy.rights.li5': 'Derecho a la portabilidad de los datos',
            'privacy.children.title': 'Privacidad de los menores',
            'privacy.children.p': 'Contenido para adultos; no destinado a menores de 13 años.',
            'privacy.changes.title': 'Cambios en esta política',
            'privacy.changes.p': 'Publicaremos las actualizaciones con una nueva fecha de revisión.',
            'privacy.contact.title': 'Contáctanos',
            'privacy.contact.p': 'Para preguntas sobre esta política:',
            'privacy.contact.developer.label': 'Desarrollador:',
            'privacy.contact.email.label': 'Email:',
            'privacy.contact.discord.label': 'Discord:',
            'privacy.contact.steam.label': 'Steam:',
            'privacy.lastUpdated': 'Última actualización: septiembre de 2025',
        },
    };

    const select = document.getElementById('lang-select');
    const saved = localStorage.getItem('lang') || 'en';
    if (select) select.value = saved;
    applyLanguage(saved);

    if (select) {
        select.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('lang', lang);
            applyLanguage(lang);
        });
    }

    function applyLanguage(lang) {
        const dict = strings[lang] || strings.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
    }
}
