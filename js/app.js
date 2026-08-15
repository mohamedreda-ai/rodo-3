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

function getLocalDateStr(dateObj = new Date()) {
    const offset = dateObj.getTimezoneOffset() * 60000;
    return new Date(dateObj.getTime() - offset).toISOString().split('T')[0];
}

function getNextPaymentDate(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return '';
    
    let year = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let day = parseInt(parts[2], 10);
    
    month += 1;
    if (month > 12) {
        month = 1;
        year += 1;
    }
    
    const maxDaysInNewMonth = new Date(year, month, 0).getDate();
    const safeDay = Math.min(day, maxDaysInNewMonth);
    
    return `${year}-${String(month).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`;
}

const STORE_CATALOG = [
    // Boosts
    { id: 'boost_xp_1', title: 'مضاعف الخبرة (ساعة)', desc: 'يضاعف نقاط الخبرة المكتسبة 1.5x لمدة ساعة.', cost: 150, category: 'boosts', icon: 'zap', rarity: 'rare', type: 'boost', boostType: 'xp', multiplier: 1.5, duration: 60 * 60 * 1000 },
    { id: 'boost_coin_1', title: 'مضاعف الذهب (ساعة)', desc: 'يضاعف العملات المكتسبة 1.5x لمدة ساعة.', cost: 150, category: 'boosts', icon: 'coins', rarity: 'rare', type: 'boost', boostType: 'coin', multiplier: 1.5, duration: 60 * 60 * 1000 },
    { id: 'boost_xp_2', title: 'إكسير الخبرة الأسطوري', desc: 'يضاعف نقاط الخبرة 2x لمدة 3 ساعات.', cost: 400, category: 'boosts', icon: 'flask-conical', rarity: 'epic', type: 'boost', boostType: 'xp', multiplier: 2, duration: 3 * 60 * 60 * 1000 },
    
    // Themes
    { id: 'theme_crimson', title: 'طاقة القرمزي', desc: 'مظهر أحمر ناري يعكس الحماس والطاقة.', cost: 500, category: 'themes', icon: 'palette', rarity: 'epic', type: 'theme' },
    { id: 'theme_emerald', title: 'هالة الزمرد', desc: 'مظهر أخضر هادئ يساعد على التركيز.', cost: 500, category: 'themes', icon: 'palette', rarity: 'epic', type: 'theme' },
    { id: 'theme_cyber', title: 'سايبر نيون', desc: 'مظهر مستقبلي عالي التباين.', cost: 800, category: 'themes', icon: 'palette', rarity: 'legendary', type: 'theme' },
    { id: 'theme_gold', title: 'بريق الذهب', desc: 'مظهر ذهبي ملكي للأساطير فقط.', cost: 1000, category: 'themes', icon: 'palette', rarity: 'legendary', type: 'theme' },

    // Effects
    { id: 'effect_task_1', title: 'نبضة الإنجاز', desc: 'تأثير بصري عند إكمال المهام.', cost: 300, category: 'effects', icon: 'sparkles', rarity: 'rare', type: 'effect', effectEvent: 'task-complete' },
    { id: 'effect_focus_1', title: 'توهج التركيز', desc: 'توهج ذهبي عند إنهاء جلسة تركيز.', cost: 500, category: 'effects', icon: 'flame', rarity: 'epic', type: 'effect', effectEvent: 'focus-complete' },
    { id: 'effect_achieve_1', title: 'احتفال الأساطير', desc: 'تأثير خاص عند فتح إنجاز جديد.', cost: 600, category: 'effects', icon: 'party-popper', rarity: 'legendary', type: 'effect', effectEvent: 'achievement-unlock' },
    { id: 'effect_streak_1', title: 'شعلة الاستمرارية', desc: 'تأثير ناري عند زيادة أيام الاستمرارية.', cost: 400, category: 'effects', icon: 'flame', rarity: 'epic', type: 'effect', effectEvent: 'streak' },

    // Titles
    { id: 'title_1', title: 'لقب: المثابر', desc: 'لقب يظهر بجانب اسمك.', cost: 300, category: 'titles', icon: 'award', rarity: 'rare', type: 'title', label: 'المثابر' },
    { id: 'title_2', title: 'لقب: سيد التركيز', desc: 'لقب يظهر بجانب اسمك.', cost: 600, category: 'titles', icon: 'award', rarity: 'epic', type: 'title', label: 'سيد التركيز' },
    { id: 'title_3', title: 'لقب: الأسطورة', desc: 'اللقب الأعظم على الإطلاق.', cost: 1500, category: 'titles', icon: 'crown', rarity: 'legendary', type: 'title', label: 'الأسطورة' },

    // Avatars
    { id: 'avatar_premium_1', title: 'أفاتار: فارس الظلام', desc: 'شخصية حصرية لا تفتح إلا بالذهب.', cost: 1200, category: 'avatars', icon: 'user-circle', rarity: 'legendary', type: 'avatar', avatarId: 9 },

    // Mystery
    { id: 'mystery_small', title: 'صندوق الغموض الصغير', desc: 'قد يحتوي على ذهب، خبرة، أو معززات.', cost: 200, category: 'mystery', icon: 'box', rarity: 'rare', type: 'mystery', pool: 'small' },
    { id: 'mystery_epic', title: 'صندوق الأساطير', desc: 'مكافآت ضخمة وفرصة لربح ألقاب حصرية.', cost: 800, category: 'mystery', icon: 'gift', rarity: 'legendary', type: 'mystery', pool: 'epic' },

    // Power-ups (Instant Consumables)
    { id: 'power_xp_1', title: 'جرعة الحكمة', desc: 'تمنحك 200 XP فوراً.', cost: 250, category: 'powerups', icon: 'flask-round', rarity: 'common', type: 'instant', grantXp: 200 },
    { id: 'power_focus_1', title: 'لفيفة الزمن', desc: 'تضيف 60 دقيقة لسجل تركيزك.', cost: 400, category: 'powerups', icon: 'scroll', rarity: 'rare', type: 'instant', grantFocus: 60 },
    { id: 'power_streak_1', title: 'درع الاستمرارية', desc: 'يحميك من فقدان السلسلة (يضيف 3 أيام).', cost: 600, category: 'powerups', icon: 'shield', rarity: 'epic', type: 'instant', grantStreak: 3 }
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
    { id: 8, reqLvl: 10, type: 'legendary', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#064e3b"/><circle cx="50" cy="65" r="26" fill="#ecfdf5"/><path d="M20 90 C15 30 85 30 80 90 Z" fill="#10b981"/><path d="M30 40 L40 25 L50 35 L60 25 L70 40 Z" fill="#fbbf24"/><circle cx="36" cy="58" r="14" fill="#000"/><circle cx="64" cy="58" r="14" fill="#000"/><path d="M36 58 L36 58 M64 58 L64 58" stroke="#34d399" stroke-width="8" stroke-linecap="round"/><path d="M48 58 L52 58" stroke="#000" stroke-width="3"/></svg>` },
    { id: 9, reqLvl: 999, reqItem: 'avatar_premium_1', type: 'legendary', svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="#1e1b4b"/><circle cx="50" cy="65" r="28" fill="#c4b5fd"/><path d="M20 90 C20 40 80 40 80 90 Z" fill="#0f172a"/><path d="M35 30 L50 10 L65 30 Z" fill="#8b5cf6"/><circle cx="35" cy="55" r="8" fill="#fde047"/><circle cx="65" cy="55" r="8" fill="#fde047"/></svg>` }
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
    bestStreak: 0,
    totalFocusMinutes: 0,
    rewards: [],
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
    weaknesses: [], // Preserved for backward compatibility
    errorBank: {
        errors: [],
        lastSmartReviewDate: null
    },
    studySubjects: [],
    activeSession: { isRunning: false, startTime: null, elapsedMs: 0 },
    heatmapData: {},
    store: {
        ownedItems: [],
        consumables: [],
        activeBoosts: [],
        activeTheme: null,
        activeTitle: null,
        activeEffects: []
    }
};

let state = JSON.parse(JSON.stringify(INITIAL_STATE));
let stateSnapshot = null;
let pendingRandomEvent = null;
let stopwatchInterval = null;
let currentStoreCategory = 'all';
let storeBoostInterval = null;

// Error Bank V2 Variables
let currentErrorFilterSubject = 'all';
let currentErrorFilterStatus = 'all';
let currentErrorSearch = '';
let errorRenderLimit = 20;
let currentActiveErrorId = null;

try {
    const savedState = localStorage.getItem('hsQuestPremium_v4');
    if (savedState) {
        const parsed = JSON.parse(savedState);
        if (typeof parsed === 'object' && parsed !== null) {
            state = { ...state, ...parsed };
        }
        
        const arrayKeys = ['tasks', 'inventory', 'goals', 'lessons', 'studyPlan', 'unlockedAchievements', 'habits', 'weeklyReports', 'examSubjects', 'weaknesses', 'studySubjects', 'rewards'];
        arrayKeys.forEach(key => {
            if (!Array.isArray(state[key])) state[key] = JSON.parse(JSON.stringify(INITIAL_STATE[key]));
        });

        const objectKeys = ['stats', 'productivity', 'todayStats', 'weeklyStats', 'activeSession', 'heatmapData'];
        objectKeys.forEach(key => {
            if (typeof state[key] !== 'object' || state[key] === null) {
                state[key] = JSON.parse(JSON.stringify(INITIAL_STATE[key]));
            } else {
                state[key] = { ...INITIAL_STATE[key], ...state[key] };
            }
        });

        if (!state.store) {
            state.store = {
                ownedItems: [],
                consumables: [],
                activeBoosts: [],
                activeTheme: null,
                activeTitle: null,
                activeEffects: []
            };
        } else {
            if (!Array.isArray(state.store.ownedItems)) state.store.ownedItems = [];
            if (!Array.isArray(state.store.consumables)) state.store.consumables = [];
            if (!Array.isArray(state.store.activeBoosts)) state.store.activeBoosts = [];
            if (!Array.isArray(state.store.activeEffects)) state.store.activeEffects = [];
        }

        if (!state.errorBank || !Array.isArray(state.errorBank.errors)) {
            state.errorBank = { errors: [], lastSmartReviewDate: null };
        }

        // Idempotent Legacy Migration: Weaknesses -> Error Bank V2
        if (state.weaknesses && state.weaknesses.length > 0) {
            state.weaknesses.forEach(w => {
                const exists = state.errorBank.errors.find(e => e.id === w.id);
                if (!exists) {
                    state.errorBank.errors.push({
                        id: w.id,
                        subjectName: w.subject || 'غير محدد',
                        text: w.desc || '',
                        lessonLearned: '',
                        type: 'other',
                        severity: w.priority || 'medium',
                        status: w.solved === true ? 'reviewed' : 'new',
                        repetitionCount: 0,
                        reviewCount: 0,
                        dateAdded: w.date || new Date().toLocaleDateString('ar-EG'),
                        lastReviewedAt: null,
                        lastRepeatedAt: null,
                        masteredAt: null
                    });
                }
            });
        }

        if (typeof state.xp !== 'number' || !isFinite(state.xp) || state.xp < 0) state.xp = 0;
        if (typeof state.coins !== 'number' || !isFinite(state.coins) || state.coins < 0) state.coins = 0;
        if (typeof state.streak !== 'number' || !isFinite(state.streak) || state.streak < 0) state.streak = 0;
        if (typeof state.bestStreak !== 'number' || !isFinite(state.bestStreak) || state.bestStreak < 0) state.bestStreak = state.streak || 0;
        if (typeof state.currentWeek !== 'number' || !isFinite(state.currentWeek) || state.currentWeek < 1) state.currentWeek = 1;
        if (typeof state.totalFocusMinutes !== 'number' || !isFinite(state.totalFocusMinutes) || state.totalFocusMinutes < 0) state.totalFocusMinutes = 0;
        
        if (state.habits.length === 0) state.habits = [...DEFAULT_HABITS];
        if (!state.userName || typeof state.userName !== 'string') state.userName = 'اسمك هنا';
        if (!state.avatarId || typeof state.avatarId !== 'number') state.avatarId = 1;
        
        state.studySubjects.forEach(s => {
            if(!Array.isArray(s.history)) s.history = [];
            if(typeof s.weeklyGoal !== 'number' || !isFinite(s.weeklyGoal)) s.weeklyGoal = 0;
        });
    }
} catch(e) {
    console.error("State parsing failed, falling back to initial state to prevent crash.", e);
    state = JSON.parse(JSON.stringify(INITIAL_STATE));
}

let isStorageWarningActive = false;

function saveState() {
    checkAchievements();
    try { 
        localStorage.setItem('hsQuestPremium_v4', JSON.stringify(state)); 
        isStorageWarningActive = false;
    } catch (e) {
        console.warn("فشل في حفظ البيانات. تأكد من أن مساحة التخزين غير ممتلئة أو أنك لا تستخدم التصفح الخفي.");
        if (!isStorageWarningActive) {
            isStorageWarningActive = true;
            showStorageError();
        }
    }
    updateGlobalUI();
}

function showStorageError() {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = `flex flex-col gap-3 p-4 rounded-2xl glass-panel shadow-2xl border border-red-500/50 bg-red-500/10 toast-enter pointer-events-auto max-w-[92vw]`;
    toast.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="shrink-0 bg-black/40 p-2 rounded-full"><i data-lucide="alert-triangle" class="w-5 h-5 text-red-400"></i></div>
            <div class="flex-1">
                <h4 class="text-sm font-bold text-white mb-1">مساحة التخزين ممتلئة</h4>
                <p class="text-xs text-white/80 leading-snug">بياناتك الحالية ما زالت موجودة داخل التطبيق، لكن قد لا يتم حفظ التغييرات الجديدة. يرجى تصدير بياناتك الآن.</p>
            </div>
        </div>
        <div class="flex gap-2 mt-1">
            <button onclick="exportData()" class="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-2 min-h-[44px] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <i data-lucide="download" class="w-4 h-4"></i> تصدير البيانات
            </button>
            <button onclick="this.parentElement.parentElement.remove(); isStorageWarningActive = false;" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 min-h-[44px] rounded-lg text-xs font-bold transition-colors">
                إغلاق
            </button>
        </div>
    `;
    container.appendChild(toast);
    lucide.createIcons({ root: toast });
}

function exportData() {
    try {
        const dataStr = JSON.stringify(state);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().split('T')[0];
        a.download = `rodo-backup-${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('تم تصدير البيانات بنجاح.', 'success');
    } catch (e) {
        console.error("Export failed", e);
        showToast('حدث خطأ أثناء تصدير البيانات.', 'info');
    }
}

function saveSnapshot() { 
    stateSnapshot = JSON.parse(JSON.stringify(state)); 
    return JSON.stringify(state); 
}

function restoreSnapshot() {
    if (!stateSnapshot) return;
    state = JSON.parse(JSON.stringify(stateSnapshot));
    stateSnapshot = null;
    saveState();
    renderTasks(); renderGoals(); renderStore();
    renderStats(); renderJourney(); renderProfile(); renderSchedule(); renderHabits();
    renderWeeklyHistory();
    renderHeatmap();
    renderErrorBank();
    if (isAudioInitialized && synth) synth.triggerAttackRelease("C3", "16n");
}

function getBoostMultiplier(boostType) {
    if (!state.store || !state.store.activeBoosts) return 1;
    
    const now = Date.now();
    let multiplier = 1;
    
    state.store.activeBoosts = state.store.activeBoosts.filter(b => b.expiresAt > now);
    
    state.store.activeBoosts.forEach(b => {
        const item = STORE_CATALOG.find(i => i.id === b.itemId);
        if (item && item.boostType === boostType) {
            multiplier = Math.max(multiplier, item.multiplier);
        }
    });
    
    return multiplier;
}

function initStoreBoostInterval() {
    if (storeBoostInterval) return;
    storeBoostInterval = setInterval(() => {
        if (!state.store || !state.store.activeBoosts || state.store.activeBoosts.length === 0) return;
        
        const now = Date.now();
        let changed = false;
        
        state.store.activeBoosts = state.store.activeBoosts.filter(b => {
            if (b.expiresAt <= now) {
                changed = true;
                const item = STORE_CATALOG.find(i => i.id === b.itemId);
                if (item) showToast(`انتهى تأثير ${item.title}`, 'info');
                return false;
            }
            return true;
        });
        
        if (changed) {
            saveState();
            const storeView = document.getElementById('view-store');
            if (storeView && storeView.classList.contains('active')) {
                renderStore();
            }
        }
    }, 10000);
}

function applyTheme() {
    if (state.store && state.store.activeTheme) {
        document.documentElement.setAttribute('data-theme', state.store.activeTheme);
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

function triggerStoreEffect(eventName, payload = null) {
    if (!state.store || !state.store.activeEffects || state.store.activeEffects.length === 0) return;
    
    const activeEffectItems = state.store.activeEffects.map(id => STORE_CATALOG.find(i => i.id === id)).filter(Boolean);
    const triggeredEffects = activeEffectItems.filter(item => item.effectEvent === eventName);
    
    triggeredEffects.forEach(effect => {
        if (eventName === 'task-complete') {
            const burst = document.createElement('div');
            burst.className = 'effect-glow-burst fixed inset-0 pointer-events-none z-[9999]';
            burst.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)';
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        } else if (eventName === 'focus-complete') {
            const burst = document.createElement('div');
            burst.className = 'effect-glow-burst fixed inset-0 pointer-events-none z-[9999]';
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        } else if (eventName === 'achievement-unlock') {
            const floatTxt = document.createElement('div');
            floatTxt.className = 'effect-float-text text-yellow-400 text-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]';
            floatTxt.innerText = `🏆 إنجاز جديد!`;
            document.body.appendChild(floatTxt);
            setTimeout(() => floatTxt.remove(), 1200);
        } else if (eventName === 'streak') {
            const floatTxt = document.createElement('div');
            floatTxt.className = 'effect-float-text text-orange-400 text-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]';
            floatTxt.innerText = `🔥 استمرارية!`;
            document.body.appendChild(floatTxt);
            setTimeout(() => floatTxt.remove(), 1200);
        }
    });
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
    if(btn) btn.className = `w-full py-4 min-h-[44px] rounded-xl font-black text-sm btn-press transition-all shadow-lg flex items-center justify-center gap-2 ${theme.btn}`;

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
    if (checkStreakAndPenaltyOnLoad()) return; 

    const todayStr = new Date().toDateString();
    if (state.lastActionDate === todayStr) return;
    if (state.streak === 0) state.streak = 1;
    else {
        state.streak += 1; playSound('success');
        setTimeout(() => { 
            showToast(`يوم جديد في سلسلة الاستمرارية 🔥 (${state.streak} أيام متواصلة!)`, 'success'); 
            triggerStoreEffect('streak');
        }, 1000);
    }
    state.bestStreak = Math.max(state.bestStreak || 0, state.streak);
    state.lastActionDate = todayStr; saveState();
}

function trackProductivity(value) {
    const daysMap = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const currentDayArabic = daysMap[new Date().getDay()];
    state.productivity[currentDayArabic] = (state.productivity[currentDayArabic] || 0) + value;
    saveState();
}

function updateHeatmap(points) {
    const todayStr = getLocalDateStr();
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
            const dateStr = getLocalDateStr(date);
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
    
    setTimeout(() => {
        const scrollContainer = container.parentElement;
        if (scrollContainer) {
            scrollContainer.scrollTo({
                left: scrollContainer.scrollWidth,
                behavior: 'smooth'
            });
        }
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
        if (Tone.context && Tone.context.state !== 'running' && !isAudioInitialized) {
            return; 
        }
        
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
                btn.innerHTML = `<i data-lucide="wind" class="w-5 h-5"></i><span class="text-sm font-medium">صوت هواء هادئ</span>`;
            }
        } else {
            ambientNoise.start();
            if(btn) {
                btn.classList.replace('text-white/50', 'text-blue-400');
                btn.classList.replace('bg-transparent', 'bg-blue-500/10');
                btn.classList.replace('border-white/10', 'border-blue-500/30');
                btn.innerHTML = `<i data-lucide="wind" class="w-5 h-5"></i><span class="text-sm font-medium">إيقاف الصوت الهادئ</span>`;
            }
        }
        isAmbientPlaying = !isAmbientPlaying;
        lucide.createIcons({ root: btn });
    }).catch(e => console.warn(e));
}

function showToast(message, type = 'info', allowUndo = false, localSnapshot = null) {
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

    toast.className = `flex items-center gap-3 p-3.5 rounded-2xl glass-panel shadow-2xl border ${bgClass} toast-enter pointer-events-auto max-w-[92vw] min-h-[44px]`;
    toast.innerHTML = `<div class="shrink-0 bg-black/40 p-2 rounded-full">${iconHtml}</div><p class="text-sm font-medium text-white flex-1 leading-snug">${escapeHTML(message)}</p>`;

    if (allowUndo) {
        const undoBtn = document.createElement('button');
        undoBtn.className = 'ml-2 shrink-0 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-4 py-2 min-h-[44px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors';
        undoBtn.innerHTML = `<i data-lucide="undo-2" class="w-4 h-4"></i> تراجع`;
        undoBtn.onclick = () => {
            if (localSnapshot) {
                state = JSON.parse(localSnapshot);
                saveState();
                renderTasks(); renderGoals(); renderStore();
                renderStats(); renderJourney(); renderProfile(); renderSchedule(); renderHabits();
                renderWeeklyHistory(); renderHeatmap(); renderErrorBank();
                if (isAudioInitialized && synth) synth.triggerAttackRelease("C3", "16n");
            }
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
            
            if (btn) btn.className = `flex-1 min-w-[50px] min-h-[44px] py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all shadow-inner ${activeColor}`;
            if (section) section.classList.add('active');
        } else {
            if (btn) btn.className = "flex-1 min-w-[50px] min-h-[44px] py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all text-white/50 hover:text-white";
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
    if (tabId === 'weaknesses') renderErrorBank();
    if (tabId === 'focus') { updateStopwatchUI(true); renderHeatmap(); renderStudyTimeTable(); renderRecentSessions(); }
    
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
            setTimeout(() => { 
                playSound('achievement'); 
                showToast(`🏆 إنجاز جديد مذهل! فتحت وسام "${tmpl.title}" وحصلت على +${tmpl.xp} XP وذهب!`, 'achievement'); 
                triggerStoreEffect('achievement-unlock');
            }, 800);
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
    const localSnapshot = saveSnapshot();
    habit.completed = !habit.completed;

    if (habit.completed) {
        const finalXp = Math.floor(10 * getBoostMultiplier('xp'));
        const finalCoins = Math.floor(10 * getBoostMultiplier('coin'));
        state.xp += finalXp; state.coins += finalCoins; 
        state.todayStats.xp += finalXp; state.weeklyStats.xp += finalXp;
        updateHeatmap(finalXp);
        playSound('pop'); showToast(`أحسنت! أتممت عادة اليوم. +${finalXp} XP وذهب`, 'success', true, localSnapshot); trackProductivity(5);
    } else {
        const finalXp = Math.floor(10 * getBoostMultiplier('xp'));
        const finalCoins = Math.floor(10 * getBoostMultiplier('coin'));
        state.xp = Math.max(0, state.xp - finalXp); state.coins = Math.max(0, state.coins - finalCoins); 
        state.todayStats.xp = Math.max(0, state.todayStats.xp - finalXp); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - finalXp);
        updateHeatmap(-finalXp);
        showToast('تم التراجع عن العادة', 'info', true, localSnapshot); trackProductivity(-5);
    }
    saveState(); renderHabits();
}

function deleteHabit(id, e) {
    e.stopPropagation(); const localSnapshot = saveSnapshot(); state.habits = state.habits.filter(h => h.id !== id);
    saveState(); renderHabits(); showToast('تم حذف العادة', 'info', true, localSnapshot);
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
        <div onclick="toggleHabit(${habit.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="glass-panel p-3 min-h-[44px] rounded-xl flex items-center justify-between cursor-pointer btn-press border ${habit.completed ? 'border-emerald-500/40 bg-emerald-500/5 opacity-60' : 'border-white/5 hover:bg-white/[0.02]'}">
            <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${habit.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20'}">
                    ${habit.completed ? '<i data-lucide="check" class="w-4 h-4"></i>' : ''}
                </div>
                <span class="text-sm font-semibold truncate ${habit.completed ? 'line-through text-white/40' : 'text-white/90'}">${escapeHTML(habit.title)}</span>
            </div>
            <button onclick="deleteHabit(${habit.id}, event)" aria-label="حذف العادة" class="w-11 h-11 flex items-center justify-center hover:bg-red-500/10 text-white/20 hover:text-red-400 rounded-lg transition-colors shrink-0"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
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
    const localSnapshot = saveSnapshot();
    goal.completed = !goal.completed;
    
    if (goal.completed) {
        const finalXp = Math.floor(500 * getBoostMultiplier('xp'));
        const finalCoins = Math.floor(500 * getBoostMultiplier('coin'));
        state.xp += finalXp; state.coins += finalCoins; 
        state.todayStats.xp += finalXp; state.weeklyStats.xp += finalXp;
        updateHeatmap(100);
        updateDailyStreak(); playSound('reward');
        showToast(`إنجاز أسطوري للمهمة الكبرى! +${finalXp} XP وذهب`, 'success', true, localSnapshot);
        trackProductivity(100);
    } else {
        const finalXp = Math.floor(500 * getBoostMultiplier('xp'));
        const finalCoins = Math.floor(500 * getBoostMultiplier('coin'));
        state.xp = Math.max(0, state.xp - finalXp); state.coins = Math.max(0, state.coins - finalCoins);
        state.todayStats.xp = Math.max(0, state.todayStats.xp - finalXp); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - finalXp);
        updateHeatmap(-100);
        showToast('تم التراجع عن المهمة الكبرى', 'info', true, localSnapshot); trackProductivity(-100);
    }
    saveState(); renderGoals();
}

function deleteBigQuest(id, event) {
    event.stopPropagation(); const localSnapshot = saveSnapshot(); state.goals = state.goals.filter(g => g.id !== id);
    saveState(); renderGoals(); showToast('تم الحذف', 'info', true, localSnapshot);
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
        <div onclick="toggleBigQuest(${goal.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="group glass-panel p-4 min-h-[44px] rounded-2xl flex items-center justify-between cursor-pointer transition-all btn-press border ${goal.completed ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 hover:bg-white/[0.03]'}">
            <div class="flex items-center gap-3 flex-1 overflow-hidden">
                <div class="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${goal.completed ? 'bg-purple-500 border-purple-500' : 'border-white/20'}">
                    ${goal.completed ? '<i data-lucide="star" class="w-4 h-4 text-white"></i>' : '<i data-lucide="target" class="w-4 h-4 text-white/40"></i>'}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-base font-bold truncate ${goal.completed ? 'line-through text-purple-200/60' : 'text-white'}">${escapeHTML(goal.text)}</span>
                    <span class="text-[11px] font-bold ${goal.completed ? 'text-purple-400/50' : 'text-purple-400'}">+500 XP</span>
                </div>
            </div>
            <button onclick="deleteBigQuest(${goal.id}, event)" aria-label="حذف المهمة الكبرى" class="w-11 h-11 flex items-center justify-center hover:bg-red-500/20 text-white/20 hover:text-red-400 rounded-xl transition-colors shrink-0"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
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

function selectAvatar(id, reqLvl, reqItem) {
    if (reqItem && (!state.store || !state.store.ownedItems.includes(reqItem))) {
        showToast(`هذا الأفاتار مقفول! يجب شراؤه من المتجر أولاً.`, 'info'); return;
    }
    if (!reqItem && getLevel() < reqLvl) {
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
        const isLocked = av.reqItem ? (!state.store || !state.store.ownedItems.includes(av.reqItem)) : (level < av.reqLvl);
        let lockOverlay = '';
        
        if (isLocked) {
            const lockText = av.reqItem ? 'متجر' : `Lvl ${av.reqLvl}`;
            lockOverlay = `<div class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 rounded-2xl"><i data-lucide="lock" class="w-6 h-6 text-white/80 mb-1"></i><span class="text-[9px] font-bold text-white bg-red-500/80 px-1.5 py-0.5 rounded">${lockText}</span></div>`;
        }

        const decs = isSelected && !isLocked ? getAvatarDecorationsHtml(level, true) : '';
        const aura = isSelected && !isLocked ? getAvatarAuraClass(level) : 'border border-white/10 hover:border-white/30';
        const scale = isSelected ? 'scale-95' : '';

        return `
        <div onclick="selectAvatar(${av.id}, ${av.reqLvl}, '${av.reqItem || ''}')" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="relative aspect-square rounded-2xl cursor-pointer transition-transform btn-press ${scale} ${aura}">
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
        btn.className = "w-full py-3 min-h-[44px] bg-red-600 text-white rounded-xl text-sm font-bold btn-press transition-all animate-pulse";
        btn.innerText = "هل أنت متأكد؟ (اضغط مجدداً للتأكيد)";
        setTimeout(() => {
            resetClickCount = 0;
            btn.className = "w-full py-3 min-h-[44px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold btn-press transition-all";
            btn.innerText = "إعادة تهيئة البيانات (Reset)";
        }, 3000);
    } else {
        // 1. Destructive State Wipe
        state = JSON.parse(JSON.stringify(INITIAL_STATE)); 
        
        // 2. Clear Runtime State
        if (stopwatchInterval) {
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
        }
        pendingRandomEvent = null;
        stateSnapshot = null;

        // 3. Save pristine state (automatically triggers updateGlobalUI)
        saveState();

        // 4. Reset Theme & Global Components
        applyTheme();
        updateStopwatchUI(true);
        renderHeatmap();
        renderStudyTimeTable();
        renderRecentSessions();
        renderErrorBank();

        // 5. Reset Button UI
        resetClickCount = 0;
        btn.className = "w-full py-3 min-h-[44px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold btn-press transition-all";
        btn.innerText = "إعادة تهيئة البيانات (Reset)";
        
        // 6. Redirect and Notify (Irreversible)
        switchTab('dashboard'); 
        showToast('تم مسح جميع البيانات والعودة لنقطة الصفر.', 'info');
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
    const localSnapshot = saveSnapshot();
    task.completed = !task.completed;
    
    if (task.completed) {
        const xpMult = getBoostMultiplier('xp');
        const coinMult = getBoostMultiplier('coin');
        const finalXp = Math.floor(task.xp * xpMult);
        const finalCoins = Math.floor(task.xp * coinMult);
        state.xp += finalXp; state.coins += finalCoins; state.stats[task.category] += 1;
        state.todayStats.tasks += 1; state.todayStats.xp += finalXp;
        state.weeklyStats.tasks += 1; state.weeklyStats.xp += finalXp;
        updateHeatmap(finalXp);
        updateDailyStreak(); playSound('success'); showToast(`عاش! +${finalXp} XP وعملة`, 'success', true, localSnapshot);
        trackProductivity(finalXp);
        triggerStoreEffect('task-complete');
    } else {
        const xpMult = getBoostMultiplier('xp');
        const coinMult = getBoostMultiplier('coin');
        const finalXp = Math.floor(task.xp * xpMult);
        const finalCoins = Math.floor(task.xp * coinMult);
        state.xp = Math.max(0, state.xp - finalXp); state.coins = Math.max(0, state.coins - finalCoins);
        state.stats[task.category] = Math.max(0, state.stats[task.category] - 1);
        state.todayStats.tasks = Math.max(0, state.todayStats.tasks - 1); state.todayStats.xp = Math.max(0, state.todayStats.xp - finalXp);
        state.weeklyStats.tasks = Math.max(0, state.weeklyStats.tasks - 1); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - finalXp);
        updateHeatmap(-finalXp);
        showToast('تم إلغاء إنجاز المهمة', 'info', true, localSnapshot); trackProductivity(-finalXp);
    }
    saveState(); renderTasks();
}

function deleteTask(id, event) {
    event.stopPropagation(); const localSnapshot = saveSnapshot(); state.tasks = state.tasks.filter(t => t.id !== id);
    saveState(); renderTasks(); showToast('تم حذف المهمة', 'info', true, localSnapshot);
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
        <div onclick="toggleTask(${task.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="group glass-panel p-4 min-h-[44px] rounded-[1.5rem] flex items-center justify-between cursor-pointer transition-all btn-press ${task.completed ? 'opacity-50 bg-white/5' : 'hover:bg-white/[0.03]'}">
            <div class="flex items-center gap-3 flex-1 overflow-hidden">
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${task.completed ? `${style.bgCheck} border-transparent` : 'border-white/20'}">
                    ${task.completed ? '<i data-lucide="check" class="w-4 h-4 text-white"></i>' : ''}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-base font-medium truncate ${task.completed ? 'line-through text-white/40' : 'text-white/90'}">${escapeHTML(task.text)}</span>
                    <span class="text-[11px] font-bold ${task.completed ? 'text-white/40' : style.textCheck}">+${task.xp} XP | ${style.label}</span>
                </div>
            </div>
            <button onclick="deleteTask(${task.id}, event)" aria-label="حذف المهمة" class="w-11 h-11 flex items-center justify-center hover:bg-red-500/20 text-white/20 hover:text-red-400 rounded-xl transition-colors shrink-0"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
        </div>`;
    }).join('');
    lucide.createIcons({ root: container });
}

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
            subjectLabel.className = "text-orange-400 font-bold text-xs bg-orange-500/10 px-4 py-2 min-h-[32px] rounded-full border border-orange-500/20 shadow-inner mt-2 animate-pulse transition-all duration-300";
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
                subjectLabel.className = "text-white/50 font-bold text-xs bg-white/5 px-4 py-2 min-h-[32px] rounded-full border border-white/10 mt-2 transition-all duration-300";
            }
        } else {
            if (finishBtn) finishBtn.classList.add('opacity-50', 'pointer-events-none', 'scale-95');
            if (resetBtn) resetBtn.classList.add('opacity-50', 'pointer-events-none', 'scale-95');
            if (subjectLabel) {
                subjectLabel.innerText = "جاهز للبدء";
                subjectLabel.className = "text-blue-400 font-bold text-xs bg-blue-500/10 px-4 py-2 min-h-[32px] rounded-full border border-blue-500/20 shadow-inner mt-2 transition-all duration-300";
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
    
    let minutes = Math.floor(totalMs / 60000);
    
    if (minutes < 1) {
        showToast('الجلسة قصيرة جداً (أقل من دقيقة)، لم يتم حفظها.', 'info');
        return;
    }

    if (minutes > 720) {
        minutes = 720;
        totalMs = 720 * 60000;
        showToast('تم تحديد الجلسة بـ 12 ساعة كحد أقصى لمنع التلاعب بالوقت.', 'info');
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
        <button onclick="confirmSaveSession(${sub.id})" class="w-full text-right p-3 min-h-[44px] rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all flex items-center justify-between group btn-press mb-2">
            <span class="font-bold text-white group-hover:text-blue-400">${escapeHTML(sub.name)}</span>
            <i data-lucide="chevron-left" class="w-5 h-5 text-white/30 group-hover:text-blue-400"></i>
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
}

function confirmSaveSession(subjectId) {
    const subject = state.studySubjects.find(s => s.id === subjectId);
    if (!subject) return;

    const totalMs = state.activeSession.elapsedMs;
    const minutes = Math.floor(totalMs / 60000);
    
    if(!subject.history) subject.history = [];
    
    const todayStr = getLocalDateStr();
    
    subject.history.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        date: todayStr,
        minutes: minutes,
        timestamp: Date.now()
    });
    
    subject.totalMinutes += minutes;
    subject.lastStudied = new Date().toLocaleDateString('ar-EG');
    
    const finalXp = Math.floor((minutes * 2) * getBoostMultiplier('xp'));
    const finalCoins = Math.floor((minutes * 1) * getBoostMultiplier('coin'));
    state.xp += finalXp;
    state.coins += finalCoins;
    state.totalFocusMinutes += minutes;
    state.todayStats.focus += minutes;
    state.weeklyStats.focus += minutes;
    
    trackProductivity(finalXp);
    updateHeatmap(finalXp);
    updateDailyStreak();
    
    state.activeSession = { isRunning: false, startTime: null, elapsedMs: 0 };
    
    saveState();
    closeSaveSessionModal();
    updateStopwatchUI(true);
    renderStudyTimeTable();
    renderRecentSessions();
    renderStats();
    
    playSound('reward');
    showToast(`أحسنت! تمت إضافة ${minutes} دقيقة إلى ${subject.name}. +${finalXp} XP`, 'success');
    triggerStoreEffect('focus-complete');
}

