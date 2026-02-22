export interface ProjectDetail {
    type: string;
    name: string;
    color: string;
    output: string;
}

export const projectsCommand = (commands: string[]) => {
    if (commands.length === 1) {
        const grouped: Record<string, { color: string, items: string[] }> = {};
        for (const key in projectsData) {
            const project = projectsData[key]!;
            if (!grouped[project.type]) {
                grouped[project.type] = { color: project.color, items: [] };
            }
            grouped[project.type]!.items.push(key);
        }

        let result = '';
        for (const type in grouped) {
            const group = grouped[type]!;
            result += `<span class="${group.color}">[${type}]</span>: ${group.items.join(', ')}\n`;
        }
        
        result += `\n<span class="opacity-50">Tip: Use </span><span class="text-yellow-300">projects -help</span><span class="opacity-50"> to view more operations.</span>`;
        return result;
    }
    
    switch (commands[1]) {
        case '-help':
            return [
                `<span class="text-blue-400">-d</span>\t <span class="opacity-50">Use <span class="text-yellow-300">projects -d &lt;name&gt;</span> to view project details. (e.g., projects -d multi-agent)</span>`,
                `<span class="text-blue-400">-l</span>\t <span class="opacity-50">Use <span class="text-yellow-300">projects -l</span> to view all project names.</span>`,
            ].join('\n');

        case '-d': 
            const targetProjectKey = commands.slice(2).join(' ').toLowerCase(); 
            if (!targetProjectKey) {
                return `bash: projects: missing argument for '-d'. Usage: projects -d &lt;name&gt;`;
            }
            const projectInfo = projectsData[targetProjectKey];
            if (projectInfo) {
                return `<span class="text-yellow-300 font-bold text-lg">${projectInfo.name}</span>\n${projectInfo.output}`;
            } else {
                return `bash: projects: '${targetProjectKey}' not found. Type 'projects -l' to see the list.`;
            }

        case '-l':
            if (commands.length > 2) {
                return `bash: projects: too many arguments for '-l'. Usage: projects -l`;
            }
            return Object.keys(projectsData).map(i => (`<span class="text-yellow-300 font-bold">${i}</span>`)).join('\n');
    }

    return `bash: invalid arguments. Usage:\n  projects\n  projects -d <name>\n  projects -l`;
};

export const projectsData: Record<string, ProjectDetail> = {
    'multi-agent': { 
        type: 'AI & Game', 
        name: '多智能体决策 AI 设计及开发', 
        color: 'text-purple-400', 
        output: [
            `<span class="text-gray-400">[Date]</span> 2025.09 - 2026.01`,
            `<span class="text-gray-400">[Tech]</span> PyTorch, OpenCV, Godot, GodotRL, StableBaseline3`,
            `<span class="text-gray-400">[Desc]</span>`,
            `- 基于强化学习训练多智能体决策模型，将自回归机制与空间掩码结合，实现对智能体微操序列的精准协同控制。`,
            `- 基于 Godot 搭建可视化仿真环境，实现通过 TCP 进行多设备分布式训练，大幅突破单机算力瓶颈。`,
            `- 构建 WebUI 面板实现超参数的灵活调优及环境难度动态切换。单张 4090 两周迭代即达到超预期决策精度，促成甲方长期合作。`
        ].join('\n') 
    },

    'quanzhua': { 
        type: 'Full-Stack', 
        name: '拳爪代售 一站式游戏账号交易平台', 
        color: 'text-blue-400', 
        output: [
            `<span class="text-gray-400">[Date]</span> 2024.09 - 2024.11`,
            `<span class="text-gray-400">[Tech]</span> Uniapp, Vue3, Vite, Node.js, Pinia`,
            `<span class="text-gray-400">[Desc]</span>`,
            `- 独立主导平台架构设计与全栈开发，覆盖 H5 与多端应用商城，实现从发布、购买到资金担保的业务闭环。`,
            `- 深度优化工程构建：合理分块并将打包代码体积压缩超 90%，大幅降低流量费用并提升首屏性能。`,
            `- 重构底层框架：实现 Uniapp 路由自动注册、动态权限配置及主分包自动拆离；封装非侵入式权限校验与全局高阶组件。`,
            `- 项目地址：<a class="text-amber-300" href="https://m.quanzhua.com" target="_blank">m.quanzhua.com</a>`
        ].join('\n') 
    },

    'mianmianmao': { 
        type: 'Web Dev', 
        name: '绵绵猫社区比赛报名系统', 
        color: 'text-blue-400', 
        output: [
            `<span class="text-gray-400">[Date]</span> 2024.07 - 2024.08`,
            `<span class="text-gray-400">[Tech]</span> Vue3, FastAPI, Tailwind, AliOSS, JWT`,
            `<span class="text-gray-400">[Desc]</span>`,
            `- 设计并实现高并发报名系统，妥善处理类似“秒杀防超卖”与“并发退改签”场景下的极端数据一致性问题。`,
            `- 极致的性能优化：在低配云服务器环境压测下，抗住千人级高频并发，CPU 资源占用率稳定控制在 40% 内，接口响应延迟 < 100ms。`,
            `- 结合阿里云 OSS 剥离静态资源，实现系统上线至今零错漏、零卡顿。`
        ].join('\n') 
    },

    'road-monitor': { 
        type: 'AI & Full-Stack', 
        name: '路面病害智能视觉监测平台', 
        color: 'text-pink-400', 
        output: [
            `<span class="text-gray-400">[Date]</span> 2023.12 - 2024.04`,
            `<span class="text-gray-400">[Tech]</span> Vue3, FastAPI, LangChain, PaddleDet, Qwen2_1.5B, ECharts`,
            `<span class="text-gray-400">[Desc]</span>`,
            `- 主导架构设计，基于 PaddleDet 微调视觉检测算法，将裂缝/坑洞等病害识别准确率大幅提升 53%，有效降低误报率。`,
            `- 落地大模型(LLM)赋能：部署 Qwen2 模型并结合 LangChain 生成自动化维修评估报告（含物料预估及成本支出分析）。`,
            `- 独立完成大屏数据看板(ECharts)及四项核心业务模块的全栈开发，为政企道路维护部门提供实时智能决策依据。`
        ].join('\n') 
    },

    'rescue-robot': { 
        type: 'System & Hardware', 
        name: '救援机器人网络视频监控平台', 
        color: 'text-gray-400', 
        output: [
            `<span class="text-gray-400">[Date]</span> 2024.01 - 2024.02`,
            `<span class="text-gray-400">[Tech]</span> C++, ROS2, ZeroMQ, OpenCV, FastAPI, Vue3`,
            `<span class="text-gray-400">[Desc]</span>`,
            `- 构建基于 ROS2 及 ZeroMQ 的雪场多节点机器人视频流监控分发平台。`,
            `- 引入并调优 VVC 视频编码方案，在保障画面帧率质量的前提下将流量消耗削减 60%+，显著降低服务器带宽成本。`,
            `- 融合计算机视觉算法，实现对雪场游客倒地等异常姿态的精准智能捕捉，使应急中心预警响应效率攀升 80%。`
        ].join('\n') 
    }
};