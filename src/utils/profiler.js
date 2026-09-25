// Callback para <Profiler> de React: guarda en desarrollo cuánto tarda cada render.
// Se consulta en la consola con `window.__MAU_RENDERS__`. En producción no hace nada.
export function logRender(id, phase, actualDuration, baseDuration) {
  if (!import.meta.env.DEV) return
  const renders = (window.__MAU_RENDERS__ ??= [])
  renders.push({ id, phase, actualDuration, baseDuration })
}
