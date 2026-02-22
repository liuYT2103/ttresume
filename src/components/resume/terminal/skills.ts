interface SkillDetail {
    type: string;
    name: string;
    color: string; // 用于总览界面的方括号颜色
    output: string;
}

export const skillsCommand = (commands: string[]) => {
    if (commands.length === 1) {
        const grouped: Record<string, { color: string, items: string[] }> = {};
        for (const key in skillsData) {
            const skill = skillsData[key]!;
            if (!grouped[skill.type]) {
                grouped[skill.type] = { color: skill.color, items: [] };
            }
            grouped[skill.type]!.items.push(skill.name);
        }
        let result = '';
        for (const type in grouped) {
            const group = grouped[type]!;
            result += `<span class="${group.color}">[${type}]</span>: ${group.items.join(', ')}\n`;
        }
        
        result += `\n<span class="opacity-50">Tip: Use </span><span class="text-yellow-300">skills -help</span><span class="opacity-50"> to view more operations . (e.g., skills -help)</span>`;
        return result;
    }
    switch (commands[1]) {
        case '-help':
            return [
                `<span class="text-blue-400">-d</span>\t <span class="opacity-50">Use <span class="text-yellow-300">skills -d &lt;name&gt;</span> to view details. (e.g., skills -d vue3)</span>`,
                `<span class="text-blue-400">-l</span>\t <span class="opacity-50">Use <span class="text-yellow-300">skills -l</span> to view skills list. (e.g., skills -l)</span>`,
            ].join('\n')
        case '-d': 
            const targetSkillKey = commands.slice(2).join(' ').toLowerCase(); 
            if (!targetSkillKey) {
                return `bash: skills: missing argument for '-d'. Usage: skills -d <name>`;
            }
            const skillInfo = skillsData[targetSkillKey];
            if (skillInfo) {
                return `<span class="text-yellow-300 font-bold">${skillInfo.name}</span>\n${skillInfo.output}`;
            } else {
                return `bash: skills: '${targetSkillKey}' not found. Type 'skills' to see the list.`;
            }
        case '-l':
            const targetSkillKey_l = commands.slice(2).join(' ').toLowerCase(); 
            if (targetSkillKey_l) {
                return `bash: skills: more argument for '-l'. Usage: skills -l`;
            }
            return Object.keys(skillsData).map(i => (`<span class="text-yellow-300 font-bold">${i}</span>`)).join('\n')
    }

    return `bash: invalid arguments. Usage:\n  skills\n  skills -d <name>\n  skills -l`;
};

export const skillsData: Record<string, SkillDetail> = {
    'vue3': { 
        type: 'Frontend', name: 'Vue3', color: 'text-blue-400', 
        output: '- 精通底层源码，响应式原理，虚拟 DOM Compiler...\n- 熟练结合组合式 API 进行复杂状态管理。' 
    },
    'nuxt': { 
        type: 'Frontend', name: 'Nuxt', color: 'text-blue-400', 
        output: '- 熟练使用 Nuxt.js 搭建 SSR 应用，优化首屏加载与 SEO，开发过个人博客。' 
    },
    'react native': { 
        type: 'Frontend', name: 'React Native', color: 'text-blue-400', 
        output: '- 能够独立开发跨平台移动端应用，如个人开发的打卡软件。' 
    },
    'fastapi': { 
        type: 'Backend', name: 'FastAPI (Python)', color: 'text-green-400', 
        output: '- 熟练使用 FastAPI 构建高性能 RESTful API，处理异步任务。' 
    },
    'axum': { 
        type: 'Backend', name: 'Axum (Rust)', color: 'text-green-400', 
        output: '- 熟悉 Rust 生态，使用 Axum 进行高并发 Web 后端开发。' 
    },
    'godot': { 
        type: 'Game Dev', name: 'Godot Engine', color: 'text-purple-400', 
        output: '- 深入 2D 游戏开发 (GDScript)，掌握状态机、着色器、节点生命周期。\n- 独立完成过卡牌塔防等游戏架构设计，并有 Steam 平台上架经验。' 
    },
    'archlinux': { 
        type: 'System', name: 'Arch Linux', color: 'text-gray-400', 
        output: '- 日常主力系统，熟练进行内核编译、Niri/KDE 桌面环境配置及包管理。' 
    }
};