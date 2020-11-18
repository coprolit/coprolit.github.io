<!-- routify:options title="Missions" -->

<script>
  import { isActive, url, layout } from "@roxi/routify";
  
  let missions = $layout.parent.children.filter(child => child.path === '/missions')[0].children;
</script>

<h1>Missions</h1>
<p>
  Missions form <strong>secondary objectives</strong> in a game of Bolt Action, affecting the outcome of the scenario played.
</p>

<p>
  Use the generator to get random missions assigned to each player, or pick a mission and assign it manually.
</p>

<div class="padding flow">
{#each missions as node}
  <div>
    <a href={$url(node.path)} class:active={$isActive(node.path)}>
      &middot; {node.title}
    </a>
  </div>
{/each}
</div>