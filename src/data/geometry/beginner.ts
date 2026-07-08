/**
 * Geometry — Beginner Level (Class 6)
 *
 * Foundation content based on client's geometry material.
 * Covers: Point (Bindu), Line (Rekha), Segment (Khand), Ray (Kiran), Vertex (Shikhar)
 * Each concept includes Think Box questions, Activities, and Teacher Tips.
 *
 * Content style: Simple Hinglish with street-smart analogies (samosa, cricket, metro).
 */

import { LevelTopicContent } from "./types";

export const geometryBeginner: LevelTopicContent = {
  topicId: "geom",
  topicName: "📐 Geometry: Rekha & Bindu",
  level: "beginner",
  classLevel: "Class 6",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // BINDU (POINT)
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_bindu",
      name: "💡 Bindu (Point)",
      screens: [
        {
          id: "bindu_1_what",
          title: "💡 Bindu: Zero-Dimensional Coordinate Anchor",
          conceptHeading: "What is a Bindu (Point)?",
          explanation:
            "Doston, Bindu (Point) ek aisi digital shakti hai jiska na koi length (lambai) hai, na width (chodai), aur na height (unchai)! Yeh strictly zero-dimensional (0D) hota hai. Hum isey uppercase letters jaise A, B, C se represent karte hain. Geometry ka har formula ek single bindu se hi shuru hota hai!",
          interactiveType: "point_hunt",
          pangaHint: "Screen pe click karke Point dhoondho aur usey Capital label do!",
          thinkBox: [
            {
              id: "bindu_tb1",
              question: "Pencil ka tip ek Bindu hai ya Rekha? Sochke batao! ✏️",
              answer:
                "Pencil ka tip ek Bindu hai! Kyunki tip bilkul chhota hai — na lambai hai, na chodai. Sirf ek precise location hai!",
              hint: "Kya tip ki koi measurement ho sakti hai?",
            },
            {
              id: "bindu_tb2",
              question: "Agar ek bindu A(2, 3) hai, toh x-coordinate kya batata hai?",
              answer:
                "X-coordinate (2) batata hai kitna right jaana hai origin se. Y-coordinate (3) batata hai kitna upar jaana hai!",
              hint: "X = left/right, Y = up/down",
            },
          ],
        },
        {
          id: "bindu_2_naming",
          title: "💡 Upper Case Labels: A, B, C Naming Rules",
          conceptHeading: "Point Naming Standards",
          explanation:
            "In math databases, we label points using CAPITAL letters (like A, B, or P). Avoid lowercase letters for labeling coordinate positions. This keeps your notebook and drawings elegant like a pro!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "bindu_tb3",
              question: "Kya hum point ko 'a' se label kar sakte hain? 🤔",
              answer:
                "Nahi! Math mein hamesha UPPERCASE letters use karte hain — A, B, P, Q. Lowercase (a, b, p, q) reserved hain alag cheezon ke liye!",
              hint: "Capital vs lowercase ka fark yaad karo.",
            },
          ],
        },
        {
          id: "bindu_3_real",
          title: "💡 Real-life Bindus: Shop Pins & Metro Stations",
          conceptHeading: "Physical Points Walk!",
          explanation:
            "Look at any digital map. A single shop, a metro terminal station, or the tip of a pencil on paper represents a physical Point in daily math.",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "bindu_tb4",
              question: "Apne room mein 5 bindu dhundho! Pencil ka tip, door knob, window ka corner... 🏠",
              answer:
                "Pencil ka tip, door knob, window ka corner, mirror ka edge, fan ka hook — yeh sab bindu hain! Geometry toh sabke saath hai, bas nazariya chahiye!",
              hint: "Chhoti jagah dhundho jahan koi cheez exactly milti hai.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "bindu_act1",
          title: "Bindu Hunt in the Classroom",
          description: "Classroom mein jaao aur 10 bindu dhundho!",
          materials: ["Pencil", "Notebook", "Ruler"],
          steps: [
            "Notebook kholo aur 'Bindu Hunt' heading likho.",
            "Classroom mein ghumo aur har jagah ke 3 bindu dhundho.",
            "Har bindu ke paas ek chhota dot banao aur uska naam likho (A, B, C...).",
            "Sabke coordinates bhi likho (x, y) agar blackboard pe grid hai.",
          ],
          outcome:
            "Student samajhega ki bindu har jagah hai — har tip, har corner, har intersection point!",
        },
        {
          id: "bindu_act2",
          title: "Dot Painting with Bindus",
          description: "Bindus se ek picture banao!",
          materials: ["Chart paper", "Colored sketch pens", "Sticker dots"],
          steps: [
            "Chart paper pe grid banao (boxes ya lines).",
            "Har box ke center pe ek colored dot lagao — yeh bindu hain!",
            "Dots ko connect karke ek picture banao (house, tree, etc.).",
            "Har dot ka coordinate label karo.",
          ],
          outcome:
            "Student dekhega ki ek picture sirf bindus se ban sakti hai!",
        },
      ],
      teacherTips: [
        {
          id: "bindu_tt1",
          tip: "Real objects se shuru karo — pencil tip, chalk tip, compass point. Bindu ko tangible banao!",
          context: "Introduction mein, jab student ko pehli baar point dikhana ho.",
        },
        {
          id: "bindu_tt2",
          tip: "Grid paper pe coordinates sikhao — (2,3) ka matlab samjhao: 2 units right, 3 units up.",
          context: "Jab student ko coordinate basics sikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "bindu_w1",
          question: "Neeche diye gaye points mein se kaunsa point (3, 4) hai?",
          options: ["(3, 4)", "(4, 3)", "(3, 3)", "(4, 4)"],
          correct: 0,
          hint: "Pehla number x (right), doosra number y (up).",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "bindu_w2",
          question: "Point A aur Point B se kitni lines guzar sakti hain?",
          options: ["Sirf 1", "Sirf 2", "3", "Infinite"],
          correct: 3,
          hint: "Do points se kitni straight lines ban sakti hain?",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "bindu_w3",
          question: "Ek point ki dimensions kitni hoti hain?",
          options: ["0", "1", "2", "3"],
          correct: 0,
          hint: "Bindu na lambi hai, na chaudi, na unchi!",
          part: "B",
          partDescription: "True/False — Concept Understanding",
        },
        {
          id: "bindu_w4",
          question: "Pencil ke tip ko point (0, 0) mana jaaye. Agar woh 2cm right aur 3cm upar move kare toh naya point kya hoga? Coordinates likho.",
          correct: "(2, 3)",
          hint: "Right = x positive, Up = y positive",
          part: "C",
          partDescription: "Short Answer — Application",
        },
        {
          id: "bindu_w5",
          question: "Apne classroom mein 5 bindu dhundho aur unke names likho (A, B, C, D, E).",
          correct: "Student-apna-answer",
          hint: "Corners, tips, intersections — sab bindu hain!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // REKHA (LINE)
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_rekha",
      name: "💡 Rekha (Line)",
      screens: [
        {
          id: "rekha_1_what",
          title: "💡 Infinite Stretches: Train Tracks & Metros",
          conceptHeading: "What is a Rekha (Line)?",
          explanation:
            "A line (Rekha) is a direct collinear set of infinitely many dots stretching endlessly in BOTH directions! It doesn't stop or bend, and has no endpoints. Railway tracks ki sidhi lines dekhi hain na? Woh infinite rails ki tarah dono taraf bina khatam huye jaati hain!",
          interactiveType: "line_touch",
          pangaHint: "Touch to extend the line infinitely!",
          thinkBox: [
            {
              id: "rekha_tb1",
              question: "Rekha ke kitne endpoints hain? 🤔",
              answer:
                "Rekha ke KOI endpoints nahi hain! Woh dono taraf infinitely jaati hai — isliye hum arrow (<--->) lagate hain dono taraf!",
              hint: "Endpoint matlab jahan line ruk jaaye. Kya rekha kabhi rukti hai?",
            },
            {
              id: "rekha_tb2",
              question: "Kya do parallel rekha kabhi milti hain? 🛤️",
              answer:
                "Nahi! Parallel rekha hamesha same distance pe rehti hain aur kabhi nahi milti — chahe kitni bhi lambi ho!",
              hint: "Metro tracks ka example yaad karo.",
            },
          ],
        },
        {
          id: "rekha_2_notation",
          title: "💡 Arrow Representation Rules",
          conceptHeading: "Line Notations",
          explanation:
            "To show that a line stretches infinitely without stopping, we draw arrows on both ends: <--->. This separates a line from a segment or ray.",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "rekha_tb3",
              question: "Line AB ko kaise likhte hain math mein? ✍️",
              answer:
                "AB with a two-headed arrow on top: AB̄↔. Iska matlab hai line A se B tak aur dono taraf infinite hai!",
              hint: "Arrow dono taraf hona chahiye.",
            },
          ],
        },
        {
          id: "rekha_3_parallel",
          title: "💡 Parallel Tracks: Unintersecting Rails",
          conceptHeading: "Parallel Lines Concept",
          explanation:
            "When two lines run beside each other with a constant, uniform distance and never touch, we call them Parallel Lines. Delhi Metro's tracks are perfect parallels!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "rekha_tb4",
              question: "Cricket pitch ki boundary lines parallel hain ya intersecting? 🏏",
              answer:
                "Cricket pitch ki opposite boundary lines PARALLEL hain! Woh hamesha same distance pe rehti hain aur kabhi nahi milti!",
              hint: "Kya boundary lines kabhi milti hain?",
            },
          ],
        },
      ],
      activities: [
        {
          id: "rekha_act1",
          title: "String Line Activity",
          description: "Thread se lines banao aur dekho kitni lambi ho sakti hain!",
          materials: ["Thread/wool", "Scissors", "Tape", "Chalk"],
          steps: [
            "Floor pe chalk se 2 points (A aur B) banao.",
            "Thread ko A pe tape karo aur B tak le jao — yeh segment hai!",
            "Ab thread ko dono taraf extend karo — jab tak ho sake!",
            "Samjho: Line segment FIXED hai, lekin line INFINITE hai!",
          ],
          outcome:
            "Student samajhega ki line aur segment mein kya fark hai!",
        },
        {
          id: "rekha_act2",
          title: "Parallel Line Drawing Challenge",
          description: "Ruler aur compass se parallel lines banao!",
          materials: ["Ruler", "Compass", "Pencil", "Paper"],
          steps: [
            "Paper pe ek straight line banao (line L).",
            "Compass se line L ke 3 points pe same distance pe marks lagao.",
            "Marks ko connect karo — yeh parallel line hai!",
            "Verify: kya dono lines kabhi milti hain?",
          ],
          outcome:
            "Student seekhega ki parallel lines banane ka ek systematic tarika hai!",
        },
      ],
      teacherTips: [
        {
          id: "rekha_tt1",
          tip: "Physical objects se samjhao — railway track, ruler edges, road lines. Rekha = infinite = kabhi khatam nahi hoti!",
          context: "Introduction mein, jab student ko line ka concept samjhana ho.",
        },
        {
          id: "rekha_tt2",
          tip: "Line, Segment, aur Ray ka comparison chart banao — visual aid bahut helpful hai!",
          context: "Jab teenon concepts ek saath compare karna ho.",
        },
      ],
      worksheet: [
        {
          id: "rekha_w1",
          question: "Rekha (Line) ke kitne endpoints hain?",
          options: ["0", "1", "2", "Infinite"],
          correct: 0,
          hint: "Line kabhi nahi rukti — isliye koi endpoint nahi!",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "rekha_w2",
          question: "Kya do parallel lines kabhi milti hain?",
          options: ["Haan", "Nahi", "Kabhi kabhi", "Sirf raat ko"],
          correct: 1,
          hint: "Parallel = constant distance, no intersection.",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "rekha_w3",
          question: "Line AB ko mathematical notation mein kaise likhte hain?",
          correct: "AB with two-headed arrow on top",
          hint: "Arrow dono taraf hona chahiye.",
          part: "B",
          partDescription: "Short Answer — Notation Check",
        },
        {
          id: "rekha_w4",
          question: "Apne classroom mein 3 parallel lines dhundho aur unke names likho.",
          correct: "Student-apna-answer",
          hint: "Desk edges, window frames, book edges!",
          part: "C",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // KHAND (SEGMENT)
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_khand",
      name: "💡 Khand (Segment)",
      screens: [
        {
          id: "khand_1_what",
          title: "💡 Fixed Frontiers: Line Segment (Khand)",
          conceptHeading: "What is Line Segment (Khand)?",
          explanation:
            "Unlike an infinite Line, a Segment (Khand) has exactly TWO fixed endpoints! You can measure it perfectly using a plastic ruler. It has a specific, fixed length.",
          interactiveType: "line_touch",
          pangaHint: "Touch both endpoints to form the segment!",
          thinkBox: [
            {
              id: "khand_tb1",
              question: "Samosa ki ek side uthao — yeh segment hai ya line? 🍛",
              answer:
                "Yeh SEGMENT hai! Kyunki samosa ki side ki FIXED length hai — ruler se naap sakte ho. Line kabhi khatam nahi hoti, lekin segment ki ek defined length hai!",
              hint: "Kya samosa ki side infinite hai?",
            },
            {
              id: "khand_tb2",
              question: "Cricket pitch 22 gaj lambi hai — yeh segment hai ya ray? 🏏",
              answer:
                "Yeh SEGMENT hai! 22 gaj = fixed length. Ray mein ek end fixed hota hai aur doosra infinite hota hai. Pitch ke dono ends fixed hain!",
              hint: "Pitch ke dono taraf kya hai?",
            },
          ],
        },
        {
          id: "khand_2_notation",
          title: "💡 Notation Rules: Overbars in Math Class",
          conceptHeading: "Segment Notation",
          explanation:
            "We denote a segment with an overbar (e.g., AB with a line over it). It means the specific path connecting points A and B directly, with no extensions.",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "khand_tb3",
              question: "AB̄ (overbar) aur AB (arrow) mein kya fark hai? ✍️",
              answer:
                "AB̄ = Segment (fixed length, dono endpoints). AB with arrow = Line (infinite, no endpoints). Notation se samajh aata hai!",
              hint: "Overbar = fixed, Arrow = infinite.",
            },
          ],
        },
        {
          id: "khand_3_addition",
          title: "💡 Segment Addition Postulates",
          conceptHeading: "Adding Lengths Up",
          explanation:
            "If point C lies on segment AB, then length AC + BC is equal to the total segment length AB! Use this simple math to solve road maps and split bills.",
          interactiveType: "range_slider",
          thinkBox: [
            {
              id: "khand_tb4",
              question: "Agar AB = 10cm hai aur C beech mein hai, AC = 6cm toh BC kitna hoga?",
              answer:
                "BC = AB - AC = 10 - 6 = 4cm! Segment Addition Postulate: AC + BC = AB. Simple hai!",
              hint: "Total = Part 1 + Part 2",
            },
          ],
        },
      ],
      activities: [
        {
          id: "khand_act1",
          title: "Ruler Measurement Challenge",
          description: "Apne room mein segments dhundho aur naap lo!",
          materials: ["Ruler", "Notebook", "Pencil"],
          steps: [
            "Notebook pe 'Segment Measurement' heading likho.",
            "Room mein 5 cheezein dhundho jinki length naap sako — book, pencil, duster, etc.",
            "Har cheez ki length ruler se measure karo aur likho.",
            "Sabse lamba aur sabse chhota segment identify karo!",
          ],
          outcome:
            "Student seekhega ki segment ki FIXED length hoti hai jo ruler se naap sakte hain!",
        },
        {
          id: "khand_act2",
          title: "Segment Addition Puzzle",
          description: "Points ko line pe arrange karo aur lengths add karo!",
          materials: ["Paper", "Pencil", "Ruler"],
          steps: [
            "Paper pe ek 15cm ki line banao (line AB).",
            "Line pe point C banao jahan 6cm ho A se.",
            "AC naap lo (should be 6cm) aur BC naap lo (should be 9cm).",
            "Verify: AC + BC = 6 + 9 = 15cm = AB!",
          ],
          outcome:
            "Student dekhega ki segments add hoke poora length dete hain!",
        },
      ],
      teacherTips: [
        {
          id: "khand_tt1",
          tip: "Ruler se live demo karo — segment ki length measure karo aur dikhao ki yeh FIXED hai!",
          context: "Introduction mein, jab student ko segment ka concept samjhana ho.",
        },
        {
          id: "khand_tt2",
          tip: "Segment Addition ko real-life se jodo — 'Ghar se school 5km, school se park 2km, toh ghar se park 7km!'",
          context: "Jab segment addition sikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "khand_w1",
          question: "Line Segment (Khand) ke kitne endpoints hote hain?",
          options: ["0", "1", "2", "Infinite"],
          correct: 2,
          hint: "Segment ke dono taraf FIXED points hain!",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "khand_w2",
          question: "AB = 12cm hai. C beech mein hai. AC = 7cm. BC kitna hai?",
          options: ["5cm", "7cm", "12cm", "19cm"],
          correct: 0,
          hint: "BC = AB - AC = 12 - 7",
          part: "A",
          partDescription: "Multiple Choice — Application",
        },
        {
          id: "khand_w3",
          question: "Kya segment ki length change ho sakti hai?",
          options: ["Haan", "Nahi", "Sirf garmi mein", "Depends on ruler"],
          correct: 1,
          hint: "Segment ki length FIXED hoti hai!",
          part: "B",
          partDescription: "True/False — Concept Check",
        },
        {
          id: "khand_w4",
          question: "Apne pencil ki length measure karo aur likho. Yeh segment hai kyun?",
          correct: "Student-apna-answer",
          hint: "Pencil ki do ends fixed hain!",
          part: "C",
          partDescription: "Measurement Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // KIRAN (RAY)
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_kiran",
      name: "💡 Kiran (Ray)",
      screens: [
        {
          id: "kiran_1_what",
          title: "💡 Shooting Rays: Sunbeams & Laser Beams",
          conceptHeading: "What is a Kiran (Ray)?",
          explanation:
            "A Kiran (Ray) is a mixed concept! It has exactly ONE fixed starting origin point, but stretches endlessly in the other direction without stopping.",
          interactiveType: "line_touch",
          pangaHint: "Click the origin point and drag to extend the ray!",
          thinkBox: [
            {
              id: "kiran_tb1",
              question: "Torch jalao — roshni kahan se aati hai aur kahan jaati hai? 🔦",
              answer:
                "Torch bulb = ORIGIN POINT (fixed). Roshni seedhi jaati hai aur kabhi nahi rukti = INFINITE DIRECTION. Yeh ek perfect RAY hai!",
              hint: "Origin = fixed, Direction = infinite.",
            },
            {
              id: "kiran_tb2",
              question: "Ray AB aur Ray BA same hain? 🤔",
              answer:
                "Nahi! Ray AB ka origin A hai aur infinite direction B ki taraf hai. Ray BA ka origin B hai aur infinite direction A ki taraf hai. Origin badal diya toh ray badal gayi!",
              hint: "Origin point matter karta hai!",
            },
          ],
        },
        {
          id: "kiran_2_notation",
          title: "💡 One-Directional Arrow Notation",
          conceptHeading: "Ray Notation Rules",
          explanation:
            "In textbooks, we write rays as AB with an arrow pointing right. This indicates it starts at origin A and shoots endlessly through coordinate point B.",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "kiran_tb3",
              question: "Ray ki notation mein arrow kis taraf hota hai?",
              answer:
                "Arrow HAMESHA infinite direction ki taraf hota hai! Origin point se arrow nahi nikalta — arrow us direction mein hai jahan ray badhti hai!",
              hint: "Origin = no arrow, Direction = arrow.",
            },
          ],
        },
        {
          id: "kiran_3_real",
          title: "💡 Flashlights and Star Light Voyages",
          conceptHeading: "Rays in Daily Life",
          explanation:
            "A flashlight bulb is the raw origin point. When you turn it on, light shoots out in a straight ray into the endless street, behaving just like a Ray in geometry!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "kiran_tb4",
              question: "Diya jalao — diya ka flame origin hai ya destination? 🪔",
              answer:
                "Flame = ORIGIN POINT (fixed position). Light beams spread out in straight rays — infinite direction! Diya ek point se roshni deta hai!",
              hint: "Flame = origin, Light = infinite direction.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "kiran_act1",
          title: "Shadow Ray Tracing",
          description: "Torch se rays trace karo!",
          materials: ["Torch/flashlight", "Paper", "Pencil", "Dark room (optional)"],
          steps: [
            "Paper pe ek dot banao (point A) — yeh origin hai.",
            "Torch ko point A pe rakho aur ek direction mein light karo.",
            "Pencil se light ki line trace karo — arrow lagao jahan light ja rahi hai!",
            "Ab torch ko alag angle mein ghumao aur naya ray banao!",
          ],
          outcome:
            "Student dekhega ki ray ek origin se start hota hai aur ek direction mein infinite hai!",
        },
        {
          id: "kiran_act2",
          title: "Ray vs Line vs Segment Sorting",
          description: "Diagrams banao aur sort karo!",
          materials: ["Paper", "Pencil", "Ruler"],
          steps: [
            "Paper pe 3 diagrams banao: Line, Segment, Ray.",
            "Har diagram ke neeche uska naam likho.",
            "Arrows / endpoints / overbar correctly lagao.",
            "Teacher ko dikhao aur explain karo!",
          ],
          outcome:
            "Student teenon concepts clearly distinguish kar payega!",
        },
      ],
      teacherTips: [
        {
          id: "kiran_tt1",
          tip: "Torch ya laser pointer se live demo karo — ray ka concept visual hai!",
          context: "Introduction mein, jab student ko ray ka concept samjhana ho.",
        },
        {
          id: "kiran_tt2",
          tip: "Ray AB aur Ray BA ka comparison zaroor karao — origin point change hona samjhana important hai!",
          context: "Jab student ko ray notation sikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "kiran_w1",
          question: "Kiran (Ray) ke kitne endpoints hote hain?",
          options: ["0", "1", "2", "3"],
          correct: 1,
          hint: "Ray mein ek origin fixed hota hai!",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "kiran_w2",
          question: "Ray AB aur Ray BA same hain?",
          options: ["Haan", "Nahi", "Kabhi kabhi", "Depends on angle"],
          correct: 1,
          hint: "Origin point different hai!",
          part: "A",
          partDescription: "Multiple Choice — Concept Check",
        },
        {
          id: "kiran_w3",
          question: "Torch ki roshni ek ___ hai. Fill in the blank.",
          correct: "Ray",
          hint: "Ek origin, infinite direction!",
          part: "B",
          partDescription: "Fill in the Blank",
        },
        {
          id: "kiran_w4",
          question: "Apne ghar mein 3 rays dhundho (diya, torch, etc.) aur unke origins identify karo.",
          correct: "Student-apna-answer",
          hint: "Origin = jahan se light start hoti hai!",
          part: "C",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // SHIKHAR (VERTEX)
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_shikhar",
      name: "💡 Shikhar (Vertex)",
      screens: [
        {
          id: "shikhar_1_what",
          title: "💡 Pointy Corners: Shikhar (Vertex)",
          conceptHeading: "What is a Vertex (Shikhar)?",
          explanation:
            "A Vertex (Shikhar) is the sharp corner point where two or more lines, segments, or rays meet. A samosa has 3 pointy vertices; a kite has 4!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "shikhar_tb1",
              question: "Samosa ke kitne corners hain? Yeh sab vertices hain? 🍛",
              answer:
                "Samosa ke 3 corners (vertices) hain! Har corner ek SHIKHAR hai jahan do sides milti hain!",
              hint: "Samosa ka shape yaad karo — triangle!",
            },
            {
              id: "shikhar_tb2",
              question: "TV screen ke corners kitne hain? Rectangle ke vertices count karo! 📺",
              answer:
                "TV screen = Rectangle = 4 vertices! Har corner ek vertex hai — top-left, top-right, bottom-left, bottom-right!",
              hint: "Rectangle ke 4 corners hote hain.",
            },
          ],
        },
        {
          id: "shikhar_2_shapes",
          title: "💡 Vertices of Triangles and Boxes",
          conceptHeading: "Vertices Listing and Bounds",
          explanation:
            "When multiple vertices are present, we call them 'vertices'. A triangle has vertices A, B, and C. A quadrilateral adds vertex D to form a closed shape.",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "shikhar_tb3",
              question: "Triangle ke vertices kaunse hain? ✏️",
              answer:
                "Triangle ke 3 vertices hain: A, B, aur C! Har vertex do sides ko connect karta hai!",
              hint: "Triangle = 3 sides, 3 vertices.",
            },
            {
              id: "shikhar_tb4",
              question: "Circle mein vertices hote hain? 🤔",
              answer:
                "Nahi! Circle mein koi sharp corner nahi hai — sab smooth hai. Isliye circle ke koi vertices nahi hote!",
              hint: "Vertices = sharp corners. Circle mein koi corner nahi!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "shikhar_act1",
          title: "Shape Vertex Count",
          description: "Alag-alag shapes ke vertices count karo!",
          materials: ["Paper", "Pencil", "Ruler", "Colored markers"],
          steps: [
            "Paper pe triangle, rectangle, pentagon, aur hexagon banao.",
            "Har shape ke corners pe colored dots lagao (vertices).",
            "Har shape ke vertices count karo aur table banao.",
            "Pattern dhundho: triangle=3, rectangle=4, pentagon=5, hexagon=6!",
          ],
          outcome:
            "Student dekhega ki vertices count shape ki sides ke equal hota hai!",
        },
        {
          id: "shikhar_act2",
          title: "Real-world Vertex Hunt",
          description: "Ghar mein vertices dhundho!",
          materials: ["Notebook", "Pencil"],
          steps: [
            "Ghar ke andar jaao aur 10 sharp corners dhundho.",
            "Har corner ka naam likho (table corner, door frame, window, etc.).",
            "Har vertex ka type batao — 2 lines milti hain ya 3?",
            "Count karo: kitne vertices milne!",
          ],
          outcome:
            "Student samajhega ki vertices har jagah hain — furniture, doors, windows!",
        },
      ],
      teacherTips: [
        {
          id: "shikhar_tt1",
          tip: "Physical shapes se samjhao — triangle cutout, rectangle cutout. Corner points ko finger se touch karao!",
          context: "Introduction mein, jab student ko vertex ka concept samjhana ho.",
        },
        {
          id: "shikhar_tt2",
          tip: "Circle ke vertices nahi hain — yeh important distinction hai. Smooth curve vs sharp corner!",
          context: "Jab student shapes compare kar rahe ho.",
        },
      ],
      worksheet: [
        {
          id: "shikhar_w1",
          question: "Triangle ke kitne vertices hote hain?",
          options: ["2", "3", "4", "6"],
          correct: 1,
          hint: "Triangle = 3 sides = 3 corners!",
          part: "A",
          partDescription: "Multiple Choice — Basic Concept Check",
        },
        {
          id: "shikhar_w2",
          question: "Circle ke vertices hote hain?",
          options: ["Haan, 1", "Haan, infinite", "Nahi", "Depends on size"],
          correct: 2,
          hint: "Circle mein koi sharp corner nahi!",
          part: "A",
          partDescription: "Multiple Choice — Concept Check",
        },
        {
          id: "shikhar_w3",
          question: "Rectangle ke vertices count karo aur likho.",
          correct: "4",
          hint: "Har corner = 1 vertex",
          part: "B",
          partDescription: "Short Answer — Application",
        },
        {
          id: "shikhar_w4",
          question: "Apne classroom mein 5 vertices dhundho aur unhe draw karo.",
          correct: "Student-apna-answer",
          hint: "Table corners, door frame, window corners!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },
  ],
};
