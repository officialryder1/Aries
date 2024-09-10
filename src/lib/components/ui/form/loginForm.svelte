<script>
    import { enhance } from '$app/forms'

    export let form
    console.log(form)
    let myForm

    const handleError = () =>{

    }
</script>

<form method="POST" use:enhance={handleError} bind:this={myForm} class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg ">

    <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bolf mb-2 font-bold">Username</label>
        <input 
            type="text"
            name="username"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter Username"
            required
            >
    </div>
    <div class="mb-4">
        <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
        <input 
            type="password"
            name="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="password"
            required
            >
    </div>
    <div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 bg-">
            Submit</button>
    </div>
    <p class="text-gray-900 p-2 text-center font-medium">Don't have an account? <a href="/auth/signup" class="text-red-600 underline">signup today</a></p>
    <!-- Display any form validation message passed from the server -->
    {#if form?.error}
     <p class="text-red-500 mt-5 font-bold">{form.error}</p>
    {/if}
</form>