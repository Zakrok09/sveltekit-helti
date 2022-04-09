<script>
    export let databaseRef;
    let saveRef = databaseRef;
</script>

<style>

    #display {
        height: 100%;
        padding: 0px 10px;
        background-color: #1f1b1b;
    }

    #avatar_part {
        display: flex;
        justify-content: center;
    }

    #avatar {
        vertical-align: middle;
        width: 100px;
        height: 100px;
        border-radius: 10%;
        margin-top: 10px;
        margin-bottom: 50px;
    }

    #text {
        text-align: center;
        color: azure;
    }

    * {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

</style>

<div id="display">
    <div id="avatar_part">
        <img id="avatar" src="images/raven.png" alt="">
    </div>
    <div id="text">
        <p>{saveRef.email}</p>
        <p>{saveRef.name}</p>
        <p>{saveRef.type}</p>
    </div>

</div>