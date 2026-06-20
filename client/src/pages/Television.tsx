import { useState } from "react";

const TV_CHANNELS = [
  {
    id: "rts",
    name: "RTS",
    fullName: "Radiodiffusion Télévision Sénégalaise",
    channelId: "UCdtKKcnU-hHejE2mVVk61kA",
    liveVideoId: "live_stream", // YouTube live stream embed
    color: "#006B3F", // vert sénégalais
    logo: "🇸🇳",
    description: "La chaîne publique nationale du Sénégal",
  },
  {
    id: "tfm",
    name: "TFM",
    fullName: "Télévision Futurs Médias",
    channelId: "UCRTvsVtErHN7whqmn8sbwvA",
    liveVideoId: "live_stream",
    color: "#E30613", // rouge TFM
    logo: "📺",
    description: "La première chaîne privée sénégalaise",
  },
  {
    id: "sentv",
    name: "SenTV",
    fullName: "Sénégal Télévision",
    channelId: "UClbOJguayTPGnpVXKDF3hRw",
    liveVideoId: "live_stream",
    color: "#FF6B00", // orange SenTV
    logo: "📡",
    description: "Chaîne d'information et de divertissement sénégalaise",
  },
];

export default function Television() {
  const [activeChannel, setActiveChannel] = useState(TV_CHANNELS[0]);
  const [embedMode, setEmbedMode] = useState<"live" | "videos">("videos");

  const getLiveEmbedUrl = (channelId: string) => {
    return `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&rel=0&modestbranding=1`;
  };

  const getVideosEmbedUrl = (channelId: string) => {
    return `https://www.youtube.com/embed?listType=user_uploads&list=${channelId}&autoplay=0&rel=0&modestbranding=1`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#111] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📺</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Télévision</h1>
              <p className="text-xs text-white/50">Chaînes sénégalaises en direct</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEmbedMode("live")}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                embedMode === "live"
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              🔴 Direct
            </button>
            <button
              onClick={() => setEmbedMode("videos")}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                embedMode === "videos"
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              ▶ Vidéos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sélecteur de chaînes */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Chaînes
            </h2>
            {TV_CHANNELS.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  activeChannel.id === channel.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/5 bg-white/5 hover:bg-white/8 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ backgroundColor: channel.color + "33", border: `1px solid ${channel.color}55` }}
                  >
                    <span style={{ color: channel.color }}>{channel.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">{channel.name}</div>
                    <div className="text-xs text-white/40 truncate">{channel.fullName}</div>
                  </div>
                </div>
                {activeChannel.id === channel.id && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-red-400">
                      {embedMode === "live" ? "En direct" : "Dernières vidéos"}
                    </span>
                  </div>
                )}
              </button>
            ))}

            {/* Note légale */}
            <div className="mt-6 p-3 rounded bg-white/5 border border-white/5">
              <p className="text-xs text-white/30 leading-relaxed">
                Les flux vidéo sont diffusés via YouTube. Weurseuk ne stocke aucun contenu et ne détient aucun droit sur les émissions diffusées.
              </p>
            </div>
          </div>

          {/* Lecteur principal */}
          <div className="lg:col-span-3">
            {/* Info chaîne active */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-2 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: activeChannel.color }}
              />
              <div>
                <h2 className="font-bold text-lg">{activeChannel.name}</h2>
                <p className="text-sm text-white/50">{activeChannel.description}</p>
              </div>
              {embedMode === "live" && (
                <span className="ml-auto flex items-center gap-1.5 bg-red-600/20 border border-red-600/30 text-red-400 text-xs px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  DIRECT
                </span>
              )}
            </div>

            {/* Iframe YouTube */}
            <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                key={`${activeChannel.id}-${embedMode}`}
                src={
                  embedMode === "live"
                    ? getLiveEmbedUrl(activeChannel.channelId)
                    : getVideosEmbedUrl(activeChannel.channelId)
                }
                title={`${activeChannel.name} - ${embedMode === "live" ? "Direct" : "Vidéos"}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Toutes les chaînes en miniature */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Autres chaînes
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {TV_CHANNELS.filter((c) => c.id !== activeChannel.id).map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-left"
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: channel.color + "33" }}
                    >
                      <span style={{ color: channel.color }}>{channel.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{channel.name}</div>
                      <div className="text-xs text-white/40">{channel.fullName}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
