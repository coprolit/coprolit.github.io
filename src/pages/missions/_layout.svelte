<script>
  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

  function assign(event) {
    // Assign mission to player:
    Email.send({
        SecureToken : "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
        To : event.target.email1.value,
        From : "missions@philippesimpson.dk",
        Subject : "You have been assigned a secret side mission",
        Body : `See your mission <a href=${window.location.href}>here</a>`
    }).then(
        message => alert('Mission assigned!')
    );
  }
</script>

<svelte:head>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
</svelte:head>

<slot />

<footer>
  <span>Assign this mission to yourself:</span>
  <form on:submit|preventDefault={assign}>
    <input
        type="email"
        name="email1"
        pattern={emailPattern}
        title="player email address"
        required
        placeholder="Your email">
    <input
        type="submit"
        value="Submit">
  </form>
</footer>
