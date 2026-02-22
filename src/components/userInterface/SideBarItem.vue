<template>
    <div class="
        text-theme-tx bg-theme-card hover:bg-theme-card-hovered 
        p-2 rounded-full cursor-pointer transition-all
        relative group focus:outline-none
    "
    tabindex="0"
    >
        <HugeiconsIcon :icon/>
        <div class="
            absolute whitespace-nowrap rounded-md bg-theme-card text-theme-tx text-sm
            pointer-events-auto transition-all duration-300
            scale-0 opacity-0 
            group-hover:scale-100 group-hover:opacity-100
            group-focus:scale-100 group-focus:opacity-100
            bottom-full mb-2           
            left-1/2 -translate-x-1/2
            origin-bottom
            md:ml-8             
            md:bottom-auto md:top-1/2 md:mb-0   
            md:-translate-y-1/2 md:translate-x-0
            md:origin-left
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