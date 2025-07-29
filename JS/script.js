document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DEL MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- LÓGICA MEJORADA PARA MARCAR EL ENLACE ACTIVO ---
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const currentPath = window.location.pathname; // Ej: /FiloGames/portfolio/latin-vibes

    let bestMatch = null;
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname; // Obtiene la ruta completa del enlace, ej: /FiloGames/portfolio
        
        // Limpiamos la clase de todos los enlaces primero
        link.classList.remove('active');

        // Si la ruta actual EMPIEZA con la ruta del enlace, es un candidato
        if (currentPath.startsWith(linkPath)) {
            // Queremos la coincidencia más específica (la más larga)
            // Esto asegura que /portfolio/algo active a /portfolio y no a /
            if (!bestMatch || linkPath.length > new URL(bestMatch.href).pathname.length) {
                bestMatch = link;
            }
        }
    });

    // Si encontramos una coincidencia, la activamos
    if (bestMatch) {
        bestMatch.classList.add('active');
    } else {
        // Caso especial para la página de inicio si no hay otra coincidencia
        const homeLink = document.querySelector('a[href="/"]');
        if (homeLink && (currentPath === '/FiloGames/' || currentPath === '/')) {
            homeLink.classList.add('active');
        }
    }

    // --- LÓGICA DE NAVEGACIÓN SUAVE PARA EL MENÚ HAMBURGUESA ---
    document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.href;

            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                setTimeout(() => { window.location.href = destination; }, 300);
            } else {
                window.location.href = destination;
            }
        });
    });

    // --- LÓGICA PARA EL CARRUSEL DE PRECIOS (SI EXISTE) ---
    const carousel = document.getElementById('pricing-carousel');
    if (carousel) {
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        
        const updateButtons = () => {
            const scrollLeft = carousel.scrollLeft;
            const scrollWidth = carousel.scrollWidth;
            const width = carousel.clientWidth;
            prevButton.disabled = scrollLeft <= 0;
            nextButton.disabled = scrollLeft + width >= scrollWidth - 10;
        };

        const scrollToNext = () => {
            const card = carousel.querySelector('.pricing-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 30;
                carousel.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }
        };

        const scrollToPrev = () => {
            const card = carousel.querySelector('.pricing-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 30;
                carousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
            }
        };

        nextButton.addEventListener('click', scrollToNext);
        prevButton.addEventListener('click', scrollToPrev);
        carousel.addEventListener('scroll', updateButtons);
        updateButtons();
    }

    // --- Lógica del Filtro del Portafolio (sin cambios) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (tabButtons.length > 0 && portfolioItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
                });
            });
        });
    }

    // --- LÓGICA PARA MÚSICA DE FONDO PERSISTENTE (CORREGIDA) ---
    const musicControlButton = document.getElementById('music-control');
    if (musicControlButton && typeof Tone !== 'undefined') {
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        let isPlaying = false;
        let hasBeenInitialized = false; // *** NUEVA VARIABLE DE CONTROL ***

        // --- Instrumentos y Efectos (sin cambios) ---
        const kickDistortion = new Tone.Distortion(0.4).toDestination();
        const kick = new Tone.MembraneSynth({ pitchDecay: 0.02, octaves: 6, oscillator: { type: 'sine' } }).connect(kickDistortion);
        const snare = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.001, decay: 0.1, sustain: 0 } }).toDestination();
        const hihat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.05, sustain: 0 } }).toDestination();
        const bitCrusher = new Tone.BitCrusher(6).toDestination();
        const arpSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'square' } }).connect(bitCrusher);
        const leadSynth = new Tone.DuoSynth({ voice0: { oscillator: { type: 'sawtooth' } }, vibratoAmount: 0.2 }).toDestination();
        const formantFilter = new Tone.Filter({ type: 'bandpass', Q: 4 }).toDestination();
        const vocalReverb = new Tone.Reverb({ decay: 5, wet: 0.6 }).connect(formantFilter);
        const vocalSynth = new Tone.AMSynth({ harmonicity: 1.5, envelope: { attack: 1, release: 1 } }).connect(vocalReverb);
        const lfo = new Tone.LFO({ frequency: '8n', min: 400, max: 1200, type: 'sine' }).connect(formantFilter.frequency).start();
        const chorusEffect = new Tone.Chorus(4, 2.5, 0.7).toDestination().start();
        const harmonySynth = new Tone.PolySynth(Tone.FMSynth, { harmonicity: 0.8, modulationIndex: 5, envelope: { attack: 1.5, release: 2 } }).connect(chorusEffect);
        
        // --- Patrones Musicales (sin cambios en su definición) ---
        const kickPattern = new Tone.Sequence((time, note) => { kick.triggerAttackRelease(note, '8n', time); }, ['C1', null, 'C1', null, 'C1', null, ['C1', 'C1'], null], '4n');
        const snarePattern = new Tone.Sequence((time, note) => { snare.triggerAttackRelease('8n', time); }, [null, 'G1', null, 'G1'], '4n');
        const hihatPattern = new Tone.Sequence((time, note) => { hihat.triggerAttackRelease("16n", time); }, ['C5', 'C5', ['C5', 'C5'], 'C5'], '4n');
        const arpPattern = new Tone.Sequence((time, note) => { arpSynth.triggerAttackRelease(note, '16n', time); }, ['C4', 'G4', 'C5', 'G4', 'Eb4', 'Bb4', 'Eb5', 'Bb4'], '16n');
        const leadPattern = new Tone.Sequence((time, note) => { leadSynth.triggerAttackRelease(note, '8n', time); }, ['G5', 'Bb5', 'C6', 'G5', 'Eb6', 'D6', 'C6', 'Bb5'], '8n');
        const vocalPattern = new Tone.Sequence((time, note) => { vocalSynth.triggerAttackRelease(note, '1m', time); }, ['C4', 'Eb4'], '1m');
        const harmonyPattern = new Tone.Part((time, value) => { harmonySynth.triggerAttackRelease(value.note, value.dur, time); }, [{ time: '0m', note: ['Ab3', 'C4'], dur: '4m' }, { time: '4m', note: ['G3', 'Bb3'], dur: '4m' }]);

        // --- Evolución de la Composición (sin cambios en su definición) ---
        kick.volume.value = -Infinity; snare.volume.value = -Infinity; hihat.volume.value = -Infinity;
        arpSynth.volume.value = -Infinity; leadSynth.volume.value = -Infinity;
        vocalSynth.volume.value = -12; harmonySynth.volume.value = -Infinity;
        Tone.Transport.scheduleOnce(time => { vocalPattern.start(time); harmonyPattern.start(time); harmonySynth.volume.linearRampTo(-22, 4, time); }, "0m");
        Tone.Transport.schedule(time => { kickPattern.start(time); kick.volume.linearRampTo(-2, 2, time); }, "4m");
        Tone.Transport.schedule(time => { snarePattern.start(time); snare.volume.linearRampTo(-10, 2, time); }, "6m");
        Tone.Transport.schedule(time => { arpPattern.start(time); arpSynth.volume.linearRampTo(-18, 4, time); }, "8m");
        Tone.Transport.schedule(time => { hihatPattern.start(time); hihat.volume.linearRampTo(-15, 2, time); leadPattern.start(time); leadSynth.volume.linearRampTo(-12, 4, time); kickDistortion.distortion = 0.6; bitCrusher.bits.value = 5; vocalSynth.volume.linearRampTo(-9, 8, time); harmonySynth.volume.linearRampTo(-18, 8, time); }, "12m");
        Tone.Transport.schedule(time => { kick.volume.linearRampTo(-Infinity, 4, time); snare.volume.linearRampTo(-Infinity, 4, time); leadSynth.volume.linearRampTo(-Infinity, 4, time); }, "20m");
        Tone.Transport.schedule(time => { arpSynth.volume.linearRampTo(-Infinity, 16, time); vocalSynth.volume.linearRampTo(-Infinity, 16, time); harmonySynth.volume.linearRampTo(-Infinity, 12, time); }, "24m");
        
        // --- Configuración y Control ---
        Tone.Transport.bpm.value = 135;
        Tone.Transport.loop = true;
        Tone.Transport.loopEnd = '32m';

        // --- LÓGICA DE CONTROL Y PERSISTENCIA (CORREGIDA) ---

        function initializeAndPlay(startTime = 0) {
            if (!hasBeenInitialized) {
                // Esto solo se ejecuta UNA VEZ por sesión cuando se da play por primera vez
                // Aquí es donde se programan los patrones para que empiecen
                // No es necesario volver a llamarlos en las páginas siguientes
                hasBeenInitialized = true;
            }
            Tone.Transport.start(Tone.now(), startTime);
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }

        function saveMusicState() {
            sessionStorage.setItem('filogames_musicState', isPlaying ? 'playing' : 'paused');
            if (isPlaying) {
                sessionStorage.setItem('filogames_musicTimestamp', Tone.Transport.seconds);
            }
        }

        // Al cargar la página, revisamos si debemos reanudar la música
        const savedState = sessionStorage.getItem('filogames_musicState');
        if (savedState === 'playing') {
            (async () => {
                await Tone.start();
                const savedTimestamp = parseFloat(sessionStorage.getItem('filogames_musicTimestamp')) || 0;
                initializeAndPlay(savedTimestamp);
            })();
        }

        // Lógica del botón de Play/Pausa
        musicControlButton.addEventListener('click', async () => {
            await Tone.start();
            if (isPlaying) {
                Tone.Transport.pause();
                isPlaying = false;
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                // Si es la primera vez que se da play, empieza desde 0.
                // Si se reanuda, Tone.Transport.start() continúa desde donde se pausó.
                initializeAndPlay(Tone.Transport.seconds);
            }
            saveMusicState();
        });

        window.addEventListener('beforeunload', saveMusicState);
    }
});