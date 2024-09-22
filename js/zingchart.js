const displayChart=() => {
    var myConfig = {
        type: "gauge",
        globals: { fontSize: 25 },
        plotarea: { marginTop: 80 },
        plot: {
            size: '100%',
            valueBox: {
                placement: 'center',
                text: '%v', //default
                fontSize: 35,
                rules: [
                    {
                        rule: '%v >= 27.5',
                        text: '%v<br>Obese'
                    },
                    {
                        rule: '%v < 27.5 && %v > 23',
                        text: '%v<br>Overweight'
                    },
                    {
                        rule: '%v < 23 && %v > 18.5',
                        text: '%v<br>Healthy'
                    },
                    {
                        rule: '%v < 18.5',
                        text: '%v<br>Underweight'
                    }
                ]
            }
        },
        tooltip: {
            borderRadius: 5
        },
        scaleR: {
            aperture: 180,
            minValue: 0,
            maxValue: 40,
            step: 0.1,
            center: { visible: false },
            tick: { visible: false },
            item: {
                offsetR: 0,

            },
            //labels: ['','','','','18.5','23','27.5','','40'],
            ring: {
                size: 50,
                rules: [
                    {
                        rule: '%v <= 18.5',
                        backgroundColor: '#29B6F6'
                    },
                    {
                        rule: '%v > 18.5 && %v <= 23',
                        backgroundColor: '#00E400'
                    },
                    {
                        rule: '%v > 23 && %v <= 27.5',
                        backgroundColor: '#FFA726'
                    },
                    {
                        rule: '%v > 27.5',
                        backgroundColor: '#E53935'
                    }
                ]
            }
        },
        series: [{
            values:[Number(`${bmiVal}`)], // starting value
            backgroundColor: 'black',
            indicator: [10, 3, 10, 10, 0.75],
            animation: {
                effect: 2,
                method: 1,
                sequence: 4,
                speed: 900
            }
        }]
    };
   
    zingchart.render({
        id: 'bmi-chart',
        data: myConfig,
        height: 500,
        width: '100%'
    });
}