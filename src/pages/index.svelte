<script>
    import { metatags, layout, url } from '@roxi/routify';
    metatags.title = 'Mission generator';
    metatags.description = 'Description coming soon...';

    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generate(event) {
        const urls = $layout.parent.children
            .filter(child => child.path === '/missions')[0]
            .children
            .map(child => child.path.slice(1));

        // Assign mission to player #1:
        const randomUrl1 = window.location.href + urls[getRandomInt(urls.length)];

        Email.send({
            SecureToken : "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
            To : event.target.email1.value,
            From : "missions@philippesimpson.dk",
            Subject : "You have been assigned a secret side mission",
            Body : `See your mission <a href=${randomUrl1}>here</a>`
        }).then(
            message => console.log(message, event.target.email1.value, randomUrl1)
        );
        
        // Assign mission to player #1:
        const randomUrl2 = window.location.href + urls[getRandomInt(urls.length)];

        Email.send({
            SecureToken : "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
            To : event.target.email2.value,
            From : "missions@philippesimpson.dk",
            Subject : "You have been assigned a secret side mission",
            Body : `See your mission <a href=${randomUrl2}>here</a>`
        }).then(
            message => console.log(message, event.target.email2.value, randomUrl2)
        );
    }
</script>

<!-- routify:options title="Main" -->

<svelte:head>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
</svelte:head>

<style>
    img {
        object-fit: cover;
        width: 100%;
        height: 55vw;
        box-shadow: 1px 1px 5px 0 rgba(0,0,0,.5);
    }
</style>

<img src="https://i.redd.it/lpkb2gkaw4s51.jpg" />

<p>
    Randomly assign a secret side mission to each player:
</p>

<form on:submit|preventDefault={generate}>
    <input
        type="email"
        name="email1"
        pattern={emailPattern}
        title="player 1 email address"
        required
        placeholder="Player's email">
    vs.
    <input
        type="email"
        name="email2"
        pattern={emailPattern}
        title="player 2 email address"
        required
        placeholder="Player's email">
    
    <input
        type="submit"
        value="Submit">
</form>