import * as migration_20260918_171233_inicial from './20260918_171233_inicial';
import * as migration_20260918_231223_blob from './20260918_231223_blob';

export const migrations = [
  {
    up: migration_20260918_171233_inicial.up,
    down: migration_20260918_171233_inicial.down,
    name: '20260918_171233_inicial',
  },
  {
    up: migration_20260918_231223_blob.up,
    down: migration_20260918_231223_blob.down,
    name: '20260918_231223_blob'
  },
];
