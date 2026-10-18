<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { messages } from '../../locales'

// -- Internationalization Setup --
const { locale, availableLocales, t, setLocale, setLocaleMessage } = useI18n()
const siteUrl = useRuntimeConfig().public.siteUrl
const localePath = useLocalePath()

// Ensure all language messages are registered
Object.keys(messages).forEach(code => {
  setLocaleMessage(code, (messages as any)[code])
})

const selectedLanguage = ref(locale.value)

watch(locale, (newLoc) => {
  if (selectedLanguage.value !== newLoc) {
    selectedLanguage.value = newLoc
  }
})

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '中文 (简体)', value: 'zh' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' }
]

const onLanguageChange = async (newLang: any) => {
  const code = typeof newLang === 'object' ? newLang?.value : newLang
  if (code && code !== locale.value) {
    // Writes i18n_redirected cookie and navigates to the localized path
    await setLocale(code)
  }
}

// -- SEO Metadata (AdSense & Search Engines with Long-tail Keywords) --
useHead(() => ({
  title: t('pageTitle'),
  meta: [
    { name: 'description', content: t('pageDescription') },
    { name: 'keywords', content: t('pageKeywords') },
    { name: 'google-adsense-account', content: 'ca-pub-2272817394393914' },
    { property: 'og:title', content: t('ogTitle') },
    { property: 'og:description', content: t('ogDescription') },
    { property: 'og:image', content: '/logo.svg' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'audio-converters' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('ogTitle') },
    { name: 'twitter:description', content: t('ogDescription') }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            'name': 'audio-converters',
            'applicationCategory': 'MultimediaApplication',
            'operatingSystem': 'All',
            'url': siteUrl,
            'description': t('pageDescription'),
            'inLanguage': locale.value,
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            },
            'featureList': [
              'Headerless Raw PCM Audio Player',
              'In-Browser FFmpeg-WASM Audio Converter',
              'High-Fidelity Resampling (8kHz to 48kHz)',
              '16kHz 16-bit Mono PCM for AI Speech Models',
              'Zero Server Uploads & 100% Client-Side Privacy',
              'Real-Time Microphone Online Recorder'
            ]
          },
          {
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': t('faq1Question'),
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': t('faq1Answer')
                }
              },
              {
                '@type': 'Question',
                'name': t('faq2Question'),
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': t('faq2Answer')
                }
              },
              {
                '@type': 'Question',
                'name': t('faq3Question'),
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': t('faq3Answer')
                }
              },
              {
                '@type': 'Question',
                'name': t('faq4Question'),
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': t('faq4Answer')
                }
              },
              {
                '@type': 'Question',
                'name': t('faq5Question'),
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': t('faq5Answer')
                }
              },
              {
                '@type': 'Question',
                'name': t('faq6Question'),
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': t('faq6Answer')
                }
              }
            ]
          }
        ]
      })
    }
  ]
}))

// -- State Definitions --
interface AudioFileItem {
  id: string
  file: File
  name: string
  format: string
  sampleRate: number
  isPcm: boolean
}

const activeTab = ref('converter')
const fileList = ref<AudioFileItem[]>([])
const selectedFileIndex = ref<number>(0)
const isFileUploaded = computed(() => fileList.value.length > 0)
const selectedFile = computed(() => fileList.value[selectedFileIndex.value] || null)

const isPcmFile = computed(() => selectedFile.value?.isPcm || false)

const fileInput = ref<HTMLInputElement | null>(null)
const waveformRef = ref<HTMLElement | null>(null)
const wavesurfer = ref<WaveSurfer | null>(null)

// FFmpeg State
const ffmpegRef = ref<FFmpeg | null>(null)
const ffmpegLoaded = ref(false)
const isConverting = ref(false)
const conversionProgress = ref(0)
const conversionStatus = ref('')

// PCM Configuration
const pcmConfig = ref({
  sampleRate: '16000',
  bitDepth: '16',
  channels: '1'
})

const targetFormatOptions = [
  { label: 'MP3 (MPEG Audio)', value: 'mp3' },
  { label: 'WAV (Uncompressed)', value: 'wav' },
  { label: 'Opus (Low Latency)', value: 'opus' },
  { label: 'PCM (Raw Stream)', value: 'pcm' }
]

// Export Settings
const exportSettings = ref({
  targetFormat: targetFormatOptions[1],
  targetSampleRate: '44100'
})
const userPickedTargetSampleRate = ref(false)

const onTargetSampleRateChange = () => {
  userPickedTargetSampleRate.value = true
}

const recordExportSettings = ref({
  targetFormat: targetFormatOptions[1],
  targetSampleRate: '16000'
})

// Recording State
const isRecording = ref(false)
const isPlaying = ref(false)
const hasRecording = ref(false)
const recordingBlob = ref<Blob | null>(null)

// Web Audio API for Recording & Visualization
const recordWaveformRef = ref<HTMLElement | null>(null)
const recordWavesurfer = ref<WaveSurfer | null>(null)
const recordPlugin = ref<any>(null)
const recordedChunks = ref<Blob[]>([])

// Options
const sampleRateOptions = [
  { label: '8,000 Hz', value: '8000' },
  { label: '16,000 Hz', value: '16000' },
  { label: '24,000 Hz', value: '24000' },
  { label: '32,000 Hz', value: '32000' },
  { label: '44,100 Hz', value: '44100' },
  { label: '48,000 Hz', value: '48000' }
]

// Opus only supports 8000, 12000, 16000, 24000, 48000 — disable 44100 and 32000
const isOpusFormat = (fmt: any) => fmt?.value === 'opus'

const converterSampleRateOptions = computed(() =>
  sampleRateOptions.map(opt => ({
    ...opt,
    disabled: isOpusFormat(exportSettings.value.targetFormat) && (opt.value === '44100' || opt.value === '32000')
  }))
)

const recorderSampleRateOptions = computed(() =>
  sampleRateOptions.map(opt => ({
    ...opt,
    disabled: isOpusFormat(recordExportSettings.value.targetFormat) && (opt.value === '44100' || opt.value === '32000')
  }))
)

