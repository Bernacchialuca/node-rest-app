'use strict';
const schedule = require('node-schedule');
const runningProcesses = new Set();

function runSchedule(name, func) {
    if (runningProcesses.has(name)) {
        return false;
    }
    runningProcesses.add(name);
    return func()
        .catch(() => {
            return;
        })
        .then(() => {
            runningProcesses.delete(name);
        });
}

function initSchedule() {
    schedule.scheduleJob('* * * * *', () => {
        return runSchedule('probandoSchedule', console.log('aloja'));
    });
}

module.exports = initSchedule;
