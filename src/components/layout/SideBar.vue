<template>
    <div class="
        fixed bottom-10 left-1/2 -translate-x-1/2
        md:top-1/2 md:-translate-y-1/2 md:right-40 
        md:bottom-auto md:left-auto md:translate-x-0
    ">
        <div class="flex flex-row md:flex-col gap-3">
            <SideBarItem :icon="SideItem.icon" v-for="SideItem in SideBarList" @click.prevent="SideItem.onClick">
                <component :is="SideItem.slot" v-if="SideItem.slot" />
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
interface SideBarItem { icon: object; slot: Component | null; onClick?: Function }
const { closeTerminal } = useSystem()

const SideBarList = shallowRef<SideBarItem[]>([
    { icon: PaintBoardIcon, slot: ColorPicker },
    { icon: LanguageSkillIcon, slot: LangPicker },
    { icon: ComputerTerminal01Icon, slot: null, onClick: () => closeTerminal() }
])
</script>