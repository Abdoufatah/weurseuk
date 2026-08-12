# Sécurité des données de test

Les tests de création d’éditoriaux, d’articles agrégés et d’alertes de dernière minute sont désormais isolés de la base publique. Ils remplacent les fonctions d’écriture par des mocks temporaires et restaurent automatiquement leur comportement normal après chaque scénario.

La suite de 40 tests a été exécutée le 12 août 2026, puis les trois tables publiques ont été contrôlées : aucun éditorial, article agrégé ou bandeau d’alerte de test n’est présent. Aucun script de seed de contenu fictif n’est lancé par les commandes `dev`, `start` ou `test`.
