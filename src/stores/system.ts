import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSystem = defineStore('system', () => {
    const terminalControl = ref({
        mini: false,
        max: false,
        close : false
    })
    return {
        terminalControl
    }
})
