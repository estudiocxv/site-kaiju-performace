import * as migration_20260918_171233_inicial from './20260918_171233_inicial';

export const migrations = [
  {
    up: migration_20260918_171233_inicial.up,
    down: migration_20260918_171233_inicial.down,
    name: '20260918_171233_inicial'
  },
];
