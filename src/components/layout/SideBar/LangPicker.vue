<template>
  <div class="flex flex-col gap-2 p-1.5">
    <div class="hover:bg-theme-card-hovered py-1 px-2 transition-all w-full text-center rounded-sm" 
        v-for="lang in langs" 
        :key="lang.value" 
        @click="toggleLang($event, lang)"
    >{{ lang.name }}</div>
  </div>
</template>

<script setup lang='ts'>
import { toggleWithAnimation } from '@/shared/animation'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
interface Lang {
    value: 'zh' | 'en'
    name: string
}
const langs:Lang[] = [
    { value: 'zh', name: '中文' },
    { value: 'en', name: 'English' }
]

const toggleLang = (event:MouseEvent, lang:Lang) => {
    toggleWithAnimation(event, () => locale.value = lang.value)
}
</script>