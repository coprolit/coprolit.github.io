<script>
  import { isActive, url, layout } from "@roxi/routify";
  
  export let missions = $layout.children.filter(child => child.path === '/missions')[0].children;
</script>

<header>
  <div class="logo">Bolt Action mission generator</div>
  <nav>
    <a href={$url()} class:active={$isActive($url())}>
      &#127968;
    </a>
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