import { site } from '@/content/site';

/** Link do WhatsApp oficial com mensagem opcional já escrita. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const messages = {
  default: 'Olá, Kaiju! Vim pelo site e quero fazer um orçamento.',
  remap: (car: string) => `Olá, Kaiju! Quero um orçamento de remap para o meu ${car}.`,
  project: (car: string) => `Olá, Kaiju! Vi o projeto ${car} no site e quero conversar sobre o meu carro.`,
  service: (name: string) => `Olá, Kaiju! Quero um orçamento de ${name.toLowerCase()}.`,
};
