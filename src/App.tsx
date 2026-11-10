import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Image,
  LockKeyhole,
  Menu,
  Music2,
  Pause,
  Play,
  Quote,
  RotateCcw,
  RotateCw,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Page = "home" | "gallery" | "story" | "notes";

const photos = [
  [
    "https://images.unsplash.com/photo-1514439827219-9137a0b99245?auto=format&fit=crop&w=1400&q=86",
    "City lights",
    "The kind of night that asks you to stay a little longer.",
    "Van Mendoza",
  ],
  [
    "https://images.unsplash.com/photo-1671822571090-224109a31b3b?auto=format&fit=crop&w=1200&q=86",
    "Soft things",
    "Tenderness lives in ordinary places.",
    "Chimango Hara",
  ],
  [
    "https://images.unsplash.com/photo-1658042026331-984e620048fc?auto=format&fit=crop&w=1200&q=86",
    "Somewhere quiet",
    "No rush. No noise. Just a shared silence.",
    "Piyush Barhe",
  ],
  [
    "https://images.unsplash.com/photo-1590516554327-3c42f1d8f6cf?auto=format&fit=crop&w=1200&q=86",
    "Details",
    "You notice the little things. That is one of your gifts.",
    "Oleksandra Bardash",
  ],
  [
    "https://images.unsplash.com/photo-1636565950975-92607971542b?auto=format&fit=crop&w=1200&q=86",
    "In bloom",
    "Some seasons arrive slowly, then all at once.",
    "MAK",
  ],
  [
    "https://images.unsplash.com/photo-1617293134227-0ec282f3ed89?auto=format&fit=crop&w=1400&q=86",
    "After dark",
    "Every window holds a story. This one’s full of good vibes.",
    "Li Zhang",
  ],
  [
    "https://images.unsplash.com/photo-1607159990391-f322fe0e64db?auto=format&fit=crop&w=1200&q=86",
    "For you",
    "Flowers fade. The feeling behind them never has to.",
    "Akarsh Gurudeva",
  ],
  [
    "https://images.unsplash.com/photo-1664360339794-1cc72dba84b1?auto=format&fit=crop&w=1200&q=86",
    "Our little universe",
    "A corner of the world made warmer by good company.",
    "Liza Rusalskaya",
  ],
  [
    "https://images.unsplash.com/photo-1570209007085-951f739eb8d0?auto=format&fit=crop&w=1400&q=86",
    "The long way home",
    "The best conversations make the journey feel too short.",
    "Artur Aldyrkhanov",
  ],
];

const clairePhotos: { src: string; title: string; note: string }[] = [
  // Add photos by placing files in public/photos/ and listing them here, e.g.:
  // { src: "/photos/01.jpg", title: "Memory 1", note: "A short note" },
];

const notes = [
  [
    "For the difficult days",
    "Open when the world feels heavy",
    "You do not have to be brilliant every day. Rest is not failure, and asking for help is not weakness. You are still worthy on the quiet days, the tangled days, and the days when all you did was make it through.",
  ],
  [
    "For the doubtful days",
    "Open when you forget yourself",
    "You carry more courage than you give yourself credit for, more kindness than most people know what to do with, and a light that does not disappear just because you cannot see it for a moment.",
  ],
  [
    "For the bright days",
    "Open when something goes right",
    "Pause here. Let yourself be proud. You worked, waited, hoped, and kept moving. This moment belongs to you, so do not rush past it. Nice work, seriously.",
  ],
  [
    "For no reason at all",
    "Open when you need a reminder",
    "There is no occasion required to say this: knowing you is a gift. The world is more interesting, more honest, and much softer with you in it.",
  ],
];

const nav = [
  ["home", "Home", Home],
  ["gallery", "Gallery", Image],
  ["notes", "Secret notes", LockKeyhole],
] as const;

const currentPage = (): Page => {
  const path = location.pathname.slice(1) as Page;
  return nav.some(([id]) => id === path) ? path : "home";
};

