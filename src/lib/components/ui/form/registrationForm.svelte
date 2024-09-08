<script>
    import { enhance } from '$app/forms'

    export let form
    console.log(form)
    let myForm

</script>

<form method="POST" use:enhance bind:this={myForm} class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg ">

    <div class="mb-4">
        <label for="username" class="block text-gray-700 mb-2 font-bold">Username</label>
        <input 
            type="text"
            name="username"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter Username"
            required
            >
    </div>
    <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2 font-bold">Email</label>
        <input 
            type="email"
            name="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter Email"
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
    <div class="mb-4">
        <label for="password" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
        <input 
            type="password"
            name="password2"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder=" confirm password"
            required
            >
    </div>
    <div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 bg-">
            Submit</button>
    </div>

    <!-- Display any form validation message passed from the server -->
    {#if form?.error}
     <p class="text-red-500 mt-5 font-bold text-center">{form.error}</p>
    {/if}
    <p class="text-center text-gray-900 mt-3 font-bold">Already have an account? <a href="/auth/login" class="text-blue-500 hover:underline">login</a></p>
</form>