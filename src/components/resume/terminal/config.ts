import { projectsCommand } from "./projects"
import { skillsCommand } from "./skills"
import { contact, whoami } from "./static"

const pickTableChar = (str:string) => str.length >= 8? '\t\t': '\t\t\t' 

const helpCommand = ():string => {
    return 'Available commands:\n' + 
        Object.values(cmdLib).map(
            item => (`<span class="text-yellow-300">${item.name}</span>${pickTableChar(item.name)}- ${item.help}`)
        ).join('\n')
}

const githubCommand = () => {
    setTimeout(() => {
        window.open('https://github.com/liuYT2103/ttresume')
    }, 500);
    return 'please wait...'
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
        output: (commands:string[]) => whoami
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
        output: (commands:string[]) => contact
    },
    'github': {
        name: 'github',
        help: "Open the GitHub repository of this project",
        output: (commands:string[]) => githubCommand()
    },
    'clear': {
        name: 'clear',
        help: 'Clear the terminal screen',
        output: (commands:string[], callback:Function = () => true) => callback()
    }
}