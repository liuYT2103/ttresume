<template>
    <StablePage>
        <div class="w-full text-center text-6xl py-5">{{ t("RESUME_TITLE") }}</div>
        <div class="w-full flex justify-center">
            <FakeTerminal/>
        </div>
        <SideBar/>
    </StablePage>
</template>

<script setup lang='ts'>
import StablePage from '@/components/defaults/StablePage.vue';
import SideBar from '@/components/layout/SideBar.vue';
import FakeTerminal from '@/components/resume/FakeTerminal.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
</script>