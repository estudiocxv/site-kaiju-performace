/** Link do WhatsApp oficial com mensagem opcional já escrita. O número vem do painel (Dados da empresa). */
export function whatsappUrl(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const messages = {
  default: 'Olá, Kaiju! Vim pelo site e quero fazer um orçamento.',
  remap: (car: string) => `Olá, Kaiju! Quero um orçamento de remap para o meu ${car}.`,
  service: (name: string) => `Olá, Kaiju! Quero um orçamento de ${name.toLowerCase()}.`,
};