function setSubjectWeeklyGoal(id) {
    const subject = state.studySubjects.find(s => s.id === id);
    if (!subject) return;
    const currentGoal = subject.weeklyGoal || 0;
    const input = prompt(`أدخل الهدف الأسبوعي بالدقائق لمادة ${subject.name} (مثال: 120 لساعتين):`, currentGoal);
    if (input !== null && input.trim() !== '') {
        const parsed = parseInt(input, 10);
        if (!isNaN(parsed) && parsed >= 0) {
            subject.weeklyGoal = parsed;
            saveState();
            renderStudyTimeTable();
            showToast('تم تحديث الهدف الأسبوعي بنجاح', 'success');
        } else {
            showToast('قيمة غير صالحة', 'info');
        }
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

    const todayStr = getLocalDateStr();
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
                    <div class="font-bold text-white text-base group-hover:text-blue-400 transition-colors">${escapeHTML(sub.name)}</div>
                    <div class="text-[11px] text-white/40 mb-1">آخر مرة: ${sub.lastStudied || 'لم تُدرس'}</div>
                    ${goalHtml}
                </td>
                <td class="py-3 px-2 text-center text-sm font-bold text-emerald-400">
                    ${formatStudyTimeShort(todayMins)}
                </td>
                <td class="py-3 px-2 text-center text-sm font-bold text-blue-400">
                    ${formatStudyTimeShort(weeklyMins)}
                </td>
                <td class="py-3 px-2 text-center text-sm font-bold text-indigo-400 bg-indigo-500/5 rounded-lg">
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
                        <button onclick="setSubjectWeeklyGoal(${sub.id})" aria-label="تحديد الهدف الأسبوعي" class="w-11 h-11 flex items-center justify-center text-white/50 hover:text-emerald-400 transition-all hover:scale-110 btn-press" title="الهدف الأسبوعي"><i data-lucide="target" class="w-5 h-5"></i></button>
                        <button onclick="editStudySubject(${sub.id})" aria-label="تعديل اسم المادة" class="w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-all hover:scale-110 btn-press" title="تعديل الاسم"><i data-lucide="edit-2" class="w-5 h-5"></i></button>
                        <button onclick="deleteStudySubject(${sub.id})" aria-label="حذف المادة" class="w-11 h-11 flex items-center justify-center text-white/50 hover:text-red-400 transition-all hover:scale-110 btn-press" title="حذف"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    lucide.createIcons({ root: container });
}

function renderRecentSessions() {
    const container = document.getElementById('recent-sessions-container');
    if (!container) return;

    let allSessions = [];
    
    if (Array.isArray(state.studySubjects)) {
        state.studySubjects.forEach(sub => {
            if (Array.isArray(sub.history)) {
                sub.history.forEach((session, index) => {
                    if (!session || typeof session !== 'object') return;
                    
                    const safeId = session.id || `${sub.id}_${index}`;
                    const safeTime = Number(session.timestamp) || new Date(session.date).getTime() || 0;
                    
                    allSessions.push({
                        id: safeId,
                        subjectId: sub.id,
                        subjectName: sub.name || 'مادة غير معروفة',
                        minutes: Number(session.minutes) || 0,
                        date: session.date || 'غير معروف',
                        timestamp: safeTime
                    });
                });
            }
        });
    }

    allSessions.sort((a, b) => b.timestamp - a.timestamp);
    const recent = allSessions.slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = `
            <div class="py-8 flex flex-col items-center justify-center opacity-50">
                <i data-lucide="history" class="w-10 h-10 mb-3 text-orange-400/50"></i>
                <p class="text-sm text-white/70 font-medium">لسه مفيش جلسات مذاكرة</p>
                <p class="text-xs text-white/40 mt-1">ابدأ جلسة تركيز وسجّل أول جلسة ليك هنا.</p>
            </div>
        `;
        lucide.createIcons({ root: container });
        return;
    }

    container.innerHTML = recent.map(session => {
        let dateDisplay = session.date;
        const todayStr = getLocalDateStr();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = getLocalDateStr(yesterday);
        
        let timeString = '';
        if (session.timestamp) {
            const d = new Date(session.timestamp);
            if (!isNaN(d.getTime())) {
                timeString = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
            }
        }

        if (session.date === todayStr) {
            dateDisplay = `اليوم ${timeString ? '· ' + timeString : ''}`;
        } else if (session.date === yesterdayStr) {
            dateDisplay = `أمس ${timeString ? '· ' + timeString : ''}`;
        } else {
            dateDisplay = `${session.date} ${timeString ? '· ' + timeString : ''}`;
        }

        return `
        <div class="session-item flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 min-h-[44px] group">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                    <i data-lucide="flame" class="w-5 h-5 text-orange-400"></i>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-base text-white group-hover:text-orange-400 transition-colors">${escapeHTML(session.subjectName)}</span>
                    <span class="text-[11px] text-white/50 font-medium mt-0.5">${dateDisplay}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">${formatStudyTimeShort(session.minutes)}</span>
                <button onclick="deleteSession(${session.subjectId}, '${session.id}')" aria-label="حذف الجلسة" class="w-10 h-10 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all btn-press opacity-50 group-hover:opacity-100" title="حذف الجلسة">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
        `;
    }).join('');
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
    
    const todayStr = getLocalDateStr();
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
    renderHeatmap();
    updateGlobalUI();
    renderProductivityChart();
    renderStats();

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
        renderStats();
        showToast('تم تحديث اسم المادة بنجاح', 'success');
    }
}

