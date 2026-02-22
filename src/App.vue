<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
onMounted(() => {
  document.title = t('RESUME_TITLE')
})
</script>
<template>
  <RouterView/>
</template>
<style scoped></style>
