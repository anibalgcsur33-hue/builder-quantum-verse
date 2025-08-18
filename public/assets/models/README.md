# Modelos 3D para AR/VR

## Formato recomendado: GLB

Para óptima compatibilidad web, usa modelos GLB comprimidos con Draco.

### Ubicación de archivos:

- `villa.glb` - Modelo principal de villa para AR
- `penthouse.glb` - Modelo de penthouse
- `apartment.glb` - Modelo de apartamento

### Requisitos técnicos:

- **Tamaño máximo**: 10-15 MB para móviles
- **Polígonos**: 50k-150k tris máximo
- **Compresión**: Draco habilitada
- **Texturas**: 1024x1024 o 2048x2048 máximo

### Conversión FBX → GLB:

```bash
# Con fbx2gltf
fbx2gltf --input villa.fbx --output villa.glb --draco

# Con Blender
# File > Import > FBX
# File > Export > glTF 2.0 (.glb)
# Habilitar: Draco Mesh Compression
```

### Nota importante:

Coloca aquí tu archivo `villa.glb` para que funcione el sistema AR.
El path por defecto es: `/assets/models/villa.glb`
