import { InformationPanel } from './InformationPanel';

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InformationModal({ isOpen, onClose }: InformationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" onClick={onClose} />

      <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto lg:overflow-hidden overflow-x-hidden pointer-events-none">
        <div className="min-h-dvh w-full flex flex-col">
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:p-12 flex flex-col lg:flex-row justify-between lg:items-center pt-[65vh] pb-30 lg:pt-0 lg:pb-0 pointer-events-none">
            <div className="hidden lg:block w-22 shrink-0" aria-hidden />
            <InformationPanel
              onAction={onClose}
              actionLabel="Close"
              className="max-h-[80vh] lg:max-h-none overflow-y-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
