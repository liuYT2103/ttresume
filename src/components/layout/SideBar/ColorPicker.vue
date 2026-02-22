<template>
    <div class="flex flex-row md:flex-col gap-2 p-1.5">
        <div class="size-5 rounded-full opacity-65 hover:opacity-100"
            :style="{
                backgroundColor: theme.colorStr
            }"
            v-for="theme in themes" 
            :key="theme.colorName"
            @click="toggleTheme($event, theme)"
        ></div>
    </div>
</template>

<script setup lang='ts'>
import { toggleWithAnimation } from '@/shared/animation'
import { onMounted, ref } from 'vue'

interface ThemePicker {
    colorStr:string,
    colorName:string
}
const genColor = (colorStr: string, colorName: string) => ({colorStr, colorName})
const themes = [
    genColor('oklch(80% 0.2 144)', 'root'),
    genColor('oklch(80% 0.2 350)', 'pink'),
    genColor('oklch(50% 0.0 360)', 'gary'),
    genColor('oklch(50% 0.2 80)', 'yellow'),
]
const toggleThemeFunc =  function(theme:ThemePicker) {
    document.documentElement.classList.remove('pink', 'gary', 'yellow')
    if (theme.colorName !== 'root') {
        document.documentElement.classList.add(theme.colorName)
    }
}
const toggleTheme = (event:MouseEvent, theme:ThemePicker) => {
    toggleWithAnimation(event, () => toggleThemeFunc(theme))
}
</script>