export default function App() {
  const [page, setPage] = useState<Page>(currentPage);
  const [menu, setMenu] = useState(false);
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1200);
    const pop = () => setPage(currentPage());
    addEventListener("popstate", pop);
    return () => {
      clearTimeout(timer);
      removeEventListener("popstate", pop);
    };
  }, []);
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
    setMenu(false);
    document.title = `${nav.find(([id]) => id === page)?.[1]} | For Claire`;
  }, [page]);
  const go = (next: Page) => {
    if (next === page) return;
    history.pushState({}, "", next === "home" ? "/" : `/${next}`);
    setPage(next);
  };
  return (
    <div className="shell">
      {intro && (
        <div className="intro">
          <b>C</b>
          <span>A little world for Claire</span>
        </div>
      )}
      <Background />
      <header>
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">C</span>
          <span className="brand-name">
            <strong>For Claire</strong>
            <small>Friendship corner</small>
          </span>
        </button>
        <nav className={menu ? "open" : ""}>
          {nav.map(([id, label, Icon]) => (
            <button className={page === id ? "active" : ""} onClick={() => go(id)} key={id}>
              <Icon />
              {label}
            </button>
          ))}
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main key={page} className="page">
        {page === "home" && <Landing go={go} />}
        {page === "gallery" && <Gallery />}
        {page === "notes" && <Notes />}
      </main>
      <MusicPlayer />
      <footer>
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">C</span>
          <span className="brand-name">
            <strong>For Claire</strong>
            <small>Made for a great friend.</small>
          </span>
        </button>
        <p>Some people feel like home.</p>
      </footer>
    </div>
  );
}