function deleteStudySubject(id) {
    if (!confirm('هل أنت متأكد من حذف هذه المادة؟ سيتم مسح سجل وقتها بالكامل (لن تتأثر الخبرة المكتسبة مسبقاً).')) return;
    state.studySubjects = state.studySubjects.filter(s => s.id !== id);
    saveState();
    renderStudyTimeTable();
    renderRecentSessions();
    renderStats();
    showToast('تم حذف المادة', 'info');
}

function buyStoreItem(id) {
    const item = STORE_CATALOG.find(i => i.id === id);
    if (!item) return;

    const isPermanent = ['theme', 'title', 'avatar', 'effect'].includes(item.type);
    if (isPermanent && state.store.ownedItems.includes(id)) {
        showToast('أنت تملك هذا العنصر بالفعل!', 'info');
        return;
    }

    if (state.coins < item.cost) {
        showToast(`تحتاج إلى ${item.cost - state.coins} ذهب إضافي.`, 'info');
        return;
    }

    const localSnapshot = saveSnapshot();
    state.coins -= item.cost;

    if (item.type === 'mystery') {
        openMysteryBox(item, localSnapshot);
        return;
    }

    if (isPermanent) {
        state.store.ownedItems.push(id);
        playSound('reward');
        showToast(`تم شراء ${item.title} بنجاح!`, 'success', true, localSnapshot);
    } else {
        state.store.consumables.push({ instanceId: Date.now() + Math.random(), itemId: id });
        playSound('reward');
        showToast(`تم شراء ${item.title}. تجده في خزانة المقتنيات.`, 'success', true, localSnapshot);
    }

    saveState();
    renderStore();
    updateGlobalUI();
}

