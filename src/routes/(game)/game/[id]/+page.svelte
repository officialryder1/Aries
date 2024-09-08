<script>
    import { onMount } from 'svelte'
  
    import Card from '$lib/components/ui/card/card.svelte';
    import Pusher from 'pusher-js'
    import { goto } from '$app/navigation'
    import { PUBLIC_API_KEY } from '$env/static/public'
    import { PUBLIC_URL } from '$env/static/public'
    import { PUBLIC_IMAGE_URL } from '$env/static/public'
    import { getRarity, getType } from '$lib/utils/rarity'

    export let data;

    let pusher, channel;
    let playerOne, playerTwo;

    $: match = data?.match
    $: error = data?.error
    $: player = data?.player[0]
    $: cards = []
    $: user = data?.user.username
    $: user_id = data?.user.id

    
    // Initialize player slots
    $: playerOneCard = null;
    $: playerTwoCard = null;
    // health
    $: playerOneHealth = 0;
    $: playerTwoHealth = 0;
    // mana
    $: playerOneMana= 0;
    $: playerTwoMana = 0;
    $: winner = null

    // Player rank interval
    let timeInterval = 0
    let canPlay = true


    // $:{
    //     console.log(winner)
    // }
    
    onMount(async () => {
        // Fetch card details
        cards = await Promise.all(player.card.map(async (cardId) => {
            const res = await fetch(`${PUBLIC_URL}/get_card/${cardId}`);
            return await res.json();
        }));
        // Fetch player rank and set the timer based on rank
        fetchPlayerRank()
  
        // if (playerRank){
        //     timer = rankTimeInterval[playerRank] || 10
        //     timeLeft = timer
        //     startTime()
        // }

        // Fetch player details
        if (data?.player.length > 0) {
            playerOne = match.playerone; // first player
            playerTwo = match.playertwo;
        }


        // Fetch player details
        if (playerOne) {
            const response = await fetch(`${PUBLIC_URL}/get_player?user_id=${match.player_one}`);
            const playerOneData = await response.json();
            playerOneHealth = playerOneData[0]?.hp;
            playerOneMana = playerOneData[0]?.mana;
        }

        if (playerTwo) {
            const response = await fetch(`${PUBLIC_URL}/get_player?user_id=${match.player_two}`);
            const playerTwoData = await response.json();
            playerTwoHealth = playerTwoData[0]?.hp;
            playerTwoMana = playerTwoData[0]?.mana;
        }

        // Initialize Pusher and subscribe to 'match-channel'
        pusher = new Pusher(PUBLIC_API_KEY, {
            cluster: 'eu',
        });

        channel = pusher.subscribe('match-channel');

        // Listen for 'get-card' event
        channel.bind('get-card', function(data) {
            console.log('New card available:', data);

            if (data.user === match.playerone) {
                playerOneCard = data.card;
                playerTwoHealth = data.player_two_health;
                playerOneMana = data.player_one_mana;
                console.log(playerOneMana)
            } else if (data.user === match.playertwo) {
                playerTwoCard = data.card;
                playerOneHealth = data.player_one_health;
                playerTwoMana = data.player_two_mana
                console.log(playerOneMana)
            }

            // Check for match end conditions
            if (playerOneHealth <= 0 && playerTwoHealth > 0) {
                // Player Two wins
                goto(`/game/${match.id}/winner`);
            } else if (playerTwoHealth <= 0 && playerOneHealth > 0) {
                // Player One wins
                goto(`/game/${match.id}/winner`);
            }

        });
    });


            
    async function fetchPlayerRank(){
        const response = await fetch(`${PUBLIC_URL}/player_rank?user=${user_id}`)
        const data = await response.json()
        console.log(data?.time_interval)
        timeInterval = data?.time_interval
        return timeInterval
    }
    async function playCard(id) {
        if(!canPlay){
            alert("Please wait for your time!.")
            return
        }

        // Fetch the selected card details
        const res = await fetch(`${PUBLIC_URL}/get_card/${id}`);
        const picked = await res.json();

        // Check if the player has enough mana to play the card
        let currentMana = user === match.playerone ? playerOneMana : playerTwoMana
        if(currentMana < picked.mana_point){
            alert("Not enough mana to play this card!")
            return
        }

        // Update the current player's card slot
        if (user === match.playerone) {
            playerOneCard = picked;
        } else if (user === match.playertwo) {
            playerTwoCard = picked;
        }

        // Trigger the event to update the opponent's display
        await fetch(`${PUBLIC_URL}/trigger_card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                card: picked.id,
                user: user,
                match: match.id,
            }),
        });

        // Game logic: Apply attack points
        if (picked.attack_point) {
            if (user === match.playerone) {
                playerTwoHealth -= picked.attack_point;
            } else if (user === match.playertwo) {
                playerOneHealth -= picked.attack_point;
            }
        }

        // Deduct the mana used to play the card
        if(user === match.playerone){
            playerOneMana -= picked.mana_point
        } else if (user === match.playerTwo){
            playerTwoMana -= picked.mana_point
        }

        // set cool-down
        canPlay = false;
        setTimeout(() =>{
            canPlay = true;
        }, timeInterval * 1000) // convert seconnds into milliseconds

       
    }

    
    let countdown = timeInterval

    const countdownInterval = setInterval(() => {
        if(countdown > 0){
            countdown--
        } else{
            clearInterval(countdownInterval)
        }
    }, 1000)

    $: if(canPlay){
        countdown = timeInterval
    }
    // onDestroy(() =>{
    //     pusher.unsubscribe('match-channel')
    // })
    
    const getImageUrl = (path) => `${PUBLIC_IMAGE_URL}${path}`

    // Dynamic Hp and Mp display
    let playerOneMaxHp = playerOneHealth ?? 100
    $: playerOneCurrentHp = playerOneHealth

    let playerTwoMaxHp = playerTwoHealth ?? 100
    $: playerTwoCurrentHp = playerTwoHealth
    
    let playerOneMaxMp = playerOneMana ?? 100
    $: playerOneCurrentMp = playerOneMana

    let playerTwoMaxMp = playerTwoMana ?? 100
    $: playerTwoCurrentMp = playerTwoMana

    // reduce player onw hp and mp
    function reducePlayerOneHp(amount){
        playerOneCurrentHp = Math.max(0, playerOneCurrentHp - amount)
    }

    function reducePlayerOneMp(amount){
        playerOneCurrentMp = Math.max(0, playerOneCurrentMp - amount)
    }
    
    // reduce player two mp and hp
    function reducePlayerTwoHp(amount){
        playerTwoCurrentHp = Math.max(0, playerTwoCurrentHp - amount)
    }

    function reducePlayerTwoMp(amount){
        playerTwoCurrentMp = Math.max(0, playerTwoCurrentMp - amount)
    }

    // Reactive values for player 1's HP/MP percentage
    $: playerOneHPPercentage = (playerOneCurrentHp / playerOneMaxHp) * 100;
    $: playerOneMPPercentage = (playerOneCurrentMp / playerOneMaxMp) * 100;

    // Reactive values for player 2's HP/MP percentage
    $: playerTwoHPPercentage = (playerTwoCurrentHp / playerTwoMaxHp) * 100;
    $: playerTwoMPPercentage = (playerTwoCurrentMp / playerTwoMaxMp) * 100;
</script>
{#if match.detail}
    <h2 class="text-center font-bold">{match.detail}🔥❌</h2>
    <p class="text-green-600 text-center">Go back <a href="/" class="text-red-500 hover:underline">home</a></p>
{:else if error}
    {error}
{:else}
<div>
    <div class="flex flex-col items-center">
        <h3 class="text-lg font-semibold">Next Move In:</h3>
        <p class="text-4xl font-bold">{countdown}s</p>
    </div>
</div>
<div class="max-w-6xl mx-auto p-8 space-y-8 bg-gray-900 rounded-lg shadow-md text-white">
  <!-- Players and Stats -->
  <div class="grid grid-cols-2 gap-8">
    <!-- Player 1 -->
    <div class="flex flex-col items-center space-y-4">
      <h2 class="text-3xl font-bold">{match.playerone}</h2>
      <!-- HP and MP with progress bars -->
      <div class="w-full">
        <span class="font-semibold">HP: {playerOneCurrentHp}/{playerOneMaxHp}</span>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
          <div class="h-full bg-red-600 transition-all duration-500 ease-out" style="width: {playerOneHPPercentage}%;"></div> <!-- 75% HP -->
        </div>
      </div>
      <div class="w-full">
        <span class="font-semibold">MP: {playerOneCurrentMp}/{playerOneMaxMp}</span>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
          <div class="h-full bg-red-600 transition-all duration-500 ease-out" style="width: {playerOneMPPercentage}%;"></div> <!-- 50% MP -->
        </div>
      </div>
    </div>

    <!-- Player 2 -->
    <div class="flex flex-col items-center space-y-4">
      <h2 class="text-3xl font-bold">{match.playertwo}</h2>
      <!-- HP and MP with progress bars -->
      <div class="w-full">
        <span class="font-semibold">HP: {playerTwoCurrentHp}/{playerTwoMaxHp}</span>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
          <div class="h-full bg-red-600 transition-all duration-500 ease-out" style="width: {playerTwoHPPercentage}%;"></div> <!-- 80% HP -->
        </div>
      </div>
      <div class="w-full">
        <span class="font-semibold">MP: {playerTwoCurrentMp}/{playerTwoMaxMp}</span>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
          <div class="h-full bg-red-600 transition-all duration-500 ease-out" style="width: {playerTwoMPPercentage}%;"></div> <!-- 33% MP -->
        </div>
      </div>
    </div>
  </div>

  <!-- Played Cards -->
  <div class="grid grid-cols-2 gap-8">
    <!-- Player 1 Played Card -->
    <div class="flex flex-col items-center">
      {#if playerOneCard}
        <h3 class="text-lg font-semibold mb-2">Player One's Played Card</h3>
        <div class="w-40 h-56 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
            <div class="flex-shrink-0 bg-gray-800 h-64 w-48 rounded-lg p-4 flex flex-col items-center shadow-lg">
                <!-- Card Image -->
                <div class="w-full h-32 bg-gray-600 rounded-md mb-2 overflow-hidden">
                    <img src={getImageUrl(playerOneCard.image)} alt={playerOneCard.name} class="object-cover h-full w-full" />
                </div>

                <!-- Card Name -->
                <p class="text-center text-lg font-bold text-white mb-2">{playerOneCard.name}</p>

                <!-- Card Type -->
                <p class="text-center text-sm text-gray-400 mb-1">Type: {getType(playerOneCard.card_type)}</p>

                <!-- Card Stats -->
                <div class="text-center">
                    <!-- Attack Point -->
                    <p class="text-sm text-gray-400">Attack: {playerOneCard.attack_point}</p>

                     <!-- Defense Point -->
                     <p class="text-sm text-gray-400">Defense: {playerOneCard.defense_point}</p>
                    <!-- Rarity -->
                    <p class="text-sm text-gray-400">Rarity: {getRarity(playerOneCard.rarity)}</p>

                    <!-- Mana Point -->
                    <p class="text-sm text-gray-400">Mana: {playerOneCard.mana_point}</p>
                </div>
                
            </div>
        </div>
      {:else}
        <div class="w-40 h-56 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
            Played Card
        </div>
      {/if}
    </div>

    <!-- Player 2 Played Card -->
    <div class="flex flex-col items-center">
      {#if playerTwoCard}
        <h3 class="text-lg font-semibold mb-2">Player Two's Played Card</h3>
        <div class="w-40 h-56 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
            <div class="flex-shrink-0 bg-gray-800 h-64 w-48 rounded-lg p-4 flex flex-col items-center shadow-lg">
                <!-- Card Image -->
                <div class="w-full h-32 bg-gray-600 rounded-md mb-2 overflow-hidden">
                    <img src={getImageUrl(playerOneCard.image)} alt={playerTwoCard.name} class="object-cover h-full w-full" />
                </div>

                <!-- Card Name -->
                <p class="text-center text-lg font-bold text-white mb-2">{playerTwoCard.name}</p>

                <!-- Card Type -->
                <p class="text-center text-sm text-gray-400 mb-1">Type: {getType(playerTwoCard.card_type)}</p>

                <!-- Card Stats -->
                <div class="text-center">
                    <!-- Attack Point -->
                    <p class="text-sm text-gray-400">Attack: {playerTwoCard.attack_point}</p>

                     <!-- Defense Point -->
                     <p class="text-sm text-gray-400">Defense: {playerTwoCard.defense_point}</p>
                    <!-- Rarity -->
                    <p class="text-sm text-gray-400">Rarity: {getRarity(playerTwoCard.rarity)}</p>

                    <!-- Mana Point -->
                    <p class="text-sm text-gray-400">Mana: {playerTwoCard.mana_point}</p>
                </div>
                
            </div>
        </div>
      {:else}
        <div class="w-40 h-56 bg-gray-700 rounded-lg flex items-center  justify-center text-gray-400">
            Played Card
        </div>
      {/if}
      
    </div>
  </div>

  <!-- User's Cards to Play -->
  <div class="mt-8">
    <h3 class="text-xl font-semibold text-center mb-4">Your Cards</h3>
    <div class="flex gap-4 overflow-x-auto">
        {#each cards as card }
            <!-- Card -->
            <div class="flex-shrink-0 bg-gray-800 h-64 w-48 rounded-lg p-4 flex flex-col items-center shadow-lg">
                <!-- Card Image -->
                <div class="w-full h-32 bg-gray-600 rounded-md mb-2 overflow-hidden">
                    <img src={getImageUrl(card.image)} alt={card.name} class="object-cover h-full w-full" />
                </div>

                <!-- Card Name -->
                <p class="text-center text-lg font-bold text-white mb-2">{card.name}</p>

                <!-- Card Type -->
                <p class="text-center text-sm text-gray-400 mb-1">Type: {getType(card.card_type)}</p>

                <!-- Card Stats -->
                <div class="text-center">
                    <!-- Attack Point -->
                    <p class="text-sm text-gray-400">Attack: {card.attack_point}</p>

                     <!-- Defense Point -->
                     <p class="text-sm text-gray-400">Defense: {card.defense_point}</p>
                    <!-- Rarity -->
                    <p class="text-sm text-gray-400">Rarity: {getRarity(card.rarity)}</p>

                    <!-- Mana Point -->
                    <p class="text-sm text-gray-400">Mana: {card.mana_point}</p>
                </div>
                <div>
                    <button class="bg-red-800 w-14 rounded-sm p-1 mt-2 hover:bg-red-700 transition duration-300" on:click={() => playCard(card.id)}>play</button>
                </div>
            </div>
        {/each}
    </div>
</div>

</div>

{/if}
