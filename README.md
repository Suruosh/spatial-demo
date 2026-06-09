# Spatial Commerce

A web-based 3D spatial UI that mirrors an XR shopping scene — a glassmorphic interface
floating over a live `three.js` canvas, with mouse-driven parallax and a light/dark theme.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **Motion**, and
**@react-three/fiber** + **drei**.

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check (`tsc -b`) and build      |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |

## Project structure

```
src/
  App.tsx              # Main scene: 3D canvas + glassmorphic UI + parallax
  main.tsx             # App entry
  index.css            # Tailwind + glass-panel / glass-button utilities
  components/
    GlassPanel.tsx     # Reusable 3D-transform glass surface
    ProductCard.tsx    # Floating-emoji product tile
    ThreeDButton.tsx   # Button3D + CircleBtn volumetric buttons
```

> The 3D object in `App.tsx` is a `PlaceholderModel`. Swap it for your own asset by loading
> a GLTF with drei's `useGLTF()` hook.

## Notes

`metadata.json` and `.env.example` carry over from the original AI Studio applet. The Gemini
capability they declare is not yet wired into the client code — add `@google/genai` and the
relevant calls if you want to use it.