function activateStoreItem(id) {
    const item = STORE_CATALOG.find(i => i.id === id);
    if (!item || !state.store.ownedItems.includes(id)) return;

    if (item.type === 'theme') {
        state.store.activeTheme = id;
        applyTheme();
    } else if (item.type === 'title') {
        state.store.activeTitle = id;
    } else if (item.type === 'avatar') {
        state.avatarId = item.avatarId;
        renderProfile();
    } else if (item.type === 'effect') {
        if (!state.store.activeEffects.includes(id)) {
            state.store.activeEffects.push(id);
        }
    }

    saveState();
    renderStore();
    updateGlobalUI();
    showToast(`تم تفعيل ${item.title}`, 'info');
}

function deactivateStoreItem(id) {
    const item = STORE_CATALOG.find(i => i.id === id);
    if (!item) return;

    if (item.type === 'theme' && state.store.activeTheme === id) {
        state.store.activeTheme = null;
        applyTheme();
    } else if (item.type === 'title' && state.store.activeTitle === id) {
        state.store.activeTitle = null;
    } else if (item.type === 'avatar' && state.avatarId === item.avatarId) {
        const level = getLevel();
        const availableStandard = AVATARS_DATA.filter(a => a.type === 'standard' && a.reqLvl <= level);
        const highest = availableStandard.reduce((prev, current) => (prev.id > current.id) ? prev : current, availableStandard[0]);
        state.avatarId = highest ? highest.id : 1;
        renderProfile();
    } else if (item.type === 'effect') {
        state.store.activeEffects = state.store.activeEffects.filter(eId => eId !== id);
    }

    saveState();
    renderStore();
    updateGlobalUI();
}

function consumeItem(instanceId) {
    const index = state.store.consumables.findIndex(c => c.instanceId === instanceId);
    if (index === -1) return;

    const consumable = state.store.consumables[index];
    const item = STORE_CATALOG.find(i => i.id === consumable.itemId);
    if (!item) return;

    const localSnapshot = saveSnapshot();
    state.store.consumables.splice(index, 1);

    if (item.type === 'boost') {
        state.store.activeBoosts.push({
            itemId: item.id,
            expiresAt: Date.now() + item.duration
        });
        playSound('achievement');
        showToast(`تم تفعيل ${item.title}!`, 'success', true, localSnapshot);
    } else if (item.type === 'instant') {
        if (item.grantXp) state.xp += item.grantXp;
        if (item.grantFocus) {
            state.totalFocusMinutes += item.grantFocus;
            state.todayStats.focus += item.grantFocus;
            state.weeklyStats.focus += item.grantFocus;
        }
        if (item.grantStreak) state.streak += item.grantStreak;
        playSound('achievement');
        showToast(`تم استخدام ${item.title} بنجاح!`, 'success', true, localSnapshot);
    }

    saveState();
    renderStore();
    updateGlobalUI();
}

function openMysteryBox(boxItem, localSnapshot) {
    const rand = Math.random();
    let rewardText = '';
    
    if (boxItem.pool === 'small') {
        if (rand < 0.4) {
            state.xp += 300; rewardText = '300 XP';
        } else if (rand < 0.8) {
            state.coins += 300; rewardText = '300 ذهب';
        } else {
            state.store.consumables.push({ instanceId: Date.now(), itemId: 'boost_xp_1' });
            rewardText = 'مضاعف الخبرة (ساعة)';
        }
    } else {
        if (rand < 0.33) {
            state.xp += 1000; rewardText = '1000 XP';
        } else if (rand < 0.66) {
            state.coins += 1000; rewardText = '1000 ذهب';
        } else {
            const epicItems = STORE_CATALOG.filter(i => i.rarity === 'epic' && ['theme', 'title'].includes(i.type));
            const rolledItem = epicItems[Math.floor(Math.random() * epicItems.length)];
            
            if (rolledItem && !state.store.ownedItems.includes(rolledItem.id)) {
                state.store.ownedItems.push(rolledItem.id);
                rewardText = rolledItem.title;
            } else {
                state.coins += 1500;
                rewardText = '1500 ذهب (تعويض عن عنصر مكرر)';
            }
        }
    }

    playSound('epic_hit');
    showToast(`فتحت ${boxItem.title} وحصلت على: ${rewardText} 🎁`, 'achievement', true, localSnapshot);
    saveState();
    renderStore();
    updateGlobalUI();
}

function renderStoreGrid() {
    const grid = document.getElementById('ui-store-grid');
    const emptyState = document.getElementById('ui-store-grid-empty');
    if (!grid) return;

    let items = STORE_CATALOG;
    if (currentStoreCategory !== 'all') {
        items = items.filter(i => i.category === currentStoreCategory);
    }

    if (items.length === 0) {
        grid.innerHTML = '';
        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.classList.add('block');
        }
        return;
    } else {
        if (emptyState) {
            emptyState.classList.add('hidden');
            emptyState.classList.remove('block');
        }
    }

    grid.innerHTML = items.map(item => {
        const isOwned = state.store.ownedItems.includes(item.id);
        const canAfford = state.coins >= item.cost;
        const isPermanent = ['theme', 'title', 'avatar', 'effect'].includes(item.type);
        
        let isActive = false;
        if (item.type === 'theme') isActive = state.store.activeTheme === item.id;
        if (item.type === 'title') isActive = state.store.activeTitle === item.id;
        if (item.type === 'avatar') isActive = state.avatarId === item.avatarId;
        if (item.type === 'effect') isActive = state.store.activeEffects.includes(item.id);

        let btnHtml = '';
        if (isOwned && isPermanent) {
            if (isActive) {
                btnHtml = `<button onclick="deactivateStoreItem('${item.id}')" class="w-full py-2 min-h-[44px] rounded-xl bg-white/10 text-white font-bold text-sm btn-press">إلغاء التفعيل</button>`;
            } else {
                btnHtml = `<button onclick="activateStoreItem('${item.id}')" class="w-full py-2 min-h-[44px] rounded-xl bg-blue-500/20 text-blue-400 font-bold text-sm btn-press">تفعيل</button>`;
            }
        } else {
            btnHtml = `<button onclick="buyStoreItem('${item.id}')" class="w-full py-2 min-h-[44px] rounded-xl ${canAfford ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-white/30 cursor-not-allowed'} font-bold text-sm flex justify-center items-center gap-2 btn-press">
                شراء بـ ${item.cost} <i data-lucide="coins" class="w-4 h-4"></i>
            </button>`;
        }

        return `
        <div class="store-card glass-panel p-4 rounded-2xl border border-white/5 rarity-${item.rarity} ${isOwned && isPermanent ? 'owned' : ''} ${isActive ? 'active-item' : ''}">
            <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl store-card-icon-bg flex items-center justify-center shrink-0">
                    <i data-lucide="${item.icon}" class="w-6 h-6 store-card-icon"></i>
                </div>
                ${isOwned && isPermanent ? `<span class="text-[10px] font-bold bg-white/10 text-white/70 px-2 py-1 rounded-md">مملوك</span>` : ''}
            </div>
            <h4 class="text-base font-bold text-white mb-1">${item.title}</h4>
            <p class="text-[11px] text-white/60 leading-relaxed mb-4 flex-1">${item.desc}</p>
            ${btnHtml}
        </div>`;
    }).join('');
    lucide.createIcons({ root: grid });
}

function renderStore() {
    const storeCoinsMagicEl = document.getElementById('ui-store-coins-magic');
    if (storeCoinsMagicEl) storeCoinsMagicEl.innerText = state.coins;
    
    renderStoreGrid();
    
    const activeBoostsContainer = document.getElementById('ui-active-boosts-container');
    const activeBoostsSection = document.getElementById('ui-store-active-boosts');
    
    if (activeBoostsContainer && activeBoostsSection) {
        const now = Date.now();
        const active = state.store.activeBoosts.filter(b => b.expiresAt > now);
        
        if (active.length > 0) {
            activeBoostsSection.classList.remove('hidden');
            activeBoostsSection.classList.add('flex');
            
            activeBoostsContainer.innerHTML = active.map(b => {
                const item = STORE_CATALOG.find(i => i.id === b.itemId);
                if (!item) return '';
                const remainingMins = Math.ceil((b.expiresAt - now) / 60000);
                return `
                <div class="glass-panel p-3 rounded-xl border border-orange-500/30 bg-orange-500/5 flex items-center gap-3 active-boost-card">
                    <div class="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                        <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-bold text-white truncate">${item.title}</h4>
                        <p class="text-[10px] text-orange-400 font-bold mt-0.5">ينتهي بعد ${remainingMins} دقيقة</p>
                    </div>
                </div>`;
            }).join('');
        } else {
            activeBoostsSection.classList.add('hidden');
            activeBoostsSection.classList.remove('flex');
        }
    }

    const invContainer = document.getElementById('ui-inventory-container');
    const invEmpty = document.getElementById('ui-inventory-empty');
    if (invContainer) {
        if (!state.store.consumables || state.store.consumables.length === 0) {
            invContainer.innerHTML = '';
            if (invEmpty) {
                invEmpty.classList.remove('hidden');
                invEmpty.classList.add('block');
            }
        } else {
            if (invEmpty) {
                invEmpty.classList.add('hidden');
                invEmpty.classList.remove('block');
            }
            invContainer.innerHTML = state.store.consumables.map(c => {
                const item = STORE_CATALOG.find(i => i.id === c.itemId);
                if (!item) return '';
                return `
                <div class="glass-panel p-3.5 min-h-[44px] rounded-2xl flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5 group shadow-lg">
                    <div class="flex items-center gap-3 flex-1 overflow-hidden">
                        <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                            <i data-lucide="${item.icon}" class="w-5 h-5 text-emerald-400"></i>
                        </div>
                        <div class="flex flex-col min-w-0">
                            <h4 class="text-sm font-bold text-white leading-tight truncate pr-1">${escapeHTML(item.title)}</h4>
                            <span class="text-[10px] text-emerald-400/70 truncate">${item.desc}</span>
                        </div>
                    </div>
                    <button onclick="consumeItem(${c.instanceId})" class="px-4 py-2 min-h-[44px] bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl text-sm font-bold transition-all btn-press shrink-0">استخدام</button>
                </div>`;
            }).join('');
        }
    }
    lucide.createIcons();
}

