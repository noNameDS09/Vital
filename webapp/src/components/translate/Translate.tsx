// components/Translate.tsx
import { useEffect, useState } from 'react';
import { translateText } from '@/lib/translate';

interface TranslateProps {
  text: string;
  targetLang: string;
}

const Translate: React.FC<TranslateProps> = ({ text, targetLang }) => {
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      const translation = await translateText(text, targetLang);
      setTranslatedText(translation);
    };
    fetchTranslation();
  }, [text, targetLang]);

  return <span>{translatedText || text}</span>;
};

export default Translate;
