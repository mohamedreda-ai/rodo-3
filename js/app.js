    if (typeof window.lucide === 'undefined') {
        window.lucide = { createIcons: function(options) { console.warn('Lucide icons not loaded. Check connection or CDN.'); } };
    }

    const CATEGORIES = {
       
        study: { label: 'مذاكرة', color: 'bg-purple-400', colorCode: '#c084fc', bgCheck: 'bg-purple-500', textCheck: 'text-purple-400' },
        solve: { label: 'حل وتدريب', color: 'bg-blue-400', colorCode: '#60a5fa', bgCheck: 'bg-blue-500', textCheck: 'text-blue-400' },
        review: { label: 'مراجعة', color: 'bg-orange-400', colorCode: '#fb923c', bgCheck: 'bg-orange-500', textCheck: 'text-orange-400' },
        life: { label: 'شخصي', color: 'bg-emerald-400', colorCode: '#34d399', bgCheck: 'bg-emerald-500', textCheck: 'text-emerald-400' }
    };

     function escapeHTML(str) {
    if (str == null) return '';

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    const DEFAULT_REWARDS = [
        { id: 1, title: 'مشاهدة حلقة من الأنمي/المسلسل', cost: 200 },
        { id: 2, title: 'تصفح السوشيال ميديا 30 دقيقة', cost: 150 },
        { id: 3, title: 'جلسة جيمنج (ساعة كاملة)', cost: 400 },
        { id: 4, title: 'أكلة حلوة خارج الدايت', cost: 300 }
    ];

    const MAGIC_SHOP_ITEMS = [
        { id: 'xp_potion_small', title: 'جرعة الحكمة الصغرى', desc: 'تمنحك 150 XP فوراً.', cost: 250, icon: 'flask-conical', bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400', hover: 'hover:bg-purple-500/20' },
        { id: 'focus_scroll', title: 'لفيفة التركيز', desc: 'تضيف 60 دقيقة تركيز لسجلك.', cost: 400, icon: 'scroll', bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400', hover: 'hover:bg-blue-500/20' },
        { id: 'xp_potion', title: 'إكسير الحكمة', desc: 'تمنحك 300 XP فوراً.', cost: 500, icon: 'flask-conical', bg: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400', hover: 'hover:bg-fuchsia-500/20' },
        { id: 'streak_shield', title: 'درع الاستمرارية', desc: 'يزيد سلسلة أيام متتالية (+3 أيام).', cost: 600, icon: 'shield', bg: 'bg-orange-500/10 border-orange-500/30 text-orange-400', hover: 'hover:bg-orange-500/20' },
        { id: 'mystery_box', title: 'صندوق الغموض', desc: 'مكافأة عشوائية ضخمة (XP أو تركيز أو ذهب).', cost: 750, icon: 'package-open', bg: 'bg-pink-500/10 border-pink-500/30 text-pink-400', hover: 'hover:bg-pink-500/20' },
        { id: 'time_freeze', title: 'ساعة الزمن', desc: 'دفعة مزدوجة: 500 XP و 100 دقيقة تركيز.', cost: 1200, icon: 'hourglass', bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400', hover: 'hover:bg-cyan-500/20' },
        { id: 'phoenix_feather', title: 'ريشة العنقاء', desc: 'طاقة نقية تمنحك 1000 XP للارتقاء السريع.', cost: 2000, icon: 'feather', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400', hover: 'hover:bg-amber-500/20' },
        { id: 'golden_ticket', title: 'التذكرة الذهبية', desc: 'مكافأة "يوم إجازة حر" تُضاف فوراً في مخزونك.', cost: 2500, icon: 'ticket', bg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', hover: 'hover:bg-yellow-500/20' },
        { id: 'crown_of_king', title: 'تاج الأساطير', desc: 'دفعة أسطورية: 2000 XP و 200 دقيقة تركيز.', cost: 5000, icon: 'crown', bg: 'bg-yellow-400/10 border-yellow-400/50 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.15)]', hover: 'hover:bg-yellow-400/20 hover:shadow-[0_0_25px_rgba(250,204,21,0.3)]' }
    ];

    const STAGES = [
        { id: 1, name: "التأسيس والانطلاق", weeks: [1, 13], color: "from-blue-500 to-cyan-500", icon: "flag" },
        { id: 2, name: "التعمق والربط", weeks: [14, 26], color: "from-purple-500 to-indigo-500", icon: "book-open" },
        { id: 3, name: "تحدي المنتصف", weeks: [27, 39], color: "from-orange-500 to-red-500", icon: "flame" },
        { id: 4, name: "ليالي الحسم", weeks: [40, 52], color: "from-yellow-400 to-yellow-600", icon: "trophy" }
    ];

    const QUOTES = [
        "الألم المؤقت للمذاكرة أفضل من ألم الندم الدائم.",
        "لا تتوقف عندما تتعب، بل توقف عندما تنتهي.",
        "كل صفحة تقرأها تبني طوبة في قصر مستقبلك.",
        "النجاح ليس صدفة، بل هو استمرارية وعمل شاق."
    ];

    const ACHIEVEMENTS_TEMPLATES = [
        { id: 'first_task', title: 'البداية الواعدة', desc: 'أنجزت أول مهمة لك بنجاح!', xp: 100, icon: 'sparkles', rank: 'برونزي' },
        { id: 'focus_50', title: 'سيد التركيز الخالص', desc: 'حققت 50 دقيقة من التركيز العميق.', xp: 200, icon: 'brain', rank: 'فضي' },
        { id: 'streak_3', title: 'الشعلة المستمرة', desc: 'حافظت على سلسلة أيام متتالية لمدة 3 أيام.', xp: 150, icon: 'flame', rank: 'برونزي' },
        { id: 'schedule_pro', title: 'المهندس المنظم', desc: 'أضفت 3 خطط أو دروس لجدولك الأسبوعي.', xp: 100, icon: 'calendar', rank: 'برونزي' },
        { id: 'gold_master', title: 'مستثمر الأسطورة', desc: 'جمعت 1000 عملة ذهبية في مسيرتك.', xp: 250, icon: 'coins', rank: 'ذهبي' }
    ];

    const AVATARS_DATA = [
        { id: 1, reqLvl: 1, type: 'standard', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#3b82f6"/><circle cx="50" cy="65" r="28" fill="#fed7aa"/><path d="M22 65 Q50 20 78 65 Z" fill="#1f2937"/><rect x="25" y="50" width="50" height="18" rx="4" fill="#111827" opacity="0.9"/><rect x="25" y="50" width="50" height="4" fill="#374151"/></svg>` },
        { id: 2, reqLvl: 1, type: 'standard', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#ec4899"/><path d="M20 90 C20 40 80 40 80 90 Z" fill="#4b5563"/><circle cx="50" cy="65" r="26" fill="#ffedd5"/><circle cx="37" cy="58" r="12" fill="#111827"/><circle cx="63" cy="58" r="12" fill="#111827"/><path d="M49 58 L51 58" stroke="#111827" stroke-width="4"/></svg>` },
        { id: 3, reqLvl: 1, type: 'standard', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#f59e0b"/><circle cx="50" cy="65" r="28" fill="#fcd34d"/><path d="M20 50 Q50 30 80 50 C80 20 20 20 20 50 Z" fill="#78350f"/><path d="M22 55 L78 55 L72 70 L28 70 Z" fill="#000" opacity="0.8"/></svg>` },
        { id: 4, reqLvl: 1, type: 'standard', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#10b981"/><circle cx="50" cy="65" r="26" fill="#fecaca"/><path d="M30 30 C 10 10, 50 10, 50 30 C 50 10, 90 10, 70 30 C 90 70, 70 90, 50 60 C 30 90, 10 70, 30 30 Z" fill="#9d174d"/><rect x="28" y="52" width="20" height="14" fill="#111827"/><rect x="52" y="52" width="20" height="14" fill="#111827"/><path d="M48 56 L52 56" stroke="#111827" stroke-width="3"/></svg>` },
        { id: 5, reqLvl: 5, type: 'legendary', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#0f172a"/><circle cx="50" cy="65" r="28" fill="#e2e8f0"/><path d="M15 50 L30 10 L40 30 L50 5 L60 30 L70 10 L85 50 Z" fill="#38bdf8"/><rect x="20" y="52" width="60" height="12" rx="6" fill="#000"/><rect x="24" y="55" width="52" height="6" rx="3" fill="#06b6d4"/><circle cx="85" cy="58" r="3" fill="#38bdf8"/></svg>` },
        { id: 6, reqLvl: 5, type: 'legendary', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#4c1d95"/><circle cx="50" cy="65" r="26" fill="#f3e8ff"/><circle cx="25" cy="35" r="15" fill="#d946ef"/><circle cx="75" cy="35" r="15" fill="#d946ef"/><path d="M35 30 Q50 20 65 30 Z" fill="#d946ef"/><path d="M25 65 L45 50 L50 55 L55 50 L75 65 L60 70 L40 70 Z" fill="#000"/><path d="M30 63 L43 54 M70 63 L57 54" stroke="#f0abfc" stroke-width="3"/></svg>` },
        { id: 7, reqLvl: 10, type: 'legendary', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#7f1d1d"/><circle cx="50" cy="65" r="28" fill="#ffedd5"/><path d="M20 60 C 20 0, 50 20, 50 10 C 50 20, 80 0, 80 60 Z" fill="#f97316"/><path d="M30 60 C 30 20, 50 30, 50 25 C 50 30, 70 20, 70 60 Z" fill="#fef08a"/><path d="M22 55 L78 55 L65 70 L35 70 Z" fill="#000"/><path d="M25 57 L75 57" stroke="#ef4444" stroke-width="2"/></svg>` },
        { id: 8, reqLvl: 10, type: 'legendary', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#064e3b"/><circle cx="50" cy="65" r="26" fill="#ecfdf5"/><path d="M20 90 C15 30 85 30 80 90 Z" fill="#10b981"/><path d="M30 40 L40 25 L50 35 L60 25 L70 40 Z" fill="#fbbf24"/><circle cx="36" cy="58" r="14" fill="#000"/><circle cx="64" cy="58" r="14" fill="#000"/><path d="M36 58 L36 58 M64 58 L64 58" stroke="#34d399" stroke-width="8" stroke-linecap="round"/><path d="M48 58 L52 58" stroke="#000" stroke-width="3"/></svg>` }
    ];

    const DEFAULT_HABITS = [
        { id: 1, title: 'الصلاة في وقتها', completed: false, icon: 'shrine' },
        { id: 2, title: 'شرب 2 لتر ماء', completed: false, icon: 'droplet' },
        { id: 3, title: 'ورد الذكر وقراءة القرآن', completed: false, icon: 'book-open' },
        { id: 4, title: 'تمرين سريع / تمدد', completed: false, icon: 'activity' }
    ];

    const RANDOM_EVENTS_DATA = [
        { id: 'weekend_boost', title: 'نسيم الخميس', desc: 'نهاية أسبوع سعيدة! استمتع بدفعة من الطاقة والذهب مكافأة لعملك.', xp: 150, coins: 150, icon: 'wind', theme: 'blue' },
        { id: 'merchant', title: 'التاجر المتجول', desc: 'بينما كنت تراجع دروسك، وجدت كيساً من الذهب ضائعاً!', xp: 0, coins: 300, icon: 'gem', theme: 'yellow' },
        { id: 'wise_man', title: 'حكمة عابر', desc: 'استمعت لنصيحة حكيم زادت من بصيرتك وخبرتك بشكل كبير.', xp: 200, coins: 0, icon: 'book-open', theme: 'purple' },
        { id: 'lucky_star', title: 'نجمة الحظ', desc: 'اليوم هو يوم سعدك، كل شيء يسير لصالحك في رحلتك!', xp: 100, coins: 100, icon: 'star', theme: 'emerald' }
    ];

    const INITIAL_STATE = {
        userName: 'اسمك هنا',
        avatarId: 1,
        lastActionDate: null,
        lastLoginDate: null,
        lastEventDate: null,
        tasks: [],
        inventory: [],
        goals: [],
        mainGoal: '',
        xp: 0,
        coins: 0,
        currentWeek: 1,
        streak: 0,
        totalFocusMinutes: 0,
        rewards: [...DEFAULT_REWARDS],
        stats: { study: 0, solve: 0, review: 0, life: 0 },
        lessons: [],
        studyPlan: [],
        unlockedAchievements: [],
        habits: [...DEFAULT_HABITS],
        productivity: { 'السبت': 0, 'الأحد': 0, 'الإثنين': 0, 'الثلاثاء': 0, 'الأربعاء': 0, 'الخميس': 0, 'الجمعة': 0 },
        todayStats: { tasks: 0, xp: 0, focus: 0 },
        yesterdayStats: null,
        pendingRecap: false,
        weeklyStats: { tasks: 0, xp: 0, focus: 0 },
        weeklyReports: [],
        examSubjects: [],
        weaknesses: [],
        studySubjects: [],
        activeSession: { isRunning: false, startTime: null, elapsedMs: 0 },
        heatmapData: {}
    };

    let state = JSON.parse(JSON.stringify(INITIAL_STATE));
    let stateSnapshot = null;
    let pendingRandomEvent = null;
    let stopwatchInterval = null;

    try {
        const savedState = localStorage.getItem('hsQuestPremium_v4');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            state = { ...state, ...parsed };
            
            if (!state.todayStats) state.todayStats = { ...INITIAL_STATE.todayStats };
            else state.todayStats = { ...INITIAL_STATE.todayStats, ...state.todayStats };
            
            if (state.pendingRecap === undefined) state.pendingRecap = false;
            if (state.lastEventDate === undefined) state.lastEventDate = null;
            
            if (!state.weeklyStats) state.weeklyStats = { ...INITIAL_STATE.weeklyStats };
            else state.weeklyStats = { ...INITIAL_STATE.weeklyStats, ...state.weeklyStats };
            
            if (!state.weeklyReports) state.weeklyReports = [];
            if (state.coins === undefined) state.coins = state.xp;
            
            if (!state.stats) state.stats = { ...INITIAL_STATE.stats };
            else state.stats = { ...INITIAL_STATE.stats, ...state.stats };
            
            if (!state.rewards || state.rewards.length === 0) state.rewards = [...DEFAULT_REWARDS];
            if (!state.userName) state.userName = 'اسمك هنا';
            if (!state.avatarId) state.avatarId = 1;
            
            if (state.bosses) delete state.bosses;
            
            if (state.streak === undefined) state.streak = 0;
            if (!state.goals) state.goals = [];
            if (state.mainGoal === undefined) state.mainGoal = '';
            if (!state.inventory) state.inventory = [];
            if (!state.lastLoginDate) state.lastLoginDate = new Date().toDateString();
            if (!state.lessons) state.lessons = [];
            if (!state.studyPlan) state.studyPlan = [];
            if (!state.unlockedAchievements) state.unlockedAchievements = [];
            if (!state.habits || state.habits.length === 0) state.habits = [...DEFAULT_HABITS];
            if (!state.productivity) state.productivity = { ...INITIAL_STATE.productivity };
            else state.productivity = { ...INITIAL_STATE.productivity, ...state.productivity };
            if (!state.examSubjects) state.examSubjects = [];
            if (!state.weaknesses) state.weaknesses = [];
            
            if (!state.studySubjects) state.studySubjects = [];
            state.studySubjects.forEach(s => {
                if(!s.history) s.history = [];
                if(s.weeklyGoal === undefined) s.weeklyGoal = 0;
            });
            
            if (!state.activeSession) state.activeSession = { ...INITIAL_STATE.activeSession };
            if (state.activeSession.subject) delete state.activeSession.subject;
            
            if (!state.heatmapData) state.heatmapData = {};
        }
    } catch(e) {}

    function saveState() {
        checkAchievements();
        try { 
            localStorage.setItem('hsQuestPremium_v4', JSON.stringify(state)); 
        } catch (e) {
            console.warn("فشل في حفظ البيانات. تأكد من أن مساحة التخزين غير ممتلئة أو أنك لا تستخدم التصفح الخفي.");
        }
        updateGlobalUI();
    }

    function saveSnapshot() { stateSnapshot = JSON.parse(JSON.stringify(state)); }

    function restoreSnapshot() {
        if (!stateSnapshot) return;
        state = JSON.parse(JSON.stringify(stateSnapshot));
        stateSnapshot = null;
        saveState();
        renderTasks(); renderGoals(); renderStore();
        renderStats(); renderJourney(); renderProfile(); renderSchedule(); renderHabits();
        renderWeeklyHistory();
        renderHeatmap();
        if (isAudioInitialized && synth) synth.triggerAttackRelease("C3", "16n");
    }

    const getLevel = () => Math.floor(state.xp / 100) + 1;
    const getXpProgress = () => state.xp % 100;

    function getAvatarDecorationsHtml(level, isSmall = false) {
        let html = '';
        const sClass = isSmall ? 'w-4 h-4 -bottom-1 border' : 'w-8 h-8 -bottom-2 border-2';
        const iClass = isSmall ? 'w-2 h-2' : 'w-4 h-4';
        const cClass = isSmall ? 'w-5 h-5 -top-2' : 'w-7 h-7 -top-3';

        if (level >= 10) html += `<div class="absolute ${isSmall ? '-left-1' : '-left-2'} ${sClass} bg-slate-800 rounded-full border-slate-500 flex items-center justify-center z-20 shadow-lg"><i data-lucide="shield" class="${iClass} text-slate-300"></i></div>`;
        if (level >= 15) html += `<div class="absolute ${isSmall ? '-right-1' : '-right-2'} ${sClass} bg-amber-900 rounded-full border-amber-500 flex items-center justify-center z-20 shadow-lg"><i data-lucide="sword" class="${iClass} text-amber-400"></i></div>`;
        if (level >= 30) html += `<div class="absolute left-1/2 -translate-x-1/2 ${cClass} flex items-center justify-center z-20 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"><i data-lucide="crown" class="w-full h-full text-yellow-400 fill-yellow-400"></i></div>`;
        
        return html;
    }

    function getAvatarAuraClass(level) {
        if (level >= 30) return 'ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-[pulse_2s_infinite]';
        if (level >= 20) return 'ring-2 ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-[pulse_3s_infinite]';
        return 'border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)]';
    }

    function updateQuote() { 
        const quoteEl = document.getElementById('ui-daily-quote');
        if(quoteEl) quoteEl.innerText = QUOTES[Math.floor(Math.random() * QUOTES.length)]; 
    }

    function checkStreakAndPenaltyOnLoad() {
        if (!state.lastActionDate) return false;
        
        const today = new Date(); today.setHours(0,0,0,0);
        const lastAction = new Date(state.lastActionDate); lastAction.setHours(0,0,0,0);
        const diffTime = today - lastAction;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
            const xpPenalty = Math.min(state.xp, 50 * diffDays);
            const coinsPenalty = Math.min(state.coins, 50 * diffDays);
            
            state.xp -= xpPenalty;
            state.coins -= coinsPenalty;
            state.streak = 0;

            state.lastActionDate = new Date().toDateString();
            state.pendingRecap = false;
            saveState();

            showPenaltyModal(diffDays, xpPenalty, coinsPenalty);
            return true; 
        }
        return false;
    }

    function showPenaltyModal(days, xp, coins) {
        try {
            initAudio().then(() => {
                if (Tone.context.state !== 'running') return;
                const osc = new Tone.Oscillator(50, "sawtooth").toDestination().start();
                osc.volume.value = -5; osc.frequency.rampTo(40, 1);
                setTimeout(() => osc.stop(), 1500);
            });
        } catch(e) {}

        const penaltyDaysEl = document.getElementById('penalty-days');
        if (penaltyDaysEl) penaltyDaysEl.innerText = `${days} أيام`;
        
        if (xp > 0) {
            const xpBox = document.getElementById('penalty-xp-box');
            const xpText = document.getElementById('penalty-xp');
            if(xpBox) xpBox.classList.remove('hidden');
            if(xpText) xpText.innerText = `-${xp}`;
        }
        if (coins > 0) {
            const coinsBox = document.getElementById('penalty-coins-box');
            const coinsText = document.getElementById('penalty-coins');
            if(coinsBox) coinsBox.classList.remove('hidden');
            if(coinsText) coinsText.innerText = `-${coins}`;
        }

        const modal = document.getElementById('modal-penalty');
        const content = document.getElementById('modal-penalty-content');
        if(modal && content) {
            modal.classList.remove('hidden'); modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('opacity-0'); modal.classList.add('modal-overlay-enter');
                content.classList.remove('opacity-0', 'scale-95'); content.classList.add('modal-animate-enter');
            }, 10);
        }
    }

    function closePenaltyModal() {
        const modal = document.getElementById('modal-penalty');
        if(!modal) return;
        modal.classList.remove('modal-overlay-enter'); modal.classList.add('opacity-0');
        setTimeout(() => { modal.classList.add('hidden'); modal.style.display = 'none'; }, 500);
    }

    function checkDailyReset() {
        const todayStr = new Date().toDateString();
        if (state.lastLoginDate !== todayStr) {
            if (state.todayStats.tasks > 0 || state.todayStats.xp > 0 || state.todayStats.focus > 0) {
                state.yesterdayStats = { ...state.todayStats };
                state.pendingRecap = true;
            }
            state.tasks = state.tasks.filter(t => !t.completed);
            state.habits.forEach(h => h.completed = false);
            state.todayStats = { tasks: 0, xp: 0, focus: 0 };
            state.lastLoginDate = todayStr;
            saveState();
        }
        return state.pendingRecap;
    }

    function showDailyRecap() {
        if (!state.yesterdayStats) return;
        playSound('achievement');

        const recapTasks = document.getElementById('recap-tasks');
        const recapXp = document.getElementById('recap-xp');
        const recapFocus = document.getElementById('recap-focus');

        if(recapTasks) recapTasks.innerText = state.yesterdayStats.tasks;
        if(recapXp) recapXp.innerText = state.yesterdayStats.xp;
        if(recapFocus) recapFocus.innerText = state.yesterdayStats.focus;
        
        const modal = document.getElementById('modal-daily-recap');
        const content = document.getElementById('modal-daily-recap-content');
        if(modal && content) {
            modal.classList.remove('hidden'); modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('opacity-0'); modal.classList.add('modal-overlay-enter');
                content.classList.remove('opacity-0', 'scale-95'); content.classList.add('modal-animate-enter');
            }, 10);
        }
    }

    function closeDailyRecap() {
        const modal = document.getElementById('modal-daily-recap');
        if(!modal) return;
        modal.classList.remove('modal-overlay-enter'); modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden'); modal.style.display = 'none';
            state.pendingRecap = false; state.yesterdayStats = null; saveState();
            if (pendingRandomEvent) setTimeout(() => showRandomEventModal(pendingRandomEvent), 500);
        }, 300);
    }

    function checkRandomEvents() {
        const todayStr = new Date().toDateString();
        if (state.lastEventDate === todayStr) return null; 

        let eventToTrigger = null;
        const todayDay = new Date().getDay(); 

        if (todayDay === 4) {
            eventToTrigger = RANDOM_EVENTS_DATA.find(e => e.id === 'weekend_boost');
        } else if (Math.random() < 0.25) {
            const available = RANDOM_EVENTS_DATA.filter(e => e.id !== 'weekend_boost');
            eventToTrigger = available[Math.floor(Math.random() * available.length)];
        }

        if (eventToTrigger) {
            state.lastEventDate = todayStr;
            saveState(); return eventToTrigger;
        }
        return null;
    }

    function showRandomEventModal(eventData) {
        playSound('achievement');

        const titleEl = document.getElementById('event-title');
        const descEl = document.getElementById('event-desc');
        if(titleEl) titleEl.innerText = eventData.title;
        if(descEl) descEl.innerText = eventData.desc;
        
        const iconEl = document.getElementById('event-icon');
        if(iconEl) iconEl.setAttribute('data-lucide', eventData.icon);
        
        const glowBg = document.getElementById('event-glow-bg');
        const iconContainer = document.getElementById('event-icon-container');
        const btn = document.getElementById('btn-claim-event');
        
        const themeMap = {
            blue: { bg: 'bg-blue-500/20', icon: 'text-blue-400 border-blue-500/50 bg-blue-900/40', btn: 'bg-blue-600 hover:bg-blue-500 text-white' },
            yellow: { bg: 'bg-yellow-500/20', icon: 'text-yellow-400 border-yellow-500/50 bg-yellow-900/40', btn: 'bg-yellow-600 hover:bg-yellow-500 text-white' },
            red: { bg: 'bg-red-500/20', icon: 'text-red-400 border-red-500/50 bg-red-900/40', btn: 'bg-red-600 hover:bg-red-500 text-white' },
            purple: { bg: 'bg-purple-500/20', icon: 'text-purple-400 border-purple-500/50 bg-purple-900/40', btn: 'bg-purple-600 hover:bg-purple-500 text-white' },
            emerald: { bg: 'bg-emerald-500/20', icon: 'text-emerald-400 border-emerald-500/50 bg-emerald-900/40', btn: 'bg-emerald-600 hover:bg-emerald-500 text-white' }
        };
        const theme = themeMap[eventData.theme] || themeMap.blue;

        if(glowBg) glowBg.className = `absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-[60px] pointer-events-none transition-colors duration-1000 ${theme.bg}`;
        if(iconContainer) iconContainer.className = `w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-2xl mb-5 border-2 anim-event-icon ${theme.icon}`;
        if(btn) btn.className = `w-full py-4 rounded-xl font-black text-sm btn-press transition-all shadow-lg flex items-center justify-center gap-2 ${theme.btn}`;

        let rewardsHtml = '';
        if (eventData.xp > 0) rewardsHtml += `<div class="text-center"><span class="block text-2xl font-black text-yellow-400">+${eventData.xp}</span><span class="text-[10px] text-white/50 font-bold uppercase tracking-wider">XP</span></div>`;
        if (eventData.coins > 0) rewardsHtml += `<div class="text-center"><span class="block text-2xl font-black text-yellow-500">+${eventData.coins}</span><span class="text-[10px] text-white/50 font-bold uppercase tracking-wider">ذهب</span></div>`;
        
        const rewardsBox = document.getElementById('event-rewards-box');
        if(rewardsBox) rewardsBox.innerHTML = rewardsHtml;

        if(btn) {
            btn.onclick = () => {
                if(eventData.xp > 0) state.xp += eventData.xp;
                if(eventData.coins > 0) state.coins += eventData.coins;
                saveState();
                closeRandomEvent();
                showToast(`تم استلام مكافأة "${eventData.title}" بنجاح!`, 'reward');
            };
        }

        const modal = document.getElementById('modal-random-event');
        const content = document.getElementById('modal-random-event-content');
        if(modal && content) {
            lucide.createIcons({ root: modal });
            modal.classList.remove('hidden'); modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('opacity-0'); modal.classList.add('modal-overlay-enter');
                content.classList.remove('opacity-0', 'scale-95'); content.classList.add('modal-animate-enter');
            }, 10);
        }
    }

    function closeRandomEvent() {
        const modal = document.getElementById('modal-random-event');
        if(!modal) return;
        modal.classList.remove('modal-overlay-enter'); modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden'); modal.style.display = 'none';
            pendingRandomEvent = null;
        }, 500);
    }

    function updateDailyStreak() {
        const todayStr = new Date().toDateString();
        if (state.lastActionDate === todayStr) return;
        if (state.streak === 0) state.streak = 1;
        else {
            state.streak += 1; playSound('success');
            setTimeout(() => { showToast(`يوم جديد في سلسلة الاستمرارية 🔥 (${state.streak} أيام متواصلة!)`, 'success'); }, 1000);
        }
        state.lastActionDate = todayStr; saveState();
    }

    function trackProductivity(value) {
        const daysMap = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const currentDayArabic = daysMap[new Date().getDay()];
        state.productivity[currentDayArabic] = (state.productivity[currentDayArabic] || 0) + value;
        saveState();
    }

    function updateHeatmap(points) {
        const todayStr = new Date().toISOString().split('T')[0];
        const current = state.heatmapData[todayStr] || 0;
        state.heatmapData[todayStr] = Math.max(0, current + points);
        saveState();
        renderHeatmap();
    }

    function renderHeatmap() {
        const container = document.getElementById('heatmap-container');
        if(!container) return;

        const today = new Date();
        let gridHTML = '';
        
        for (let w = 13; w >= 0; w--) {
            gridHTML += `<div class="flex flex-col gap-1.5">`;
            for (let d = 6; d >= 0; d--) {
                const daysAgo = (w * 7) + d;
                const date = new Date(today);
                date.setDate(date.getDate() - daysAgo);
                const dateStr = date.toISOString().split('T')[0];
                const points = state.heatmapData[dateStr] || 0;
                
                let bgClass = 'bg-white/5 border-white/5';
                if (points > 0 && points <= 15) bgClass = 'bg-blue-500/30 border-blue-500/20';
                else if (points > 15 && points <= 40) bgClass = 'bg-blue-500/60 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
                else if (points > 40) bgClass = 'bg-blue-400 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.6)]';

                gridHTML += `<div class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] border ${bgClass} transition-all hover:scale-125 hover:z-10 hover:ring-1 ring-white" title="${dateStr}: ${points} نقطة نشاط"></div>`;
            }
            gridHTML += `</div>`;
        }

        container.innerHTML = gridHTML;
        
        // Scroll to end (most recent)
        setTimeout(() => {
            const scrollContainer = container.parentElement;
            if (scrollContainer) scrollContainer.scrollLeft = 0; // RTL scrolls to 0 for rightmost
        }, 50);
    }

    function showWeeklyReportModal(report) {
        playSound('reward');
        const reportWeekNum = document.getElementById('report-week-num');
        const reportTasks = document.getElementById('report-tasks');
        const reportXp = document.getElementById('report-xp');
        const reportFocus = document.getElementById('report-focus');

        if(reportWeekNum) reportWeekNum.innerText = report.week;
        if(reportTasks) reportTasks.innerText = report.stats.tasks;
        if(reportXp) reportXp.innerText = report.stats.xp;
        if(reportFocus) reportFocus.innerText = report.stats.focus;

        const modal = document.getElementById('modal-weekly-report');
        const content = document.getElementById('modal-weekly-report-content');
        if(modal && content) {
            modal.classList.remove('hidden'); modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('opacity-0'); modal.classList.add('modal-overlay-enter');
                content.classList.remove('opacity-0', 'scale-95'); content.classList.add('modal-animate-enter');
            }, 10);
        }
    }

    function closeWeeklyReport() {
        const modal = document.getElementById('modal-weekly-report');
        if(!modal) return;
        modal.classList.remove('modal-overlay-enter'); modal.classList.add('opacity-0');
        setTimeout(() => { modal.classList.add('hidden'); modal.style.display = 'none'; }, 300);
    }

    function undoAdvanceWeek() {
        restoreSnapshot(); closeWeeklyReport(); showToast('تم التراجع عن إنهاء الأسبوع بنجاح.', 'info');
    }

    function renderWeeklyHistory() {
        const container = document.getElementById('ui-weekly-history');
        if (!container) return;
        if (state.weeklyReports.length === 0) {
            container.innerHTML = `<div class="p-6 text-center border-dashed border-2 border-white/10 rounded-2xl opacity-60"><p class="text-sm text-white/70">لم تقم بإنهاء أي أسبوع حتى الآن. استمر في العمل وستظهر تقاريرك هنا.</p></div>`;
            return;
        }
        container.innerHTML = state.weeklyReports.map(report => `
            <div class="glass-panel p-4 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors group">
                <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                            <span class="text-xs font-black text-purple-400">${report.week}</span>
                        </div>
                        <h4 class="text-sm font-bold text-white">حصاد الأسبوع</h4>
                    </div>
                    <span class="text-[10px] text-white/40 font-medium">${report.date}</span>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="bg-black/40 rounded-xl p-2 text-center border border-white/5">
                        <div class="text-[10px] text-white/50 mb-1">المهام</div>
                        <div class="text-sm font-black text-blue-400">${report.stats.tasks}</div>
                    </div>
                    <div class="bg-black/40 rounded-xl p-2 text-center border border-white/5">
                        <div class="text-[10px] text-white/50 mb-1">خبرة XP</div>
                        <div class="text-sm font-black text-yellow-400">${report.stats.xp}</div>
                    </div>
                    <div class="bg-black/40 rounded-xl p-2 text-center border border-white/5">
                        <div class="text-[10px] text-white/50 mb-1">تركيز (د)</div>
                        <div class="text-sm font-black text-emerald-400">${report.stats.focus}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    let isAudioInitialized = false;
    let synth = null;
    let ambientNoise = null;
    let isAmbientPlaying = false;
    
    async function initAudio() {
        if (!isAudioInitialized) {
            try {
                await Tone.start();
                synth = new Tone.PolySynth(Tone.Synth).toDestination();
                synth.volume.value = -12;
                isAudioInitialized = true;
            } catch (error) {
                console.warn("Audio initialization prevented by browser policy until user interacts.");
            }
        }
    }

    async function playSound(type) {
        try {
            await initAudio();
            if (!isAudioInitialized || !synth) return;
            if (Tone.context.state !== 'running') await Tone.context.resume();
            
            if (type === 'success') synth.triggerAttackRelease(["C5", "E5"], "16n");
            else if (type === 'pop') synth.triggerAttackRelease("G4", "32n");
            else if (type === 'reward') {
                const now = Tone.now();
                synth.triggerAttackRelease("C4", "16n", now);
                synth.triggerAttackRelease("E4", "16n", now + 0.1);
                synth.triggerAttackRelease("G4", "16n", now + 0.2);
                synth.triggerAttackRelease("C5", "8n", now + 0.3);
            } else if (type === 'achievement') {
                const now = Tone.now();
                synth.triggerAttackRelease("E4", "8n", now);
                synth.triggerAttackRelease("G4", "8n", now + 0.08);
                synth.triggerAttackRelease("B4", "8n", now + 0.16);
                synth.triggerAttackRelease("E5", "4n", now + 0.24);
            } else if (type === 'hit') synth.triggerAttackRelease("G2", "16n");
            else if (type === 'epic_hit') {
                const now = Tone.now();
                synth.triggerAttackRelease("E2", "8n", now);
                synth.triggerAttackRelease("G2", "8n", now + 0.1);
                synth.triggerAttackRelease("E1", "4n", now + 0.2);
            }
        } catch (error) {
            console.warn("Sound blocked by browser policy.");
        }
    }

    function toggleAmbientSound() {
        initAudio().then(() => {
            if (Tone.context.state !== 'running') Tone.context.resume();
            
            const btn = document.getElementById('btn-ambient-toggle');
            if (!ambientNoise) {
                const filter = new Tone.Filter(300, "lowpass").toDestination();
                ambientNoise = new Tone.Noise("brown").connect(filter);
                ambientNoise.volume.value = -8; 
            }

            if (isAmbientPlaying) {
                ambientNoise.stop();
                if(btn) {
                    btn.classList.replace('text-blue-400', 'text-white/50');
                    btn.classList.replace('bg-blue-500/10', 'bg-transparent');
                    btn.classList.replace('border-blue-500/30', 'border-white/10');
                    btn.innerHTML = `<i data-lucide="wind" class="w-4 h-4"></i><span class="text-sm font-medium">صوت هواء هادئ</span>`;
                }
            } else {
                ambientNoise.start();
                if(btn) {
                    btn.classList.replace('text-white/50', 'text-blue-400');
                    btn.classList.replace('bg-transparent', 'bg-blue-500/10');
                    btn.classList.replace('border-white/10', 'border-blue-500/30');
                    btn.innerHTML = `<i data-lucide="wind" class="w-4 h-4"></i><span class="text-sm font-medium">إيقاف الصوت الهادئ</span>`;
                }
            }
            isAmbientPlaying = !isAmbientPlaying;
            lucide.createIcons({ root: btn });
        }).catch(e => console.warn(e));
    }

    function showToast(message, type = 'info', allowUndo = false) {
        const container = document.getElementById('toast-container');
        if(!container) return;

        const toast = document.createElement('div');
        let iconHtml = '<i data-lucide="info" class="w-5 h-5 text-blue-400"></i>';
        let bgClass = 'bg-blue-500/10 border-blue-500/20';
        
        if (type === 'success') {
            iconHtml = '<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400"></i>';
            bgClass = 'bg-emerald-500/10 border-emerald-500/20';
        } else if (type === 'reward' || type === 'coin' || type === 'achievement') {
            iconHtml = '<i data-lucide="crown" class="w-5 h-5 text-yellow-400"></i>';
            bgClass = 'bg-yellow-500/10 border-yellow-500/20';
        } else if (type === 'hit' || type === 'epic_hit') {
            iconHtml = '<i data-lucide="swords" class="w-5 h-5 text-red-400"></i>';
            bgClass = 'bg-red-500/10 border-red-500/20';
        }

        toast.className = `flex items-center gap-3 p-3.5 rounded-2xl glass-panel shadow-2xl border ${bgClass} toast-enter pointer-events-auto`;
        toast.innerHTML = `<div class="shrink-0 bg-black/40 p-2 rounded-full">${iconHtml}</div><p class="text-sm font-medium text-white flex-1 leading-snug">${escapeHTML(message)}</p>`;

        if (allowUndo) {
            const undoBtn = document.createElement('button');
            undoBtn.className = 'ml-2 shrink-0 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors';
            undoBtn.innerHTML = `<i data-lucide="undo-2" class="w-3.5 h-3.5"></i> تراجع`;
            undoBtn.onclick = () => {
                restoreSnapshot();
                toast.classList.replace('toast-enter', 'toast-leave');
                setTimeout(() => toast.remove(), 400);
            };
            toast.appendChild(undoBtn);
        }
        container.appendChild(toast);
        lucide.createIcons({ root: toast });
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.replace('toast-enter', 'toast-leave');
                setTimeout(() => toast.remove(), 400);
            }
        }, 4000);
    }

    function switchTab(tabId) {
        const navs = ['dashboard', 'goals', 'focus', 'store', 'stats', 'profile', 'schedule', 'exams', 'weaknesses'];
        navs.forEach(nav => {
            const btn = document.getElementById(`nav-${nav}`);
            const section = document.getElementById(`view-${nav}`);
            if (nav === tabId) {
                let activeColor = 'text-blue-400 bg-blue-500/10';
                if(tabId === 'goals') activeColor = 'text-purple-400 bg-purple-500/10';
                if(tabId === 'store') activeColor = 'text-yellow-400 bg-yellow-500/10';
                if(tabId === 'schedule') activeColor = 'text-emerald-400 bg-emerald-500/10';
                if(tabId === 'exams') activeColor = 'text-indigo-400 bg-indigo-500/10';
                if(tabId === 'weaknesses') activeColor = 'text-rose-400 bg-rose-500/10';
                
                if (btn) btn.className = `flex-1 min-w-[50px] py-2 rounded-xl flex flex-col items-center gap-1 transition-all shadow-inner ${activeColor}`;
                if (section) section.classList.add('active');
            } else {
                if (btn) btn.className = "flex-1 min-w-[50px] py-2 rounded-xl flex flex-col items-center gap-1 transition-all text-white/50 hover:text-white";
                if (section) section.classList.remove('active');
            }
        });

        if (tabId === 'dashboard') { renderTasks(); renderHabits(); }
        if (tabId === 'goals') renderGoals();
        if (tabId === 'store') renderStore();
        if (tabId === 'stats') { renderStats(); renderJourney(); renderProductivityChart(); renderWeeklyHistory(); }
        if (tabId === 'profile') { renderProfile(); renderAchievements(); }
        if (tabId === 'schedule') renderSchedule();
        if (tabId === 'exams') renderExams();
        if (tabId === 'weaknesses') renderWeaknesses();
        if (tabId === 'focus') { updateStopwatchUI(true); renderHeatmap(); renderStudyTimeTable(); renderSmartInsights(); renderRecentSessions(); }
        
        const navBar = document.querySelector('nav');
        if(navBar) lucide.createIcons({ root: navBar });
    }

    function checkAchievements() {
        let unlockedAny = false;
        ACHIEVEMENTS_TEMPLATES.forEach(tmpl => {
            if (state.unlockedAchievements.includes(tmpl.id)) return;
            
            let isConditionMet = false;
            if (tmpl.id === 'first_task' && state.tasks.filter(t => t.completed).length >= 1) isConditionMet = true;
            if (tmpl.id === 'focus_50' && state.totalFocusMinutes >= 50) isConditionMet = true;
            if (tmpl.id === 'streak_3' && state.streak >= 3) isConditionMet = true;
            if (tmpl.id === 'schedule_pro' && (state.lessons.length + state.studyPlan.length) >= 3) isConditionMet = true;
            if (tmpl.id === 'gold_master' && state.coins >= 1000) isConditionMet = true;

            if (isConditionMet) {
                state.unlockedAchievements.push(tmpl.id); state.xp += tmpl.xp; state.coins += tmpl.xp; unlockedAny = true;
                setTimeout(() => { playSound('achievement'); showToast(`🏆 إنجاز جديد مذهل! فتحت وسام "${tmpl.title}" وحصلت على +${tmpl.xp} XP وذهب!`, 'achievement'); }, 800);
            }
        });
        if (unlockedAny) updateGlobalUI();
    }

    function renderAchievements() {
        const container = document.getElementById('ui-achievements-container');
        if (!container) return;
        container.innerHTML = ACHIEVEMENTS_TEMPLATES.map(tmpl => {
            const isUnlocked = state.unlockedAchievements.includes(tmpl.id);
            const rankColor = tmpl.rank === 'ذهبي' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' : tmpl.rank === 'فضي' ? 'text-slate-300 border-slate-500/30 bg-slate-500/5' : 'text-orange-400 border-orange-500/30 bg-orange-500/5';
            
            return `
            <div class="achievement-card glass-panel p-4 rounded-2xl flex items-center gap-3 border ${isUnlocked ? 'border-yellow-500/20 bg-yellow-500/[0.02]' : 'border-white/5 opacity-40'}">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isUnlocked ? rankColor : 'bg-white/5 border border-white/10 text-white/40'}">
                    <i data-lucide="${tmpl.icon}" class="w-6 h-6"></i>
                </div>
                <div class="flex-1 min-w-0 text-right">
                    <div class="flex items-center justify-between">
                        <h4 class="text-xs font-bold ${isUnlocked ? 'text-white' : 'text-white/50'} truncate">${tmpl.title}</h4>
                        <span class="text-[8px] font-bold px-1.5 py-0.5 rounded ${rankColor}">${tmpl.rank}</span>
                    </div>
                    <p class="text-[10px] text-white/40 mt-1 leading-snug">${tmpl.desc}</p>
                    ${isUnlocked ? `<span class="text-[9px] text-yellow-400 font-black mt-2 inline-block">+${tmpl.xp} XP/ذهب</span>` : '<span class="text-[9px] text-white/20 mt-2 inline-block">مغلق</span>'}
                </div>
            </div>`;
        }).join('');
        lucide.createIcons({ root: container });
    }

    function addHabit(e) {
        e.preventDefault();
        const input = document.getElementById('new-habit-input');
        const text = input.value.trim();
        if (!text) return;
        state.habits.unshift({ id: Date.now(), title: text, completed: false, icon: 'check-square' });
        input.value = ''; input.blur(); saveState(); renderHabits(); showToast('تمت إضافة العادة بنجاح!', 'success');
    }

    function toggleHabit(id) {
        const habit = state.habits.find(h => h.id === id);
        if (!habit) return;
        saveSnapshot(); habit.completed = !habit.completed;

        if (habit.completed) {
            state.xp += 10; state.coins += 10; 
            state.todayStats.xp += 10; state.weeklyStats.xp += 10;
            updateHeatmap(10);
            playSound('pop'); showToast(`أحسنت! أتممت عادة اليوم. +10 XP وذهبة`, 'success'); trackProductivity(5);
        } else {
            state.xp = Math.max(0, state.xp - 10); state.coins = Math.max(0, state.coins - 10); 
            state.todayStats.xp = Math.max(0, state.todayStats.xp - 10); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - 10);
            updateHeatmap(-10);
            showToast('تم التراجع عن العادة', 'info'); trackProductivity(-5);
        }
        saveState(); renderHabits();
    }

    function deleteHabit(id, e) {
        e.stopPropagation(); saveSnapshot(); state.habits = state.habits.filter(h => h.id !== id);
        saveState(); renderHabits(); showToast('تم حذف العادة', 'info');
    }

    function renderHabits() {
        const container = document.getElementById('ui-habits-container');
        if(!container) return;
        if (state.habits.length === 0) {
            container.innerHTML = `<div class="col-span-full py-4 text-center text-white/30 text-xs">اضف بعض العادات الثابتة لتدعم روتينك اليومي.</div>`;
            return;
        }
        container.innerHTML = state.habits.map(habit => {
            return `
            <div onclick="toggleHabit(${habit.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="glass-panel p-3 rounded-xl flex items-center justify-between cursor-pointer btn-press border ${habit.completed ? 'border-emerald-500/40 bg-emerald-500/5 opacity-60' : 'border-white/5 hover:bg-white/[0.02]'}">
                <div class="flex items-center gap-2 flex-1 min-w-0">
                    <div class="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${habit.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20'}">
                        ${habit.completed ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                    </div>
                    <span class="text-xs font-semibold truncate ${habit.completed ? 'line-through text-white/40' : 'text-white/90'}">${escapeHTML(habit.title)}</span>
                </div>
                <button onclick="deleteHabit(${habit.id}, event)" aria-label="حذف العادة" class="p-1 hover:bg-red-500/10 text-white/20 hover:text-red-400 rounded-lg transition-colors"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>`;
        }).join('');
        lucide.createIcons({ root: container });
    }

    let isZenMode = false;
    let wasAmbientPlayingBeforeZen = false;

    function toggleZenMode() {
        initAudio().catch(e=>console.warn(e));
        const overlay = document.getElementById('zen-overlay');
        if(!overlay) return;

        if (!isZenMode) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'flex';
            
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) docElm.requestFullscreen().catch(() => {});
            else if (docElm.webkitRequestFullscreen) docElm.webkitRequestFullscreen(); 
            
            setTimeout(() => { overlay.classList.add('zen-active'); }, 20);
            
            wasAmbientPlayingBeforeZen = isAmbientPlaying;
            if (!isAmbientPlaying) toggleAmbientSound();

            isZenMode = true;
            updateStopwatchUI();
        } else {
            overlay.classList.remove('zen-active');
            setTimeout(() => { 
                overlay.classList.add('hidden');
                overlay.style.display = '';
            }, 700);
            
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if(document.exitFullscreen) document.exitFullscreen().catch(() => {});
                else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
            }
            
            if (isAmbientPlaying && !wasAmbientPlayingBeforeZen) toggleAmbientSound();

            isZenMode = false;
        }
        lucide.createIcons({ root: overlay });
    }

    function updateMainGoal(val) {
        const newVal = val.trim();
        if (newVal === state.mainGoal) return;
        state.mainGoal = newVal; saveState(); updateGlobalUI();
        if (newVal) showToast('تم تحديث هدفك الأعظم! لن نجعلك تنساه أبداً.', 'success');
    }

    function addBigQuest(event) {
        event.preventDefault();
        const input = document.getElementById('new-goal-input');
        const text = input.value.trim();
        if (!text) return;
        state.goals.unshift({ id: Date.now(), text, completed: false });
        input.value = ''; input.blur(); saveState(); renderGoals(); showToast('تم إضافة المهمة الكبرى بنجاح!', 'info');
    }

    function toggleBigQuest(id) {
        const goal = state.goals.find(g => g.id === id);
        if (!goal) return;
        saveSnapshot(); goal.completed = !goal.completed;
        
        if (goal.completed) {
            state.xp += 500; state.coins += 500; 
            state.todayStats.xp += 500; state.weeklyStats.xp += 500;
            updateHeatmap(100);
            updateDailyStreak(); playSound('reward');
            showToast(`إنجاز أسطوري للمهمة الكبرى! +500 XP وذهب`, 'success', true);
            trackProductivity(100);
        } else {
            state.xp = Math.max(0, state.xp - 500); state.coins = Math.max(0, state.coins - 500);
            state.todayStats.xp = Math.max(0, state.todayStats.xp - 500); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - 500);
            updateHeatmap(-100);
            showToast('تم التراجع عن المهمة الكبرى', 'info', true); trackProductivity(-100);
        }
        saveState(); renderGoals();
    }

    function deleteBigQuest(id, event) {
        event.stopPropagation(); saveSnapshot(); state.goals = state.goals.filter(g => g.id !== id);
        saveState(); renderGoals(); showToast('تم الحذف', 'info', true);
    }

    function renderGoals() {
        const mainGoalInput = document.getElementById('ui-main-goal-input');
        if(mainGoalInput) mainGoalInput.value = state.mainGoal;
        
        const container = document.getElementById('ui-goals-container');
        if(!container) return;

        if (state.goals.length === 0) {
            container.innerHTML = `<div class="glass-panel rounded-3xl p-8 text-center opacity-70 border-dashed border-2 border-white/10 mt-4"><p class="text-sm text-white/70">لا توجد مهام كبرى حالياً. أضف الامتحانات أو المشاريع الكبيرة هنا.</p></div>`;
            return;
        }
        container.innerHTML = state.goals.map(goal => {
            return `
            <div onclick="toggleBigQuest(${goal.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="group glass-panel p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all btn-press border ${goal.completed ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 hover:bg-white/[0.03]'}">
                <div class="flex items-center gap-3 flex-1 overflow-hidden">
                    <div class="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${goal.completed ? 'bg-purple-500 border-purple-500' : 'border-white/20'}">
                        ${goal.completed ? '<i data-lucide="star" class="w-4 h-4 text-white"></i>' : '<i data-lucide="target" class="w-3.5 h-3.5 text-white/40"></i>'}
                    </div>
                    <div class="flex flex-col flex-1 min-w-0">
                        <span class="text-sm font-bold truncate ${goal.completed ? 'line-through text-purple-200/60' : 'text-white'}">${escapeHTML(goal.text)}</span>
                        <span class="text-[10px] font-bold ${goal.completed ? 'text-purple-400/50' : 'text-purple-400'}">+500 XP</span>
                    </div>
                </div>
                <button onclick="deleteBigQuest(${goal.id}, event)" aria-label="حذف المهمة الكبرى" class="p-2 hover:bg-red-500/20 text-white/20 hover:text-red-400 rounded-xl transition-colors shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>`;
        }).join('');
        lucide.createIcons({ root: container });
    }

    function updateUserName(newName) {
        if(newName.trim().length === 0) {
            const nameInput = document.getElementById('ui-profile-name');
            if(nameInput) nameInput.value = state.userName;
            return;
        }
        state.userName = newName.trim(); saveState(); showToast('تم تحديث اسم البطل!', 'success');
    }

    function selectAvatar(id, reqLvl) {
        if (getLevel() < reqLvl) {
            showToast(`هذا الأفاتار مقفول! تحتاج للوصول للمستوى ${reqLvl} لفتحه.`, 'info'); return;
        }
        state.avatarId = id; saveState(); renderProfile(); showToast('تم تغيير هويتك بنجاح!', 'success');
    }

    function renderProfile() {
        const nameInput = document.getElementById('ui-profile-name');
        if(nameInput) nameInput.value = state.userName;
        
        const container = document.getElementById('ui-avatar-grid');
        if(!container) return;

        const level = getLevel();
        
        container.innerHTML = AVATARS_DATA.map(av => {
            const isSelected = state.avatarId === av.id; 
            const isLocked = level < av.reqLvl;
            let lockOverlay = '';
            
            if (isLocked) {
                lockOverlay = `<div class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 rounded-2xl"><i data-lucide="lock" class="w-6 h-6 text-white/80 mb-1"></i><span class="text-[9px] font-bold text-white bg-red-500/80 px-1.5 py-0.5 rounded">Lvl ${av.reqLvl}</span></div>`;
            }

            const decs = isSelected && !isLocked ? getAvatarDecorationsHtml(level, true) : '';
            const aura = isSelected && !isLocked ? getAvatarAuraClass(level) : 'border border-white/10 hover:border-white/30';
            const scale = isSelected ? 'scale-95' : '';

            return `
            <div onclick="selectAvatar(${av.id}, ${av.reqLvl})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="relative aspect-square rounded-2xl cursor-pointer transition-transform btn-press ${scale} ${aura}">
                <div class="w-full h-full rounded-2xl overflow-hidden ${isLocked ? 'locked-avatar' : ''}">
                    ${av.svg}
                </div>
                ${decs}
                ${lockOverlay}
            </div>`;
        }).join('');
        lucide.createIcons({ root: container });
    }

    let resetClickCount = 0;
    function requestReset() {
        const btn = document.getElementById('btn-reset-data');
        if(!btn) return;

        if (resetClickCount === 0) {
            resetClickCount++;
            btn.className = "w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold btn-press transition-all animate-pulse";
            btn.innerText = "هل أنت متأكد؟ (اضغط مجدداً للتأكيد)";
            setTimeout(() => {
                resetClickCount = 0;
                btn.className = "w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold btn-press transition-all";
                btn.innerText = "إعادة تهيئة البيانات (Reset)";
            }, 3000);
        } else {
            saveSnapshot(); state = JSON.parse(JSON.stringify(INITIAL_STATE)); saveState();
            resetClickCount = 0;
            btn.className = "w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold btn-press transition-all";
            btn.innerText = "إعادة تهيئة البيانات (Reset)";
            switchTab('dashboard'); showToast('تم مسح جميع البيانات والعودة لنقطة الصفر.', 'info', true);
        }
    }

    function addTask(event) {
        event.preventDefault();
        const input = document.getElementById('new-task-input');
        const text = input.value.trim();
        if (!text) return;
        const categoryElement = document.querySelector('input[name="taskCategory"]:checked');
        const category = categoryElement ? categoryElement.value : 'study';
        const xpReward = Math.floor(Math.random() * 10) + 15;
        state.tasks.unshift({ id: Date.now(), text, category, completed: false, xp: xpReward });
        input.value = ''; input.blur(); saveState(); renderTasks(); showToast('تمت الإضافة! توكل على الله.', 'info');
    }

    function toggleTask(id) {
        const task = state.tasks.find(t => t.id === id);
        if (!task) return;
        saveSnapshot(); task.completed = !task.completed;
        
        if (task.completed) {
            state.xp += task.xp; state.coins += task.xp; state.stats[task.category] += 1;
            state.todayStats.tasks += 1; state.todayStats.xp += task.xp;
            state.weeklyStats.tasks += 1; state.weeklyStats.xp += task.xp;
            updateHeatmap(task.xp);
            updateDailyStreak(); playSound('success'); showToast(`عاش! +${task.xp} XP وعملة`, 'success', true);
            trackProductivity(task.xp);
        } else {
            state.xp = Math.max(0, state.xp - task.xp); state.coins = Math.max(0, state.coins - task.xp);
            state.stats[task.category] = Math.max(0, state.stats[task.category] - 1);
            state.todayStats.tasks = Math.max(0, state.todayStats.tasks - 1); state.todayStats.xp = Math.max(0, state.todayStats.xp - task.xp);
            state.weeklyStats.tasks = Math.max(0, state.weeklyStats.tasks - 1); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - task.xp);
            updateHeatmap(-task.xp);
            showToast('تم إلغاء إنجاز المهمة', 'info', true); trackProductivity(-task.xp);
        }
        saveState(); renderTasks();
    }

    function deleteTask(id, event) {
        event.stopPropagation(); saveSnapshot(); state.tasks = state.tasks.filter(t => t.id !== id);
        saveState(); renderTasks(); showToast('تم حذف المهمة', 'info', true);
    }

    function renderTasks() {
        const container = document.getElementById('ui-tasks-container');
        if(!container) return;

        if (state.tasks.length === 0) {
            container.innerHTML = `<div class="glass-panel rounded-3xl p-8 text-center opacity-70 border-dashed border-2 border-white/10 mt-4"><p class="text-sm text-white/70">لا توجد مهام حالياً. أضف مهامك لتصنع أسطورتك!</p></div>`;
            return;
        }
        container.innerHTML = state.tasks.map(task => {
            const style = CATEGORIES[task.category] || CATEGORIES['study'];
            return `
            <div onclick="toggleTask(${task.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="group glass-panel p-4 rounded-[1.5rem] flex items-center justify-between cursor-pointer transition-all btn-press ${task.completed ? 'opacity-50 bg-white/5' : 'hover:bg-white/[0.03]'}">
                <div class="flex items-center gap-3 flex-1 overflow-hidden">
                    <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${task.completed ? `${style.bgCheck} border-transparent` : 'border-white/20'}">
                        ${task.completed ? '<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i>' : ''}
                    </div>
                    <div class="flex flex-col flex-1 min-w-0">
                        <span class="text-sm font-medium truncate ${task.completed ? 'line-through text-white/40' : 'text-white/90'}">${escapeHTML(task.text)}</span>
                        <span class="text-[10px] font-bold ${task.completed ? 'text-white/40' : style.textCheck}">+${task.xp} XP | ${style.label}</span>
                    </div>
                </div>
                <button onclick="deleteTask(${task.id}, event)" aria-label="حذف المهمة" class="p-2 hover:bg-red-500/20 text-white/20 hover:text-red-400 rounded-xl transition-colors shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>`;
        }).join('');
        lucide.createIcons({ root: container });
    }

    // --- Study Session Engine (Stopwatch & Subjects) ---

    function formatStudyTimeShort(minutes) {
        if (!minutes) return '0 د';
        if (minutes < 60) return `${minutes} د`;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return m > 0 ? `${h}س ${m}د` : `${h}س`;
    }

    function updateStopwatchUI(renderIcons = false) {
        const display = document.getElementById('stopwatch-display');
        const spinner = document.getElementById('stopwatch-spinner');
        const pulseBg = document.getElementById('timer-pulse-bg');
        const ringBg = document.getElementById('stopwatch-ring-bg');
        const finishBtn = document.getElementById('btn-stopwatch-finish');
        const toggleBtn = document.getElementById('btn-stopwatch-toggle');
        const resetBtn = document.getElementById('btn-stopwatch-reset');
        const iconToggle = document.getElementById('icon-stopwatch-toggle');
        const subjectLabel = document.getElementById('stopwatch-subject-display');

        if (!display) return;

        let totalMs = state.activeSession.elapsedMs;
        if (state.activeSession.isRunning && state.activeSession.startTime) {
            totalMs += Date.now() - state.activeSession.startTime;
        }

        const totalSeconds = Math.floor(totalMs / 1000);
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');

        display.innerText = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
        
        const zenDisplay = document.getElementById('timer-display-zen');
        if (zenDisplay) zenDisplay.innerText = display.innerText;

        if (state.activeSession.isRunning) {
            display.classList.add('timer-running');
            if (spinner) spinner.style.opacity = '1';
            if (spinner) spinner.style.transform = `rotate(${(totalSeconds % 60) * 6}deg)`; 
            if (pulseBg) pulseBg.classList.replace('opacity-0', 'opacity-100');
            if (pulseBg) pulseBg.classList.add('animate-pulse');
            if (ringBg) ringBg.classList.add('scale-105', 'border-orange-500/20');
            
            if (finishBtn) finishBtn.classList.remove('opacity-50', 'pointer-events-none', 'scale-95');
            if (resetBtn) resetBtn.classList.remove('opacity-50', 'pointer-events-none', 'scale-95');
            
            if (renderIcons && toggleBtn && iconToggle) {
                toggleBtn.className = "w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 flex justify-center items-center btn-focus-action shadow-[0_0_25px_rgba(249,115,22,0.4)]";
                iconToggle.setAttribute('data-lucide', 'pause');
                iconToggle.classList.remove('ml-1');
                lucide.createIcons({ root: toggleBtn });
            }
            if (subjectLabel) {
                subjectLabel.innerText = "جاري التسجيل...";
                subjectLabel.className = "text-orange-400 font-bold text-xs bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20 shadow-inner mt-2 animate-pulse transition-all duration-300";
            }
        } else {
            display.classList.remove('timer-running');
            if (spinner) spinner.style.opacity = '0';
            if (pulseBg) pulseBg.classList.replace('opacity-100', 'opacity-0');
            if (pulseBg) pulseBg.classList.remove('animate-pulse');
            if (ringBg) ringBg.classList.remove('scale-105', 'border-orange-500/20');

            if (totalMs > 0) {
                if (finishBtn) finishBtn.classList.remove('opacity-50', 'pointer-events-none', 'scale-95');
                if (resetBtn) resetBtn.classList.remove('opacity-50', 'pointer-events-none', 'scale-95');
                if (subjectLabel) {
                    subjectLabel.innerText = "مؤقت متوقف";
                    subjectLabel.className = "text-white/50 font-bold text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10 mt-2 transition-all duration-300";
                }
            } else {
                if (finishBtn) finishBtn.classList.add('opacity-50', 'pointer-events-none', 'scale-95');
                if (resetBtn) resetBtn.classList.add('opacity-50', 'pointer-events-none', 'scale-95');
                if (subjectLabel) {
                    subjectLabel.innerText = "جاهز للبدء";
                    subjectLabel.className = "text-blue-400 font-bold text-xs bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 shadow-inner mt-2 transition-all duration-300";
                }
            }

            if (renderIcons && toggleBtn && iconToggle) {
                toggleBtn.className = "w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center btn-focus-action shadow-[0_0_25px_rgba(37,99,235,0.4)]";
                iconToggle.setAttribute('data-lucide', 'play');
                iconToggle.classList.add('ml-1');
                lucide.createIcons({ root: toggleBtn });
            }
        }
    }

    function toggleStopwatch() {
        initAudio().then(() => {
            if (Tone.context && Tone.context.state !== 'running') Tone.context.resume();
        }).catch(e=>console.warn(e));

        if (state.activeSession.isRunning) {
            state.activeSession.elapsedMs += Date.now() - state.activeSession.startTime;
            state.activeSession.isRunning = false;
            state.activeSession.startTime = null;
            clearInterval(stopwatchInterval);
        } else {
            state.activeSession.isRunning = true;
            state.activeSession.startTime = Date.now();
            stopwatchInterval = setInterval(() => updateStopwatchUI(false), 1000);
        }
        saveState();
        updateStopwatchUI(true);
    }

    function resetStopwatch() {
        if(confirm('هل أنت متأكد من إلغاء هذه الجلسة؟ لن يتم حفظ الوقت.')) {
            state.activeSession = { isRunning: false, startTime: null, elapsedMs: 0 };
            clearInterval(stopwatchInterval);
            saveState();
            updateStopwatchUI(true);
        }
    }

    function finishSession() {
        let totalMs = state.activeSession.elapsedMs;
        if (state.activeSession.isRunning && state.activeSession.startTime) {
            totalMs += Date.now() - state.activeSession.startTime;
        }
        
        const minutes = Math.floor(totalMs / 60000);
        
        if (minutes < 1) {
            showToast('الجلسة قصيرة جداً (أقل من دقيقة)، لم يتم حفظها.', 'info');
            return;
        }

        state.activeSession.isRunning = false;
        state.activeSession.elapsedMs = totalMs;
        state.activeSession.startTime = null;
        clearInterval(stopwatchInterval);
        saveState();
        updateStopwatchUI(true);

        const h = Math.floor(totalMs / 3600000).toString().padStart(2, '0');
        const m = Math.floor((totalMs % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
        
        document.getElementById('modal-save-duration').innerText = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
        
        renderModalSubjects();
        
        const modal = document.getElementById('modal-save-session');
        const content = document.getElementById('modal-save-session-content');
        modal.classList.remove('hidden'); modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.remove('opacity-0'); modal.classList.add('modal-overlay-enter');
            content.classList.remove('opacity-0', 'scale-95'); content.classList.add('modal-animate-enter');
        }, 10);
    }

    function closeSaveSessionModal() {
        const modal = document.getElementById('modal-save-session');
        modal.classList.remove('modal-overlay-enter'); modal.classList.add('opacity-0');
        setTimeout(() => { modal.classList.add('hidden'); modal.style.display = 'none'; }, 300);
    }

    function renderModalSubjects() {
        const container = document.getElementById('modal-subject-list');
        if (state.studySubjects.length === 0) {
            container.innerHTML = `<div class="text-center p-4 border border-dashed border-white/20 rounded-xl opacity-70 mb-2"><p class="text-sm text-white/70">لم تقم بإضافة أي مواد بعد. أضف مادتك الأولى بالأسفل لحفظ الجلسة.</p></div>`;
            return;
        }
        
        container.innerHTML = state.studySubjects.map(sub => `
            <button onclick="confirmSaveSession(${sub.id})" class="w-full text-right p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all flex items-center justify-between group btn-press mb-2">
                <span class="font-bold text-white group-hover:text-blue-400">${escapeHTML(sub.name)}</span>
                <i data-lucide="chevron-left" class="w-4 h-4 text-white/30 group-hover:text-blue-400"></i>
            </button>
        `).join('');
        lucide.createIcons({ root: container });
    }

    function addStudySubjectFromModal() {
        const input = document.getElementById('new-study-subject-input');
        const name = input.value.trim();
        if (!name) return;
        
        state.studySubjects.push({
            id: Date.now(),
            name: name,
            totalMinutes: 0,
            weeklyGoal: 0,
            lastStudied: 'لم تُدرس بعد',
            history: []
        });
        input.value = '';
        saveState();
        renderModalSubjects();
        renderStudyTimeTable();
        renderSmartInsights();
    }

    function confirmSaveSession(subjectId) {
        const subject = state.studySubjects.find(s => s.id === subjectId);
        if (!subject) return;

        const totalMs = state.activeSession.elapsedMs;
        const minutes = Math.floor(totalMs / 60000);
        
        if(!subject.history) subject.history = [];
        
        const todayStr = new Date().toISOString().split('T')[0];
        
        subject.history.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            date: todayStr,
            minutes: minutes,
            timestamp: Date.now()
        });
        
        subject.totalMinutes += minutes;
        subject.lastStudied = new Date().toLocaleDateString('ar-EG');
        
        const xpReward = minutes * 2;
        const coinReward = minutes * 1;
        state.xp += xpReward;
        state.coins += coinReward;
        state.totalFocusMinutes += minutes;
        state.todayStats.focus += minutes;
        state.weeklyStats.focus += minutes;
        
        trackProductivity(minutes * 2);
        updateHeatmap(minutes * 2);
        updateDailyStreak();
        
        state.activeSession = { isRunning: false, startTime: null, elapsedMs: 0 };
        
        saveState();
        closeSaveSessionModal();
        updateStopwatchUI(true);
        renderStudyTimeTable();
        renderRecentSessions();
        renderSmartInsights();
        
        playSound('reward');
        showToast(`أحسنت! تمت إضافة ${minutes} دقيقة إلى ${subject.name}. +${xpReward} XP`, 'success');
    }

    function setSubjectWeeklyGoal(id) {
        const subject = state.studySubjects.find(s => s.id === id);
        if (!subject) return;
        const currentGoal = subject.weeklyGoal || 0;
        const input = prompt(`أدخل الهدف الأسبوعي بالدقائق لمادة ${subject.name} (مثال: 120 لساعتين):`, currentGoal);
        if (input !== null && !isNaN(input) && input >= 0) {
            subject.weeklyGoal = parseInt(input);
            saveState();
            renderStudyTimeTable();
            showToast('تم تحديث الهدف الأسبوعي بنجاح', 'success');
        }
    }

    function renderStudyTimeTable() {
        const container = document.getElementById('study-subjects-table-body');
        if (!container) return;

        if (state.studySubjects.length === 0) {
            container.innerHTML = `
                <tr><td colspan="6" class="py-10 text-center">
                    <div class="flex flex-col items-center justify-center opacity-50">
                        <i data-lucide="book-dashed" class="w-10 h-10 mb-3 text-white/40"></i>
                        <p class="text-sm text-white/70 font-medium">لا توجد مواد مسجلة.</p>
                        <p class="text-xs text-white/40 mt-1">ابدأ جلسة وأضف مادتك الأولى!</p>
                    </div>
                </td></tr>
            `;
            lucide.createIcons({ root: container });
            return;
        }

        const sortedSubjects = [...state.studySubjects].sort((a, b) => b.totalMinutes - a.totalMinutes);
        const totalAllMinutes = sortedSubjects.reduce((sum, s) => sum + s.totalMinutes, 0) || 1;

        const todayStr = new Date().toISOString().split('T')[0];
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        container.innerHTML = sortedSubjects.map(sub => {
            const percent = Math.round((sub.totalMinutes / totalAllMinutes) * 100);
            const todayMins = sub.history?.filter(h => h.date === todayStr).reduce((acc, curr) => acc + curr.minutes, 0) || 0;
            const weeklyMins = sub.history?.filter(h => new Date(h.date) >= sevenDaysAgo).reduce((acc, curr) => acc + curr.minutes, 0) || 0;
            
            const weeklyGoal = sub.weeklyGoal || 0;
            let goalHtml = '';
            if (weeklyGoal > 0) {
                const goalPercent = Math.min(Math.round((weeklyMins / weeklyGoal) * 100), 100);
                goalHtml = `
                    <div class="mt-2 w-full max-w-[120px]">
                        <div class="flex justify-between text-[9px] text-white/50 mb-0.5">
                            <span>الهدف الأسبوعي</span>
                            <span class="${weeklyMins >= weeklyGoal ? 'text-emerald-400' : ''}">${weeklyMins} / ${weeklyGoal} د</span>
                        </div>
                        <div class="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                            <div class="h-full ${weeklyMins >= weeklyGoal ? 'bg-emerald-500' : 'bg-blue-500'} transition-all duration-1000" style="width: ${goalPercent}%"></div>
                        </div>
                    </div>
                `;
            }

            return `
                <tr class="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
                    <td class="py-3 px-2">
                        <div class="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">${escapeHTML(sub.name)}</div>
                        <div class="text-[10px] text-white/40 mb-1">آخر مرة: ${sub.lastStudied || 'لم تُدرس'}</div>
                        ${goalHtml}
                    </td>
                    <td class="py-3 px-2 text-center text-xs font-bold text-emerald-400">
                        ${formatStudyTimeShort(todayMins)}
                    </td>
                    <td class="py-3 px-2 text-center text-xs font-bold text-blue-400">
                        ${formatStudyTimeShort(weeklyMins)}
                    </td>
                    <td class="py-3 px-2 text-center text-xs font-bold text-indigo-400 bg-indigo-500/5 rounded-lg">
                        ${formatStudyTimeShort(sub.totalMinutes)}
                    </td>
                    <td class="py-3 px-2 text-center w-1/5">
                        <div class="flex items-center justify-center gap-2">
                            <div class="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/10 hidden sm:block">
                                <div class="h-full bg-indigo-500 transition-all duration-1000" style="width: ${percent}%"></div>
                            </div>
                            <span class="text-xs text-white/70 font-medium">${percent}%</span>
                        </div>
                    </td>
                    <td class="py-3 px-2 text-left">
                        <div class="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button onclick="setSubjectWeeklyGoal(${sub.id})" class="p-1.5 text-white/50 hover:text-emerald-400 transition-all hover:scale-110 btn-press" title="الهدف الأسبوعي"><i data-lucide="target" class="w-4 h-4"></i></button>
                            <button onclick="editStudySubject(${sub.id})" class="p-1.5 text-white/50 hover:text-white transition-all hover:scale-110 btn-press" title="تعديل الاسم"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                            <button onclick="deleteStudySubject(${sub.id})" class="p-1.5 text-white/50 hover:text-red-400 transition-all hover:scale-110 btn-press" title="حذف"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        lucide.createIcons({ root: container });
    }

    function renderSmartInsights() {
        const container = document.getElementById('smart-insights-container');
        if (!container) return;

        if (state.studySubjects.length === 0) {
            container.innerHTML = `
                <div class="col-span-full py-8 flex flex-col items-center justify-center opacity-50">
                    <i data-lucide="brain" class="w-10 h-10 mb-3 text-purple-400/50"></i>
                    <p class="text-sm text-white/70 font-medium">لا توجد بيانات كافية للتحليل.</p>
                    <p class="text-xs text-white/40 mt-1">ابدأ جلسة المذاكرة الأولى لجمع البيانات!</p>
                </div>
            `;
            lucide.createIcons({ root: container });
            return;
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const today = new Date();
        
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        let todayMins = 0;
        let weeklyMins = 0;
        let monthlyMins = 0;
        let totalHistoryMins = 0;
        let uniqueStudyDays = new Set();
        
        let mostStudied = null;
        let leastStudied = null;
        let forgotten = null;

        const subjectsWithTime = state.studySubjects.filter(s => s.totalMinutes > 0);
        
        if (subjectsWithTime.length > 0) {
            const sortedByTime = [...subjectsWithTime].sort((a, b) => b.totalMinutes - a.totalMinutes);
            mostStudied = sortedByTime[0];
            leastStudied = sortedByTime[sortedByTime.length - 1];
        }

        let oldestTime = Infinity;
        state.studySubjects.forEach(sub => {
            if (!sub.history || sub.history.length === 0) {
                oldestTime = 0;
                forgotten = sub;
            } else {
                const lastSession = [...sub.history].sort((a, b) => b.timestamp - a.timestamp)[0];
                if (lastSession.timestamp < oldestTime && oldestTime !== 0) {
                    oldestTime = lastSession.timestamp;
                    forgotten = sub;
                }
            }

            if (sub.history) {
                sub.history.forEach(h => {
                    const hDate = new Date(h.date);
                    if (h.date === todayStr) todayMins += h.minutes;
                    if (hDate >= sevenDaysAgo) weeklyMins += h.minutes;
                    if (hDate >= thirtyDaysAgo) monthlyMins += h.minutes;
                    
                    totalHistoryMins += h.minutes;
                    uniqueStudyDays.add(h.date);
                });
            }
        });

        const avgDaily = uniqueStudyDays.size > 0 ? Math.round(totalHistoryMins / uniqueStudyDays.size) : 0;

        container.innerHTML = `
            <div class="insight-card bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <span class="text-[10px] text-white/50 font-bold mb-1">مذاكرة اليوم</span>
                <span class="text-sm font-black text-emerald-400">${formatStudyTimeShort(todayMins)}</span>
            </div>
            <div class="insight-card bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <span class="text-[10px] text-white/50 font-bold mb-1">هذا الأسبوع</span>
                <span class="text-sm font-black text-blue-400">${formatStudyTimeShort(weeklyMins)}</span>
            </div>
            <div class="insight-card bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <span class="text-[10px] text-white/50 font-bold mb-1">هذا الشهر</span>
                <span class="text-sm font-black text-purple-400">${formatStudyTimeShort(monthlyMins)}</span>
            </div>
            <div class="insight-card bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <span class="text-[10px] text-white/50 font-bold mb-1">المتوسط اليومي</span>
                <span class="text-sm font-black text-yellow-400">${formatStudyTimeShort(avgDaily)}</span>
            </div>
            <div class="insight-card bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <span class="text-[10px] text-white/50 font-bold mb-1">الأكثر دراسة</span>
                <span class="text-sm font-black text-white truncate">${mostStudied ? escapeHTML(mostStudied.name) : '-'}</span>
            </div>
            <div class="insight-card bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <span class="text-[10px] text-white/50 font-bold mb-1">الأقل دراسة</span>
                <span class="text-sm font-black text-white/70 truncate">${leastStudied ? escapeHTML(leastStudied.name) : '-'}</span>
            </div>
            <div class="insight-card col-span-2 sm:col-span-2 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-center justify-between">
                <div class="flex flex-col min-w-0">
                    <span class="text-[10px] text-rose-400/70 font-bold mb-0.5">مادة مهملة (تحتاج مراجعة)</span>
                    <span class="text-sm font-black text-rose-400 truncate">${forgotten ? escapeHTML(forgotten.name) : 'لا يوجد'}</span>
                </div>
                <i data-lucide="alert-circle" class="w-5 h-5 text-rose-400 opacity-50 shrink-0"></i>
            </div>
        `;
        lucide.createIcons({ root: container });
    }

    function renderRecentSessions() {
        const container = document.getElementById('recent-sessions-container');
        if (!container) return;

        let allSessions = [];
        state.studySubjects.forEach(sub => {
            if (sub.history) {
                sub.history.forEach((session, index) => {
                    if (!session.id) session.id = sub.id + '_' + index;
                    if (!session.timestamp) session.timestamp = new Date(session.date).getTime() + index;

                    allSessions.push({
                        ...session,
                        subjectId: sub.id,
                        subjectName: sub.name
                    });
                });
            }
        });

        allSessions.sort((a, b) => b.timestamp - a.timestamp);
        const recent = allSessions.slice(0, 15);

        if (recent.length === 0) {
            container.innerHTML = `
                <div class="py-8 flex flex-col items-center justify-center opacity-50">
                    <i data-lucide="history" class="w-10 h-10 mb-3 text-orange-400/50"></i>
                    <p class="text-sm text-white/70 font-medium">لا توجد جلسات مسجلة بعد.</p>
                </div>
            `;
            lucide.createIcons({ root: container });
            return;
        }

        container.innerHTML = recent.map(session => `
            <div class="session-item flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 group">
                <div>
                    <div class="font-bold text-sm text-white group-hover:text-orange-400 transition-colors">${escapeHTML(session.subjectName)}</div>
                    <div class="text-[10px] text-white/50">${session.date}</div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">${formatStudyTimeShort(session.minutes)}</span>
                    <button onclick="deleteSession(${session.subjectId}, '${session.id}')" class="p-1.5 text-white/30 hover:text-red-400 transition-all hover:scale-110 btn-press opacity-50 group-hover:opacity-100" title="حذف الجلسة">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `).join('');
        lucide.createIcons({ root: container });
    }

    function deleteSession(subjectId, sessionId) {
        if (!confirm('هل أنت متأكد من حذف هذه الجلسة؟ سيتم خصم الوقت والخبرة من الإحصائيات.')) return;

        const subject = state.studySubjects.find(s => s.id === subjectId);
        if (!subject) return;

        const sessionIndex = subject.history.findIndex(h => String(h.id) === String(sessionId));
        if (sessionIndex === -1) return;

        const session = subject.history[sessionIndex];
        const minutes = session.minutes;

        subject.history.splice(sessionIndex, 1);
        subject.totalMinutes = Math.max(0, subject.totalMinutes - minutes);

        state.totalFocusMinutes = Math.max(0, state.totalFocusMinutes - minutes);
        
        const todayStr = new Date().toISOString().split('T')[0];
        if (session.date === todayStr) {
            state.todayStats.focus = Math.max(0, state.todayStats.focus - minutes);
        }
        
        const sessionDate = new Date(session.date);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        if (sessionDate >= sevenDaysAgo) {
            state.weeklyStats.focus = Math.max(0, state.weeklyStats.focus - minutes);
        }

        const xpDeduct = minutes * 2;
        const coinDeduct = minutes * 1;
        state.xp = Math.max(0, state.xp - xpDeduct);
        state.coins = Math.max(0, state.coins - coinDeduct);

        if (state.heatmapData[session.date]) {
            state.heatmapData[session.date] = Math.max(0, state.heatmapData[session.date] - xpDeduct);
        }

        const daysMap = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const dayArabic = daysMap[sessionDate.getDay()];
        if (state.productivity[dayArabic]) {
            state.productivity[dayArabic] = Math.max(0, state.productivity[dayArabic] - xpDeduct);
        }

        saveState();
        renderStudyTimeTable();
        renderRecentSessions();
        renderSmartInsights();
        renderHeatmap();
        updateGlobalUI();
        renderProductivityChart();

        showToast('تم حذف الجلسة وإعادة حساب الإحصائيات.', 'info');
    }

    function editStudySubject(id) {
        const subject = state.studySubjects.find(s => s.id === id);
        if (!subject) return;
        const newName = prompt('أدخل الاسم الجديد للمادة:', subject.name);
        if (newName && newName.trim() !== '') {
            subject.name = newName.trim();
            saveState();
            renderStudyTimeTable();
            renderRecentSessions();
            renderSmartInsights();
            showToast('تم تحديث اسم المادة بنجاح', 'success');
        }
    }

    function deleteStudySubject(id) {
        if (!confirm('هل أنت متأكد من حذف هذه المادة؟ سيتم مسح سجل وقتها بالكامل (لن تتأثر الخبرة المكتسبة مسبقاً).')) return;
        state.studySubjects = state.studySubjects.filter(s => s.id !== id);
        saveState();
        renderStudyTimeTable();
        renderRecentSessions();
        renderSmartInsights();
        showToast('تم حذف المادة', 'info');
    }

    function buyMagicItem(itemId) {
        const item = MAGIC_SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        if (state.coins >= item.cost) {
            saveSnapshot();
            state.coins -= item.cost;
            
            if (itemId === 'xp_potion_small') {
                state.xp += 150;
                playSound('reward');
                showToast('شربت الجرعة الصغرى! +150 XP 🧪', 'success');
            } else if (itemId === 'focus_scroll') {
                state.totalFocusMinutes += 60;
                playSound('achievement');
                showToast('قرأت لفيفة التركيز! أُضيف 60 دقيقة لسجلك 📜', 'success');
            } else if (itemId === 'xp_potion') {
                state.xp += 300;
                playSound('reward');
                showToast('شربت إكسير الحكمة! +300 XP 🧪', 'success');
            } else if (itemId === 'streak_shield') {
                state.streak += 3;
                playSound('achievement');
                showToast('توهج درع الاستمرارية! +3 أيام لسلسلتك 🔥', 'success');
            } else if (itemId === 'mystery_box') {
                const rand = Math.random();
                playSound('achievement');
                if (rand < 0.33) {
                    state.xp += 800;
                    showToast('صندوق محظوظ! حصلت على 800 XP 🎁', 'success');
                } else if (rand < 0.66) {
                    state.coins += 800;
                    showToast('صندوق محظوظ! حصلت على 800 ذهب 🎁', 'success');
                } else {
                    state.totalFocusMinutes += 120;
                    showToast('صندوق الزمن! +120 دقيقة تركيز ⏳', 'success');
                }
            } else if (itemId === 'time_freeze') {
                state.xp += 500;
                state.totalFocusMinutes += 100;
                playSound('reward');
                showToast('توقف الزمن! +500 XP و 100 دقيقة تركيز ⌛', 'success');
            } else if (itemId === 'phoenix_feather') {
                state.xp += 1000;
                playSound('achievement');
                showToast('طاقة العنقاء تسري بك! +1000 XP 🪶', 'success');
            } else if (itemId === 'golden_ticket') {
                state.inventory.unshift({ id: Date.now(), title: 'يوم إجازة حر (بدون تأنيب ضمير)' });
                playSound('reward');
                showToast('حصلت على التذكرة الذهبية! تفقد مخزونك 🎟️', 'success');
            } else if (itemId === 'crown_of_king') {
                state.xp += 2000;
                state.totalFocusMinutes += 200;
                playSound('epic_hit');
                showToast('أنت الملك! توجت بـ 2000 XP و 200 دقيقة تركيز 👑', 'achievement');
            }
            
            saveState();
            renderStore();
            updateGlobalUI();
        } else {
            showToast(`تحتاج إلى ${item.cost - state.coins} ذهب إضافي.`, 'info');
        }
    }

    function addReward(e) {
        e.preventDefault();
        const inputEl = document.getElementById('new-reward-input');
        const costEl = document.getElementById('new-reward-cost');
        if(!inputEl || !costEl) return;

        const title = inputEl.value.trim();
        const cost = parseInt(costEl.value);
        if (!title || isNaN(cost) || cost <= 0) return;
        
        state.rewards.unshift({ id: Date.now(), title, cost });
        inputEl.value = ''; costEl.value = '';
        saveState(); renderStore(); showToast('تم إضافة المكافأة', 'success');
    }

    function buyReward(id) {
        const reward = state.rewards.find(r => r.id === id);
        if(!reward) return;

        if (state.coins >= reward.cost) {
            saveSnapshot(); state.coins -= reward.cost; state.inventory.unshift({ id: Date.now(), title: reward.title });
            playSound('reward'); showToast(`تم الشراء: ${reward.title}. تجدها في مخزونك!`, 'success', true);
            saveState(); renderStore(); updateGlobalUI();
        } else { showToast(`تحتاج ${reward.cost - state.coins} ذهب إضافي.`, 'info'); }
    }

    function activateInventoryItem(id) {
        const itemIndex = state.inventory.findIndex(i => i.id === id);
        if (itemIndex === -1) return;
        const item = state.inventory[itemIndex];
        saveSnapshot(); state.inventory.splice(itemIndex, 1);
        playSound('success'); showToast(`تم تفعيل: ${item.title}. استمتع بوقتك! 🎉`, 'reward', true);
        saveState(); renderStore();
    }

    function deleteReward(id, e) {
        e.stopPropagation(); state.rewards = state.rewards.filter(r => r.id !== id); saveState(); renderStore();
    }

    function renderStore() {
        const storeCoinsEl = document.getElementById('ui-store-coins');
        if (storeCoinsEl) storeCoinsEl.innerText = state.coins;
        
        const storeCoinsMagicEl = document.getElementById('ui-store-coins-magic');
        if (storeCoinsMagicEl) storeCoinsMagicEl.innerText = state.coins;
        
        const magicContainer = document.getElementById('ui-magic-shop-container');
        if (magicContainer) {
            magicContainer.innerHTML = MAGIC_SHOP_ITEMS.map(item => {
                const canAfford = state.coins >= item.cost;
                return `
                <div onclick="${canAfford ? `buyMagicItem('${item.id}')` : ''}" tabindex="${canAfford ? '0' : '-1'}" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="glass-panel p-4 rounded-2xl flex flex-col justify-between border ${item.bg} ${canAfford ? `cursor-pointer btn-press ${item.hover}` : 'opacity-50 grayscale cursor-not-allowed'} transition-all group relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-[20px] pointer-events-none"></div>
                    <div class="flex items-start justify-between mb-2">
                        <div class="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center border border-white/10 shrink-0">
                            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                        </div>
                        <span class="text-xs font-black bg-black/40 px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                            ${item.cost} <i data-lucide="coins" class="w-3 h-3 text-yellow-500"></i>
                        </span>
                    </div>
                    <h4 class="text-sm font-bold text-white mb-1">${item.title}</h4>
                    <p class="text-[10px] text-white/60 leading-tight">${item.desc}</p>
                </div>`;
            }).join('');
        }

        const container = document.getElementById('ui-rewards-container');
        if (container) {
            container.innerHTML = state.rewards.map(reward => {
                const canAfford = state.coins >= reward.cost;
                return `
                <div class="glass-panel p-4 rounded-2xl flex flex-col justify-between border-t border-white/5 relative group">
                    <button onclick="deleteReward(${reward.id}, event)" aria-label="حذف المكافأة" class="absolute top-2 left-2 p-1.5 text-white/20 hover:text-red-400 transition-colors"><i data-lucide="x" class="w-4 h-4"></i></button>
                    <h4 class="text-sm font-bold text-white mb-4 pr-6 leading-relaxed">${escapeHTML(reward.title)}</h4>
                    <button onclick="buyReward(${reward.id})" class="w-full py-2.5 rounded-xl font-bold text-xs flex justify-center items-center gap-2 btn-press transition-all ${canAfford ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-white/30 cursor-not-allowed'}">
                        <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> شراء بـ ${reward.cost} ذهب
                    </button>
                </div>`;
            }).join('');
        }
        
        const invContainer = document.getElementById('ui-inventory-container');
        if (invContainer) {
            if (state.inventory.length === 0) {
                invContainer.innerHTML = `<div class="glass-panel rounded-2xl p-6 text-center opacity-50 border-dashed border-2 border-white/10"><p class="text-sm text-white/70">المخزون فارغ حالياً.</p></div>`;
            } else {
                invContainer.innerHTML = state.inventory.map(item => `
                <div class="glass-panel p-3.5 rounded-2xl flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5 group shadow-lg">
                    <div class="flex items-center gap-3 flex-1 overflow-hidden">
                        <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                            <i data-lucide="ticket" class="w-5 h-5 text-emerald-400"></i>
                        </div>
                        <h4 class="text-sm font-bold text-white leading-tight truncate pr-1">${escapeHTML(item.title)}</h4>
                    </div>
                    <button onclick="activateInventoryItem(${item.id})" class="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl text-xs font-bold transition-all btn-press shrink-0">تفعيل</button>
                </div>`).join('');
            }
        }
        lucide.createIcons();
    }

    function renderStats() {
        const container = document.getElementById('ui-stats-bars');
        if(!container) return;
        const total = Object.values(state.stats).reduce((a, b) => a + b, 0) || 1;
        container.innerHTML = Object.entries(CATEGORIES).map(([key, data]) => {
            const val = state.stats[key] || 0; const percent = Math.round((val / total) * 100);
            return `
            <div class="mb-3">
                <div class="flex justify-between text-xs font-bold mb-1">
                    <span class="${data.textCheck}">${data.label}</span>
                    <span class="text-white/50">${val} مهمة (${percent}%)</span>
                </div>
                <div class="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/5">
                    <div class="h-full ${data.bgCheck} stat-bar-fill" style="width: ${percent}%"></div>
                </div>
            </div>`;
        }).join('');
    }

    function renderProductivityChart() {
        const container = document.getElementById('productivity-chart-wrapper');
        if(!container) return;
        const daysMap = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
        const maxVal = Math.max(...Object.values(state.productivity), 100);

        container.innerHTML = `
        <div class="flex items-end justify-between h-40 gap-2 sm:gap-3 px-2 w-full pt-4">
            ${daysMap.map(day => {
                const val = state.productivity[day] || 0;
                const heightPercent = Math.max((val / maxVal) * 100, 8); 
                return `
                <div class="flex flex-col items-center flex-1 gap-2 group h-full justify-end">
                    <div class="w-full bg-white/5 rounded-t-lg rounded-b-lg relative flex items-end justify-center h-full hover:bg-white/10 transition-colors border border-white/5">
                        <div class="w-full bg-gradient-to-t from-indigo-600 to-blue-400 rounded-t-lg rounded-b-lg transition-all duration-1000 ease-out relative group-hover:from-indigo-500 group-hover:to-blue-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]" style="height: ${heightPercent}%;">
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs font-bold text-white px-2 py-1 rounded shadow-lg pointer-events-none border border-white/10 z-10">${val}</div>
                        </div>
                    </div>
                    <span class="text-[10px] font-bold text-white/50">${day.substring(0,3)}</span>
                </div>`;
            }).join('')}
        </div>`;
    }

    function renderJourney() {
        const container = document.getElementById('ui-timeline');
        if(!container) return;

        let stageName = STAGES.find(s => state.currentWeek >= s.weeks[0] && state.currentWeek <= s.weeks[1])?.name || STAGES[0].name;

        let gridHTML = '<div class="flex flex-wrap justify-center gap-2 p-2">';
        for (let i = 1; i <= 52; i++) {
            let isCompleted = i < state.currentWeek;
            let isCurrent = i === state.currentWeek;

            let bgClass = 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10';
            
            if (isCompleted) {
                bgClass = 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]';
            } else if (isCurrent) {
                bgClass = 'bg-yellow-400/20 border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)] animate-pulse ring-2 ring-yellow-400/50';
            }

            gridHTML += `
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center text-xs sm:text-sm font-black transition-all ${bgClass} relative group cursor-default" title="الأسبوع ${i}">
                ${i}
                ${isCurrent ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div><div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>' : ''}
            </div>`;
        }
        gridHTML += '</div>';

        container.innerHTML = `
            <div class="text-center mb-6">
                <span class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-sm font-bold text-white/80 shadow-inner">
                    <i data-lucide="map" class="w-4 h-4 text-blue-400"></i> المرحلة الحالية: <span class="text-white">${stageName}</span>
                </span>
            </div>
            ${gridHTML}
        `;
        lucide.createIcons({ root: container });
    }

    let advanceWeekClickCount = 0;
    function confirmAdvanceWeek() {
        if (state.currentWeek >= 52) return showToast('لقد أنهيت السنة بنجاح أسطوري!', 'success');
        const btn = document.getElementById('btn-advance-week');
        if(!btn) return;

        if (advanceWeekClickCount === 0) {
            advanceWeekClickCount++;
            btn.dataset.originalHtml = btn.innerHTML;
            
            btn.className = "w-full py-3.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 rounded-xl font-bold text-sm btn-press transition-all flex items-center justify-center gap-2 animate-pulse";
            btn.innerHTML = `<span>هل أنت متأكد من إنهاء الأسبوع؟</span><i data-lucide="help-circle" class="w-4 h-4"></i>`;
            lucide.createIcons({ root: btn });

            setTimeout(() => {
                if (advanceWeekClickCount > 0) {
                    advanceWeekClickCount = 0;
                    btn.className = "w-full py-3.5 bg-white hover:bg-gray-200 text-black rounded-xl font-bold text-sm btn-press transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]";
                    btn.innerHTML = btn.dataset.originalHtml;
                    lucide.createIcons({ root: btn });
                }
            }, 3000);
        } else {
            advanceWeekClickCount = 0;
            btn.className = "w-full py-3.5 bg-white hover:bg-gray-200 text-black rounded-xl font-bold text-sm btn-press transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]";
            btn.innerHTML = btn.dataset.originalHtml;
            lucide.createIcons({ root: btn });
            
            advanceWeek();
        }
    }

    function advanceWeek() {
        saveSnapshot(); 
        
        const report = {
            id: Date.now(),
            week: state.currentWeek,
            date: new Date().toLocaleDateString('ar-EG'),
            stats: { ...state.weeklyStats }
        };
        
        state.weeklyReports.unshift(report);
        state.weeklyStats = { tasks: 0, xp: 0, focus: 0 };
        state.productivity = { 'السبت': 0, 'الأحد': 0, 'الإثنين': 0, 'الثلاثاء': 0, 'الأربعاء': 0, 'الخميس': 0, 'الجمعة': 0 };

        state.currentWeek += 1; 
        state.xp += 200; 
        state.coins += 200;
        
        saveState(); 
        renderJourney(); 
        renderWeeklyHistory();
        updateGlobalUI();
        
        showWeeklyReportModal(report);
    }

    let activeScheduleTab = 'lessons'; 
    let selectedScheduleDay = 'السبت';
    const DAYS = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

    function setScheduleTab(tab) {
        activeScheduleTab = tab;
        const btnLessons = document.getElementById('tab-lessons'); const btnStudy = document.getElementById('tab-study');
        if(!btnLessons || !btnStudy) return;

        if (tab === 'lessons') {
            btnLessons.className = "flex-1 py-2 text-sm font-bold rounded-lg transition-all bg-emerald-500 text-white shadow-md";
            btnStudy.className = "flex-1 py-2 text-sm font-bold rounded-lg transition-all text-white/50 hover:text-white";
            document.getElementById('schedule-header-icon').setAttribute('data-lucide', 'calendar-days');
            document.getElementById('schedule-header-title').innerText = "الدروس والمواعيد";
            document.getElementById('schedule-glow').className = "absolute left-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none";
            document.getElementById('btn-add-schedule').className = "w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center btn-press shrink-0 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]";
        } else {
            btnStudy.className = "flex-1 py-2 text-sm font-bold rounded-lg transition-all bg-indigo-500 text-white shadow-md";
            btnLessons.className = "flex-1 py-2 text-sm font-bold rounded-lg transition-all text-white/50 hover:text-white";
            document.getElementById('schedule-header-icon').setAttribute('data-lucide', 'book-open');
            document.getElementById('schedule-header-title').innerText = "خطة المذاكرة";
            document.getElementById('schedule-glow').className = "absolute left-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none";
            document.getElementById('btn-add-schedule').className = "w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center btn-press shrink-0 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]";
        }
        lucide.createIcons(); renderScheduleDays(); renderScheduleItems();
    }

    function renderScheduleDays() {
        const container = document.getElementById('ui-schedule-days');
        if(!container) return;
        container.innerHTML = DAYS.map(day => {
            const isSel = day === selectedScheduleDay;
            const activeColor = activeScheduleTab === 'lessons' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
            return `<button onclick="selectedScheduleDay = '${day}'; renderScheduleDays(); renderScheduleItems();" class="px-4 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 ${isSel ? activeColor : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}">${day}</button>`;
        }).join('');
    }

    function addScheduleItem(e) {
        e.preventDefault();
        const inputTitle = document.getElementById('new-schedule-title');
        const inputTime = document.getElementById('new-schedule-time');
        if(!inputTitle || !inputTime) return;

        const title = inputTitle.value.trim();
        const time = inputTime.value.trim();
        if(!title) return;

        const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
        list.push({ id: Date.now(), day: selectedScheduleDay, title, time, completed: false });
        inputTitle.value = ''; inputTime.value = '';
        saveState(); renderScheduleItems(); showToast('تمت الإضافة للجدول بنجاح!', 'success');
    }

    function toggleScheduleItem(id) {
        const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
        const item = list.find(i => i.id === id);
        if(!item) return;
        saveSnapshot(); item.completed = !item.completed;
        if(item.completed) { 
            state.xp += 20; state.coins += 10; 
            state.todayStats.xp += 20; state.weeklyStats.xp += 20;
            playSound('pop'); showToast('+20 XP ، استمر يا بطل!', 'success'); 
        } else { 
            state.xp = Math.max(0, state.xp - 20); state.coins = Math.max(0, state.coins - 10); 
            state.todayStats.xp = Math.max(0, state.todayStats.xp - 20); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - 20);
        }
        saveState(); renderScheduleItems();
    }

    function deleteScheduleItem(id, e) {
        e.stopPropagation(); saveSnapshot();
        if (activeScheduleTab === 'lessons') state.lessons = state.lessons.filter(i => i.id !== id);
        else state.studyPlan = state.studyPlan.filter(i => i.id !== id);
        saveState(); renderScheduleItems(); showToast('تم الحذف', 'info');
    }

    function renderScheduleItems() {
        const container = document.getElementById('ui-schedule-items');
        if(!container) return;

        const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
        const dayItems = list.filter(i => i.day === selectedScheduleDay);
        const colorClass = activeScheduleTab === 'lessons' ? 'emerald' : 'indigo';
        
        if(dayItems.length === 0) {
            container.innerHTML = `<div class="glass-panel p-6 rounded-2xl text-center opacity-60 border-dashed border-2 border-white/10 mt-2"><p class="text-xs text-white/70">لا توجد عناصر مضافة ليوم ${selectedScheduleDay}</p></div>`;
            return;
        }
        
        container.innerHTML = dayItems.map(item => `
        <div onclick="toggleScheduleItem(${item.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="glass-panel p-3.5 rounded-2xl flex items-center justify-between cursor-pointer btn-press border ${item.completed ? `border-${colorClass}-500/40 bg-${colorClass}-500/10 opacity-60` : 'border-white/5 hover:bg-white/[0.02]'}">
            <div class="flex items-center gap-3 flex-1 overflow-hidden">
                <div class="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${item.completed ? `bg-${colorClass}-500 border-${colorClass}-500 text-white` : 'border-white/20'}">
                    ${item.completed ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-sm font-bold truncate ${item.completed ? 'line-through text-white/40' : 'text-white/90'}">${escapeHTML(item.title)}</span>
                    ${item.time ? `<span class="text-[10px] text-${colorClass}-400 font-medium flex items-center gap-1 mt-0.5"><i data-lucide="clock" class="w-3 h-3"></i> ${escapeHTML(item.time)}</span>` : ''}
                </div>
            </div>
            <button onclick="deleteScheduleItem(${item.id}, event)" aria-label="حذف المادة" class="p-1.5 hover:bg-red-500/10 text-white/20 hover:text-red-400 rounded-lg transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>`).join('');
        lucide.createIcons({ root: container });
    }

    function renderSchedule() { renderScheduleDays(); renderScheduleItems(); }

    function updateGlobalUI() {
        const level = getLevel();
        
        const headerName = document.getElementById('ui-header-name');
        const headerLevel = document.getElementById('ui-header-level');
        const headerCoins = document.getElementById('ui-header-coins');
        const headerStreak = document.getElementById('ui-header-streak');
        const headerWeek = document.getElementById('ui-header-week');

        if(headerName) headerName.innerText = state.userName;
        if(headerLevel) headerLevel.innerText = `Lvl ${level}`;
        if(headerCoins) headerCoins.innerText = state.coins;
        if(headerStreak) headerStreak.innerText = state.streak;
        if(headerWeek) headerWeek.innerText = state.currentWeek;
        
        const xpTextStr = `${getXpProgress()} / 100`;
        const xpTextEl = document.getElementById('ui-xp-text');
        const xpBarEl = document.getElementById('ui-xp-bar');
        
        if(xpTextEl) xpTextEl.innerText = xpTextStr;
        if(xpBarEl) xpBarEl.style.width = `${getXpProgress()}%`;
        
        const streakIcon = document.getElementById('streak-icon');
        if(streakIcon) {
            if(state.streak > 0) streakIcon.classList.add('text-orange-400', 'fill-orange-400/50');
            else streakIcon.classList.remove('fill-orange-400/50');
        }

        const av = AVATARS_DATA.find(a => a.id === state.avatarId) || AVATARS_DATA[0];
        
        const headerAvatarContainer = document.getElementById('ui-header-avatar-container');
        if(headerAvatarContainer) {
            const headerDecs = getAvatarDecorationsHtml(level, true); // true for small size
            const headerAura = getAvatarAuraClass(level);
            headerAvatarContainer.innerHTML = `
                <div class="w-full h-full rounded-xl overflow-hidden ${headerAura} bg-white/5 flex items-center justify-center relative">
                    ${av.svg}
                </div>
                ${headerDecs}
            `;
        }
        
        const mainGoalBanner = document.getElementById('ui-main-goal-banner');
        const mainGoalText = document.getElementById('ui-main-goal-text');
        
        if (mainGoalBanner && mainGoalText) {
            if (state.mainGoal) {
                mainGoalBanner.classList.remove('hidden');
                mainGoalBanner.classList.add('flex');
                mainGoalText.innerText = state.mainGoal;
            } else {
                mainGoalBanner.classList.add('hidden');
                mainGoalBanner.classList.remove('flex');
            }
        }
        
        const headerEl = document.querySelector('header');
        if(headerEl) lucide.createIcons({ root: headerEl });
    }

    // ==================== دوال إدارة نتائج الامتحانات ====================
    function addExamSubject(e) {
        e.preventDefault();
        const inputEl = document.getElementById('new-subject-name');
        if (!inputEl) return;
        
        const subjectName = inputEl.value.trim();
        if (!subjectName) return;
        
        const newSubject = {
            id: Date.now(),
            name: subjectName,
            exams: [],
            totalGrade: 0,
            averageGrade: 0,
            highestGrade: 0,
            lowestGrade: 0
        };
        
        state.examSubjects.push(newSubject);
        inputEl.value = '';
        saveState();
        renderExams();
        showToast(`تمت إضافة مادة "${subjectName}" بنجاح! 📚`, 'success');
    }
    
    function addExamResult(subjectId, e) {
        e.preventDefault();
        const subject = state.examSubjects.find(s => s.id === subjectId);
        if (!subject) return;
        
        const form = e.target;
        const examNameInput = form.querySelector('[data-exam-name]');
        const gradeInput = form.querySelector('[data-exam-grade]');
        const totalInput = form.querySelector('[data-exam-total]');
        const dateInput = form.querySelector('[data-exam-date]');
        
        if (!examNameInput || !gradeInput || !totalInput) return;
        
        const examName = examNameInput.value.trim();
        const grade = parseFloat(gradeInput.value);
        const totalGrade = parseFloat(totalInput.value);
        const examDate = dateInput.value || new Date().toISOString().split('T')[0];
        
        if (!examName || isNaN(grade) || isNaN(totalGrade) || grade < 0 || totalGrade <= 0 || grade > totalGrade) {
            showToast('تأكد من إدخال البيانات بشكل صحيح!', 'info');
            return;
        }
        
        const percentage = (grade / totalGrade) * 100;
        const newExam = {
            id: Date.now(),
            name: examName,
            grade: grade,
            totalGrade: totalGrade,
            percentage: Math.round(percentage * 10) / 10,
            date: examDate
        };
        
        subject.exams.push(newExam);
        updateSubjectStats(subject);
        
        const xpReward = Math.floor(percentage / 10) * 50;
        const coinReward = Math.floor(percentage / 10) * 10;
        state.xp += xpReward;
        state.coins += coinReward;
        
        examNameInput.value = '';
        gradeInput.value = '';
        totalInput.value = '';
        dateInput.value = '';
        
        saveState();
        renderExams();
        showToast(`تم إضافة نتيجة "${examName}" بنجاح! +${xpReward} XP و +${coinReward} عملة 🎉`, 'success');
    }
    
    function updateSubjectStats(subject) {
        if (subject.exams.length === 0) {
            subject.totalGrade = 0;
            subject.averageGrade = 0;
            subject.highestGrade = 0;
            subject.lowestGrade = 0;
            return;
        }
        
        const percentages = subject.exams.map(e => e.percentage);
        subject.averageGrade = Math.round((percentages.reduce((a, b) => a + b, 0) / percentages.length) * 10) / 10;
        subject.highestGrade = Math.max(...percentages);
        subject.lowestGrade = Math.min(...percentages);
        subject.totalGrade = subject.exams.reduce((sum, e) => sum + e.grade, 0);
    }
    
    function deleteExamResult(subjectId, examId) {
        const subject = state.examSubjects.find(s => s.id === subjectId);
        if (!subject) return;
        
        subject.exams = subject.exams.filter(e => e.id !== examId);
        updateSubjectStats(subject);
        saveState();
        renderExams();
        showToast('تم حذف النتيجة بنجاح!', 'success');
    }
    
    function deleteExamSubject(subjectId) {
        if (!confirm('هل أنت متأكد من حذف هذه المادة وجميع نتائجها؟')) return;
        
        state.examSubjects = state.examSubjects.filter(s => s.id !== subjectId);
        saveState();
        renderExams();
        showToast('تم حذف المادة بنجاح!', 'success');
    }
    
    function getGradeColor(percentage) {
        if (percentage >= 90) return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'ممتاز' };
        if (percentage >= 80) return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: 'جيد جداً' };
        if (percentage >= 70) return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', label: 'جيد' };
        if (percentage >= 60) return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', label: 'مقبول' };
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'ضعيف' };
    }
    
    function renderExams() {
        const container = document.getElementById('ui-exams-subjects-container');
        if (!container) return;
        
        if (state.examSubjects.length === 0) {
            container.innerHTML = `
                <div class="glass-panel rounded-2xl p-8 text-center border-dashed border-2 border-white/10 shadow-lg">
                    <i data-lucide="book-marked" class="w-12 h-12 text-indigo-400/50 mx-auto mb-3"></i>
                    <p class="text-white/60 font-medium">لم تضف أي مادة حتى الآن. ابدأ بإضافة مادة لتتبع نتائجك! 📖</p>
                </div>
            `;
            lucide.createIcons({ root: container });
            return;
        }
        
        container.innerHTML = state.examSubjects.map(subject => {
            const hasExams = subject.exams.length > 0;
            const avgColor = hasExams ? getGradeColor(subject.averageGrade) : { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/50', label: 'لا توجد نتائج' };
            
            return `
                <div class="glass-panel rounded-2xl overflow-hidden shadow-lg border border-indigo-500/20 bg-indigo-500/[0.02]">
                    <div class="bg-gradient-to-r from-indigo-600/20 to-indigo-500/10 p-4 border-b border-indigo-500/20">
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center gap-3 flex-1">
                                <div class="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                    <i data-lucide="book" class="w-5 h-5 text-indigo-400"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-bold text-white">${escapeHTML(subject.name)}</h3>
                                    <p class="text-xs text-white/50 font-medium">عدد الامتحانات: ${subject.exams.length}</p>
                                </div>
                            </div>
                            <button onclick="deleteExamSubject(${subject.id})" class="p-2 text-white/40 hover:text-red-400 transition-colors btn-press" title="حذف المادة">
                                <i data-lucide="trash-2" class="w-5 h-5"></i>
                            </button>
                        </div>
                        
                        ${hasExams ? `
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <div class="bg-black/30 rounded-lg p-2 border border-white/5">
                                    <p class="text-[10px] text-white/50 font-bold mb-1">المتوسط</p>
                                    <p class="text-lg font-black ${avgColor.text}">${subject.averageGrade}%</p>
                                </div>
                                <div class="bg-black/30 rounded-lg p-2 border border-white/5">
                                    <p class="text-[10px] text-white/50 font-bold mb-1">الأعلى</p>
                                    <p class="text-lg font-black text-emerald-400">${subject.highestGrade}%</p>
                                </div>
                                <div class="bg-black/30 rounded-lg p-2 border border-white/5">
                                    <p class="text-[10px] text-white/50 font-bold mb-1">الأقل</p>
                                    <p class="text-lg font-black text-red-400">${subject.lowestGrade}%</p>
                                </div>
                                <div class="bg-black/30 rounded-lg p-2 border border-white/5">
                                    <p class="text-[10px] text-white/50 font-bold mb-1">الإجمالي</p>
                                    <p class="text-lg font-black text-yellow-400">${subject.totalGrade}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="p-4">
                        <form onsubmit="addExamResult(${subject.id}, event)" class="mb-4 bg-black/40 p-3 rounded-xl border border-white/5">
                            <div class="flex items-center gap-2 mb-3">
                                <i data-lucide="plus" class="w-4 h-4 text-indigo-400"></i>
                                <span class="text-xs font-bold text-white/70">إضافة نتيجة امتحان</span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                                <input type="text" data-exam-name placeholder="اسم الامتحان" required class="bg-black/60 rounded-lg border border-white/10 text-white px-3 py-2 text-sm focus:outline-none placeholder-white/30 font-medium">
                                <input type="number" data-exam-grade placeholder="درجتك" step="0.1" required class="bg-black/60 rounded-lg border border-white/10 text-white px-3 py-2 text-sm focus:outline-none placeholder-white/30 font-medium">
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                <input type="number" data-exam-total placeholder="الدرجة الكلية" step="0.1" required class="bg-black/60 rounded-lg border border-white/10 text-white px-3 py-2 text-sm focus:outline-none placeholder-white/30 font-medium">
                                <input type="date" data-exam-date class="bg-black/60 rounded-lg border border-white/10 text-white px-3 py-2 text-sm focus:outline-none placeholder-white/30 font-medium">
                            </div>
                            <button type="submit" class="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm btn-press transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                                <i data-lucide="plus" class="w-3.5 h-3.5 inline mr-1"></i> أضف النتيجة
                            </button>
                        </form>
                        
                        <div class="space-y-2">
                            ${subject.exams.length === 0 ? `
                                <div class="text-center py-4 text-white/40 text-sm">
                                    لا توجد نتائج امتحانات حتى الآن
                                </div>
                            ` : subject.exams.map(exam => {
                                const examColor = getGradeColor(exam.percentage);
                                return `
                                    <div class="${examColor.bg} border ${examColor.border} rounded-xl p-3 flex items-center justify-between group hover:shadow-lg transition-all">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <h4 class="font-bold text-white text-sm">${escapeHTML(exam.name)}</h4>
                                                <span class="text-[10px] font-bold ${examColor.text} bg-black/40 px-2 py-0.5 rounded">${examColor.label}</span>
                                            </div>
                                            <div class="flex items-center gap-3 text-xs text-white/70">
                                                <span><strong class="text-white">${exam.grade}/${exam.totalGrade}</strong></span>
                                                <span class="${examColor.text} font-bold">${exam.percentage}%</span>
                                                <span class="text-white/50">${new Date(exam.date).toLocaleDateString('ar-EG')}</span>
                                            </div>
                                        </div>
                                        <button onclick="deleteExamResult(${subject.id}, ${exam.id})" class="p-1.5 text-white/30 hover:text-red-400 transition-colors btn-press opacity-0 group-hover:opacity-100" title="حذف النتيجة">
                                            <i data-lucide="x" class="w-4 h-4"></i>
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        lucide.createIcons({ root: container });
    }

    let currentWeaknessPriority = 'medium';
    function setWeaknessPriority(prio) {
        currentWeaknessPriority = prio;
        document.querySelectorAll('.prio-btn').forEach(btn => {
            btn.className = 'prio-btn flex-1 py-2 rounded-lg border border-white/5 bg-white/5 text-[10px] font-bold text-white/40 transition-all';
        });
        const activeBtn = document.getElementById(`prio-${prio}`);
        if (prio === 'low') activeBtn.className = 'prio-btn flex-1 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-400 transition-all';
        if (prio === 'medium') activeBtn.className = 'prio-btn flex-1 py-2 rounded-lg border border-rose-500/30 bg-rose-500/10 text-[10px] font-bold text-rose-400 transition-all';
        if (prio === 'high') activeBtn.className = 'prio-btn flex-1 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-[10px] font-bold text-red-400 transition-all animate-pulse';
    }

    function addWeakness(e) {
        e.preventDefault();
        const subjectInput = document.getElementById('new-weakness-subject');
        const descInput = document.getElementById('new-weakness-desc');
        
        if (!subjectInput.value.trim() || !descInput.value.trim()) return;
        
        state.weaknesses.unshift({
            id: Date.now(),
            subject: subjectInput.value.trim(),
            desc: descInput.value.trim(),
            priority: currentWeaknessPriority,
            solved: false,
            date: new Date().toLocaleDateString('ar-EG')
        });
        
        subjectInput.value = '';
        descInput.value = '';
        setWeaknessPriority('medium');
        saveState();
        renderWeaknesses();
        showToast('تم رصد الثغرة بنجاح. المواجهة هي أول خطوة للنصر!', 'success');
    }

    function toggleWeakness(id) {
        const w = state.weaknesses.find(item => item.id === id);
        if (!w) return;
        
        saveSnapshot();
        w.solved = !w.solved;
        
        if (w.solved) {
            state.xp += 100; state.coins += 100;
            state.todayStats.xp += 100; state.weeklyStats.xp += 100;
            playSound('reward');
            showToast('رائع! حولت نقطة ضعف إلى قوة. +100 XP وذهب', 'success');
        } else {
            state.xp = Math.max(0, state.xp - 100);
            state.coins = Math.max(0, state.coins - 100);
            showToast('تم التراجع عن حل الثغرة', 'info');
        }
        
        saveState();
        renderWeaknesses();
    }

    function deleteWeakness(id, e) {
        e.stopPropagation();
        saveSnapshot();
        state.weaknesses = state.weaknesses.filter(w => w.id !== id);
        saveState();
        renderWeaknesses();
        showToast('تم حذف السجل', 'info');
    }

    function renderWeaknesses() {
        const container = document.getElementById('ui-weaknesses-container');
        if (!container) return;
        
        if (state.weaknesses.length === 0) {
            container.innerHTML = `<div class="glass-panel rounded-3xl p-12 text-center opacity-70 border-dashed border-2 border-white/10"><i data-lucide="shield-off" class="w-12 h-12 text-white/20 mx-auto mb-4"></i><p class="text-sm text-white/50">لا توجد ثغرات مسجلة. أنت إما مثالي أو لا تعترف بنقاط ضعفك!</p></div>`;
            lucide.createIcons({ root: container });
            return;
        }
        
        container.innerHTML = state.weaknesses.map(w => {
            const prioLabel = w.priority === 'high' ? 'حرجة' : w.priority === 'medium' ? 'متوسطة' : 'بسيطة';
            const prioColor = w.priority === 'high' ? 'text-red-400 bg-red-500/10 border-red-500/20' : w.priority === 'medium' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            
            return `
            <div onclick="toggleWeakness(${w.id})" class="glass-panel rounded-2xl p-4 border transition-all cursor-pointer btn-press ${w.solved ? 'border-emerald-500/40 bg-emerald-500/5 opacity-60' : 'border-white/10 hover:bg-white/[0.02]'}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full ${w.solved ? 'bg-emerald-500' : w.priority === 'high' ? 'bg-red-500 animate-pulse' : w.priority === 'medium' ? 'bg-rose-500' : 'bg-emerald-500'}"></div>
                        <h4 class="text-sm font-black text-white ${w.solved ? 'line-through opacity-50' : ''}">${escapeHTML(w.subject)}</h4>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] font-bold px-2 py-0.5 rounded-full border ${prioColor}">${prioLabel}</span>
                        <button onclick="deleteWeakness(${w.id}, event)" class="p-1.5 hover:bg-red-500/10 text-white/10 hover:text-red-400 rounded-lg transition-colors">
                            <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                    </div>
                </div>
                <p class="text-xs text-white/60 mb-3 leading-relaxed ${w.solved ? 'line-through opacity-40' : ''}">${escapeHTML(w.desc)}</p>
                <div class="flex justify-between items-center">
                    <span class="text-[9px] text-white/30 font-bold">${w.date}</span>
                    <div class="flex items-center gap-1">
                        ${w.solved ? 
                            '<span class="text-[10px] font-black text-emerald-400 flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3"></i> تم التغلب عليها</span>' : 
                            '<span class="text-[10px] font-black text-rose-400/70">اضغط عند الحل لربح +100 XP</span>'
                        }
                    </div>
                </div>
            </div>`;
        }).join('');
        lucide.createIcons({ root: container });
    }
    
    window.onload = () => {
        let popupDelay = 0;
        const splashScreen = document.getElementById('splash-screen');
        
        if (splashScreen) {
            const headerSpans = document.querySelectorAll('header span');
            headerSpans.forEach(span => {
                if (span.textContent.trim().toLowerCase() === 'rodo') {
                    span.innerHTML = '<img src="assets/images/logo.webp" alt="Rodo" class="h-7 sm:h-8 w-auto inline-block object-contain">';
                    span.classList.remove('bg-clip-text', 'text-transparent', 'bg-gradient-to-r', 'from-blue-400', 'to-indigo-500', 'tracking-tighter', 'font-black', 'text-2xl', 'text-lg');
                    span.classList.add('flex', 'items-center');
                }
            });

            if (!sessionStorage.getItem('rodo_splash_played')) {
                sessionStorage.setItem('rodo_splash_played', 'true');
                popupDelay = 4600;
                
                const header = document.querySelector('header');
                const main = document.querySelector('main');
                const nav = document.querySelector('nav');
                
                if (header) { header.style.opacity = '0'; header.style.transform = 'translateY(-20px)'; }
                if (main) { main.style.opacity = '0'; main.style.transform = 'translateY(20px)'; }
                if (nav) { nav.style.opacity = '0'; nav.style.transform = 'translateY(20px)'; }

                setTimeout(() => {
                    const splashLogo = splashScreen.querySelector('img');
                    const splashTagline = splashScreen.querySelector('p');
                    const splashGlow = splashScreen.querySelector('.absolute');

                    if (!splashLogo) {
                        splashScreen.remove();
                        return;
                    }

                    const splashRect = splashLogo.getBoundingClientRect();
                    
                    splashScreen.style.animation = 'none';
                    splashLogo.style.animation = 'none';
                    if (splashTagline) splashTagline.style.animation = 'none';
                    if (splashGlow) splashGlow.style.animation = 'none';

                    splashLogo.style.transform = 'none';
                    const baseSplashRect = splashLogo.getBoundingClientRect();

                    const visibleSpans = Array.from(document.querySelectorAll('header span')).filter(s => s.querySelector('img') && s.getBoundingClientRect().width > 0);
                    const targetLogo = visibleSpans.length > 0 ? visibleSpans[0].querySelector('img') : null;

                    if (targetLogo) {
                        const targetRect = targetLogo.getBoundingClientRect();

                        const initialScaleX = splashRect.width / baseSplashRect.width;
                        const initialScaleY = splashRect.height / baseSplashRect.height;
                        const initialTx = splashRect.left - baseSplashRect.left + (splashRect.width - baseSplashRect.width) / 2;
                        const initialTy = splashRect.top - baseSplashRect.top + (splashRect.height - baseSplashRect.height) / 2;

                        const finalScaleX = targetRect.width / baseSplashRect.width;
                        const finalScaleY = targetRect.height / baseSplashRect.height;
                        const finalTx = targetRect.left - baseSplashRect.left + (targetRect.width - baseSplashRect.width) / 2;
                        const finalTy = targetRect.top - baseSplashRect.top + (targetRect.height - baseSplashRect.height) / 2;

                        splashLogo.style.transform = `translate(${initialTx}px, ${initialTy}px) scale(${initialScaleX}, ${initialScaleY})`;

                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                splashScreen.style.transition = 'background-color 0.8s ease';
                                splashScreen.style.backgroundColor = 'transparent';
                                
                                if (splashTagline) {
                                    splashTagline.style.transition = 'opacity 0.4s ease';
                                    splashTagline.style.opacity = '0';
                                }
                                if (splashGlow) {
                                    splashGlow.style.transition = 'opacity 0.4s ease';
                                    splashGlow.style.opacity = '0';
                                }

                                splashLogo.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease';
                                splashLogo.style.transform = `translate(${finalTx}px, ${finalTy}px) scale(${finalScaleX}, ${finalScaleY})`;

                                const revealTransition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                                if (header) {
                                    header.style.transition = revealTransition;
                                    header.style.opacity = '1';
                                    header.style.transform = 'translateY(0)';
                                }
                                setTimeout(() => {
                                    if (main) {
                                        main.style.transition = revealTransition;
                                        main.style.opacity = '1';
                                        main.style.transform = 'translateY(0)';
                                    }
                                }, 100);
                                setTimeout(() => {
                                    if (nav) {
                                        nav.style.transition = revealTransition;
                                        nav.style.opacity = '1';
                                        nav.style.transform = 'translateY(0)';
                                    }
                                }, 200);

                                setTimeout(() => {
                                    splashScreen.remove();
                                    if (header) { header.style.transition = ''; header.style.opacity = ''; header.style.transform = ''; }
                                    if (main) { main.style.transition = ''; main.style.opacity = ''; main.style.transform = ''; }
                                    if (nav) { nav.style.transition = ''; nav.style.opacity = ''; nav.style.transform = ''; }
                                }, 800);
                            });
                        });
                    } else {
                        splashScreen.style.transition = 'opacity 0.5s ease';
                        splashScreen.style.opacity = '0';
                        setTimeout(() => splashScreen.remove(), 500);
                    }
                }, 3800);
            } else {
                popupDelay = 0;
                splashScreen.style.animation = 'none';
                splashScreen.style.transition = 'opacity 0.3s ease';
                splashScreen.style.opacity = '0';
                setTimeout(() => splashScreen.remove(), 300);
            }
        }

        lucide.createIcons();
        updateGlobalUI(); 
        updateQuote();
        
        if (Object.values(state.productivity).reduce((a, b) => a + b, 0) === 0) {
            const today = new Date().getDay();
            const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
            for(let i=0; i<=today; i++) { if (Math.random() > 0.3) state.productivity[days[i]] = Math.floor(Math.random() * 100) + 20; }
            saveState();
        }

        switchTab('dashboard');
        selectedScheduleDay = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][new Date().getDay()];

        setTimeout(() => {
            const isPenaltyApplied = checkStreakAndPenaltyOnLoad();

            if (!isPenaltyApplied) {
                const hasRecap = checkDailyReset();
                pendingRandomEvent = checkRandomEvents();
                
                if (hasRecap) {
                    setTimeout(() => showDailyRecap(), 500);
                } else {
                    if (pendingRandomEvent) {
                        setTimeout(() => showRandomEventModal(pendingRandomEvent), 1000);
                    } else {
                        setTimeout(() => { showToast(`أهلاً بعودتك يا ${state.userName}! اليوم فرصة جديدة للمجد. 🚀`, 'info'); }, 1000);
                    }
                }
            }
        }, popupDelay);

        if (state.activeSession && state.activeSession.isRunning) {
            stopwatchInterval = setInterval(() => updateStopwatchUI(false), 1000);
            updateStopwatchUI(true);
        } else {
            updateStopwatchUI(true);
        }
        
        renderHeatmap();
        renderStudyTimeTable();
        renderSmartInsights();
        renderRecentSessions();
    };
