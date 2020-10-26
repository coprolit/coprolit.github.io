<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";

  Router.urlTransform = {
    apply: url => `/missions${url}`,
    remove: url => url.replace('/missions', ''),
  }
</script>

<style  global>
  @import "../static/global.css";
</style>

<Router {routes} />