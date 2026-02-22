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
                return `bash: skills: missing argument for '-d'. Usage: skills -d &lt;name&gt;`;
            }
            const skillInfo = skillsData[targetSkillKey];
            if (skillInfo) {
                return `<span class="text-yellow-300 font-bold">${skillInfo.name}</span>\n${skillInfo.output}`;
            } else {
                return `bash: skills: '${targetSkillKey}' not found. Type 'skills -l' to see the list.`;
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
        type: 'Frontend', name: 'vue3', color: 'text-blue-400', 
        output: [
            '- 深入剖析框架底层源码，能够手写实现基于 Proxy 的响应式系统。',
            '- 深刻理解 Virtual DOM 机制、AST 编译优化 (Compiler) 及 Diff 算法。',
            '- 熟练结合 Composition API 与 Vite 构建高可维护性的大型前端工程。',
            '- 熟悉浏览器底层的渲染管道 (Rendering Pipeline) 与 Event Loop 宏微任务机制。'
        ].join('\n') 
    },
    'ts': { 
        type: 'Frontend', name: 'TypeScript / JS', color: 'text-blue-400', 
        output: [
            '- 深入理解面向对象 (OOP) 与函数式编程 (FP) 范式，熟练运用高级类型系统。',
            '- 熟练应用 GoF 设计模式构建可扩展架构，善于在代码的“封装自由度”与“易用性”之间寻找最优解。'
        ].join('\n') 
    },
    'uniapp': { 
        type: 'Frontend', name: 'Uniapp', color: 'text-blue-400', 
        output: [
            '- 精通多端跨平台 (小程序 / App / H5) 应用开发，具备丰富的平台差异处理与打包发布经验。'
        ].join('\n') 
    },
    'css': { 
        type: 'Frontend', name: 'Tailwind / Sass', color: 'text-blue-400', 
        output: [
            '- 熟练运用 Tailwind CSS 及预处理器构建现代原子化或模块化样式系统。'
        ].join('\n') 
    },

    // --- Backend & Database (后端与数据库) ---
    'python': { 
        type: 'Backend', name: 'FastAPI (Python)', color: 'text-green-400', 
        output: [
            '- 熟练使用 FastAPI 构建高性能的异步 RESTful Web 服务。',
            '- 具备大语言模型 (LLM) 相关应用的后端工程化接入与开发经验。'
        ].join('\n') 
    },
    'node': { 
        type: 'Backend', name: 'Node.js / Bun', color: 'text-green-400', 
        output: [
            '- 熟练使用 Fastify 构建高性能 Node.js 后端服务。',
            '- 深入研究现代后端架构原理，曾基于 TypeScript 与 Bun 环境，独立设计并开发受 Spring Boot 启发的自定义 Web 框架，完整实现 IoC 容器、依赖注入 (DI) 与路由装饰器模式。'
        ].join('\n') 
    },
    'rust': { 
        type: 'Backend', name: 'Rust (Axum)', color: 'text-green-400', 
        output: [
            '- 掌握 Rust 所有权机制与宏编程，使用 Axum 框架进行内存安全的高并发 Web 后端开发。'
        ].join('\n') 
    },
    'database': { 
        type: 'Backend', name: 'MariaDB / PostgreSQL / Valkey', color: 'text-green-400', 
        output: [
            '- 熟练掌握关系型数据库建模、复杂 SQL 优化及事务处理。',
            '- 熟练使用 Valkey(Redis) 设计高频读写缓存、分布式锁与会话状态管理。'
        ].join('\n') 
    },

    // --- Game Dev & AI (游戏开发与人工智能) ---
    'godot': { 
        type: 'Game Dev', name: 'Godot Engine', color: 'text-purple-400', 
        output: [
            '- 深入 2D 游戏开发，高度掌控状态机架构、自定义着色器 (Shader) 及节点树生命周期。',
            '- 拥有完整的独立游戏开发管线经验，从核心玩法架构设计到最终于 Steam 平台成功发行商业作品。'
        ].join('\n') 
    },
    'unity': { 
        type: 'Game Dev', name: 'Unity 3D', color: 'text-purple-400', 
        output: [
            '- 熟练使用 Unity (C#) 进行逻辑开发，具备跨领域的技术视野与复杂交互系统构建能力。',
            '- 结合 Photoshop (2D 矢量/原画) 与 Blender (3D 建模)，拥有独立产出游戏资产的技术美术 (TA) 基础。'
        ].join('\n') 
    },
    'ml': { 
        type: 'AI', name: 'PyTorch & Machine Learning', color: 'text-pink-400', 
        output: [
            '- 扎实的深度学习底层理论，拥有从零构建并训练全连接神经网络 (FCNN) 跑通底层算法链路的实操经验。',
            '- 深入探索强化学习与游戏 AI 前沿，独立研发基于 PyTorch 的大型多智能体 (Multi-Agent) 战术决策模型。',
            '- 将自回归 (Autoregressive) 机制应用于动作序列生成，实现对游戏内多个单位的微操控制与复杂战术博弈。'
        ].join('\n') 
    },

    // --- System & DevOps (系统与运维) ---
    'linux': { 
        type: 'System', name: 'Linux (NixOS / Arch)', color: 'text-gray-400', 
        output: [
            '- 长期以 Linux 为纯净主力开发环境，具备深度定制系统及底层依赖排错能力。',
            '- 掌握从 Arch Linux 滚动更新到 NixOS 声明式环境配置的系统级运维技术。',
            '- 深入理解 Wayland 架构，熟练混合定制 Niri 窗口管理器与 KDE Plasma 组件以构建极致工作流。'
        ].join('\n') 
    },
    'devops': { 
        type: 'System', name: 'Docker / Nginx', color: 'text-gray-400', 
        output: [
            '- 熟练使用 Docker 与 Docker Compose 进行微服务的容器化编排与部署。',
            '- 熟练配置 Nginx 进行网关反向代理、负载均衡及网络安全配置。'
        ].join('\n') 
    },
    'arch': { 
        type: 'System', name: 'Linux', color: 'text-blue-300', 
        output: [
            '- 长期以 Arch Linux 为绝对主力开发环境，具备深度定制系统、编译自定义内核及底层依赖排错能力。',
            '- 深入理解 Wayland 架构，熟练混用并定制 Niri 平铺窗口管理器与 KDE Plasma 组件，构建极致效率的定制化工作流。',
            '- 精通 Linux 包管理体系，具备复杂的源码编译与故障排除能力，曾主导构建软件 RPM 包并成功发布至 Fedora COPR 仓库。',
            '- 深入掌握 systemd 守护进程管理，能够独立编写 unit 文件实现复杂依赖的自动化服务编排。',
            '- 熟练使用 Nginx 配置反向代理、网关路由与 SSL 证书，具备 MariaDB 数据库部署与基础性能调优经验。',
            '- 掌握 KVM/QEMU 虚拟化技术与显卡直通 (GPU Passthrough) 方案。',
            '- 具备 ARM 架构单板计算机（如 Orange Pi）的无头环境配置与基于 Docker 的私有云自托管服务部署经验。'
        ].join('\n') 
    }
};