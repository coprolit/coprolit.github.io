<script>
  import { isActive, url, layout } from "@roxi/routify";
  
  export let missions = $layout.children.filter(child => child.path === '/missions')[0].children;
</script>

<header>
  <div class="logo">
    <a href={$url()}>Bolt Action mission generator</a>
  </div>
  <nav>
    {#each missions as node}
      &middot;
      <a href={$url(node.path)} class:active={$isActive(node.path)}>
        {node.title}
      </a>
    {/each}
  </nav>
</header>

<main>
  <slot />
</main>