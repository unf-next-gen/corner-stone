import { Signal } from '@preact/signals-react';
import { ReactNode } from 'react';

export type Volunteer = {
    id: number;
    created_at: Date;
    fName: string;
    lName: string;
    phone: string;
    email: string;
    availability: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };
}

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