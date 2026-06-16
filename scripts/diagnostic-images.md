# Diagnostic images articles

## Problème signalé par Fatah
Sur smartphone : les images de l'article précédent (Sonko/Assemblée nationale) s'affichent à la place de celles de l'article dette cachée.
Sur ordinateur : c'est correct.

## Observations

### Article dette cachée (ID 1860007)
- coverImageUrl: https://i.imgur.com/s2BDkNU.jpeg (image Sonko/Diomaye Faye)
- Cette image est celle de l'article précédent sur Sonko et l'Assemblée nationale

### Problème identifié
L'image `https://i.imgur.com/s2BDkNU.jpeg` est l'image de l'article sur Sonko et l'Assemblée nationale.
Elle a été réutilisée par erreur comme coverImageUrl de l'article dette cachée.

### Solution
Remplacer le coverImageUrl de l'article 1860007 par la vignette poster extraite de la vidéo :
`/manus-storage/sonko-dette-poster_6a5b10b1.jpg`

Cela rend le traitement cohérent : l'article sur la dette cachée utilise une image tirée de SA vidéo (Sonko face caméra pendant l'interview RFI/France 24 avec le bandeau EXCLUSIF).
