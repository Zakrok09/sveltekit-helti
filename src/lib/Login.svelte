<script>
// @ts-nocheck

    import {  auth, loginWithEmailPassword, newAccount, db} from '../firebase';
    import { collection, addDoc } from "firebase/firestore";
    import { fly, slide } from 'svelte/transition';
    
    let registerPanel = false;
    export let user;
  
    async function login(email, pass) {
      try {
        await loginWithEmailPassword(email, pass).then((usercred) => {
          let user = usercred.user;
          localStorage.setItem('uid', user.uid);
          localStorage.setItem('isLoggedIn', true);
        });
      } catch (error) {
        console.log(error)
      } 
    }
  
    // register params
    let firstName = '';
    let gender = '';
    let type = '';
    let accType;
    let name = '';
    let pass = '';
  
    async function register(email, pass) {
      try {
        await newAccount(email, pass);
        const docRef = await addDoc(collection(db, "users"), {
          name: firstName,
          type: accType,
          gender: gender,
          email: name,
          appointments: []
        })
        
      } catch (error) {
        if (error.toString() === "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
          alert('yo yo yo')
        }
      }
    }
  
    function toggleRegister() {
      registerPanel = !registerPanel;  
    }
  
  
      function logout() {
          auth.signOut();
      }
  </script>
  
  <article id="login_form_div">
      <!-- Login with two sections -->
      <section id="login_form_info">
          
      </section>
      <section id="login_form">
        {#if $user === null}
          {#if !registerPanel}
          <form in:slide id="login_form_tag" action="">
            <div class="container">
              <div class="form_text_box">
                <input class="form_input" type="text" placeholder="" name="uname" required id="email_field" bind:value={name}>
                <label class="from_label" for="uname">Username</label>
                <span class="form_span"></span>
              </div>
              <div class="form_text_box">
                <input class="form_input" type="password" placeholder="" name="psw" required id="pass_field" bind:value={pass}>
                <label class="from_label" for="psw">Password</label>
                <span class="form_span"></span>
              </div>
              <div class="form_pass">Forgor password?</div>
              <button on:click={login(name,pass)} type="button" class="submit_btn">Login</button>
              <!-- svelte-ignore a11y-missing-attribute -->
              <span id="register">Don't have an account? <a class="clickable" on:click={toggleRegister}>Sign up</a></span>
            </div>
            </form>
          {:else}
            
          <section in:slide  id="login_form">
            <form action="">
                <div class="container">
                    <div class="form_text_box">
                        <input class="form_input" type="text" placeholder="" name="uname" required id="email_field" bind:value={name}>
                        <label class="from_label" for="uname">E-mail</label>
                        <span class="form_span"></span>
                    </div>
                    <div class="form_text_box">
                        <input class="form_input" type="password" placeholder="" required id="pass_field" bind:value={pass}>
                        <label class="from_label" for="psw">Password</label>
                        <span class="form_span"></span>
                    </div>
                    <div class="form_text_box">
                        <input class="form_input" type="text" placeholder="" required id="name_field" bind:value={firstName}>
                        <label class="from_label" for="psw">First Name</label>
                        <span class="form_span"></span>
                    </div>
                    <div class="form_text_box">
                        <input class="form_input" type="text" placeholder="" required id="sex_field" bind:value={gender}>
                        <label class="from_label" for="psw">Sex</label>
                        <span class="form_span"></span>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <input type="radio" name="acc_type" value="patient" bind:group={accType} id="acc_type_patient">
                        <label for="acc_type_patient">Patient</label>
                        <input type="radio" name="acc_type" value="doc" bind:group={accType} id="acc_type_doc">
                        <label for="acc_type_doc">Doctor</label>
                    </div>
  
                    <button on:click={register(name, pass)} type="button" class="submit_btn">Register</button>
                    <span class="clickable" on:click={toggleRegister}>Already have an account?</span>
                </div>
            </form>
        </section>
  
          {/if}
            
        {:else}
            <div in:fly id="loggedin">
                <span>Hello there, </span>
                <span id="usaer_span">{$user ? $user.email : 'loading...'}</span>
                <a href="/panel" id=""><button type="button" class="submit_btn">Access Panel</button></a>
                <span id="logged_in_logout" on:click={logout}>Log out.</span>
            </div>
        {/if}
      </section>
  </article>


  <style>
    .clickable {
      cursor: pointer;
      color: #252422;
    }
  
      #login_form_div {
    display: grid;
    grid-template: 700px / 2fr 3fr;
    background-image: url("phonefr.png");
    border-bottom: #252422 15px solid; }
  
  
  
    #login_form_info {
    grid-area: 1 / 2 / span 1 / span 1;
    display: flex;
    justify-content: center;
    align-items: center; }
  
    #login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; }
    #login_form form {
      padding: 0 40px;
      box-sizing: border-box;
      border-radius: 25px;
      overflow: hidden;
      font-size: 1.2em; }
      #login_form form .form_text_box {
        position: relative;
        border-bottom: 1px solid;
        margin-bottom: 20px;
        margin: 20px 0; }
        #login_form form .form_text_box input {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          font-size: 16px;
          height: 30px; }
        #login_form form .form_text_box label {
          position: absolute;
          top: 50%;
          left: 5px;
          font-size: 16px;
          color: #adadad;
          transform: translateY(-50%);
          pointer-events: none; }
        #login_form form .form_text_box span::before {
          content: '';
          position: absolute;
          top: 31px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: #76282f;
          transition: 0.5s; }
        #login_form form .form_text_box .form_input:focus + .from_label {
          top: -5px; }
        #login_form form .form_text_box .form_input:valid + .from_label {
          top: -5px; }
        #login_form form .form_text_box .from_label {
          transition: .2s; }
        #login_form form .form_text_box .form_input:focus ~ .form_span::before {
          width: 100%; }
    #login_form .container {
      display: flex;
      flex-direction: column;
      width: 200px;
      padding: 30px;
      padding-top: 10px;
      font-family: sans-serif;
      font-weight: 100;
      background-color: #F8F9FA;
      border-radius: 10px; }
      #login_form .container .submit_btn {
        border: none;
        cursor: pointer;
        padding: 14px 28px;
        border: solid #76282f 2px; }
      #login_form .container .submit_btn:hover {
        background-color: #76282f; }
      #login_form .container .form_pass {
        margin: -5px 0 20px 5px;
        color: #a6a6a6;
        font-size: 14px; }
      #login_form .container .form_pass:hover {
        text-decoration: underline;
        cursor: pointer; }
      #login_form .container span {
        margin-top: 15px;
        margin-bottom: -10px;
        font-size: 0.6em;
        text-align: center;
        color: #a6a6a6; }
  
    #loggedin {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 200px;
    height: 150px;
    border-radius: 5px;
    font-family: sans-serif;
    background-color: #F8F9FA;
    color: #838383; }
    #loggedin #usaer_span {
      margin-bottom: 20px; }
    #loggedin #logged_in_logout {
      margin-top: 10px;
      font-size: 0.9em;
      cursor: pointer; }
  </style>