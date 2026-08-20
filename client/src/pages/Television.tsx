import { useMemo, useState } from "react";
import { Globe2, Radio, Tv2 } from "lucide-react";

export type TvChannel = {
  id: string;
  name: string;
  fullName: string;
  channelId: string;
  color: string;
  description: string;
  group: "senegal" | "international";
  sourceUrl: string;
};

export const TV_CHANNELS: TvChannel[] = [
  {
    id: "rts",
    name: "RTS",
    fullName: "Radiodiffusion Télévision Sénégalaise",
    channelId: "UC3Pwur55-OPFYDN_xg6JR_w",
    color: "#18814B",
    description: "Service public audiovisuel du Sénégal",
    group: "senegal",
    sourceUrl: "https://www.youtube.com/@rts-radiotelevisionsenegalaise",
  },
  {
    id: "2stv",
    name: "2STV",
    fullName: "2STV Sénégal",
    channelId: "UCeLEGbj240J6JhpP7ba8GwA",
    color: "#E5A527",
    description: "Chaîne privée sénégalaise généraliste",
    group: "senegal",
    sourceUrl: "https://www.youtube.com/@2stvsenegal",
  },
  {
    id: "sentv",
    name: "SenTV",
    fullName: "Sen TV — D-Media",
    channelId: "UCKbMNmSR3KlI9v3xeInHEYA",
    color: "#F05A28",
    description: "Information, débats et programmes de D-Media",
    group: "senegal",
    sourceUrl: "https://www.youtube.com/@GroupeDMEDIACOM",
  },
  {
    id: "tfm",
    name: "TFM",
    fullName: "Télévision Futurs Médias",
    channelId: "UCRTvsVtErHN7whqmn8sbwvA",
    color: "#C9181F",
    description: "Actualité, culture et programmes du Groupe Futurs Médias",
    group: "senegal",
    sourceUrl: "https://www.youtube.com/channel/UCRTvsVtErHN7whqmn8sbwvA",
  },
  {
    id: "walf-tv",
    name: "Walf TV",
    fullName: "Walfadjri TV",
    channelId: "UCLx-m9nUdtVEF56rVQy_75Q",
    color: "#A31D24",
    description: "Débats, journaux et programmes du groupe Walfadjri",
    group: "senegal",
    sourceUrl: "https://www.youtube.com/@WalfadjriTV",
  },
  {
    id: "tv5monde",
    name: "TV5MONDE",
    fullName: "TV5MONDE",
    channelId: "UCJsZHPR1jqKu-soDmKNMBFg",
    color: "#174D92",
    description: "Télévision internationale francophone",
    group: "international",
    sourceUrl: "https://www.youtube.com/@TV5MONDE",
  },
  {
    id: "france24",
    name: "France 24",
    fullName: "France 24 — Français",
    channelId: "UCQfwfsi5VrQ8yKZ-UWmAEFg",
    color: "#35A8E0",
    description: "Information internationale en continu, en français",
    group: "international",
    sourceUrl: "https://www.youtube.com/@FRANCE24",
  },
];

const CHANNEL_GROUPS = [
  { id: "senegal" as const, label: "Sénégal", description: "Chaînes nationales" },
  { id: "international" as const, label: "International", description: "Regards francophones" },
];

export function getUploadsPlaylistId(channelId: string) {
  return channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : channelId;
}

function ChannelMark({ channel, compact = false }: { channel: TvChannel; compact?: boolean }) {
  return (
    <span
      className={`${compact ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-xs"} inline-flex shrink-0 items-center justify-center rounded-full border font-black tracking-[-0.06em]`}
      style={{
        backgroundColor: `${channel.color}24`,
        borderColor: `${channel.color}80`,
        color: channel.color,
      }}
      aria-hidden="true"
    >
      {channel.name.replace(/\s/g, "").slice(0, 3).toUpperCase()}
    </span>
  );
}

