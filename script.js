// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBPHCBV-LasEYN0S-f955vcgT4FGMSDyac",
    authDomain: "trialultrasonic.firebaseapp.com",
    databaseURL: "https://trialultrasonic-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trialultrasonic",
    storageBucket: "trialultrasonic.appspot.com",
    messagingSenderId: "158712235273",
    appId: "1:158712235273:web:c788d6b652e90e93ca3fd8",
    measurementId: "G-DJT59KETYM"
};
firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Fetching real sensor data
const realHumidityRef = database.ref('real/Humidity');
const realMQ135Ref = database.ref('real/MQ135');
const realMQ2Ref = database.ref('real/MQ2');
const realMQ9Ref = database.ref('real/MQ9');
const realTemperatureCRef = database.ref('real/TemperatureC');
const realTemperatureFRef = database.ref('real/TemperatureF');
const realDistance = database.ref('real/Distance');


// Real sensor data display
realHumidityRef.on('value', function(snapshot) {
    document.getElementById('realHumidity').innerText = snapshot.val() + " %";
});
realMQ135Ref.on('value', function(snapshot) {
    document.getElementById('realMQ135').innerText = snapshot.val() + " ppm";
});
realMQ2Ref.on('value', function(snapshot) {
    document.getElementById('realMQ2').innerText = snapshot.val() + " ppm";
});
realMQ9Ref.on('value', function(snapshot) {
    document.getElementById('realMQ9').innerText = snapshot.val() + " ppm";
});
realTemperatureCRef.on('value', function(snapshot) {
    document.getElementById('realTemperatureC').innerText = snapshot.val() + " °C";
});
realTemperatureFRef.on('value', function(snapshot) {
    document.getElementById('realTemperatureF').innerText = snapshot.val() + " °F";
});
realDistance.on('value', function(snapshot) {
    document.getElementById('realDistance').innerText = snapshot.val() + "cm";
});


// Fetch dummy sensor data for Dummy 1 to Dummy 5
for (let i = 1; i <= 5; i++) {
    (function(index) {
        const dummyHumidityRef = database.ref('Dummy' + index + '/Humidity');
        const dummyMQ135Ref = database.ref('Dummy' + index + '/MQ135');
        const dummyMQ2Ref = database.ref('Dummy' + index + '/MQ2');
        const dummyMQ9Ref = database.ref('Dummy' + index + '/MQ9');
        const dummyTemperatureCRef = database.ref('Dummy' + index + '/TemperatureC');
        const dummyTemperatureFRef = database.ref('Dummy' + index + '/TemperatureF');        
        const dummyDistance = database.ref('Dummy' + index + '/Distance');        


        dummyHumidityRef.on('value', function(snapshot) {
            document.getElementById('dummyHumidity' + index).innerText = snapshot.val() + " %";
        });
        dummyMQ135Ref.on('value', function(snapshot) {
            document.getElementById('dummyMQ135' + index).innerText = snapshot.val() + " ppm";
        });
        dummyMQ2Ref.on('value', function(snapshot) {
            document.getElementById('dummyMQ2' + index).innerText = snapshot.val() + " ppm";
        });
        dummyMQ9Ref.on('value', function(snapshot) {
            document.getElementById('dummyMQ9' + index).innerText = snapshot.val() + " ppm";
        });
        dummyTemperatureCRef.on('value', function(snapshot) {
            document.getElementById('dummyTemperatureC' + index).innerText = snapshot.val() + " °C";
        });
        dummyTemperatureFRef.on('value', function(snapshot) {
            document.getElementById('dummyTemperatureF' + index).innerText = snapshot.val() + " °F";
        });
        dummyDistance.on('value', function(snapshot) {
            document.getElementById('dummyDistance' + index).innerText = snapshot.val() + "Cm";
        });
    })(i);
}
function filterByTemperatureC(temp) {
    const helmetBoxes = document.querySelectorAll('.worker-box');
    helmetBoxes.forEach(box => {
        const tempSpan = box.querySelector('span[id$="TemperatureC"]'); // selects the <span> with temperature in Celsius for each chamber
        if (tempSpan) {
            const temperatureValue = parseFloat(tempSpan.innerText);
            if (temperatureValue >= temp) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        }
    });
}

// Add event listeners for each temperature filter link in the dropdown
const tempFilterLinks = document.querySelectorAll('.dropdown-content a');
tempFilterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedTemp = parseInt(e.target.innerText);
        filterByTemperatureC(selectedTemp);
    });
});


function filterByMQ135(threshold) {
    const helmetBoxes = document.querySelectorAll('.worker-box');
    helmetBoxes.forEach(box => {
        const mq135Span = box.querySelector('span[id*="MQ135"]'); // selects the <span> with MQ135 reading for each chamber
        if (mq135Span) {
            const mq135Value = parseFloat(mq135Span.innerText);
            if (mq135Value >= threshold) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        }
    });
}

