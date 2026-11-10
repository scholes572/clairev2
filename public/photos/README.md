# Claire's photos (add in code)

1. Put image files in this folder, for example:
   - `public/photos/01.jpg`
   - `public/photos/02.png`

2. Edit `src/App.tsx` and update the `clairePhotos` array near the top:

```ts
const clairePhotos = [
  { src: "/photos/01.jpg", title: "Memory 1", note: "A short note" },
  { src: "/photos/02.png", title: "Memory 2", note: "Another note" },
];
```

- `src` must start with `/photos/` and match the filename you added.
- Add or remove items to control how many photos appear (no website upload).
