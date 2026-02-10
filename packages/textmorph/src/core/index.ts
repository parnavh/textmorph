import { diff_match_patch } from "diff-match-patch";
import { gsap } from "gsap";

export function morphText(
  element: HTMLElement,
  newText: string,
  options: { duration?: number } = {},
): void {
  const duration = options.duration ?? 0.6;
  const oldText = element.textContent ?? "";
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(oldText, newText);
  dmp.diff_cleanupSemantic(diffs);

  element.innerHTML = "";

  diffs.forEach(([op, text]) => {
    const span = document.createElement("span");
    span.textContent = text;

    if (op === -1) {
      span.className = "tm-remove";
      element.appendChild(span);

      requestAnimationFrame(() => {
        const fullWidth = span.offsetWidth + "px";
        span.style.width = fullWidth;

        gsap.to(span, {
          width: 0,
          duration,
          ease: "power2.inOut",
          onComplete: () => span.remove(),
        });
      });
    } else if (op === 1) {
      span.className = "tm-add";
      span.style.width = "0px";
      span.style.opacity = "0";
      element.appendChild(span);

      requestAnimationFrame(() => {
        const fullWidth = span.scrollWidth;
        gsap.to(span, {
          width: fullWidth + "px",
          opacity: 1,
          duration,
          ease: "power2.out",
        });
      });
    } else {
      span.className = "tm-same";
      element.appendChild(span);
    }
  });
}
