import { Language, LANGUAGE_VERSIONS } from '@/lib/constants/Languages'
import axios from 'axios'

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
})

export const executeCode = async (language: Language, sourceCode: string) => {
  const response = await API.post('/execute', {
    language,
    version: LANGUAGE_VERSIONS[language],
    source: sourceCode,
    files: [
      {
        content: sourceCode,
      },
    ],
  })
  return response.data
}
