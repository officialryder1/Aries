<script>
    import RegistrationForm from "$lib/components/ui/form/registrationForm.svelte";

    export let form
</script>

<div class="h-dvh">
    <h1 class="text-center font-extrabold text-5xl tracking-wider p-10">Signup</h1>
    <RegistrationForm {form}/>
</div>