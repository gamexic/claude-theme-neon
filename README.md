# Neón nocturno: tema animado para Claude Code

Un tema oscuro para la app de escritorio (y la app móvil) de Claude Code: negro profundo con azul eléctrico y morado neón. Detrás de la conversación se mueve una escena animada con nebulosas de neón, un campo de estrellas que parpadea, estrellas fugaces, naves espaciales que cruzan el cielo, un OVNI y una rejilla synthwave que avanza hacia el horizonte. Los paneles quedan esmerilados para que el texto se lea bien.

Es un *mod* de Claude Code: se aplica solo al iniciar cada sesión. Si tienes activado "reducir movimiento" en tu sistema, la escena se queda quieta. La terminal no dibuja temas; se ve en la app de escritorio y en la móvil.

## Instalar

En la línea de comandos de una sesión de Claude Code en la terminal:

```
/plugin install neon-nocturno --marketplace gamexic/claude-theme-neon
```

Responde `y` para agregar el marketplace y elige el alcance (usuario, recomendado).

Desde una shell:

```
claude plugin install neon-nocturno --marketplace gamexic/claude-theme-neon
```

En la app de escritorio, donde `/plugin` no funciona: haz clic en **+** junto a la caja de mensajes, luego **Plugins**, **Add marketplace** con `gamexic/claude-theme-neon` y después **Add plugin**.

Usa un solo tema a la vez: otro mod que cambie el tema reemplaza a este.

## Personalizar

- Colores: `hooks/register.tsx`.
- Escena animada: `hooks/scene.ts`.

## Licencia

MIT. `hooks/make-colors.js` y `hooks/make-colors.d.ts` son el ayudante de colores que Claude Code entrega para crear temas.
