/**
 * @param dateStartType type of start date, either starting from current date or provided date
 * @param runTo type of time count, either counting to time or to a specific date
 * @param providedDateStart start date if provided manually
 * @param dateEndInText date to end the timer if the runTo type is date
 */
export function getTemplate({
    dateStartType = 'now',
    runTo = 'time',
    providedDateStart = new Date().toString(),
    dateEndInText = new Date().toString(),
    timeRun = { days: 5, hours: 0, minutes: 0, seconds: 0 },
}) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- <script src="./script.js"></script> -->
        <style>
          .time-holder {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            column-gap: 10px;
            height: auto;
            width: 100%;
            /* border: 1px solid black; */
            overflow: auto;
            max-width: 500px;
            margin: auto;
          }
    
          .time-container {
            border-radius: 8px;
            background-color: #feeaeb;
            color: #f64f59;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: system-ui;
            flex-grow: 1;
            /* width:  */
            /* padding: 15px 30px; */
            max-width: 125px;
            max-height: 128px;
            padding: 5px;
          }
    
          .time-number,
          .time-unit {
            margin: 0;
            padding: 0;
            font-weight: 100;
          }
    
          .time-number {
            font-weight: 600;
            font-size: 60px;
          }
    
          .time-unit {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 15px;
          }
    
          @media screen and (max-width: 425px) {
            .time-number {
              font-size: 30px;
            }
    
            .time-unit {
              font-size: 12px;
              margin-bottom: 10px;
            }
          }
    
          @media screen and (max-width: 319px) {
            .time-container {
              /* padding: 2px; */
            }
    
            .time-number {
              font-size: 16px;
            }
    
            .time-unit {
              font-size: 10px;
              margin-bottom: 0;
            }
          }
        </style>
      </head>
      <body>
        <main class="time-holder">
          <!-- Days -->
          <div class="time-container">
            <h1 class="time-number" id="days">00</h1>
            <h3 class="time-unit">DAYS</h3>
          </div>
          <!-- Hours -->
          <div class="time-container">
            <h1 class="time-number" id="hours">00</h1>
            <h3 class="time-unit">HOURS</h3>
          </div>
          <!-- Minutes -->
          <div class="time-container">
            <h1 class="time-number" id="minutes">00</h1>
            <h3 class="time-unit">MINS</h3>
          </div>
          <!-- Seconds -->
          <div class="time-container">
            <h1 class="time-number" id="seconds">00</h1>
            <h3 class="time-unit">SECS</h3>
          </div>
        </main>
        <script>
          // ========= Variables to change for the timer to work ==========
          // Change these values based on how long you want the timer to run
          const days = ${timeRun.days};
          const hours = ${timeRun.hours};
          const minutes = ${timeRun.minutes};
          const seconds = ${timeRun.seconds};
    
          // Change this value to switch between using a provided start date (in text above) or
          // using the current date.
          const dateStartType = '${dateStartType}'; // This should either be "now" or "provided"
    
          // Change this value to switch between the timer running for X days, minutes, seconds (time)
          // or to run till a partiuclar date (date)
          const runTo = '${runTo}'; // This should either be 'date' or 'time'
    
          // Change this date to be the start date for the timer if you need a specific start date
          // otherwise change the dateStartType to "now" to use the current date
          const providedDateStart = '${providedDateStart}';
    
          // Start date for timer
          const dateStartInText =
            dateStartType === 'now' ? new Date() : providedDateStart;
    
          // Change this date to be the end date the timer will run to then stop
          const dateEndInText = '${dateEndInText}';
    
          // =============  Code for the timer ============
          // Run update function every second
          const intervalId = setInterval(updateTime, 1000);
    
          function getEndDateMs() {
            const daysMs = days * 24 * 60 * 60 * 1000;
            const hoursMs = hours * 60 * 60 * 1000;
            const minutesMs = minutes * 60 * 1000;
            const secondsMs = seconds * 1000;
            const totalMs = daysMs + hoursMs + minutesMs + secondsMs;
    
            return totalMs;
          }
    
          function getEndDate() {
            const startDate = Date.parse(dateStartInText);
            const literalDateToEnd = Date.parse(dateEndInText);
    
            if (runTo === 'time') {
              return startDate + getEndDateMs();
            } else {
              return literalDateToEnd;
            }
          }
    
          function updateTime() {
            const now = new Date();
            const futureDate = new Date(getEndDate());
            const timeleft = new Date(futureDate - now);
    
            if (futureDate > now) {
              // Calculating the days, hours, minutes and seconds left
              const days = Math.floor(timeleft / (24 * 60 * 60 * 1000));
              const hours = Math.floor((timeleft / (60 * 60 * 1000)) % 24);
              const minutes = Math.floor((timeleft / (60 * 1000)) % 60);
              const seconds = Math.floor((timeleft / 1000) % 60);
    
              document.getElementById('days').textContent =
                days < 10 ? '0' + days : days;
              document.getElementById('hours').textContent =
                hours < 10 ? '0' + hours : hours;
              document.getElementById('minutes').textContent =
                minutes < 10 ? '0' + minutes : minutes;
              document.getElementById('seconds').textContent =
                seconds < 10 ? '0' + seconds : seconds;
            } else {
              clearInterval(intervalId);
              // Set all values to 0
            }
          }
        </script>
      </body>
    </html>
    `;
}
