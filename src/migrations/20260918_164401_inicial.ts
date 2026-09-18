import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`veiculos_stages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`cv\` numeric NOT NULL,
  	\`kgfm\` numeric NOT NULL,
  	\`cv_text\` text,
  	\`kgfm_text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`veiculos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`veiculos_stages_order_idx\` ON \`veiculos_stages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_stages_parent_id_idx\` ON \`veiculos_stages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`veiculos_specs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`veiculos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`veiculos_specs_order_idx\` ON \`veiculos_specs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_specs_parent_id_idx\` ON \`veiculos_specs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`veiculos_notes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`veiculos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`veiculos_notes_order_idx\` ON \`veiculos_notes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_notes_parent_id_idx\` ON \`veiculos_notes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`veiculos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`published\` integer DEFAULT true,
  	\`slug\` text,
  	\`origin\` text DEFAULT 'kaiju',
  	\`title\` text,
  	\`brand\` text NOT NULL,
  	\`family\` text NOT NULL,
  	\`version\` text NOT NULL,
  	\`years\` text,
  	\`category\` text DEFAULT 'turbo-gasolina' NOT NULL,
  	\`engine\` text,
  	\`poster_id\` integer,
  	\`instagram\` text,
  	\`instagram_date\` text,
  	\`published_result_title\` text,
  	\`published_result_text\` text,
  	\`published_result_instagram\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`veiculos_slug_idx\` ON \`veiculos\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_brand_idx\` ON \`veiculos\` (\`brand\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_poster_idx\` ON \`veiculos\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_updated_at_idx\` ON \`veiculos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`veiculos_created_at_idx\` ON \`veiculos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`veiculos_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`veiculos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`veiculos_texts_order_parent\` ON \`veiculos_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`servicos_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`servicos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`servicos_items_order_idx\` ON \`servicos_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`servicos_items_parent_id_idx\` ON \`servicos_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`servicos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`name\` text NOT NULL,
  	\`lead\` text NOT NULL,
  	\`photo_id\` integer NOT NULL,
  	\`cta\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`servicos__order_idx\` ON \`servicos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`servicos_photo_idx\` ON \`servicos\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`servicos_updated_at_idx\` ON \`servicos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`servicos_created_at_idx\` ON \`servicos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`avaliacoes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`author\` text NOT NULL,
  	\`rating\` text DEFAULT '5' NOT NULL,
  	\`text\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`avaliacoes__order_idx\` ON \`avaliacoes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`avaliacoes_updated_at_idx\` ON \`avaliacoes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`avaliacoes_created_at_idx\` ON \`avaliacoes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`avaliacoes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`midia_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`avaliacoes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`midia_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`avaliacoes_rels_order_idx\` ON \`avaliacoes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`avaliacoes_rels_parent_idx\` ON \`avaliacoes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`avaliacoes_rels_path_idx\` ON \`avaliacoes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`avaliacoes_rels_midia_id_idx\` ON \`avaliacoes_rels\` (\`midia_id\`);`)
  await db.run(sql`CREATE TABLE \`eventos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`name\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`place\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`instagram\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`eventos__order_idx\` ON \`eventos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventos_updated_at_idx\` ON \`eventos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`eventos_created_at_idx\` ON \`eventos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eventos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`midia_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`eventos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`midia_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventos_rels_order_idx\` ON \`eventos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`eventos_rels_parent_idx\` ON \`eventos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eventos_rels_path_idx\` ON \`eventos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`eventos_rels_midia_id_idx\` ON \`eventos_rels\` (\`midia_id\`);`)
  await db.run(sql`CREATE TABLE \`midia\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`credit\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumb_url\` text,
  	\`sizes_thumb_width\` numeric,
  	\`sizes_thumb_height\` numeric,
  	\`sizes_thumb_mime_type\` text,
  	\`sizes_thumb_filesize\` numeric,
  	\`sizes_thumb_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`midia_updated_at_idx\` ON \`midia\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`midia_created_at_idx\` ON \`midia\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`midia_filename_idx\` ON \`midia\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`midia_sizes_thumb_sizes_thumb_filename_idx\` ON \`midia\` (\`sizes_thumb_filename\`);`)
  await db.run(sql`CREATE TABLE \`usuarios_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`usuarios_sessions_order_idx\` ON \`usuarios_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`usuarios_sessions_parent_id_idx\` ON \`usuarios_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`usuarios\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`usuarios_updated_at_idx\` ON \`usuarios\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`usuarios_created_at_idx\` ON \`usuarios\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`usuarios_email_idx\` ON \`usuarios\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`veiculos_id\` integer,
  	\`servicos_id\` integer,
  	\`avaliacoes_id\` integer,
  	\`eventos_id\` integer,
  	\`midia_id\` integer,
  	\`usuarios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`veiculos_id\`) REFERENCES \`veiculos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`servicos_id\`) REFERENCES \`servicos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`avaliacoes_id\`) REFERENCES \`avaliacoes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`eventos_id\`) REFERENCES \`eventos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`midia_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`usuarios_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_veiculos_id_idx\` ON \`payload_locked_documents_rels\` (\`veiculos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_servicos_id_idx\` ON \`payload_locked_documents_rels\` (\`servicos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_avaliacoes_id_idx\` ON \`payload_locked_documents_rels\` (\`avaliacoes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_eventos_id_idx\` ON \`payload_locked_documents_rels\` (\`eventos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_midia_id_idx\` ON \`payload_locked_documents_rels\` (\`midia_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_usuarios_id_idx\` ON \`payload_locked_documents_rels\` (\`usuarios_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`usuarios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`usuarios_id\`) REFERENCES \`usuarios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_usuarios_id_idx\` ON \`payload_preferences_rels\` (\`usuarios_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pagina_inicial_about_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagina_inicial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagina_inicial_about_paragraphs_order_idx\` ON \`pagina_inicial_about_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_about_paragraphs_parent_id_idx\` ON \`pagina_inicial_about_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pagina_inicial_about_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`term\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagina_inicial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagina_inicial_about_facts_order_idx\` ON \`pagina_inicial_about_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_about_facts_parent_id_idx\` ON \`pagina_inicial_about_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pagina_inicial_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagina_inicial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagina_inicial_process_steps_order_idx\` ON \`pagina_inicial_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_process_steps_parent_id_idx\` ON \`pagina_inicial_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pagina_inicial\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_line1\` text NOT NULL,
  	\`hero_line2\` text NOT NULL,
  	\`hero_highlight\` text NOT NULL,
  	\`hero_lead\` text NOT NULL,
  	\`hero_primary_button\` text NOT NULL,
  	\`hero_secondary_button\` text NOT NULL,
  	\`hero_video_wide_id\` integer,
  	\`hero_poster_wide_id\` integer,
  	\`hero_video_tall_id\` integer,
  	\`hero_poster_tall_id\` integer,
  	\`about_label\` text,
  	\`about_title\` text NOT NULL,
  	\`about_motto\` text,
  	\`about_signature_name\` text,
  	\`about_signature_tagline\` text,
  	\`about_signature_line\` text,
  	\`about_main_photo_id\` integer NOT NULL,
  	\`about_second_photo_id\` integer,
  	\`about_main_caption\` text,
  	\`process_title\` text NOT NULL,
  	\`process_intro\` text,
  	\`services_label\` text,
  	\`services_title\` text NOT NULL,
  	\`services_intro\` text,
  	\`stages_label\` text,
  	\`stages_title\` text NOT NULL,
  	\`stages_intro\` text,
  	\`stages_stage1_name\` text NOT NULL,
  	\`stages_stage1_lead\` text NOT NULL,
  	\`stages_stage2_name\` text NOT NULL,
  	\`stages_stage2_lead\` text NOT NULL,
  	\`stages_stage3_hint\` text,
  	\`stages_warning\` text,
  	\`remap_label\` text,
  	\`remap_title\` text NOT NULL,
  	\`reviews_label\` text,
  	\`reviews_title\` text NOT NULL,
  	\`reviews_intro\` text,
  	\`reviews_more_button\` text,
  	\`events_label\` text,
  	\`events_title\` text NOT NULL,
  	\`contact_label\` text,
  	\`contact_title\` text NOT NULL,
  	\`contact_lead\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_video_wide_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_poster_wide_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_video_tall_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_poster_tall_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_main_photo_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_second_photo_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pagina_inicial_hero_hero_video_wide_idx\` ON \`pagina_inicial\` (\`hero_video_wide_id\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_hero_hero_poster_wide_idx\` ON \`pagina_inicial\` (\`hero_poster_wide_id\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_hero_hero_video_tall_idx\` ON \`pagina_inicial\` (\`hero_video_tall_id\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_hero_hero_poster_tall_idx\` ON \`pagina_inicial\` (\`hero_poster_tall_id\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_about_about_main_photo_idx\` ON \`pagina_inicial\` (\`about_main_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`pagina_inicial_about_about_second_photo_idx\` ON \`pagina_inicial\` (\`about_second_photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pagina_inicial_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pagina_inicial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagina_inicial_texts_order_parent\` ON \`pagina_inicial_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`textos_remap\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`disclaimer\` text NOT NULL,
  	\`not_listed_title\` text,
  	\`not_listed_text\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`textos_remap_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`textos_remap\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`textos_remap_texts_order_parent\` ON \`textos_remap_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`empresa_bio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`empresa\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`empresa_bio_order_idx\` ON \`empresa_bio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`empresa_bio_parent_id_idx\` ON \`empresa_bio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`empresa\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`cnpj\` text,
  	\`slogan\` text,
  	\`signature\` text,
  	\`whatsapp_display\` text NOT NULL,
  	\`whatsapp_number\` text NOT NULL,
  	\`address_street\` text NOT NULL,
  	\`address_district\` text NOT NULL,
  	\`address_city\` text NOT NULL,
  	\`address_state\` text NOT NULL,
  	\`address_zip\` text NOT NULL,
  	\`schedule\` text,
  	\`social_instagram\` text,
  	\`social_instagram_handle\` text,
  	\`social_facebook\` text,
  	\`social_google_reviews\` text,
  	\`url\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`seo\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`share_title\` text,
  	\`share_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`share_image_id\`) REFERENCES \`midia\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`seo_share_image_idx\` ON \`seo\` (\`share_image_id\`);`)
  await db.run(sql`CREATE TABLE \`seo_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`seo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`seo_texts_order_parent\` ON \`seo_texts\` (\`order\`,\`parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`veiculos_stages\`;`)
  await db.run(sql`DROP TABLE \`veiculos_specs\`;`)
  await db.run(sql`DROP TABLE \`veiculos_notes\`;`)
  await db.run(sql`DROP TABLE \`veiculos\`;`)
  await db.run(sql`DROP TABLE \`veiculos_texts\`;`)
  await db.run(sql`DROP TABLE \`servicos_items\`;`)
  await db.run(sql`DROP TABLE \`servicos\`;`)
  await db.run(sql`DROP TABLE \`avaliacoes\`;`)
  await db.run(sql`DROP TABLE \`avaliacoes_rels\`;`)
  await db.run(sql`DROP TABLE \`eventos\`;`)
  await db.run(sql`DROP TABLE \`eventos_rels\`;`)
  await db.run(sql`DROP TABLE \`midia\`;`)
  await db.run(sql`DROP TABLE \`usuarios_sessions\`;`)
  await db.run(sql`DROP TABLE \`usuarios\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`pagina_inicial_about_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`pagina_inicial_about_facts\`;`)
  await db.run(sql`DROP TABLE \`pagina_inicial_process_steps\`;`)
  await db.run(sql`DROP TABLE \`pagina_inicial\`;`)
  await db.run(sql`DROP TABLE \`pagina_inicial_texts\`;`)
  await db.run(sql`DROP TABLE \`textos_remap\`;`)
  await db.run(sql`DROP TABLE \`textos_remap_texts\`;`)
  await db.run(sql`DROP TABLE \`empresa_bio\`;`)
  await db.run(sql`DROP TABLE \`empresa\`;`)
  await db.run(sql`DROP TABLE \`seo\`;`)
  await db.run(sql`DROP TABLE \`seo_texts\`;`)
}
