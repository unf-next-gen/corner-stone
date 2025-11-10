import { Signal } from '@preact/signals-react';
import { ReactNode } from 'react';

export interface ConfirmationModalProps {
  opened: Signal<boolean>;
  positiveAction: () => void | Promise<void>;
  negativeAction?: () => void;
  header?: string | ReactNode;
  body: string | ReactNode;
  footer?: ReactNode;
  positiveLabel?: string;
  negativeLabel?: string;
  positiveColor?: string;
  centered?: boolean;
  loading?: boolean;
}

export interface BackButtonProps {
  text?: string;
  href?: string;
}

