<script>
    import { metatags, layout, url } from '@roxi/routify';
    metatags.title = 'Command Post';
    metatags.description = 'Bolt Action Scenario and Missions generator.';

    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

    let selected;
    let includeMissions = false;
    let includeBattleScenarios = false;
    let includeAttDefScenarios = false;
    let includeBAAScenarios = false;
    let scenario = false;
    let includeConditions = false;

    let send1 = false;
    let send2 = false;

    function getRandomInt(max) {
        // return Math.floor(Math.random() * (max - min + 1) + min);
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generate(event) {
        // Reset:
        send1 = false;
        send2 = false;
        scenario = false;

        if (includeMissions) {
            assignMissions(event.target.email1.value, event.target.email2.value);
        }
        
        if (includeBattleScenarios || includeAttDefScenarios || includeBAAScenarios) {
            scenario = getScenario(includeBattleScenarios, includeAttDefScenarios, includeBAAScenarios);
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
        
        fetch('https://www.philippesimpson.dk/mail.php', {
            method: 'post',
            body: JSON.stringify({
                to: email1,
                subject: "You have been assigned the mission: " + randomMission1.title,
                message: `See your mission <a href=${randomMission1.path}>here</a>`
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        });

        /* Email.send({
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
        ); */
    }

    function getScenario(battle, attackerDefender, baa) {

        const battleScenarios = [
            {
                title: "No Man's Land",
                info: "Scenario 1 (Rulebook p.134)"
            },
            {
                title: "Meeting Engagement",
                info: "Scenario 2 (Rulebook p.135)"
            },
            {
                title: "Key Positions",
                info: "Scenario 3 (Rulebook p.136)"
            },
            {
                title: "Double Envelopment",
                info: "Scenario 4 (Rulebook p.137)"
            },
            {
                title: "Top Secret",
                info: "Scenario 5 (Rulebook p.138)"
            },
            {
                title: "Demolition",
                info: "Scenario 6 (Rulebook p.139)"
            }
        ];

        const attDefScenarios = [
            {
                title: "Envelopment",
                info: "Scenario 7 (Rulebook p.140)"
            },
            {
                title: "Manhunt",
                info: "Scenario 8 (Rulebook p.142)"
            },
            {
                title: "Point Defence",
                info: "Scenario 9 (Rulebook p.144)"
            },
            {
                title: "Hold Until Relieved",
                info: "Scenario 10 (Rulebook p.145)"
            },
            {
                title: "Surrounded!",
                info: "Scenario 11 (Rulebook p.146)"
            },
            {
                title: "Sectors",
                info: "Scenario 12 (Rulebook p.148)"
            }
        ];

        const baaScenarios = [
            {
                title: "Heartbreak Ridge",
                info: "Bolt Action Alliance 2020 Mission Pack scenario",
                link: "https://drive.google.com/file/d/1FoDzjibgYJzykMLgvqERwBzAuYbH7x2w/view"
            },
            {
                title: "Kitty Hawk Down",
                info: "Bolt Action Alliance 2020 Mission Pack scenario",
                link: "https://drive.google.com/file/d/1FoDzjibgYJzykMLgvqERwBzAuYbH7x2w/view"
            },
            {
                title: "Nuts!",
                info: "Bolt Action Alliance 2020 Mission Pack scenario",
                link: "https://drive.google.com/file/d/1FoDzjibgYJzykMLgvqERwBzAuYbH7x2w/view"
            },
            {
                title: "Break Out",
                info: "Bolt Action Alliance 2020 Mission Pack scenario",
                link: "https://drive.google.com/file/d/1FoDzjibgYJzykMLgvqERwBzAuYbH7x2w/view"
            },
            {
                title: "Fog of War",
                info: "Bolt Action Alliance 2020 Mission Pack scenario",
                link: "https://drive.google.com/file/d/1FoDzjibgYJzykMLgvqERwBzAuYbH7x2w/view"
            },
            {
                title: "Crossfire",
                info: "Bolt Action Alliance 2020 Mission Pack scenario",
                link: "https://drive.google.com/file/d/1FoDzjibgYJzykMLgvqERwBzAuYbH7x2w/view"
            }
        ];

        let scenarios = [];
        
        if (battle) {
            scenarios = scenarios.concat(battleScenarios);
        }
        if (attackerDefender) {
            scenarios = scenarios.concat(attDefScenarios);
        }
        if (baa) {
            scenarios = scenarios.concat(baaScenarios)
        }

        return scenarios[getRandomInt(scenarios.length)];
    }

    function getCondition() {
        const conditions = [
            {
                title: "Fuel Shortage",
                desc: "Due to prolonged fighting, each player rolls a D6+2 for each of their vehicles, the sum is the player's total Fuel units. Split fuel units between the vehicles and mark down in secret. A Run or Advance order consumes a fuel unit."
            },
            {
                title: "Heavy Rain",
                desc: "Weeklong downpour has made off-road movement difficult even for tanks. All Open Ground is treated as Rough Ground instead."
            },
            {
                title: "Starvation",
                desc: "Food supplies have dwindled away and the men are weak. All infantry loose any Tough Fighter abilities, and Run at D6+6 inch speed."
            },
            {
                title: "Ammunition Shortage",
                desc: "Can only give half of all units a Fire, Advance or Ambush order in a turn. Start of Round 3 there are airdrops incoming. Player choose the drop point and it deviates 4D6 in a random direction. Get in base contact with it = all units can fire, advance or ambush the current and next round."
            },
        ]
    }
</script>

<!-- routify:options title="Generator" -->

<svelte:head>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
</svelte:head>

<style>
    img {
        object-fit: cover;
        width: 100%;
        box-shadow: 1px 1px 5px 0 rgba(0,0,0,.5);
    }

    form {
        display: grid;
        gap: var(--spacing);
    }

    input[type=submit] {
        width: fit-content;
        justify-self: center;
    }

    @media (min-width: 640px) {
        form {
            grid-template-columns: 1fr 1fr 1fr;
        }

        input[type=submit] {
            grid-column: span 3;
        }
    }
</style>

<h1>Generator</h1>

<p>
    Select your preferred options below and generate a random game of Bolt Action.
</p>

<form 
    on:submit|preventDefault={generate}
    class="flex"
>
    <fieldset class="border flow">
        <legend>
                <strong>Scenario</strong>
        </legend>
        
        <div>
            <small><i>Bolt Action 2 Rulebook:</i></small>
            <div>
                <input
                    type="checkbox"
                    id="battle"
                    bind:checked={includeBattleScenarios}
                >
                <label for="battle"><strong>Battle</strong> scenarios</label>
            </div>
        
            <div>
                <input
                    type="checkbox"
                    id="attacker-defender"
                    bind:checked={includeAttDefScenarios}
                >
                <label for="attacker-defender"><strong>Attacker-Defender</strong> scenarios</label>
            </div>
        </div>
    
        <div>
            <small><i>WWPD/Bolt Action Alliance:</i></small>
            <div>
                <input
                    type="checkbox"
                    id="baa-scenarios"
                    bind:checked={includeBAAScenarios}
                >
                <label for="baa-scenarios"><strong>2020 Mission Pack</strong> scenarios</label>
            </div>
        </div>
        
        <div class="info-box flex">
            <div class="margin-right-small">&#9432;</div>
            <div>Scenarios provide the <strong>main</strong> objective and victory condition for each player.</div>
        </div>
    </fieldset>
    
    <fieldset class="border flow">
        <legend>
            <strong>Secret missions</strong>
        </legend>
        
        <div>
            <input
                type="checkbox"
                id="mission"
                bind:checked={includeMissions}>
            <label for="mission">Assign a mission to each player</label>

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
            <p><small><i>Each player receives their secret mission via email.</i></small></p>
            {/if}
        </div>

        <div class="info-box flex">
            <div class="margin-right-small">&#9432;</div>
            <div>Missions add a <strong>secondary</strong> objective for each player.<br> Achieving a mission objective helps the player towards winning the played Scenario.</div>
        </div>
    </fieldset>

    <fieldset class="border flow color-inactive">
        <legend><small>Battlefield Condition</small></legend>
        <div>
            <input
                disabled
                type="checkbox"
                id="condition"
                bind:checked={includeConditions}>
            <label for="mission">50% of an unusual Battlefield Condition taking effect</label>
        </div>
        <div class="info-box flex">
            <div class="margin-right-small">&#9432;</div>
            <div>Battlefield Conditions are gameplay modifying rules applying for both players.</div>
        </div>
    </fieldset> 
    
    <input
        type="submit"
        value="Generate" />
</form>

{#if scenario}
<div class="padding flow border panel shadow">   
    <div>
        You are to face your opponent in:
    </div>
    
    <h3>{scenario.title}</h3>
    {scenario.info}
    {#if scenario.link}
    <div>
        Get scenario <strong><a href="{scenario.link}" target="_blank">here</a></strong>
    </div>
    {/if}    

</div>
{/if}

{#if send1 && send2}
<div class="padding flow border panel shadow">
    Secret missions have been assigned and send to each player. <span class="check-mark">&check;</span>
</div>
{/if}

<img src="/images/lpkb2gkaw4s51.jpg" alt="mission briefing" />
