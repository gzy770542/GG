document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');

    // ==========================================
    // GLOBAL WISH STORIES LOGIC (Top Level)
    // ==========================================
    // ==========================================
    // GLOBAL WISH STORIES LOGIC (Top Level)
    // ==========================================
    // Initialize with defaults to ensure it's never empty
    window.wishStories = [
        {
            id: 1,
            title: "15 Years<br>One Mission: Save Lives",
            desc: "For over 15 years, we have organized blood donation drives to support our local hospitals and save lives. Join us in our mission to make a difference.",
            fullText: "For over 15 years, we have organized blood donation drives to support our local hospitals and save lives. Join us in our mission to make a difference.",
            image: "images/bdonation.webp",
            video: "videos/donation.webm",
            poster: "images/bdonation.webp"
        },
        {
            id: 2,
            title: "One Kindness<br>A Month",
            desc: "We believe in consistency. Our 'One Kindness A Month' initiative encourages our team and community to perform at least one charitable act every month.",
            fullText: "We believe in consistency. Our 'One Kindness A Month' initiative encourages our team and community to perform at least one charitable act every month.",
            image: "images/mdonation.webp",
            video: "videos/mdonation.webm",
            poster: "images/mdonation.webp"
        },
        {
            id: 3,
            title: "A New Year,<br>A Gift of Love",
            desc: "As we welcome the New Year, we share love and essential supplies with underprivileged families, ensuring everyone can celebrate with joy and dignity.",
            fullText: "As we welcome the New Year, we share love and essential supplies with underprivileged families, ensuring everyone can celebrate with joy and dignity.",
            image: "images/ydonation.webp",
            video: "videos/ydonation.webm",
            poster: "images/ydonation.webp"
        }
    ];
    window.wishSliderActiveIndex = 0;

    window.handleKnowMoreClick = function () {
        console.log("handleKnowMoreClick TRIGGERED. Index:", window.wishSliderActiveIndex);
        try {
            const index = window.wishSliderActiveIndex;
            const story = window.wishStories[index];
            const storyPopup = document.getElementById("storyPopup");
            const storyVideo = document.getElementById("storyVideo");
            const popupTitle = document.getElementById("popupTitle");
            const storyTextContent = document.getElementById("storyText");

            if (storyPopup && story) {
                console.log("Opening story index:", index, story);
                storyVideo.src = story.video;
                storyVideo.poster = story.poster;
                popupTitle.innerHTML = story.title;
                storyTextContent.innerHTML = story.fullText;

                // Force Styles Directly to ensure visibility
                storyPopup.classList.remove('hidden');
                storyPopup.classList.add('flex');
                storyPopup.style.display = 'flex';
                storyPopup.style.zIndex = '100000'; // Super high Z-index

                storyVideo.play().catch(err => console.log('Video play error:', err));
            } else {
                console.error("Popup elements or story not found. Index:", index);
            }
        } catch (err) {
            console.error("Popup Error:", err);
        }
    };

    window.closeWishStory = function () {
        console.log("Global closeWishStory triggered.");
        const storyPopup = document.getElementById("storyPopup");
        const storyVideo = document.getElementById("storyVideo");

        if (storyPopup) {
            storyPopup.classList.add('hidden');
            storyPopup.classList.remove('flex');
            storyPopup.style.display = 'none'; // Force hide
        }

        if (storyVideo) {
            console.log("Stopping video playback.");
            try {
                storyVideo.pause();
                storyVideo.currentTime = 0;
                storyVideo.src = "";     // clear source
                storyVideo.removeAttribute("src"); // clear attribute
                storyVideo.load();       // force unload
            } catch (e) {
                console.error("Error stopping video:", e);
            }
        }
    };

    // Remove old openWishStory if exists (handled by handleKnowMoreClick now)
    window.openWishStory = window.handleKnowMoreClick;

    // Debug: Check if elements are found
    console.log("Header found:", !!header);
    console.log("Nav links found:", navLinks.length);

    // Add click event for navigation links to ensure smooth scroll and active state
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Only intercept internal hash links
            if (!targetId || !targetId.startsWith('#')) {
                return; // Let default navigation happen
            }

            e.preventDefault();
            console.log("Nav link clicked:", targetId);
            const formState = this.getAttribute('data-form-state'); // Join or Contact

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

                // If it's a form toggle link, trigger the switch
                if (formState && typeof toggleForm === 'function') {
                    toggleForm(formState);
                }

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

    // ==========================================
    // GLOBAL LANGUAGE FUNCTIONS (Robust)
    // ==========================================
    window.toggleLanguageMenu = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            console.log("Language menu toggled. Hidden:", dropdown.classList.contains('hidden'));
        } else {
            console.error("Language dropdown element not found!");
        }
    };

    window.switchLanguage = function (lang, e) {
        if (e) {
            e.stopPropagation();
        }
        console.log("Switching language to:", lang);

        currentLang = lang;
        localStorage.setItem('lang', currentLang);

        // Hide dropdown
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) dropdown.classList.add('hidden');

        // Update text
        const currentLangText = document.getElementById("current-lang-text");
        if (currentLangText) currentLangText.textContent = lang.toUpperCase();

        // Trigger translation load
        if (typeof loadLanguage === 'function') {
            loadLanguage(currentLang);
        } else {
            console.error("loadLanguage function is missing!");
        }
    };

    window.toggleHamburgerMenu = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        const nav = document.querySelector('nav');
        if (nav) {
            // Force explicit toggle
            if (nav.classList.contains('hidden')) {
                nav.classList.remove('hidden');
                nav.classList.add('flex'); // Ensure flex is active when showing
                console.log("Opening Menu");
            } else {
                nav.classList.add('hidden');
                nav.classList.remove('flex'); // Ensure flex is removed when hiding (optional but safer)
                console.log("Closing Menu");
            }
        } else {
            console.error("Nav element not found!");
        }
    };

    // Close language menu when clicking outside
    document.addEventListener('click', function (e) {
        const dropdown = document.getElementById('languageDropdown');
        const btn = document.querySelector('.mobile-middle button'); // Only for approximate check

        // If dropdown is open and we clicked outside
        if (dropdown && !dropdown.classList.contains('hidden')) {
            // Basic check: if target is not inside the dropdown
            if (!dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        }
    });

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
            "nav_wish_for_good": "Wish for Good",
            "nav_careers": "Careers",
            "nav_join_us": "Join Us",
            "nav_find_us": "Find Us",
            "hero": {
                "title": "Your One-Stop Financial Partner",
                "subtitle": "All-in-one solution for growth and protection under one roof",
                "getStarted": "Contact Us Today"
            },
            "about": {
                "title": "About Us",
                "intro_text": "Established in 2013, Wish Group Resources is Malaysia’s leading one-stop financial hub. We provide expert banking, tax, investment, and estate planning services to help thousands of clients grow and secure their wealth for future generations.",
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
                    "text": "For over 15 years, we have organized blood donation drives to support our local hospitals and save lives. Join us in our mission to make a difference."
                },
                "story2": {
                    "text": "We believe in consistency. Our 'One Kindness A Month' initiative encourages our team and community to perform at least one charitable act every month."
                },
                "story3": {
                    "text": "As we welcome the New Year, we share love and essential supplies with underprivileged families, ensuring everyone can celebrate with joy and dignity."
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
                    "item1": "Legal Documentation",
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
                "subtitle_page": "We're looking for like-minded partners. We're not just hiring employees; we're looking for future industry leaders.",
                "culture_headline": "At Wish Group, we don't just hire employees; we seek future industry leaders.",
                "culture_p1": "We provide not just a job, but a platform where you can realize your potential and build professional dignity. Here, we advocate for youth, vitality, and innovation, and are committed to bringing stability to every family through professional financial planning.",
                "culture_p2": "If you are passionate about the financial industry and eager to grow in a transparent and fair environment, we look forward to having you join us.",
                "why_title": "Why Choose Wish Group?",
                "pillar1_title": "Cross-domain Learning",
                "pillar1_desc": "Exposure to banking, taxation, law, and insurance financial solutions to cultivate composite talents.",
                "pillar2_title": "Mentorship Culture",
                "pillar2_desc": "Comprehensive Mentorship system to guide new joiners.",
                "pillar3_title": "Social Impact",
                "pillar3_desc": "Participate in 'Wish for Good' charity projects, giving back to society.",
                "growth_title": "Growth Expectations",
                "growth_stage1_title": "Stage 1: Introduction (Intern/Junior)",
                "growth_stage1_desc": "Mentorship led, learning financial foundations and compliance.",
                "growth_stage2_title": "Stage 2: Independent Consultant (Senior)",
                "growth_stage2_desc": "Mastering asset allocation, beginning to independently face high-end clients.",
                "growth_stage3_title": "Stage 3: Team Leader",
                "growth_stage3_desc": "Participating in company decisions, leading your own team.",
                "growth_stage4_title": "Ultimate Goal: Partner",
                "growth_stage4_desc": "Co-managing the brand, achieving career peak.",
                "title": "Join Us",
                "description": "Let us see your potential. Please submit your resume or portfolio as an attachment.",
                "form_title": "Send Us Your CV",
                "message_placeholder": "Any Message To Our Company",
                "cv_label": "Attach your CV Here",
                "choose_file": "Choose A File",
                "no_file_chosen": "No File Chosen",
                "position_default": "Select Position"
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
            "nav_wish_for_good": "Wish for Good",
            "nav_careers": "职业发展",
            "nav_join_us": "加入我们",
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
                "title": "Life at Wish Group",
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
                    "text": "15年来，我们一直致力于组织无偿献血活动，以支持当地医院并拯救生命。加入我们，一起做出改变。"
                },
                "story2": {
                    "text": "我们相信坚持的力量。“每月一善”倡议鼓励我们的团队和社区每个月至少做一件善事。"
                },
                "story3": {
                    "text": "在新年来临之际，我们与贫困家庭分享爱心和生活必需品，确保每个人都能有尊严地庆祝节日。"
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
                "subtitle_page": "我们正在寻找志同道合的合作伙伴。我们不只是招聘员工；我们在寻找未来的行业领袖。",
                "culture_headline": "在 Wish Group，我们不只是在招聘员工，而是在寻找未来的行业领导者。",
                "culture_p1": "我们提供的不只是一份工作，而是一个能让你发挥潜能、建立专业尊严的平台。在这里，我们崇尚年轻、活力与创新，并致力于通过专业的金融规划为每一个家庭带去安稳。",
                "culture_p2": "如果你对金融行业充满热情，渴望在透明、公平的环境中成长，我们期待你的加入。",
                "why_title": "为什么选择 Wish Group？",
                "pillar1_title": "跨领域学习",
                "pillar1_desc": "接触银行、税务、法律、保险等全方位金融方案，培养复合型人才。",
                "pillar2_title": "导师文化",
                "pillar2_desc": "完善的 Mentorship 制度，让新人不再迷茫。",
                "pillar3_title": "社会影响力",
                "pillar3_desc": "参与“Wish for Good”慈善项目，让工作不仅仅是为了赚钱，更是为了回馈。",
                "growth_title": "成长预期",
                "growth_stage1_title": "第 1 阶段：新人入职（Intern/Junior）",
                "growth_stage1_desc": "专属导师带路，学习金融基础与合规。",
                "growth_stage2_title": "第 2 阶段：独立顾问（Senior Consultant）",
                "growth_stage2_desc": "掌握资产配置，开始独立面对高端客户。",
                "growth_stage3_title": "第 3 阶段：团队领袖（Team Leader）",
                "growth_stage3_desc": "参与公司决策，带领自己的团队。",
                "growth_stage4_title": "终极目标：合作伙伴（Partner）",
                "growth_stage4_desc": "共同经营品牌，实现事业巅峰。",
                "title": "加入我们",
                "description": "加入我们的团队，共创未来！",
                "form_title": "发送您的简历",
                "message_placeholder": "是否有任何信息要传达给本公司？",
                "cv_label": "在此附上您的简历",
                "choose_file": "选择文件",
                "no_file_chosen": "未选择文件",
                "position_default": "选择职位"
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

            updateDynamicContent(translation);
        } else {
            console.error(`Translation for language ${lang} not found.`);
        }
    }

    // Handle nested keys like "hero.title"
    function getNestedTranslation(obj, key) {
        return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
    }

    // State for Testimonials (Needs to persist across language toggles)
    if (typeof window.activeTestimonialIndex === 'undefined') {
        window.activeTestimonialIndex = 0;
    }

    // This new function will be called every time the language changes.
    function updateDynamicContent(translations) {
        // ========== Wish Premium Slider & Popup Logic ==========
        // Update GLOBAL stories array with current language data
        window.wishStories = [
            {
                id: 1,
                title: getNestedTranslation(translations, "stories.story1_title") || "15 Years<br>One Mission: Save Lives",
                desc: (getNestedTranslation(translations, "stories.story1.text") || "For over 15 years, we have organized blood donation drives to support our local hospitals and save lives. Join us in our mission to make a difference.").substring(0, 150),
                fullText: getNestedTranslation(translations, "stories.story1.text") || "For over 15 years, we have organized blood donation drives to support our local hospitals and save lives. Join us in our mission to make a difference.",
                image: "images/bdonation.jpeg",
                video: "videos/donation.webm",
                poster: "images/bdonation.jpeg"
            },
            {
                id: 2,
                title: getNestedTranslation(translations, "stories.story2_title") || "One Kindness<br>A Month",
                desc: (getNestedTranslation(translations, "stories.story2.text") || "We believe in consistency. Our 'One Kindness A Month' initiative encourages our team and community to perform at least one charitable act every month.").substring(0, 150),
                fullText: getNestedTranslation(translations, "stories.story2.text") || "We believe in consistency. Our 'One Kindness A Month' initiative encourages our team and community to perform at least one charitable act every month.",
                image: "images/mdonation.jpeg",
                video: "videos/mdonation.webm",
                poster: "images/mdonation.jpeg"
            },
            {
                id: 3,
                title: getNestedTranslation(translations, "stories.story3_title") || "A New Year,<br>A Gift of Love",
                desc: (getNestedTranslation(translations, "stories.story3.text") || "As we welcome the New Year, we share love and essential supplies with underprivileged families, ensuring everyone can celebrate with joy and dignity.").substring(0, 150),
                fullText: getNestedTranslation(translations, "stories.story3.text") || "As we welcome the New Year, we share love and essential supplies with underprivileged families, ensuring everyone can celebrate with joy and dignity.",
                image: "images/ydonation.jpg",
                video: "videos/ydonation.webm",
                "poster": "images/ydonation.jpg"
            }
        ];

        // ========== Interactive Testimonials Logic ==========
        const testimonialsData = [
            {
                name: getNestedTranslation(translations, "testimonials.client1_name") || "Bobby Zhang",
                role: getNestedTranslation(translations, "testimonials.client1_role") || "Office Worker",
                text: getNestedTranslation(translations, "testimonials.client1_text") || "Everything was clear and professional - I trust them with my family's protection.",
                image: "images/client1.webp"
            },
            {
                name: getNestedTranslation(translations, "testimonials.client2_name") || "Emily Wong",
                role: getNestedTranslation(translations, "testimonials.client2_role") || "Housewife",
                text: getNestedTranslation(translations, "testimonials.client2_text") || "They explained everything so clearly. Now I even recommend them to friends.",
                image: "images/client2.webp"
            },
            {
                name: getNestedTranslation(translations, "testimonials.client3_name") || "Jason Hiew",
                role: getNestedTranslation(translations, "testimonials.client3_role") || "Office Worker",
                text: getNestedTranslation(translations, "testimonials.client3_text") || "I wasn't interested at first, but later I found them truly trustworthy.",
                image: "images/client3.webp"
            }
        ];

        // --- REFACTORED TESTIMONIALS (Persistent DOM + View Transitions) ---

        // 1. Init: Create DOM elements ONCE
        window.renderTestimonials = function () {
            const grid = document.getElementById("testimonialGrid");
            if (!grid) return;

            // Check if already initialized (persistent DOM)
            if (grid.children.length === testimonialsData.length) {
                // Just update visuals
                updateTestimonialsVisuals();
                return;
            }

            grid.innerHTML = ""; // Clear existing

            testimonialsData.forEach((item, index) => {
                const card = document.createElement('div');
                card.id = `t-card-${index}`;
                // Apply view-transition-name to ENABLE Magic Move
                card.style.viewTransitionName = `testimonial-${index}`;

                // Base classes
                card.className = "bg-white rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden";

                // Initial Visuals
                grid.appendChild(card);
            });

            updateTestimonialsVisuals();
        };

        // 2. Update: Changes classes and innerHTML based on state
        function updateTestimonialsVisuals() {
            const activeIndex = window.activeTestimonialIndex;

            testimonialsData.forEach((item, index) => {
                const card = document.getElementById(`t-card-${index}`);
                if (!card) return;

                const isActive = index === activeIndex;
                let layoutClasses = "";

                // --- LAYOUT LOGIC (Same as before) ---
                if (activeIndex === 0) {
                    if (isActive) layoutClasses = "md:col-span-8 md:row-span-2";
                    else layoutClasses = "md:col-span-4";
                } else if (activeIndex === 1) {
                    if (isActive) layoutClasses = "md:col-span-8 md:row-span-2";
                    else layoutClasses = "md:col-span-4";
                } else { // 2
                    if (isActive) layoutClasses = "md:col-span-12";
                    else layoutClasses = "md:col-span-6";
                }

                // Apply Classes (Preserve base styles)
                card.className = `${layoutClasses} bg-white rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden h-full cursor-${isActive ? 'default' : 'pointer'}`;

                // Apply Content
                if (isActive) {
                    // LARGE CONTENT
                    card.innerHTML = `
                <div class="flex flex-col justify-between h-full p-8 md:p-12 animate-fade-in">
                  <div>
                    <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e0f0ff] flex items-center justify-center text-[#0073e6] font-bold text-2xl md:text-3xl shadow-lg mb-8 md:mb-12 border-2 border-white">
                      ${item.name.charAt(0)}
                    </div>
                    <h3 class="text-[1.8rem] md:text-[2.2rem] font-bold text-[#1a1a1a] leading-tight mb-8">
                      ${item.text}
                    </h3>
                  </div>
                  <div>
                    <h4 class="text-[1.25rem] font-bold text-[#222] mb-1">${item.name}</h4>
                    <p class="text-[1rem] text-[#888] font-medium">${item.role}</p>
                  </div>
                </div>
            `;
                    card.onclick = null;
                } else {
                    // SMALL CONTENT
                    card.innerHTML = `
                <div class="flex flex-col justify-between h-full p-8 animate-fade-in relative group">
                  <div>
                    <span class="text-[60px] leading-none text-gray-100 font-serif block mb-2 transition-colors group-hover:text-gray-200">“</span>
                    <p class="text-[1.05rem] text-[#444] leading-relaxed mb-8 relative z-10">
                      ${item.text}
                    </p>
                  </div>
                  <div class="flex justify-end">
                    <div class="w-14 h-14 rounded-full bg-[#e0f0ff] flex items-center justify-center text-[#0073e6] font-bold text-xl shadow-md border-2 border-white">
                      ${item.name.charAt(0)}
                    </div>
                  </div>
                </div>
            `;
                    card.onclick = () => swapTestimonial(index);
                }
            });
        }

        // 3. Swap: Uses View Transitions API
        window.swapTestimonial = function (index) {
            if (index === window.activeTestimonialIndex) return;

            // Use Native View Transition if available
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    window.activeTestimonialIndex = index;
                    updateTestimonialsVisuals();
                });
            } else {
                // Fallback for older browsers
                window.activeTestimonialIndex = index;
                updateTestimonialsVisuals();
            }
        };

        // Function to calculate and lock the height of the ENTIRE GRID
        window.setFixedTestimonialHeight = function () {
            if (!grid) return;

            const clone = grid.cloneNode(false);
            clone.id = ''; // Remove ID
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.style.width = grid.offsetWidth + 'px';
            clone.style.zIndex = '-9999';
            // Clone classList ensures grid columns/gaps from Tailwind are applied
            document.body.appendChild(clone);

            let maxGridHeight = 0;

            // Simulate All 3 DISTINCT Scenarios
            [0, 1, 2].forEach(simulatedActiveIndex => {
                let tempHtml = "";
                testimonialsData.forEach((item, index) => {
                    const isActive = index === simulatedActiveIndex;
                    let classes = "";

                    if (simulatedActiveIndex === 0) {
                        if (isActive) classes = "md:col-span-8 md:row-span-2";
                        else classes = "md:col-span-4";
                    } else if (simulatedActiveIndex === 1) {
                        if (isActive) classes = "md:col-span-8 md:row-span-2";
                        else classes = "md:col-span-4";
                    } else { // 2
                        if (isActive) classes = "md:col-span-12";
                        else classes = "md:col-span-6";
                    }

                    if (isActive) {
                        tempHtml += `
                <div class="${classes} bg-white rounded-[40px] p-8 md:p-12 mb-0 h-full">
                  <div class="h-[200px]"></div> <!-- Mock height content -->
                  <h3>${item.text}</h3>
                </div>
            `;
                    } else {
                        tempHtml += `
                <div class="${classes} bg-white rounded-[32px] p-8 h-full">
                  <p>${item.text}</p>
                </div>
            `;
                    }
                });

                clone.innerHTML = tempHtml;
                const h = clone.offsetHeight;
                if (h > maxGridHeight) maxGridHeight = h;
            });


            document.body.removeChild(clone);
            // Add buffer
            maxGridHeight += 50;

            if (maxGridHeight > 0) {
                grid.style.minHeight = maxGridHeight + 'px';
            }
        };
        window.renderTestimonials();
        requestAnimationFrame(() => {
            window.setFixedTestimonialHeight();
            if (window.setFixedWishSliderHeight) window.setFixedWishSliderHeight();
        });
        window.addEventListener('resize', () => {
            window.setFixedTestimonialHeight();
            if (window.setFixedWishSliderHeight) window.setFixedWishSliderHeight();
        });


        // Use local reference for convenience in this scope if needed, but rely on global for popup
        const stories = window.wishStories;

        // DOM Elements
        const sliderTitle = document.getElementById("sliderTitle");
        const sliderDesc = document.getElementById("sliderDesc");
        const sliderImage = document.getElementById("sliderImage");
        const sliderIndicators = document.getElementById("sliderIndicators");
        const mainProgressBar = document.getElementById("mainProgressBar");
        const knowMoreBtn = document.getElementById("wishSliderMainBtn");
        const prevBtn = document.getElementById("prevSlide");
        const nextBtn = document.getElementById("nextSlide");

        // Popup Elements
        const storyPopup = document.getElementById("storyPopup");
        const closeStory = document.getElementById("closeStory");
        const storyVideo = document.getElementById("storyVideo");
        const popupTitle = document.getElementById("popupTitle");
        const storyTextContent = document.getElementById("storyText");

        // Slider State
        if (window.wishSliderInterval) clearInterval(window.wishSliderInterval);
        let activeIndex = 0;
        const autoPlayDuration = 5000; // 5 seconds per slide




        // --- NEW: Fix Wish Slider Height (Like Testimonials) ---
        window.setFixedWishSliderHeight = function () {
            const slider = document.getElementById("wishSlider");
            const stories = window.wishStories;
            if (!slider || !stories || stories.length === 0) return;

            // Desktop: Reset and let CSS handle it (md:h-[600px])
            if (window.innerWidth >= 768) {
                slider.style.height = '';
                slider.style.minHeight = '';
                return;
            }

            // Mobile: Calculate and LOCK height
            // Clone to measure max height
            const clone = slider.cloneNode(true);
            clone.id = ''; // Prevent duplicate ID
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.style.width = slider.offsetWidth + 'px';
            clone.style.height = 'auto'; // allow expansion for measurement
            clone.style.transition = 'none';
            clone.style.zIndex = '-9999';

            document.body.appendChild(clone);

            // Select elements inside clone
            const cloneTitle = clone.querySelector("#sliderTitle");
            const cloneDesc = clone.querySelector("#sliderDesc");

            let maxH = 0;

            stories.forEach(story => {
                if (cloneTitle) cloneTitle.innerHTML = story.title;
                if (cloneDesc) cloneDesc.innerHTML = story.desc;

                const h = clone.offsetHeight;
                if (h > maxH) maxH = h;
            });

            document.body.removeChild(clone);

            if (maxH > 0) {
                // Apply FIXED height + buffer to prevent any movement
                slider.style.height = (maxH + 20) + 'px';
                slider.style.minHeight = ''; // Clear minHeight to avoid conflicts
            }
        };


        function initSlider() {
            if (!sliderIndicators) return;
            renderIndicators();
            // Force first update immediately without animation for initial load
            const story = stories[activeIndex];

            if (sliderTitle) {
                sliderTitle.innerHTML = story.title;
                sliderTitle.style.opacity = '1';
                sliderTitle.style.transform = 'translateY(0)';
            }
            if (sliderDesc) {
                sliderDesc.innerHTML = story.desc;
                sliderDesc.style.opacity = '1';
                sliderDesc.style.transform = 'translateY(0)';
            }
            sliderImage.src = story.image;

            sliderImage.style.opacity = '1';
            sliderImage.style.transform = 'translateX(0)';

            // Sync Global Active Index
            window.wishSliderActiveIndex = activeIndex;

            updateIndicators();
            startAutoPlay();
        }

        function updateSlice(index) {
            activeIndex = index;
            const story = stories[activeIndex];

            // Sync Global Active Index
            window.wishSliderActiveIndex = activeIndex;

            // 1. Animate Out (Image Slide Left, Text Fade Out Up)
            sliderImage.style.transition = 'all 0.4s ease-in-out';
            sliderImage.style.opacity = '0';
            sliderImage.style.transform = 'translateX(-50px)';

            if (sliderTitle) {
                sliderTitle.style.opacity = '0';
                sliderTitle.style.transform = 'translateY(-10px)';
            }
            if (sliderDesc) {
                sliderDesc.style.opacity = '0';
                sliderDesc.style.transform = 'translateY(-10px)';
            }

            setTimeout(() => {
                // 2. Update Content
                sliderImage.src = story.image;
                if (sliderTitle) sliderTitle.innerHTML = story.title;
                if (sliderDesc) sliderDesc.innerHTML = story.desc;

                // 3. Prepare for Slide In (Image Jump Right, Text Jump Down)
                sliderImage.style.transition = 'none';
                sliderImage.style.transform = 'translateX(50px)';

                if (sliderTitle) sliderTitle.style.transform = 'translateY(10px)';
                if (sliderDesc) sliderDesc.style.transform = 'translateY(10px)';

                // Force Reflow
                void sliderImage.offsetWidth;

                // 4. Slide In to Center (Image Slide Left, Text Fade In Up)
                sliderImage.style.transition = 'all 0.4s ease-in-out';
                sliderImage.style.opacity = '1';
                sliderImage.style.transform = 'translateX(0)';

                if (sliderTitle) {
                    sliderTitle.style.opacity = '1';
                    sliderTitle.style.transform = 'translateY(0)';
                }
                if (sliderDesc) {
                    sliderDesc.style.opacity = '1';
                    sliderDesc.style.transform = 'translateY(0)';
                }

                updateIndicators();
            }, 400);
        }

        function renderIndicators() {
            if (!sliderIndicators) return;
            sliderIndicators.innerHTML = '';
            stories.forEach((story, index) => {
                const item = document.createElement('div');
                // Clean text-only list item
                item.className = `cursor-pointer transition-all duration-300 flex items-center group py-2`;
                item.onclick = () => {
                    updateSlice(index);
                    resetAutoPlay();
                };

                item.innerHTML = `
                    <div class="text-base text-gray-500 group-hover:text-[#1a1a1a] transition-colors font-medium select-none">
                        ${story.title.replace(/<br>/g, ' ')}
                    </div>
                `;
                sliderIndicators.appendChild(item);
            });
        }

        function updateIndicators() {
            if (!sliderIndicators) return;

            // 1. Update List Styles
            const indicators = sliderIndicators.children;
            Array.from(indicators).forEach((ind, i) => {
                const text = ind.querySelector('.text-base');

                if (i === activeIndex) {
                    // Active Item (Text Only)
                    text.classList.remove('text-gray-400', 'font-medium');
                    text.classList.add('text-[#1a1a1a]', 'font-bold');
                } else {
                    // Inactive Item
                    text.classList.add('text-gray-400', 'font-medium');
                    text.classList.remove('text-[#1a1a1a]', 'font-bold');
                }
            });

            // 2. Animate Main Progress Bar
            if (mainProgressBar) {
                mainProgressBar.style.transition = 'none';
                mainProgressBar.style.width = '0%';

                // Force Reflow
                void mainProgressBar.offsetWidth;

                mainProgressBar.style.transition = `width ${autoPlayDuration}ms linear`;
                mainProgressBar.style.width = '100%';
            }
        }

        function startAutoPlay() {
            if (window.wishSliderInterval) clearInterval(window.wishSliderInterval);
            window.wishSliderInterval = setInterval(() => {
                let nextIndex = activeIndex + 1;
                if (nextIndex >= stories.length) nextIndex = 0;
                updateSlice(nextIndex);
            }, autoPlayDuration);
        }

        function resetAutoPlay() {
            startAutoPlay();
        }

        // Event Listeners
        if (prevBtn) {
            prevBtn.onclick = () => {
                let newIndex = activeIndex - 1;
                if (newIndex < 0) newIndex = stories.length - 1;
                updateSlice(newIndex);
                resetAutoPlay();
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                let newIndex = activeIndex + 1;
                if (newIndex >= stories.length) newIndex = 0;
                updateSlice(newIndex);
                resetAutoPlay();
            };
        }



        // Close handler is now delegated globally at the bottom of the file
        // to ensure it works regardless of DOM updates.

        // Initialize
        initSlider();


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
    // const backToTopButton = document.getElementById('backToTop'); // Removed

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

        if (header) {
            if (scrollTop > lastScrollTop) {
                // header.style.transform = 'translateY(-100%)'; // Disabled by user request
                header.style.transform = 'translateY(0)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } // ensure we don't crash if header variable is missing

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Back to top button // Removed
        // (End of scroll listener logic)
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


    // ========== CV Upload Functionality (Mobile & Desktop) ==========

    // Global Success Modal Elements (Shared)
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

    // Reusable setup function
    function setupCVForm(formId, inputId, labelId) {
        const joinForm = document.getElementById(formId);
        const cvInput = document.getElementById(inputId);
        const fileChosenSpan = document.getElementById(labelId);

        if (joinForm && cvInput && fileChosenSpan) {
            // When a file is selected
            cvInput.addEventListener("change", () => {
                if (cvInput.files.length > 0) {
                    fileChosenSpan.textContent = cvInput.files[0].name;
                    fileChosenSpan.classList.remove("text-gray-500", "italic");
                    fileChosenSpan.classList.add("text-blue-600", "font-medium");
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

                const formData = new FormData(joinForm);

                // Real backend submission:
                const submitBtn = joinForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                fetch("submit_cv.php", {
                    method: "POST",
                    body: formData,
                })
                    .then(response => response.text())
                    .then(result => {
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
                    })
                    .finally(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    });
            });
        }
    }

    // Initialize both forms
    setupCVForm("joinForm", "cv_upload", "file-chosen");              // Desktop
    setupCVForm("joinFormMobile", "cv_upload_mobile", "file-chosen-mobile"); // Mobile

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

                // 1. Reset ALL tabs to inactive style
                tabs.forEach((btn) => {
                    btn.classList.remove("bg-indigo-600", "text-white");
                    btn.classList.add("bg-white", "text-indigo-600");
                });

                // 2. Set CURRENT tab to active style
                tab.classList.remove("bg-white", "text-indigo-600");
                tab.classList.add("bg-indigo-600", "text-white");

                const category = tab.getAttribute("data-category");
                updateCarousel(category);
                currentIndex = 0;
            });
        });

        // Initial load - Force click the first tab or the explicit Charity tab
        // We use a small timeout to ensure the DOM is fully ready if script runs early
        setTimeout(() => {
            // Find "Charity" tab specifically if possible, else first tab
            const charityTab = Array.from(tabs).find(t => t.getAttribute('data-category') === 'charity');
            if (charityTab) {
                charityTab.click();
            } else if (tabs.length > 0) {
                tabs[0].click();
            }
        }, 100);

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

            // Real backend submission:
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

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
                })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
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

    // Backup Event Listener (Triple Redundancy)
    // DELEGATION: Listen on document for the new ID
    document.addEventListener("click", function (e) {
        const target = e.target.closest("#wishSliderMainBtn");
        if (target) {
            console.log("Delegated click detected on #wishSliderMainBtn");
            e.preventDefault();
            e.stopPropagation(); // Stop bubbling to prevent interference
            window.handleKnowMoreClick();
        }

        // DELEGATION: Close Popup Button
        const closeBtn = e.target.closest("#closeStory");
        if (closeBtn) {
            console.log("Delegated click on #closeStory");
            e.preventDefault();
            window.closeWishStory();
        }

        // DELEGATION: Background Click (Click not on content)
        const popup = e.target.closest("#storyPopup");
        // If clicked on popup container but NOT on inner content (which would bubble up)
        // We check if the actual *target* is the popup background itself.
        if (e.target.id === "storyPopup") {
            console.log("Delegated click on popup background");
            window.closeWishStory();
        }
    });

    // ========== Floating Action Menu Logic ==========
    const floatingWrapper = document.getElementById("floatingWrapper");
    const floatingToggle = document.getElementById("floatingToggle");
    const floatingMenu = document.getElementById("floatingMenu");
    const floatingToggleIcon = document.getElementById("floatingToggleIcon");

    // Scroll Visibility (Applied to the Wrapper)
    function toggleFloatingWrapper() {
        if (!floatingWrapper) return;

        // If set to always visible (e.g., on contact page), skip hiding logic
        const isAlwaysVisible = floatingWrapper.getAttribute("data-always-visible") === "true";

        if (isAlwaysVisible || window.scrollY > 300) {
            // Only toggle visibility, keep wrapper pointer-events-none so it doesn't block clicks
            floatingWrapper.classList.remove("opacity-0", "translate-y-10");
        } else {
            floatingWrapper.classList.add("opacity-0", "translate-y-10");
            // Also close menu when hiding
            if (floatingMenu) {
                floatingMenu.classList.add("opacity-0", "translate-y-4", "scale-95", "pointer-events-none");
                floatingMenu.classList.remove("pointer-events-auto");
                // Reset icon to headset
                if (floatingToggleIcon) {
                    floatingToggleIcon.classList.remove("fa-xmark");
                    floatingToggleIcon.classList.add("fa-headset");
                }
            }
        }
    }

    if (floatingWrapper) {
        window.addEventListener("scroll", toggleFloatingWrapper);
    }

    // Toggle Click Logic (Mobile)
    // Toggle Click Logic (Mobile) - Global Function for Robustness
    window.toggleMobileMenu = function () {
        console.log("Global Toggle Fired");

        // Ensure elements exist
        const menu = document.getElementById("floatingMenu");
        const icon = document.getElementById("floatingToggleIcon");

        if (!menu || !icon) {
            console.error("Menu or Icon not found in toggle function");
            return;
        }

        const isHidden = menu.classList.contains("opacity-0");

        if (isHidden) {
            // Expanding: Show menu
            console.log("Opening Menu");
            menu.classList.remove("opacity-0", "translate-y-4", "scale-95", "pointer-events-none");
            menu.classList.add("pointer-events-auto");
            // Swap icon to X
            icon.classList.remove("fa-headset");
            icon.classList.add("fa-xmark");
        } else {
            // Collapsing: Hide menu
            console.log("Closing Menu");
            menu.classList.add("opacity-0", "translate-y-4", "scale-95", "pointer-events-none");
            menu.classList.remove("pointer-events-auto");
            // Swap icon back to headset
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-headset");
        }
    };
});