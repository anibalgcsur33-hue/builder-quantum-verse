# Avatar BlueEye - Instrucciones de Implementación

## Pasos para crear y añadir el avatar:

### 1. Generar Avatar Femenino Profesional
- **Opción A: Ready Player Me**
  - Ir a https://readyplayer.me/
  - Crear avatar femenino profesional
  - Configurar como mujer de negocios
  - Descargar en formato GLB

- **Opción B: VRoid Studio**
  - Descargar VRoid Studio (gratuito)
  - Crear avatar femenino personalizado
  - Exportar como VRM, luego convertir a GLB

### 2. Añadir Animación Idle en Mixamo
- Ir a https://www.mixamo.com/
- Subir el modelo GLB/FBX
- Buscar animación "Idle" o "Breathing Idle"
- Aplicar la animación
- Exportar como GLB con:
  - Format: GLB
  - Skin: With Skin
  - Keyframe Reduction: Uniform

### 3. Colocar el Archivo
- Renombrar el archivo exportado a `blueeye.glb`
- Colocarlo en esta carpeta: `/public/assets/blueeye.glb`

### 4. Verificaciones Importantes
- **Rig Humanoide**: El modelo debe tener skeleton humanoide estándar
- **Escala**: Altura aproximada 1.7-1.8 unidades
- **Materiales**: Preferiblemente PBR materials
- **Blendshapes**: Para animación facial (opcional)

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
**Esperando**: blueeye.glb con avatar femenino profesional + animación idle

Una vez que coloques el archivo aquí, el avatar debería funcionar automáticamente.
