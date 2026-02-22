<template>
  <div class="fixed top-1/2 -translate-y-1/2 right-40">
    <div class="flex flex-col gap-3">
        <SideBarItem :icon="SideItem.icon" v-for="SideItem in SideBarList" @click="SideItem.onClick">
            <component :is="SideItem.slot" v-if="SideItem.slot"/>
        </SideBarItem>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ComputerTerminal01Icon, LanguageSkillIcon, PaintBoardIcon } from '@hugeicons/core-free-icons';
import SideBarItem from '../userInterface/SideBarItem.vue';
import ColorPicker from './SideBar/ColorPicker.vue';
import { shallowRef, type Component } from 'vue';
import LangPicker from './SideBar/LangPicker.vue';
import { useSystem } from '@/stores/system';
interface SideBarItem { icon: object; slot: Component | null; onClick?:Function }
const { terminalControl } = useSystem()

const SideBarList = shallowRef<SideBarItem[]>([
    { icon: PaintBoardIcon, slot: ColorPicker },
    { icon: LanguageSkillIcon, slot: LangPicker },
    { icon: ComputerTerminal01Icon, slot: null, onClick: () => terminalControl.close = false }
])
</script>