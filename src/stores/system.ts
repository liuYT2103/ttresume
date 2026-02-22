import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSystem = defineStore('system', () => {
    const terminalControl = ref({
        mini: false,
        max: false,
        close : false
    })
    const terminalToggleSize = () => {
        if (terminalControl.value.max) return
        terminalControl.value.mini = !terminalControl.value.mini
    }

    const terminalToggleFullScreen = () => {
        terminalControl.value.max = !terminalControl.value.max
        terminalControl.value.mini = false
    }

    const closeTerminal = () => {
        terminalControl.value.max = false
        terminalControl.value.mini = false
        terminalControl.value.close = !terminalControl.value.close
    }
    return {
        terminalControl,
        closeTerminal,
        terminalToggleFullScreen,
        terminalToggleSize
    }
})
