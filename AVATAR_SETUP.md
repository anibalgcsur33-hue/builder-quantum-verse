# 🤖 Avatar 3D Setup Instructions

## 📋 Requisitos Completados

✅ **Componente Avatar3D** - Integrado con three.js y lip sync  
✅ **Endpoints Backend** - `/api/speak` y `/api/visemes`  
✅ **Sistema de Animación** - Bucle de renderizado y control de estado  
✅ **Interfaz de Usuario** - Controles de voz y acciones inmobiliarias  

## 🎯 Pasos Pendientes

### 1. Avatar GLB Model Setup

**Ubicación requerida:** `public/assets/avatar.glb`

**Requisitos del modelo:**
- ✅ Esqueleto Humanoid (Hips/Spine/Head/Arms)
- ✅ Blendshapes faciales con nombres estándar:
  - `viseme_aa` (AA/aah)
  - `viseme_oh` (O/oh) 
  - `viseme_ee` (E/ee)
  - `viseme_uw` (U/oo)
  - `viseme_mbp` (M/mbp)
  - `viseme_l` (L)
  - `viseme_w` (WQ)
  - `viseme_ch` (CH/tCH)
  - `viseme_fv` (FV)

**Herramientas recomendadas:**
- [Ready Player Me](https://readyplayer.me) - Avatares con blendshapes automáticos
- [Blender](https://blender.org) - Para crear/editar blendshapes manualmente
- [Mixamo](https://mixamo.com) - Para animaciones idle (respirar, mirar)

### 2. TTS Integration (Backend)

**Archivo:** `netlify/functions/speak.ts`

**Servicios TTS recomendados:**
- **Coqui TTS** (local): `pip install coqui-tts`
- **Piper TTS** (local): Más ligero, buena calidad
- **OpenAI TTS** (API): `text-to-speech-1` model
- **Azure Speech** (API): Voces neurales en español
- **Google Text-to-Speech** (API): WaveNet voices

**Ejemplo integración Coqui:**
```python
from TTS.api import TTS
tts = TTS("tts_models/es/css10/vits")
tts.tts_to_file(text="Hola, soy tu asistente", file_path="output.wav")
```

### 3. Lip Sync Integration (Backend)

**Archivo:** `netlify/functions/visemes.ts`

**Rhubarb Lip-Sync Setup:**
```bash
# Instalar Rhubarb
wget https://github.com/DanielSWolf/rhubarb-lip-sync/releases/download/v1.13.0/rhubarb-lip-sync-1.13.0-linux.zip
unzip rhubarb-lip-sync-1.13.0-linux.zip

# Uso básico
./rhubarb -f json input.wav > visemes.json
```

**Formato de salida esperado:**
```json
[
  {"time": 0.0, "phoneme": "X"},
  {"time": 0.12, "phoneme": "AA"},
  {"time": 0.25, "phoneme": "O"}
]
```

### 4. Usar el Avatar en BlueEyeHomes

**Integración en componentes existentes:**

```tsx
import Avatar3D from '../components/Avatar3D';

// En la página donde quieras el avatar
<Avatar3D 
  className="w-full max-w-2xl mx-auto"
  onInteraction={(action, data) => {
    switch(action) {
      case 'search-properties':
        // Redirigir a búsqueda
        break;
      case 'schedule-visit':
        // Abrir calendario
        break;
      case 'legal-info':
        // Mostrar info legal
        break;
    }
  }}
/>
```

## 🚀 Testing & Development

### Testing Local

1. **Modelo placeholder:** Coloca cualquier GLB en `public/assets/avatar.glb`
2. **TTS mock:** Los endpoints devuelven datos simulados
3. **Test button:** Usa "Test Speech" para probar el sistema

### Testing Producción

1. **GLB real:** Modelo con blendshapes correctos
2. **TTS real:** Integrar Coqui/Piper/OpenAI
3. **Rhubarb:** Procesamiento real de lip sync

## 📱 Características Implementadas

### ✅ Sistema 3D Completo
- Carga de modelos GLB/GLTF
- Iluminación profesional (Hemisphere + Directional)
- Sombras y efectos visuales
- Detección automática de SkinnedMesh

### ✅ Lip Sync Avanzado
- Mapeo automático de blendshapes
- Aplicación de visemas con decay natural
- Sincronización precisa con audio
- Fallback para blendshapes faltantes

### ✅ Animaciones Vivas
- Mirada sutil (rotación de cabeza)
- Sistema de mixer para animaciones idle
- Estados emocionales (neutral, speaking, thinking)
- Transiciones suaves

### ✅ Interacción Inmobiliaria
- Botón micrófono para speech-to-text
- Acciones específicas del sector
- Estados visuales de escucha/habla
- Control de volumen

### ✅ UX Profesional
- Indicadores de estado en tiempo real
- Controles intuitivos
- Carga progresiva
- Responsive design

## 🔧 Configuración Recomendada

### Desarrollo
- Usar GLB básico para testing
- Mock endpoints habilitados
- Debug logs activos

### Producción
- Avatar profesional de Ready Player Me
- TTS service (OpenAI/Azure para mejor calidad)
- Rhubarb local para lip sync
- Monitoreo de performance

## 📞 Próximos Pasos

1. **Subir avatar.glb** a `public/assets/`
2. **Configurar TTS service** en `speak.ts`
3. **Integrar Rhubarb** en `visemes.ts`
4. **Testing completo** con audio real
5. **Deployment** y optimización

¡El sistema está listo para recibir el modelo 3D y los servicios de voz! 🎉
