<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { morphText } from "@/core";

  export let text: string;
  let el: HTMLElement;
  let prevText = text;

  const runMorph = () => {
    if (el && prevText !== text) {
      morphText(el, text);
      prevText = text;
    }
  };

  onMount(runMorph);
  afterUpdate(runMorph);
</script>

<span bind:this={el}>{prevText}</span>
