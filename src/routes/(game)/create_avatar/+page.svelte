<script>
    import CreateAvatar from '$lib/components/ui/Avatar/CreateAvatar.svelte';
	import Cards from '$lib/components/ui/card/cards.svelte';
    export let data;

    
    export let characters = data?.characters
    export let cards = data?.cards
    let user = data?.user?.id || null
    console.log(user)
    
    let showCard = false
    let showCharacter = true
 
    
</script>

{#if showCharacter}
    <CreateAvatar {characters} {user} bind:showCard bind:showCharacter/>
{/if}

{#if showCard}
    <Cards {cards}/>
{/if}