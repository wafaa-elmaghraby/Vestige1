import ArchiveApp from '@/components/ArchiveApp';
import { LanguageProvider } from '@/i18n/LanguageContext';
import '@/styles/archive-theme.css';
import '@/styles/rtl.css';
import 'leaflet/dist/leaflet.css';

export default function Index() {
  return (
    <LanguageProvider>
      <ArchiveApp />
    </LanguageProvider>
  );
}