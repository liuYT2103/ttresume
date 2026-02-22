<template>
    <div class="
        w-full mx-auto rounded-lg overflow-hidden 
        shadow-2xl border border-theme-bg-dark font-mono text-sm transition-all
    " :class="terminalControl.max ? 'fixed top-0 left-0 w-screen h-screen' : 'max-w-4xl h-auto'"
        v-show="!terminalControl.close">
        <div
            class="bg-theme-bg text-theme-tx flex items-center justify-between px-4 py-2 select-none border-b border-gray-700">
            <div class="flex items-center gap-2">
                <HugeiconsIcon :icon="ComputerTerminal01Icon" class="w-4 h-4" />
                <span class="font-bold opacity-80">guest@liuyutao-resume:~</span>
            </div>
            <div class="flex items-center gap-3">
                <HugeiconsIcon :icon="MinusSignSquareIcon" class="w-4 h-4 transition-opacity"
                    :class="terminalControl.max ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100 hover:opacity-70'"
                    @click="terminalToggleSize" />
                <HugeiconsIcon :icon="ArrowExpandIcon"
                    class="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
                    @click="terminalToggleFullScreen" />
                <HugeiconsIcon :icon="CancelSquareIcon"
                    class="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors" 
                    @click="closeTerminal" />
            </div>
        </div>

        <div class="bg-[#1e1e2e] text-gray-300 overflow-y-auto flex flex-col gap-1 transition-all" :class="[
            terminalControl.mini ? 'h-0 px-4' : 'p-4',
            {
                'h-full': !terminalControl.mini && terminalControl.max,
                'h-[65vh]': !terminalControl.mini && !terminalControl.max
            }
        ]" ref="terminalBody" @click="focusInput">
            <div class="mb-4">
                <div class="text-green-400 font-bold">Welcome to Interactive Resume Terminal v1.0.0</div>
                <div class="opacity-70">Type <span class="text-yellow-300">'help'</span> to see available commands.
                </div>
            </div>

            <div v-for="(entry, index) in history" :key="index" class="flex flex-col">
                <div class="flex items-center gap-2">
                    <span class="text-green-400 font-bold">guest@liuyutao:~$</span>
                    <span>{{ entry.command }}</span>
                </div>
                <div class="whitespace-pre-wrap mt-1 mb-3 text-gray-400" v-html="entry.result"></div>
            </div>

            <div class="flex items-center gap-2">
                <span class="text-green-400 font-bold">guest@liuyutao:~$</span>
                <input ref="commandInput" 
                    type="text" 
                    v-model="currentCommand" 
                    @keyup.enter="handleCommand"
                    @keydown.up.prevent="handleArrowUp"    
                    @keydown.down.prevent="handleArrowDown"
                    class="flex-1 bg-transparent outline-none border-none text-gray-100 placeholder-gray-600"
                    spellcheck="false" autofocus autocomplete="off">
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {
    ArrowExpandIcon,
    CancelSquareIcon,
    ComputerTerminal01Icon,
    MinusSignSquareIcon
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { cmdLib } from './terminal/config';
import { useSystem } from '@/stores/system';

interface TerminalHistory {
    command: string;
    result: string;
}

const commandHistory: string[] = []
const history = ref<TerminalHistory[]>([]);
const currentCommand = ref('');
const terminalBody = ref<HTMLElement | null>(null);
const commandInput = ref<HTMLInputElement | null>(null);
const { 
    terminalControl,
    terminalToggleSize,
    terminalToggleFullScreen,
    closeTerminal
} = useSystem()
const historyIndex = ref<number>(0)
const handleArrowUp = () => {
    if (commandHistory.length === 0) return;
    if (historyIndex.value > 0) {
        historyIndex.value--;
        currentCommand.value = commandHistory[historyIndex.value] || '';
    }
};
const handleArrowDown = () => {
    if (commandHistory.length === 0) return;
    if (historyIndex.value < commandHistory.length - 1) {
        historyIndex.value++;
        currentCommand.value = commandHistory[historyIndex.value] || '';
    } else if (historyIndex.value === commandHistory.length - 1) {
        historyIndex.value++;
        currentCommand.value = '';
    }
};
const focusInput = () => commandInput.value?.focus();

const scrollToBottom = async () => {
    await nextTick();
    if (terminalBody.value) {
        terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
    }
};

const handleCommand = () => {
    const cmd = currentCommand.value.trim();
    if (!cmd) return;

    let output = '';
    const cmdLower = cmd.toLowerCase();
    const cmdarr = cmdLower.split(/\s+/)
    const topCommand = cmdarr[0] || ''
    const handler = cmdLib[topCommand]
    if (!handler) {
        output = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
    } else {
        switch (topCommand) {
            case 'clear':
                history.value = [],
                    currentCommand.value = ''
                return;
            default: output = handler.output(cmdarr)
        }
    }
    if (commandHistory[commandHistory.length - 1] !== cmd) {
        commandHistory.push(cmd);
    }
    historyIndex.value = commandHistory.length;
    history.value.push({
        command: cmd,
        result: output
    });
    currentCommand.value = '';
    scrollToBottom();
};
</script>

<style scoped>
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}
</style>