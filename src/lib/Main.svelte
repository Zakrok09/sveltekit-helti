<script>
	import Chart from '$lib/Chart/Chart.svelte';
</script>

<style>
    main {
  width: 100%; }

  #info_boxes {
  margin-top: 50px;
  display: flex;
  margin: 40px 20%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: sans-serif; }
  #info_boxes #info_boxes_text {
    font-size: 1.5em;
    font-weight: 300; }
</style>

<main>
    <article id="info_boxes">
        <section id="info_boxes_text">
            <span>We are Praxidike and we love helping people. Our team made this app to make the process of keeping appointment records safe and easy to use. Register as a patient or a doctor and check our tutorial <a href="https://youtu.be/Y4knOpRMoxs">here</a>.</span>
        </section>
        <Chart />
    </article>
    <article id="map_with_stats">
        <div id="map"></div>
    </article>
</main>