export default function Television() {
  const [activeChannel, setActiveChannel] = useState<TvChannel>(TV_CHANNELS[0]);
  const [embedMode, setEmbedMode] = useState<"live" | "videos">("videos");

  const channelsByGroup = useMemo(
    () =>
      CHANNEL_GROUPS.map((group) => ({
        ...group,
        channels: TV_CHANNELS.filter((channel) => channel.group === group.id),
      })),
    [],
  );

  const getLiveEmbedUrl = (channelId: string) =>
    `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&rel=0&modestbranding=1`;

  const getVideosEmbedUrl = (channelId: string) =>
    `https://www.youtube-nocookie.com/embed?listType=playlist&list=${getUploadsPlaylistId(channelId)}&autoplay=0&rel=0&modestbranding=1`;

  const selectChannel = (channel: TvChannel) => setActiveChannel(channel);

  return (
    <main className="min-h-screen bg-[#0c0d0d] text-white">
      <section className="border-b border-white/10 bg-[linear-gradient(120deg,#121616_0%,#101010_60%,#15221d_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d6a847]/35 bg-[#d6a847]/10 text-[#d6a847]">
              <Tv2 className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d6a847]">Weurseuk Télévision</p>
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Regarder les chaînes de référence</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/55">
                Une sélection de chaînes sénégalaises et de médias internationaux consultables depuis leurs comptes officiels.
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit rounded-full border border-white/10 bg-black/20 p-1 text-xs font-semibold">
            <button
              onClick={() => setEmbedMode("videos")}
              className={`rounded-full px-4 py-2 transition-colors ${embedMode === "videos" ? "bg-[#d6a847] text-[#17120a]" : "text-white/55 hover:text-white"}`}
            >
              Dernières vidéos
            </button>
            <button
              onClick={() => setEmbedMode("live")}
              className={`rounded-full px-4 py-2 transition-colors ${embedMode === "live" ? "bg-red-600 text-white" : "text-white/55 hover:text-white"}`}
            >
              Direct si disponible
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[292px_minmax(0,1fr)]">
          <aside className="space-y-6" aria-label="Sélection des chaînes">
            {channelsByGroup.map((group) => (
              <section key={group.id}>
                <div className="mb-3 flex items-baseline gap-2">
                  {group.id === "senegal" ? <Radio className="h-3.5 w-3.5 text-[#d6a847]" /> : <Globe2 className="h-3.5 w-3.5 text-[#d6a847]" />}
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{group.label}</h2>
                  <span className="text-[10px] text-white/25">{group.description}</span>
                </div>
                <div className="space-y-2">
                  {group.channels.map((channel) => {
                    const isActive = activeChannel.id === channel.id;
                    return (
                      <button
                        key={channel.id}
                        onClick={() => selectChannel(channel)}
                        className={`group w-full rounded-xl border p-3 text-left transition-all duration-200 ${
                          isActive
                            ? "border-white/25 bg-white/[0.09] shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
                            : "border-white/[0.07] bg-white/[0.035] hover:border-white/15 hover:bg-white/[0.065]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <ChannelMark channel={channel} compact />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-white">{channel.name}</span>
                            <span className="mt-0.5 block truncate text-[11px] text-white/40">{channel.fullName}</span>
                          </span>
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#d6a847]" aria-label="Chaîne sélectionnée" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            <p className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-xs leading-relaxed text-white/35">
              Les lecteurs proviennent de YouTube. Weurseuk ne stocke ni ne rediffuse les programmes ; l’accès dépend de la disponibilité de chaque chaîne.
            </p>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              <ChannelMark channel={activeChannel} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-semibold">{activeChannel.name}</h2>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.13em] ${embedMode === "live" ? "border-red-400/35 bg-red-500/10 text-red-300" : "border-white/10 bg-white/5 text-white/45"}`}>
                    {embedMode === "live" ? "Direct" : "Vidéos récentes"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/50">{activeChannel.description}</p>
              </div>
              <a
                href={activeChannel.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#e5ba61] underline-offset-4 hover:underline"
              >
                Voir la chaîne officielle
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/25">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  key={`${activeChannel.id}-${embedMode}`}
                  src={embedMode === "live" ? getLiveEmbedUrl(activeChannel.channelId) : getVideosEmbedUrl(activeChannel.channelId)}
                  title={`${activeChannel.name} — ${embedMode === "live" ? "Direct" : "Dernières vidéos"}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Passer à une autre chaîne</h3>
                <span className="text-xs text-white/30">{TV_CHANNELS.length} sources sélectionnées</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                {TV_CHANNELS.filter((channel) => channel.id !== activeChannel.id).map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => selectChannel(channel)}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] p-2.5 text-left transition-colors hover:border-white/15 hover:bg-white/[0.07]"
                  >
                    <ChannelMark channel={channel} compact />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{channel.name}</span>
                      <span className="block truncate text-[10px] text-white/35">{channel.group === "senegal" ? "Sénégal" : "International"}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
