<script>
    import "../../app.pcss"
    import Nav from "$lib/components/ui/nav/nav.svelte";

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

<Nav {links} {core_links} {mobile_links} {brandName} {mobile_core_links}/>

<slot></slot>
