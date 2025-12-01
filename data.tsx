import { Part, Language } from './types';
import { esContent } from './content/es';
import { enContent } from './content/en';

export const getCourseData = (lang: Language): Part[] => {
  return lang === 'es' ? esContent : enContent;
};
