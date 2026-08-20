export type TvChannel = {
  id: string;
  name: string;
  fullName: string;
  channelId: string;
  color: string;
  description: string;
  group: "senegal" | "international";
  sourceUrl: string;
  isArchive?: boolean;
};

export const TV_CHANNELS: TvChannel[] = [
  { id: "rts", name: "RTS", fullName: "Radiodiffusion Télévision Sénégalaise", channelId: "UC3Pwur55-OPFYDN_xg6JR_w", color: "#18814B", description: "Service public audiovisuel du Sénégal", group: "senegal", sourceUrl: "https://www.youtube.com/@rts-radiotelevisionsenegalaise" },
  { id: "2stv", name: "2STV", fullName: "2STV Sénégal", channelId: "UCeLEGbj240J6JhpP7ba8GwA", color: "#E5A527", description: "Chaîne privée sénégalaise généraliste", group: "senegal", sourceUrl: "https://www.youtube.com/@2stvsenegal" },
  { id: "sentv", name: "SenTV", fullName: "Sen TV — D-Media", channelId: "UCKbMNmSR3KlI9v3xeInHEYA", color: "#F05A28", description: "Information, débats et programmes de D-Media", group: "senegal", sourceUrl: "https://www.youtube.com/@GroupeDMEDIACOM" },
  { id: "tfm", name: "TFM", fullName: "Télévision Futurs Médias", channelId: "UC5NQ49FVRIAuWE1el6L2gkg", color: "#C9181F", description: "Actualité, culture et programmes du Groupe Futurs Médias", group: "senegal", sourceUrl: "https://www.youtube.com/@tfmsn" },
  { id: "walf-tv", name: "Walf TV", fullName: "Walfadjri TV", channelId: "UCLx-m9nUdtVEF56rVQy_75Q", color: "#A31D24", description: "Débats, journaux et programmes du groupe Walfadjri", group: "senegal", sourceUrl: "https://www.youtube.com/@WalfadjriTV" },
  { id: "itv-senegal", name: "iTV", fullName: "iTV Sénégal — Emedia", channelId: "UCIdNAY1QlzXahhX6lsZv2kg", color: "#2B7ED1", description: "Information et programmes du groupe Emedia", group: "senegal", sourceUrl: "https://www.youtube.com/@iTvSenegal" },
  { id: "marodi-tv", name: "Marodi TV", fullName: "Marodi TV Sénégal", channelId: "UCqe0sSESmaQbLFdTExctQLA", color: "#EAB308", description: "Créations audiovisuelles et séries sénégalaises", group: "senegal", sourceUrl: "https://www.youtube.com/@maroditvprod" },
  { id: "evenprod", name: "Evenprod", fullName: "Evenprod Sénégal", channelId: "UCKKbOgsOxOT83r1TdfjMaYg", color: "#C92A2A", description: "Productions, documentaires et créations originales", group: "senegal", sourceUrl: "https://www.youtube.com/@evenprod" },
  { id: "canal-info-news", name: "Canal Info News", fullName: "Canal Info News — Archives", channelId: "PLBtKFt06Urb4n-6wzf8YI3SV4hUPhC3yT", color: "#64748B", description: "Archives audiovisuelles : la chaîne n’est plus en diffusion active", group: "senegal", sourceUrl: "https://www.youtube.com/playlist?list=PLBtKFt06Urb4n-6wzf8YI3SV4hUPhC3yT", isArchive: true },
  { id: "tv5monde", name: "TV5MONDE", fullName: "TV5MONDE", channelId: "UCJsZHPR1jqKu-soDmKNMBFg", color: "#174D92", description: "Télévision internationale francophone", group: "international", sourceUrl: "https://www.youtube.com/@TV5MONDE" },
  { id: "france24", name: "France 24", fullName: "France 24 — Français", channelId: "UCQfwfsi5VrQ8yKZ-UWmAEFg", color: "#35A8E0", description: "Information internationale en continu, en français", group: "international", sourceUrl: "https://www.youtube.com/@FRANCE24" },
];

export function getUploadsPlaylistId(channelId: string) {
  return channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : channelId;
}

export function isEmbeddableChannel(channel: TvChannel) {
  return !channel.isArchive;
}

export function getTelevisionChannel(channelId: string | null | undefined) {
  return TV_CHANNELS.find((channel) => channel.id === channelId);
}
