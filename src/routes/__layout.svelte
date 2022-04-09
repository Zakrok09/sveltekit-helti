<script>
    import { app } from '../firebase';
    import { onMount } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import { isLoggedIn, currentuser } from "../stores"
    import Header from "$lib/Header.svelte"

    onMount(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                isLoggedIn.update(() => true);
                // @ts-ignore
                currentuser.update(() => user);
            } else {
                isLoggedIn.update(() => false);
                currentuser.update(() => null);
                goto("/");
            }
        });
    });

</script>

<Header />

<slot user={currentuser} />