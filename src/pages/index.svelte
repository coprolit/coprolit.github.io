<script>
    import { metatags, layout, url } from '@roxi/routify';
    metatags.title = 'Mission generator';
    metatags.description = 'Description coming soon...';

    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generate(event) {
        const urls =  Array.from(document.querySelectorAll("a"))
            .filter(el => el.href.includes('mission'))
            .map(el => el.href);
        const randomUrl = urls[getRandomInt(urls.length)];
        
        // Assign mission to player #1:
        Email.send({
            SecureToken : "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
            To : event.target.email1.value,
            From : "missions@philippesimpson.dk",
            Subject : "You have been assigned a secret side mission",
            Body : `See your mission <a href=${randomUrl}>here</a>`
        }).then(
            message => console.log(message)
        );
        
        // Assign mission to player #1:
        Email.send({
            SecureToken : "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
            To : event.target.email2.value,
            From : "missions@philippesimpson.dk",
            Subject : "You have been assigned a secret side mission",
            Body : `See your mission <a href=${randomUrl}>here</a>`
        }).then(
            message => console.log(message)
        );
    }
</script>

<svelte:head>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <base href="/missions">
</svelte:head>

<h1>Bolt Action side missions generator</h1>

<form on:submit|preventDefault={generate}>
    <label for="email1">Player #1</label>
    <input
        type="email"
        name="email1"
        pattern={emailPattern} title="player 1 email address"
        required
        placeholder="Enter email">
    <br>
    <label for="email2">Player #2</label>
    <input
        type="email"
        name="email2"
        pattern={emailPattern} title="player 2 email address"
        required
        placeholder="Enter email">
    <br>
    <input type="submit">
</form>