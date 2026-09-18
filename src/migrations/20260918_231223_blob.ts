import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`midia\` ADD \`prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`midia\` ADD \`_objectkey\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`midia\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`midia\` DROP COLUMN \`_objectkey\`;`)
}
