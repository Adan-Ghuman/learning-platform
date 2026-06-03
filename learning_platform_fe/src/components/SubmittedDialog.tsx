import React from 'react';

interface SubmittedDialogProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    isError?: boolean;
}

export default function SubmittedDialog({ isOpen, onClose, message, isError = false }: SubmittedDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-surface p-6 rounded-lg shadow-xl border border-border-subtle max-w-sm w-full">
                <h3 className={`text-xl font-display font-medium mb-2 ${isError ? 'text-red-700' : 'text-ink'}`}>
                    {isError ? 'Error' : 'Success'}
                </h3>
                <p className="text-ink-light mb-6">{message}</p>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
