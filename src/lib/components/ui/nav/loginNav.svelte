<script>
    import { ModeWatcher } from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    
    
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    export let links = []
    export let brandName = "MySite"
    export let core_links = []
    export let mobile_core_links = []
    export let mobile_links = []

    let isMenuOpen = false;
    let isFullOpen = false;
    
    const toggleMemu = () => {
        isMenuOpen = !isMenuOpen
    }

    const toggleMenu = () => {
        isFullOpen = !isFullOpen
    }
</script>
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
<div class="min-h-full">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">{brandName}</a>

                {#each core_links as {href, name} }
                    <a href={href} class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{name}</a>
                {/each}
              </div>
            </div>
          </div>
    </nav>  
</div>
  
<style>
    /* .navbar-menu {
        display: flex;
    }

    .navbar-menu.is-active {
        display: block;
    }

    @media (max-width: 768px) {
        .navbar-burger {
            display: flex;
        }

        .navbar-menu {
            display: none;
            flex-direction: column;
            width: 100%;
        }

        .navbar-menu.is-active {
            display: flex;
        }
    } */
</style>