function calculateAdvancedStats() {
    const now = new Date();
    const todayStr = getLocalDateStr(now);
    const sevenDaysAgo = new Date(now); sevenDaysAgo.setDate(now.getDate() - 7);
    const thirtyDaysAgo = new Date(now); thirtyDaysAgo.setDate(now.getDate() - 30);

    let allSessions = [];
    let subjectTotals = [];
    let totalAllMinutes = 0;

    state.studySubjects.forEach(sub => {
        let subMins = 0;
        if (sub.history) {
            sub.history.forEach(h => {
                allSessions.push({...h, subjectName: sub.name});
                subMins += h.minutes;
            });
        }
        if (subMins > 0) {
            subjectTotals.push({ name: sub.name, minutes: subMins });
            totalAllMinutes += subMins;
        }
    });

    allSessions.sort((a, b) => a.timestamp - b.timestamp);

    let todaySessions = 0;
    let weeklySessions = 0;
    let monthlySessions = 0;
    let totalMinutes = 0;
    let longestSession = 0;

    let sessionsByDate = {};
    let minutesByDate = {};
    let timePeriods = { 'الصباح': 0, 'الظهيرة': 0, 'المساء': 0, 'الليل': 0 };

    allSessions.forEach(s => {
        const sDate = new Date(s.timestamp);
        if (s.date === todayStr) todaySessions++;
        if (sDate >= sevenDaysAgo) weeklySessions++;
        if (sDate >= thirtyDaysAgo) monthlySessions++;

        totalMinutes += s.minutes;
        if (s.minutes > longestSession) longestSession = s.minutes;

        sessionsByDate[s.date] = (sessionsByDate[s.date] || 0) + 1;
        minutesByDate[s.date] = (minutesByDate[s.date] || 0) + s.minutes;

        const hour = sDate.getHours();
        if (hour >= 5 && hour < 12) timePeriods['الصباح'] += s.minutes;
        else if (hour >= 12 && hour < 17) timePeriods['الظهيرة'] += s.minutes;
        else if (hour >= 17 && hour < 21) timePeriods['المساء'] += s.minutes;
        else timePeriods['الليل'] += s.minutes;
    });

    const avgDuration = allSessions.length > 0 ? Math.round(totalMinutes / allSessions.length) : 0;

    let mostSessionsDay = 0;
    for (let d in sessionsByDate) {
        if (sessionsByDate[d] > mostSessionsDay) mostSessionsDay = sessionsByDate[d];
    }

    let longestDayMins = 0;
    for (let d in minutesByDate) {
        if (minutesByDate[d] > longestDayMins) longestDayMins = longestDayMins;
    }

    let bestTime = '--';
    let maxTimeMins = 0;
    for (let p in timePeriods) {
        if (timePeriods[p] > maxTimeMins) {
            maxTimeMins = timePeriods[p];
            bestTime = p;
        }
    }

    subjectTotals.sort((a, b) => b.minutes - a.minutes);
    let distribution = subjectTotals.slice(0, 4).map(s => ({
        name: s.name,
        percent: Math.round((s.minutes / totalAllMinutes) * 100)
    }));

    let score = 0;
    if (allSessions.length > 0) {
        let volScore = Math.min((weeklySessions / 14) * 50, 50);
        let durScore = Math.min((avgDuration / 45) * 50, 50);
        score = Math.round(volScore + durScore);
    }

    let compareText = "لا توجد بيانات سابقة";
    let compareTrend = "neutral";
    if (state.weeklyReports && state.weeklyReports.length > 0) {
        const lastWeekFocus = state.weeklyReports[0].stats.focus || 0;
        const thisWeekFocus = state.weeklyStats.focus || 0;
        if (lastWeekFocus > 0) {
            const diff = Math.round(((thisWeekFocus - lastWeekFocus) / lastWeekFocus) * 100);
            if (diff > 0) { compareText = `+${diff}% عن الأسبوع الماضي`; compareTrend = 'up'; }
            else if (diff < 0) { compareText = `${diff}% عن الأسبوع الماضي`; compareTrend = 'down'; }
            else { compareText = "نفس مستوى الأسبوع الماضي"; }
        }
    }

    return {
        todaySessions, weeklySessions, monthlySessions, avgDuration,
        longestSession, mostSessionsDay, longestDayMins, bestTime,
        distribution, score, compareText, compareTrend,
        totalSessions: allSessions.length
    };
}

function generateSmartInsights(stats) {
    let insights = [];
    
    if (!stats || stats.totalSessions === 0) {
        return [{ icon: 'brain', text: 'لسه مفيش بيانات كافية. ابدأ أول جلسة تركيز عشان نقدر نحلل أدائك!', color: 'text-purple-400' }];
    }

    if (stats.bestTime && stats.bestTime !== '--') {
        insights.push({ icon: 'clock', text: `أغلب وقت مذاكرتك بيكون في فترة ${stats.bestTime} — حاول تحط أصعب المهام في الوقت ده.`, color: 'text-blue-400' });
    }

    if (stats.avgDuration >= 40) {
        insights.push({ icon: 'zap', text: `متوسط جلستك ${stats.avgDuration} دقيقة. ممتاز! أنت بتحافظ على تركيز عميق لفترات طويلة.`, color: 'text-yellow-400' });
    } else if (stats.avgDuration > 0 && stats.avgDuration < 25) {
        insights.push({ icon: 'alert-circle', text: `جلساتك قصيرة (متوسط ${stats.avgDuration} دقيقة). جرّب تقنية بومودورو (25 دقيقة) لزيادة التحمل.`, color: 'text-rose-400' });
    }

    if (stats.distribution && stats.distribution.length > 0) {
        const topSubject = stats.distribution[0];
        if (topSubject.percent > 50) {
            insights.push({ icon: 'pie-chart', text: `مادة "${topSubject.name}" واخدة ${topSubject.percent}% من وقتك. تأكد إنك مش ناسي باقي المواد.`, color: 'text-indigo-400' });
        }
    }

    if (stats.compareTrend === 'up') {
        insights.push({ icon: 'trending-up', text: 'أنت بتحقق تقدم ملحوظ ومعدل دراستك زاد عن الأسبوع اللي فات. استمر!', color: 'text-emerald-400' });
    } else if (stats.weeklySessions >= 5) {
        insights.push({ icon: 'flame', text: `أنت ذاكرت ${stats.weeklySessions} جلسات هذا الأسبوع. استمرارية ممتازة!`, color: 'text-orange-400' });
    }

    if (insights.length === 0) {
        insights.push({ icon: 'activity', text: 'أنت تسير بخطى ثابتة. استمر في تسجيل جلساتك لمزيد من التحليلات الدقيقة.', color: 'text-emerald-400' });
    }

    return insights.slice(0, 3);
}

function renderStats() {
    const stats = calculateAdvancedStats();

    const setTxt = (id, txt) => { const el = document.getElementById(id); if(el) el.innerText = txt; };
    
    setTxt('stat-performance-score', stats.score);
    const compEl = document.getElementById('stat-performance-compare');
    if (compEl) {
        compEl.innerText = stats.compareText;
        compEl.className = `mt-3 text-xs font-bold px-3 py-1.5 rounded-full border ${stats.compareTrend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : stats.compareTrend === 'down' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-white/5 text-white/60 border-white/10'}`;
    }

    setTxt('stat-current-level', `Lvl ${getLevel()}`);
    setTxt('stat-xp-progress-text', `${getXpProgress()} / 100 XP`);
    const xpBar = document.getElementById('stat-xp-progress-bar');
    if (xpBar) xpBar.style.width = `${getXpProgress()}%`;

    setTxt('stat-today-sessions', stats.todaySessions);
    setTxt('stat-weekly-sessions', stats.weeklySessions);
    setTxt('stat-monthly-sessions', stats.monthlySessions);
    setTxt('stat-avg-duration', `${stats.avgDuration} د`);

    setTxt('stat-best-time', stats.bestTime);
    setTxt('stat-focus-avg-len', `${stats.avgDuration} د`);
    setTxt('stat-longest-session', `${stats.longestSession} د`);

    setTxt('stat-best-streak', state.bestStreak || state.streak || 0);
    setTxt('stat-most-sessions-day', stats.mostSessionsDay);
    setTxt('stat-longest-day', `${stats.longestDayMins} د`);

    const distContainer = document.getElementById('stat-study-distribution');
    if (distContainer) {
        if (stats.distribution.length === 0) {
            distContainer.innerHTML = `<div class="text-center py-6 opacity-50"><p class="text-xs text-white/60">لا توجد بيانات كافية.</p></div>`;
        } else {
            const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-blue-500', 'bg-emerald-500'];
            distContainer.innerHTML = stats.distribution.map((d, i) => `
                <div class="mb-2">
                    <div class="flex justify-between text-xs font-bold mb-1 text-white/80">
                        <span>${escapeHTML(d.name)}</span>
                        <span>${d.percent}%</span>
                    </div>
                    <div class="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                        <div class="h-full ${colors[i%colors.length]} stat-bar-fill" style="width: ${d.percent}%"></div>
                    </div>
                </div>
            `).join('');
        }
    }

    const insightsContainer = document.getElementById('stat-smart-insights');
    if (insightsContainer) {
        const insights = generateSmartInsights(stats);
        insightsContainer.innerHTML = insights.map(ins => `
            <div class="bg-black/40 border border-white/5 rounded-xl p-4 flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <i data-lucide="${ins.icon}" class="w-4 h-4 ${ins.color}"></i>
                </div>
                <p class="text-xs text-white/80 leading-relaxed font-medium mt-0.5">${escapeHTML(ins.text)}</p>
            </div>
        `).join('');
        lucide.createIcons({ root: insightsContainer });
    }

    renderRecentSessions();
    renderErrorAnalytics();
}

function renderProductivityChart() {
    const container = document.getElementById('stat-weekly-activity-chart');
    if(!container) return;

    const now = new Date();
    let daysData = [];
    let maxMins = 1; 

    for (let i = 6; i >= 0; i--) {
        let d = new Date(now);
        d.setDate(d.getDate() - i);
        let dStr = getLocalDateStr(d);
        let dayName = d.toLocaleDateString('ar-EG', { weekday: 'short' });
        
        let mins = 0;
        state.studySubjects.forEach(sub => {
            if (sub.history) {
                sub.history.forEach(h => {
                    if (h.date === dStr) mins += h.minutes;
                });
            }
        });
        if (mins > maxMins) maxMins = mins;
        daysData.push({ dayName, mins });
    }

    container.innerHTML = `
    <div class="flex items-end justify-between h-40 gap-2 sm:gap-3 px-2 w-full pt-4">
        ${daysData.map(data => {
            const heightPercent = Math.max((data.mins / maxMins) * 100, 8); 
            return `
            <div class="flex flex-col items-center flex-1 gap-2 group h-full justify-end">
                <div class="w-full bg-white/5 rounded-t-lg rounded-b-lg relative flex items-end justify-center h-full hover:bg-white/10 transition-colors border border-white/5">
                    <div class="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg rounded-b-lg transition-all duration-1000 ease-out relative group-hover:from-blue-500 group-hover:to-cyan-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]" style="height: ${heightPercent}%;">
                        <div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs font-bold text-white px-2 py-1 rounded shadow-lg pointer-events-none border border-white/10 z-10">${data.mins}د</div>
                    </div>
                </div>
                <span class="text-[10px] font-bold text-white/50">${data.dayName}</span>
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
            <span class="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-sm font-bold text-white/80 shadow-inner">
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
        
        btn.className = "w-full py-3.5 min-h-[44px] bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 rounded-xl font-bold text-sm btn-press transition-all flex items-center justify-center gap-2 animate-pulse";
        btn.innerHTML = `<span>هل أنت متأكد من إنهاء الأسبوع؟</span><i data-lucide="help-circle" class="w-5 h-5"></i>`;
        lucide.createIcons({ root: btn });

        setTimeout(() => {
            if (advanceWeekClickCount > 0) {
                advanceWeekClickCount = 0;
                btn.className = "w-full py-3.5 min-h-[44px] bg-white hover:bg-gray-200 text-black rounded-xl font-bold text-sm btn-press transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]";
                btn.innerHTML = btn.dataset.originalHtml;
                lucide.createIcons({ root: btn });
            }
        }, 3000);
    } else {
        advanceWeekClickCount = 0;
        btn.className = "w-full py-3.5 min-h-[44px] bg-white hover:bg-gray-200 text-black rounded-xl font-bold text-sm btn-press transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]";
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
    
    const finalXp = Math.floor(200 * getBoostMultiplier('xp'));
    const finalCoins = Math.floor(200 * getBoostMultiplier('coin'));
    state.xp += finalXp; 
    state.coins += finalCoins;
    
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
        btnLessons.className = "flex-1 py-2 min-h-[44px] text-sm font-bold rounded-lg transition-all bg-emerald-500 text-white shadow-md";
        btnStudy.className = "flex-1 py-2 min-h-[44px] text-sm font-bold rounded-lg transition-all text-white/50 hover:text-white";
        document.getElementById('schedule-header-icon').setAttribute('data-lucide', 'calendar-days');
        document.getElementById('schedule-header-title').innerText = "الدروس والمواعيد";
        document.getElementById('schedule-glow').className = "absolute left-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none";
        document.getElementById('btn-add-schedule').className = "w-11 h-11 min-w-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center btn-press shrink-0 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]";
    } else {
        btnStudy.className = "flex-1 py-2 min-h-[44px] text-sm font-bold rounded-lg transition-all bg-indigo-500 text-white shadow-md";
        btnLessons.className = "flex-1 py-2 min-h-[44px] text-sm font-bold rounded-lg transition-all text-white/50 hover:text-white";
        document.getElementById('schedule-header-icon').setAttribute('data-lucide', 'book-open');
        document.getElementById('schedule-header-title').innerText = "خطة المذاكرة";
        document.getElementById('schedule-glow').className = "absolute left-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none";
        document.getElementById('btn-add-schedule').className = "w-11 h-11 min-w-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center btn-press shrink-0 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]";
    }
    lucide.createIcons(); renderScheduleDays(); renderScheduleItems();
}

