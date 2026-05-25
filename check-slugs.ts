import { getDb } from './server/db';
import { editorials } from './drizzle/schema';
import { isNotNull, desc } from 'drizzle-orm';

const db = getDb();
const rows = await db.select({ id: editorials.id, slug: editorials.slug, title: editorials.title, categoryId: editorials.categoryId }).from(editorials).where(isNotNull(editorials.authorId)).orderBy(desc(editorials.publishedAt)).limit(8);
console.log(JSON.stringify(rows, null, 2));
process.exit(0);
