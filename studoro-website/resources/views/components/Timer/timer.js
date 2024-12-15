import { TIMER_MODES } from './timerConfig';
import { TimerUI } from './timerUI';

export class Timer {
    constructor() {
        this.state = {
            currentMode: 'focus',
            timeLeft: TIMER_MODES.focus.time,
            isRunning: false,
            timer: null,
            currentSession: 1,
            totalSessions: 4,
            totalTime: TIMER_MODES.focus.time,
            currentTask: null
        };

        this.elements = {
            display: document.getElementById('timerDisplay'),
            title: document.getElementById('timerTitle'),
            progress: document.getElementById('timerProgress'),
            progressBar: document.getElementById('progressBar'),
            sessionCount: document.getElementById('sessionCount'),
            startBtn: document.getElementById('startBtn'),
            resetBtn: document.getElementById('resetBtn'),
            stopBtn: document.getElementById('stopBtn')
        };

        if (!this.elements.display) return;

        this.ui = new TimerUI(this.elements);
        this.bindEvents();
        this.updateDisplay();
        this.updateSessionDisplay();
    }

    bindEvents() {
        // Timer control buttons
        if (this.elements.startBtn) {
            this.elements.startBtn.addEventListener('click', () => this.toggleTimer());
        }

        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => this.confirmReset());
        }

        if (this.elements.stopBtn) {
            this.elements.stopBtn.addEventListener('click', () => this.confirmStop());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.toggleTimer();
            } else if (e.code === 'KeyR') {
                this.reset();
            }
        });
    }

    confirmReset() {
        // Timer tetap jalan selama konfirmasi
        this.ui.showNotification('confirmReset', this.state.currentMode);
        this.ui.onConfirmReset = () => this.reset();
    }

    confirmStop() {
        this.ui.showNotification('confirmStop', this.state.currentMode);
        this.ui.onConfirmStop = () => this.stopTimer();
    }

    stopTimer() {
        clearInterval(this.state.timer);
        this.state.isRunning = false;
        this.reset();
        // Show completion message
        this.ui.showNotification('completion');
    }

    toggleTimer() {
        this.state.isRunning = !this.state.isRunning;

        if (this.state.isRunning) {
            this.state.timer = setInterval(() => this.tick(), 1000);
        } else {
            clearInterval(this.state.timer);
        }

        this.ui.updateStartButton(this.state.isRunning);
    }

    tick() {
        if (this.state.timeLeft > 0) {
            this.state.timeLeft--;
            const progress = ((this.state.totalTime - this.state.timeLeft) / this.state.totalTime) * 100;
            this.ui.updateDisplay(this.state.timeLeft, this.state.currentMode, TIMER_MODES, progress);
        } else {
            this.complete();
        }
    }

    complete() {
        clearInterval(this.state.timer);
        this.state.isRunning = false;
        this.ui.updateStartButton(false);

        if (this.state.currentTask) {
            this.ui.showTaskCompletionPrompt(this.state.currentTask, (completed) => {
                if (completed) {
                    window.taskManager?.handleComplete(this.state.currentTask.id);
                }
                this.state.currentTask = null;
                this.transitionToNextPhase();
            });
        } else {
            this.ui.showNotification('completion', this.state.currentMode);
            this.ui.onContinue = () => this.transitionToNextPhase();
        }
    }

    startTaskTimer(task) {
        this.state.currentTask = task;
        this.reset();

        if (this.elements.title) {
            this.elements.title.innerHTML = `
                <div class="flex flex-col items-center">
                    <span class="text-sm text-gray-500 mb-1">Mengerjakan:</span>
                    <span class="text-xl">${task.title}</span>
                </div>
            `;
        }

        this.state.isRunning = true;
        this.state.timer = setInterval(() => this.tick(), 1000);
        this.ui.updateStartButton(true);
    }

    transitionToNextPhase() {
        if (this.state.currentMode === 'focus') {
            if (this.state.currentSession === this.state.totalSessions) {
                this.startLongBreak();
            } else {
                this.startShortBreak();
            }
        } else if (this.state.currentMode === 'shortBreak') {
            this.state.currentSession++;
            this.updateSessionDisplay();
            this.startFocus();
        } else if (this.state.currentMode === 'longBreak') {
            this.state.currentSession = 1;
            this.updateSessionDisplay();
            this.startFocus();
        }
    }

    startFocus() {
        this.state.currentMode = 'focus';
        this.state.timeLeft = TIMER_MODES.focus.time;
        this.state.totalTime = TIMER_MODES.focus.time;
        this.updateDisplay();
    }

    startShortBreak() {
        this.state.currentMode = 'shortBreak';
        this.state.timeLeft = TIMER_MODES.shortBreak.time;
        this.state.totalTime = TIMER_MODES.shortBreak.time;
        this.updateDisplay();
    }

    startLongBreak() {
        this.state.currentMode = 'longBreak';
        this.state.timeLeft = TIMER_MODES.longBreak.time;
        this.state.totalTime = TIMER_MODES.longBreak.time;
        this.updateDisplay();
    }

    updateDisplay() {
        this.ui.updateDisplay(
            this.state.timeLeft,
            this.state.currentMode,
            TIMER_MODES,
            ((this.state.totalTime - this.state.timeLeft) / this.state.totalTime) * 100
        );
    }

    updateSessionDisplay() {
        if (this.elements.sessionCount) {
            this.elements.sessionCount.textContent = this.state.currentSession;
        }
    }

    reset() {
        clearInterval(this.state.timer);
        this.state.isRunning = false;
        this.state.currentMode = 'focus';
        this.state.timeLeft = TIMER_MODES.focus.time;
        this.state.totalTime = TIMER_MODES.focus.time;
        this.state.currentSession = 1;

        this.updateDisplay();
        this.updateSessionDisplay();
        this.ui.updateStartButton(false);
    }

    playNotificationSound() {
        const audio = new Audio('notification.mp3');
        audio.play().catch(() => {}); // Ignore errors if sound can't play
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('timer')) {
        window.timer = new Timer();
    }
});

