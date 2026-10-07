/**
 * Portfolio JavaScript - Sharanya Dathegowda (Fresher Software Engineer)
 * Handles Left Vertical Sidebar, Mobile Drawer, Night/Light Mode Toggle,
 * Active Navigation on Scroll, and Interactive Chat Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. NIGHT / DARK MODE THEME TOGGLE & OS THEME DETECTION
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
  
  // Detect saved preference or default system theme
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Set initial theme
  setTheme(getPreferredTheme());

  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', handleThemeToggle);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
  }

  // Listen to OS system color scheme changes dynamically
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });


  // =========================================================================
  // 2. MOBILE SIDEBAR DRAWER TOGGLE & OVERLAY
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-link');

  const openSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = sidebar?.classList.contains('open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on mobile when a navigation link is clicked
  sidebarNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });


  // =========================================================================
  // 3. ACTIVE NAVIGATION LINK ON SCROLL (Intersection / Scroll Offset)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        sidebarNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();


  // =========================================================================
  // 4. ANIMATE SKILL PROGRESS BARS ON SCROLL
  // =========================================================================
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  if ('IntersectionObserver' in window && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.getPropertyValue('--target-width');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
      bar.style.width = '0%';
      skillObserver.observe(bar);
    });
  }


  // =========================================================================
  // 5. INTERACTIVE PORTFOLIO CHATBOT ASSISTANT
  // =========================================================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatSuggestions = document.getElementById('chat-suggestions');
  const chatClearBtn = document.getElementById('chat-clear-btn');

  const knowledgeBase = [
    {
      keywords: ['skill', 'technology', 'tech', 'stack', 'language', 'tools', 'database', 'java', 'react', 'python'],
      reply: 'Sharanya is skilled in <strong>Java, Python, C/C++, JavaScript (ES6+), HTML5/CSS3, React.js, Node.js, Express, MySQL, MongoDB, Git/GitHub, and Postman</strong>. She also has a strong grounding in Data Structures and CS fundamentals!'
    },
    {
      keywords: ['project', 'work', 'ecommerce', 'ai', 'summarizer', 'tracker', 'task'],
      reply: 'Sharanya has built several key software projects including an <strong>E-Commerce Web Platform</strong> (React, Node, MongoDB), a <strong>Task & Productivity Tracker</strong> (JavaScript, MySQL, REST APIs), and an <strong>AI Content Summarizer</strong> (Python, Flask, NLP API).'
    },
    {
      keywords: ['education', 'degree', 'college', 'university', 'cgpa', 'graduat', 'school', 'marks'],
      reply: 'Sharanya is pursuing / completed her <strong>B.E / B.Tech in Computer Science</strong> with an impressive <strong>8.5+ CGPA</strong>, preceded by a stellar 90% in Higher Secondary (12th PCMC).'
    },
    {
      keywords: ['available', 'hire', 'joining', 'immediate', 'opportunity', 'job', 'fresher', 'role'],
      reply: 'Yes! Sharanya is an <strong>Immediate Joiner</strong> actively looking for Entry-Level / Fresher Software Engineer roles. You can contact her directly via <a href="mailto:sharanya@example.com" style="color:var(--accent-primary);text-decoration:underline;">sharanya@example.com</a> or the Contact section.'
    },
    {
      keywords: ['contact', 'email', 'phone', 'location', 'reach', 'linkedin', 'github'],
      reply: 'You can reach Sharanya at <strong>sharanya@example.com</strong> or <strong>+91 98765 43210</strong>. She is based in Bengaluru, Karnataka, India. Check out her GitHub and LinkedIn profiles via the links!'
    },
    {
      keywords: ['about', 'bio', 'who', 'interest', 'hobby', 'experience'],
      reply: 'Sharanya is a passionate fresher software engineer with 200+ solved algorithmic problems. She loves open source, building intuitive user interfaces, exploring system design, and continuous learning.'
    }
  ];

  const appendChatMessage = (text, sender = 'bot') => {
    if (!chatMessages) return;

    const msgElement = document.createElement('div');
    msgElement.className = `chat-msg ${sender}-msg`;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgElement.innerHTML = `
      <div class="msg-bubble">${text}</div>
      <span class="msg-time">${timeStr}</span>
    `;

    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const processUserQuery = (query) => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return;

    // Display user message
    appendChatMessage(query, 'user');

    // Simulate typing delay
    setTimeout(() => {
      let matchedResponse = knowledgeBase.find(item =>
        item.keywords.some(kw => cleanQuery.includes(kw))
      );

      if (matchedResponse) {
        appendChatMessage(matchedResponse.reply, 'bot');
      } else {
        appendChatMessage(
          `Thanks for asking! While I'm a simple assistant, Sharanya would love to answer that directly. Feel free to leave a message in the <a href="#contact" style="color:var(--accent-primary);text-decoration:underline;">Contact section</a> or email her at <strong>sharanya@example.com</strong>.`,
          'bot'
        );
      }
    }, 450);
  };

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) {
        processUserQuery(text);
        chatInput.value = '';
      }
    });
  }

  // Suggestion chip clicks
  if (chatSuggestions) {
    chatSuggestions.addEventListener('click', (e) => {
      const btn = e.target.closest('.suggestion-chip');
      if (btn) {
        const query = btn.getAttribute('data-query');
        if (query) {
          processUserQuery(query);
        }
      }
    });
  }

  // Clear chat
  if (chatClearBtn && chatMessages) {
    chatClearBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-msg bot-msg">
          <div class="msg-bubble">
            👋 Hi there! I'm Sharanya's portfolio assistant. How can I help you today? You can choose a quick topic below or type your question.
          </div>
          <span class="msg-time">Just now</span>
        </div>
      `;
    });
  }


  // =========================================================================
  // 5. CONTACT FORM SUBMISSION PLACEHOLDER
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out, Sharanya will get back to you shortly!');
      contactForm.reset();
    });
  }

});
