<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Special+Elite&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<style  global>
  @import "../static/reset.css";
  @import "../static/global.css";
</style>

<Router {routes} />