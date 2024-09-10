<script>
    import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error.message}</h1>
<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-yellow-400">{status}</h1>
      <p class="text-2xl mt-4">{$page.error?.message ?? 'Something went wrong!'}</p>
      <p class="mt-2 text-gray-400">
        {#if $page.status === 404}
          It looks like the page you're looking for doesn't exist.
        {:else}
          An unexpected error has occurred.
        {/if}
      </p>
  
      <a href="/" class="mt-6 inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300">
        Go Back Home
      </a>
    </div>
  </div>