function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const visualizer = useRef<HTMLCanvasElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const animationFrame = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const attempt = () => {
      if (started.current || !audio.current) return;
      audio.current.play().then(() => {
        if (cancelled) {
          audio.current?.pause();
          return;
        }
        started.current = true;
        setPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay; wait for a real user gesture.
      });
    };
    // Try immediately; most modern browsers allow muted/short audio, otherwise gesture needed.
    attempt();
    const onGesture = () => {
      // First real interaction: build the Web Audio graph + unmute so sound actually plays.
      startVisualizer()
        .then(() => {
          if (audio.current && audio.current.paused) {
            audio.current.play().then(() => setPlaying(true)).catch(() => {});
          }
        })
        .catch(() => {});
      if (muted) setMuted(false);
      document.removeEventListener("click", onGesture);
      document.removeEventListener("keydown", onGesture);
    };
    document.addEventListener("click", onGesture, { once: true });
    document.addEventListener("keydown", onGesture, { once: true });
    return () => {
      cancelled = true;
      document.removeEventListener("click", onGesture);
      document.removeEventListener("keydown", onGesture);
    };
  }, []);

  const drawRestingVisualizer = () => {
    const canvas = visualizer.current;
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.clearRect(0, 0, width, height);
    const bars = 32;
    const gap = 3;
    const barWidth = (width - gap * (bars - 1)) / bars;
    context.fillStyle = "rgba(182, 156, 255, 0.22)";
    for (let index = 0; index < bars; index++) {
      context.fillRect(index * (barWidth + gap), height / 2 - 1, barWidth, 2);
    }
  };

  const startVisualizer = async () => {
    if (!audio.current || !visualizer.current) return;
    if (!audioContext.current) {
      const context = new AudioContext();
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 128;
      analyserNode.smoothingTimeConstant = 0.82;
      const gain = context.createGain();
      gain.gain.value = muted ? 0 : volume;
      const sourceNode = context.createMediaElementSource(audio.current);
      sourceNode.connect(analyserNode);
      analyserNode.connect(gain);
      gain.connect(context.destination);
      audioContext.current = context;
      analyser.current = analyserNode;
      source.current = sourceNode;
      gainNode.current = gain;
    }
    await audioContext.current.resume();
    if (gainNode.current) gainNode.current.gain.value = muted ? 0 : volume;
    const canvas = visualizer.current;
    const context = canvas.getContext("2d");
    const analyserNode = analyser.current;
    if (!context || !analyserNode) return;
    const data = new Uint8Array(analyserNode.frequencyBinCount);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      analyserNode.getByteFrequencyData(data);

      const bars = 32;
      const gap = 3;
      const barWidth = (width - gap * (bars - 1)) / bars;
      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#7edfee");
      gradient.addColorStop(0.55, "#b69cff");
      gradient.addColorStop(1, "rgba(182, 156, 255, 0.12)");
      context.fillStyle = gradient;

      for (let index = 0; index < bars; index++) {
        const sample = data[Math.floor((index / bars) * data.length)];
        const barHeight = Math.max(3, (sample / 255) * (height * 0.92));
        const x = index * (barWidth + gap);
        const y = (height - barHeight) / 2;
        context.beginPath();
        context.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        context.fill();
      }
      animationFrame.current = requestAnimationFrame(render);
    };
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    render();
  };

  useEffect(() => {
    if (gainNode.current) gainNode.current.gain.value = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    if (playing) {
      if (audioContext.current) startVisualizer().catch(() => {});
      else drawRestingVisualizer();
    } else {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
      drawRestingVisualizer();
    }
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [playing, expanded]);

  useEffect(
    () => () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      audioContext.current?.close().catch(() => {});
    },
    [],
  );

  const toggle = () => {
    if (unavailable) return;
    if (playing) {
      audio.current?.pause();
      setPlaying(false);
    } else {
      setMuted(false);
      startVisualizer()
        .then(() => audio.current?.play())
        .catch(() => audio.current?.play().catch(() => {}));
    }
  };

  const time = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  const seek = (amount: number) => {
    if (!audio.current) return;
    const next = Math.max(0, Math.min(duration || 0, audio.current.currentTime + amount));
    audio.current.currentTime = next;
    setCurrent(next);
  };

  return (
    <aside
      className={`music-experience ${playing ? "is-playing" : ""} ${expanded ? "expanded" : ""}`}
      aria-label="Claire’s soundtrack"
    >
      <audio
        ref={audio}
        src="/audio/claire-song.mp3"
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onError={() => setUnavailable(true)}
      />
      <button className="music-launcher" onClick={() => setExpanded(true)}>
        <span className="launcher-orbit">
          <span className="launcher-core">
            <Music2 />
          </span>
        </span>
        <span className="launcher-copy">
          <small>{playing ? "Now playing" : "Claire’s soundtrack"}</small>
          <strong>{playing ? "Feel the moment" : "Open the player"}</strong>
        </span>
        <span className="mini-wave">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} />
          ))}
        </span>
      </button>

      <section className="music-sanctuary">
        <div className="player-aurora" />
        <div className="player-stars">
          {Array.from({ length: 14 }).map((_, i) => (
            <i key={i} style={{ left: `${(i * 43) % 94}%`, top: `${(i * 29) % 88}%` }} />
          ))}
        </div>
        <button
          className="player-close"
          onClick={() => setExpanded(false)}
          aria-label="Close player"
        >
          <X />
        </button>
        <div className="player-heading">
          <span>
            <Sparkles />A soundtrack for Claire
          </span>
          <small>Music makes memories breathe</small>
        </div>
        <div className="vinyl-stage">
          <div className="sound-rings">
            <i />
            <i />
            <i />
          </div>
          <div className="vinyl">
            <span className="vinyl-groove groove-one" />
            <span className="vinyl-groove groove-two" />
            <span className="vinyl-label">
              <b>C</b>
              <small>For Claire</small>
            </span>
          </div>
          <canvas
            ref={visualizer}
            className="audio-visualizer"
            aria-label={playing ? "Live music frequency visualizer" : "Music visualizer paused"}
          />
        </div>
        <div className="track-details">
          <span>
            {unavailable ? "Awaiting audio file" : playing ? "Now playing" : "Ready to play"}
          </span>
          <h2>{unavailable ? "Your song belongs here" : "Claire’s Song"}</h2>
          <p>
            {unavailable
              ? "Add claire-song.mp3 to the public/audio folder."
              : "One song, a thousand memories."}
          </p>
        </div>
        <div className="sanctuary-progress">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={current}
            onChange={(event) => {
              const value = Number(event.target.value);
              setCurrent(value);
              if (audio.current) audio.current.currentTime = value;
            }}
            aria-label="Song position"
          />
          <div>
            <small>{time(current)}</small>
            <small>{duration ? time(duration) : "--:--"}</small>
          </div>
        </div>
        <div className="player-controls">
          <button onClick={() => seek(-10)}>
            <RotateCcw />
            <small>10</small>
          </button>
          <button className={`main-play ${unavailable ? "unavailable" : ""}`} onClick={toggle}>
            {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </button>
          <button onClick={() => seek(10)}>
            <RotateCw />
            <small>10</small>
          </button>
        </div>
        <div className="volume-row">
          <button onClick={() => setMuted(!muted)}>{muted ? <VolumeX /> : <Volume2 />}</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <span>{Math.round((muted ? 0 : volume) * 100)}%</span>
        </div>
        <div className="player-signoff">
          <Sparkles />
          Good vibes, queued up
        </div>
      </section>
    </aside>
  );
}