function renderScheduleDays() {
    const container = document.getElementById('ui-schedule-days');
    if(!container) return;
    container.innerHTML = DAYS.map(day => {
        const isSel = day === selectedScheduleDay;
        const activeColor = activeScheduleTab === 'lessons' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
        return `<button onclick="selectedScheduleDay = '${day}'; renderScheduleDays(); renderScheduleItems();" class="px-4 py-2 min-h-[44px] flex items-center justify-center rounded-xl text-sm font-bold border transition-all shrink-0 ${isSel ? activeColor : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}">${day}</button>`;
    }).join('');
}

function addScheduleItem(e) {
    e.preventDefault();
    const inputTitle = document.getElementById('new-schedule-title');
    const inputTime = document.getElementById('new-schedule-time');
    const inputPaymentDate = document.getElementById('new-schedule-payment-date');
    if(!inputTitle || !inputTime) return;

    const title = inputTitle.value.trim();
    const time = inputTime.value.trim();
    const initialPaymentDate = inputPaymentDate ? inputPaymentDate.value : '';
    if(!title) return;

    const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
    
    let newItem = { id: Date.now(), day: selectedScheduleDay, title, time, completed: false };
    
    if (initialPaymentDate) {
        newItem.lastPaymentDate = initialPaymentDate;
        newItem.paymentDate = getNextPaymentDate(initialPaymentDate);
    }
    
    list.push(newItem);
    
    inputTitle.value = ''; inputTime.value = '';
    if(inputPaymentDate) inputPaymentDate.value = '';
    saveState(); renderScheduleItems(); showToast('تمت الإضافة للجدول بنجاح!', 'success');
}

function openRecordPaymentModal(id, e) {
    e.stopPropagation();
    const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
    const item = list.find(i => i.id === id);
    if(!item) return;
    
    const modal = document.getElementById('modal-record-payment');
    const content = document.getElementById('modal-record-payment-content');
    const dateInput = document.getElementById('record-payment-date');
    const idInput = document.getElementById('record-payment-item-id');
    
    if(!modal || !content || !dateInput || !idInput) return;
    
    idInput.value = id;
    dateInput.value = getLocalDateStr(); 
    
    modal.classList.remove('hidden'); modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.remove('opacity-0'); modal.classList.add('modal-overlay-enter');
        content.classList.remove('opacity-0', 'scale-95'); content.classList.add('modal-animate-enter');
    }, 10);
}

function closeRecordPaymentModal() {
    const modal = document.getElementById('modal-record-payment');
    if(!modal) return;
    modal.classList.remove('modal-overlay-enter'); modal.classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); modal.style.display = 'none'; }, 300);
}

function confirmRecordPayment() {
    const dateInput = document.getElementById('record-payment-date');
    const idInput = document.getElementById('record-payment-item-id');
    if(!dateInput || !idInput) return;
    
    const actualDate = dateInput.value;
    const id = parseInt(idInput.value, 10);
    
    if(!actualDate) {
        showToast('يرجى إدخال تاريخ الدفع الفعلي.', 'info');
        return;
    }
    
    const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
    const item = list.find(i => i.id === id);
    if(!item) return;
    
    item.lastPaymentDate = actualDate;
    item.paymentDate = getNextPaymentDate(actualDate);
    
    if (item.hasOwnProperty('isPaid')) {
        delete item.isPaid;
    }
    
    saveState();
    renderScheduleItems();
    closeRecordPaymentModal();
    showToast('تم تسجيل الدفع وبدء دورة شهرية جديدة بنجاح!', 'success');
}

function toggleScheduleItem(id) {
    const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
    const item = list.find(i => i.id === id);
    if(!item) return;
    const localSnapshot = saveSnapshot(); 
    item.completed = !item.completed;
    if(item.completed) { 
        const finalXp = Math.floor(20 * getBoostMultiplier('xp'));
        const finalCoins = Math.floor(10 * getBoostMultiplier('coin'));
        state.xp += finalXp; state.coins += finalCoins; 
        state.todayStats.xp += finalXp; state.weeklyStats.xp += finalXp;
        playSound('pop'); showToast(`+${finalXp} XP ، استمر يا بطل!`, 'success', true, localSnapshot); 
    } else { 
        const finalXp = Math.floor(20 * getBoostMultiplier('xp'));
        const finalCoins = Math.floor(10 * getBoostMultiplier('coin'));
        state.xp = Math.max(0, state.xp - finalXp); state.coins = Math.max(0, state.coins - finalCoins); 
        state.todayStats.xp = Math.max(0, state.todayStats.xp - finalXp); state.weeklyStats.xp = Math.max(0, state.weeklyStats.xp - finalXp);
        showToast('تم التراجع', 'info', true, localSnapshot);
    }
    saveState(); renderScheduleItems();
}

function deleteScheduleItem(id, e) {
    e.stopPropagation(); const localSnapshot = saveSnapshot();
    if (activeScheduleTab === 'lessons') state.lessons = state.lessons.filter(i => i.id !== id);
    else state.studyPlan = state.studyPlan.filter(i => i.id !== id);
    saveState(); renderScheduleItems(); showToast('تم الحذف', 'info', true, localSnapshot);
}

function renderScheduleItems() {
    const container = document.getElementById('ui-schedule-items');
    if(!container) return;

    const list = activeScheduleTab === 'lessons' ? state.lessons : state.studyPlan;
    const dayItems = list.filter(i => i.day === selectedScheduleDay);
    const colorClass = activeScheduleTab === 'lessons' ? 'emerald' : 'indigo';
    
    if(dayItems.length === 0) {
        container.innerHTML = `<div class="glass-panel p-6 rounded-2xl text-center opacity-60 border-dashed border-2 border-white/10 mt-2"><p class="text-sm text-white/70">لا توجد عناصر مضافة ليوم ${selectedScheduleDay}</p></div>`;
        return;
    }
    
    container.innerHTML = dayItems.map(item => {
        let paymentHtml = '';
        
        if (item.paymentDate) {
            let statusClass = 'payment-status-normal';
            let statusText = '';

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const pDate = new Date(item.paymentDate);
            pDate.setHours(0, 0, 0, 0);
            
            const diffTime = pDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) {
                statusClass = 'payment-status-overdue';
                statusText = 'متأخر عن الدفع';
            } else if (diffDays === 0) {
                statusClass = 'payment-status-due';
                statusText = 'مستحق اليوم';
            } else if (diffDays <= 3) {
                statusClass = 'payment-status-soon';
                statusText = 'مستحق قريباً';
            } else if (diffDays <= 7) {
                statusClass = 'payment-status-upcoming';
                statusText = 'مستحق خلال أسبوع';
            } else {
                statusClass = 'payment-status-normal';
                statusText = `موعد الدفع: ${new Date(item.paymentDate).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}`;
            }

            paymentHtml = `
                <div class="payment-info-container">
                    <span class="payment-status-badge ${statusClass}">
                        <i data-lucide="credit-card" class="w-3 h-3"></i> ${statusText}
                    </span>
                    <button onclick="openRecordPaymentModal(${item.id}, event)" class="btn-record-payment">
                        <i data-lucide="calendar-check" class="w-3 h-3"></i> تسجيل الدفع
                    </button>
                </div>
            `;
        }

        return `
        <div onclick="toggleScheduleItem(${item.id})" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" class="glass-panel p-3.5 min-h-[44px] rounded-2xl flex items-center justify-between cursor-pointer btn-press border ${item.completed ? `border-${colorClass}-500/40 bg-${colorClass}-500/10 opacity-60` : 'border-white/5 hover:bg-white/[0.02]'}">
            <div class="flex items-center gap-3 flex-1 overflow-hidden">
                <div class="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${item.completed ? `bg-${colorClass}-500 border-${colorClass}-500 text-white` : 'border-white/20'}">
                    ${item.completed ? '<i data-lucide="check" class="w-4 h-4"></i>' : ''}
                </div>
                <div class="flex flex-col min-w-0 w-full">
                    <span class="text-base font-bold truncate ${item.completed ? 'line-through text-white/40' : 'text-white/90'}">${escapeHTML(item.title)}</span>
                    ${item.time ? `<span class="text-xs text-${colorClass}-400 font-medium flex items-center gap-1 mt-0.5"><i data-lucide="clock" class="w-3 h-3"></i> ${escapeHTML(item.time)}</span>` : ''}
                    ${paymentHtml}
                </div>
            </div>
            <button onclick="deleteScheduleItem(${item.id}, event)" aria-label="حذف المادة" class="w-11 h-11 flex items-center justify-center hover:bg-red-500/10 text-white/20 hover:text-red-400 rounded-lg transition-colors shrink-0"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
        </div>`;
    }).join('');
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

    if(headerName) {
        let titleHtml = '';
        if (state.store && state.store.activeTitle) {
            const titleItem = STORE_CATALOG.find(i => i.id === state.store.activeTitle);
            if (titleItem) {
                titleHtml = `<span class="text-[10px] text-yellow-400 ml-2 border border-yellow-500/30 bg-yellow-500/10 px-1.5 py-0.5 rounded align-middle">${titleItem.label}</span>`;
            }
        }
        headerName.innerHTML = `${escapeHTML(state.userName)}${titleHtml}`;
    }
    
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
        const headerDecs = getAvatarDecorationsHtml(level, true); 
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
    const examDate = dateInput.value || getLocalDateStr();
    
    if (!examName || !isFinite(grade) || !isFinite(totalGrade) || grade < 0 || totalGrade <= 0 || grade > totalGrade) {
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
    
    const finalXp = Math.floor((Math.floor(percentage / 10) * 50) * getBoostMultiplier('xp'));
    const finalCoins = Math.floor((Math.floor(percentage / 10) * 10) * getBoostMultiplier('coin'));
    state.xp += finalXp;
    state.coins += finalCoins;
    
    examNameInput.value = '';
    gradeInput.value = '';
    totalInput.value = '';
    dateInput.value = '';
    
    saveState();
    renderExams();
    showToast(`تم إضافة نتيجة "${examName}" بنجاح! +${finalXp} XP و +${finalCoins} عملة 🎉`, 'success');
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
                        <button onclick="deleteExamSubject(${subject.id})" aria-label="حذف المادة" class="w-11 h-11 flex items-center justify-center text-white/40 hover:text-red-400 transition-colors btn-press" title="حذف المادة">
                            <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                    </div>
                    
                    ${hasExams ? `
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div class="bg-black/30 rounded-lg p-3 border border-white/5">
                                <p class="text-[10px] text-white/50 font-bold mb-1">المتوسط</p>
                                <p class="text-lg font-black ${avgColor.text}">${subject.averageGrade}%</p>
                            </div>
                            <div class="bg-black/30 rounded-lg p-3 border border-white/5">
                                <p class="text-[10px] text-white/50 font-bold mb-1">الأعلى</p>
                                <p class="text-lg font-black text-emerald-400">${subject.highestGrade}%</p>
                            </div>
                            <div class="bg-black/30 rounded-lg p-3 border border-white/5">
                                <p class="text-[10px] text-white/50 font-bold mb-1">الأقل</p>
                                <p class="text-lg font-black text-red-400">${subject.lowestGrade}%</p>
                            </div>
                            <div class="bg-black/30 rounded-lg p-3 border border-white/5">
                                <p class="text-[10px] text-white/50 font-bold mb-1">الإجمالي</p>
                                <p class="text-lg font-black text-yellow-400">${subject.totalGrade}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="p-4">
                    <form onsubmit="addExamResult(${subject.id}, event)" class="mb-4 bg-black/40 p-4 rounded-xl border border-white/5">
                        <div class="flex items-center gap-2 mb-3">
                            <i data-lucide="plus" class="w-5 h-5 text-indigo-400"></i>
                            <span class="text-sm font-bold text-white/70">إضافة نتيجة امتحان</span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <input type="text" data-exam-name aria-label="اسم الامتحان" placeholder="اسم الامتحان" required class="bg-black/60 rounded-lg border border-white/10 text-white px-4 text-base min-h-[44px] focus:outline-none placeholder-white/30 font-medium">
                            <input type="number" data-exam-grade aria-label="درجتك" placeholder="درجتك" step="0.1" required class="bg-black/60 rounded-lg border border-white/10 text-white px-4 text-base min-h-[44px] focus:outline-none placeholder-white/30 font-medium">
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <input type="number" data-exam-total aria-label="الدرجة الكلية" placeholder="الدرجة الكلية" step="0.1" required class="bg-black/60 rounded-lg border border-white/10 text-white px-4 text-base min-h-[44px] focus:outline-none placeholder-white/30 font-medium">
                            <input type="date" data-exam-date aria-label="تاريخ الامتحان" class="bg-black/60 rounded-lg border border-white/10 text-white px-4 text-base min-h-[44px] focus:outline-none placeholder-white/30 font-medium">
                        </div>
                        <button type="submit" class="w-full py-3 min-h-[44px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base btn-press transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] flex justify-center items-center gap-2">
                            <i data-lucide="plus" class="w-4 h-4"></i> أضف النتيجة
                        </button>
                    </form>
                    
                    <div class="space-y-3">
                        ${subject.exams.length === 0 ? `
                            <div class="text-center py-4 text-white/40 text-sm">
                                لا توجد نتائج امتحانات حتى الآن
                            </div>
                        ` : subject.exams.map(exam => {
                            const examColor = getGradeColor(exam.percentage);
                            return `
                                <div class="${examColor.bg} border ${examColor.border} rounded-xl p-4 min-h-[44px] flex items-center justify-between group hover:shadow-lg transition-all">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <h4 class="font-bold text-white text-base">${escapeHTML(exam.name)}</h4>
                                            <span class="text-[11px] font-bold ${examColor.text} bg-black/40 px-2 py-0.5 rounded">${examColor.label}</span>
                                        </div>
                                        <div class="flex items-center gap-3 text-sm text-white/70">
                                            <span><strong class="text-white">${exam.grade}/${exam.totalGrade}</strong></span>
                                            <span class="${examColor.text} font-bold">${exam.percentage}%</span>
                                            <span class="text-white/50">${new Date(exam.date).toLocaleDateString('ar-EG')}</span>
                                        </div>
                                    </div>
                                    <button onclick="deleteExamResult(${subject.id}, ${exam.id})" aria-label="حذف النتيجة" class="w-11 h-11 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors btn-press opacity-50 group-hover:opacity-100" title="حذف النتيجة">
                                        <i data-lucide="x" class="w-5 h-5"></i>
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

// ==========================================================================
// ERROR BANK V2 & ANALYTICS
// ==========================================================================

function initErrorBank() {
    const formAddError = document.getElementById('form-add-error');
    if (formAddError) formAddError.addEventListener('submit', addError);

    const searchInput = document.getElementById('error-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentErrorSearch = e.target.value.trim().toLowerCase();
                errorRenderLimit = 20;
                renderErrorBank();
            }, 250);
        });
    }

    const loadMoreBtn = document.getElementById('error-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            errorRenderLimit += 20;
            renderErrorBank();
        });
    }

    const btnSmartReview = document.getElementById('btn-smart-review');
    if (btnSmartReview) btnSmartReview.addEventListener('click', triggerSmartReview);

    const btnCloseDetail = document.getElementById('btn-close-error-detail');
    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeErrorDetail);

    const btnActionRepeat = document.getElementById('btn-error-action-repeat');
    if (btnActionRepeat) btnActionRepeat.addEventListener('click', repeatError);

    const btnActionReview = document.getElementById('btn-error-action-review');
    if (btnActionReview) btnActionReview.addEventListener('click', openErrorReview);

    const btnActionMaster = document.getElementById('btn-error-action-master');
    if (btnActionMaster) btnActionMaster.addEventListener('click', masterError);

    const btnActionDelete = document.getElementById('btn-error-action-delete');
    if (btnActionDelete) btnActionDelete.addEventListener('click', deleteError);

    const formReview = document.getElementById('form-error-review');
    if (formReview) formReview.addEventListener('submit', submitErrorReview);

    const btnCloseReview = document.getElementById('btn-close-error-review');
    if (btnCloseReview) btnCloseReview.addEventListener('click', closeErrorReview);

    const btnNavToErrorBank = document.getElementById('btn-nav-to-error-bank');
    if (btnNavToErrorBank) btnNavToErrorBank.addEventListener('click', () => switchTab('weaknesses'));

    const errorLessonInput = document.getElementById('error-lesson-input');
    if (errorLessonInput) {
        errorLessonInput.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }

    const errorTypeInput = document.getElementById('error-type-input');
    if (errorTypeInput) {
        errorTypeInput.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
}

