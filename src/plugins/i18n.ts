import { createI18n } from 'vue-i18n'
import zh from '@/locale/zh/common.json'
import en from '@/locale/en/common.json'

type MessageSchema = typeof zh

const i18n = createI18n<MessageSchema, 'zh' | 'en'>({
    legacy: false,
    locale: 'zh',
    messages: {zh, en}
})
export default i18n