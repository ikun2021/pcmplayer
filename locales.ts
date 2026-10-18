export const messages = {
  en: {
    // SEO
    pageTitle: 'audio-converters - Pro PCM Player, Raw Audio Player & Online Audio Converter (PCM, WAV, MP3, OPUS)',
    pageDescription: 'Free online PCM player, raw audio stream player, and audio format converter. Play headerless raw PCM in-browser, convert PCM to WAV, WAV to PCM, MP3 to PCM (8kHz/16kHz/44.1kHz/48kHz), and record microphone audio securely with zero server uploads.',
    pageKeywords: 'pcm player, pcm player online, play raw pcm, raw audio player, pcm to wav converter, wav to pcm, mp3 to pcm, pcm audio player, online audio converter, convert pcm to mp3, 16khz pcm player, 8khz pcm, raw sound player, webassembly audio converter, pcm audio tool, sample rate converter, offline pcm player, audio bit depth converter',
    ogTitle: 'audio-converters - Privacy-First PCM Player & Audio Converter',
    ogDescription: 'Professional PCM player, audio format converter and online recorder. High-fidelity audio processing in your browser without server uploads.',

    // Header & Nav
    brandName: 'audio-converters',
    navConverter: 'Converter',
    navRecorder: 'Recorder',
    navBlog: 'Blog',
    navLanguage: 'Language',

    // Hero
    heroBadge: 'In-Browser Audio Engine',
    heroTitlePart1: 'Professional',
    heroTitleGradient: 'PCM Player & Converter',
    heroTitlePart2: 'Privacy-First Audio Engine',
    heroSubtitle: 'Convert, play and record audio formats entirely in your browser.',
    heroPrivacyPrefix: 'Your audio files and recordings are processed locally and',
    heroPrivacyHighlight: 'never uploaded to the server',

    // Tabs
    tabConverter: 'File Converter',
    tabRecorder: 'Mic Recording',

    // Dropzone & File List
    dropzoneTitle: 'Drop audio files here',
    dropzoneSubtitle: 'WAV, PCM, RAW, MP3, OPUS, OGG (Up to 5 files)',
    dropzonePrivacy: '100% Private: Files processed locally in your browser',
    selectedFiles: 'Selected Files',
    addMore: 'Add More',
    formatLabel: 'Format',
    sampleRateLabel: 'Sample Rate',
    pcmInputParams: 'PCM INPUT PARAMETERS',
    pcmParamHint: 'Raw PCM contains no header. Please verify sample rate and format.',
    bitDepthLabel: 'Bit Depth',
    channelsLabel: 'Channels',
    mono: 'Mono',
    stereo: 'Stereo',
    conversionTarget: 'CONVERSION TARGET',
    convertBtn: 'Convert & Download Now',
    convertHint: 'The first conversion may take a few seconds to load the WebAssembly engine, please be patient',

    // Statuses
    statusLoading: 'Loading FFmpeg engine...',
    statusResampling: 'Resampling with Web Audio...',
    statusEncoding: 'Encoding audio...',
    statusPreparing: 'Preparing export...',
    statusSuccess: 'Export complete!',
    statusFailed: 'Export failed',

    // Recorder
    recReady: 'Ready to record',
    recLive: 'Recording Live Stream...',
    recTitle: 'Online Audio Recorder',
    recSubtitle: 'Capture high-fidelity audio directly to PCM 16kHz Mono. Your recordings never leave your RAM and are not sent to any server.',
    recPreview: 'Preview',
    recDownload: 'Download',
    recDiscard: 'Discard',

    // Features Section
    featSectionBadge: 'Everything You Need',
    featSectionTitle: 'What are the features of audio-converters?',
    feat1Title: 'Edge Processing',
    feat1Desc: 'Secure local processing with FFmpeg-WASM. Zero server reliance for maximum privacy and rapid execution.',
    feat2Title: 'Granular PCM Control',
    feat2Desc: 'Precision control over raw PCM streams with dynamic sample rate (8kHz-48kHz), 16-bit depth, and mono channel options.',
    feat3Title: 'High-Fidelity Resampling',
    feat3Desc: 'Studio-grade resampling between 8,000 Hz, 16,000 Hz, 44,100 Hz, and 48,000 Hz for professional signal processing.',
    feat4Title: 'Absolute Privacy First',
    feat4Desc: 'Your audio never touches a remote server. Everything happens strictly inside your browser memory (RAM).',
    feat5Title: 'Opus & VoIP Optimized',
    feat5Desc: 'Native support for the Opus codec, ideal for high-efficiency web streaming, speech synthesis, and WebRTC applications.',
    feat6Title: 'Instant Zero-Latency Execution',
    feat6Desc: 'Bypass slow network uploads. Audio decoding and encoding start the exact millisecond you trigger the action.',

    // Use cases tags
    useCaseVoip: 'VoIP Dev',
    useCasePodcasts: 'Podcasts',
    useCaseWebrtc: 'WebRTC',
    useCaseGameAudio: 'Game Audio',
    useCaseAiTraining: 'AI Voice & Speech',
    useCaseEmbedded: 'Embedded / IoT',

    // Testimonials
    testiBadge: 'JOIN 10,000+ DEVELOPERS & CREATORS',
    testiTitle: 'What Our Users Say',
    testiSubtitle: 'See what engineers and creators worldwide say about our edge audio processing toolkit.',
    testi1Quote: 'audio-converters is a game-changer for our VoIP debugging. Being able to drop a raw PCM dump and hear it instantly saved us hours of debugging time.',
    testi1Name: 'Alex Rivest',
    testi1Role: 'Senior WebRTC Engineer',
    testi2Quote: 'The cleanest UI I have seen for an audio tool. No intrusive ads, zero waiting for server queues. It works instantaneously and preserves complete privacy.',
    testi2Name: 'Sarah Jenkins',
    testi2Role: 'Podcast Producer & Sound Designer',
    testi3Quote: 'Finally, an online tool that actually understands raw PCM. The manual parameter configuration is exactly what developers working with AI speech models need.',
    testi3Name: 'Chen Wei',
    testi3Role: 'AI Speech Research Lead',

    // Deep Content / Guide Section
    guideTitlePart1: 'Master Your Audio &',
    guideTitleGradient: 'PCM Like a Pro',
    step1Title: 'Upload or Record Securely',
    step1Desc: 'Drag and drop raw PCM streams, WAV, MP3, or Opus files, or capture microphone audio in real time. All processing executes 100% in-browser via WebAssembly.',
    step2Title: 'Configure Details & PCM Parameters',
    step2Desc: 'Manually specify sample rate (8kHz to 48kHz), bit depth (16-bit), and channel layout for raw files, or let the engine auto-detect standard audio headers.',
    step3Title: 'Instant Export & Resampling',
    step3Desc: 'Convert between frequencies and audio formats in milliseconds without uploading to any remote server or paying subscription fees.',

    // Technical Deep Dive Section (SEO content for long-tail keywords)
    guideOverviewTitle: 'Comprehensive PCM Audio & Format Conversion Guide',
    guideOverviewText: 'Pulse Code Modulation (PCM) is the uncompressed digital representation of analog audio signals. While standard audio formats like WAV, MP3, and OPUS wrap audio data inside structured headers (specifying sample rate, bit depth, and channel count), raw PCM files (.pcm, .raw) contain pure sample values with zero metadata. Without a specialized PCM player, standard media players cannot decode the stream. audio-converters empowers developers, AI researchers, and audio engineers to preview, play, inspect waveforms, and convert raw PCM files directly in the browser.',
    
    // Comparison Table
    tableTitle: 'Audio Format Technical Specifications',
    tableFormat: 'Format',
    tableType: 'Type',
    tableHeader: 'Header Container',
    tableSampleRates: 'Standard Sample Rates',
    tableUseCases: 'Ideal Use Cases',
    tablePcmDesc: 'Headerless Raw Stream',
    tablePcmUses: 'AI Speech Training (Whisper/ASR), Embedded ESP32, VoIP Debugging, Telephony',
    tableWavDesc: 'Uncompressed RIFF Container (44-byte header)',
    tableWavUses: 'Studio Production, Master Audio, Sound Design, Broadcast Quality',
    tableMp3Desc: 'Lossy MPEG-1 Audio Layer III',
    tableMp3Uses: 'Podcasts, Music Distribution, Web Streaming, Universal Compatibility',
    tableOpusDesc: 'Lossy Low-Latency Interactive Codec',
    tableOpusUses: 'Discord, WebRTC, Real-time Voice Chat, Low-bandwidth Transmission',

    // FAQ Section
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faq1Question: 'How do I play a raw PCM (.pcm / .raw) audio file?',
    faq1Answer: 'Navigate to the "File Converter" tab and upload your .pcm or .raw file. Because raw PCM contains no container header, select the matching Sample Rate (e.g. 16,000 Hz, 8,000 Hz, or 44,100 Hz), Bit Depth (16-bit), and Channels (Mono). The browser engine will synthesize the correct waveform immediately, and you can press the Play button to listen.',
    faq2Question: 'How can I convert MP3 or WAV to 16kHz 16-bit Mono PCM for AI models?',
    faq2Answer: 'Upload your MP3 or WAV file in the "File Converter" tab. Under "CONVERSION TARGET", select "PCM (Raw Stream)" and pick "16,000 Hz" as the target sample rate. Click "Convert & Download Now". Our engine resamples the audio and exports a clean 16kHz 16-bit mono PCM file ideal for OpenAI Whisper, Sherpa-ONNX, Vosk, and other ASR models.',
    faq3Question: 'Why does my PCM file sound like harsh white noise or static?',
    faq3Answer: 'White noise occurs when there is a mismatch between the actual byte encoding of the PCM file and the selected playback parameters. Common causes include choosing 8-bit instead of 16-bit, big-endian instead of little-endian, or stereo instead of mono. For standard speech models and embedded dumps, select 16-bit Signed Little-Endian Mono at 16,000 Hz or 8,000 Hz.',
    faq4Question: 'Why does the PCM audio play too fast (like a chipmunk) or in slow-motion?',
    faq4Answer: 'Pitch and speed distortions occur when the configured sample rate does not match the recorded sample rate. For example, playing a 16kHz recording at 32kHz or 48kHz will cause it to play at 2x or 3x speed with high-pitched chipmunk audio. Simply adjust the Sample Rate dropdown under "PCM INPUT PARAMETERS" until the voice sounds natural.',
    faq5Question: 'How does the online microphone recorder work?',
    faq5Answer: 'Open the "Mic Recording" tab and click the large microphone button. Grant your browser microphone access when prompted. You can record voice in real time, inspect the interactive waveform, preview the playback, and download the audio directly as a 16kHz Mono WAV, PCM, MP3, or Opus file.',
    faq6Question: 'Are my audio files or voice recordings uploaded to any cloud server?',
    faq6Answer: 'Absolutely not. All audio processing, waveform analysis, resampling, and FFmpeg conversions happen 100% on your local machine via WebAssembly and Web Audio API. Your data remains in your local RAM and is completely inaccessible to external servers.',

    // Footer
    footerTagline: "The world's premier audio toolbox powered completely by edge WebAssembly. Absolute privacy, maximum speed, and professional sound fidelity.",
    footerCompliance: 'Compliance & Legal',
    footerAbout: 'About Us',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerContact: 'Contact Us',
    footerResources: 'Resources',
    footerBlog: 'Blog',
    footerDocs: 'Documentation',
    footerRights: 'All rights reserved.'
  },

  zh: {
    // SEO
    pageTitle: 'audio-converters - 专业在线PCM播放器、原始音频播放与音频格式转换器 (PCM, WAV, MP3, OPUS)',
    pageDescription: '免费在线PCM播放器、RAW原始音频播放与音频格式转换工具。纯前端浏览器内播放无头裸流PCM音频，支持PCM转WAV、PCM转MP3、WAV转PCM、MP3转16kHz PCM裸流，支持8kHz-48kHz采样率转换与在线麦克风录音，零服务器上传，100%保护隐私。',
    pageKeywords: 'pcm播放器, 在线pcm播放器, pcm播放, 原始音频播放器, raw音频播放, pcm转wav, wav转pcm, pcm转mp3, 音频格式转换, 在线音频转换器, 16khz pcm, 8khz pcm, 裸流音频播放, 采样率转换, 纯前端音频转换, 麦克风录音转pcm, webassembly音频处理',
    ogTitle: 'audio-converters - 隐私优先的在线PCM播放器与音频格式转换器',
    ogDescription: '专业在线PCM播放与音频转换工具，纯前端高保真音频处理，文件在浏览器本地解码转码，绝不上传到服务器。',

    // Header & Nav
    brandName: 'audio-converters',
    navConverter: '音频转换',
    navRecorder: '在线录音',
    navBlog: '技术博客',
    navLanguage: '语言选择',

    // Hero
    heroBadge: '纯前端浏览器音频引擎',
    heroTitlePart1: '专业在线',
    heroTitleGradient: 'PCM 播放器与音频转换器',
    heroTitlePart2: '隐私优先的本地音频处理引擎',
    heroSubtitle: '在浏览器中直接转换、播放和录制各种音频格式。',
    heroPrivacyPrefix: '您的音频文件和录音均在本地内存中处理，',
    heroPrivacyHighlight: '绝不会上传到任何服务器',

    // Tabs
    tabConverter: '文件转换与播放',
    tabRecorder: '麦克风录音',

    // Dropzone & File List
    dropzoneTitle: '将音频文件拖放到此处',
    dropzoneSubtitle: '支持 WAV, PCM, RAW, MP3, OPUS, OGG（最多 5 个文件）',
    dropzonePrivacy: '100% 保护隐私：文件在浏览器本地完成处理',
    selectedFiles: '已选文件',
    addMore: '添加更多',
    formatLabel: '格式',
    sampleRateLabel: '采样率',
    pcmInputParams: 'PCM 原始音频输入参数',
    pcmParamHint: '裸流 PCM 没有文件头，请指定采样率、位深和声道以正确解析波形。',
    bitDepthLabel: '位深',
    channelsLabel: '声道',
    mono: '单声道 (Mono)',
    stereo: '立体声 (Stereo)',
    conversionTarget: '转换目标格式',
    convertBtn: '立即转换并下载',
    convertHint: '首次转换需要加载 WebAssembly 引擎，请稍候数秒',

    // Statuses
    statusLoading: '正在加载 FFmpeg 引擎...',
    statusResampling: '正在使用 Web Audio 重采样...',
    statusEncoding: '正在编码音频...',
    statusPreparing: '正在准备导出...',
    statusSuccess: '导出完成！',
    statusFailed: '导出失败',

    // Recorder
    recReady: '准备录音',
    recLive: '正在录制麦克风音频...',
    recTitle: '在线音频录音机',
    recSubtitle: '高质量直接录制为 PCM 16kHz 单声道音频。录音内容仅保留在浏览器内存中，绝不上传到任何服务器。',
    recPreview: '试听录音',
    recDownload: '下载录音',
    recDiscard: '放弃重录',

    // Features Section
    featSectionBadge: '一站式专业功能',
    featSectionTitle: '为什么选择 audio-converters 音频工具？',
    feat1Title: '边缘端本地处理',
    feat1Desc: '依托 WebAssembly 与 FFmpeg-WASM，纯浏览器端处理，零服务器依赖，确保最大隐私与瞬间响应。',
    feat2Title: '精细化 PCM 控制',
    feat2Desc: '针对无文件头的原始 PCM 裸流，提供动态采样率（8kHz-48kHz）、16位深度与单双声道深度配置。',
    feat3Title: '高保真重采样引擎',
    feat3Desc: '专业级重采样算法，支持 8000Hz、16000Hz、44100Hz、48000Hz 之间无失真转换，适合语音识别与音频制作。',
    feat4Title: '严格隐私保护',
    feat4Desc: '音频数据完全保留在您的个人设备内存中，我们不会查看、收集或传输您的任何音频文件与录音。',
    feat5Title: '针对 Opus / VoIP 深度优化',
    feat5Desc: '原生支持低延迟高保真的 Opus 编解码，非常适合网页流媒体传输、AI语音助手与 WebRTC 语音系统。',
    feat6Title: '毫秒级极速执行',
    feat6Desc: '无需漫长的网络上传等待，点击转换即刻由设备 CPU 高速计算完成，显著提升音频处理效率。',

    // Use cases tags
    useCaseVoip: 'VoIP 开发',
    useCasePodcasts: '播客制作',
    useCaseWebrtc: 'WebRTC 音视频',
    useCaseGameAudio: '游戏音效',
    useCaseAiTraining: 'AI 语音训练',
    useCaseEmbedded: '嵌入式 / 单片机',

    // Testimonials
    testiBadge: '全球超 10,000+ 开发者与创作者信赖',
    testiTitle: '用户评价',
    testiSubtitle: '了解全球工程师和音频创作者对我们纯前端处理技术的真实评价。',
    testi1Quote: 'audio-converters 彻底解决了我们 VoIP 通话调试的痛点。能够直接拖入裸流 PCM 并立即听到声音，为团队节省了数小时的排错时间。',
    testi1Name: 'Alex Rivest',
    testi1Role: '资深 WebRTC 架构师',
    testi2Quote: '界面干净专业，没有任何烦人的弹窗广告，也不用等待服务器队列。完全本地运行，处理私密音频素材让人非常放心。',
    testi2Name: 'Sarah Jenkins',
    testi2Role: '独立播客制作人与音效师',
    testi3Quote: '终于有一个真正懂 PCM 裸流的在线工具了！手动配置采样率和位深的功能正是 AI 语音识别模型开发中最需要的神器。',
    testi3Name: '陈伟 (Chen Wei)',
    testi3Role: 'AI 语音算法研究主管',

    // Deep Content / Guide Section
    guideTitlePart1: '精通音频处理与',
    guideTitleGradient: '裸流 PCM 转换技巧',
    step1Title: '安全上传或直接录音',
    step1Desc: '支持拖入 PCM、WAV、MP3、Opus 音频文件，或直接使用麦克风在线录制。全部在浏览器本地完成处理。',
    step2Title: '灵活配置 PCM 参数',
    step2Desc: '手动指定原始裸流采样率（8kHz 至 48kHz）、16位深度与声道数，或由系统自动识别标准文件头。',
    step3Title: '即时转换并无损导出',
    step3Desc: '毫秒级完成音频格式重采样与封装导出，无需排队等待服务器渲染，立即可保存到本地电脑。',

    // Technical Deep Dive Section
    guideOverviewTitle: 'PCM 原始音频与格式转换全景指南',
    guideOverviewText: '脉冲编码调制（Pulse Code Modulation，简称 PCM）是模拟声音信号数字化后的最原始表现形式。WAV、MP3、OPUS 等常见格式都在音频数据外部封装了标准的文件头（Header），记录了采样率、声道数和编码规范。而原始 PCM 裸流文件（.pcm 或 .raw）没有任何文件头信息，导致系统自带的播放器往往无法直接播放。audio-converters 为开发者、AI 算法工程师和音频爱好者提供了轻便强大的在线解决方案，能够在浏览器内直接可视化波形、试听裸流，并灵活将 PCM 转为 WAV/MP3，或将常见音频批量转换为 AI 语音识别所需的 16kHz PCM 单声道格式。',

    // Comparison Table
    tableTitle: '常见音频格式技术规格对照表',
    tableFormat: '音频格式',
    tableType: '编码类型',
    tableHeader: '文件头封装',
    tableSampleRates: '常用采样率',
    tableUseCases: '最佳应用场景',
    tablePcmDesc: '无头裸流数据 (Headerless)',
    tablePcmUses: 'AI语音识别训练 (Whisper/ASR)、ESP32单片机音频、VoIP诊断、算法验证',
    tableWavDesc: '无损 RIFF 容器封装 (44 字节头)',
    tableWavUses: '录音棚后期、无损母带制作、广播影视音效、高质量保存',
    tableMp3Desc: '有损压缩 (MPEG-1 Audio Layer III)',
    tableMp3Uses: '日常音乐播放、播客分发、网络流媒体、高设备兼容性',
    tableOpusDesc: '新一代低延迟交互式编码',
    tableOpusUses: 'Discord语音、WebRTC实时通信、低带宽网络传输、实时语音对讲',

    // FAQ Section
    faqTitle: '常见问题解答 (FAQ)',
    faq1Question: '如何在网页中播放没有文件头的 PCM / RAW 原始音频？',
    faq1Answer: '点击“文件转换与播放”标签页，将您的 .pcm 或 .raw 文件拖入上传区。由于原始 PCM 没有文件头，请在“PCM 原始音频输入参数”中选择匹配的采样率（如 16,000 Hz 或 8,000 Hz）、位深（16-bit）和单声道（Mono）。配置完成后波形会自动生成，点击播放按钮即可直接试听。',
    faq2Question: '如何将 MP3 或 WAV 转换为适合 AI 语音模型的 16kHz 16位 单声道 PCM？',
    faq2Answer: '将您的 MP3 或 WAV 音频上传后，在右侧“转换目标格式”中选择“PCM (Raw Stream)”，并将目标采样率设置为“16,000 Hz”。点击“立即转换并下载”，浏览器引擎将自动进行高保真重采样与声道缩混，输出标准的 16kHz 16-bit mono PCM 裸流文件，完美适配 OpenAI Whisper、Sherpa-ONNX 等开源模型。',
    faq3Question: '为什么播放 PCM 时听起来全都是沙沙声或刺耳的白噪声？',
    faq3Answer: '刺耳的白噪声通常是因为 PCM 播放参数与文件实际录制参数不一致。最常见的原因是位深或字节序不匹配（例如 8-bit 与 16-bit 混淆，或双声道被误当成单声道解析）。对于大多数语音识别或嵌入式设备导出的音频，选择 16-bit 单声道并在 16,000 Hz 或 8,000 Hz 采样率下即可正常播放。',
    faq4Question: '为什么 PCM 播放速度异常（像花栗鼠一样倍速或像慢动作）？',
    faq4Answer: '播放速度过快或过慢是采样率不匹配导致的。例如一段实际以 16kHz 录制的音频，如果以 32kHz 或 48kHz 解码，就会以 2 倍或 3 倍速播放，产生变调的高频尖叫声；反之则会变慢低沉。只需在参数栏中调整采样率即可恢复正常语速。',
    faq5Question: '在线麦克风录音功能如何使用？',
    faq5Answer: '切换到“麦克风录音”标签页，点击中间麦克风大按钮并在浏览器提示时授予麦克风权限。录音过程中可实时查看动态声波。录音结束后可在线试听，自由选择导出格式（WAV、PCM、MP3、Opus）及目标采样率，点击下载即可保存。',
    faq6Question: '我上传的文件或麦克风录音会被上传到云端服务器吗？',
    faq6Answer: '绝不会。audio-converters 采用纯前端 WebAssembly 和 Web Audio 技术，所有波形计算、音频转码和重采样均在您的本地设备内存中实时完成，没有任何网络请求传输您的音频数据，确保绝对的安全与隐私。',

    // Footer
    footerTagline: '纯前端 WebAssembly 驱动的专业音频工具箱。隐私第一、秒级响应、专业保真。',
    footerCompliance: '合规与条款',
    footerAbout: '关于我们',
    footerPrivacy: '隐私政策',
    footerTerms: '服务条款',
    footerContact: '联系我们',
    footerResources: '资源',
    footerBlog: '工程博客',
    footerDocs: '使用文档',
    footerRights: '版权所有。'
  },

  ja: {
    // SEO
    pageTitle: 'audio-converters - プロ仕様オンラインPCMプレーヤー＆RAW音声・オーディオ変換ツール (PCM, WAV, MP3, OPUS)',
    pageDescription: '無料のオンラインPCMプレーヤー＆RAW音声変換ツール。ブラウザ上でRAW/PCM音声を直接再生、PCMからWAV/MP3への変換、WAV/MP3から16kHz PCMへの変換、サンプリングレート変更(8kHz〜48kHz)に対応。サーバーへのアップロード不要で安全・安心。',
    pageKeywords: 'pcm再生, オンラインpcmプレーヤー, raw音声再生, pcm wav 変換, pcm mp3 変換, 音声フォーマット変換, オンラインオーディオコンバーター, サンプリングレート変換, 16khz pcm, 8khz pcm, ブラウザ音声変換, マイク録音 pcm, webassembly 音声処理, 音声エンコード',
    ogTitle: 'audio-converters - プライバシー最優先のPCMプレーヤー＆音声コンバーター',
    ogDescription: 'ブラウザ完結のプロ向けPCMプレーヤー＆オーディオコンバーター。サーバー送信なしで高音質オーディオ処理。',

    // Header & Nav
    brandName: 'audio-converters',
    navConverter: '音声変換',
    navRecorder: 'マイク録音',
    navBlog: 'ブログ',
    navLanguage: '言語切替',

    // Hero
    heroBadge: 'ブラウザ完結オーディオエンジン',
    heroTitlePart1: 'プロフェッショナル',
    heroTitleGradient: 'PCM プレーヤー＆音声コンバーター',
    heroTitlePart2: 'プライバシー重視の高速音声エンジン',
    heroSubtitle: 'ブラウザ上で音声フォーマットの変換、再生、録音をすべて完結。',
    heroPrivacyPrefix: '音声ファイルや録音データはすべてローカルで処理され、',
    heroPrivacyHighlight: 'サーバーに送信されることはありません',

    // Tabs
    tabConverter: 'ファイル変換・再生',
    tabRecorder: 'マイク録音',

    // Dropzone & File List
    dropzoneTitle: 'ここに音声ファイルをドロップ',
    dropzoneSubtitle: 'WAV, PCM, RAW, MP3, OPUS, OGG（最大5ファイル）',
    dropzonePrivacy: '100% プライベート：ブラウザ内でローカル処理',
    selectedFiles: '選択済みファイル',
    addMore: '追加する',
    formatLabel: '形式',
    sampleRateLabel: 'サンプリングレート',
    pcmInputParams: 'PCM 入力パラメータ設定',
    pcmParamHint: 'RAW PCMにはヘッダーがありません。サンプリング周波数と形式を指定してください。',
    bitDepthLabel: 'ビット深度',
    channelsLabel: 'チャンネル',
    mono: 'モノラル (Mono)',
    stereo: 'ステレオ (Stereo)',
    conversionTarget: '変換先の形式',
    convertBtn: '今すぐ変換してダウンロード',
    convertHint: '初回変換時はWebAssemblyエンジンの読み込みに数秒かかる場合があります',

    // Statuses
    statusLoading: 'FFmpegエンジンを読み込み中...',
    statusResampling: 'Web Audioでリサンプリング中...',
    statusEncoding: '音声エンコード中...',
    statusPreparing: 'エクスポート準備中...',
    statusSuccess: 'エクスポート完了！',
    statusFailed: 'エクスポート失敗',

    // Recorder
    recReady: '録音準備完了',
    recLive: 'マイク音声を録音中...',
    recTitle: 'オンライン音声レコーダー',
    recSubtitle: '高品質なPCM 16kHzモノラル音声を直接キャプチャ。録音データはメモリ上でのみ保持され、サーバーには送信されません。',
    recPreview: 'プレビュー再生',
    recDownload: 'ダウンロード',
    recDiscard: '破棄',

    // Features Section
    featSectionBadge: '充実の機能',
    featSectionTitle: 'audio-converters の主な機能',
    feat1Title: 'エッジ・ローカル処理',
    feat1Desc: 'WebAssemblyとFFmpeg-WASMにより、サーバー不要でブラウザ内完結の高速処理と確実なセキュリティを提供。',
    feat2Title: '精密なPCM制御',
    feat2Desc: 'ヘッダーのないRAW PCMストリームに対して、動的なサンプリング周波数（8kHz〜48kHz）、16ビット、モノラル設定が可能。',
    feat3Title: '高精度リサンプリング',
    feat3Desc: '8,000Hz、16,000Hz、44,100Hz、48,000Hz間の高精度リサンプリングに対応し、AI音声モデルやプロの音響要件に適合。',
    feat4Title: '完全なプライバシー保護',
    feat4Desc: 'データはお使いの端末メモリ（RAM）内でのみ処理されます。外部サーバーへのファイル送信は一切行われません。',
    feat5Title: 'Opus / VoIP 最適化',
    feat5Desc: '低遅延・高音質のOpusコーデックをサポートし、WebRTCや音声対話、ストリーミング配信に最適な変換を実現。',
    feat6Title: 'ネットワーク遅延ゼロ',
    feat6Desc: 'ファイルのアップロード待ち時間を解消。クリックした瞬間にローカルCPUパワーを活用して処理を開始します。',

    // Use cases tags
    useCaseVoip: 'VoIP 開発',
    useCasePodcasts: 'ポッドキャスト',
    useCaseWebrtc: 'WebRTC 音声',
    useCaseGameAudio: 'ゲームサウンド',
    useCaseAiTraining: 'AI 音声認識',
    useCaseEmbedded: '組み込み / IoT',

    // Testimonials
    testiBadge: '世界中10,000人以上のエンジニアが活用',
    testiTitle: 'ユーザーの声',
    testiSubtitle: 'ブラウザ完結の高速オーディオ処理に関する開発者やクリエイターの声をご覧ください。',
    testi1Quote: 'VoIPデバッグの大きな助けになっています。RAW PCMダンプをそのままドラッグ＆ドロップして即座に試聴できるため、調査時間を大幅に短縮できました。',
    testi1Name: 'Alex Rivest',
    testi1Role: 'シニア WebRTC エンジニア',
    testi2Quote: '非常にシンプルで洗練されたUIです。わずらわしい広告やサーバー待ちがなく、ブラウザ上で一瞬で変換できる点が素晴らしいです。',
    testi2Name: 'Sarah Jenkins',
    testi2Role: 'ポッドキャスト制作・サウンドデザイナー',
    testi3Quote: 'RAW PCMを正確に扱えるオンラインツールは貴重です。サンプリングレートやビット深度を直接設定できる機能は、AI音声モデル開発に不可欠です。',
    testi3Name: 'Chen Wei',
    testi3Role: 'AI音声認識リサーチリーダー',

    // Deep Content / Guide Section
    guideTitlePart1: 'オーディオ処理と',
    guideTitleGradient: 'RAW PCMをマスターする',
    step1Title: '安全にアップロードまたは録音',
    step1Desc: 'PCM、WAV、MP3、Opusファイルをドラッグ＆ドロップするか、マイクから直接録音。WebAssemblyによりすべてローカルで処理。',
    step2Title: 'PCMパラメータの詳細設定',
    step2Desc: 'RAW PCMのサンプリング周波数（8kHz〜48kHz）やチャンネルを手動設定。一般的なフォーマットは自動判別されます。',
    step3Title: '瞬時のエンコード＆書き出し',
    step3Desc: 'サーバーの通信待機なしで、ミリ秒単位でフォーマットやサンプリング周波数を変換してローカル保存できます。',

    // Technical Deep Dive Section
    guideOverviewTitle: 'RAW PCM音声とフォーマット変換ガイド',
    guideOverviewText: 'パルス符号変調（Pulse Code Modulation: PCM）は、アナログ音声信号をデジタル化した最も基本的な非圧縮オーディオデータです。一般的なWAV、MP3、OPUSなどのフォーマットは、音声データにサンプリング周波数やチャンネル数を記載したファイルヘッダー（Header）が付与されていますが、RAW PCMファイル（.pcm や .raw）にはヘッダーが存在しません。そのため一般的なメディアプレーヤーでは再生できません。audio-converters は、ブラウザ上で直接RAW PCMの波形を視覚化して再生し、WAVやMP3への相互変換、AI音声認識に広く使われる16kHz PCMへの変換を簡単に行えるプロフェッショナルツールです。',

    // Comparison Table
    tableTitle: 'オーディオフォーマット仕様比較',
    tableFormat: 'フォーマット',
    tableType: 'データ種別',
    tableHeader: 'ヘッダー構造',
    tableSampleRates: '主なサンプリング周波数',
    tableUseCases: '主な用途',
    tablePcmDesc: 'ヘッダーなしRAWストリーム',
    tablePcmUses: 'AI音声認識 (Whisper/ASR)、ESP32組み込み開発、VoIPデバッグ、DSP解析',
    tableWavDesc: '非圧縮 RIFF コンテナ (44バイトヘッダー)',
    tableWavUses: 'レコーディングスタジオ、マスター音源制作、効果音、高音質保存',
    tableMp3Desc: '非可逆圧縮 (MPEG-1 Audio Layer III)',
    tableMp3Uses: '日常の音楽配信、ポッドキャスト、一般的な再生環境での互換性',
    tableOpusDesc: '低遅延インタラクティブ非可逆圧縮',
    tableOpusUses: 'Discord、WebRTCリアルタイム通話、低帯域通信環境、音声ストリーミング',

    // FAQ Section
    faqTitle: 'よくある質問 (FAQ)',
    faq1Question: 'ヘッダーのないRAW PCM (.pcm / .raw) 音声を再生するには？',
    faq1Answer: '「ファイル変換・再生」タブに移動し、.pcm または .raw ファイルをドロップしてください。RAW PCMにはヘッダー情報が含まれていないため、「PCM 入力パラメータ」で適切なサンプリング周波数（16,000Hz や 8,000Hzなど）、ビット深度（16ビット）、モノラルを選択すると、波形が即座に生成され再生ボタンで試聴できます。',
    faq2Question: 'MP3やWAVをAI音声認識用の16kHz 16bitモノラルPCMに変換する方法は？',
    faq2Answer: 'MP3またはWAVファイルをアップロードし、「変換先の形式」で「PCM (Raw Stream)」を選択、サンプリングレートを「16,000 Hz」に設定して「今すぐ変換してダウンロード」をクリックします。Whisperや音声モデルに最適な形式で即座に書き出されます。',
    faq3Question: 'PCM再生時にホワイトノイズや激しい雑音が出るのはなぜですか？',
    faq3Answer: '再生パラメータ（ビット深度やエンディアン、サンプリング周波数）が実際のデータと一致していない場合にノイズが発生します。多くの音声AIや組み込みシステムでは「16ビット Signed リトルエンディアン・モノラル」が採用されていますので、16,000Hz または 8,000Hz で設定をお試しください。',
    faq4Question: '再生速度が早すぎる（甲高い声）または遅すぎる場合の対処法は？',
    faq4Answer: 'サンプリングレートの不一致が原因です。たとえば16kHzで録音された音声を32kHzや48kHzで再生すると、2倍や3倍の早回し状態（甲高い声）になります。パラメータ設定でサンプリング周波数を調整してください。',
    faq5Question: 'オンラインマイク録音機能の使い方を教えてください。',
    faq5Answer: '「マイク録音」タブで中央のマイクアイコンをクリックし、ブラウザのマイク許可を承認します。録音中は波形がリアルタイム表示されます。録音完了後、プレビュー試聴や出力形式（WAV、PCM、MP3、Opus）を選択してダウンロードできます。',
    faq6Question: 'アップロードしたファイルや録音データはサーバーに保存されますか？',
    faq6Answer: 'いいえ、一切保存されません。すべての処理はWebAssemblyとWeb Audio APIを通じてユーザーの端末ローカル環境（ブラウザ内）でのみ実行され、外部への通信は行われません。プライバシーは完全に保護されます。',

    // Footer
    footerTagline: 'WebAssembly技術をフル活用したブラウザ完結のプロ向けオーディオツールキット。安全・高速・高忠実度。',
    footerCompliance: '利用規約・ポリシー',
    footerAbout: '会社情報',
    footerPrivacy: 'プライバシーポリシー',
    footerTerms: '利用規約',
    footerContact: 'お問い合わせ',
    footerResources: 'リソース',
    footerBlog: 'エンジニアブログ',
    footerDocs: 'ドキュメント',
    footerRights: '無断転載を禁じます。'
  },

  ko: {
    // SEO
    pageTitle: 'audio-converters - 전문 온라인 PCM 플레이어, RAW 오디오 재생 및 오디오 변환기 (PCM, WAV, MP3, OPUS)',
    pageDescription: '무료 온라인 PCM 플레이어 및 RAW 오디오 변환기. 헤더 없는 RAW/PCM 오디오를 브라우저에서 바로 재생하고, PCM을 WAV/MP3로 변환하거나 MP3/WAV를 16kHz PCM으로 변환합니다. 8kHz~48kHz 리샘플링 및 안전한 마이크 녹음 지원, 서버 업로드 없는 100% 로컬 처리.',
    pageKeywords: 'pcm 플레이어, 온라인 pcm 재생, raw 오디오 플레이어, pcm wav 변환, pcm mp3 변환, 오디오 포맷 변환기, 온라인 오디오 변환, 샘플레이트 변환, 16khz pcm, 8khz pcm, 브라우저 오디오 변환, 마이크 녹음 pcm, webassembly 오디오 처리',
    ogTitle: 'audio-converters - 개인정보 보호 최우선 PCM 플레이어 및 오디오 변환기',
    ogDescription: '브라우저에서 직접 구동되는 전문가용 PCM 플레이어 및 오디오 변환기. 서버 업로드 없는 안전한 고음질 오디오 엔진.',

    // Header & Nav
    brandName: 'audio-converters',
    navConverter: '오디오 변환',
    navRecorder: '마이크 녹음',
    navBlog: '기술 블로그',
    navLanguage: '언어 설정',

    // Hero
    heroBadge: '인브라우저 오디오 엔진',
    heroTitlePart1: '전문 온라인',
    heroTitleGradient: 'PCM 플레이어 및 오디오 변환기',
    heroTitlePart2: '개인정보 보호 최우선 오디오 엔진',
    heroSubtitle: '브라우저에서 다양한 오디오 포맷을 직접 변환, 재생 및 녹음하세요.',
    heroPrivacyPrefix: '오디오 파일과 녹음 데이터는 로컬에서 안전하게 처리되며',
    heroPrivacyHighlight: '서버로 절대 업로드되지 않습니다',

    // Tabs
    tabConverter: '파일 변환 및 재생',
    tabRecorder: '마이크 녹음',

    // Dropzone & File List
    dropzoneTitle: '오디오 파일을 여기에 드롭하세요',
    dropzoneSubtitle: 'WAV, PCM, RAW, MP3, OPUS, OGG 지원 (최대 5개 파일)',
    dropzonePrivacy: '100% 안전: 파일은 브라우저 내에서 로컬 처리됩니다',
    selectedFiles: '선택된 파일',
    addMore: '더 추가하기',
    formatLabel: '포맷',
    sampleRateLabel: '샘플레이트',
    pcmInputParams: 'PCM 입력 매개변수 설정',
    pcmParamHint: 'RAW PCM에는 헤더가 없습니다. 샘플레이트와 형식을 정확히 지정해주세요.',
    bitDepthLabel: '비트 깊이',
    channelsLabel: '채널',
    mono: '모노 (Mono)',
    stereo: '스테레오 (Stereo)',
    conversionTarget: '변환 대상 포맷',
    convertBtn: '지금 변환하고 다운로드',
    convertHint: '첫 변환 시 WebAssembly 엔진 로딩으로 몇 초 정도 걸릴 수 있습니다',

    // Statuses
    statusLoading: 'FFmpeg 엔진 로딩 중...',
    statusResampling: 'Web Audio로 리샘플링 중...',
    statusEncoding: '오디오 인코딩 중...',
    statusPreparing: '내보내기 준비 중...',
    statusSuccess: '내보내기 완료!',
    statusFailed: '내보내기 실패',

    // Recorder
    recReady: '녹음 준비 완료',
    recLive: '마이크 오디오 녹음 중...',
    recTitle: '온라인 오디오 레코더',
    recSubtitle: 'PCM 16kHz 모노 오디오로 고음질 즉시 녹음. 녹음 데이터는 메모리에만 유지되며 서버로 전송되지 않습니다.',
    recPreview: '미리듣기',
    recDownload: '다운로드',
    recDiscard: '삭제',

    // Features Section
    featSectionBadge: '필요한 모든 기능',
    featSectionTitle: 'audio-converters의 주요 기능',
    feat1Title: '엣지 로컬 프로세싱',
    feat1Desc: 'WebAssembly 및 FFmpeg-WASM 기반의 100% 브라우저 로컬 처리로 최고 수준의 개인정보 보호와 즉각적인 속도를 보장합니다.',
    feat2Title: '정밀한 PCM 제어',
    feat2Desc: '헤더가 없는 RAW PCM 스트림을 위해 동적 샘플레이트(8kHz~48kHz), 16비트 깊이, 모노/스테레오 채널 설정을 지원합니다.',
    feat3Title: '고음질 리샘플링 엔진',
    feat3Desc: '8,000Hz, 16,000Hz, 44,100Hz, 48,000Hz 간의 무손실 고품질 리샘플링으로 AI 모델 및 전문 음향 작업에 최적화되었습니다.',
    feat4Title: '철저한 보안 및 프라이버시',
    feat4Desc: '모든 오디오 데이터는 사용자의 기기 메모리(RAM) 내에서만 안전하게 처리되며 외부 서버로 전송되지 않습니다.',
    feat5Title: 'Opus 및 VoIP 최적화',
    feat5Desc: '초저지연 고음질 Opus 코덱을 완벽 지원하여 WebRTC, 음성 대화, 실시간 스트리밍에 최적화된 변환을 제공합니다.',
    feat6Title: '네트워크 지연 없는 즉시 실행',
    feat6Desc: '느린 파일 업로드 대기 시간 없이, 클릭하는 순간 로컬 CPU 자원을 활용하여 즉각적으로 변환 작업을 완료합니다.',

    // Use cases tags
    useCaseVoip: 'VoIP 개발',
    useCasePodcasts: '팟캐스트',
    useCaseWebrtc: 'WebRTC 음성',
    useCaseGameAudio: '게임 사운드',
    useCaseAiTraining: 'AI 음성 인식',
    useCaseEmbedded: '임베디드 / IoT',

    // Testimonials
    testiBadge: '전 세계 10,000명 이상의 개발자가 선택',
    testiTitle: '사용자 후기',
    testiSubtitle: '브라우저 기반 로컬 처리에 대한 개발자와 오디오 크리에이터들의 솔직한 평가를 확인하세요.',
    testi1Quote: 'VoIP 디버깅 작업 시 헤더 없는 PCM 덤프를 바로 드롭해서 소리를 확인할 수 있어 개발 시간을 크게 절약했습니다.',
    testi1Name: 'Alex Rivest',
    testi1Role: '수석 WebRTC 엔지니어',
    testi2Quote: '군더더기 없는 직관적인 인터페이스입니다. 광고나 서버 큐 대기 없이 브라우저에서 바로 변환할 수 있어 매우 만족스럽습니다.',
    testi2Name: 'Sarah Jenkins',
    testi2Role: '팟캐스트 프로듀서 & 사운드 디자이너',
    testi3Quote: '드디어 RAW PCM을 제대로 다룰 수 있는 온라인 도구를 찾았습니다. 수동 매개변수 설정은 AI 음성 모델 개발자에게 필수적입니다.',
    testi3Name: 'Chen Wei',
    testi3Role: 'AI 음성인식 리서치 리드',

    // Deep Content / Guide Section
    guideTitlePart1: '오디오 처리와',
    guideTitleGradient: 'RAW PCM 완벽 마스터',
    step1Title: '안전한 업로드 및 실시간 녹음',
    step1Desc: 'PCM, WAV, MP3, Opus 오디오 파일을 드롭하거나 마이크로 바로 녹음하세요. WebAssembly를 통해 모든 과정이 로컬에서 실행됩니다.',
    step2Title: 'PCM 세부 매개변수 맞춤 설정',
    step2Desc: 'RAW PCM의 샘플레이트(8kHz~48kHz), 16비트 깊이, 채널을 수동 설정하거나 표준 형식의 헤더 정보를 자동 인식합니다.',
    step3Title: '즉각적인 변환 및 내보내기',
    step3Desc: '서버 업로드 지연 없이 밀리초 단위로 포맷과 샘플레이트를 변환하여 내 컴퓨터에 바로 저장하세요.',

    // Technical Deep Dive Section
    guideOverviewTitle: 'RAW PCM 오디오 및 포맷 변환 종합 가이드',
    guideOverviewText: '펄스 부호 변조(Pulse Code Modulation, PCM)는 아날로그 음성 신호를 디지털화한 가장 순수한 비압축 데이터 형식입니다. WAV, MP3, OPUS 등의 일반적인 오디오 포맷은 샘플레이트, 비트 깊이, 채널 수를 정의하는 헤더(Header)를 포함하고 있지만, RAW PCM 파일(.pcm, .raw)은 헤더가 없는 순수 샘플 값으로만 구성되어 있어 일반 미디어 플레이어에서는 재생되지 않습니다. audio-converters는 브라우저에서 바로 헤더 없는 RAW PCM 오디오의 파형을 시각화하고 재생하며, WAV 및 MP3로 상호 변환하거나 AI 음성인식에 널리 사용되는 16kHz 모노 PCM으로 변환할 수 있는 강력한 웹 오디오 도구입니다.',

    // Comparison Table
    tableTitle: '오디오 포맷 기술 규격 비교표',
    tableFormat: '포맷',
    tableType: '인코딩 유형',
    tableHeader: '헤더 구조',
    tableSampleRates: '주요 샘플레이트',
    tableUseCases: '권장 활용 분야',
    tablePcmDesc: '헤더 없는 RAW 스트림 (Headerless)',
    tablePcmUses: 'AI 음성인식 학습 (Whisper/ASR), ESP32 마이크로컨트롤러, VoIP 디버깅, DSP 분석',
    tableWavDesc: '비압축 RIFF 컨테이너 (44바이트 헤더)',
    tableWavUses: '스튜디오 레코딩, 마스터 음원 제작, 사운드 디자인, 방송용 고음질',
    tableMp3Desc: '손실 압축 (MPEG-1 Audio Layer III)',
    tableMp3Uses: '음악 스트리밍, 팟캐스트 배포, 웹 오디오, 범용 기기 호환성',
    tableOpusDesc: '저지연 인터랙티브 손실 압축',
    tableOpusUses: '디스코드(Discord), WebRTC 실시간 음성, 저대역폭 네트워크, 실시간 통화',

    // FAQ Section
    faqTitle: '자주 묻는 질문 (FAQ)',
    faq1Question: '헤더가 없는 RAW PCM (.pcm / .raw) 오디오는 어떻게 재생하나요?',
    faq1Answer: '“파일 변환 및 재생” 탭에서 .pcm 또는 .raw 파일을 업로드하세요. RAW PCM 파일에는 헤더가 없으므로 “PCM 입력 매개변수”에서 알맞은 샘플레이트(예: 16,000Hz 또는 8,000Hz), 비트 깊이(16비트), 모노 채널을 선택합니다. 설정 즉시 파형이 생성되며 재생 버튼을 눌러 청취할 수 있습니다.',
    faq2Question: 'MP3나 WAV 파일을 AI 음성 모델용 16kHz 16비트 모노 PCM으로 변환하려면?',
    faq2Answer: 'MP3 또는 WAV 파일을 업로드한 후, “변환 대상 포맷”에서 “PCM (Raw Stream)”을 선택하고 대상 샘플레이트를 “16,000 Hz”로 설정합니다. “지금 변환하고 다운로드”를 클릭하면 고음질 리샘플링을 거쳐 Whisper, Vosk 등에 적합한 16kHz 16-bit mono PCM 파일로 즉시 저장됩니다.',
    faq3Question: 'PCM 재생 시 심한 백색 소음이나 지지직거리는 잡음이 나는 이유는 무엇인가요?',
    faq3Answer: '실제 오디오의 인코딩 규격과 플레이어의 설정값이 일치하지 않을 때 소음이 발생합니다. 대표적으로 8비트/16비트 혼동, 엔디안 불일치, 스테레오를 모노로 잘못 읽는 경우가 있습니다. 대부분의 음성인식이나 임베디드 오디오는 16비트 리틀엔디안 모노(16,000Hz 또는 8,000Hz)를 선택하면 정상 재생됩니다.',
    faq4Question: '재생 속도가 다람쥐 소리처럼 너무 빠르거나 느리게 늘어지는 이유는 무엇인가요?',
    faq4Answer: '샘플레이트 불일치로 인한 현상입니다. 예를 들어 16kHz로 녹음된 오디오를 32kHz나 48kHz로 재생하면 2배 또는 3배 속도로 빠르게 재생되어 고음으로 왜곡됩니다. 샘플레이트 드롭다운에서 원래 샘플레이트를 선택하면 정상 음질로 돌아옵니다.',
    faq5Question: '온라인 마이크 녹음 기능은 어떻게 사용하나요?',
    faq5Answer: '“마이크 녹음” 탭으로 이동하여 마이크 버튼을 클릭하고 브라우저 마이크 권한을 허용합니다. 실시간 음파를 확인하며 녹음한 후, 미리듣기로 확인하고 원하는 형식(WAV, PCM, MP3, Opus)과 샘플레이트를 선택해 바로 다운로드할 수 있습니다.',
    faq6Question: '업로드한 파일이나 음성 녹음이 외부 서버로 전송되나요?',
    faq6Answer: '절대 아닙니다. audio-converters는 WebAssembly와 Web Audio 기술을 기반으로 사용자의 로컬 브라우저 메모리 내에서만 모든 처리를 수행합니다. 어떤 오디오 데이터도 서버로 전송되지 않으므로 안심하고 사용하실 수 있습니다.',

    // Footer
    footerTagline: 'WebAssembly 기반의 안전하고 빠른 브라우저 오디오 툴킷. 완벽한 프라이버시, 즉각적인 응답, 전문가급 음질.',
    footerCompliance: '규정 및 약관',
    footerAbout: '회사 소개',
    footerPrivacy: '개인정보 처리방침',
    footerTerms: '이용약관',
    footerContact: '문의하기',
    footerResources: '리소스',
    footerBlog: '엔지니어링 블로그',
    footerDocs: '사용자 가이드',
    footerRights: 'All rights reserved.'
  }
}
