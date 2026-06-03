
interface SubmittedDialogProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    isError?: boolean;
}

export default function SubmittedDialog({ isOpen, onClose, message, isError = false }: SubmittedDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-surface p-6 md:p-8 rounded-xl shadow-xl border border-border-subtle max-w-sm w-full">
                <div className="flex items-center mb-4">
                    {isError ? (
                        <svg className="h-8 w-8 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <h3 className={`text-2xl font-display font-medium ${isError ? 'text-red-700' : 'text-ink'}`}>
                        {isError ? 'Error' : 'Success'}
                    </h3>
                </div>
                <p className="text-ink-light mb-8 leading-relaxed font-body">{message}</p>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 bg-ink text-surface rounded-md font-bold uppercase tracking-widest text-sm hover:bg-primary transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
