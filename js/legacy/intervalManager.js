/**
 * Just a monitor of window.interval
 * will be removed before go live
 */
;(function(win) {
    const debug = (...args) => {
        /*eslint no-constant-condition: off*/
        if (true) {
            console.debug(...args)
        }
    }

    win.originalSetInterval = win.setInterval
    win.originalClearInterval = win.clearInterval
    win.activeIntervalIds = []

    win.setInterval = function(func, delay) {
        if (func && delay) {
            let intervalId = win.originalSetInterval(func, delay)
            win.activeIntervalIds.push(intervalId)
            debug(`Added: ${intervalId}, Func: ${func.name}, Delay: ${delay / 1000}s`)
            debug(`Active IntervalIds: ${win.activeIntervalIds}`)
            return intervalId
        }
        return null
    }
    win.clearInterval = function(intervalId) {
        if (intervalId) {
            win.originalClearInterval(intervalId)
            // remove interval id from collection
            let idx = win.activeIntervalIds.indexOf(intervalId)
            if (idx >= 0) {
                win.activeIntervalIds.splice(idx, 1)
                debug(`Removed: ${intervalId}`)
            }
        }
    }
})(window)