// Auto-switch sample rate away from unsupported values when Opus is selected
watch(() => exportSettings.value.targetFormat, (fmt) => {
  if (isOpusFormat(fmt) && (exportSettings.value.targetSampleRate === '44100' || exportSettings.value.targetSampleRate === '32000')) {
    exportSettings.value.targetSampleRate = '48000'
    return
  }
  // MP3/WAV → PCM: default to 16 kHz when target still matches source (avoids accidental 32 kHz output)
  if (fmt?.value === 'pcm') {
    const item = fileList.value[selectedFileIndex.value]
    if (item && !item.isPcm && exportSettings.value.targetSampleRate === item.sampleRate.toString()) {
      exportSettings.value.targetSampleRate = '16000'
    }
  }
})

watch(() => recordExportSettings.value.targetFormat, (fmt) => {
  if (isOpusFormat(fmt) && (recordExportSettings.value.targetSampleRate === '44100' || recordExportSettings.value.targetSampleRate === '32000')) {
    recordExportSettings.value.targetSampleRate = '48000'
  }
})

// Tab navigation items
const tabItems = computed(() => [
  { label: t('tabConverter'), icon: 'i-heroicons-arrow-path-rounded-square', value: 'converter' },
  { label: t('tabRecorder'), icon: 'i-heroicons-microphone', value: 'recorder' }
])

// -- FFmpeg Initialization --
const FFMPEG_CORE_VERSION = '0.12.6'
const BASE_URL = `https://unpkg.com/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/esm`

const loadFFmpeg = async () => {
  if (ffmpegLoaded.value && ffmpegRef.value) return ffmpegRef.value

  const ffmpeg = new FFmpeg()

  ffmpeg.on('progress', ({ progress }: { progress: number }) => {
    conversionProgress.value = Math.min(Math.round(progress * 100), 100)
  })

  await ffmpeg.load({
    coreURL: `${BASE_URL}/ffmpeg-core.js`,
    wasmURL: `${BASE_URL}/ffmpeg-core.wasm`
  })

  ffmpegRef.value = ffmpeg
  ffmpegLoaded.value = true
  return ffmpeg
}

// -- WaveSurfer Initialization --
const initWaveSurfer = () => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy()
    wavesurfer.value = null
  }

  if (!waveformRef.value) return

  wavesurfer.value = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: '#93c5fd',
    progressColor: '#2563eb',
    cursorColor: '#1d4ed8',
    barWidth: 2,
    barGap: 3,
    barRadius: 2,
    height: 90
  })

  wavesurfer.value.on('play', () => { isPlaying.value = true })
  wavesurfer.value.on('pause', () => { isPlaying.value = false })
  wavesurfer.value.on('finish', () => { isPlaying.value = false })
  wavesurfer.value.on('error', (err) => {
    console.error('WaveSurfer error:', err)
    isPlaying.value = false
  })
}

let playbackUrl: string | null = null

const releasePlaybackUrl = () => {
  if (!playbackUrl) return
  URL.revokeObjectURL(playbackUrl)
  playbackUrl = null
}

// The waveform node is inside v-if and only exists after a file is chosen.
// Creating WaveSurfer on page mount leaves a null instance, so play does nothing.
const ensureWaveSurfer = async () => {
  for (let i = 0; i < 8 && !waveformRef.value; i++) {
    await nextTick()
    if (!waveformRef.value) {
      await new Promise((resolve) => setTimeout(resolve, 30))
    }
  }

  const container = waveformRef.value
  if (!container) return null

  const wrapper = wavesurfer.value?.getWrapper()
  const attached = !!wrapper && container.contains(wrapper)
  if (!attached) {
    wavesurfer.value?.destroy()
    wavesurfer.value = null
    initWaveSurfer()
  }
  return wavesurfer.value
}

const loadSelectedAudio = async () => {
  const item = fileList.value[selectedFileIndex.value]
  if (!item) return

  const ws = await ensureWaveSurfer()
  if (!ws) return

  isPlaying.value = false
  try {
    if (item.isPcm) {
      await loadPcmFile(item.file)
      return
    }
    releasePlaybackUrl()
    playbackUrl = URL.createObjectURL(item.file)
    await ws.load(playbackUrl)
  } catch (err) {
    console.error('Failed to load audio:', err)
  }
}

const togglePlayback = () => {
  const ws = wavesurfer.value
  if (!ws) return
  if (ws.getDuration() > 0) {
    void ws.playPause()
    return
  }
  ws.once('ready', () => {
    void ws.play()
  })
}

const initRecordWavesurfer = () => {
  if (recordWavesurfer.value) {
    recordWavesurfer.value.destroy()
    recordWavesurfer.value = null
    recordPlugin.value = null
  }

  if (!recordWaveformRef.value) return

  recordPlugin.value = RecordPlugin.create({
    scrollingWaveform: true,
    renderRecordedAudio: false
  })

  recordWavesurfer.value = WaveSurfer.create({
    container: recordWaveformRef.value,
    waveColor: '#ef4444',
    progressColor: '#b91c1c',
    cursorColor: '#991b1b',
    barWidth: 2,
    barGap: 3,
    barRadius: 2,
    height: 90,
    plugins: [recordPlugin.value]
  })

  recordPlugin.value.on('record-end', (blob: Blob) => {
    recordingBlob.value = blob
    hasRecording.value = true
    isRecording.value = false
  })
}

onMounted(() => {
  initWaveSurfer()
  initRecordWavesurfer()
})

onUnmounted(() => {
  wavesurfer.value?.destroy()
  recordWavesurfer.value?.destroy()
})

// Tab Switch Watcher: re-init WaveSurfer instances
watch(activeTab, async (newTab) => {
  await nextTick()
  if (newTab === 'converter') {
    if (selectedFile.value) {
      await loadSelectedAudio()
    }
  } else if (newTab === 'recorder') {
    initRecordWavesurfer()
  }
})

// PCM parameter re-trigger watcher
watch([() => pcmConfig.value.sampleRate, () => pcmConfig.value.bitDepth, () => pcmConfig.value.channels], () => {
  if (selectedFile.value && isPcmFile.value) {
    loadSelectedAudio()
  }
})

// -- File Handling Methods --
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return

  const files = Array.from(target.files)
  const remainingSlots = 5 - fileList.value.length
  const filesToAdd = files.slice(0, remainingSlots)

  filesToAdd.forEach(file => {
    handleFile(file)
  })

  target.value = ''
}

