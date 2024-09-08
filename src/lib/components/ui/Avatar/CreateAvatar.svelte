<script>
    import { enhance } from '$app/forms'
	import Avatar from "./Avatar.svelte";
    export let characters
    export let showCard
    export let showCharacter

    function toggleShow(){
        showCharacter = false
        showCard = true
    }


  
</script>

<div class="flex flex-wrap justify-center gap-2 p-4">
    {#each characters as {name, description, image, second_image, id} }
        <Avatar {name} {description} {image} {second_image}>
            <form method="POST" use:enhance={toggleShow}>
                <input type="text" name="id" value="{id}" hidden>
                <button class="bg-blue-500 w-full px-4 py-2 rounded-lg mt-5 hover:bg-blue-600 transition-colors duration-300">Select</button>
            </form>
        </Avatar>
    {/each}    
</div>