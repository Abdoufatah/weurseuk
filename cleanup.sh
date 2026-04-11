#!/bin/bash

# Récupérer tous les éditoriaux
echo "Récupération des éditoriaux..."
curl -s "http://localhost:3000/api/trpc/editorials.listAll" \
  -H "Content-Type: application/json" | jq '.result.data' > editorials.json

# Afficher les IDs des articles de test
echo "Articles trouvés:"
jq '.[] | select(.title | contains("Test")) | {id, title}' editorials.json

# Extraire les IDs des articles de test
TEST_IDS=$(jq '.[] | select(.title | contains("Test")) | .id' editorials.json)

echo "IDs à supprimer: $TEST_IDS"

# Supprimer chaque article de test
for ID in $TEST_IDS; do
  echo "Suppression de l'article ID $ID..."
  curl -s -X POST "http://localhost:3000/api/trpc/editorials.delete" \
    -H "Content-Type: application/json" \
    -d "{\"id\": $ID}" | jq '.'
done

echo "Suppression terminée"