const detectSampleRate = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer
        if (buffer && buffer.byteLength >= 28) {
          const view = new DataView(buffer)
          const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3))
          const wave = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11))
          if (riff === 'RIFF' && wave === 'WAVE') {
            const sr = view.getUint32(24, true)
            if (sr > 0 && sr <= 192000) {
              return resolve(sr)
            }
          }
        }
      } catch (err) {
        console.error('Error reading WAV header:', err)
      }

      // Fallback: Web Audio API decode
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioCtx.decodeAudioData(reader.result as ArrayBuffer).then((decoded) => {
          const sr = decoded.sampleRate
          audioCtx.close()
          resolve(sr)
        }).catch(() => {
          audioCtx.close()
          resolve(44100)
        })
      } catch {
        resolve(44100)
      }
    }
    reader.onerror = () => resolve(44100)
    reader.readAsArrayBuffer(file)
  })
}

const handleFile = async (file: File) => {
  const name = file.name
  const format = name.split('.').pop()?.toUpperCase() || 'UNKNOWN'
  const isPcm = format === 'PCM' || format === 'RAW'

  userPickedTargetSampleRate.value = false

  let sampleRate = isPcm ? parseInt(pcmConfig.value.sampleRate) : 44100

  const item: AudioFileItem = {
    id: Math.random().toString(36).substr(2, 9),
    file,
    name,
    format,
    sampleRate,
    isPcm
  }

  fileList.value.push(item)
  const index = fileList.value.length - 1

  if (fileList.value.length === 1) {
    selectFile(0)
  }

  if (!isPcm) {
    item.sampleRate = await detectSampleRate(file)
    if (!userPickedTargetSampleRate.value && selectedFileIndex.value === index) {
      exportSettings.value.targetSampleRate = item.sampleRate.toString()
    }
  }
}

const selectFile = async (index: number) => {
  selectedFileIndex.value = index
  const item = fileList.value[index]
  if (!item) return

  userPickedTargetSampleRate.value = false

  if (!item.isPcm) {
    exportSettings.value.targetSampleRate = item.sampleRate.toString()
  }

  await loadSelectedAudio()
}

const removeFile = (index: number) => {
  fileList.value.splice(index, 1)
  if (fileList.value.length === 0) {
    wavesurfer.value?.destroy()
    wavesurfer.value = null
    isPlaying.value = false
    releasePlaybackUrl()
    selectedFileIndex.value = 0
  } else if (selectedFileIndex.value >= fileList.value.length) {
    selectFile(fileList.value.length - 1)
  } else {
    selectFile(selectedFileIndex.value)
  }
}

const loadPcmFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const sr = parseInt(pcmConfig.value.sampleRate)
  const bits = parseInt(pcmConfig.value.bitDepth)
  const chan = parseInt(pcmConfig.value.channels)

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: sr
  })

  let floatData: Float32Array

  if (bits === 16) {
    const int16Data = new Int16Array(arrayBuffer)
    floatData = new Float32Array(int16Data.length)
    for (let i = 0; i < int16Data.length; i++) {
      floatData[i] = (int16Data[i] ?? 0) / 32768
    }
  } else {
    floatData = new Float32Array(arrayBuffer)
  }

  const audioBuffer = audioContext.createBuffer(chan, floatData.length / chan, sr)
  for (let c = 0; c < chan; c++) {
    const channelData = audioBuffer.getChannelData(c)
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = floatData[i * chan + c] ?? 0
    }
  }

  const wavBlob = audioBufferToWavBlob(audioBuffer)
  releasePlaybackUrl()
  playbackUrl = URL.createObjectURL(wavBlob)
  if (!wavesurfer.value) return
  await wavesurfer.value.load(playbackUrl)
}

const audioBufferToWavBlob = (buffer: AudioBuffer) => {
  const numOfChan = buffer.numberOfChannels
  const length = buffer.length * numOfChan * 2 + 44
  const outBuffer = new ArrayBuffer(length)
  const view = new DataView(outBuffer)
  const channelsData = []
  let pos = 0

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(view, pos, 'RIFF'); pos += 4
  view.setUint32(pos, length - 8, true); pos += 4
  writeString(view, pos, 'WAVE'); pos += 4
  writeString(view, pos, 'fmt '); pos += 4
  view.setUint32(pos, 16, true); pos += 4
  view.setUint16(pos, 1, true); pos += 2
  view.setUint16(pos, numOfChan, true); pos += 2
  view.setUint32(pos, buffer.sampleRate, true); pos += 4
  view.setUint32(pos, buffer.sampleRate * numOfChan * 2, true); pos += 4
  view.setUint16(pos, numOfChan * 2, true); pos += 2
  view.setUint16(pos, 16, true); pos += 2
  writeString(view, pos, 'data'); pos += 4
  view.setUint32(pos, length - pos - 4, true); pos += 4

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channelsData.push(buffer.getChannelData(i))
  }

  let offset = 0
  while (pos < length) {
    for (let i = 0; i < numOfChan; i++) {
      const currentChanData = channelsData[i]
      if (currentChanData) {
        let sample = Math.max(-1, Math.min(1, currentChanData[offset] || 0))
        sample = (sample < 0 ? sample * 0x8000 : sample * 0x7FFF)
        view.setInt16(pos, sample, true)
        pos += 2
      } else {
        view.setInt16(pos, 0, true)
        pos += 2
      }
    }
    offset++
  }
  return new Blob([outBuffer], { type: 'audio/wav' })
}