// Add event listeners for each MQ135 filter link in the dropdown
const mq135FilterLinks = document.querySelectorAll('#mq135-filter a');
mq135FilterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedMQ135 = parseInt(e.target.innerText);
        filterByMQ135(selectedMQ135);
    });
});


function filterByMQ2(threshold) {
    const helmetBoxes = document.querySelectorAll('.worker-box');
    helmetBoxes.forEach(box => {
        const mq2Span = box.querySelector('span[id*="MQ2"]'); // selects the <span> with MQ2 reading for each chamber
        if (mq2Span) {
            const mq2Value = parseFloat(mq2Span.innerText);
            if (mq2Value >= threshold) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        }
    });
}

// Add event listeners for each MQ2 filter link in the dropdown
const mq2FilterLinks = document.querySelectorAll('#mq2-filter a');
mq2FilterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedMQ2 = parseInt(e.target.innerText);
        filterByMQ2(selectedMQ2);
    });
});

function filterByMQ9(value) {
    const helmetBoxes = document.querySelectorAll('.worker-box');
    helmetBoxes.forEach(box => {
        const mq9Span = box.querySelector('span[id*="MQ9"]'); // selects the <span> with MQ9 level for each chamber
        if (mq9Span) {
            const mq9Value = parseInt(mq9Span.innerText);
            if (mq9Value >= value) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        }
    });
}

// Add event listeners for each MQ9 filter link in the dropdown
const mq9FilterLinks = document.querySelectorAll('.dropdown-content a');
mq9FilterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedMQ9 = parseInt(e.target.innerText);
        filterByMQ9(selectedMQ9);
    });
});

// Define the threshold values
const thresholds = {
    temperatureC: 35,
    mq135: 650,
    mq2: 380,
    mq9: 50
};

// ——— NEW checkThresholds() ——— 
function checkThresholds() {
    const workerBoxes = document.querySelectorAll('.worker-box');
    let message = '';

    workerBoxes.forEach(box => {
        // --- reset any previous styling ---
        box.classList.remove('blinking-border');
        box.querySelectorAll('span').forEach(span => {
            span.classList.remove('highlight-red');
        });

        // track if this box needs blinking
        let boxExceeded = false;
        const chamberName = box.querySelector('h2').innerText;

        // --- Temperature C ---
        const tempSpan = box.querySelector('span[id*="TemperatureC"]');
        if (tempSpan) {
            const tempValue = parseFloat(tempSpan.innerText) || 0;
            if (tempValue > thresholds.temperatureC) {
                tempSpan.classList.add('highlight-red');
                message += `Warning: ${chamberName} has exceeded the Temperature threshold! (Temperature C: ${tempValue})\n`;
                boxExceeded = true;
            }
        }

        // --- MQ135 ---
        const mq135Span = box.querySelector('span[id*="MQ135"]');
        if (mq135Span) {
            const mq135Value = parseFloat(mq135Span.innerText) || 0;
            if (mq135Value > thresholds.mq135) {
                mq135Span.classList.add('highlight-red');
                message += `Warning: ${chamberName} has exceeded the MQ135 threshold! (MQ135: ${mq135Value})\n`;
                boxExceeded = true;
            }
        }

        // --- MQ2 ---
        const mq2Span = box.querySelector('span[id*="MQ2"]');
        if (mq2Span) {
            const mq2Value = parseFloat(mq2Span.innerText) || 0;
            if (mq2Value > thresholds.mq2) {
                mq2Span.classList.add('highlight-red');
                message += `Warning: ${chamberName} has exceeded the MQ2 threshold! (MQ2: ${mq2Value})\n`;
                boxExceeded = true;
            }
        }

        // --- MQ9 ---
        const mq9Span = box.querySelector('span[id*="MQ9"]');
        if (mq9Span) {
            const mq9Value = parseFloat(mq9Span.innerText) || 0;
            if (mq9Value > thresholds.mq9) {
                mq9Span.classList.add('highlight-red');
                message += `Warning: ${chamberName} has exceeded the MQ9 threshold! (MQ9: ${mq9Value})\n`;
                boxExceeded = true;
            }
        }

        // --- apply blinking border if any value exceeded ---
        if (boxExceeded) {
            box.classList.add('blinking-border');
        }
    });

    // show or clear your top alert as before
    if (message) {
        showAlert(message);
    } else {
        // optional: clear old alerts if none currently exceeding
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = '';
    }
}

// Call the updated checkThresholds function periodically
setInterval(checkThresholds, 3000); // every 3 seconds