function Background() {
  return (
    <div className="background" aria-hidden="true">
      <i />
      <i />
      <div className="leopard-field" />
      <div className="prowl-light" />
      <div className="grain" />
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            animationDelay: `${(i % 6) * -0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

function Landing({ go }: { go: (p: Page) => void }) {
  const [magic, setMagic] = useState(0);
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="kicker">A little corner for a great friend</div>
          <h1>
            For Claire, <em>full of vibes and laughs.</em>
          </h1>
          <p>
            A fun little corner of the internet for Claire. We met about a year and a half ago and
            have been close friends ever since, so here’s to the jokes, the energy, and all the good
            times.
          </p>
          <div className="actions">
            <button className="primary" onClick={() => go("gallery")}>
              Explore the memories <ArrowRight />
            </button>
            <button className="link" onClick={() => go("notes")}>
              Read a secret note
            </button>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit" />
          <figure className="photo back">
            <img src="/images/IMG-20261020-WA0004.jpg" alt="Me" />
          </figure>
          <figure className="photo front">
            <img src="/images/IMG-20261106-WA0020.jpg" alt="Claire" />
            <figcaption>
              <Sparkles />
              Good vibes
            </figcaption>
          </figure>
          <aside>
            <Quote />
            <p>Good friends make everything more fun.</p>
          </aside>
          <Star className="spark" />
        </div>
      </section>
      <div className="marquee">
        <span>
          <Sparkles />
          Made for a friend
        </span>
        <em>Great friends, good vibes, and funny moments.</em>
        <span>
          Just for Claire <Star />
        </span>
      </div>
      <section className={`surprise wrap ${magic > 0 ? "cosmic-active" : ""}`}>
        <div className="cosmic-card">
          <div className="cosmic-idle">
            <div className="cosmic-heart">
              <Sparkles />
              <i />
              <i />
            </div>
            <span className="kicker">One more thing</span>
            <h2>You’re an awesome friend.</h2>
            <p>A year and a half of friendship, plenty of laughs, and vibes that never miss.</p>
            <button className="primary cosmic-trigger" onClick={() => setMagic(magic + 1)}>
              <Sparkles />
              Open the vibe check
              <span />
            </button>
          </div>
          {magic > 0 && <CosmicReveal key={magic} replay={() => setMagic(magic + 1)} />}
        </div>
      </section>
    </>
  );
}

function CosmicReveal({ replay }: { replay: () => void }) {
  return (
    <div className="cosmic-reveal">
      <div className="cosmic-flash" />
      <div className="portal" aria-hidden="true">
        <div className="portal-glow" />
        <div className="portal-ring ring-one" />
        <div className="portal-ring ring-two" />
        <div className="portal-ring ring-three" />
        <div className="portal-core">
          <Sparkles />
        </div>
      </div>
      <div className="cosmic-stars" aria-hidden="true">
        {Array.from({ length: 46 }).map((_, i) => (
          <i
            key={i}
            style={
              {
                "--r": `${i * 7.83}deg`,
                "--d": `${120 + (i % 7) * 42}px`,
                "--delay": `${(i % 8) * 0.035}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="comets" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="cosmic-message">
        <span>1.5 years of friendship and counting</span>
        <h2>
          Always bringing
          <em>the vibes.</em>
        </h2>
        <p>Funny, full of energy, and a great friend to have around. Here’s to more good times.</p>
        <button onClick={replay}>
          <Sparkles />
          Play it again
        </button>
      </div>
    </div>
  );
}

