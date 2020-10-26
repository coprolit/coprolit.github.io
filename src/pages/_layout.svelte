<script>
  import { isActive, url, layout } from "@sveltech/routify";
  export let node = $layout;
</script>

<slot />

<hr>

{#each node.children as node}
  <div>
    <a href={$url(node.path)} class:active={$isActive(node.path)}>
      {node.title}
    </a>
  </div>
{/each}
