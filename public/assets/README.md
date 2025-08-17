# Avatar BlueEye FBX - Perfecto para VR y Propiedades Inmobiliarias

## Pasos para crear y añadir el avatar:

### 1. Generar Avatar Femenino Profesional
- **Opción A: Ready Player Me**
  - Ir a https://readyplayer.me/
  - Crear avatar femenino profesional
  - Configurar como mujer de negocios
  - Descargar en formato FBX (mejor para VR)

- **Opción B: VRoid Studio**
  - Descargar VRoid Studio (gratuito)
  - Crear avatar femenino personalizado
  - Exportar como FBX

- **Opción C: Blender/Maya/3ds Max**
  - Crear o modificar avatar existente
  - Exportar como FBX con rig humanoide

### 2. Añadir Animación Idle en Mixamo
- Ir a https://www.mixamo.com/
- Subir el modelo FBX
- Buscar animación "Idle", "Breathing Idle" o "Standing Idle"
- Aplicar la animación
- Exportar como FBX con:
  - Format: FBX for Unity (.fbx)
  - Skin: With Skin
  - Keyframe Reduction: Uniform
  - 30 FPS (perfecto para VR)

### 3. Colocar el Archivo
- Renombrar el archivo exportado a `blueeye.fbx`
- Colocarlo en esta carpeta: `/public/assets/blueeye.fbx`

### 4. Verificaciones Importantes
- **Rig Humanoide**: El modelo debe tener skeleton humanoide estándar
- **Escala**: Altura aproximada 1.7-1.8 unidades
- **Materiales**: PBR materials (perfecto para VR)
- **Blendshapes**: Para animación facial (opcional)
- **FBX Benefits**: Mejor compatibilidad con VR, Unity, Unreal Engine

### 4.1. Ventajas del Formato FBX para VR
- ✅ **Mejor rendimiento** en aplicaciones VR
- ✅ **Compatibilidad total** con Unity/Unreal para VR
- ✅ **Animaciones más fluidas** para mostrar propiedades
- ✅ **Soporte completo** para interacciones VR
- ✅ **Materiales optimizados** para realidad virtual

### 5. Props/Accesorios (Opcional)
Si el modelo incluye tablet u otros props sueltos:
- Asegurar que estén nombrados apropiadamente (ej: "tablet", "phone")
- El componente los detectará y anclará automáticamente

### 6. Build y Prueba
```bash
npm run build
npm run dev
```

### 7. Verificar Funcionalidad
- Avatar debe aparecer centrado
- Animación idle debe reproducirse automáticamente
- Saludo automático debe funcionar
- Props deben estar anclados correctamente

## Troubleshooting

### Si el avatar no aparece:
- Verificar que el archivo existe en `/public/assets/blueeye.glb`
- Revisar la consola del navegador para errores
- Verificar que el modelo tiene rig humanoide válido

### Si la animación no funciona:
- Verificar que Mixamo exportó correctamente las keyframes
- Comprobar que la animación se llama "Idle" o similar

### Si los props están flotando:
- Usar el componente BlueEyeFixed.jsx
- Verificar que los bones de las manos existen

## Archivo Actual
**Estado**: ❌ Archivo no encontrado
**Esperando**: blueeye.fbx con avatar femenino profesional + animación idle
**Formato**: FBX (perfecto para VR y propiedades inmobiliarias)

Una vez que coloques el archivo FBX aquí, el avatar funcionará automáticamente con soporte completo para VR.

## Próximos Pasos VR
Cuando tengas el avatar FBX funcionando, podremos:
- 🥽 Integrar con WebXR para VR en el navegador
- 🏠 Mostrar propiedades inmobiliarias en VR
- 👋 Interacciones gestuales en realidad virtual
- 🎮 Controles VR para navegación de propiedades
