<script>
    import LoginForm from  "$lib/components/ui/form/loginForm.svelte"
    export let form;
    
    
</script>

<div>
    <h1 class="text-center font-extrabold text-5xl tracking-wider p-10" >Login</h1>
    <LoginForm {form}/>
</div>