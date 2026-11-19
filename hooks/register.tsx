import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene.js'

// Neón nocturno: negro profundo con azul eléctrico y morado neón.
// Hecho para modo oscuro.
const { theme, problems } = makeColors({
  label: 'Neón nocturno',
  only: 'dark',
  roles: { accent: '#3d8bff', danger: '#ff3d81', success: '#39e6a0', warning: '#ffc94d', pro: '#b84dff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#07060f',
        'surface-1': '#0d0b1c',
        'surface-2': '#131029',
        'surface-3': '#191533',
        'text-primary': '#eef0ff',
        'text-secondary': '#bcb8e6',
        'text-muted': '#9590c8',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'neon-nocturno', glass: { blur: 6, tint: '#0b0a1a', opacity: 0.32 } },
  overrideColorScheme: 'dark',
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }

    // Al iniciar la sesión a veces aún no hay app conectada (isDrawn: false),
    // pero el tema se pinta igual cuando se conecta, así que no se avisa nada.
    $.ui.status(undefined)
    await $.theme.set(LOOK)

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'neon-nocturno') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Noche negra con luces de neón azul y morado y una rejilla que avanza" isInteractive />
  })
}
