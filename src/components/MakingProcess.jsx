// MakingProcess.jsx
import { useState } from "react";

const videos = [
  {
    id: 1,
    src: "/video/v2.mp4",
    title: "The Foundation",
    subtitle: "Preparing the canvas",
  },
  {
    id: 2,
    src: "/video/v3.mp4",
    title: "The Calligraphy",
    subtitle: "Writing sacred verses",
  },
];

export default function MakingProcess() {
  const [playing, setPlaying] = useState(null);

  const handlePlay = (id, e) => {
    const video = e.currentTarget.querySelector("video");
    if (playing === id) {
      video.pause();
      setPlaying(null);
    } else {
      // Pause all others
      document.querySelectorAll(".process-video").forEach((v) => v.pause());
      video.play();
      setPlaying(id);
    }
  };

  return (
    <section className="bg-[#FAF6F1] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.45em" }}
            className="text-[#C4A265] text-[9px] uppercase mb-4"
          >
            Behind the Art
          </p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl md:text-5xl font-light text-[#3a2e22] mb-4"
          >
            The Making <em className="italic text-[#C4A265]">Process</em>
          </h2>
          <div
            className="w-14 h-px mx-auto"
            style={{ background: "linear-gradient(to right, transparent, #C4A265, transparent)" }}
          />
          <p className="text-[#8C7B6E] text-sm mt-5 max-w-md mx-auto leading-relaxed">
            Every piece is crafted by hand — from the first brushstroke to the final pearl. Watch how each artwork comes to life.
          </p>
        </div>

        {/* Video Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videos.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer"
              onClick={(e) => handlePlay(item.id, e)}
            >
              {/* Video wrapper */}
              <div className="relative overflow-hidden aspect-[9/16] md:aspect-[3/4] bg-[#2a1f0e]">
     <video
  className="process-video w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  src={item.src}
  muted
  playsInline
  preload="auto"
  autoPlay
  loop
/>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[rgba(10,8,5,0.75)] via-transparent to-transparent transition-opacity duration-300 ${
                    playing === item.id ? "opacity-60" : "opacity-100"
                  }`}
                />

                {/* Play / Pause button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-14 h-14 rounded-full border border-[#C4A265] flex items-center justify-center transition-all duration-300 ${
                      playing === item.id
                        ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                        : "opacity-100 bg-[rgba(0,0,0,0.3)]"
                    }`}
                  >
                    {playing === item.id ? (
                      /* Pause icon */
                      <div className="flex gap-1">
                        <div className="w-[3px] h-5 bg-[#C4A265]" />
                        <div className="w-[3px] h-5 bg-[#C4A265]" />
                      </div>
                    ) : (
                      /* Play icon */
                      <div
                        className="w-0 h-0 ml-1"
                        style={{
                          borderTop: "8px solid transparent",
                          borderBottom: "8px solid transparent",
                          borderLeft: "14px solid #C4A265",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p
                    style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.2em" }}
                    className="text-[#f5f0e8] text-xs uppercase mb-1"
                  >
                    {item.title}
                  </p>
                  <p className="text-[rgba(245,240,232,0.55)] text-[11px] tracking-widest uppercase">
                    {item.subtitle}
                  </p>
                </div>

                {/* Gold corner accent */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C4A265] opacity-60" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C4A265] opacity-60" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <div
            className="w-14 h-px mx-auto mb-5"
            style={{ background: "linear-gradient(to right, transparent, #C4A265, transparent)" }}
          />
          <p
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.35em" }}
            className="text-[#C4A265] text-[9px] uppercase"
          >
            Each piece takes 3–5 days to complete
          </p>
        </div>

      </div>
    </section>
  );
}