import type { Field } from 'payload';

/** Lista simples de frases, editada uma por linha. */
export const textList = (name: string, label: string, itemLabel = 'Item', description?: string): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: itemLabel, plural: label },
  admin: { description, initCollapsed: false },
  fields: [{ name: 'text', label: itemLabel, type: 'text', required: true }],
});

export const photo = (name: string, label: string, description?: string, required = false): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'midia',
  required,
  admin: { description },
});