// -- Conversion Methods --
const triggerConversion = async () => {
  if (fileList.value.length === 0) return
  if (isConverting.value) return

  isConverting.value = true
  conversionProgress.value = 0

  try {
    conversionStatus.value = t('statusLoading')
    const ffmpeg = await loadFFmpeg()

    for (let i = 0; i < fileList.value.length; i++) {
      const item = fileList.value[i]
      if (!item) continue
      conversionStatus.value = `${t('statusEncoding')} (${i + 1}/${fileList.value.length}: ${item.name})`
      conversionProgress.value = 0

      const srcExt = item.name.split('.').pop()?.toLowerCase() || 'wav'
      const inputFileName = `input_${i}.${srcExt}`

      const fileData = await fetchFile(item.file)
      await ffmpeg.writeFile(inputFileName, fileData)

      const targetFormat = exportSettings.value.targetFormat?.value || 'wav'
      const targetSampleRate = String(exportSettings.value.targetSampleRate || '44100')

      const outputExt = targetFormat === 'opus' ? 'ogg' : targetFormat
      const outputFileName = `output_${i}.${outputExt}`

      const args: string[] = []

      if (item.isPcm) {
        const srcSR = pcmConfig.value.sampleRate
        const srcCh = pcmConfig.value.channels
        const srcBits = pcmConfig.value.bitDepth
        const pcmCodec = srcBits === '16' ? 's16le' : 'f32le'

        args.push('-f', pcmCodec)
        args.push('-ar', srcSR)
        args.push('-ac', srcCh)
      }

      args.push('-i', inputFileName)

      switch (targetFormat) {
        case 'mp3':
          args.push('-af', `aresample=${targetSampleRate}`)
          args.push('-c:a', 'libmp3lame')
          args.push('-ar', targetSampleRate)
          args.push('-b:a', '192k')
          break
        case 'wav':
          args.push('-af', `aresample=${targetSampleRate}`)
          args.push('-c:a', 'pcm_s16le')
          args.push('-ar', targetSampleRate)
          break
        case 'opus':
          args.push('-af', `aresample=${targetSampleRate}`)
          args.push('-c:a', 'libopus')
          args.push('-ar', targetSampleRate)
          args.push('-b:a', '64k')
          break
        case 'pcm':
          args.push('-af', `aresample=${targetSampleRate}`)
          args.push('-ac', '1')
          args.push('-c:a', 'pcm_s16le')
          args.push('-ar', targetSampleRate)
          args.push('-f', 's16le')
          break
      }

      args.push('-y', outputFileName)

      await ffmpeg.exec(args)

      const outputData = await ffmpeg.readFile(outputFileName)

      const mimeMap: Record<string, string> = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        opus: 'audio/ogg',
        ogg: 'audio/ogg',
        pcm: 'application/octet-stream'
      }
      const mimeType = mimeMap[targetFormat] || 'application/octet-stream'

      let blobData: Uint8Array
      if (typeof outputData === 'string') {
        blobData = new TextEncoder().encode(outputData)
      } else {
        blobData = new Uint8Array(outputData.buffer)
      }

      const blob = new Blob([blobData as any], { type: mimeType })
      const url = URL.createObjectURL(blob)

      const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name
      const a = document.createElement('a')
      a.href = url
      a.download = `${baseName}_converted.${outputExt}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      await ffmpeg.deleteFile(inputFileName)
      await ffmpeg.deleteFile(outputFileName)
    }

    conversionStatus.value = t('statusSuccess')
    conversionProgress.value = 100
  } catch (err: any) {
    console.error('Conversion failed:', err)
    conversionStatus.value = `${t('statusFailed')}: ${err.message}`
  } finally {
    setTimeout(() => {
      isConverting.value = false
      conversionStatus.value = ''
      conversionProgress.value = 0
    }, 2500)
  }
}

// -- Recorder Methods --
const startRecording = async () => {
  try {
    if (!recordPlugin.value) {
      await nextTick()
      initRecordWavesurfer()
    }

    if (!recordPlugin.value) {
      console.error('RecordPlugin failed to initialize')
      return
    }

    if (recordPlugin.value.isRecording()) return

    isRecording.value = true
    await nextTick()

    await recordPlugin.value.startRecording()
  } catch (err) {
    isRecording.value = false
    console.error('Error starting recording:', err)
  }
}

const stopRecording = () => {
  if (recordPlugin.value && isRecording.value) {
    recordPlugin.value.stopRecording()
    isRecording.value = false
  }
}

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

const previewRecording = () => {
  if (!recordingBlob.value) return

  const file = new File([recordingBlob.value], 'recording.wav', { type: 'audio/wav' })

  fileList.value = []
  const item: AudioFileItem = {
    id: Math.random().toString(36).substr(2, 9),
    file,
    name: 'recording.wav',
    format: 'WAV',
    sampleRate: 16000,
    isPcm: false
  }
  fileList.value.push(item)
  selectedFileIndex.value = 0

  activeTab.value = 'converter'
}

const discardRecording = () => {
  hasRecording.value = false
  recordingBlob.value = null
  recordExportSettings.value = {
    targetFormat: targetFormatOptions[1],
    targetSampleRate: '16000'
  }
}

const downloadRecording = async () => {
  if (!recordingBlob.value) return

  isConverting.value = true
  conversionStatus.value = t('statusPreparing')
  conversionProgress.value = 0

  try {
    const targetFormat = recordExportSettings.value.targetFormat?.value || 'wav'
    const targetSR = parseInt(recordExportSettings.value.targetSampleRate || '16000')

    let outputBlob: Blob
    let outputExt: string
    let downloadName: string

    if (targetFormat === 'wav' || targetFormat === 'pcm') {
      conversionStatus.value = t('statusResampling')

      const arrayBuffer = await recordingBlob.value.arrayBuffer()
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const decoded = await audioCtx.decodeAudioData(arrayBuffer)
      audioCtx.close()

      let finalBuffer: AudioBuffer
      if (decoded.sampleRate !== targetSR) {
        const offlineCtx = new OfflineAudioContext(1, Math.ceil(decoded.duration * targetSR), targetSR)
        const source = offlineCtx.createBufferSource()
        source.buffer = decoded
        source.connect(offlineCtx.destination)
        source.start(0)
        finalBuffer = await offlineCtx.startRendering()
      } else {
        finalBuffer = decoded
      }

      if (targetFormat === 'pcm') {
        const channelData = finalBuffer.getChannelData(0)
        const int16 = new Int16Array(channelData.length)
        for (let i = 0; i < channelData.length; i++) {
          const s = Math.max(-1, Math.min(1, channelData[i] || 0))
          int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
        }
        outputBlob = new Blob([int16.buffer], { type: 'application/octet-stream' })
        outputExt = 'pcm'
      } else {
        outputBlob = audioBufferToWavBlob(finalBuffer)
        outputExt = 'wav'
      }
      downloadName = `recording_${targetSR}Hz.${outputExt}`
    } else {
      conversionStatus.value = t('statusLoading')
      const ffmpeg = await loadFFmpeg()
      const inputName = 'source.wav'
      outputExt = targetFormat === 'opus' ? 'ogg' : targetFormat
      const outputName = `export.${outputExt}`

      await ffmpeg.writeFile(inputName, await fetchFile(recordingBlob.value))

      const args: string[] = ['-i', inputName]
      if (targetFormat === 'mp3') {
        args.push('-c:a', 'libmp3lame', '-ar', targetSR.toString(), '-b:a', '192k')
      } else {
        args.push('-c:a', 'libopus', '-ar', targetSR.toString(), '-b:a', '64k')
      }
      args.push('-y', outputName)

      conversionStatus.value = t('statusEncoding')
      await ffmpeg.exec(args)

      const outputData = await ffmpeg.readFile(outputName)
      const mimeType = targetFormat === 'mp3' ? 'audio/mpeg' : 'audio/ogg'
      let blobData: Uint8Array
      if (typeof outputData === 'string') {
        blobData = new TextEncoder().encode(outputData)
      } else {
        blobData = new Uint8Array(outputData.buffer)
      }
      outputBlob = new Blob([blobData as any], { type: mimeType })
      downloadName = `recording_${targetSR}Hz.${outputExt}`

      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)
    }

    const url = URL.createObjectURL(outputBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = downloadName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    conversionStatus.value = t('statusSuccess')
    conversionProgress.value = 100
  } catch (err: any) {
    console.error('Export failed:', err)
    conversionStatus.value = `${t('statusFailed')}: ${err.message}`
  } finally {
    setTimeout(() => {
      isConverting.value = false
      conversionStatus.value = ''
      conversionProgress.value = 0
    }, 2000)
  }
}

// -- Computed UI Data from Translations --
const featureCards = computed(() => [
  { icon: 'i-heroicons-cpu-chip', title: t('feat1Title'), desc: t('feat1Desc') },
  { icon: 'i-heroicons-adjustments-horizontal', title: t('feat2Title'), desc: t('feat2Desc') },
  { icon: 'i-heroicons-sparkles', title: t('feat3Title'), desc: t('feat3Desc') },
  { icon: 'i-heroicons-shield-check', title: t('feat4Title'), desc: t('feat4Desc') },
  { icon: 'i-heroicons-signal', title: t('feat5Title'), desc: t('feat5Desc') },
  { icon: 'i-heroicons-bolt', title: t('feat6Title'), desc: t('feat6Desc') }
])

const testimonials = computed(() => [
  { quote: t('testi1Quote'), name: t('testi1Name'), role: t('testi1Role'), avatar: 'https://i.pravatar.cc/150?u=alex' },
  { quote: t('testi2Quote'), name: t('testi2Name'), role: t('testi2Role'), avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { quote: t('testi3Quote'), name: t('testi3Name'), role: t('testi3Role'), avatar: 'https://i.pravatar.cc/150?u=chen' }
])

const useCases = computed(() => [
  t('useCaseVoip'),
  t('useCasePodcasts'),
  t('useCaseWebrtc'),
  t('useCaseGameAudio'),
  t('useCaseAiTraining'),
  t('useCaseEmbedded')
])

const guideSteps = computed(() => [
  { t: t('step1Title'), d: t('step1Desc') },
  { t: t('step2Title'), d: t('step2Desc') },
  { t: t('step3Title'), d: t('step3Desc') }
])

const faqItems = computed(() => [
  {
    label: t('faq1Question'),
    content: t('faq1Answer')
  },
  {
    label: t('faq2Question'),
    content: t('faq2Answer')
  },
  {
    label: t('faq3Question'),
    content: t('faq3Answer')
  },
  {
    label: t('faq4Question'),
    content: t('faq4Answer')
  },
  {
    label: t('faq5Question'),
    content: t('faq5Answer')
  },
  {
    label: t('faq6Question'),
    content: t('faq6Answer')
  }
])
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <!-- 1. Navigation -->
    <header class="h-16 flex items-center glass sticky top-0 z-[100] border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
      <UContainer class="flex items-center justify-between">
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2 cursor-pointer group">
          <img src="/logo.svg" :alt="`${t('brandName')} Logo`" class="w-8 h-8" />
          <span class="text-base font-bold tracking-tight text-slate-900">{{ t('brandName') }}</span>
        </NuxtLink>

        <div class="flex items-center gap-6">
          <nav class="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-500 uppercase tracking-wider">
            <a href="#audio-toolkit" @click="activeTab = 'converter'" class="hover:text-blue-600 transition-colors">{{ t('navConverter') }}</a>
            <a href="#audio-toolkit" @click="activeTab = 'recorder'" class="hover:text-blue-600 transition-colors">{{ t('navRecorder') }}</a>
            <NuxtLink :to="localePath('/blog')" class="hover:text-blue-600 transition-colors">{{ t('navBlog') }}</NuxtLink>
          </nav>

          <!-- Language Selector -->
          <div class="flex items-center">
            <USelect
              v-model="selectedLanguage"
              :items="languageOptions"
              color="neutral"
              size="sm"
              icon="i-heroicons-globe-alt"
              class="w-36 rounded-xl font-medium text-xs"
              @update:model-value="onLanguageChange"
            />
          </div>
        </div>
      </UContainer>
    </header>

    <main class="bg-white">
      <!-- 2. Hero Section -->
      <section class="py-20 text-center bg-white relative">
        <UContainer>
          <UBadge color="primary" variant="subtle" class="mb-6 rounded-full px-4 py-1 font-semibold text-[11px] tracking-wider uppercase">
            {{ t('heroBadge') }}
          </UBadge>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
            {{ t('heroTitlePart1') }} <span class="tech-gradient-text">{{ t('heroTitleGradient') }}</span><br /> 
            {{ t('heroTitlePart2') }}
          </h1>
          <p class="text-lg text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed">
            {{ t('heroSubtitle') }}
            <span class="text-slate-900 font-medium">
              {{ t('heroPrivacyPrefix') }} <span class="text-blue-600 underline decoration-2 underline-offset-4">{{ t('heroPrivacyHighlight') }}</span>.
            </span>
          </p>
        </UContainer>
      </section>

      <!-- 3. Audio Toolkit (Converter & Recorder) -->
      <section id="audio-toolkit" class="max-w-[1440px] mx-auto px-6 mb-32 bg-white scroll-mt-24">
        <UCard class="tech-card overflow-hidden" :ui="{ body: 'p-0' }">
          <UTabs
            :items="tabItems"
            v-model="activeTab"
            class="w-full h-full flex flex-col"
            :ui="{ list: 'bg-transparent border-b border-slate-200/50 rounded-none p-0 shrink-0', indicator: 'bg-slate-100', trigger: 'py-4 text-base font-bold data-[state=active]:text-black', content: 'flex-1 overflow-hidden' }"
          >
            <template #content="{ item }">
              <!-- Tab 1: Converter -->
              <div v-if="item.value === 'converter'" class="p-8 md:p-16 animate-in fade-in duration-500 h-full overflow-y-auto">
                <!-- Dropzone -->
                <div 
                  v-if="!isFileUploaded"
                  class="border border-dashed border-slate-200 rounded-xl p-12 md:p-20 text-center hover:border-blue-400 hover:bg-white transition-all cursor-pointer group h-[520px] flex flex-col justify-center"
                  @click="fileInput?.click()"
                >
                  <input type="file" ref="fileInput" accept=".wav,.pcm,.raw,.opus,.ogg,.mp3" multiple class="hidden" @change="handleFileSelect" />
                  <div class="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <UIcon name="i-heroicons-cloud-arrow-up" class="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <h3 class="text-xl font-bold mb-2 text-slate-900">{{ t('dropzoneTitle') }}</h3>
                  <p class="text-slate-400 text-sm font-medium mb-2">{{ t('dropzoneSubtitle') }}</p>
                  <p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{{ t('dropzonePrivacy') }}</p>
                </div>

                <!-- Active Tool Area -->
                <div v-else class="space-y-12">
                  <!-- File List -->
                  <div class="space-y-3 pb-8 border-b border-stone-100">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-sm font-black uppercase tracking-widest text-stone-400">
                        {{ t('selectedFiles') }} ({{ fileList.length }}/5)
                      </h4>
                      <UButton 
                        v-if="fileList.length < 5" 
                        icon="i-heroicons-plus" 
                        :label="t('addMore')" 
                        size="xs" 
                        variant="soft" 
                        color="neutral" 
                        @click="fileInput?.click()" 
                      />
                      <input type="file" ref="fileInput" accept=".wav,.pcm,.raw,.opus,.ogg,.mp3" multiple class="hidden" @change="handleFileSelect" />
                    </div>
                    <div class="max-h-48 overflow-y-auto space-y-2 pr-2">
                      <div 
                        v-for="(it, idx) in fileList" 
                        :key="it.id"
                        class="flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer"
                        :class="idx === selectedFileIndex ? 'border-primary-500 bg-primary-50 shadow-sm' : 'border-stone-100 hover:border-primary-200'"
                        @click="selectFile(idx)"
                      >
                        <div class="flex items-center gap-3">
                          <UIcon name="i-heroicons-musical-note" :class="idx === selectedFileIndex ? 'text-primary-600' : 'text-stone-400'" />
                          <div>
                            <p class="text-sm font-bold text-slate-800 truncate max-w-[280px]">{{ it.name }}</p>
                            <span class="text-[10px] font-black uppercase tracking-widest" :class="idx === selectedFileIndex ? 'text-primary-500' : 'text-stone-400'">
                              {{ it.format }} • {{ it.sampleRate || '16000' }} Hz
                            </span>
                          </div>
                        </div>
                        <UButton icon="i-heroicons-x-mark" color="neutral" variant="ghost" size="sm" @click.stop="removeFile(idx)" />
                      </div>
                    </div>
                  </div>

                  <!-- WaveSurfer Container -->
                  <div class="bg-white/50 rounded-2xl h-40 flex items-center justify-center px-10 relative border border-slate-200/50">
                    <div ref="waveformRef" class="w-full"></div>
                    <UButton 
                      v-if="isFileUploaded"
                      :icon="isPlaying ? 'i-heroicons-pause-solid' : 'i-heroicons-play-solid'" 
                      color="primary" 
                      size="xl" 
                      class="absolute shadow-xl rounded-full z-10" 
                      @click="togglePlayback" 
                    />
                  </div>

                  <!-- Controls -->
                  <div class="grid md:grid-cols-2 gap-12">
                    <div :class="{ 'opacity-100': isPcmFile, 'opacity-40 grayscale pointer-events-none': !isPcmFile }">
                      <h5 class="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center gap-2">
                        <UIcon name="i-heroicons-adjustments-vertical" /> {{ t('pcmInputParams') }}
                      </h5>
                      <div class="flex flex-wrap items-center gap-4">
                        <USelect v-model="pcmConfig.sampleRate" :items="sampleRateOptions" color="neutral" size="lg" class="rounded-xl min-w-[120px]" :disabled="!isPcmFile" />
                        <USelect v-model="pcmConfig.bitDepth" :items="[{label:'16-bit',value:'16'}]" color="neutral" size="lg" class="rounded-xl min-w-[100px]" :disabled="!isPcmFile" />
                        <USelect v-model="pcmConfig.channels" :items="[{label: t('mono'), value:'1'}]" color="neutral" size="lg" class="rounded-xl min-w-[100px]" :disabled="!isPcmFile" />
                      </div>
                      <p v-if="isPcmFile" class="text-xs text-blue-600 font-medium mt-2">{{ t('pcmParamHint') }}</p>
                    </div>

                    <div>
                      <h5 class="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center gap-2">
                        <UIcon name="i-heroicons-arrow-right-circle" /> {{ t('conversionTarget') }}
                      </h5>
                      <div class="flex flex-wrap items-center gap-4">
                        <USelectMenu v-model="exportSettings.targetFormat" :items="targetFormatOptions" color="primary" size="lg" class="rounded-xl min-w-[180px]" />
                        <USelect v-model="exportSettings.targetSampleRate" :items="converterSampleRateOptions" color="primary" size="lg" class="rounded-xl min-w-[120px]" @update:model-value="onTargetSampleRateChange" />
                      </div>
                    </div>
                  </div>

                  <!-- Conversion Button & Progress -->
                  <div class="space-y-3">
                    <UButton
                      :label="isConverting ? conversionStatus : t('convertBtn')"
                      color="primary"
                      :icon="isConverting ? 'i-heroicons-arrow-path' : undefined"
                      :loading="isConverting"
                      :disabled="isConverting"
                      size="xl"
                      block
                      class="py-5 text-lg font-black rounded-2xl shadow-2xl transition-all bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white focus:ring-blue-500 shadow-blue-600/20"
                      @click="triggerConversion"
                    />
                    <p class="text-xs text-slate-400 text-center font-medium mt-2">{{ t('convertHint') }}</p>
                    <!-- Progress Bar -->
                    <div v-if="isConverting" class="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        class="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                        :style="{ width: `${conversionProgress}%` }"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 2: Mic Recording -->
              <div v-else-if="item.value === 'recorder'" class="p-8 md:p-16 text-center animate-in fade-in duration-500 flex flex-col items-center justify-center overflow-y-auto">
                <div class="mb-10 h-32 flex items-center justify-center relative w-full">
                  <div ref="recordWaveformRef" class="w-full max-w-2xl h-full" :class="isRecording ? 'opacity-100' : 'opacity-0 pointer-events-none'"></div>
                  <div v-if="!isRecording && !hasRecording" class="absolute inset-0 flex items-center justify-center text-slate-300 italic">{{ t('recReady') }}</div>
                </div>

                <div class="relative inline-block mb-10">
                  <div v-if="isRecording" class="absolute -inset-10 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                  <UButton :color="isRecording ? 'error' : 'primary'" class="w-20 h-20 rounded-full shadow-2xl flex items-center justify-center relative z-10 !bg-blue-600 hover:!bg-blue-700" @click="toggleRecording">
                    <UIcon :name="isRecording ? 'i-heroicons-stop-solid' : 'i-heroicons-microphone-solid'" class="w-8 h-8 text-white" />
                  </UButton>
                </div>
                <h3 class="text-3xl font-black mb-3 text-slate-900">{{ isRecording ? t('recLive') : t('recTitle') }}</h3>
                <p class="text-stone-400 font-medium max-w-lg mx-auto mb-10">{{ t('recSubtitle') }}</p>

                <div v-if="hasRecording && !isRecording" class="max-w-3xl mx-auto mb-10 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 animate-in slide-in-from-bottom-4">
                  <div class="flex flex-wrap items-center justify-center gap-8">
                    <div class="flex items-center gap-3">
                      <span class="text-[10px] font-black uppercase text-stone-400 whitespace-nowrap">{{ t('formatLabel') }}</span>
                      <USelectMenu v-model="recordExportSettings.targetFormat" :items="targetFormatOptions" color="primary" size="md" class="rounded-xl min-w-[150px]" />
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-[10px] font-black uppercase text-stone-400 whitespace-nowrap">{{ t('sampleRateLabel') }}</span>
                      <USelect v-model="recordExportSettings.targetSampleRate" :items="recorderSampleRateOptions" color="primary" size="md" class="rounded-xl min-w-[120px]" />
                    </div>
                  </div>
                </div>

                <div v-if="hasRecording && !isRecording" class="flex flex-wrap items-center justify-center gap-4 animate-in slide-in-from-bottom-2">
                  <UButton 
                    :label="t('recPreview')" 
                    color="neutral" 
                    variant="outline" 
                    icon="i-heroicons-play-solid" 
                    class="rounded-2xl px-8 py-4 text-base font-bold"
                    @click="previewRecording" 
                  />
                  <UButton 
                    :label="isConverting ? conversionStatus : t('recDownload')" 
                    color="primary" 
                    variant="solid" 
                    icon="i-heroicons-arrow-down-tray" 
                    class="rounded-2xl px-8 py-4 text-base font-bold shadow-xl !bg-blue-600 hover:!bg-blue-700 text-white"
                    :loading="isConverting"
                    :disabled="isConverting"
                    @click="downloadRecording" 
                  />
                  <UButton 
                    :label="t('recDiscard')" 
                    color="error" 
                    variant="outline" 
                    icon="i-heroicons-trash" 
                    class="rounded-2xl px-8 py-4 text-base font-bold"
                    @click="discardRecording" 
                  />
                </div>
              </div>
            </template>
          </UTabs>
        </UCard>
      </section>

      <!-- 4. Features Section (3x2 Grid) -->
      <section class="py-28 bg-white border-t border-slate-100">
        <UContainer class="max-w-[1400px]">
          <div class="text-center mb-20 text-slate-900">
            <span class="text-blue-600 font-bold text-[11px] tracking-[0.3em] uppercase mb-4 block">{{ t('featSectionBadge') }}</span>
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('featSectionTitle') }}</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div v-for="(feat, i) in featureCards" :key="i" class="tech-card p-8 rounded-xl group hover:shadow-lg transition-all">
              <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all mb-6">
                <UIcon :name="feat.icon" class="w-5 h-5" />
              </div>
              <h4 class="text-lg font-bold mb-3 text-slate-900">{{ feat.title }}</h4>
              <p class="text-sm leading-relaxed text-slate-500">{{ feat.desc }}</p>
            </div>
          </div>

          <!-- Bottom Use Case Icons -->
          <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-12 border-t border-stone-200/50 opacity-60">
            <div v-for="tag in useCases" :key="tag" class="flex items-center gap-2 font-black text-[11px] tracking-widest uppercase">
              <UIcon name="i-heroicons-tag-solid" class="w-4 h-4 text-blue-600" /> {{ tag }}
            </div>
          </div>
        </UContainer>
      </section>

      <!-- 5. Testimonials -->
      <section class="py-28 bg-slate-50/50 border-t border-slate-100">
        <UContainer class="max-w-[1400px]">
          <div class="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div class="max-w-xl">
              <h2 class="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4">{{ t('testiTitle') }}</h2>
              <p class="text-blue-600 font-bold tracking-widest uppercase text-xs">{{ t('testiBadge') }}</p>
            </div>
            <p class="text-stone-500 font-medium md:text-right max-w-sm">{{ t('testiSubtitle') }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(testi, i) in testimonials" :key="i" class="tech-card p-10 flex flex-col items-center text-center bg-white rounded-2xl">
              <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-10 h-10 text-blue-200 mb-6" />
              <p class="text-slate-600 font-medium leading-relaxed mb-8 italic">"{{ testi.quote }}"</p>
              <UAvatar :src="testi.avatar" size="lg" class="mb-4 border-2 border-white ring-4 ring-slate-100" />
              <h5 class="font-bold text-slate-900 tracking-tight">{{ testi.name }}</h5>
              <span class="text-[11px] font-medium uppercase tracking-widest text-slate-400 mt-1">{{ testi.role }}</span>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- 6. Deep Content & Technical Guide (SEO / Long-tail Keywords / AdSense Quality) -->
      <section class="py-28 bg-white relative border-t border-slate-100">
        <UContainer class="relative z-10 max-w-[1400px] space-y-24">
          <!-- Step-by-Step Workflow & Overview -->
          <div class="grid md:grid-cols-2 gap-16 items-start">
            <div class="space-y-10">
              <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                {{ t('guideTitlePart1') }} <br />
                <span class="tech-gradient-text">{{ t('guideTitleGradient') }}</span>
              </h2>
              <div class="space-y-8">
                <div v-for="(step, i) in guideSteps" :key="i" class="flex gap-6 group">
                  <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h5 class="text-lg font-bold text-slate-900 mb-2">{{ step.t }}</h5>
                    <p class="text-slate-500 leading-relaxed text-sm">{{ step.d }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ Section -->
            <div class="tech-card p-8 md:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 class="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <UIcon name="i-heroicons-question-mark-circle" class="text-blue-600 w-7 h-7" />
                {{ t('faqTitle') }}
              </h3>
              <UAccordion 
                :items="faqItems" 
                :ui="{ 
                  root: 'flex flex-col w-full gap-4'
                }"
              />
            </div>
          </div>

          <!-- Technical Specifications Table (Rich Content for SEO Long-tail Keywords) -->
          <div class="space-y-6 pt-12 border-t border-slate-100">
            <div class="max-w-3xl">
              <h3 class="text-2xl font-bold text-slate-900 mb-3">{{ t('guideOverviewTitle') }}</h3>
              <p class="text-slate-600 leading-relaxed text-sm">{{ t('guideOverviewText') }}</p>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-sm mt-6">
              <table class="w-full text-left text-sm text-slate-600 border-collapse">
                <thead class="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-700 border-b border-slate-200">
                  <tr>
                    <th class="p-4">{{ t('tableFormat') }}</th>
                    <th class="p-4">{{ t('tableType') }}</th>
                    <th class="p-4">{{ t('tableHeader') }}</th>
                    <th class="p-4">{{ t('tableSampleRates') }}</th>
                    <th class="p-4">{{ t('tableUseCases') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="p-4 font-bold text-blue-600">PCM (.pcm / .raw)</td>
                    <td class="p-4">{{ t('tablePcmDesc') }}</td>
                    <td class="p-4 text-slate-400">None (0 bytes)</td>
                    <td class="p-4 font-mono text-xs">8kHz, 16kHz, 44.1kHz, 48kHz</td>
                    <td class="p-4">{{ t('tablePcmUses') }}</td>
                  </tr>
                  <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="p-4 font-bold text-slate-900">WAV (.wav)</td>
                    <td class="p-4">{{ t('tableWavDesc') }}</td>
                    <td class="p-4 text-slate-500">RIFF / fmt (44 bytes)</td>
                    <td class="p-4 font-mono text-xs">44.1kHz, 48kHz, 96kHz</td>
                    <td class="p-4">{{ t('tableWavUses') }}</td>
                  </tr>
                  <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="p-4 font-bold text-slate-900">MP3 (.mp3)</td>
                    <td class="p-4">{{ t('tableMp3Desc') }}</td>
                    <td class="p-4 text-slate-500">ID3 Tag + Sync frames</td>
                    <td class="p-4 font-mono text-xs">32kHz, 44.1kHz, 48kHz</td>
                    <td class="p-4">{{ t('tableMp3Uses') }}</td>
                  </tr>
                  <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="p-4 font-bold text-slate-900">OPUS (.opus / .ogg)</td>
                    <td class="p-4">{{ t('tableOpusDesc') }}</td>
                    <td class="p-4 text-slate-500">Ogg encapsulation</td>
                    <td class="p-4 font-mono text-xs">8kHz, 16kHz, 24kHz, 48kHz</td>
                    <td class="p-4">{{ t('tableOpusUses') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </UContainer>
      </section>
    </main>

    <!-- 7. Footer -->
    <footer class="bg-white py-20 border-t border-slate-100">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          <div class="col-span-1 md:col-span-2 space-y-6">
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
              <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-black italic">W</div>
              <span class="text-xl font-black tracking-tight uppercase">{{ t('brandName') }}</span>
            </NuxtLink>
            <p class="text-stone-500 font-medium max-w-sm leading-relaxed text-sm">
              {{ t('footerTagline') }}
            </p>
          </div>

          <div>
            <h6 class="font-black uppercase tracking-widest text-[11px] mb-6 text-stone-900 border-l-2 border-blue-600 pl-4">
              {{ t('footerCompliance') }}
            </h6>
            <ul class="space-y-3 text-sm font-semibold text-stone-500">
              <li><NuxtLink :to="localePath('/about')" class="hover:text-blue-600 transition-colors">{{ t('footerAbout') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/privacy')" class="hover:text-blue-600 transition-colors">{{ t('footerPrivacy') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/terms')" class="hover:text-blue-600 transition-colors">{{ t('footerTerms') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/contact')" class="hover:text-blue-600 transition-colors">{{ t('footerContact') }}</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h6 class="font-black uppercase tracking-widest text-[11px] mb-6 text-stone-900 border-l-2 border-blue-600 pl-4">
              {{ t('footerResources') }}
            </h6>
            <ul class="space-y-3 text-sm font-semibold text-stone-500">
              <li><NuxtLink :to="localePath('/pcm-player')" class="hover:text-blue-600 transition-colors">{{ t('footerPcmPlayer') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/pcm-to-wav')" class="hover:text-blue-600 transition-colors">{{ t('footerPcmToWav') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/blog')" class="hover:text-blue-600 transition-colors">{{ t('footerBlog') }}</NuxtLink></li>
              <li><a href="#audio-toolkit" class="hover:text-blue-600 transition-colors">{{ t('footerDocs') }}</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 {{ t('brandName') }}. {{ t('footerRights') }}</p>
          <div class="flex items-center gap-6">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              WebAssembly Core Online
            </span>
            <span>AdSense Account: ca-pub-2272817394393914</span>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f8f9fa; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

.u-tabs-active {
  color: #2563eb !important;
}
</style>
