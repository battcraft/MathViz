import { Language } from "../types";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav & Common UI
    appName: "MathsGuru AI",
    tabHome: "Home",
    tabLearn: "Learn",
    tabQuiz: "Panga (Quiz)",
    tabStory: "Story (Kahani)",
    streak: "Streak",
    xpCoins: "XP Coins",
    screensCompleted: "Screens Done",
    levelBeg: "Beginner (Class 6)",
    levelInt: "Intermediate (Class 7)",
    levelExp: "Expert (Class 8)",
    difficultyLabel: "Difficulty Room",
    welcomeTitle: "Namaste, Math Hero! 👋",
    startDrillCta: "Start Practice Drill",
    badgesTitle: "Your Achievement Badges",
    badgesSubtitle: "Cross tasks to unlock badges",
    dailyRiddleTitle: "Daily Street Riddle 🧩",
    dailyRiddleSubtitle: "Solve for +20 XP",
    riddleSuccess: "Wah! Absolutely Correct! +20 XP added.",
    riddleFail: "Oops! Try again. Dimaag ki dahi mat karo, simple logic hai!",
    submitBtn: "Submit Answer",
    riddleBtn: "Solve Riddle",
    quickAccessTitle: "Quick Track",
    quickAccessLearn: "📚 Browse Lessons",
    quickAccessStory: "📖 Hear Stories",
    
    // Ranks
    rank0: "Nimbu Scholar 🍋",
    rank1: "Learner 🟢",
    rank2: "Scholar 🔵",
    rank3: "MathsGuru 🏆",
    
    // Auth & UI Account
    signInGoogle: "Sign in with Google",
    signOut: "Sign Out",
    guestMode: "Guest Mode (Offline)",
    welcomeUser: "Welcome,",
    statsSynced: "Stats synced with Cloud!",
    saveOffline: "Data saved in browser localStorage",
    
    // Mascot Messages
    mascot_0: "Samosa without potato is like Math without logic! Let's warm up that brain!",
    mascot_1: "Oye Hoye! You've logged in with the confidence of solving infinite equations! Let's go!",
    mascot_2: "Ready for some mathematical action? Chandni Chowk and local markets run on quick calculations!",
    mascot_3: "Math is everywhere, buddy! From IPL boundary calculations to railway tracks!",
    
    // Learn View
    selectTopicPrompt: "Pick a Topic to Start",
    selectSubtopicPrompt: "Pick a Subtopic",
    screensProgress: "Screens Visited",
    markAsDone: "Mark as Complete (+5 XP)",
    screenCompletedTag: "✓ COMPLETED",
    viewedTag: "👁 VIEWED",
    unviewedTag: "NOT VIEWED",
    nextBtn: "Next",
    prevBtn: "Previous",
    backToTopics: "← Back to Topics",
    backToSubtopics: "← Back to Subtopics",
    voiceActive: "Voice input active! Say 'agla' (next), 'pichla' (prev), or 'ho gaya' (done)",
    voiceInactive: "Tap mic to activate hands-free voice nav",
    
    // Video Player
    playVideo: "Watch Video Lesson",
    videoPlaying: "▶ PLAYING",
    videoEnded: "Video completed! Screen complete! +5 XP",

    // Quiz View
    pangaIntroTitle: "Math Quiz (Panga)",
    pangaIntroDesc: "Take 5 random math questions. Earn +10 XP for each correct answer!",
    pangaStartBtn: "Take the Panga! ⚔️",
    pangaHintBtn: "Hint de do Bhaiya (Get Hint)",
    pangaCorrect: "Bilkul Sahi! Perfect!",
    pangaWrong: "Arre re! Wrong option. Hint dekh lo!",
    pangaResultTitle: "Panga Results",
    pangaResultWisdom: "MathsGuru wisdom: Math isn't about memorizing, it's about seeing patterns!",
    pangaButtonNew: "Get New Quiz Questions",
    pangaBackHome: "Back to Home Base",
    
    // Story View
    storyIntroTitle: "Math Stories (Kahani)",
    storyIntroDesc: "Explore math via street adventures in Delhi. Make correct choices for +15 XP each!",
    storyStartBtn: "Listen to Kahani 📖",
    storyDobaraBtn: "Listen Again",
    storyNextChoice: "Click option to move ahead...",
    storyFinished: "Story Finished! Excellent!",
    storyFullScore: "Sabash! Absolute Master of the Delhi Bazaar Stories!",
    storyOkScore: "Not bad! Listen again to get perfect score!",

    // Chat Chowpal
    chatTitle: "Bhaiya ka Chaupal (Math AI Tutor) 💬",
    chatSubtitle: "Chat with MathsGuru Bhaiya instantly",
    chatPromptPlaceholder: "Type your math doubt here Bhaiya...",
    chatSendBtn: "Puchho!",
    chatQ1: "What is Bindu/Point?",
    chatQ2: "What is the difference between Rekha (Line) & Segment?",
    chatQ3: "How is negative number compared?",
    chatQ4: "What does Range mean in real life?",
    chatQ5: "Suggest a trick to round off numbers quickly.",
    chatQ6: "How does Place Value protect our money?",
    chatQ7: "Why do parallel lines never clash?",
    chatQ8: "How does IPL use Max/Min values?",
    
    // Photo ask
    photoTitle: "Photo Ask (Math Snap) 📸",
    photoDesc: "Upcoming feature: Snap a photo of your notebook & get step-by-step Hinglish tips!"
  },
  hi: {
    // Nav & Common UI
    appName: "MathsGuru AI",
    tabHome: "Home",
    tabLearn: "Learn",
    tabQuiz: "Panga (Quiz)",
    tabStory: "Story (Kahani)",
    streak: "Streak",
    xpCoins: "XP Coins",
    screensCompleted: "Screens Done",
    levelBeg: "Beginner (Class 6)",
    levelInt: "Intermediate (Class 7)",
    levelExp: "Expert (Class 8)",
    difficultyLabel: "Difficulty Room",
    welcomeTitle: "Namaste, Math Hero! 👋",
    startDrillCta: "Start Practice Drill",
    badgesTitle: "Your Achievement Badges",
    badgesSubtitle: "Task pure karo aur badges unlock karo",
    dailyRiddleTitle: "Daily Street Riddle 🧩",
    dailyRiddleSubtitle: "+20 XP ke liye solve karo!",
    riddleSuccess: "Wah! Bilkul sahi jawaab! +20 XP mile.",
    riddleFail: "Oops! Phir se try karo. Dimaag ki dahi mat karo, simple logic hai!",
    submitBtn: "Jawaab Submit Karo",
    riddleBtn: "Riddle Solve Karo",
    quickAccessTitle: "Quick Track",
    quickAccessLearn: "📚 Lessons Dekho",
    quickAccessStory: "📖 Kahaniyaan Suno",
    
    // Ranks
    rank0: "Nimbu Scholar 🍋",
    rank1: "Learner 🟢",
    rank2: "Scholar 🔵",
    rank3: "MathsGuru 🏆",
    
    // Auth & UI Account
    signInGoogle: "Google se Sign In",
    signOut: "Sign Out",
    guestMode: "Guest Mode (Offline)",
    welcomeUser: "Swagat hai,",
    statsSynced: "Stats Cloud se sync ho gaye hain!",
    saveOffline: "Data browser ke LocalStorage mein save ho gaya",
    
    // Mascot Messages
    mascot_0: "Samosa bina aalu aur math bina logic... dono hi bekaar hain! Dimaag ki khidki kholo!",
    mascot_1: "Oye Hoye! Aaj toh tum bilkul infinite equations solve karne wale swagg ke sath aaye ho!",
    mascot_2: "Chalo math ka thoda panga lelein! Delhi bazaar calculations ho ya math, dimaag fast hona chahiye!",
    mascot_3: "Arey pyare, geometry har jagah hai! Chandni chowk ki galiyon se lekar IPL stadium boundaries tak!",
    
    // Learn View
    selectTopicPrompt: "Sikhne ke liye ek Topic chuno",
    selectSubtopicPrompt: "Ek Subtopic chuno",
    screensProgress: "Screens Dekhe",
    markAsDone: "Complete ho gaya! (+5 XP)",
    screenCompletedTag: "✓ COMPLETE",
    viewedTag: "👁 DEKHA HUA",
    unviewedTag: "NAHI DEKHA",
    nextBtn: "Agla",
    prevBtn: "Pichla",
    backToTopics: "← Topics pe wapas chalo",
    backToSubtopics: "← Subtopics pe wapas chalo",
    voiceActive: "Voice input chalu hai! Bolo 'agla' (next), 'pichla' (prev), ya 'ho gaya' (done)",
    voiceInactive: "Hands-free navigation ke liye mic dabo",
    
    // Video Player
    playVideo: "Video Lesson Dekho",
    videoPlaying: "▶ PLAYING",
    videoEnded: "Video complete! Screen done! +5 XP mile",

    // Quiz View
    pangaIntroTitle: "Math Quiz (Panga)",
    pangaIntroDesc: "5 random math questions poochhenge. Sahi jawaab pe milenge +10 XP!",
    pangaStartBtn: "Panga Shuru Karo! ⚔️",
    pangaHintBtn: "Hint de do Bhaiya (Get Hint)",
    pangaCorrect: "Bilkul Sahi! Gazab!",
    pangaWrong: "Arey re! Galat jawaab. Ek baar Hint dekh ke try karo!",
    pangaResultTitle: "Panga Results",
    pangaResultWisdom: "MathsGuru says: Math ratne ki cheez nahi hai, patterns samajhne ki cheez hai!",
    pangaButtonNew: "Naye Questions Se Panga Lo",
    pangaBackHome: "Wapas Home pe chalo",
    
    // Story View
    storyIntroTitle: "Math Stories (Kahani)",
    storyIntroDesc: "Bazaar ke dukaandar aur street adventures se seekho math! Sahi option pe +15 XP!",
    storyStartBtn: "Kahani Suno 📖",
    storyDobaraBtn: "Dobara Suno",
    storyNextChoice: "Aage badhne ke liye sahi option chuno...",
    storyFinished: "Kahani Khatam! Maza aaya!",
    storyFullScore: "Sabash! Tum toh Chandni Chowk ke sabse bade Math Master nikle!",
    storyOkScore: "Achha prayas! Perfect score ke liye dobara try karo!",

    // Chat Chowpal
    chatTitle: "Bhaiya ka Chaupal (Math Chat Tutor) 💬",
    chatSubtitle: "MathsGuru Bhaiya se turant sawaal poocho",
    chatPromptPlaceholder: "Math ka koi bhi doubt poochho Bhaiya se...",
    chatSendBtn: "Puchho!",
    chatQ1: "What is Bindu/Point?",
    chatQ2: "What is the difference between Rekha (Line) & Segment?",
    chatQ3: "How is negative number compared?",
    chatQ4: "What does Range mean in real life?",
    chatQ5: "Suggest a trick to round off numbers quickly.",
    chatQ6: "How does Place Value protect our money?",
    chatQ7: "Why do parallel lines never clash?",
    chatQ8: "How does IPL use Max/Min values?",
    
    // Photo ask
    photoTitle: "Photo Ask (Math Snap) 📸",
    photoDesc: "Aane wala feature: Notebook ka photo khicho aur Hinglish mein step-by-step solution pao!"
  },
  "simple-hi": {
    // Nav & Common UI
    appName: "MathsGuru",
    tabHome: "Home Screen",
    tabLearn: "Study Room",
    tabQuiz: "Quiz",
    tabStory: "Story Time",
    streak: "Streak days",
    xpCoins: "Coins (XP)",
    screensCompleted: "Completed Sheets",
    levelBeg: "Beginner Level (Class 6)",
    levelInt: "Intermediate Level (Class 7)",
    levelExp: "Expert Level (Class 8)",
    difficultyLabel: "Class / Level Select",
    welcomeTitle: "Hi Math Hero! 👋",
    startDrillCta: "Start Easy Practice",
    badgesTitle: "Badges List",
    badgesSubtitle: "Easy steps complete karke badge unlock karo",
    dailyRiddleTitle: "Daily Quiz Riddle 🧩",
    dailyRiddleSubtitle: "Easy 20 XP ke liye solve karo!",
    riddleSuccess: "Good job! Correct answer! +20 XP.",
    riddleFail: "No proxy! Try easy numbers. Mind block mat karo, simple logic hai!",
    submitBtn: "Answer check karo",
    riddleBtn: "Riddle and Match",
    quickAccessTitle: "Quick Entry",
    quickAccessLearn: "📚 Open Lessons",
    quickAccessStory: "📖 Open Story",
    
    // Ranks
    rank0: "Nimbu Scholar 🍋",
    rank1: "Learner 🟢",
    rank2: "Scholar 🔵",
    rank3: "MathsGuru 🏆",
    
    // Auth & UI Account
    signInGoogle: "Google sign-in link",
    signOut: "Log Out",
    guestMode: "Guest Only (Offline)",
    welcomeUser: "Welcome user,",
    statsSynced: "All cloud sync operations done!",
    saveOffline: "Offline browser storage update done",
    
    // Mascot Messages
    mascot_0: "Samosa bina aalu is like math without steps. Easy concept se dimaag kholo!",
    mascot_1: "Hey champion, full volume swagg ke sath infinite math problems clear karo!",
    mascot_2: "Bazaar game ho ya score analysis, quick numbers match calculations easy rakho!",
    mascot_3: "Look around friend! Parallel boundary lines are everywhere - in streets and IPL courts!",
    
    // Learn View
    selectTopicPrompt: "Please choose one Topic to start learning",
    selectSubtopicPrompt: "Please choose a Subtopic",
    screensProgress: "Completed pages",
    markAsDone: "Finished sheet! (+5 XP)",
    screenCompletedTag: "✓ COMPLETE",
    viewedTag: "👁 REVIEWED",
    unviewedTag: "CLEARED",
    nextBtn: "Go Next",
    prevBtn: "Go Back",
    backToTopics: "← Go to Topics Menu",
    backToSubtopics: "← Go to Subtopics Menu",
    voiceActive: "Voice support active! Say 'agla'/'pichla'/'ho gaya'",
    voiceInactive: "Click mic for hands-free study mode",
    
    // Video Player
    playVideo: "Watch Easy Tutorial",
    videoPlaying: "▶ PLAYING VIDEO",
    videoEnded: "Video finished! Sheet done! +5 XP added",

    // Quiz View
    pangaIntroTitle: "Math Quiz",
    pangaIntroDesc: "5 instant simple questions. Get +10 XP on every correct match!",
    pangaStartBtn: "Start Quiz! ⚔️",
    pangaHintBtn: "Show Bhaiya's Hint",
    pangaCorrect: "Congratulations! Correct!",
    pangaWrong: "Incorrect options. Get hint and try again!",
    pangaResultTitle: "Quiz ScoresCard",
    pangaResultWisdom: "Bhaiya says: Try making groups of 10s to calculate any shopping bill!",
    pangaButtonNew: "Give me new questions",
    pangaBackHome: "Go back to Home dashboard",
    
    // Story View
    storyIntroTitle: "Math Storybook",
    storyIntroDesc: "See how Delhi street shopping runs on clean Math logic! Earn +15 XP!",
    storyStartBtn: "Read Kahani 📖",
    storyDobaraBtn: "Read story again",
    storyNextChoice: "Click choice option to continue story...",
    storyFinished: "Storybook ended! Well done!",
    storyFullScore: "Wow! You are indeed the King of Delhi Market Math!",
    storyOkScore: "Nice attempt! Read again to secure full marks!",

    // Chat Chowpal
    chatTitle: "AI Math Helper Bhaiya 💬",
    chatSubtitle: "Chat with helper tutor for instant explanations",
    chatPromptPlaceholder: "Type question for Bhaiya helper...",
    chatSendBtn: "Ask now",
    chatQ1: "What is Bindu/Point?",
    chatQ2: "What is the difference between Rekha (Line) & Segment?",
    chatQ3: "How is negative number compared?",
    chatQ4: "What does Range mean in real life?",
    chatQ5: "Suggest a trick to round off numbers quickly.",
    chatQ6: "How does Place Value protect our money?",
    chatQ7: "Why do parallel lines never clash?",
    chatQ8: "How does IPL use Max/Min values?",
    
    // Photo ask
    photoTitle: "Camera math snap 📸",
    photoDesc: "Upcoming features: Click notebook paper sum picture and get easy guide pointers!"
  }
};
