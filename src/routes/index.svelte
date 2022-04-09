<script>
	import {loggedin$} from '../firebase';
    import Header from '$lib/Header.svelte'
    import Main from '$lib/Main.svelte'
    import Login from '$lib/Login.svelte'
	import { onMount } from 'svelte';
	

	const user = loggedin$;
    let title = 'kur';
    let isLoaded = false;

    onMount(() => {
        isLoaded = true;
    });
</script>

    {#if !isLoaded}
	<div class="centered">
		<img src="loading.svg" alt="" srcset="">
	</div>
		

	{:else}
        <div>
            <div class="centered">
                <div>
                    <Login user={user}/>
                    <Main />
                </div>
            </div>
                
        </div>
    {/if}

<style>
    
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
    
</style>