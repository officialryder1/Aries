<script>
    import { getRarity, getType } from '$lib/utils/rarity'

    import { PUBLIC_IMAGE_URL } from '$env/static/public'

    export let name
    export let description
    export let image
    export let card_point
    export let card_type
    export let attack_point
    export let defense_point
    export let can_nullify
    export let rarity
    export let mana_point
    export let id
  
    
    const getImageUrl = (path) => `${PUBLIC_IMAGE_URL}${path}`
</script>

<div class="flex justify-center p-4">
    <p hidden>{id}</p>
    <div class="w-80 h-99 bg-white shadow-lg rounded-lg overflow-hidden">
       <div class="flex justify-center mt-4">
        <img src={getImageUrl(image)} alt={name} class="w-24 h-24 object-cover rounded-full border-2 border-grey-300">
       </div>
        <div class="p-4 text-center">
            <h2 class="text-gray-900 font-bold text-xl mb-2">{name}</h2>
            <p class="text-gray-700 text-sm mb-4">{description}</p>

            <div class="flex justify-between items-center mb-4">
                <span class="text-blue-500 font-bold">Card Point: {card_point}</span>
                <span class="text-purple-500 font-bold">Card Type: {getType(card_type)}</span>
            </div>
            <div class="flex justify-between items-center mb-4">
                <span class="text-blue-500 , font-bold">Rarity: {getRarity(rarity)}</span>
                <span class="text-purple-500 font-bold">Mana Point: {mana_point}</span>
            </div>

            <div class="flex justify-between items-center mb-4">
                <div class="text-center">
                    <h3 class="text-red-500 font-bold text-lg">Attack</h3>
                    <p class="text-gray-700 text-base">{attack_point}</p>
                </div>
                <div class="text-center">
                    <h3 class="text-green-500 font-bold text-lg">Defense</h3>
                    <p class="text-gray-700 text-base">{defense_point}</p>
                </div>
            </div>

            
            <div class="flex items-center justify-between">
                <span class="text-blue-600 font-semibold">Can Nullify:</span>
                <span class="text-red-500 font-bold">{can_nullify}</span>
            </div>
            <div class="flex items-center justify-center">
                <slot/>
            </div>
        </div>
    </div>
</div>