<script>
    import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
    import { isLoggedIn } from "../stores"
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import {logout, db, auth} from '../firebase';
    import Profile from '$lib/Profile.svelte';
    import Header from '$lib/Header.svelte';

	  export let currentuser;
    
    let current_user_doc_id;
    
    $: arrList = []
    async function getCurrentUserInfo()  {
        try {
            // @ts-ignore
            const currentUserQuery = query(collection(db, 'users'), where("email", "==", currentuser.email));
            const querySnapshot = await getDocs(currentUserQuery);
            querySnapshot.forEach((doc) => {
                arrList.push(doc.data());
                // @ts-ignore
                current_user_doc_id = doc._document.key.path.segments[6];
            });
            return arrList;
        } catch(err) {
            console.error(err);
        }
    }
    
    let arrListPromis = getCurrentUserInfo();
    


    function callLogout() {
        logout();
    };

    let panelState = 'records';
    function changeState(s)  {
      if (s === 0) {
        panelState = 'records'
      } else if (s === 1) {
        panelState = 'map'
      } 
    }

    let record1;
    let record2;
    let record3;
    let record4;
    let record5;

    async function addRecord() {
        let appointments_import = await arrList[0].appointments;
        let appointmentsRef = doc(db, "users", current_user_doc_id);
        await appointments_import.push({
            appoint: record1,
            doctor: record2,
            desease: record3,
            info: record4,
            place: record5,
        });
    await updateDoc(appointmentsRef, {
        appointments: appointments_import      
    })
    }
</script>
<div id="panel" >
    {#if currentuser}
        {#await arrListPromis}
            <img src="loading.svg" alt="" srcset="">
        {:then loggedUser}
            {#if loggedUser[0].type === 'patient'}
                <div id="center_panel">
                <aside id="profile">
                    <Profile databaseRef={loggedUser[0]} />
                </aside> 

                <div id="panel_main">
                    <div id="add-record-div">
                    <h2>Add a record:</h2>
                    <div id="inputs">
                        <div id="input_a"> <span>Appointment</span> <input type="text" class="inputs" bind:value={record1}> </div>
                        <div id="input_doc"> <span>Doctor</span> <input type="text" id="input_doc_input" class="inputs" bind:value={record2}> </div>
                        <div id="input_bol"> <span>Desease</span> <input type="text" id="input_bol_input" class="inputs" bind:value={record3}> </div>
                        <div id="input_inf"> <span>Information</span> <textarea type="text" id="input_inf_input" class="inputs" bind:value={record4} /> </div>
                        <div id="input_plc"> <span>Place</span> <input type="text" id="input_plc_input" class="inputs" bind:value={record5}> </div>
                        <button id="add_rec_button" on:click={addRecord}>Add record</button>
                    </div>
                    </div>
                </div>
                

                </div>
                

                {:else}
                <p>kur</p>
            {/if}
        {/await}
    {:else} 
        <p>plz return to menu</p>
        <a href="/">dawdaw</a>
    {/if}  
</div>


<style>
    #panel {
      display: flex;
      justify-content: center;
    }
  
    #center_panel {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template: 90vh / 200px 1fr;
      gap: 10px;
    }
  
    #profile {
      border-top-color: #242020;
      border-top-width: 3px;
      border-top-style: solid;
      grid-area: 1 / 1 / span 1 / span 1;
      height: 100%;
      overflow: hidden;
    }
  
    #panel_main {
      grid-area: 1 / 2 / span 1 / span 1;
      display: flex;
    }
  
    * {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  
    #inputs {
      display: flex;
      flex-direction: column;
      grid-area: 1 / 1 / span 1 / span 1;
      display: grid;
      grid-template: 1fr 1fr 3fr 1fr 1fr / 3fr 2fr;
      gap: 0px 25px;
    }
  
    #input_bol {
      grid-area: 2 / 1 / span 1 / span 2;
      width: 100%;
    }
  
    #input_inf {
      grid-area: 3 / 1 / span 1 / span 2;
      height: 100%;
    }
  
    #input_inf_input {
      height: 70%;
      resize: none;
    }
  
    #input_plc {
      grid-area: 4 / 1 / span 1 / span 1;
    }
    #add-record-div {
      width: 400px;
    }
  
    #add_rec_button {
      grid-area: 4 / 2 / span 1 / span 2;
      width: 90%;
      height: 80%;
      margin: 10% 0;
      cursor: pointer;
      border: solid #76282f 2px;
    }
  
    #add_rec_button:hover {
      background-color: #76282f;
    }
  
    .inputs {
      width: 100%;
      height: 15px;
      margin-bottom: 5px;
      border: 1px solid;
      border-radius: 4px;
      font-size: 1rem;
      padding: 0.5rem;
      transition: border-color 0.5s ease-out;
    }
  
  </style>