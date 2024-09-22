const hIn = document.getElementById('hIn');
const wIn = document.getElementById('wIn');
const ageIn = document.getElementById('age');
const genderIn = document.getElementById('gender');
const bmi = document.getElementById('bmi');
let bmiVal = 0;

// Function to validate and calculate BMI
const calculateBMI = () => {
    let hInVal = hIn.value / 100;
    let wInVal = wIn.value;
    let ageVal = ageIn.value;
    let genderVal = genderIn.value;

    if (hInVal && wInVal && ageVal && genderVal) { // Ensure all fields are filled
        let hInSqr = hInVal * hInVal;
        bmiVal = (wInVal / hInSqr).toFixed(2);

        if (ageVal >= 18) {
            bmi.innerHTML = bmiVal; // Display the BMI value
            displayChart(); // Display the updated chart
        } else {
            bmi.innerHTML = "This calculator is for adults only.";
        }
    } else {
        // Clear BMI display if any field is missing
        bmi.innerHTML = "Please fill in all the fields.";
    }
};

// Event listeners for input fields
hIn.addEventListener('input', calculateBMI);
wIn.addEventListener('input', calculateBMI);
ageIn.addEventListener('input', calculateBMI);
genderIn.addEventListener('change', calculateBMI);

// Display the BMI chart using zingchart
const displayChart = () => {
    var myConfig = {
        type: "gauge",
        globals: { fontSize: 25 },
        plotarea: { marginTop: 80 },
        plot: {
            size: '100%',
            valueBox: {
                placement: 'center',
                text: '%v', //default
                fontSize: 25,
                rules: [
                    { rule: '%v >= 27.5', text: '%v<br>Obese' },
                    { rule: '%v < 27.5 && %v > 23', text: '%v<br>Overweight' },
                    { rule: '%v < 23 && %v > 18.5', text: '%v<br>Healthy' },
                    { rule: '%v < 18.5', text: '%v<br>Underweight' }
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
            item: { offsetR: 0 },
            ring: {
                size: 50,
                rules: [
                    { rule: '%v <= 18.5', backgroundColor: '#29B6F6' },
                    { rule: '%v > 18.5 && %v <= 23', backgroundColor: '#00E400' },
                    { rule: '%v > 23 && %v <= 27.5', backgroundColor: '#FFA726' },
                    { rule: '%v > 27.5', backgroundColor: '#E53935' }
                ]
            }
        },
        series: [
            {
                values: [Number(`${bmiVal}`)],
                backgroundColor: 'black',
                indicator: [10, 3, 10, 10, 0.75],
                animation: {
                    effect: 2,
                    method: 1,
                    sequence: 4,
                    speed: 900
                }
            }
        ]
    };

    zingchart.render({
        id: 'bmi-chart',
        data: myConfig,
        height: 500,
        width: '100%'
    });
};

// Register a Service Worker
const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker is not supported on this browser.');
    } else {
        return ('serviceWorker' in navigator);
    }
}

// Register service worker function
const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('/pwa-BMI-calculator/sw.js', { scope: '/pwa-BMI-calculator/' })
        .then(function (registration) {
            console.log('[Service Worker] Registration succeeded', registration);
        }).catch(function (error) {
            console.log('[Service Worker] registration failed:', error);
        });
    return swRegistration;
}

// Consolidate the functions to trigger upon page load
const main = async () => {
    check();
    const swRegistration = await registerServiceWorker();
}

window.addEventListener('load', () => {
    main();
});
