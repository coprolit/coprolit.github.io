<!-- routify:options title="Missions" -->

<script>
  import { isActive, url, layout } from "@roxi/routify";
  
  let missions = $layout.parent.children.filter(child => child.path === '/missions')[0].children;
</script>

<h1>Missions</h1>
<p>
  Missions are optional <strong>secondary objectives</strong> in a game of Bolt Action, that can affect the outcome of the scenario played.
</p>

<p>
  Use the <a href={$url('/generator')}>Generator</a> to get random missions assigned to each player, or pick a mission and assign it manually.
</p>

<fieldset class="border flow">
  <legend><small>Missions</small></legend>
  {#each missions as node}
  <div>
    <a href={$url(node.path)} class:active={$isActive(node.path)}>
      &middot; {node.title}
    </a>
  </div>
  {/each}
</fieldset>
