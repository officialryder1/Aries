<script>
    export let name;
    export let description;
    export let image
    export let second_image
    import {PUBLIC_URL} from "$env/static/public"

    const getImageUrl = (path) => `${PUBLIC_URL}${path}`
    
</script>

<div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden container mt-10">
    <img class="w-full h-48 object-cover object-center p-5" src={getImageUrl(image)} alt={name}>
    <div class="p-4">
        <h2 class="text-gray-900 font-bold text-2xl mb-2">{name}</h2>
        <p class="text-gray-700 text-base mb-4">{description}</p>
        <div class="flex justify-center">
            <img class="w-24 h-24 object-cover rounded-full border-2 border-gray-300" src={getImageUrl(second_image)} alt={name}>
        </div>
        <div class="flex justify-center items-center">
            <slot/>
        </div>
    </div>
</div>
