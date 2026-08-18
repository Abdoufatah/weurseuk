const postId = "1169698876216799_122121487545311185";
const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

if (!token) throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN is not configured");

const query = new URLSearchParams({
  fields: "id,created_time,permalink_url,message,attachments{unshimmed_url,url,target}",
  access_token: token,
});
const response = await fetch(`https://graph.facebook.com/v26.0/${postId}?${query}`);
const payload = await response.json() as {
  id?: string;
  created_time?: string;
  permalink_url?: string;
  message?: string;
  attachments?: { data?: Array<{ unshimmed_url?: string; url?: string; target?: { url?: string } }> };
  error?: { message?: string };
};

if (!response.ok || !payload.id) {
  throw new Error(payload.error?.message ?? "Le post Facebook de test est introuvable");
}

console.log(JSON.stringify({
  id: payload.id,
  createdTime: payload.created_time,
  permalinkUrl: payload.permalink_url,
  includesCanonicalLink: [
    payload.message,
    ...((payload.attachments?.data ?? []).flatMap((attachment) => [attachment.unshimmed_url, attachment.url, attachment.target?.url])),
  ].some((value) => value?.includes("https://weurseuk.com/analyses/fonds-speciaux-senegal-reforme-necessaire-prise-en-otage")),
}));
