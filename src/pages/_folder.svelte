<script>
  import { isActive, url, layout } from "@roxi/routify";
  
  export let missions = $layout.children.filter(child => child.path === '/missions')[0].children;
</script>

<nav>
  <h1>Bolt Action side missions generator</h1>
  <a href={$url()} class:active={$isActive($url())}>
    Home
  </a>
  {#each missions as node}
    |
    <a href={$url(node.path)} class:active={$isActive(node.path)}>
      {node.title}
    </a>
  {/each}
</nav>

<main>
  <slot />
</main>
