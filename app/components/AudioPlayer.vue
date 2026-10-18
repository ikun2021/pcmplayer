<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'

const waveformRef = ref<HTMLElement | null>(null)
const wavesurfer = ref<WaveSurfer | null>(null)
const recordPlugin = ref<any>(null)
const isPlaying = ref(false)
const isRecording = ref(false)
const recordingTime = ref('00:00')
const currentTime = ref('00:00')
const duration = ref('00:00')
const progress = ref(0)
const fileName = ref('')
const hasFile = ref(false)
const fileSize = ref('0.00 KB')
const fileType = ref('--')
const detectedSampleRate = ref('--')
const detectedChannels = ref('--')
const detectedBitDepth = ref('--')
const rawFile = ref<File | null>(null)
const showAdvanced = ref(false)

// PCM Decoder Settings
const sampleRate = ref('48000')
const bitDepth = ref('16')
const channels = ref('1')
const byteOrder = ref('le')

// Target Conversion Settings
const targetFormat = ref('wav')
const targetSampleRate = ref('16000')
const isConverting = ref(false)

const sampleRateOptions = [
  { label: '8000 Hz', value: '8000' },
  { label: '16000 Hz', value: '16000' },
  { label: '22050 Hz', value: '22050' },
  { label: '24000 Hz', value: '24000' },
  { label: '32000 Hz', value: '32000' },
  { label: '44100 Hz', value: '44100' },
  { label: '48000 Hz', value: '48000' },
  { label: '96000 Hz', value: '96000' }
]

const bitDepthOptions = [
  { label: '8 bit', value: '8' },
  { label: '16 bit', value: '16' },
  { label: '32 bit (Float)', value: '32' }
]

const channelOptions = [
  { label: 'Mono', value: '1' },
  { label: 'Stereo', value: '2' }
]

const byteOrderOptions = [
  { label: 'Little Endian', value: 'le' },
  { label: 'Big Endian', value: 'be' }
]

// Watch for PCM parameter changes to re-decode and save preference
import { watch } from 'vue'
watch([sampleRate, bitDepth, channels, byteOrder], ([sr]) => {
  if (import.meta.client) {
    localStorage.setItem('pcm_sample_rate', sr)
  }
  if (rawFile.value && (fileName.value.toLowerCase().endsWith('.pcm') || fileName.value.toLowerCase().endsWith('.raw'))) {
    loadPcmFile(rawFile.value)
  }
})

onMounted(() => {
  if (import.meta.client) {
    const savedSampleRate = localStorage.getItem('pcm_sample_rate')
    if (savedSampleRate) {
      sampleRate.value = savedSampleRate
    }
  }
  initWavesurfer()
})

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0.00 KB'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const initWavesurfer = () => {
  if (!waveformRef.value) return

  wavesurfer.value = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: '#a5a6ce',
    progressColor: '#5c5da0',
    cursorColor: '#5c5da0',
    height: 350,
    barWidth: 1,
    normalize: true,
  })

  // Initialize Record Plugin
  recordPlugin.value = wavesurfer.value.registerPlugin(RecordPlugin.create({
    scrollingWaveform: true,
    renderRecordedAudio: false,
  }))

  recordPlugin.value.on('record-end', async (blob: Blob) => {
    const arrayBuffer = await blob.arrayBuffer()
    const audioCtx = new AudioContext()
    const originalBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    
    // Resample to currently selected Sample Rate
    const targetSR = parseInt(sampleRate.value)
    const resampledBuffer = await resampleAudioBuffer(originalBuffer, targetSR)
    
    // Convert to PCM (16-bit LE)
    const pcmData = audioBufferToPcm(resampledBuffer)
    const pcmBlob = new Blob([pcmData], { type: 'audio/pcm' })
    const pcmFile = new File([pcmBlob], `recording-${targetSR}Hz-${Date.now()}.pcm`, { type: 'audio/pcm' })
    
    // Load the recorded PCM
    handleFile(pcmFile)
  })

  recordPlugin.value.on('record-progress', (time: number) => {
    recordingTime.value = formatTime(Math.floor(time / 1000))
  })

  wavesurfer.value.on('play', () => (isPlaying.value = true))
  wavesurfer.value.on('pause', () => (isPlaying.value = false))
  wavesurfer.value.on('ready', () => {
    const dur = wavesurfer.value?.getDuration() || 0
    duration.value = formatTime(dur)
  })
  wavesurfer.value.on('audioprocess', () => {
    const time = wavesurfer.value?.getCurrentTime() || 0
    const dur = wavesurfer.value?.getDuration() || 1
    currentTime.value = formatTime(time)
    progress.value = (time / dur) * 100
  })
}

