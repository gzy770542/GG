document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Debug: Check if elements are found
    console.log("Header found:", !!header);
    console.log("Nav links found:", navLinks.length);

    // Add click event for navigation links to ensure smooth scroll and active state
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("Nav link clicked:", this.getAttribute('href'));

            const targetId = this.getAttribute('href');
            if (targetId === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                console.log("Scrolling to:", offsetPosition);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu if open
                const navMenu = document.querySelector("nav");
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove("show");
                }
            } else {
                console.warn("Target element not found:", targetId);
            }
        });
    });

    const hamburgerToggle = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

    if (hamburgerToggle && nav) {
        hamburgerToggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }

    const currentLangText = document.getElementById("current-lang-text");

    // Default language
    let currentLang = localStorage.getItem("lang") || "en";
    // loadLanguage(currentLang); // Moved to end of file to ensure translations are loaded

    // Language dropdown (matches current HTML structure)
    const langContainer = document.querySelector('.mobile-middle');
    const langToggleBtn = langContainer ? langContainer.querySelector('button') : null;
    const langMenu = langContainer ? langContainer.querySelector('ul') : null;
    const langMenuItems = langMenu ? langMenu.querySelectorAll('li') : [];

    if (langToggleBtn && langMenu) {
        langToggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', function (e) {
            if (langMenu && !langContainer.contains(e.target)) {
                langMenu.classList.add('hidden');
            }
        });
    }

    // Click handler for language switch items
    if (langMenuItems && langMenuItems.length) {
        langMenuItems.forEach((item) => {
            item.addEventListener('click', function () {
                const selectedLang = this.getAttribute('data-lang');
                currentLang = selectedLang;
                localStorage.setItem('lang', currentLang);
                loadLanguage(currentLang);
                if (currentLangText) currentLangText.textContent = currentLang.toUpperCase();
                if (langMenu) langMenu.classList.add('hidden');
            });
        });
    }

    // Load and apply language file
    const translations = {
        "en": {
            "page_title": "Wish Group",
            "nav_about": "About Us",
            "nav_charity": "Charity",
            "nav_services": "Our Services",
            "nav_moments": "Culture",
            "nav_testimonials": "Testimonials",
            "nav_contact": "Contact Us",
            "nav_careers": "Careers",
            "nav_find_us": "Find Us",
            "hero": {
                "title": "Your One-Stop Financial Partner",
                "subtitle": "All-in-one solution for growth and protection under one roof",
                "getStarted": "Contact Us Today"
            },
            "about": {
                "title": "About Us",
                "intro_text": "Established in 2013 and backed by years of collective professional expertise, Wish Group Resources is Malaysia’s leading \"One-Stop Financial Solution\" provider. We have empowered thousands of Malaysians through our comprehensive suite of integrated services—ranging from banking and finance to risk management, legal and tax consultancy, investment, and estate planning. Our mission is to instill confidence in our clients, enabling them to invest wisely and secure their wealth for generations to come.",
                "mission_title": "Our Mission",
                "mission_text": "To provide peace of mind through comprehensive, personalized financial and insurance planning, build long-term trust with clients, and uphold the highest levels of professionalism and ethical standards.",
                "vision_title": "Our Vision",
                "vision_text": "To be a leading young financial services agency in Malaysia — the preferred partner for both clients and business leaders. We train leaders, not staff.",
                "values_title": "Our Core Values",
                "values_text_paragraph": "We're a young financial agency in Malaysia, focused on being the top choice for clients and future leaders.",
                "value1": "Gratefulness",
                "value2": "Team Spirit",
                "value3": "Excellence",
                "value4": "Foresight",
                "value5": "Dedication"
            },
            "events": {
                "title": "Life at Wish Group",
                "tab_celebration": "Celebration",
                "tab_team": "Team Building",
                "tab_training": "Training",
                "celebration_desc1": "Wish Annual Dinner",
                "team_desc1": "🏓 Pickleball",
                "team_desc2": "Outdoor team bonding activities.",
                "training_desc1": "💡 Learn, Laugh & Level Up",
                "tab_charity": "Charity",
                "charity_desc1": "Charity Event"
            },
            "testimonials": {
                "title": "Why Client Trust Us",
                "subtitle": "Honest advice, professional guidance",
                "client1_name": "Bobby Zhang",
                "client1_role": "Office Worker",
                "client1_text": "\"Everything was clear and professional - I trust them with my family's protection.\"",
                "client2_name": "Emily Wong",
                "client2_role": "Homemaker",
                "client2_text": "\"They explained everything so clearly. Now I understand and even recommend them to friends.\"",
                "client3_name": "Jason Hiew",
                "client3_role": "Office Worker",
                "client3_text": "\"I wasn't interested at first, but later i found them truly trustworthy.\""
            },
            "stories": {
                "title": "Wish for Good",
                "story1_title": "15 Years<br>One Mission: Save Lives",
                "know_more": "Know More",
                "story2_title": "One Kindness A Month",
                "story3_title": "A New Year,<br>A Gift of Love",
                "story1": {
                    "text": "Full story text for Story 1 goes here..."
                },
                "story2": {
                    "text": "Full story text for Story 2 goes here..."
                },
                "story3": {
                    "text": "Full story text for Story 3 goes here..."
                }
            },
            "story_popup": {
                "video_unsupported": "Your browser does not support the video tag.",
                "speed_label": "Speed:"
            },
            "services": {
                "title": "Our Services",
                "banking": {
                    "title": "Banking & Finance",
                    "item1": "Loan consultation",
                    "item2": "Mortgage planning",
                    "item3": "Debt restructuring"
                },
                "risk": {
                    "title": "Risk Management",
                    "item1": "Insurance analysis",
                    "item2": "Protection planning",
                    "item3": "Critical illness coverage"
                },
                "legal": {
                    "title": "Legal Advisory (via trusted partners)",
                    "item1": "Legal documentation support",
                    "item2": "Contract review",
                    "item3": "Will writing"
                },
                "tax": {
                    "title": "Tax Planning",
                    "item1": "Personal tax planning",
                    "item2": "Business tax consultation",
                    "item3": "Tax optimization"
                },
                "investment": {
                    "title": "Investment Planning",
                    "item1": "Portfolio design",
                    "item2": "Unit trust investment",
                    "item3": "Retirement planning"
                },
                "estate": {
                    "title": "Estate Planning",
                    "item1": "Will planning & trust setup",
                    "item2": "Asset distribution",
                    "item3": "Inheritance protection"
                }
            },
            "contact": {
                "title": "Contact Us",
                "description": "Leave us your details and we'll be in touch!",
                "form_title": "Get In Touch",
                "category_label": "Interested Category",
                "category_option_default": "Select an option",
                "category_option1": "Banking Solutions",
                "category_option2": "Risk Management",
                "category_option3": "Legal Advisory",
                "category_option4": "Tax Planning",
                "category_option5": "Investment Planning",
                "category_option6": "Estate Planning",
                "category_option_other": "Other",
                "other_category_placeholder": "Please specify"
            },
            "form": {
                "name_placeholder": "Your Name",
                "email_placeholder": "Your Email",
                "phone_placeholder": "Phone Number",
                "message_placeholder_contact": "Optional Message",
                "submit_btn": "Submit"
            },
            "join": {
                "story6": {
                    "text": "Story 6 text..."
                },
                "title": "Join Us",
                "description": "Build Your Future With Us",
                "form_title": "Send Us Your CV",
                "message_placeholder": "Any Message To Our Company",
                "cv_label": "Attach your CV Here",
                "choose_file": "Choose A File",
                "no_file_chosen": "No File Chosen"
            },
            "footer": {
                "address": "32A-1, Jalan Nautika B U20/B,<br />Pusat Komersial TSB,<br />47000 Shah Alam, Selangor",
                "follow_us": "FOLLOW US",
                "copyright": "&copy;2025 Wish Group. All rights reserved."
            }
        },
        "zh": {
            "page_title": "Wish Group",
            "nav_about": "关于我们",
            "nav_charity": "慈善公益",
            "nav_services": "我们的服务",
            "nav_moments": "文化",
            "nav_testimonials": "客户评价",
            "nav_contact": "联系我们",
            "nav_careers": "职业发展",
            "nav_find_us": "找到我们",
            "hero": {
                "title": "您的一站式金融合作伙伴",
                "subtitle": "一站式增长与保障解决方案",
                "getStarted": "立即联系我们"
            },
            "about": {
                "title": "关于我们",
                "intro_text": "Wish Group Resources 成立于 2013 年，拥有多年的综合专业经验，是马来西亚领先的“一站式金融解决方案”提供商。我们已指导数千名马来西亚人通过银行与金融、风险管理、法律与税务咨询、投资及遗产规划等全方位整合服务，实现财富增长。我们的使命是赋予客户信心，助其明智投资并保障未来财富。",
                "mission_title": "我们的使命",
                "mission_text": "通过全面、个性化的财务与保险规划，为客户提供安心保障，与客户建立长期信任关系，并恪守最高水平的专业精神与道德标准",
                "vision_title": "我们的愿景",
                "vision_text": "成为马来西亚领先的年轻金融服务机构——客户与商业领袖的首选合作伙伴。我们培养的是领导者，而非普通员工。",
                "values_title": "我们的核心价值观",
                "values_text_paragraph": "我们是一家位于马来西亚的年轻金融机构，致力于成为客户和未来领袖的首选。"
            },
            "events": {
                "title": "Wish Group 的生活",
                "tab_celebration": "庆典活动",
                "tab_team": "团队建设",
                "tab_training": "培训",
                "celebration_desc1": "Wish 年度晚宴",
                "team_desc1": "🏓 匹克球",
                "team_desc2": "户外团队凝聚活动",
                "training_desc1": "💡 学习，欢笑与提升",
                "tab_charity": "慈善公益",
                "charity_desc1": "慈善活动"
            },
            "testimonials": {
                "title": "客户为何信任我们",
                "subtitle": "诚恳建议，专业指导",
                "client1_name": "Bobby Zhang",
                "client1_role": "办公室职员",
                "client1_text": "“一切都清晰专业——我放心将家人的安全托付给他们。”",
                "client2_name": "Emily Wong",
                "client2_role": "家庭主妇",
                "client2_text": "“他们解释得清清楚楚，现在我完全明白了，甚至向朋友们推荐他们。”",
                "client3_name": "Jason Hiew",
                "client3_role": "办公室职员",
                "client3_text": "“起初我并不感兴趣，但后来发现他们确实值得信赖。”"
            },
            "stories": {
                "title": "Wish for Good",
                "story1_title": "15年，一个使命：拯救生命",
                "know_more": "了解更多",
                "story2_title": "每月一善",
                "story3_title": "新年伊始,爱意相赠",
                "story1": {
                    "text": "故事1全文..."
                },
                "story2": {
                    "text": "故事2全文..."
                },
                "story3": {
                    "text": " 故事3全文..."
                }
            },
            "story_popup": {
                "video_unsupported": "您的浏览器不支持视频标签。",
                "speed_label": "速度："
            },
            "services": {
                "title": "我们的服务",
                "banking": {
                    "title": "银行业与金融业",
                    "item1": "贷款咨询",
                    "item2": "房贷规划",
                    "item3": "债务重组"
                },
                "risk": {
                    "title": "风险管理",
                    "item1": "保险分析",
                    "item2": "保障规划",
                    "item3": "重大疾病保障"
                },
                "legal": {
                    "title": "法律咨询服务（与信赖合作伙伴）",
                    "item1": "法律文件支持",
                    "item2": "合同审核",
                    "item3": "遗嘱撰写"
                },
                "tax": {
                    "title": "税务规划",
                    "item1": "个人税务规划",
                    "item2": "企业税务咨询",
                    "item3": "税务优化"
                },
                "investment": {
                    "title": "投资规划",
                    "item1": "投资组合设计",
                    "item2": "单位信托投资",
                    "item3": "退休规划"
                },
                "estate": {
                    "title": "遗产规划",
                    "item1": "遗嘱规划与信托设立",
                    "item2": "资产分配",
                    "item3": "遗产继承保障"
                }
            },
            "contact": {
                "title": "联系我们",
                "description": "我们随时为您提供帮助",
                "form_title": "取得联系",
                "category_label": "感兴趣的类别",
                "category_option_default": "选择一个选项",
                "category_option1": "银行业与金融业",
                "category_option2": "风险管理",
                "category_option3": "法律咨询",
                "category_option4": "税务规划",
                "category_option5": "投资规划",
                "category_option6": "遗产规划",
                "category_option_other": "其他",
                "other_category_placeholder": "请注明"
            },
            "form": {
                "name_placeholder": "请输入您的姓名",
                "email_placeholder": "输入您的电子邮箱",
                "phone_placeholder": "输入您的手机号码",
                "message_placeholder_contact": "留言",
                "submit_btn": "提交"
            },
            "join": {
                "story4": {
                    "text": "故事4文本..."
                },
                "story5": {
                    "text": "故事5文本..."
                },
                "story6": {
                    "text": "故事6文本..."
                },
                "title": "加入我们",
                "description": "与我们携手共创未来",
                "form_title": "请发送您的简历",
                "message_placeholder": "是否有任何信息要传达给本公司？",
                "cv_label": "在此附上您的简历",
                "choose_file": "选择文件",
                "no_file_chosen": "未选择文件"
            },
            "footer": {
                "address": "32A-1, Jalan Nautika B U20/B,<br />Pusat Komersial TSB,<br />47000 Shah Alam, Selangor",
                "follow_us": "关注我们",
                "copyright": "&copy;2025 Wish Group. 版权所有。"
            }
        }
    };

    function loadLanguage(lang) {
        console.log(`Loading language: ${lang}`);
        const translation = translations[lang];
        if (translation) {
            console.log("Translations loaded:", translation);
            document.querySelectorAll("[data-i18n]").forEach((el) => {
                const key = el.getAttribute("data-i18n");
                const translated = getNestedTranslation(translation, key);
                if (translated) {
                    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                        // Handle placeholders if needed, though usually handled by data-i18n-placeholder
                    } else {
                        el.innerHTML = translated;
                    }
                }
            });

            document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
                const key = el.getAttribute("data-i18n-placeholder");
                const translated = getNestedTranslation(translation, key);
                if (translated) {
                    el.setAttribute("placeholder", translated);
                }
            });

            document.querySelectorAll("[data-i18n-title]").forEach((el) => {
                const key = el.getAttribute("data-i18n-title");
                const translated = getNestedTranslation(translation, key);
                if (translated) {
                    el.setAttribute("title", translated);
                }
            });

            updateDynamicContent(lang);
        } else {
            console.error(`Translation for language ${lang} not found.`);
        }
    }

    // Handle nested keys like "hero.title"
    function getNestedTranslation(obj, key) {
        return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
    }

    // This new function will be called every time the language changes.
    function updateDynamicContent(translations) {
        // ========== Story and Intern Video Popup ==========
        const stories = {
            1: {
                video: "videos/donation.webm",
                poster: "images/donation.webp",
                text: getNestedTranslation(translations, "stories.story1.text"),
            },
            2: {
                video: "videos/mdonation.webm",
                poster: "images/mdonation.webp",
                text: getNestedTranslation(translations, "stories.story2.text"),
            },
            3: {
                video: "videos/ydonation.webm",
                poster: "images/ydonation.webp",
                text: getNestedTranslation(translations, "stories.story3.text"),
            },
            4: {
                video: "videos/11.mp4",
                poster: "images/office.jpg",
                text: getNestedTranslation(translations, "join.story4.text"),
            },
            5: {
                video: "videos/11.mp4",
                poster: "images/office.jpg",
                text: getNestedTranslation(translations, "join.story5.text"),
            },
            6: {
                video: "videos/11.mp4",
                poster: "images/office.jpg",
                text: getNestedTranslation(translations, "join.story6.text"),
            },
        };
        const storyCards = document.querySelectorAll(".story-card");
        const storyVideo = document.getElementById("storyVideo");
        const storyText = document.getElementById("storyText");
        const storyPopup = document.getElementById("storyPopup");
        const closeStory = document.getElementById("closeStory");
        const speedSelect = document.getElementById("speed");

        if (storyCards.length && storyPopup && storyVideo && storyText && closeStory) {
            // Remove previous event listeners to avoid duplicates
            storyCards.forEach(card => {
                card.replaceWith(card.cloneNode(true));
            });
            const newStoryCards = document.querySelectorAll(".story-card");
            newStoryCards.forEach((card) => {
                card.addEventListener("click", () => {
                    const id = card.dataset.story;
                    if (stories[id]) {
                        storyVideo.src = stories[id].video;
                        storyVideo.poster = stories[id].poster;
                        storyText.innerHTML = stories[id].text;
                        storyPopup.style.display = "flex";
                        storyVideo.play();
                    }
                });
            });

            closeStory.addEventListener("click", () => {
                storyPopup.style.display = "none";
                storyVideo.pause();
                storyVideo.currentTime = 0;
                storyVideo.src = "";
            });

            if (speedSelect) {
                speedSelect.addEventListener("change", (e) => {
                    storyVideo.playbackRate = parseFloat(e.target.value);
                });
            }
            storyPopup.addEventListener('click', (e) => {
                if (e.target === storyPopup) {
                    closeStory.click();
                }
            });
        }


        // ========== Event Descriptions ==========
        const items = document.querySelectorAll(".event-item");
        items.forEach((item) => {
            const key = item.getAttribute("data-i18n-description");
            const translatedDesc = getNestedTranslation(translations, key);
            if (translatedDesc) {
                item.setAttribute("data-description", translatedDesc);
            }
        });

        // Set the active language text in the dropdown
        currentLangText.textContent = currentLang.toUpperCase();
    }


    let lastScrollTop = 0;
    // header and navLinks are already defined at the top
    const backToTopButton = document.getElementById('backToTop');

    // Header hide/show on scroll
    // const headerBg = document.getElementById('header-bg'); // Element removed in new design

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header Shadow on scroll
        if (scrollTop > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        // Hide/Show logic
        const headerHeight = header ? header.offsetHeight : 0;
        console.log(`Scroll: ${scrollTop}, Last: ${lastScrollTop}, HeaderHeight: ${headerHeight}`);

        // Debug: Update title to show we are scrolling
        // document.title = `Scroll: ${Math.round(scrollTop)}`;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            if (header) {
                console.log("Hiding header");
                header.style.transform = 'translateY(-100%)';
            }
        } else {
            if (header) {
                console.log("Showing header");
                header.style.transform = 'translateY(0)';
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        // Back to top button
        if (scrollTop > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    // Back to top button smoother scroll
    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();

        const scrollDuration = 800; // in milliseconds
        const start = window.scrollY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1); // from 0 to 1
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            window.scrollTo(0, start * (1 - ease));

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    });


    // Set active navigation link based on scroll position (optional, but good for UX)
    function setActiveNavLink() {
        let currentSection = '';
        const sections = document.querySelectorAll('section[id], body');

        sections.forEach(section => {
            if (!section.id && section.tagName !== 'BODY') return;

            const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for fixed header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id') || 'top'; // Use 'top' for body
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');

            if (window.pageYOffset === 0 && linkHref === '#top') {
                link.classList.add('active');
            } else if (linkHref.includes(currentSection) && currentSection !== 'top') {
                link.classList.add('active');
            }
        });
    }

    // Call setActiveNavLink on scroll and page load
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Set active link on initial load

    // Old smooth scroll logic removed (moved to top)




    // (Removed old mismatched selectors for language dropdown)


    const scrollArrow = document.querySelector('.scroll-down-btn');

    if (scrollArrow) {
        scrollArrow.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = document.querySelector('header')?.offsetHeight || 0;

            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const scrollToPosition = targetPosition - headerOffset + 100;

                const start = window.scrollY;
                const distance = scrollToPosition - start;
                const duration = 1500;
                let startTime = null;

                function scrollStep(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    window.scrollTo(0, start + distance * ease);

                    if (progress < 1) {
                        requestAnimationFrame(scrollStep);
                    }
                }

                requestAnimationFrame(scrollStep);
            }
        });
    }

    // ========== Story and Intern Video Popup ==========
    // The stories object is now handled dynamically inside updateDynamicContent
    const storyPopup = document.getElementById("storyPopup");
    const closeStory = document.getElementById("closeStory");
    const storyVideo = document.getElementById("storyVideo");
    const storyText = document.getElementById("storyText");
    const speedSelect = document.getElementById("speed");

    // Click listeners are added in updateDynamicContent
    if (closeStory) {
        closeStory.addEventListener("click", () => {
            storyPopup.style.display = "none";
            storyVideo.pause();
            storyVideo.currentTime = 0;
            storyVideo.src = "";
        });
    }

    if (speedSelect) {
        speedSelect.addEventListener("change", (e) => {
            storyVideo.playbackRate = parseFloat(e.target.value);
        });
    }

    if (storyPopup) {
        storyPopup.addEventListener('click', (e) => {
            if (e.target === storyPopup) {
                closeStory.click();
            }
        });
    }

    // ========== Service Card Expand ==========
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
        card.addEventListener("click", (e) => {
            if (e.target.closest("a, button, input, textarea, select")) return;

            const content = card.querySelector(".card-content");
            const toggleBtn = card.querySelector(".toggle-btn");
            const isOpen = content.classList.contains("open");

            if (isOpen) {
                content.classList.remove("open");
                toggleBtn.classList.remove("rotate");
                content.style.display = "none";
            } else {
                content.classList.add("open");
                toggleBtn.classList.add("rotate");
                content.style.display = "block";
            }
        });
    });


    // ========== CV Upload Functionality ==========
    // We've changed this to target the unique ID "cvForm" which is actually "joinForm" in HTML
    const joinForm = document.getElementById("joinForm");
    const cvInput = document.getElementById("cv_upload");
    const fileChosenSpan = document.getElementById("file-chosen");

    // Success Modal Elements
    const successModal = document.getElementById("successModal");
    const closeSuccessBtn = document.getElementById("closeSuccess");
    const successOkBtn = document.getElementById("successOkBtn");

    function closeSuccessModal() {
        if (successModal) successModal.classList.add("hidden");
        if (successModal) successModal.classList.remove("flex");
    }

    if (closeSuccessBtn) closeSuccessBtn.addEventListener("click", closeSuccessModal);
    if (successOkBtn) successOkBtn.addEventListener("click", closeSuccessModal);
    if (successModal) {
        successModal.addEventListener("click", (e) => {
            if (e.target === successModal) closeSuccessModal();
        });
    }

    // We'll check if the form exists before adding event listeners
    if (joinForm && cvInput && fileChosenSpan) {

        // When a file is selected
        cvInput.addEventListener("change", () => {
            if (cvInput.files.length > 0) {
                fileChosenSpan.textContent = cvInput.files[0].name;
                fileChosenSpan.classList.remove("text-gray-500", "italic");
                fileChosenSpan.classList.add("text-blue-600", "font-medium");
                // Remove data-i18n attribute to prevent overwrite
                fileChosenSpan.removeAttribute("data-i18n");
            } else {
                fileChosenSpan.textContent = "No File Chosen";
                fileChosenSpan.classList.add("text-gray-500", "italic");
                fileChosenSpan.classList.remove("text-blue-600", "font-medium");
                fileChosenSpan.setAttribute("data-i18n", "join.no_file_chosen");
                loadLanguage(currentLang);
            }
        });

        // On form submit
        joinForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const file = cvInput.files[0];
            // If file is mandatory, uncomment below. If optional, keep as is.
            /* 
            if (!file) {
                alert("Please select a file to upload.");
                return;
            }
            */

            const formData = new FormData(joinForm);

            // Simulation of submission (replace with actual fetch if backend is ready)
            // For now, we assume success to show the modal as requested

            /* 
            // Real backend submission:
            fetch("submit_cv.php", {
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(result => {
                // Show success modal
                if (successModal) {
                    successModal.classList.remove("hidden");
                    successModal.classList.add("flex");
                }
                joinForm.reset();
                // Reset file label
                fileChosenSpan.textContent = "No File Chosen";
                fileChosenSpan.classList.add("text-gray-500", "italic");
                fileChosenSpan.classList.remove("text-blue-600", "font-medium");
                fileChosenSpan.setAttribute("data-i18n", "join.no_file_chosen");
                loadLanguage(currentLang);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
            */

            // --- DEMO MODE: Simulate Network Request ---
            const submitBtn = joinForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Reset Button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Show Success Modal
                if (successModal) {
                    successModal.classList.remove("hidden");
                    successModal.classList.add("flex");
                }

                // Reset Form
                joinForm.reset();
                fileChosenSpan.textContent = "No File Chosen";
                fileChosenSpan.classList.add("text-gray-500", "italic");
                fileChosenSpan.classList.remove("text-blue-600", "font-medium");
                fileChosenSpan.setAttribute("data-i18n", "join.no_file_chosen");
                loadLanguage(currentLang);

            }, 1000); // 1 second delay
        });
    }

    // ========== Event Tab Functionality ==========
    const tabs = document.querySelectorAll(".event-tab");
    const carousel = document.querySelector(".carousel");
    // Store all items initially
    const allItems = Array.from(document.querySelectorAll(".carousel-item"));
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    // Preloader Logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Optional: Ensure it stays for at least a moment (e.g. 500ms) to see the animation
            setTimeout(() => {
                preloader.classList.add('loaded');
                // Remove from DOM after transition
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 800);
        }
    });
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const modalDesc = document.getElementById("modalDesc");
    const modalClose = document.getElementById("modalClose");
    const modalPrev = document.getElementById("modalPrev");
    const modalNext = document.getElementById("modalNext");

    let filteredItems = [];
    let currentIndex = 0;

    console.log("Debug: tabs", tabs.length);
    console.log("Debug: carousel", !!carousel);
    console.log("Debug: allItems", allItems.length);
    console.log("Debug: modal", !!modal);
    console.log("Debug: modalImg", !!modalImg);
    console.log("Debug: modalDesc", !!modalDesc);
    console.log("Debug: modalClose", !!modalClose);
    console.log("Debug: modalPrev", !!modalPrev);
    console.log("Debug: modalNext", !!modalNext);

    if (tabs.length && carousel && allItems.length && modal && modalImg && modalDesc && modalClose && modalPrev && modalNext) {

        function updateCarousel(category) {
            // Filter items
            let selectedItems = allItems.filter(item => item.getAttribute("data-category") === category);

            // Duplicate items if fewer than 6 to ensure smooth marquee
            filteredItems = [...selectedItems];
            while (filteredItems.length < 6 && filteredItems.length > 0) {
                filteredItems = filteredItems.concat(selectedItems);
            }
            // Cap at 8 to match CSS nth-child rules
            if (filteredItems.length > 8) {
                filteredItems = filteredItems.slice(0, 8);
            }

            // Clear carousel and re-append filtered items (cloning to avoid moving original nodes if needed, but here we just append)
            // Since we might have duplicates of the same node, we need to clone them
            carousel.innerHTML = '';
            filteredItems.forEach(item => {
                // Clone the item so we can have duplicates in the DOM
                const clone = item.cloneNode(true);
                // Re-attach click listener to clone since we lost it
                clone.addEventListener("click", () => {
                    // Find the index of this clone in the current filteredItems list
                    // We can't rely on item reference since it's a clone
                    // We'll use the index in the carousel children
                    const index = Array.from(carousel.children).indexOf(clone);
                    // Map back to original selectedItems index for modal? 
                    // Actually, we can just open the modal with the clone's data
                    // But navigateModal relies on filteredItems. 
                    // Let's just use the index in the current carousel.
                    currentIndex = index;
                    openModal(currentIndex);
                });
                carousel.appendChild(clone);
            });

            // Update CSS variable for animation calculation
            carousel.style.setProperty('--items', filteredItems.length);

            // Reset animation by triggering reflow
            carousel.classList.remove('animating');
            void carousel.offsetWidth; // trigger reflow
            carousel.classList.add('animating');
        }

        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                console.log("Tab clicked:", tab.getAttribute("data-category"));
                tabs.forEach((btn) => btn.classList.remove("active"));
                tab.classList.add("active");

                const category = tab.getAttribute("data-category");
                updateCarousel(category);
                currentIndex = 0;
            });
        });

        // Initial load
        window.addEventListener("DOMContentLoaded", () => {
            if (tabs.length > 0) {
                tabs[0].click();
            }
        });
        // Also trigger immediately in case DOMContentLoaded already fired
        if (tabs.length > 0) {
            // Check if we need to initialize active state
            const activeTab = document.querySelector(".event-tab.active") || tabs[0];
            activeTab.click();
        }

        // Modal logic
        function openModal(index) {
            const item = filteredItems[index];
            if (item) {
                modalImg.src = item.querySelector("img").src;
                modalDesc.textContent = item.getAttribute("data-description");
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
                currentIndex = index;
            }
        }

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }

        function navigateModal(dir) {
            currentIndex += dir;
            if (currentIndex < 0) currentIndex = filteredItems.length - 1;
            if (currentIndex >= filteredItems.length) currentIndex = 0;
            openModal(currentIndex);
        }

        // Attach click events to ALL items (even if not currently in DOM, they are in allItems)
        allItems.forEach((item) => {
            item.addEventListener("click", () => {
                // Re-calculate index based on currently filtered items
                currentIndex = filteredItems.indexOf(item);
                if (currentIndex !== -1) {
                    openModal(currentIndex);
                }
            });
        });

        modalClose.addEventListener("click", closeModal);
        modalPrev.addEventListener("click", () => navigateModal(-1));
        modalNext.addEventListener("click", () => navigateModal(1));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // ========== Contact Form Submission ==========
    const contactForm = document.getElementById("contactForm");
    const categorySelect = document.getElementById("category");
    const otherInput = document.getElementById("otherCategoryInput");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Basic Validation
            const name = document.getElementById("contact_name").value.trim();
            const email = document.getElementById("contact_email").value.trim();
            const phone = document.getElementById("contact_phone").value.trim();
            const category = document.getElementById("category").value;

            if (!name || !email || !phone || !category) {
                alert("Please fill in all required fields.");
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const formData = new FormData(contactForm);

            /* 
            // Real backend submission:
            fetch("submit_contact.php", {
                method: "POST",
                body: formData
            })
                .then((response) => response.text())
                .then((result) => {
                     // Show Success Modal
                    if (successModal) {
                        successModal.classList.remove("hidden");
                        successModal.classList.add("flex");
                    }
                    contactForm.reset();
                    if (otherInput) otherInput.style.display = "none";
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Something went wrong. Please try again.");
                });
            */

            // --- DEMO MODE: Simulate Network Request ---
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Reset Button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Show Success Modal
                if (successModal) {
                    successModal.classList.remove("hidden");
                    successModal.classList.add("flex");
                }

                // Reset Form
                contactForm.reset();
                if (otherInput) otherInput.style.display = "none";

            }, 1000); // 1 second delay
        });
    }


    if (categorySelect) {
        categorySelect.addEventListener("change", function () {
            if (this.value === "other") {
                otherInput.style.display = "block";
            } else {
                otherInput.style.display = "none";
                // The next line ensures the "other" input is cleared if another category is selected
                otherInput.value = "";
            }
        });
    }

    // Make sure to call updateDynamicContent on initial load as well
    // It's already called from inside loadLanguage, but this is good practice
    // to ensure all parts of the page are correctly initialized.
    loadLanguage(currentLang);
});