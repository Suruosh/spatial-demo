import { InformationPanel } from './InformationPanel';

interface InformationPageProps {
  onBack: () => void;
}

export function InformationPage({ onBack }: InformationPageProps) {
  return (
    <div className="w-full h-dvh flex items-center justify-center p-4 bg-linear-to-br from-gray-900 via-gray-950 to-black dark:from-gray-950 dark:via-black dark:to-black">
      <InformationPanel onAction={onBack} actionLabel="Back" />
    </div>
  );
}