const resampleAudioBuffer = async (buffer: AudioBuffer, targetSampleRate: number) => {
  if (buffer.sampleRate === targetSampleRate) return buffer
  
  const offlineCtx = new OfflineAudioContext(
    buffer.numberOfChannels,
    Math.ceil(buffer.duration * targetSampleRate),
    targetSampleRate
  )
  
  const source = offlineCtx.createBufferSource()
  source.buffer = buffer
  source.connect(offlineCtx.destination)
  source.start()
  
  return await offlineCtx.startRendering()
}

const downloadFile = () => {
  if (!rawFile.value) return
  const url = URL.createObjectURL(rawFile.value)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName.value
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const toggleRecording = async () => {
  if (isRecording.value) {
    recordPlugin.value.stopRecording()
    isRecording.value = false
  } else {
    try {
      await recordPlugin.value.startRecording()
      isRecording.value = true
      hasFile.value = true // Show wave area for recording
    } catch (err) {
      console.error('Failed to start recording:', err)
    }
  }
}

const audioBufferToPcm = (buffer: AudioBuffer) => {
  const numOfChan = buffer.numberOfChannels
  const length = buffer.length * numOfChan * 2
  const outBuffer = new ArrayBuffer(length)
  const view = new DataView(outBuffer)
  let offset = 0
  let pos = 0

  while (pos < length) {
    for (let i = 0; i < numOfChan; i++) {
      const channelData = buffer.getChannelData(i)
      let sample = Math.max(-1, Math.min(1, channelData[offset] || 0))
      sample = (sample < 0 ? sample * 0x8000 : sample * 0x7FFF)
      view.setInt16(pos, sample, true)
      pos += 2
    }
    offset++
  }
  return outBuffer
}

const handleFileUpload = (event: Event | DragEvent) => {
  let files: FileList | null = null
  if (event instanceof DragEvent) {
    files = event.dataTransfer?.files || null
  } else {
    files = (event.target as HTMLInputElement).files
  }

  if (files && files[0]) {
    handleFile(files[0])
  }
}

const handleFile = (file: File) => {
  rawFile.value = file
  fileName.value = file.name
  fileSize.value = formatFileSize(file.size)
  fileType.value = file.name.split('.').pop()?.toUpperCase() || '--'
  hasFile.value = true
  
  if (file.name.toLowerCase().endsWith('.pcm') || file.name.toLowerCase().endsWith('.raw')) {
     loadPcmFile(file)
  } else {
     const url = URL.createObjectURL(file)
     wavesurfer.value?.load(url)
     detectedSampleRate.value = '--'
     detectedChannels.value = '--'
     detectedBitDepth.value = '--'
  }
}

const loadPcmFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const sr = parseInt(sampleRate.value)
  const bits = parseInt(bitDepth.value)
  const chan = parseInt(channels.value)
  const isBigEndian = byteOrder.value === 'be'

  detectedSampleRate.value = `${sr} Hz`
  detectedChannels.value = chan === 1 ? '1 (Mono)' : '2 (Stereo)'
  detectedBitDepth.value = `${bits} bit`

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: sr })
  let floatData: Float32Array

  if (bits === 16) {
    const int16Data = new Int16Array(arrayBuffer)
    floatData = new Float32Array(int16Data.length)
    for (let i = 0; i < int16Data.length; i++) {
       if (isBigEndian) {
         const view = new DataView(arrayBuffer, i * 2, 2)
         floatData[i] = view.getInt16(0, false) / 32768
       } else {
         floatData[i] = (int16Data[i] ?? 0) / 32768
       }
    }
  } else if (bits === 8) {
    const uint8Data = new Uint8Array(arrayBuffer)
    floatData = new Float32Array(uint8Data.length)
    for (let i = 0; i < uint8Data.length; i++) {
      floatData[i] = ((uint8Data[i] ?? 128) - 128) / 128
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
  const url = URL.createObjectURL(wavBlob)
  wavesurfer.value?.load(url)
}

const audioBufferToWavBlob = (buffer: AudioBuffer) => {
  const numOfChan = buffer.numberOfChannels
  const length = buffer.length * numOfChan * 2 + 44
  const outBuffer = new ArrayBuffer(length)
  const view = new DataView(outBuffer)
  const channelsData = []
  let offset = 0
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

onUnmounted(() => {
  wavesurfer.value?.destroy()
})

const onProgressChange = (val: number) => {
  if (wavesurfer.value) {
    wavesurfer.value.seekTo(val / 100)
  }
}

const convertAudio = async () => {
  if (!rawFile.value) return
  
  isConverting.value = true
  
  try {
    const formData = new FormData()
    formData.append('file', rawFile.value)
    formData.append('original_channels', channels.value)
    formData.append('original_sample_rate', sampleRate.value)
    formData.append('format', targetFormat.value)
    formData.append('sample_rate', targetSampleRate.value)
    
    const response = await fetch('https://api.onlinetexttospeech.com/api/v1/audio/convert', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }
    
    const blob = await response.blob()
    const extension = targetFormat.value
    const originalName = fileName.value.includes('.') 
      ? fileName.value.substring(0, fileName.value.lastIndexOf('.')) 
      : fileName.value
      
    const newFileName = `${originalName}_${targetSampleRate.value}Hz.${extension}`
    
    // Determine mime type
    let mimeType = 'application/octet-stream'
    if (extension === 'mp3') mimeType = 'audio/mpeg'
    else if (extension === 'wav') mimeType = 'audio/wav'
    else if (extension === 'opus') mimeType = 'audio/opus'

    const newFile = new File([blob], newFileName, { type: mimeType })
    
    // Update local interpretation if it's PCM
    if (extension === 'pcm') {
      sampleRate.value = targetSampleRate.value
      // Usually conversion might keep channels, but we can't be sure without headers.
      // The backend Go code returns X-Converted-Channels header.
      const convertedChannels = response.headers.get('X-Converted-Channels')
      if (convertedChannels) {
        channels.value = convertedChannels
      }
    }
    
    handleFile(newFile)
    
    // Trigger automatic download of the converted file
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = newFileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
  } catch (err: any) {
    console.error('Conversion error:', err)
    alert('Conversion failed: ' + err.message)
  } finally {
    isConverting.value = false
  }
}
</script>

<template>
  <div class="h-full">
    <!-- Main Player Card -->
    <div class="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      <!-- Upload Area (Always Visible) -->
      <div class="bg-gray-50/50 p-4 border-b border-gray-100 flex justify-center">
        <label class="cursor-pointer">
          <input type="file" class="hidden" @change="handleFileUpload" accept=".pcm,.wav,.mp3,.opus,.raw" />
          <UButton 
            color="neutral" 
            variant="solid" 
            size="md" 
            class="px-8 font-bold pointer-events-none"
          >
            <UIcon name="i-heroicons-document-plus" class="w-5 h-5 mr-2" />
            Select or Drag PCM/MP3/WAV/OPUS Files
          </UButton>
        </label>
      </div>

      <!-- Waveform Container -->
      <div 
        class="bg-white p-8 relative min-h-[400px] flex items-center"
        @dragover.prevent
        @drop.prevent="handleFileUpload"
      >
        <div ref="waveformRef" class="w-full"></div>
        <div v-if="!hasFile" class="absolute inset-0 flex items-center justify-end pr-12 text-gray-300 pointer-events-none text-lg">
          No file selected
        </div>
      </div>

      <!-- Metadata Info Row -->
      <div class="px-8 py-4 border-t border-b border-gray-100 flex flex-wrap justify-between text-[13px] text-gray-600 bg-white">
        <div class="flex gap-1"><span class="text-gray-400">File Type:</span> <span class="font-medium uppercase">{{ fileType }}</span></div>
        <div class="flex gap-1"><span class="text-gray-400">Sample Rate:</span> <span class="font-medium">{{ detectedSampleRate }}</span></div>
        <div class="flex gap-1"><span class="text-gray-400">Channels:</span> <span class="font-medium">{{ detectedChannels }}</span></div>
        <div class="flex gap-1"><span class="text-gray-400">Bit Depth:</span> <span class="font-medium">{{ detectedBitDepth }}</span></div>
        <div class="flex gap-1"><span class="text-gray-400">Duration:</span> <span class="font-medium">{{ duration }}</span></div>
        <div class="flex gap-1"><span class="text-gray-400">File Size:</span> <span class="font-medium">{{ fileSize }}</span></div>
      </div>

      <!-- Progress Section -->
      <div class="px-8 py-3 flex items-center gap-4 border-b border-gray-100 bg-white">
        <span class="text-[11px] text-gray-400 w-10">{{ currentTime }}</span>
        <URange v-model="progress" :min="0" :max="100" :disabled="!hasFile" class="flex-1 custom-range" size="xs" @update:model-value="onProgressChange" />
        <span class="text-[11px] text-gray-400 w-10 text-right">{{ duration }}</span>
      </div>

      <!-- Controls Section -->
      <div class="px-8 py-6 flex flex-wrap items-center justify-between gap-6 border-b border-gray-100 bg-white">
        <div class="flex items-center gap-3">
          <UButton 
            @click="wavesurfer?.playPause()"
            color="neutral" 
            variant="solid" 
            size="sm"
            class="px-6 font-bold"
            :disabled="!hasFile || isRecording"
          >
            <UIcon :name="isPlaying ? 'i-heroicons-pause-solid' : 'i-heroicons-play-solid'" class="w-4 h-4 mr-1" />
            Play
          </UButton>
          <UButton 
            @click="wavesurfer?.stop()"
            color="neutral" 
            variant="outline" 
            size="sm"
            class="px-6 font-bold bg-white text-gray-500 border-gray-200"
            :disabled="!hasFile || isRecording"
          >
            <UIcon name="i-heroicons-stop-solid" class="w-4 h-4 mr-1 text-gray-300" />
            Stop
          </UButton>
        </div>

        <div class="flex items-center gap-6">

          <div class="flex items-center gap-2">
            <span class="text-[13px] text-gray-500">Target Format</span>
            <USelect 
              v-model="targetFormat" 
              color="neutral" 
              highlight 
              :items="[
                { label: 'WAV', value: 'wav' },
                { label: 'MP3', value: 'mp3' },
                { label: 'PCM', value: 'pcm' },
                { label: 'OPUS', value: 'opus' }
              ]" 
              size="sm" 
              class="w-24" 
              :disabled="!hasFile || isRecording || isConverting"
            />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[13px] text-gray-500">Target Sample Rate</span>
            <USelect 
              v-model="targetSampleRate" 
              color="neutral" 
              highlight 
              :items="sampleRateOptions" 
              size="sm" 
              class="w-36" 
              :disabled="!hasFile || isRecording || isConverting"
            />
          </div>
          <UButton 
            @click="convertAudio"
            color="neutral" 
            variant="solid" 
            size="sm" 
            class="px-6 font-bold shadow-sm"
            :disabled="!hasFile || isRecording"
            :loading="isConverting"
          >
            Convert Audio
          </UButton>
        </div>
      </div>

      <!-- Recording Section -->
      <div class="px-8 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UButton 
            @click="toggleRecording"
            :color="isRecording ? 'error' : 'neutral'" 
            variant="solid" 
            size="sm"
            class="px-6 font-bold"
          >
            <UIcon :name="isRecording ? 'i-heroicons-stop-circle-solid' : 'i-heroicons-microphone-solid'" class="w-4 h-4 mr-1" />
            {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
          </UButton>

          <UButton 
            @click="downloadFile"
            color="neutral" 
            variant="solid" 
            size="sm" 
            class="px-6 font-bold"
            :disabled="!hasFile || isRecording"
          >
            <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4 mr-1" />
            Download File
          </UButton>
          
          <div v-if="isRecording" class="flex items-center gap-3 text-sm text-red-500 font-medium">
            <div class="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-full">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>REC</span>
            </div>
            <span class="tabular-nums">{{ recordingTime }}</span>
          </div>
        </div>
        
        <div v-if="!isRecording && hasFile && fileName.startsWith('recording-')" class="text-[12px] text-gray-400 italic">
          Recording saved as raw PCM (16-bit LE)
        </div>
      </div>

      <!-- PCM Settings Grid -->
      <div class="px-8 py-8 bg-white space-y-6 border-t border-gray-50">
        <div class="flex items-center justify-between">
           <div class="flex items-center gap-3 flex-1">
            <label class="text-[13px] font-medium text-gray-500 whitespace-nowrap min-w-24">Sample Rate</label>
            <USelect v-model="sampleRate" color="neutral" highlight :items="sampleRateOptions" size="sm" class="max-w-xs w-full" />
          </div>
          <UButton 
            color="neutral" 
            variant="ghost" 
            size="xs" 
            @click="showAdvanced = !showAdvanced"
            class="text-gray-400 hover:text-gray-600"
          >
            {{ showAdvanced ? 'Hide Advanced' : 'Show Advanced' }}
            <UIcon :name="showAdvanced ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="ml-1 w-3 h-3" />
          </UButton>
        </div>

        <div v-if="showAdvanced" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 pt-4 border-t border-gray-50">
          <div class="flex items-center gap-3">
            <label class="text-[13px] font-medium text-gray-500 whitespace-nowrap min-w-24">Bit Depth</label>
            <USelect v-model="bitDepth" :items="bitDepthOptions" color="neutral" highlight size="sm" class="w-full" />
          </div>
          <div class="flex items-center gap-3">
            <label class="text-[13px] font-medium text-gray-500 whitespace-nowrap min-w-24">Channels</label>
            <USelect v-model="channels" :items="channelOptions" color="neutral" highlight size="sm" class="w-full" />
          </div>
          <div class="flex items-center gap-3">
            <label class="text-[13px] font-medium text-gray-500 whitespace-nowrap min-w-24">Byte Order</label>
            <USelect v-model="byteOrder" :items="byteOrderOptions" color="neutral" highlight size="sm" class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-range {
  height: 4px;
}
:deep(.u-range) {
  accent-color: #3b82f6;
}
</style>