function isErrorNeedsReview(err) {
    if (err.status === 'new') return true;
    if (err.status === 'reviewed') {
        if (!err.lastReviewedAt) return true;
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - err.lastReviewedAt > sevenDays) return true;
        if (err.lastRepeatedAt && err.lastRepeatedAt > err.lastReviewedAt) return true;
    }
    return false;
}

function triggerSmartReview() {
    currentErrorFilterSubject = 'all';
    currentErrorFilterStatus = 'needs_review';
    currentErrorSearch = '';
    const searchInput = document.getElementById('error-search');
    if (searchInput) searchInput.value = '';
    errorRenderLimit = 20;
    renderErrorBank();
    showToast('تم تفعيل المراجعة الذكية. ركز على هذه الأخطاء!', 'info');
}

function addError(e) {
    e.preventDefault();
    const subjectInput = document.getElementById('new-error-subject');
    const severityInput = document.getElementById('new-error-severity');
    const textInput = document.getElementById('new-error-text');
    const typeInput = document.getElementById('new-error-type');
    const lessonInput = document.getElementById('new-error-lesson');

    if (!subjectInput || !textInput) return;

    const subjectName = subjectInput.value.trim();
    const text = textInput.value.trim();
    
    if (!subjectName || !text) return;

    const newError = {
        id: Date.now(),
        subjectName: subjectName,
        text: text,
        lessonLearned: lessonInput ? lessonInput.value.trim() : '',
        type: typeInput ? typeInput.value : 'other',
        severity: severityInput ? severityInput.value : 'medium',
        status: 'new',
        repetitionCount: 0,
        reviewCount: 0,
        dateAdded: new Date().toLocaleDateString('ar-EG'),
        lastReviewedAt: null,
        lastRepeatedAt: null,
        masteredAt: null
    };

    state.errorBank.errors.unshift(newError);
    saveState();

    subjectInput.value = '';
    textInput.value = '';
    if (lessonInput) lessonInput.value = '';
    if (typeInput) typeInput.value = 'other';
    if (severityInput) severityInput.value = 'medium';

    currentErrorFilterSubject = 'all';
    currentErrorFilterStatus = 'all';
    errorRenderLimit = 20;
    renderErrorBank();
    showToast('تم تسجيل الخطأ بنجاح. المواجهة هي أول خطوة للنصر!', 'success');
}

function openErrorDetail(id) {
    const err = state.errorBank.errors.find(e => e.id === id);
    if (!err) return;

    currentActiveErrorId = id;

    const elSubject = document.getElementById('detail-error-subject');
    const elStatus = document.getElementById('detail-error-status');
    const elDate = document.getElementById('detail-error-date');
    const elText = document.getElementById('detail-error-text');
    const elType = document.getElementById('detail-error-type');
    const elSeverity = document.getElementById('detail-error-severity');
    const elRepetition = document.getElementById('detail-error-repetition');
    const elLastReview = document.getElementById('detail-error-last-review');
    const elLesson = document.getElementById('detail-error-lesson');

    if (elSubject) elSubject.innerText = err.subjectName;
    if (elDate) elDate.innerText = err.dateAdded;
    if (elText) elText.innerText = err.text;
    if (elRepetition) elRepetition.innerText = err.repetitionCount;
    if (elLesson) elLesson.innerText = err.lessonLearned || 'لم يتم كتابة درس مستفاد بعد.';

    if (elStatus) {
        if (err.status === 'new') {
            elStatus.innerText = 'جديد';
            elStatus.className = 'text-[10px] font-bold px-2 py-1 rounded-md border text-rose-400 border-rose-500/30 bg-rose-500/10';
        } else if (err.status === 'reviewed') {
            elStatus.innerText = 'تمت المراجعة';
            elStatus.className = 'text-[10px] font-bold px-2 py-1 rounded-md border text-blue-400 border-blue-500/30 bg-blue-500/10';
        } else {
            elStatus.innerText = 'مُتقن';
            elStatus.className = 'text-[10px] font-bold px-2 py-1 rounded-md border text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
        }
    }

    if (elType) {
        const typeMap = { 'conceptual': 'مفاهيمي', 'calculation': 'حسابي', 'careless': 'قلة تركيز', 'other': 'أخرى' };
        elType.innerText = typeMap[err.type] || 'أخرى';
    }

    if (elSeverity) {
        const sevMap = { 'low': 'بسيطة', 'medium': 'متوسطة', 'high': 'حرجة 🔥' };
        elSeverity.innerText = sevMap[err.severity] || 'متوسطة';
    }

    if (elLastReview) {
        if (err.lastReviewedAt) {
            elLastReview.innerText = new Date(err.lastReviewedAt).toLocaleDateString('ar-EG');
        } else {
            elLastReview.innerText = 'لم يراجع';
        }
    }

    const btnMaster = document.getElementById('btn-error-action-master');
    if (btnMaster) {
        if (err.status === 'reviewed' && err.lessonLearned.trim() !== '') {
            btnMaster.classList.remove('hidden');
            btnMaster.classList.add('flex');
        } else {
            btnMaster.classList.add('hidden');
            btnMaster.classList.remove('flex');
        }
    }

    const modal = document.getElementById('modal-error-detail');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('modal-overlay-enter');
            const content = modal.firstElementChild;
            if (content) {
                content.classList.remove('opacity-0', 'scale-95');
                content.classList.add('modal-animate-enter');
            }
        }, 10);
    }
}

function closeErrorDetail() {
    const modal = document.getElementById('modal-error-detail');
    if (!modal) return;
    modal.classList.remove('modal-overlay-enter');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        currentActiveErrorId = null;
    }, 300);
}

function repeatError() {
    if (!currentActiveErrorId) return;
    const err = state.errorBank.errors.find(e => e.id === currentActiveErrorId);
    if (!err) return;

    const localSnapshot = saveSnapshot();
    err.repetitionCount++;
    err.lastRepeatedAt = Date.now();

    if (err.status === 'mastered') {
        err.status = 'reviewed';
    }

    saveState();
    renderErrorBank();
    openErrorDetail(currentActiveErrorId);
    showToast('تم تسجيل التكرار. لا بأس، الاستمرارية هي الحل!', 'info', true, localSnapshot);
}

function openErrorReview() {
    if (!currentActiveErrorId) return;
    const err = state.errorBank.errors.find(e => e.id === currentActiveErrorId);
    if (!err) return;

    const typeInput = document.getElementById('error-type-input');
    const lessonInput = document.getElementById('error-lesson-input');

    if (typeInput) typeInput.value = err.type;
    if (lessonInput) lessonInput.value = err.lessonLearned;

    const modal = document.getElementById('modal-error-review');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('modal-overlay-enter');
            const content = modal.firstElementChild;
            if (content) {
                content.classList.remove('opacity-0', 'scale-95');
                content.classList.add('modal-animate-enter');
            }
        }, 10);
    }
}

function closeErrorReview() {
    const modal = document.getElementById('modal-error-review');
    if (!modal) return;
    modal.classList.remove('modal-overlay-enter');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }, 300);
}

function submitErrorReview(e) {
    e.preventDefault();
    if (!currentActiveErrorId) return;
    const err = state.errorBank.errors.find(e => e.id === currentActiveErrorId);
    if (!err) return;

    const typeInput = document.getElementById('error-type-input');
    const lessonInput = document.getElementById('error-lesson-input');

    if (!lessonInput || lessonInput.value.trim() === '') {
        showToast('يجب كتابة الدرس المستفاد!', 'info');
        return;
    }

    const localSnapshot = saveSnapshot();

    if (typeInput) err.type = typeInput.value;
    err.lessonLearned = lessonInput.value.trim();
    err.reviewCount++;
    err.lastReviewedAt = Date.now();

    if (err.status === 'new') {
        err.status = 'reviewed';
    }

    const finalXp = Math.floor(20 * getBoostMultiplier('xp'));
    const finalCoins = Math.floor(10 * getBoostMultiplier('coin'));
    state.xp += finalXp;
    state.coins += finalCoins;

    saveState();
    renderErrorBank();
    closeErrorReview();
    openErrorDetail(currentActiveErrorId);
    playSound('pop');
    showToast(`تمت المراجعة بنجاح! +${finalXp} XP`, 'success', true, localSnapshot);
}

function masterError() {
    if (!currentActiveErrorId) return;
    const err = state.errorBank.errors.find(e => e.id === currentActiveErrorId);
    if (!err) return;

    if (err.status !== 'reviewed' || err.lessonLearned.trim() === '') {
        showToast('يجب مراجعة الخطأ وكتابة الدرس المستفاد أولاً.', 'info');
        return;
    }

    const localSnapshot = saveSnapshot();

    err.status = 'mastered';
    err.masteredAt = Date.now();

    const finalXp = Math.floor(50 * getBoostMultiplier('xp'));
    const finalCoins = Math.floor(20 * getBoostMultiplier('coin'));
    state.xp += finalXp;
    state.coins += finalCoins;

    saveState();
    renderErrorBank();
    openErrorDetail(currentActiveErrorId);
    playSound('reward');
    showToast(`عمل رائع! لقد أتقنت هذا الخطأ. +${finalXp} XP`, 'success', true, localSnapshot);
}

function deleteError() {
    if (!currentActiveErrorId) return;
    if (!confirm('هل أنت متأكد من حذف هذا الخطأ نهائياً؟')) return;

    const localSnapshot = saveSnapshot();
    state.errorBank.errors = state.errorBank.errors.filter(e => e.id !== currentActiveErrorId);
    
    saveState();
    renderErrorBank();
    closeErrorDetail();
    showToast('تم حذف الخطأ بنجاح.', 'info', true, localSnapshot);
}

