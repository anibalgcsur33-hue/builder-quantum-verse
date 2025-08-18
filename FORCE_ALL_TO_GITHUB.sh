#!/bin/bash
# SCRIPT PARA FORZAR TODOS LOS ARCHIVOS AL REPOSITORIO

echo "=== VERIFICANDO ARCHIVOS ==="
ls -la client/components/BlueEyeLogo.tsx
ls -la client/components/effects/CursorAurora.tsx  
ls -la client/components/future/NeuralField.tsx
ls -la client/components/future/AIConcierge.tsx

echo "=== AÑADIENDO TODOS LOS ARCHIVOS ==="
git add -A
git status --porcelain

echo "=== FORZANDO COMMIT ==="
git commit -m "FORZAR TODOS LOS ARCHIVOS COMPLETOS AL REPOSITORIO" || true

echo "=== INTENTANDO PUSH ==="
git push origin HEAD:main || echo "PUSH BLOQUEADO POR ACL"

echo "=== ESTADO FINAL ==="
git log --oneline -5
