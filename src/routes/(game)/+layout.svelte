<script>
    import "../../app.pcss"
    import Nav from "$lib/components/ui/nav/nav.svelte";

    let brandName = 'Aries'
    let links = [
        {href: '/profile', name: 'Profile'},
        {href: '/', name: 'Setting'},
        {href: '/api/logout', name: 'Sign out'},
        
    ]
    let mobile_links = [
        {href: '/profile', name: 'Profile'},
        {href: '/', name: 'Setting'},
        {href: '/api/logout', name: 'Sign out'},
        
    ]


    let core_links = [
        {href: '/', name: 'Note'},
        {href: '/game', name: 'Game'},
        {href: '/create_avatar', name: 'Create profile'},

    ]
    let mobile_core_links = [
        {href: '/', name: 'Note'},
        {href: '/game', name: 'Game'},
        {href: '/create_avatar', name: 'Create profile'},

    ]
    
    
</script>
<Nav {links} {core_links} {mobile_links} {brandName} {mobile_core_links}/>
<div class="container mt-64">
    <slot></slot>
</div>
