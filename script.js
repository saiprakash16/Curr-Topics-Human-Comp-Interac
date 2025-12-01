// 10 lessons with 1 quick-check question each
const lessons = [
    {
      id: 1,
      title: "Lesson 1: Strong Passwords",
      text: "Use long, unique passwords with a mix of letters, numbers, and symbols. Avoid reusing passwords across different sites.",
      question: "Which password is safest?",
      options: ["password123", "R@nd0m_Str0ng#Pass", "qwerty"],
      correctIndex: 1,
    },
    {
      id: 2,
      title: "Lesson 2: Phishing Emails",
      text: "Phishing emails try to trick you into clicking links or giving personal data. Always check the sender and be careful with urgent messages.",
      question: "A common sign of phishing is:",
      options: [
        "A calm, normal tone",
        "An urgent request for personal details",
        "No links in the email",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      title: "Lesson 3: HTTPS & Secure Websites",
      text: "Always look for HTTPS and a lock icon in the browser before entering sensitive data. This means the connection is encrypted.",
      question: "Which is safer for entering card details?",
      options: ["http://shop.com", "https://shop.com", "Just the app name"],
      correctIndex: 1,
    },
    {
      id: 4,
      title: "Lesson 4: OTP & Two-Factor Codes",
      text: "Never share OTP or two-factor codes with anyone, even if they claim to be from the bank or support. Legitimate staff never ask for it.",
      question: "You should share your OTP with:",
      options: ["Bank staff on phone", "Family member", "No one"],
      correctIndex: 2,
    },
    {
      id: 5,
      title: "Lesson 5: Public Wi-Fi Risks",
      text: "Avoid logging into banking or shopping accounts on public Wi-Fi. If needed, use a trusted VPN.",
      question: "Which is safest for banking?",
      options: ["Public café Wi-Fi", "Secure home network", "Any open Wi-Fi"],
      correctIndex: 1,
    },
    {
      id: 6,
      title: "Lesson 6: Fake Shopping Websites",
      text: "Scam sites may copy logos but have strange URLs, poor grammar, or unrealistic discounts. Always double-check the address.",
      question: "Which is most suspicious?",
      options: [
        "Known site with normal prices",
        "New site with 95% off everything",
        "Bank's official website",
      ],
      correctIndex: 1,
    },
    {
      id: 7,
      title: "Lesson 7: Safe Online Payments",
      text: "Use trusted payment gateways or virtual cards when possible. Avoid direct bank transfers to unknown sellers.",
      question: "Safer payment method is:",
      options: ["Random bank transfer", "Trusted payment gateway", "Sending cash"],
      correctIndex: 1,
    },
    {
      id: 8,
      title: "Lesson 8: Device Security",
      text: "Keep your phone and laptop updated. Use screen locks and avoid installing unknown apps that ask for many permissions.",
      question: "Which is a good practice?",
      options: [
        "Ignoring updates",
        "Locking your device with PIN or biometrics",
        "Installing any free app",
      ],
      correctIndex: 1,
    },
    {
      id: 9,
      title: "Lesson 9: Recognizing Fraud Alerts",
      text: "If you get a message about suspicious activity, don’t click links directly. Instead, go to the official app or website yourself.",
      question: "Best response to a suspicious SMS:",
      options: [
        "Click the link in SMS",
        "Delete your bank app",
        "Open the bank app directly and check",
      ],
      correctIndex: 2,
    },
    {
      id: 10,
      title: "Lesson 10: Reviewing Statements",
      text: "Regularly check your bank and card statements for unknown charges and report them quickly.",
      question: "What should you do with unknown charges?",
      options: [
        "Ignore them",
        "Wait a few months",
        "Report to bank immediately",
      ],
      correctIndex: 2,
    },
  ];
  
  let completedLessons = new Set();
  
  // Utility: update progress text on Home + Lessons
  function updateProgressText() {
    const completedCount = completedLessons.size;
    const total = lessons.length;
    const text = `${completedCount} of ${total} lessons completed`;
  
    const progressEl = document.getElementById("progressText");
    const homeProgress = document.getElementById("homeProgressText");
  
    if (progressEl) progressEl.textContent = text;
    if (homeProgress) homeProgress.textContent = text;
  }
  
  // Show only one section
  function showSection(id) {
    document.querySelectorAll(".section").forEach((sec) => {
      sec.classList.remove("active");
    });
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }
  
  // Render lesson cards
  function renderLessons() {
    const grid = document.getElementById("lessonsGrid");
    grid.innerHTML = "";
  
    lessons.forEach((lesson, index) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.textContent = lesson.title;
      card.dataset.index = index;
  
      if (completedLessons.has(lesson.id)) {
        card.classList.add("completed");
      }
  
      card.addEventListener("click", () => openLesson(index));
      grid.appendChild(card);
    });
  
    updateProgressText();
  }
  
  // Open a lesson view + quiz
  function openLesson(index) {
    const lesson = lessons[index];
    if (!lesson) return;
  
    // Mark as completed
    completedLessons.add(lesson.id);
    renderLessons(); // update card colors & progress
  
    // Fill lesson content
    document.getElementById("lessonTitle").textContent = lesson.title;
    document.getElementById("lessonText").textContent = lesson.text;
  
    // Build quiz
    const quizArea = document.getElementById("quizArea");
    quizArea.innerHTML = "";
  
    const qDiv = document.createElement("div");
    qDiv.className = "question";
    qDiv.textContent = lesson.question;
  
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
  
    lesson.options.forEach((opt, i) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quizOption";
      input.value = i;
      label.appendChild(input);
      label.append(" " + opt);
      optionsDiv.appendChild(label);
    });
  
    const btn = document.createElement("button");
    btn.textContent = "Check Answer";
    btn.className = "quiz-btn";
    btn.addEventListener("click", () => checkAnswer(lesson));
  
    quizArea.appendChild(qDiv);
    quizArea.appendChild(optionsDiv);
    quizArea.appendChild(btn);
  
    // Clear feedback
    document.getElementById("quizFeedback").textContent = "";
  
    // Show lesson view
    showSection("lesson-view");
  }
  
  // Check quiz answer
  function checkAnswer(lesson) {
    const selected = document.querySelector("input[name='quizOption']:checked");
    const feedback = document.getElementById("quizFeedback");
  
    if (!selected) {
      feedback.textContent = "Please select an option.";
      feedback.style.color = "#facc15";
      return;
    }
  
    const value = parseInt(selected.value, 10);
  
    if (value === lesson.correctIndex) {
      feedback.textContent = "Excellent! You chose the correct answer.";
      feedback.style.color = "#4ade80";
    } else {
      feedback.textContent = "Not quite. Review the lesson and try again.";
      feedback.style.color = "#f97373";
    }
  }
  
  // Init
  document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    showSection("home");
  });
  