function renderErrorBank() {
    const totalEl = document.getElementById('error-bank-total');
    if (totalEl) totalEl.innerText = state.errorBank.errors.length;

    // Extract unique subjects
    const subjects = [...new Set(state.errorBank.errors.map(e => e.subjectName))].filter(Boolean);
    const subjectFiltersContainer = document.getElementById('error-subject-filters');
    if (subjectFiltersContainer) {
        let pillsHtml = `<button onclick="currentErrorFilterSubject='all'; errorRenderLimit=20; renderErrorBank();" class="error-filter-pill px-4 py-2 min-h-[44px] rounded-xl text-sm font-bold border transition-all ${currentErrorFilterSubject === 'all' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}">الكل</button>`;
        subjects.forEach(sub => {
            const isSel = currentErrorFilterSubject === sub;
            pillsHtml += `<button onclick="currentErrorFilterSubject='${escapeHTML(sub)}'; errorRenderLimit=20; renderErrorBank();" class="error-filter-pill px-4 py-2 min-h-[44px] rounded-xl text-sm font-bold border transition-all ${isSel ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}">${escapeHTML(sub)}</button>`;
        });
        subjectFiltersContainer.innerHTML = pillsHtml;
    }

    // Status Filters
    const statusFiltersContainer = document.getElementById('error-status-filters');
    if (statusFiltersContainer) {
        const statuses = [
            { id: 'all', label: 'الكل' },
            { id: 'needs_review', label: 'تحتاج مراجعة' },
            { id: 'new', label: 'جديد' },
            { id: 'reviewed', label: 'تمت المراجعة' },
            { id: 'mastered', label: 'مُتقن' },
            { id: 'repeated', label: 'متكرر' }
        ];
        let statusHtml = '';
        statuses.forEach(st => {
            const isSel = currentErrorFilterStatus === st.id;
            statusHtml += `<button onclick="currentErrorFilterStatus='${st.id}'; errorRenderLimit=20; renderErrorBank();" class="error-filter-pill px-4 py-2 min-h-[44px] rounded-xl text-sm font-bold border transition-all ${isSel ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}">${st.label}</button>`;
        });
        statusFiltersContainer.innerHTML = statusHtml;
    }

    // Filter Errors
    let filtered = state.errorBank.errors.filter(err => {
        if (currentErrorFilterSubject !== 'all' && err.subjectName !== currentErrorFilterSubject) return false;
        
        if (currentErrorFilterStatus === 'new' && err.status !== 'new') return false;
        if (currentErrorFilterStatus === 'reviewed' && err.status !== 'reviewed') return false;
        if (currentErrorFilterStatus === 'mastered' && err.status !== 'mastered') return false;
        if (currentErrorFilterStatus === 'repeated' && err.repetitionCount === 0) return false;
        if (currentErrorFilterStatus === 'needs_review' && !isErrorNeedsReview(err)) return false;

        if (currentErrorSearch) {
            const searchLower = currentErrorSearch.toLowerCase();
            const textMatch = err.text.toLowerCase().includes(searchLower);
            const lessonMatch = err.lessonLearned.toLowerCase().includes(searchLower);
            if (!textMatch && !lessonMatch) return false;
        }

        return true;
    });

    // Sort: Needs review first, then newest
    filtered.sort((a, b) => {
        const aNeeds = isErrorNeedsReview(a);
        const bNeeds = isErrorNeedsReview(b);
        if (aNeeds && !bNeeds) return -1;
        if (!aNeeds && bNeeds) return 1;
        return b.id - a.id;
    });

    const listContainer = document.getElementById('error-list-container');
    const emptyState = document.getElementById('error-empty-state');
    const noResults = document.getElementById('error-no-results');
    const loadMoreBtn = document.getElementById('error-load-more');

    if (!listContainer) return;

    if (state.errorBank.errors.length === 0) {
        listContainer.innerHTML = '';
        if (emptyState) { emptyState.classList.remove('hidden'); emptyState.classList.add('block'); }
        if (noResults) { noResults.classList.add('hidden'); noResults.classList.remove('block'); }
        if (loadMoreBtn) { loadMoreBtn.classList.add('hidden'); loadMoreBtn.classList.remove('inline-block'); }
        return;
    } else {
        if (emptyState) { emptyState.classList.add('hidden'); emptyState.classList.remove('block'); }
    }

    if (filtered.length === 0) {
        listContainer.innerHTML = '';
        if (noResults) { noResults.classList.remove('hidden'); noResults.classList.add('block'); }
        if (loadMoreBtn) { loadMoreBtn.classList.add('hidden'); loadMoreBtn.classList.remove('inline-block'); }
        return;
    } else {
        if (noResults) { noResults.classList.add('hidden'); noResults.classList.remove('block'); }
    }

    const toRender = filtered.slice(0, errorRenderLimit);
    
    listContainer.innerHTML = toRender.map(err => {
        let statusBadge = '';
        if (err.status === 'new') statusBadge = '<span class="text-[10px] font-bold px-2 py-1 rounded-md border text-rose-400 border-rose-500/30 bg-rose-500/10">جديد</span>';
        else if (err.status === 'reviewed') statusBadge = '<span class="text-[10px] font-bold px-2 py-1 rounded-md border text-blue-400 border-blue-500/30 bg-blue-500/10">مراجعة</span>';
        else statusBadge = '<span class="text-[10px] font-bold px-2 py-1 rounded-md border text-emerald-400 border-emerald-500/30 bg-emerald-500/10">مُتقن</span>';

        return `
        <div onclick="openErrorDetail(${err.id})" class="error-card-compact glass-panel rounded-2xl p-4 min-h-[44px] border border-white/10 hover:bg-white/[0.02] transition-all cursor-pointer btn-press error-severity-${err.severity}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2 flex-1 min-w-0 pr-2">
                    <span class="text-[10px] font-bold px-2 py-1 rounded-md bg-white/10 text-white/70 shrink-0">${escapeHTML(err.subjectName)}</span>
                    <h4 class="text-sm font-bold text-white line-clamp-1">${escapeHTML(err.text)}</h4>
                </div>
                <div class="shrink-0 ml-2">
                    ${statusBadge}
                </div>
            </div>
            <div class="flex justify-between items-center mt-3">
                <span class="text-[10px] text-white/40">${err.dateAdded}</span>
                ${err.repetitionCount > 0 ? `<span class="text-[10px] font-bold text-orange-400 flex items-center gap-1"><i data-lucide="rotate-cw" class="w-3 h-3"></i> تكرر ${err.repetitionCount}</span>` : ''}
            </div>
        </div>`;
    }).join('');

    lucide.createIcons({ root: listContainer });

    if (loadMoreBtn) {
        if (filtered.length > errorRenderLimit) {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.classList.add('inline-block');
        } else {
            loadMoreBtn.classList.add('hidden');
            loadMoreBtn.classList.remove('inline-block');
        }
    }
}

function calculateErrorAnalytics() {
    const errors = state.errorBank.errors;
    const total = errors.length;
    
    let mastered = 0;
    let reviewed = 0;
    let newCount = 0;
    let repeated = 0;
    let needsReview = 0;
    
    let typeDist = { 'conceptual': 0, 'calculation': 0, 'careless': 0, 'other': 0 };
    let subjectDist = {};

    errors.forEach(err => {
        if (err.status === 'mastered') mastered++;
        else if (err.status === 'reviewed') reviewed++;
        else newCount++;

        if (err.repetitionCount > 0) repeated++;
        if (isErrorNeedsReview(err)) needsReview++;

        if (typeDist[err.type] !== undefined) typeDist[err.type]++;
        else typeDist['other']++;

        subjectDist[err.subjectName] = (subjectDist[err.subjectName] || 0) + 1;
    });

    const masteryPercentage = total > 0 ? Math.round((mastered / total) * 100) : 0;

    let sortedSubjects = Object.keys(subjectDist).map(name => ({
        name,
        count: subjectDist[name],
        percent: Math.round((subjectDist[name] / total) * 100)
    })).sort((a, b) => b.count - a.count);

    return {
        total, mastered, reviewed, newCount, repeated, needsReview, masteryPercentage,
        typeDist, subjectDist: sortedSubjects
    };
}

function renderErrorAnalytics() {
    const stats = calculateErrorAnalytics();

    const setTxt = (id, txt) => { const el = document.getElementById(id); if(el) el.innerText = txt; };
    
    setTxt('stat-errors-total', stats.total);
    setTxt('stat-errors-review', stats.needsReview);
    setTxt('stat-errors-repeated', stats.repeated);
    setTxt('stat-errors-mastered', stats.mastered);
    setTxt('stat-errors-mastery', `(${stats.masteryPercentage}%)`);

    const typeDistContainer = document.getElementById('stat-errors-type-distribution');
    if (typeDistContainer) {
        if (stats.total === 0) {
            typeDistContainer.innerHTML = `<p class="text-xs text-white/40 text-center py-2">لا توجد بيانات</p>`;
        } else {
            const types = [
                { key: 'conceptual', label: 'مفاهيمي', color: 'bg-purple-500' },
                { key: 'calculation', label: 'حسابي', color: 'bg-blue-500' },
                { key: 'careless', label: 'قلة تركيز', color: 'bg-orange-500' },
                { key: 'other', label: 'أخرى', color: 'bg-slate-500' }
            ];
            typeDistContainer.innerHTML = types.map(t => {
                const count = stats.typeDist[t.key];
                const percent = Math.round((count / stats.total) * 100);
                if (count === 0) return '';
                return `
                <div class="mb-2">
                    <div class="flex justify-between text-[10px] font-bold mb-1 text-white/70">
                        <span>${t.label}</span>
                        <span>${percent}%</span>
                    </div>
                    <div class="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <div class="h-full ${t.color} stat-bar-fill" style="width: ${percent}%"></div>
                    </div>
                </div>`;
            }).join('');
        }
    }

    const subDistContainer = document.getElementById('stat-errors-subject-distribution');
    if (subDistContainer) {
        if (stats.subjectDist.length === 0) {
            subDistContainer.innerHTML = `<p class="text-xs text-white/40 text-center py-2">لا توجد بيانات</p>`;
        } else {
            const topSubjects = stats.subjectDist.slice(0, 4);
            subDistContainer.innerHTML = topSubjects.map((s, i) => {
                const colors = ['bg-rose-500', 'bg-pink-500', 'bg-fuchsia-500', 'bg-purple-500'];
                return `
                <div class="mb-2">
                    <div class="flex justify-between text-[10px] font-bold mb-1 text-white/70">
                        <span class="truncate pr-2">${escapeHTML(s.name)}</span>
                        <span>${s.percent}%</span>
                    </div>
                    <div class="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <div class="h-full ${colors[i%colors.length]} stat-bar-fill" style="width: ${s.percent}%"></div>
                    </div>
                </div>`;
            }).join('');
        }
    }

    const insightsContainer = document.getElementById('stat-errors-insights');
    if (insightsContainer) {
        let insightsHtml = '';
        if (stats.total === 0) {
            insightsHtml = `<p class="text-xs text-white/50">ابدأ بتسجيل أخطائك للحصول على تحليلات ذكية.</p>`;
        } else {
            if (stats.needsReview > 0) {
                insightsHtml += `<p class="text-xs text-white/80 mb-2"><span class="text-rose-400 font-bold">•</span> لديك ${stats.needsReview} أخطاء تحتاج إلى مراجعة لتثبيت المعلومة.</p>`;
            }
            if (stats.masteryPercentage >= 50) {
                insightsHtml += `<p class="text-xs text-white/80 mb-2"><span class="text-emerald-400 font-bold">•</span> أداء ممتاز! لقد أتقنت ${stats.masteryPercentage}% من الأخطاء المسجلة.</p>`;
            }
            if (stats.repeated > 0) {
                insightsHtml += `<p class="text-xs text-white/80 mb-2"><span class="text-orange-400 font-bold">•</span> يوجد ${stats.repeated} أخطاء متكررة. حاول التركيز على أسبابها الجذرية.</p>`;
            }
            
            let maxType = 'other';
            let maxCount = 0;
            for (const [key, val] of Object.entries(stats.typeDist)) {
                if (val > maxCount && key !== 'other') { maxCount = val; maxType = key; }
            }
            if (maxCount > 0 && (maxCount / stats.total) > 0.4) {
                const typeMap = { 'conceptual': 'المفاهيمية', 'calculation': 'الحسابية', 'careless': 'قلة التركيز' };
                insightsHtml += `<p class="text-xs text-white/80 mb-2"><span class="text-blue-400 font-bold">•</span> نسبة كبيرة من أخطائك تعود إلى الأخطاء ${typeMap[maxType]}.</p>`;
            }
            
            if (!insightsHtml) {
                insightsHtml = `<p class="text-xs text-white/50">استمر في تسجيل ومراجعة الأخطاء لبناء قاعدة بيانات قوية.</p>`;
            }
        }
        insightsContainer.innerHTML = insightsHtml;
    }
}

window.onload = () => {
    let popupDelay = 0;
    const splashScreen = document.getElementById('splash-screen');
    
    const focusInsights = document.getElementById('smart-insights-container');
    if (focusInsights && focusInsights.parentElement) focusInsights.parentElement.remove();
    
    if (splashScreen) {
        const headerSpans = document.querySelectorAll('header span');
        headerSpans.forEach(span => {
            if (span.textContent.trim().toLowerCase() === 'rodo') {
                span.innerHTML = '<img src="assets/images/logo.webp" alt="Rodo" width="32" height="32" class="h-7 sm:h-8 w-auto inline-block object-contain">';
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
    applyTheme();
    updateGlobalUI(); 
    updateQuote();
    initStoreBoostInterval();
    initErrorBank();
    
    if (Object.values(state.productivity).reduce((a, b) => a + b, 0) === 0) {
        const today = new Date().getDay();
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        for(let i=0; i<=today; i++) { if (Math.random() > 0.3) state.productivity[days[i]] = Math.floor(Math.random() * 100) + 20; }
        saveState();
    }

    switchTab('dashboard');
    selectedScheduleDay = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][new Date().getDay()];

    const categoryBtns = document.querySelectorAll('.store-category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => {
                b.classList.remove('active', 'bg-yellow-500/20', 'text-yellow-400', 'border-yellow-500/30');
                b.classList.add('bg-white/5', 'text-white/50', 'border-white/5');
            });
            const target = e.currentTarget;
            target.classList.remove('bg-white/5', 'text-white/50', 'border-white/5');
            target.classList.add('active', 'bg-yellow-500/20', 'text-yellow-400', 'border-yellow-500/30');
            currentStoreCategory = target.dataset.category;
            renderStoreGrid();
        });
    });

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
    renderRecentSessions();
};
