# textmorph

**Smoothly animate text changes character-by-character.**

`textmorph` detects the difference between old and new text and animates the transition with fluid shrinking, fading, and alignment.

## 📦 Installation

```bash
pnpm add textmorph
# or
npm install textmorph
```

## 🛠️ Usage

### Vanilla JS

```js
import { morphText } from "textmorph";
import "textmorph/css";

const el = document.querySelector("#my-text");
morphText(el, "New text here");
```

### Svelte

```svelte
<script>
  import TextMorph from "textmorph/svelte";
  let text = "Hello";
</script>

<TextMorph {text} />

<style global>
  @import "textmorph/css";
</style>
```

> Make sure to include the CSS import to enable animations.

## Development

```bash
pnpm install
pnpm dev
```
