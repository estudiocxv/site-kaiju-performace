import { whatsappUrl, messages } from '@/lib/whatsapp';
import { WhatsApp } from './icons';

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'ghost' | 'dark';
  className?: string;
};

export function WhatsAppButton({ message = messages.default, children = 'Pedir orçamento', variant = 'solid', className }: Props) {
  const cls = ['btn', variant === 'ghost' && 'btn--ghost', variant === 'dark' && 'btn--dark', className].filter(Boolean).join(' ');
  return (
    <a className={cls} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
      <WhatsApp size={20} />
      {children}
    </a>
  );
}
