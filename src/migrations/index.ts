import * as migration_20260918_164401_inicial from './20260918_164401_inicial';

export const migrations = [
  {
    up: migration_20260918_164401_inicial.up,
    down: migration_20260918_164401_inicial.down,
    name: '20260918_164401_inicial'
  },
];
