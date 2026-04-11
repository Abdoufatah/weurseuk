const fetch = require('node-fetch');

// Récupérer les articles de test à supprimer
const testArticles = [
  'test-editorial-from-bensirac',
  'urgent-test-breaking-news'
];

async function deleteArticles() {
  const baseUrl = 'http://localhost:3000/api/trpc';
  
  for (const slug of testArticles) {
    try {
      const response = await fetch(`${baseUrl}/editorials.delete?input={"slug":"${slug}"}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(`Suppression de ${slug}: ${response.status}`);
    } catch (err) {
      console.error(`Erreur pour ${slug}:`, err.message);
    }
  }
}

deleteArticles();
