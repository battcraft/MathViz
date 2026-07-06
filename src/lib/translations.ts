import { Language } from "../types";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav & Common UI
    appName: "MathsGuru AI",
    tabHome: "Home",
    tabLearn: "Learn",
    tabQuiz: "Panga (Quiz)",
    tabStory: "Story (Kahani)",
    navHome: "Home 🏠",
    navLearn: "Syllabus 📚",
    navQuiz: "Panga Quiz ⚔️",
    navStory: "Stories 📖",
    navVideos: "Video Hub 🎬",
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
    pangaHintBtn: "Hint de do Maths Dost (Get Hint)",
    pangaCorrect: "Bilkul Sahi! Perfect!",
    pangaWrong: "Arre re! Wrong option. Hint dekh lo!",
    pangaResultTitle: "Panga Results",
    pangaResultWisdom: "Maths Dost: Math isn't about memorizing, it's about seeing structures and patterns!",
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
    chatTitle: "Maths Dost ki Chaupal 💬",
    chatSubtitle: "Maths Dost ke saath: Socho, samjho, aur solve karo!",
    chatPromptPlaceholder: "Type your math doubt here for your Maths Dost...",
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
    photoDesc: "Upcoming feature: Snap a photo of your notebook & get step-by-step Hinglish tips!",
    
    // Footer & Header
    tagline: "CBSE Math Made Fun",
    hinglishClasses: "Hinglish Classes 6-8",
    poweredBy: "Powered by street-smart Hinglish pedagogy",
    difficultyDesc: "Adjust explanations for your class:",
    nextRank: "Next rank",
    streakDays: "Days",
    screensDone: "Screens done",
    
    // Quiz & Drills
    quizQuestions: "5 Questions",
    launchQuiz: "Launch 5-Question Challenge ⚔️",
    drillCount: "5",
    
    // Learn View extras
    markComplete: "I'm Done ✓",
    selectDifficulty: "Choose your level",
    chooseTopic: "Choose a topic",
    chooseSubtopic: "Choose a subtopic",
    startVideo: "Start Video",
    reviewCards: "Review Cards",
    startConcepts: "Start Concepts",
    startPractice: "Start Practice",
    startStory: "Start Kahani",
    startQuiz: "Start Quiz",
    claimMastery: "Claim Mastery Badge!",
    mastered: "✓ Mastered",
    claimSeal: "Claim Seal",
    replayQuiz: "Replay Quiz",
    replayStory: "Replay Kahani"
  },
  hi: {
    // Nav & Common UI
    appName: "MathsGuru AI",
    tabHome: "Home",
    tabLearn: "Learn",
    tabQuiz: "Panga (Quiz)",
    tabStory: "Story (Kahani)",
    navHome: "होम 🏠",
    navLearn: "पाठ्यक्रम 📚",
    navQuiz: "पंगा क्विज़ ⚔️",
    navStory: "कहानियां 📖",
    navVideos: "वीडियो हब 🎬",
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
    pangaHintBtn: "Hint de do Maths Dost (Get Hint)",
    pangaCorrect: "Bilkul Sahi! Gazab!",
    pangaWrong: "Arey re! Galat jawaab. Ek baar Hint dekh ke try karo!",
    pangaResultTitle: "Panga Results",
    pangaResultWisdom: "Maths Dost: Math ratne ki cheez nahi hai, asali dosti toh patterns samajhne mein hai!",
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
    chatTitle: "Maths Dost ki Chaupal 💬",
    chatSubtitle: "Maths Dost ke saath: Socho, samjho, aur solve karo!",
    chatPromptPlaceholder: "Math ka koi bhi doubt poochho Maths Dost se...",
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
    photoDesc: "Aane wala feature: Notebook ka photo khicho aur Hinglish mein step-by-step solution pao!",
    
    // Footer & Header
    tagline: "CBSE Maths Ab Hogi Fun",
    hinglishClasses: "Hinglish Classes 6-8",
    poweredBy: "Street-smart Hinglish pedagogy se powered",
    difficultyDesc: "Apni class ke hisaab se explanations set karo:",
    
    // Streak & Progress
    streakDays: "Din",
    nextRank: "Agla rank",
    screensDone: "Screens ho gaye",
    
    // Quiz & Drills
    quizQuestions: "5 Sawal",
    launchQuiz: "5 Sawal Ka Panga Lo ⚔️",
    drillCount: "5",
    
    // Learn View extras
    markComplete: "Ho Gaya! ✓",
    selectDifficulty: "Apna level chuno",
    chooseTopic: "Topic chuno",
    chooseSubtopic: "Subtopic chuno",
    startVideo: "Video Shuru Karo",
    reviewCards: "Cards Dekho",
    startConcepts: "Concepts Shuru Karo",
    startPractice: "Practice Shuru Karo",
    startStory: "Kahani Shuru Karo",
    startQuiz: "Quiz Shuru Karo",
    claimMastery: "Mastery Badge Lo!",
    mastered: "✓ Seekh Liya",
    claimSeal: "Seal Lo",
    replayQuiz: "Quiz Dobara",
    replayStory: "Kahani Dobara"
  }
};