function PageHero({
  kicker,
  children,
  text,
}: {
  kicker: string;
  children: React.ReactNode;
  text: string;
}) {
  return (
    <section className="page-hero wrap">
      <span className="kicker">{kicker}</span>
      <h1>{children}</h1>
      <p>{text}</p>
      <small>
        <i />
        Scroll to explore
      </small>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [likes, setLikes] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("claire-likes") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    document.body.style.overflow = active === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
  const move = (n: number) =>
    active !== null && setActive((active + n + photos.length) % photos.length);
  const like = (i: number) => {
    const next = likes.includes(i) ? likes.filter((x) => x !== i) : [...likes, i];
    setLikes(next);
    localStorage.setItem("claire-likes", JSON.stringify(next));
  };
  return (
    <div>
      <PageHero
        kicker="The memory archive"
        text="A collection of fun moments, good vibes, and snapshots worth keeping."
      >
        Moments worth
        <br />
        <em>looking back on.</em>
      </PageHero>
      <section className="gallery wrap">
        {photos.map((p, i) => (
          <article className={i % 4 === 0 ? "tall" : i % 3 === 0 ? "wide" : ""} key={p[1]}>
            <button className="image" onClick={() => setActive(i)}>
              <img src={p[0]} alt={p[2]} loading="lazy" />
              <i>0{i + 1}</i>
              <span>
                Open memory <ArrowRight />
              </span>
            </button>
            <div>
              <section>
                <h2>{p[1]}</h2>
                <p>{p[2]}</p>
              </section>
              <button
                className={likes.includes(i) ? "liked" : ""}
                onClick={() => like(i)}
                aria-label="Favorite"
              >
                <Star fill={likes.includes(i) ? "currentColor" : "none"} />
              </button>
            </div>
          </article>
        ))}
      </section>
      <ClairePhotoGallery />
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="close" onClick={() => setActive(null)}>
            <X />
          </button>
          <button className="prev" onClick={() => move(-1)}>
            <ChevronLeft />
          </button>
          <section>
            <img src={photos[active][0]} alt={photos[active][2]} />
            <div>
              <small>
                0{active + 1} / 0{photos.length}
              </small>
              <h2>{photos[active][1]}</h2>
              <p>{photos[active][2]}</p>
              <small>Photography by {photos[active][3]} via Unsplash</small>
            </div>
          </section>
          <button className="next" onClick={() => move(1)}>
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

function ClairePhotoGallery() {
  if (clairePhotos.length === 0) {
    return (
      <section className="personal-gallery wrap">
        <div className="personal-heading">
          <div>
            <span className="kicker">Claire’s photos</span>
            <h2>Add her photos in code.</h2>
          </div>
          <p>
            Put image files in <code>public/photos/</code> and add entries to{" "}
            <code>clairePhotos</code> in <code>src/App.tsx</code>. See{" "}
            <code>public/photos/README.md</code>.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="personal-gallery wrap">
      <div className="personal-heading">
        <div>
          <span className="kicker">Claire’s photos</span>
          <h2>Her moments belong here.</h2>
        </div>
        <p>Photos added in code from <code>public/photos/</code>.</p>
      </div>
      <div className="photo-slots">
        {clairePhotos.map((photo, index) => (
          <article className="has-photo" key={photo.src + index}>
            <img src={photo.src} alt={photo.title || `Claire’s photo ${index + 1}`} />
            <div className="slot-caption">
              <strong>{photo.title || `Photo ${index + 1}`}</strong>
              {photo.note && <small>{photo.note}</small>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Notes() {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) =>
    setOpen((x) => (x.includes(i) ? x.filter((n) => n !== i) : [...x, i]));
  return (
    <div>
      <PageHero
        kicker="Words for when you need them"
        text="Choose the one that finds you at the right moment. There is no wrong time to open a kind word."
      >
        Four notes,
        <br />
        <em>sealed with care.</em>
      </PageHero>
      <section className="notes wrap">
        {notes.map((n, i) => (
          <article className={open.includes(i) ? "revealed" : ""} key={n[1]}>
            <div className="note-front">
              <i>0{i + 1}</i>
              <LockKeyhole />
              <span>
                <small>{n[0]}</small>
                <h2>{n[1]}</h2>
              </span>
              <button onClick={() => toggle(i)}>
                Unseal this note <ArrowRight />
              </button>
            </div>
            <div className="note-back">
              <i>0{i + 1}</i>
              <Star fill="currentColor" />
              <span>
                <small>A note for Claire</small>
                <p>{n[2]}</p>
              </span>
              <button onClick={() => toggle(i)}>
                <ArrowLeft />
                Fold it away
              </button>
            </div>
          </article>
        ))}
      </section>
      <section className="notes-end wrap">
        <Sparkles />
        <h2>
          {open.length === notes.length
            ? "You found every note."
            : `${notes.length - open.length} kind words still waiting.`}
        </h2>
        <p>Come back whenever you need one.</p>
      </section>
    </div>
  );
}
