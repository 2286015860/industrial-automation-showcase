export const capabilityIds = ['hmi', 'plc', 'motion', 'vision'] as const

export type CapabilityId = (typeof capabilityIds)[number]

export type EvidenceKind = 'project' | 'review' | 'future'

export interface MediaAsset {
  readonly file: string
  readonly alt: string
  readonly caption: string
  readonly width: number
  readonly height: number
}

export interface EvidenceSection {
  readonly id: string
  readonly kind: EvidenceKind
  readonly eyebrow: string
  readonly title: string
  readonly summary: string
  readonly points: readonly string[]
  readonly code?: readonly string[]
  readonly media?: readonly MediaAsset[]
  readonly diagram?: 'projection' | 'tasks' | 'state' | 'axes' | 'stops' | 'pipeline' | 'wafer'
}

export interface Capability {
  readonly id: CapabilityId
  readonly order: string
  readonly route: `/${CapabilityId}`
  readonly shortName: string
  readonly EnglishName: string
  readonly title: string
  readonly lead: string
  readonly proofLine: string
  readonly accent: string
  readonly accentSoft: string
  readonly tags: readonly string[]
  readonly heroMedia?: MediaAsset
  readonly sections: readonly EvidenceSection[]
}

export const evidenceLabels: Record<EvidenceKind, string> = {
  project: '项目证据',
  review: '源码或案例复盘',
  future: '后续方向',
}

