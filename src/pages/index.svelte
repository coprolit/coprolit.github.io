<script>
    import { metatags, layout, url } from '@roxi/routify';

    metatags.title = 'Command Post';
    metatags.description = 'Your one stop destination for starting up a Bolt Action game.';
</script>

<!-- routify:options title="Home" -->

<style>
    img {
        object-fit: cover;
        width: 100%;
        box-shadow: 1px 1px 5px 0 rgba(0,0,0,.5);
    }
</style>

<div class="flow">
    <p>
        <i></i>
    </p>
    
    <h1>About to start up a Bolt Action game?</h1>
    <div>Welcome to the <strong>Command Post</strong>, a collection of tools and content to spice up your <strong>Bolt Action</strong> game.</div>

    <h2>Roll a random Scenario</h2>
    <div>
        Mark your favorite Scenarios, <strong>official</strong> and <strong>unofficial</strong>, and get a Scenario selected for you.
    </div>

    <div>
        Try the <a href={$url('/generator')}>Generator</a>.
    </div>

    <h2>Assign secret missions</h2>
    <div>
        Use our unofficial <strong>missions</strong> to add extra tactical challenge and decision making to your game of Bolt Action.
        Missions add a <strong>secondary</strong>, personal, objective for each player, that can affect the outcome of the scenario played.
    </div>
    <div>
        See available missions <a href={$url('/missions')}>here</a>.
    </div>
    <div>
        Use the <a href={$url('/generator')}>Generator</a> to assign random secret missions to each player.
    </div>

    <h2>Have feedback?</h2>
    <div>
        Please note this is a <strong>work in progress</strong>
        - therefore we kindly ask that you submit any and all thoughts, ideas and any issues that you encounter while using the tool.
    </div>

    <h3>Thanks a lot for giving it a try.</h3>

    <img src="/images/lpkb2gkaw4s51.jpg" alt="mission briefing" />
</div>