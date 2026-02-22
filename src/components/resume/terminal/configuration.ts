import { skillsCommand } from "./skills"

const pickTableChar = (str:string) => str.length >= 8? '\t\t': '\t\t\t' 

const helpCommand = ():string => {
    return 'Available commands:\n' + 
        Object.values(cmdLib).map(
            item => (`<span class="text-yellow-300">${item.name}</span>${pickTableChar(item.name)}- ${item.help}`)
        ).join('\n')
}

const projectsCommand = (commands:string[]) => {
    if (commands.length === 1) {
        return `1. <span class="font-bold text-white">Childhood Simulation Game</span> - Successfully launched on Steam
2. <span class="font-bold text-white">Card Tower Defense</span> - Developed with Godot
3. <span class="font-bold text-white">Punch-card App</span> - Built with React Native
4. <span class="font-bold text-white">Custom Web Framework</span> - Inspired by Spring Boot, built with TS/Bun`
    }
    return `bash: ${commands.join(' ')}: command not found. Type 'help' for available commands.`
}
export interface TerminalCommand {
    name: string;
    help: string;
    output: (commands:string[], callback?:()=>void) => string
}

export const cmdLib:Record<string, TerminalCommand> = {
    'help': {
        name: 'help',
        help: 'Show helps',
        output: (commands:string[]) => helpCommand()
    },
    'whoami': {
        name: 'whoami',
        help: 'Display basic profile',
        output: (commands:string[]) => `Name: Liu Yutao
Role: Full-Stack Developer / Indie Game Dev
Extra: INFJ Perfectionist`
    },
    'skills': {
        name: 'skills',
        help: 'List technical stack',
        output: (commands:string[]) => skillsCommand(commands)
    },
    'projects': {
        name: 'projects',
        help: 'View recent works',
        output: (commands:string[]) => projectsCommand(commands)
    },
    'contact': {
        name: 'contact',
        help: 'Get contact information',
        output: (commands:string[]) => `GitHub:  github.com/liuYT2103
Email:   jackplease@163.com`
    },
    'github': {
        name: 'github',
        help: "Open this project's github",
        output: (commands:string[]) => {
            setTimeout(() => {
                window.open('https://github.com/liuYT2103/ttresume')
            }, 500);
            return 'please wait...'
        }
    },
    'clear': {
        name: 'clear',
        help: 'Clear the terminal screen',
        output: (commands:string[], callback:Function = () => true) => callback()
    }
}