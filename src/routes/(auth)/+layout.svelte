<script>
    import "../../app.pcss"
    import LoginNav from "$lib/components/ui/nav/loginNav.svelte";

    let brandName = 'Aries'
    let links = [
        {href: '/', name: 'Profile'},
        {href: '/', name: 'Setting'},
        {href: '/', name: 'Sign out'},
        
    ]
    let mobile_links = [
        {href: '/', name: 'Profile'},
        {href: '/', name: 'Setting'},
        {href: '/', name: 'Sign out'},
        
    ]


    let core_links = [
        {href: '/', name: 'Note'},
        {href: '/', name: 'Game'},
        {href: '/', name: 'Create profile'},

    ]
    let mobile_core_links = [
        {href: '/', name: 'Note'},
        {href: '/', name: 'Game'},
        {href: '/', name: 'Create profile'},

    ]
    
    
</script>

<LoginNav {brandName}/>

<main class="h-dvh bg-gray-800">
    <div class="text-gray-200 container">
        <slot></slot>
    </div>
    
</main>
<style>
    
</style>