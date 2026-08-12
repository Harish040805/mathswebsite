    function updateVisuals(t, s) {
        const hand = document.getElementById('clockHand');
        const needle = document.getElementById('speedNeedle');
        const clockVal = document.getElementById('clockVal');
        const speedVal = document.getElementById('speedVal');

        if (t !== null && t > 0) {
            clockVal.textContent = t.toFixed(2);
            hand.style.animationDuration = t + 's';
            hand.style.animationPlayState = 'running';
        } else {
            clockVal.textContent = '-';
            hand.style.animationPlayState = 'paused';
        }

        if (s !== null && s >= 0) {
            speedVal.textContent = s.toFixed(2);
            let maxSpeed = 260;
            let percentage = Math.min(s / maxSpeed, 1);
            let degrees = (percentage * 270) - 135;
            needle.style.transform = 'rotate(' + degrees + 'deg)';
        } else {
            speedVal.textContent = '-';
            needle.style.transform = 'rotate(-135deg)';
        }
    }

    function calculateAll(changedField) {
        const tEl = document.getElementById('time');
        const dEl = document.getElementById('distance');
        const sEl = document.getElementById('speed');
        const wEl = document.getElementById('work');
        const mEl = document.getElementById('men');

        let t = tEl.value !== '' ? parseFloat(tEl.value) : null;
        let d = dEl.value !== '' ? parseFloat(dEl.value) : null;
        let s = sEl.value !== '' ? parseFloat(sEl.value) : null;
        let w = wEl.value !== '' ? parseFloat(wEl.value) : null;
        let m = mEl.value !== '' ? parseFloat(mEl.value) : null;

        if (changedField === 'time') {
            if (t !== null && t !== 0) {
                if (s !== null && changedField !== 'distance') {
                    dEl.value = (s * t).toFixed(2);
                } else if (d !== null && changedField !== 'speed') {
                    sEl.value = (d / t).toFixed(2);
                    s = parseFloat(sEl.value);
                }
                if (m !== null && changedField !== 'work') {
                    wEl.value = (m * t).toFixed(2);
                } else if (w !== null && changedField !== 'men') {
                    mEl.value = (w / t).toFixed(2);
                }
            }
        }

        if (changedField === 'distance') {
            if (d !== null) {
                if (s !== null && s !== 0) {
                    tEl.value = (d / s).toFixed(2);
                    t = parseFloat(tEl.value);
                    calculateAll('time');
                } else if (t !== null && t !== 0) {
                    sEl.value = (d / t).toFixed(2);
                    s = parseFloat(sEl.value);
                }
            }
        }

        if (changedField === 'speed') {
            if (s !== null) {
                if (d !== null) {
                    if (s !== 0) {
                        tEl.value = (d / s).toFixed(2);
                        t = parseFloat(tEl.value);
                        calculateAll('time');
                    }
                } else if (t !== null) {
                    dEl.value = (s * t).toFixed(2);
                }
            }
        }

        if (changedField === 'work') {
            if (w !== null) {
                if (m !== null && m !== 0) {
                    tEl.value = (w / m).toFixed(2);
                    t = parseFloat(tEl.value);
                    calculateAll('time');
                } else if (t !== null && t !== 0) {
                    mEl.value = (w / t).toFixed(2);
                }
            }
        }

        if (changedField === 'men') {
            if (m !== null) {
                if (w !== null) {
                    if (m !== 0) {
                        tEl.value = (w / m).toFixed(2);
                        t = parseFloat(tEl.value);
                        calculateAll('time');
                    }
                } else if (t !== null) {
                    wEl.value = (m * t).toFixed(2);
                }
            }
        }

        updateVisuals(t, s);
    }

    function clearFields() {
        document.getElementById('time').value = '';
        document.getElementById('distance').value = '';
        document.getElementById('speed').value = '';
        document.getElementById('work').value = '';
        document.getElementById('men').value = '';
        updateVisuals(null, null);
    }