export const capabilities: readonly Capability[] = [
  {
    id: 'hmi',
    order: '01',
    route: '/hmi',
    shortName: '上位机',
    EnglishName: 'HMI / SUPERVISORY',
    title: '工业上位机系统',
    lead: '把设备状态、工艺流程、配方、报警、视觉与 ADS 通讯组织成可判断、可操作、可追溯的页面体系。',
    proofLine: '真实界面截图 + 页面职责 + 通讯边界',
    accent: '#d7ff52',
    accentSoft: '#8da838',
    tags: ['WPF', 'Beckhoff ADS', 'SQLite', 'SQL Server'],
    heroMedia: {
      file: 'hmi-dashboard.png',
      alt: '晶圆电镀设备上位机总览页面，包含设备状态、工艺参数、趋势和报警区域',
      caption: 'Runtime overview / 已有界面材料',
      width: 1588,
      height: 894,
    },
    sections: [
      {
        id: 'projection',
        kind: 'project',
        eyebrow: 'Projection layer',
        title: '总览不创造状态，只投影高价值事实',
        summary: '第一屏压缩设备连接、运行、批次、工艺参数和近期报警。用户不需要在多个页面间往返，仍能判断当前是否需要干预。',
        points: [
          '仪表表达当前值，趋势表达连续变化，管路与阀门表达介质和通断。',
          '界面显示等待 PLC 读回，不用按钮点击结果伪装设备已经执行。',
          '控件由状态驱动并可复用，不把整套设备语言烘焙成一张底图。',
        ],
        media: [
          {
            file: 'hmi-dashboard.png',
            alt: '上位机总览页面的设备工艺流程、仪表、趋势和报警投影',
            caption: '项目证据 / 数据总览',
            width: 1588,
            height: 894,
          },
        ],
        diagram: 'projection',
      },
      {
        id: 'device-map',
        kind: 'project',
        eyebrow: 'Device map',
        title: '设备地图负责结构与入口，腔室页负责操作',
        summary: '地图回答设备由什么组成、机器人在哪里、从哪里进入腔室；下钻页面再承载参数、模块状态、联锁和阀门操作。',
        points: [
          '腔室、机器人和晶圆盒保持明确空间关系。',
          '已有手动调试用于验证机器人位置、夹爪状态与区域切换。',
          '地图与腔室职责分离，避免把所有操作堆到同一张大画面。',
        ],
        media: [
          {
            file: 'hmi-device-map.png',
            alt: '上位机设备地图，展示腔室、前后机器人、晶圆盒与工艺模块',
            caption: '项目证据 / 设备地图',
            width: 1588,
            height: 894,
          },
          {
            file: 'hmi-plating-chamber.svg',
            alt: '电镀腔室参数、阀门和模块状态页面示意',
            caption: '展示材料 / 腔室下钻',
            width: 1400,
            height: 820,
          },
        ],
      },
      {
        id: 'process-recipe',
        kind: 'project',
        eyebrow: 'Process & persistence',
        title: '流程归 PLC，配方归持久化边界',
        summary: '上位机保留启动、暂停、继续、停止、复位和确认等入口；自动顺序、联锁与安全条件由 PLC 持有。低频配方数据进入 SQLite，并使用参数化写入。',
        points: [
          '关键命令与执行状态分离，状态必须来自控制器反馈。',
          '配方新建、复制、保存和删除都经过类型与空值检查。',
          '数据库写入使用参数，不拼接界面输入。',
        ],
        media: [
          {
            file: 'hmi-auto-process.png',
            alt: '上位机自动流程页面，包含关键控制按钮和流程状态',
            caption: '项目证据 / 自动流程',
            width: 1588,
            height: 894,
          },
          {
            file: 'hmi-recipe.png',
            alt: '上位机 SQLite 配方管理页面',
            caption: '项目证据 / 配方管理',
            width: 1588,
            height: 894,
          },
        ],
      },
      {
        id: 'trace-ads',
        kind: 'project',
        eyebrow: 'Traceability & ADS',
        title: '报警留下时间链，ADS 保持命令与显示隔离',
        summary: '报警出现时同步建立当前记录与历史记录；ADS 结构体负责成组传输，通讯变量与 UI Current 状态分层，避免写入命令直接污染显示。',
        points: [
          '短时报警恢复后仍保留开始、结束与处理记录。',
          '事件记录补充用户、时间、动作与来源，形成责任追踪。',
          'C# 结构体需要与 PLC DUT 的字段顺序、类型和内存对齐一致。',
        ],
        code: [
          '[StructLayout(LayoutKind.Sequential, Pack = 1)]',
          'Com = plc.ReadAny<ADM_Out_ADS>(handle);',
          'CopyReadback(Com, Current);',
        ],
        media: [
          {
            file: 'hmi-alarm-event.png',
            alt: '上位机报警与事件记录页面',
            caption: '项目证据 / 报警追溯',
            width: 1588,
            height: 894,
          },
          {
            file: 'hmi-ads-code.png',
            alt: 'ADS 通讯结构体、读取与界面状态隔离代码截图',
            caption: '项目证据 / ADS 边界',
            width: 832,
            height: 864,
          },
        ],
      },
      {
        id: 'buffering',
        kind: 'future',
        eyebrow: 'Acquisition concept',
        title: '双缓冲采样仍是明确标注的设计思路',
        summary: '需要更密集曲线数据时，可由 PLC 轮换写入两组数组，上位机只在缓冲区完成后成组读取。这个方案尚未写入当前程序，因此不作为已实现功能。',
        points: [
          'PLC 扫描采样与上位机读取周期解耦。',
          '数组切换需要完整标志、序号和覆盖保护。',
          '只有实现与测试完成后，才能转入项目证据。',
        ],
      },
    ],
  },
  {
    id: 'plc',
    order: '02',
    route: '/plc',
    shortName: 'PLC',
    EnglishName: 'PLC / TWINCAT',
    title: 'TwinCAT 官方案例源码复盘',
    lead: '从任务入口追踪模式命令、设备状态机和动作步骤，区分值得保留的架构与不能直接用于设备交付的示例实现。',
    proofLine: '官方案例源码 + 调用链复盘 + 缺口清单',
    accent: '#ff7048',
    accentSoft: '#a8452d',
    tags: ['TwinCAT', 'IEC 61131-3', 'State Machine', 'Task Model'],
    sections: [
      {
        id: 'tasks',
        kind: 'review',
        eyebrow: 'Official case / task architecture',
        title: '三条任务对应三种时间尺度',
        summary: '数字越小优先级越高。快速控制、业务服务与可视化刷新被放入不同周期，源码复盘从各任务入口按真实调用顺序展开。',
        points: [
          '2 ms：读输入、算逻辑、写输出，并刷新夹具与输送设备块。',
          '10 ms：HMI、报警、导航、模式、Recipe 与系统诊断。',
          '200 ms：TwinCAT Visualization 页面变量绑定与刷新。',
        ],
        code: ['MAIN_Fast_2ms', 'MAIN_Normal_10ms', 'VisuElems.Visu_Prg'],
        diagram: 'tasks',
      },
      {
        id: 'fast-chain',
        kind: 'review',
        eyebrow: 'Official case / fast path',
        title: '2 ms 入口保持读、算、写骨架',
        summary: '顶层入口只做输入投影、逻辑调用和输出投影；设备逻辑再进入全局夹具与输送实例。调用存在不等于 IO 映射已经生效。',
        points: [
          'Act_Inputs() 与 Act_Outputs() 每周期被调用。',
          '当前案例映射主体位于注释内，不能描述为物理 IO 已接通。',
          '生产结构需要从 IO 点表重建镜像并逐点验收。',
        ],
        code: ['Act_Inputs();', 'MAIN_Logic();', 'Act_Outputs();'],
      },
      {
        id: 'state-machine',
        kind: 'review',
        eyebrow: 'Official case / invocation',
        title: '整机请求进入设备模式，再进入工艺步骤',
        summary: 'HMI 请求先写入系统命令；夹具与输送设备读取请求，由 SysStep 选择 Home、Manual 或 Auto，再由动作步骤执行具体序列。',
        points: [
          '整机命令、设备模式、工艺步骤是可复用的三层骨架。',
          '跨任务状态需要唯一写入者和完整快照。',
          '暂停、停止、仿真与真实回零策略在案例中并不完整。',
        ],
        code: ['MAIN_MoldSwitch → RqSys*', 'APP_Clamp / APP_Conv → SysStep', 'HomeStep / ManualStep / AutoStep'],
        diagram: 'state',
      },
      {
        id: 'audit',
        kind: 'review',
        eyebrow: 'Official case / source audit',
        title: '能演示的案例，不等于可直接交付的设备程序',
        summary: '源码价值在于可以定位结构优势与实现缺口，而不是把案例包装成现场成果。页面保留异常点，并说明生产化时必须补齐的边界。',
        points: [
          'IO 映射主体被注释；仿真反馈缺少 SimulationMode 隔离。',
          'aMoveOff 只撤销 Execute，暂停、受控停止与立即停止没有分层。',
          '模式请求存在多个真值源，回零与 Recipe 文件协议也需重构。',
          'MAIN_HMI() 在 10 ms 入口同一扫描执行两次，页面不替它合理化。',
        ],
      },
      {
        id: 'production-target',
        kind: 'future',
        eyebrow: 'Production target',
        title: '保留任务骨架，补上可验证协议',
        summary: '目标结构增加 IO 镜像、命令握手、状态快照、统一错误、步骤超时、停止层级和 Recipe 原子应用，但这些属于复盘后的工程方向。',
        points: [
          '命令包含请求号、确认、完成、拒绝与错误上下文。',
          '步骤同时说明完成条件、超时条件和中止行为。',
          'Recipe 先进入 staging，校验后再原子切换。',
        ],
      },
    ],
  },
  {
    id: 'motion',
    order: '03',
    route: '/motion',
    shortName: '运动控制',
    EnglishName: 'MOTION / ZMOTION',
    title: '运动控制与 SDK 语义',
    lead: '从界面动作追到控制器实现与 ZAux_* 调用，检查轴映射、插补、缓冲输出、正常停止和急停是否保持真实语义。',
    proofLine: '调用链材料 + SDK 语义 + 验证边界',
    accent: '#56d7ff',
    accentSoft: '#26728c',
    tags: ['ZAux_*', 'ADDAX', 'Interpolation', 'Buffered Output'],
    heroMedia: {
      file: 'motion-code-runtime.svg',
      alt: '运动控制核心代码、控制器调用链和运行界面组合图',
      caption: '展示材料 / 控制器调用链',
      width: 1400,
      height: 820,
    },
    sections: [
      {
        id: 'call-chain',
        kind: 'review',
        eyebrow: 'Controller call chain',
        title: '界面事件必须追到底层 ZAux_* 返回值',
        summary: '业务层负责参数与状态判断，控制器实现把动作映射到 SDK。统一接口可以隔离品牌差异，但不能吞掉原生返回值和错误上下文。',
        points: [
          'UI Command → Motion Service → Controller → Native SDK。',
          '连接、参数、轴故障与命令拒绝都回到状态层。',
          '界面只显示控制器反馈，不根据点击动作猜测运动结果。',
        ],
        code: [
          'ZAux_Direct_SetSpeed(handle, axis, speed)',
          'ZAux_Direct_Single_MoveAbs(handle, axis, target)',
          'Check(result, commandContext)',
        ],
        media: [
          {
            file: 'motion-code-runtime.svg',
            alt: '运动控制 C# 包装层、ZAux 调用与运行状态组合图',
            caption: '源码或案例复盘 / 调用链材料',
            width: 1400,
            height: 820,
          },
        ],
      },
      {
        id: 'axes-buffer',
        kind: 'review',
        eyebrow: 'Interpolation & buffer',
        title: '先建立轴组，再下发插补与缓冲事件',
        summary: '多轴联动不是同时发出多个单轴 Move。轴通过 ADDAX 进入同一插补组，路径段和输出事件再按控制器缓冲顺序执行。',
        points: [
          '轴号、重复映射和控制器状态在流程开始前检查。',
          '完成或异常退出时释放轴组，避免继承旧映射。',
          '缓冲输出与路径位置关联，不用上位机定时器估算后切 IO。',
        ],
        diagram: 'axes',
      },
      {
        id: 'stop-semantics',
        kind: 'review',
        eyebrow: 'Stop semantics',
        title: '正常停止与急停不是同一个按钮换颜色',
        summary: '两种停止都会取消上位机流程等待，但必须落到不同控制器调用；急停后进入锁定或故障状态，复位前禁止新运动命令。',
        points: [
          '正常停止：ZAux_Direct_Single_Cancel，按受控方式结束当前运动。',
          '急停：ZAux_Direct_Rapidstop，随后要求明确复位与重新启动条件。',
          '页面不新增未经运行验证的停止距离或响应时间。',
        ],
        code: ['Stop → ZAux_Direct_Single_Cancel', 'EmergencyStop → ZAux_Direct_Rapidstop'],
        diagram: 'stops',
      },
      {
        id: 'verification',
        kind: 'future',
        eyebrow: 'Verification boundary',
        title: '静态调用存在，与控制器实际执行是两层证据',
        summary: '当前展示可以核对导出函数、包装层与状态刷新结构；控制器连接、轴反馈、缓冲剩余和故障恢复仍需在真实运行环境逐项验证。',
        points: [
          '核对 Native DLL 导出函数、平台位数和 SDK 版本。',
          '运行检查命令接收、状态反馈、错误码与中止路径。',
          '未提供的精度、节拍、稳定性和现场结论保持未声明。',
        ],
      },
    ],
  },
  {
    id: 'vision',
    order: '04',
    route: '/vision',
    shortName: '机器视觉',
    EnglishName: 'VISION / OPENCV',
    title: 'OpenCV 机器视觉工作台',
    lead: '围绕晶圆去边与外圈均匀性检测，把算法拆成标定、方法库、流程编辑、配方、距离统计和可解释记录。',
    proofLine: '工作台截图 + 流程结构 + 外圈检测说明',
    accent: '#f1c35d',
    accentSoft: '#94752e',
    tags: ['OpenCvSharp', 'Calibration', 'Pipeline', 'Edge Distance'],
    heroMedia: {
      file: 'vision-workbench.png',
      alt: '机器视觉流程设置页面，包含步骤列表、方法库、参数和配方区域',
      caption: 'Vision workbench / 已有界面材料',
      width: 1588,
      height: 894,
    },
    sections: [
      {
        id: 'wafer-edge',
        kind: 'project',
        eyebrow: 'Wafer edge inspection',
        title: '检测目标是外圈距离与连续性，不只是亮度',
        summary: '外圈目标与背景可能亮度接近，单一阈值并不稳定。展示方案采用轮廓提取、配准和沿法向距离测量来组织检测。真实晶圆图片不在站点公开。',
        points: [
          '工艺关注外圈是否正确去除以及镀层是否连续、均匀。',
          '参考轮廓与检测轮廓需要先完成配准。',
          '距离统计为后续判定提供偏移、离散程度与极值。',
        ],
        diagram: 'wafer',
      },
      {
        id: 'workbench',
        kind: 'project',
        eyebrow: 'Reusable workbench',
        title: '方法、参数、配方与执行流程分离',
        summary: '输入、标定、预处理、轮廓、配准、距离统计、判定和记录都是独立节点，由流程配方决定顺序，不把视觉能力写成一个巨型按钮。',
        points: [
          '方法只接收声明的输入，并把结果写入上下文变量。',
          '流程步骤、启用状态和参数可独立配置。',
          '中间图、输出变量和最终判定保留可解释记录。',
        ],
        media: [
          {
            file: 'vision-workbench.png',
            alt: '视觉流程编辑与方法库页面，展示步骤、参数和配方分离',
            caption: '项目证据 / OpenCV 工作台',
            width: 1588,
            height: 894,
          },
        ],
        diagram: 'pipeline',
      },
      {
        id: 'distance',
        kind: 'project',
        eyebrow: 'Algorithm evidence',
        title: '沿参考轮廓法向输出带符号距离',
        summary: '配准后沿参考曲线采样法向，与检测外缘求交并计算带符号距离；统计结果交给独立判定节点，不在绘图层中暗藏结论。',
        points: [
          '参考轮廓、检测轮廓与采样点保持各自数据角色。',
          '输出可包含 shift、IQR、min、max、mean 与标准差。',
          '阈值和判定条件属于配方，不硬编码在可视化控件中。',
        ],
        code: [
          'Align(referenceContour, detectedContour)',
          'MeasureSignedNormalDistances(alignedEdges)',
          'PublishStatistics(context)',
        ],
      },
      {
        id: 'halcon-direction',
        kind: 'future',
        eyebrow: 'Capability boundary',
        title: 'Halcon 保持为后续方法节点方向',
        summary: '当前可展示证据来自 OpenCvSharp 工作台与外缘检测组织。Halcon 可以通过统一步骤契约接入，但本站不把尚未完成的内容写成项目成果。',
        points: [
          '统一步骤契约隔离算法库与流程编辑器。',
          '接入前需要补充授权、运行环境和可复现实例。',
          '完成源码、测试和结果核对后再调整证据分类。',
        ],
      },
    ],
  },
] as const

export function getCapability(id: CapabilityId): Capability {
  const capability = capabilities.find((item) => item.id === id)

  if (!capability) {
    throw new Error(`Unknown capability: ${id}`)
  }

  return capability
}

export function getCapabilityNeighbors(id: CapabilityId): {
  readonly previous: Capability
  readonly next: Capability
} {
  const index = capabilities.findIndex((item) => item.id === id)
  const previousIndex = (index - 1 + capabilities.length) % capabilities.length
  const nextIndex = (index + 1) % capabilities.length

  return {
    previous: capabilities[previousIndex]!,
    next: capabilities[nextIndex]!,
  }
}

export const localMediaFiles = [
  'hmi-dashboard.png',
  'hmi-device-map.png',
  'hmi-plating-chamber.svg',
  'hmi-auto-process.png',
  'hmi-recipe.png',
  'hmi-alarm-event.png',
  'hmi-ads-code.png',
  'motion-code-runtime.svg',
  'vision-workbench.png',
] as const
