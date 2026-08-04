import React, { useEffect } from 'react';
import { X, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean; onClose: () => void; onConfirm?: () => void; title: string;
  description?: React.ReactNode; variant?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string; cancelText?: string; isLoading?: boolean; children?: React.ReactNode;
}

const ICONS = {
  danger: <AlertTriangle className="w-6 h-6 text-red-600" />, warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />, success: <CheckCircle2 className="w-6 h-6 text-green-500" />,
};

export const Modal: React.FC<ModalProps> = ({
  isOpen, onClose, onConfirm, title, description, variant = 'danger',
  confirmText = 'Confirm', cancelText = 'Cancel', isLoading = false, children,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && isOpen && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 shrink-0">{ICONS[variant]}</div>
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        {description && <div className="text-xs text-gray-600 leading-relaxed">{description}</div>}
        {children && <div className="pt-2">{children}</div>}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>{cancelText}</Button>
          {onConfirm && <Button variant={variant === 'danger' ? 'danger' : 'primary'} size="sm" onClick={onConfirm} isLoading={isLoading}>{confirmText}</Button>}
        </div>
      </div>
    </div>
  );
};