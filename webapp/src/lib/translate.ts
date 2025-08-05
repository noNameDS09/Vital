// lib/translate.ts
import axios from 'axios';

const API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const response = await axios.post(
      GOOGLE_TRANSLATE_API_URL,
      {
        q: text,
        target: targetLang,
        format: 'text',
      },
      {
        params: { key: API_KEY },
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to the original text if translation fails
  }
}
