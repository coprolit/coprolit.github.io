<script>
    import { metatags, layout, url } from '@roxi/routify';
    metatags.title = 'Mission generator';
    metatags.description = 'Description coming soon...';

    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

    let selected;
    let includeMissions = false;
    let includeBattleScenarios = false;
    let includeAttDefScenarios = false;
    let scenario = false;

    let send1 = false;
    let send2 = false;

    function getRandomInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generate(event) {
        // Reset:
        send1 = false;
        send2 = false;
        scenario = false;

        if (includeMissions) {
            assignMissions(event.target.email1.value, event.target.email2.value);
        }
        
        if (includeBattleScenarios || includeAttDefScenarios) {
            scenario = getScenario(includeBattleScenarios, includeAttDefScenarios);
        }
        
    }

    function assignMissions(email1, email2) {
        
        const missions = $layout.parent.children
            .filter(child => child.path === '/missions')[0]
            .children
            .map(child => {
                return {
                    path: window.location.href + child.path.slice(1),
                    title: child.title
                }
            });

        // Assign mission to player #1:
        const randomMission1 = missions[getRandomInt(missions.length - 1)];
        
        Email.send({
            SecureToken: "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
            To: email1,
            From: "missions@philippesimpson.dk",
            Subject: "You have been assigned the mission: " + randomMission1.title,
            Body: `See your mission <a href=${randomMission1.path}>here</a>`
        }).then(
            message => send1 = true
        );
        
        // Assign mission to player #1:
        const randomMission2 = missions[getRandomInt(missions.length - 1)];

        Email.send({
            SecureToken: "0b6eed09-ca2b-41ed-9283-2d33686b5dd2",
            To: email2,
            From: "missions@philippesimpson.dk",
            Subject: "You have been assigned the mission: " + randomMission2.title,
            Body: `See your mission <a href=${randomMission2.path}>here</a>`
        }).then(
            message => send2 = true
        );
    }

    function getScenario(battle, attackerDefender) {

        const scenarios = [
            "Scenario 1 – No Man's Land (Rulebook p.134)",
            "Scenario 2 – Meeting Engagement (Rulebook p.135)",
            "Scenario 3 – Key Positions (Rulebook p.136)",
            "Scenario 4 – Double Envelopment (Rulebook p.137)",
            "Scenario 5 – Top Secret (Rulebook p.138)",
            "Scenario 6 – Demolition (Rulebook p.139)",
            "Scenario 7 – Envelopment (Rulebook p.140)",
            "Scenario 8 – Manhunt (Rulebook p.142)",
            "Scenario 9 – Point Defence (Rulebook p.144)",
            "Scenario 10 – Hold Until Relieved (Rulebook p.145)",
            "Scenario 11 – Surrounded! (Rulebook p.146)",
            "Scenario 12 – Sectors (Rulebook p.148)"
        ]

        if (battle && attackerDefender) {
            return scenarios[getRandomInt(11)];
        }

        if (battle) {
            return scenarios[getRandomInt(5)];
        }

        if (attackerDefender) {
            return scenarios[getRandomInt(11, 6)];
        }
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
        box-shadow: 1px 1px 5px 0 rgba(0,0,0,.5);
    }
</style>

<h1>Assign objectives</h1>

<p>
    Randomly assign scenario and/or secret missions:
</p>

<div class="shadow padding flow border">
    <form 
        on:submit|preventDefault={generate}
        class="flow"
    >
        <div>
            <div>
                <input
                    type="checkbox"
                    id="battle"
                    bind:checked={includeBattleScenarios}
                >
                <label for="battle">Rulebook Battle scenarios</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="attacker-defender"
                    bind:checked={includeAttDefScenarios}
                >
                <label for="attacker-defender">Rulebook Attacker-Defender scenarios</label>
            </div>
        </div>
        <div>
            <input
                type="checkbox"
                id="mission"
                bind:checked={includeMissions}>
            <label for="mission">Secret missions</label>

            {#if includeMissions}
            <div>
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
                    placeholder="Player's email"
                >
            </div>
            {/if}
        </div>
        
        <div>
            <input
                type="submit"
                value="Generate">
        </div>
    </form>

    {#if scenario}
    <div class="border-top"></div>
    <div>
        You are to face your opponent in:
    </div>
    <blockquote>{scenario}</blockquote>
    {/if}

    {#if send1 && send2}
    <div class="border-top"></div>
    <div>
        Secret missions have been assigned and send to each player. <span class="check-mark">&check;</span>
    </div>
    {/if}
</div>

<img src="/images/lpkb2gkaw4s51.jpg" alt="mission briefing" />
