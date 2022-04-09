<script>
    import PanelComp from "$lib/panelComp.svelte";
	import {loggedin$} from '../firebase';
    const user = loggedin$;
    let toPass;

</script>
    {#if $user !== undefined}
        <p style="display: none;">{toPass = $user}</p>
        <PanelComp currentuser={toPass}/>
        {:else} 
        <p>Are you logged in? If not <a href="/">click here</a></p>
    {/if}
