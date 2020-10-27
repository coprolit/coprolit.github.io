<script>
  import { isActive, url, layout } from "@roxi/routify";
  export let node = $layout;
</script>

<nav>
  <h1>Bolt Action side missions generator</h1>
  {#each node.children as node}
    - <a href={$url(node.path)} class:active={$isActive(node.path)}>
      {node.title}
    </a>
  {/each}
</nav>

<slot />

<hr>

