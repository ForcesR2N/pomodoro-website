// resources/js/components/Timer/timerUI.js
import { MESSAGES } from './messages';

export class TimerUI {
   constructor(elements) {
       this.elements = elements;
       this.encouragementInterval = null;
       this.onConfirmStop = null;
       this.onConfirmReset = null;
       this.onContinue = null;
   }

   formatTime(seconds) {
       const mins = Math.floor(seconds / 60);
       const secs = seconds % 60;
       return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
   }

   updateDisplay(timeLeft, mode, config, progress = 0) {
       if (!this.elements.display) return;

       // Update timer display
       this.elements.display.textContent = this.formatTime(timeLeft);

       // Update title with current mode label
       if (this.elements.title && config[mode]) {
           this.elements.title.textContent = config[mode].label;
       }

       // Update progress
       this.updateProgress(progress);

       // Update theme colors based on mode
       this.updateColorTheme(mode);

       // Handle encouragement messages
       if (mode === 'focus') {
           this.startEncouragementMessages();
       } else {
           this.stopEncouragementMessages();
       }
   }

   updateProgress(progress) {
       if (!this.elements.progress || !this.elements.progressBar) return;

       const roundedProgress = Math.round(progress);
       this.elements.progress.textContent = `${roundedProgress}%`;

       requestAnimationFrame(() => {
           this.elements.progressBar.style.width = `${roundedProgress}%`;
       });
   }

   updateStartButton(isRunning) {
       if (!this.elements.startBtn) return;

       const playIcon = `
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
           </svg>
       `;

       const pauseIcon = `
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
           </svg>
       `;

       this.elements.startBtn.innerHTML = isRunning ? pauseIcon : playIcon;
   }

   updateColorTheme(mode) {
       const colors = {
           focus: {
               progress: 'bg-orange-400',
               button: 'bg-orange-400 hover:bg-orange-500'
           },
           shortBreak: {
               progress: 'bg-green-400',
               button: 'bg-green-400 hover:bg-green-500'
           },
           longBreak: {
               progress: 'bg-blue-400',
               button: 'bg-blue-400 hover:bg-blue-500'
           }
       };

       const theme = colors[mode];
       if (!theme) return;

       if (this.elements.progressBar) {
           this.elements.progressBar.className = `h-2 rounded-full transition-all duration-300 ease-in-out ${theme.progress}`;
       }

       if (this.elements.startBtn) {
           this.elements.startBtn.className = `w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out ${theme.button}`;
       }
   }

   showNotification(type, mode = 'focus') {
       const modal = document.createElement('div');
       modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
       modal.innerHTML = `
           <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
           <div class="relative bg-white rounded-xl shadow-lg max-w-md w-full p-6 transform transition-all">
               ${this.getNotificationContent(type, mode)}
           </div>
       `;

       document.body.appendChild(modal);
       this.setupNotificationListeners(modal, type);

       if (type === 'encouragement') {
           setTimeout(() => this.closeNotification(modal), 3000);
       }
   }

   getNotificationContent(type, mode) {
       switch (type) {
           case 'completion':
               const completionMessage = MESSAGES.completionMessages[
                   Math.floor(Math.random() * MESSAGES.completionMessages.length)
               ];
               return `
                   <div class="text-center mb-6">
                       <h3 class="text-xl font-bold text-gray-800 mb-2">Selamat!</h3>
                       <p class="text-gray-600">${completionMessage}</p>
                   </div>
                   <button class="continue-btn w-full px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-300">
                       Lanjutkan
                   </button>
               `;

           case 'confirmStop':
               return `
                   <div class="text-center mb-6">
                       <h3 class="text-xl font-bold text-gray-800 mb-2">Konfirmasi</h3>
                       <p class="text-gray-600">${MESSAGES.confirmationMessages[mode] || MESSAGES.confirmationMessages.default}</p>
                   </div>
                   <div class="flex gap-4">
                       <button class="cancel-btn flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                           Batal
                       </button>
                       <button class="confirm-stop-btn flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                           Ya, Hentikan
                       </button>
                   </div>
               `;

           case 'confirmReset':
               return `
                   <div class="text-center mb-6">
                       <h3 class="text-xl font-bold text-gray-800 mb-2">Reset Timer</h3>
                       <p class="text-gray-600">${MESSAGES.confirmationMessages.reset}</p>
                   </div>
                   <div class="flex gap-4">
                       <button class="cancel-btn flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                           Batal
                       </button>
                       <button class="confirm-reset-btn flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
                           Ya, Ulang
                       </button>
                   </div>
               `;

           case 'encouragement':
               const encourageMessage = MESSAGES.encouragementMessages[
                   Math.floor(Math.random() * MESSAGES.encouragementMessages.length)
               ];
               return `
                   <div class="text-center py-3 px-6">
                       <p class="text-lg text-gray-800">${encourageMessage}</p>
                   </div>
               `;

           default:
               return '';
       }
   }

   setupNotificationListeners(modal, type) {
       const confirmStopBtn = modal.querySelector('.confirm-stop-btn');
       const confirmResetBtn = modal.querySelector('.confirm-reset-btn');
       const cancelBtn = modal.querySelector('.cancel-btn');
       const continueBtn = modal.querySelector('.continue-btn');

       if (continueBtn) {
           continueBtn.addEventListener('click', () => {
               this.closeNotification(modal);
               if (this.onContinue) this.onContinue();
           });
       }

       if (confirmStopBtn) {
           confirmStopBtn.addEventListener('click', () => {
               this.closeNotification(modal);
               if (this.onConfirmStop) this.onConfirmStop();
           });
       }

       if (confirmResetBtn) {
           confirmResetBtn.addEventListener('click', () => {
               this.closeNotification(modal);
               if (this.onConfirmReset) this.onConfirmReset();
           });
       }

       if (cancelBtn) {
           cancelBtn.addEventListener('click', () => this.closeNotification(modal));
       }

       modal.querySelector('.bg-black').addEventListener('click', () => this.closeNotification(modal));
   }

   closeNotification(modal) {
       modal.classList.add('opacity-0');
       setTimeout(() => modal.remove(), 300);
   }

//    startEncouragementMessages() {
//        if (this.encouragementInterval) clearInterval(this.encouragementInterval);
//        this.encouragementInterval = setInterval(() => {
//            this.showNotification('encouragement');
//        }, 5 * 60 * 1000); // Every 5 minutes
//    }

   stopEncouragementMessages() {
       if (this.encouragementInterval) {
           clearInterval(this.encouragementInterval);
           this.encouragementInterval = null;
       }
   }
}
