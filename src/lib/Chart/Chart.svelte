<script>
// @ts-nocheck

    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    Chart.register(...registerables);
    let chart;
    const config = {
        type: 'line',
        data: {
            labels: ['Jul 2021', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 2022', 'Feb', 'Mar'],
            datasets: [{
                label: 'Total cases',
                data: [7700, 22386, 42020, 82910, 113229, 95207, 200142, 261402, 189243],
                borderColor: '#76282f',
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                xAxis: {
                    ticks: {
                        display: true
                    },
                    grid: {
                        display: false
                    }
                },
                yAxis: {
                    ticks: {
                        display: true
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Number of active cases in Bulgaria for every 25th day of the month'
                },
                legend: {
                display: false,
                },
                tooltip: {
                    displayColors: false
                }
            },
            elements: {
                point: {
                    radius: 1,
                    hoverRadius: 4,
                    backgroundColor: '#76282f'
                }
            }
        }
    };
    onMount(() => {
        const ctx = chart.getContext('2d');
        var myChart = new Chart(ctx, config)
    })
</script>

<style>
  #myChart {
    margin-top: 20px; }
</style>

<canvas id="myChart" bind:this={chart} style="width:100%;max-width:700px;height: 200px; min-height: 160px;" aria-label="A chart describing the number of active covid cases in Bulgaria" role="img">></canvas>