<template>
    <div class="
        text-theme-tx bg-theme-card hover:bg-theme-card-hovered 
        p-2 rounded-full cursor-pointer transition-all
        relative group
    "
    @click="$emit('click')"
    >
        <HugeiconsIcon :icon/>
        <div class="
            absolute left-full ml-2 top-1/2 -translate-y-1/2
            whitespace-nowrap rounded-md
            bg-theme-card text-theme-tx text-sm
            pointer-events-auto
            transition-all duration-300
            scale-0 opacity-0 origin-left
            group-hover:scale-100 group-hover:opacity-100
        ">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { HugeiconsIcon } from '@hugeicons/vue';
defineProps<{
    icon: object
}>()
</script>