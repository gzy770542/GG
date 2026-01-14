document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link, .footer-join-link');

    // Check for query params to toggle form on load (e.g. from external pages)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form') === 'join') {
        // Use timeout to ensure elements are ready and toggleForm is available
        setTimeout(() => {
            if (typeof toggleForm === 'function') {
                toggleForm('join');
                // Scroll to contact section if hash is present
                if (window.location.hash === '#contact') {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const headerOffset = header ? header.offsetHeight : 0;
                        const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }, 500);
    }

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
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navMenu = document.querySelector("nav");
                    const hamburger = document.querySelector(".hamburger");
                    const body = document.body;

                    if (navMenu && navMenu.classList.contains("show")) {
                        navMenu.classList.remove("show"); // Opacity/Visibility handles hide

                        if (hamburger) hamburger.classList.remove("active");
                        if (body) body.classList.remove("no-scroll");

                        console.log("Mobile menu auto-closed");
                    }
                }
            } else {
                console.warn("Target element not found:", targetId);
            }
        });
    });



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
        const hamburger = document.querySelector('.hamburger');
        const body = document.body;

        if (nav && hamburger) {
            // Toggle classes for animation and visibility
            nav.classList.toggle('show');
            hamburger.classList.toggle('active');
            body.classList.toggle('no-scroll');

            console.log("Toggled Mobile Menu. Show:", nav.classList.contains('show'));
        } else {
            console.error("Nav or Hamburger element not found!");
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
            "nav_home": "Home",
            "nav_about": "About Us",
            "nav_culture": "Company",
            "nav_charity": "Charity",
            "nav_services": "Our Services",
            "nav_moments": "Culture",
            "nav_testimonials": "Testimonials",
            "nav_contact": "Contact Us",
            "nav_wish_for_good": "Wish for Good",
            "nav_careers": "Careers",
            "nav_join_us": "Join Us",
            "nav_find_us": "Find Us",
            "nav_privacy": "Privacy Policy",
            "privacy": {
                "title": "Privacy Policy & Terms",
                "intro_title": "1. Introduction",
                "intro_text": "Wish Group Resources (\"the Company\", \"we\", \"us\", or \"our\") values the privacy of our clients. This Privacy Policy outlines how we collect, process, use, and disclose your personal data in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia. By engaging with our services, you consent to the practices described in this policy.",
                "collect_title": "2. Nature of Personal Data",
                "collect_text": "To provide our one-stop financial solutions, we may collect a comprehensive range of information, including but not limited to:",
                "collect_list_1": "<strong>Identification:</strong> Full name, NRIC/Passport number, gender, and nationality.",
                "collect_list_2": "<strong>Contact Details:</strong> Residential and mailing addresses, phone numbers, and email addresses.",
                "collect_list_3": "<strong>Financial Information:</strong> Income statements, employment history, bank account details, and credit history.",
                "collect_list_4": "<strong>Special Categories:</strong> Medical history (for insurance), family tree details (for Will writing), and asset inventory.",
                "purpose_title": "3. Purpose of Collection",
                "purpose_text": "Your data is processed for the following purposes:",
                "purpose_list_1": "<strong>Financial Assessment:</strong> To evaluate your financial health and provide tailored risk management advice.",
                "purpose_list_2": "<strong>Policy & Contract Administration:</strong> To facilitate applications for insurance, investment products, and legal documentation.",
                "purpose_list_3": "<strong>Legal Compliance:</strong> To verify your identity and prevent fraudulent activities or money laundering.",
                "purpose_list_4": "<strong>Estate Planning:</strong> To draft and manage Wills, Trusts, and inheritance-related documents.",
                "disclosure_title": "4. Disclosure to Third Parties",
                "disclosure_text": "In the course of providing our services, we may disclose your information to:",
                "disclosure_list_1": "<strong>Insurance Partners:</strong> Authorized insurance providers (e.g., Great Eastern) for underwriting purposes.",
                "disclosure_list_2": "<strong>Legal & Trust Entities:</strong> Law firms and trust companies involved in your estate planning.",
                "disclosure_list_3": "<strong>Regulatory Bodies:</strong> Bank Negara Malaysia, Inland Revenue Board (LHDN), or other government agencies as required by law.",
                "disclosure_list_4": "<strong>Service Providers:</strong> IT support, auditors, and professional advisors.",
                "security_title": "5. Data Security & Retention",
                "security_text": "We implement advanced administrative and technical security measures (such as encryption and restricted access) to safeguard your personal data. Your information will be retained only for as long as necessary to fulfill the purposes outlined above or to comply with statutory requirements (typically 7 years for financial records).",
                "rights_title": "6. Your Rights",
                "rights_text": "As a data subject under the PDPA, you have the right to request access to the personal data we hold about you, request correction of inaccurate or outdated information, or withdraw consent for marketing communications or data processing.",
                "contact_title": "7. Contact Us",
                "contact_text": "If you have any questions regarding this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer:",
                "contact_email": "Email: info@wishgroup.com",
                "contact_address": "Office Address: 32A-1, Jalan Nautika B U20/B, Pusat Komersial TSB, 47000 Shah Alam, Selangor"
            },
            "hero": {
                "title": "Your One-Stop Financial Partner",
                "subtitle": "All-in-one solution for growth and protection under one roof",
                "getStarted": "Contact Us Today",
                "how_it_works": "About Us"
            },
            "about": {
                "title": "About Us",
                "intro_text": "Established in 2013, Wish Group Resources is Malaysia's leading one-stop financial hub. We provide expert banking, tax, investment, and estate planning services to help thousands of clients grow and secure their wealth for future generations.",
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
                "team_desc1": "ðŸ“ Pickleball",
                "team_desc2": "Outdoor team bonding activities.",
                "training_desc1": "ðŸ’¡ Learn, Laugh & Level Up",
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
                "trusted_partner": "(Trusted Partner)",
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
                    "item3": "Critical Illness"
                },
                "legal": {
                    "title": "Legal Advisory",
                    "item1": "Legal Documentation",
                    "item2": "Contract review",
                    "item3": "Will writing"
                },
                "tax": {
                    "title": "Tax Planning",
                    "item1": "Personal Tax",
                    "item2": "Business Tax",
                    "item3": "Tax optimization"
                },
                "investment": {
                    "title": "Investment",
                    "item1": "Portfolio design",
                    "item2": "Unit Trusts",
                    "item3": "Retirement planning"
                },
                "estate": {
                    "title": "Estate Planning",
                    "item1": "Will Planning",
                    "item2": "Asset distribution",
                    "item3": "Inheritance protection"
                }
            },
            "contact": {
                "title_page": "Contact Us",
                "subtitle_page": "We'd love to hear from you.",
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
                "title_page": "Join Our Company",
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
                "growth_stage4_title": "Final Stage: Partner",
                "growth_stage4_desc": "Co-managing the brand, achieving career peak.",
                "growth_stage1_desc_mobile": "Kickstart your financial career with professional mentorship. Focus on mastering essential products, building client trust, and establishing a solid professional foundation.",
                "growth_stage2_desc_mobile": "Achieve professional independence by managing diverse high-net-worth portfolios. Deliver expert financial solutions and build your personal brand in the industry.",
                "growth_stage3_desc_mobile": "Empower others to succeed by leading a high-performance team. Focus on talent recruitment, management, and enjoying rewarding overriding commissions as your team grows.",
                "growth_stage4_desc_mobile": "Reach the pinnacle of your career as a strategic business partner. Participate in corporate profit-sharing, equity ownership, and shape the future vision of Wish Group.",
                "title": "Join Us",
                "description": "Let us see your potential. Please submit your resume or portfolio as an attachment.",
                "form_title": "Send Us Your CV",
                "message_placeholder": "Any Message To Our Company",
                "cv_label": "Attach your CV Here",
                "choose_file": "Choose A File",
                "upload_title": "Upload CV (PDF/DOCX)",
                "no_file_chosen": "No File Chosen",
                "position_default": "Select Position",
                "our_office": "Our Office",
                "email_us": "Email Us",
                "have_questions": "Have questions?",
                "contact_support": "Contact Support"
            },
            "footer": {
                "tagline": "Your One-Stop Financial Partner. <br>All-in-one solution for growth and protection.",
                "address": "32A-1, Jalan Nautika B U20/B,<br />Pusat Komersial TSB,<br />47000 Shah Alam, Selangor",
                "details": "Details",
                "follow_us": "FOLLOW US",
                "copyright": "&copy;2025 Wish Group. All rights reserved."
            }
        },
        "zh": {
            "page_title": "Wish Group",
            "nav_home": "首页",
            "nav_about": "关于我们",
            "nav_culture": "公司",
            "nav_charity": "慈善公益",
            "nav_services": "我们的服务",
            "nav_moments": "文化",
            "nav_testimonials": "客户评价",
            "nav_contact": "联系我们",
            "nav_wish_for_good": "Wish for Good",
            "nav_careers": "职业发展",
            "nav_join_us": "加入我们",
            "nav_find_us": "找到我们",
            "nav_privacy": "隐私政策",
            "privacy": {
                "title": "隐私政策与条款",
                "intro_title": "1. 序言",
                "intro_text": "Wish Group Resources（“本公司”或“我们”）高度重视客户的隐私。本隐私政策概述了我们如何根据马来西亚 2010年个人资料保护法 (PDPA) 收集、处理、使用和披露您的个人资料。通过使用我们的服务，您同意本政策中描述的做法。",
                "collect_title": "2. 收集资料的性质",
                "collect_text": "为了提供一站式金融解决方案，我们可能会收集以下信息，包括但不限于：",
                "collect_list_1": "<strong>身份识别：</strong> 姓名、身份证/护照号码、性别、国籍。",
                "collect_list_2": "<strong>联系方式：</strong> 住址、电话、电邮。",
                "collect_list_3": "<strong>财务信息：</strong> 收入证明、职业背景、银行账户及信用记录。",
                "collect_list_4": "<strong>特殊类别：</strong> 病史（保险用途）、家族成员信息（遗嘱用途）及资产清单。",
                "purpose_title": "3. 收集之目的",
                "purpose_text": "您的数据处理目的如下：",
                "purpose_list_1": "<strong>财务评估：</strong> 评估财务状况并提供定制的风险管理建议。",
                "purpose_list_2": "<strong>行政管理：</strong> 处理保险申请、投资产品及法律文件。",
                "purpose_list_3": "<strong>法律合规：</strong> 核实身份并预防欺诈或洗黑钱。",
                "purpose_list_4": "<strong>遗产规划：</strong> 撰写及管理遗嘱、信托及继承相关文件。",
                "disclosure_title": "4. 第三方披露",
                "disclosure_text": "在提供服务过程中，我们可能会将您的信息披露给：",
                "disclosure_list_1": "<strong>保险合作伙伴：</strong> 授权保险提供商（如：Great Eastern）用于承保目的。",
                "disclosure_list_2": "<strong>法律与信托机构：</strong> 参与您的遗产规划的律师事务所和信托公司。",
                "disclosure_list_3": "<strong>监管机构：</strong> 马来西亚国家银行、内陆税收局（LHDN）或法律要求的其他政府机构。",
                "disclosure_list_4": "<strong>服务供应商：</strong> IT支持、审计师和专业顾问。",
                "security_title": "5. 数据安全与保留",
                "security_text": "我们实施先进的技术安全措施（如加密和访问限制）以保护您的数据。您的信息仅在必要期间或法律要求（通常为7年财务记录要求）内保留。",
                "rights_title": "6. 您的权利",
                "rights_text": "作为 PDPA 下的数据主体，您有权要求访问我们持有的个人资料、要求更正不准确或过时的信息、撤回对营销或数据处理的同意。",
                "contact_title": "7. 联系我们",
                "contact_text": "若您对本政策有任何疑问，请联系我们的数据保护专员：",
                "contact_email": "电邮: info@wishgroup.com",
                "contact_address": "地址: 32A-1, Jalan Nautika B U20/B, Pusat Komersial TSB, 47000 Shah Alam, Selangor"
            },
            "hero": {
                "title": "您的一站式金融合作伙伴",
                "subtitle": "一站式增长与保障解决方案",
                "getStarted": "立即联系我们",
                "how_it_works": "了解我们"
            },
            "about": {
                "title": "关于我们",
                "intro_text": "成立于2013年，Wish Group Resources 是马来西亚领先的一站式金融枢纽。我们提供专业的银行、税务、投资和遗产规划服务，帮助成千上万的客户实现财富增长并为后代提供保障。",
                "mission_title": "我们的使命",
                "mission_text": "通过全面、个性化的金融和保险规划，为客户提供安心保障，与客户建立长期信任，并秉持最高水平的专业精神和道德标准。",
                "vision_title": "我们的愿景",
                "vision_text": "成为马来西亚领先的年轻金融服务机构——客户和商业领袖的首选合作伙伴。我们培养的是领袖，而不仅仅是员工。",
                "values_title": "核心价值观",
                "values_text_paragraph": "我们是马来西亚一家年轻的金融代理机构，致力于成为客户和未来领袖的首选。",
                "value1": "感恩",
                "value2": "团队精神",
                "value3": "卓越",
                "value4": "远见",
                "value5": "奉献"
            },
            "events": {
                "title": "Wish Group 的生活",
                "tab_celebration": "庆典",
                "tab_team": "团队建设",
                "tab_training": "培训",
                "celebration_desc1": "Wish 年度晚宴",
                "team_desc1": "🏓 匹克球",
                "team_desc2": "户外团队凝聚活动。",
                "training_desc1": "💡 学习、欢笑与提升",
                "tab_charity": "慈善",
                "charity_desc1": "慈善活动"
            },
            "testimonials": {
                "title": "为何客户信任我们",
                "subtitle": "诚实的建议，专业的指导",
                "client1_name": "Bobby Zhang",
                "client1_role": "上班族",
                "client1_text": "“一切都很清晰且专业——我放心把家人的保障交给他们。”",
                "client2_name": "Emily Wong",
                "client2_role": "家庭主妇",
                "client2_text": "“他们解释得非常清楚。现在通过了解，我甚至会推荐给朋友。”",
                "client3_name": "Jason Hiew",
                "client3_role": "上班族",
                "client3_text": "“一开始我不太感兴趣，但后来发现他们真的很值得信赖。”"
            },
            "stories": {
                "title": "善举",
                "story1_title": "15年<br>同一使命：拯救生命",
                "know_more": "了解更多",
                "story2_title": "一月一善",
                "story3_title": "新的一年，<br>爱的礼物",
                "story1": {
                    "text": "15年来，我们一直组织献血活动，支持当地医院并拯救生命。加入我们的使命，一起创造改变。"
                },
                "story2": {
                    "text": "我们相信坚持的力量。“一月一善”计划鼓励我们的团队和社区每个月至少做一件善事。"
                },
                "story3": {
                    "text": "在迎接新年之际，我们与贫困家庭分享爱心和生活必需品，确保每个人都能带着快乐和尊严庆祝节日。"
                }
            },
            "story_popup": {
                "video_unsupported": "您的浏览器不支持该视频标签。",
                "speed_label": "速度："
            },
            "services": {
                "title": "我们的服务",
                "trusted_partner": "(值得信赖的合作伙伴)",
                "banking": {
                    "title": "银行与金融",
                    "item1": "贷款咨询",
                    "item2": "按揭规划",
                    "item3": "债务重组"
                },
                "risk": {
                    "title": "风险管理",
                    "item1": "保险分析",
                    "item2": "保障规划",
                    "item3": "重大疾病保障"
                },
                "legal": {
                    "title": "法律咨询",
                    "item1": "法律文件",
                    "item2": "合同审查",
                    "item3": "遗嘱撰写"
                },
                "tax": {
                    "title": "税务规划",
                    "item1": "个人税务",
                    "item2": "企业税务",
                    "item3": "税务优化"
                },
                "investment": {
                    "title": "投资",
                    "item1": "投资组合设计",
                    "item2": "信托基金",
                    "item3": "退休规划"
                },
                "estate": {
                    "title": "遗产规划",
                    "item1": "遗嘱规划",
                    "item2": "资产分配",
                    "item3": "继承保障"
                }
            },
            "contact": {
                "title_page": "联系我们",
                "subtitle_page": "我们期待您的来信。",
                "title": "联系我们",
                "description": "留下您的详细信息，我们会尽快与您联系！",
                "form_title": "保持联系",
                "category_label": "感兴趣的类别",
                "category_option_default": "选择一个选项",
                "category_option1": "银行解决方案",
                "category_option2": "风险管理",
                "category_option3": "法律咨询",
                "category_option4": "税务规划",
                "category_option5": "投资规划",
                "category_option6": "遗产规划",
                "category_option_other": "其他",
                "other_category_placeholder": "请注明"
            },
            "form": {
                "name_placeholder": "您的姓名",
                "email_placeholder": "您的邮箱",
                "phone_placeholder": "电话号码",
                "message_placeholder_contact": "留言（选填）",
                "submit_btn": "提交"
            },
            "join": {
                "story6": {
                    "text": "故事6内容..."
                },
                "title_page": "加入我们",
                "subtitle_page": "我们正在寻找志同道合的合作伙伴。我们不只是招聘员工；我们在寻找未来的行业领袖。",
                "culture_headline": "在 Wish Group，我们不仅雇佣员工；我们寻找未来的行业领袖。",
                "culture_p1": "我们提供的不仅仅是一份工作，而是一个您可以发挥潜力并建立职业尊严的平台。在这里，我们倡导青春、活力和创新，并致力于通过专业的金融规划为每个家庭带来稳定。",
                "culture_p2": "如果您对金融行业充满热情，并渴望在透明公平的环境中成长，我们期待您的加入。",
                "why_title": "为何选择 Wish Group？",
                "pillar1_title": "跨领域学习",
                "pillar1_desc": "接触银行、税务、法律和保险金融解决方案，培养复合型人才。",
                "pillar2_title": "导师文化",
                "pillar2_desc": "全面的导师制度，指导新成员。",
                "pillar3_title": "社会影响",
                "pillar3_desc": "参与“Wish for Good”慈善项目，回馈社会。",
                "growth_title": "成长预期",
                "growth_stage1_title": "阶段 1：入门（实习/初级）",
                "growth_stage1_desc": "导师带领，学习金融基础和合规。",
                "growth_stage2_title": "阶段 2：独立顾问（高级）",
                "growth_stage2_desc": "掌握资产配置，开始独立面对高端客户。",
                "growth_stage3_title": "阶段 3：团队负责人",
                "growth_stage3_desc": "参与公司决策，带领自己的团队。",
                "growth_stage4_title": "最终目标：合伙人",
                "growth_stage4_desc": "共同管理品牌，达到职业巅峰。",
                "growth_stage1_desc_mobile": "通过专业导师指导开启您的金融职业生涯。专注于掌握核心产品，建立客户信任，并打下坚实的专业基础。",
                "growth_stage2_desc_mobile": "通过管理多元化的高净值投资组合实现职业独立。提供专业的金融解决方案，并在行业中建立您的个人品牌。",
                "growth_stage3_desc_mobile": "通过带领高绩效团队成就他人。专注于人才招聘、管理，并随着团队壮大享受丰厚的管理佣金。",
                "growth_stage4_desc_mobile": "作为战略商业合伙人达到职业巅峰。参与公司利润分享、股权所有，共同塑造 Wish Group 的未来愿景。",
                "title": "加入我们",
                "description": "让我们看到您的潜力。请作为附件提交您的简历或作品集。",
                "form_title": "发送您的简历",
                "message_placeholder": "给公司的留言",
                "cv_label": "在此附上简历",
                "choose_file": "选择文件",
                "upload_title": "上载简历 (PDF/DOCX)",
                "no_file_chosen": "未选择文件",
                "position_default": "选择职位",
                "our_office": "地址",
                "email_us": "邮箱",
                "have_questions": "如有任何问题？",
                "contact_support": "联系我们"
            },
            "footer": {
                "tagline": "您的一站式金融合作伙伴。<br>一站式增长与保障解决方案。",
                "address": "32A-1, Jalan Nautika B U20/B,<br />Pusat Komersial TSB,<br />47000 Shah Alam, Selangor",
                "details": "详情",
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
                name: getNestedTranslation(translations, "testimonials.client3_name") || "Jason Hiew",
                role: getNestedTranslation(translations, "testimonials.client3_role") || "Office Worker",
                text: getNestedTranslation(translations, "testimonials.client3_text") || "I wasn't interested at first, but later I found them truly trustworthy.",
                image: "images/jason_hiew.jpg"
            },
            {
                name: getNestedTranslation(translations, "testimonials.client1_name") || "Bobby Zhang",
                role: getNestedTranslation(translations, "testimonials.client1_role") || "Office Worker",
                text: getNestedTranslation(translations, "testimonials.client1_text") || "Everything was clear and professional - I trust them with my family's protection.",
                image: "images/bobby_zhang.jpg"
            },
            {
                name: getNestedTranslation(translations, "testimonials.client2_name") || "Emily Wong",
                role: getNestedTranslation(translations, "testimonials.client2_role") || "Housewife",
                text: getNestedTranslation(translations, "testimonials.client2_text") || "They explained everything so clearly. Now I even recommend them to friends.",
                image: "images/emily_wong.jpg"
            }
        ];

        // --- INIT WISH SLIDER IF DATA READY ---
        if (window.initSlider) {
            window.initSlider();
        }

        // --- REFACTORED TESTIMONIALS (Persistent DOM + View Transitions) ---

        // 1. Init: Create DOM elements ONCE (With BOTH layouts inside)
        window.renderTestimonials = function () {
            const grid = document.getElementById("testimonialGrid");
            if (!grid) return;

            // Check if already initialized (persistent DOM)
            // Check if already initialized (persistent DOM)
            if (grid.children.length === testimonialsData.length) {
                // UPDATE TEXT CONTENT FOR LANGUAGE SWITCH
                testimonialsData.forEach((item, index) => {
                    const card = document.getElementById(`t-card-${index}`);
                    if (card) {
                        const largeContent = card.querySelector('.large-content');
                        const smallContent = card.querySelector('.small-content');

                        // Update Large
                        if (largeContent) {
                            const img = largeContent.querySelector('img');
                            if (img) img.alt = item.name;

                            const h3 = largeContent.querySelector('h3');
                            if (h3) h3.innerHTML = item.text;

                            const h4 = largeContent.querySelector('h4');
                            if (h4) h4.textContent = item.name;

                            const pRole = largeContent.querySelector('p');
                            if (pRole) pRole.textContent = item.role;
                        }

                        // Update Small
                        if (smallContent) {
                            const pText = smallContent.querySelector('.text-\\[1\\.05rem\\]'); // Specific selector for text
                            if (pText) pText.innerHTML = item.text;

                            // Fallback if specific class absent (though it is there line 828)
                            // Note: line 828 class is "text-[1.05rem] text-[#444] leading-relaxed mb-8 relative z-10"

                            const img = smallContent.querySelector('img');
                            if (img) img.alt = item.name;
                        }
                    }
                });

                // Just update visuals
                updateTestimonialsVisuals();
                return;
            }

            grid.innerHTML = ""; // Clear existing

            testimonialsData.forEach((item, index) => {
                const card = document.createElement('div');
                card.id = `t-card-${index}`;
                // Apply view-transition-name to ENABLE Magic Move (Desktop Only mainly)
                card.style.viewTransitionName = `testimonial-${index}`;

                // Base classes
                card.className = "bg-white rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden";

                // Insert BOTH Views (Small & Large)
                // Insert BOTH Views (Small & Large)
                card.innerHTML = `
                    <!-- LARGE CONTENT (Transition Wrapper) -->
                    <div class="large-content h-full transition-all duration-500 ease-in-out overflow-hidden p-0" style="max-height: 0; opacity: 0;">
                        <div class="p-8 md:p-12 h-full flex flex-col justify-between">
                            <div>
                                <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 shadow-lg mb-8 md:mb-12 border-2 border-white overflow-hidden">
                                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
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
                    </div>

                    <!-- SMALL CONTENT (Transition Wrapper) -->
                    <div class="small-content transition-all duration-500 ease-in-out overflow-hidden p-0 relative group" style="max-height: 0; opacity: 0;">
                        <div class="p-8 h-full flex flex-col justify-between">
                            <div>
                                <span class="text-[60px] leading-none text-gray-100 font-serif block mb-2 transition-colors group-hover:text-gray-200">&ldquo;</span>
                                <p class="text-[1.05rem] text-[#444] leading-relaxed mb-8 relative z-10">
                                    ${item.text}
                                </p>
                            </div>
                            <div class="flex justify-end">
                                <div class="w-14 h-14 rounded-full bg-gray-100 shadow-md border-2 border-white overflow-hidden">
                                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                grid.appendChild(card);
            });

            updateTestimonialsVisuals();
        };

        // 2. Update: Toggles classes instead of replacing innerHTML (Fixes Scroll Jump)
        function updateTestimonialsVisuals() {
            const activeIndex = window.activeTestimonialIndex;
            const isMobile = window.innerWidth < 768;

            testimonialsData.forEach((item, index) => {
                const card = document.getElementById(`t-card-${index}`);
                if (!card) return;

                const isActive = index === activeIndex;

                if (isMobile) {
                    // === MOBILE: VISUALS MANAGED BY SCROLL LOOP ===
                    // Force "Large" content visible, "Small" hidden for consistency
                    const largeContent = card.querySelector('.large-content');
                    const smallContent = card.querySelector('.small-content');

                    if (largeContent) {
                        largeContent.style.maxHeight = 'none'; // Allow full expansion
                        largeContent.style.opacity = '1';
                        largeContent.classList.remove('hidden');
                    }
                    if (smallContent) {
                        smallContent.style.maxHeight = '0';
                        smallContent.style.opacity = '0';
                        smallContent.classList.add('hidden');
                    }

                    // Reset grid classes for mobile stack (Full Width - Parallel to Grid - Tighter Spacing)
                    card.className = "bg-white rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-4 mx-auto w-full transition-transform duration-100 ease-out will-change-transform";

                    // Disable click
                    card.onclick = null;

                } else {
                    // === DESKTOP: GRID & TOGGLE ===
                    let layoutClasses = "";
                    if (activeIndex === 0) {
                        if (isActive) layoutClasses = "md:col-span-8 md:row-span-2"; else layoutClasses = "md:col-span-4";
                    } else if (activeIndex === 1) {
                        if (isActive) layoutClasses = "md:col-span-8 md:row-span-2"; else layoutClasses = "md:col-span-4";
                    } else {
                        if (isActive) layoutClasses = "md:col-span-12"; else layoutClasses = "md:col-span-6";
                    }

                    // Apply Classes
                    card.className = `${layoutClasses} bg-white rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden h-full cursor-${isActive ? 'default' : 'pointer'} min-w-[85vw] md:min-w-0 snap-center`;

                    // Toggle Visibility via Inline Styles
                    const largeContent = card.querySelector('.large-content');
                    const smallContent = card.querySelector('.small-content');

                    // Reset Mobile Transforms
                    card.style.transform = '';
                    card.style.opacity = '';

                    if (isActive) {
                        // Show Large
                        if (largeContent) {
                            largeContent.style.maxHeight = '1000px';
                            largeContent.style.opacity = '1';
                            largeContent.classList.remove('hidden');
                        }
                        // Hide Small
                        if (smallContent) {
                            smallContent.style.maxHeight = '0px';
                            smallContent.style.opacity = '0';
                            smallContent.classList.add('hidden');
                        }
                        card.onclick = null;
                    } else {
                        // Hide Large
                        if (largeContent) {
                            largeContent.style.maxHeight = '0px';
                            largeContent.style.opacity = '0';
                            largeContent.classList.add('hidden');
                        }
                        // Show Small
                        if (smallContent) {
                            smallContent.style.maxHeight = '1000px';
                            smallContent.style.opacity = '1';
                            smallContent.classList.remove('hidden');
                        }
                        card.onclick = () => swapTestimonial(index);
                    }
                }
            });
        }

        // 3. Swap: Uses View Transitions API (Restored)
        window.swapTestimonial = function (index) {
            if (index === window.activeTestimonialIndex) return;

            // Use View Transition if valid (Desktop only usually)
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    window.activeTestimonialIndex = index;
                    updateTestimonialsVisuals();
                });
            } else {
                // Fallback
                window.activeTestimonialIndex = index;
                updateTestimonialsVisuals();
            }
        };

        // 4. Scroll Animation Loop (Responsive & Self-Cleaning)
        window.setupMobileScrollObserver = function () {

            const handleResize = () => {
                if (window.innerWidth >= 768) {
                    // === DESKTOP MODE: CLEANUP ===
                    // 1. Restore Grid
                    const grid = document.getElementById("testimonialGrid");
                    if (grid) {
                        grid.className = "grid grid-cols-1 md:grid-cols-12 md:gap-8 transition-all duration-300 w-full";
                        grid.style.transform = '';
                    }

                    // 2. Clean Cards
                    testimonialsData.forEach((_, index) => {
                        const card = document.getElementById(`t-card-${index}`);
                        if (!card) return;

                        // Remove Mobile Classes
                        card.classList.remove("mb-4", "w-full", "mx-auto", "relative");
                        // Clear Inline Styles (Transforms/Opacity)
                        card.style.transform = '';
                        card.style.opacity = '';
                        card.style.transition = '';

                        // Reset Content (Let updateTestimonialsVisuals handle it)
                        const largeContent = card.querySelector('.large-content');
                        const smallContent = card.querySelector('.small-content');
                        if (largeContent) { largeContent.style = ''; largeContent.classList.remove('hidden'); }
                        if (smallContent) { smallContent.style = ''; smallContent.classList.remove('hidden'); }
                    });

                    // Trigger Desktop Render
                    updateTestimonialsVisuals();

                } else {
                    // === MOBILE MODE: INIT ===
                    const grid = document.getElementById("testimonialGrid");
                    if (grid) grid.className = "flex flex-col md:grid md:grid-cols-12 md:gap-8 md:auto-rows-[minmax(300px,auto)] w-full transition-all duration-300";
                    onScroll(); // Force one run
                }
            };

            const onScroll = () => {
                if (window.innerWidth >= 768) return;

                const viewportCenter = window.innerHeight / 2;

                testimonialsData.forEach((_, index) => {
                    const card = document.getElementById(`t-card-${index}`);
                    if (!card) return;

                    // Enforce Card Layout
                    card.style.transition = 'transform 0.15s ease-out';
                    card.classList.add("mb-4", "w-full", "mx-auto", "relative");
                    // REMOVED max-w constraints to match "Parallel to Grid" request
                    card.classList.remove("mr-4", "min-w-[85vw]", "snap-center", "shadow-xl", "max-w-[90%]", "max-w-[95%]");

                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + (rect.height / 2);

                    const distance = Math.abs(viewportCenter - cardCenter);
                    const maxDistance = window.innerHeight / 2;

                    let progress = 1 - (distance / maxDistance);
                    progress = Math.max(0, Math.min(1, progress));
                    const eased = progress * (2 - progress);

                    // 1. Scale
                    const scale = 0.85 + (0.15 * eased);
                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = '1';

                    // 2. Crossfade Content (Clean - No Overlap)
                    const largeContent = card.querySelector('.large-content');
                    const smallContent = card.querySelector('.small-content');

                    if (largeContent) {
                        largeContent.style.transition = 'opacity 0.15s ease-out';
                        largeContent.style.opacity = eased;
                        largeContent.style.maxHeight = 'none';
                        largeContent.classList.remove('hidden');
                        largeContent.style.position = 'relative';
                    }
                    if (smallContent) {
                        // PREVENT GHOSTING: Fade out Small Content VERY FAST
                        const fastFade = Math.max(0, 1 - (eased * 4));

                        smallContent.style.transition = 'opacity 0.15s ease-out';
                        smallContent.style.opacity = fastFade;
                        smallContent.style.maxHeight = 'none';

                        if (fastFade <= 0.05) {
                            smallContent.classList.add('hidden');
                        } else {
                            smallContent.classList.remove('hidden');
                        }

                        // Force Absolute Overlay
                        smallContent.style.position = 'absolute';
                        smallContent.style.top = '0';
                        smallContent.style.left = '0';
                        smallContent.style.width = '100%';
                        smallContent.style.height = '100%';
                        smallContent.style.zIndex = '10';
                    }
                });
            };

            window.addEventListener('scroll', () => {
                if (window.innerWidth < 768) requestAnimationFrame(onScroll);
            }, { passive: true });

            // Resize Listener
            window.addEventListener('resize', handleResize);

            // Initial Check
            setTimeout(handleResize, 100);
        };


        /* OLD Logic Disabled
        // 4. Scroll Animation Loop (Replaces Observer)
        window.setupMobileScrollObserver = function () {
            // "Observer" name kept for compatibility, but implements Animation Loop
            if (window.innerWidth >= 768) return;
        
            const onScroll = () => {
                if (window.innerWidth >= 768) return;
        
                const viewportCenter = window.innerHeight / 2;
        
                testimonialsData.forEach((_, index) => {
                    const card = document.getElementById(`t-card-${index}`);
                    if (!card) return;
        
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + (rect.height / 2);
        
                    // Calculate distance from center
                    const distance = Math.abs(viewportCenter - cardCenter);
                    const maxDistance = window.innerHeight / 2.5; // Range of effect
        
                    // Calculate Scale/Opacity
                    let progress = 1 - (distance / maxDistance);
                    progress = Math.max(0, Math.min(1, progress)); // Clamp 0-1
        
                    // Easing for smoother feel
                    const eased = progress * (2 - progress); // Ease out quad
        
                    const scale = 0.9 + (0.1 * eased); // 0.9 -> 1.0
                    const opacity = 0.5 + (0.5 * eased); // 0.5 -> 1.0
        
                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = opacity;
                });
            };
        
            // Start loop
            window.addEventListener('scroll', () => {
                requestAnimationFrame(onScroll);
            }, { passive: true });
        
            // Initial call
            onScroll();
        };
        
        */
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
                <div class="${classes} bg-white rounded-[30px] p-8 md:p-12 mb-0 h-full">
                  <div class="h-[200px]"></div> <!-- Mock height content -->
                  <h3>${item.text}</h3>
                </div>
            `;
                    } else {
                        tempHtml += `
                <div class="${classes} bg-white rounded-[30px] p-8 h-full">
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
        window.setupMobileScrollObserver();
        requestAnimationFrame(() => {
            window.setFixedTestimonialHeight();
            if (window.setFixedWishSliderHeight) window.setFixedWishSliderHeight();
        });
        window.addEventListener('resize', () => {
            window.setFixedTestimonialHeight();
            if (window.setFixedWishSliderHeight) window.setFixedWishSliderHeight();
        });


        // Use local reference for convenience in this scope if needed, but rely on global for popup
        // REMOVED const stories = window.wishStories; to avoid stale reference

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
            const stories = window.wishStories; // Get fresh data
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


        window.initSlider = function () {
            const stories = window.wishStories;
            if (!sliderIndicators || !stories || stories.length === 0) return;

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
            const stories = window.wishStories;
            if (!stories) return;

            activeIndex = index;
            const story = stories[index];

            // Sync Global Active Index
            window.wishSliderActiveIndex = activeIndex;

            // 1. Slide Out (Fade Out & Move Left)
            // Optimize: Animate only composite properties (opacity, transform)
            const transitionString = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';

            sliderImage.style.transition = transitionString;
            sliderImage.style.opacity = '0';
            sliderImage.style.transform = 'translateX(-50px)';

            if (sliderTitle) {
                sliderTitle.style.transition = transitionString;
                sliderTitle.style.opacity = '0';
                sliderTitle.style.transform = 'translateY(-10px)';
            }
            if (sliderDesc) {
                sliderDesc.style.transition = transitionString;
                sliderDesc.style.opacity = '0';
                sliderDesc.style.transform = 'translateY(-10px)';
            }

            // 2. Wait for Slide Out to finish (reduced to 300ms)
            setTimeout(() => {
                // 3. Update Content
                sliderImage.src = story.image;
                if (sliderTitle) sliderTitle.innerHTML = story.title;
                if (sliderDesc) sliderDesc.innerHTML = story.desc;

                // 3. Prepare for Slide In (Image Jump Right, Text Jump Down)
                sliderImage.style.transition = 'none';
                sliderImage.style.transform = 'translateX(50px)';

                if (sliderTitle) sliderTitle.style.transform = 'translateY(10px)';
                if (sliderDesc) sliderDesc.style.transform = 'translateY(10px)';

                // Force Reflow - Necessary for restart
                void sliderImage.offsetWidth;

                // 4. Slide In to Center
                sliderImage.style.transition = transitionString;
                sliderImage.style.opacity = '1';
                sliderImage.style.transform = 'translateX(0)';

                if (sliderTitle) {
                    sliderTitle.style.transition = transitionString;
                    sliderTitle.style.opacity = '1';
                    sliderTitle.style.transform = 'translateY(0)';
                }
                if (sliderDesc) {
                    sliderDesc.style.transition = transitionString;
                    sliderDesc.style.opacity = '1';
                    sliderDesc.style.transform = 'translateY(0)';
                }

                updateIndicators();
            }, 300);
        }

        function renderIndicators() {
            const stories = window.wishStories;
            if (!sliderIndicators || !stories) return;
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
                const stories = window.wishStories;
                if (!stories) return;

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
                const stories = window.wishStories;
                if (!stories) return;

                let newIndex = activeIndex - 1;
                if (newIndex < 0) newIndex = stories.length - 1;
                updateSlice(newIndex);
                resetAutoPlay();
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                const stories = window.wishStories;
                if (!stories) return;

                let newIndex = activeIndex + 1;
                if (newIndex >= stories.length) newIndex = 0;
                updateSlice(newIndex);
                resetAutoPlay();
            };
        }



        // Close handler is now delegated globally at the bottom of the file
        // to ensure it works regardless of DOM updates.

        // Initialize
        // REMOVED initSlider() from here. checking if window.wishStories exists first
        if (window.wishStories && window.wishStories.length > 0) {
            window.initSlider();
        }

        // --- SWIPE LOGIC FOR MOBILE ---
        const sliderContainer = document.getElementById('wishSlider');
        let touchStartX = 0;
        let touchEndX = 0;

        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', (e) => {
                // Store initial touch position
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            sliderContainer.addEventListener('touchmove', (e) => {
                // Optional: visual feedback during swipe could go here
                // For now, just passive listening
            }, { passive: true });

            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const threshold = 50; // Minimum distance to be considered a swipe
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > threshold) {
                if (swipeDistance > 0) {
                    // Swiped Right -> Previous Slide
                    if (prevBtn) prevBtn.click();
                } else {
                    // Swiped Left -> Next Slide
                    if (nextBtn) nextBtn.click();
                }
            }
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
                // Store original text
                if (!submitBtn.getAttribute('data-original-text')) {
                    submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
                }
                const originalBtnText = submitBtn.getAttribute('data-original-text');

                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Real Backend Submission
                fetch("submit_cv.php", {
                    method: "POST",
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error("Server error");
                        }
                    })
                    .then(data => {
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
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("There was a problem submitting your application. Please ensure you uploaded a valid file (PDF/DOC) and try again.");
                    })
                    .finally(() => {
                        // Restore button state
                        submitBtn.disabled = false;
                        loadLanguage(currentLang);
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

    // PRELOADER: Force load all carousel images immediately to prevent lag on tab switch
    if (allItems.length > 0) {
        setTimeout(() => {
            console.log("Preloading carousel images...");
            allItems.forEach(item => {
                const img = item.querySelector('img');
                if (img && img.src) {
                    const preloadLink = new Image();
                    preloadLink.src = img.src;
                }
            });
        }, 1000); // Start shortly after initial render
    }

    if (tabs.length && carousel && allItems.length) {

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

            // Clear carousel and re-append filtered items
            carousel.innerHTML = '';
            filteredItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.addEventListener("click", () => {
                    const index = Array.from(carousel.children).indexOf(clone);
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

            // Double rAF to ensure the browser has painted the static state
            // before starting the heavy marquee animation.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    carousel.classList.add('animating');
                });
            });
        }

        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                // 1. Reset ALL tabs to inactive style
                tabs.forEach((btn) => {
                    btn.classList.remove("bg-indigo-200", "text-indigo-600");
                    btn.classList.add("bg-white", "text-indigo-400");
                });

                // 2. Set CURRENT tab to active style
                tab.classList.remove("bg-white", "text-indigo-400");
                tab.classList.add("bg-indigo-200", "text-indigo-600");

                const category = tab.getAttribute("data-category");
                updateCarousel(category);
                currentIndex = 0;
            });
        });

        // Initial load - Force click the first tab or the explicit Charity tab
        setTimeout(() => {
            const charityTab = Array.from(tabs).find(t => t.getAttribute('data-category') === 'charity');
            if (charityTab) {
                charityTab.click();
            } else if (tabs.length > 0) {
                tabs[0].click();
            }
        }, 100);
    }

    // Modal logic
    if (modal && modalImg && modalDesc && modalClose) {
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

        modalClose.addEventListener("click", closeModal);
        if (modalPrev) modalPrev.addEventListener("click", () => navigateModal(-1));
        if (modalNext) modalNext.addEventListener("click", () => navigateModal(1));
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

            // Basic Validation - Fix selectors to use form scope since IDs don't exist
            const name = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const phone = contactForm.querySelector('[name="phone"]').value.trim();
            const category = contactForm.querySelector('[name="category"]').value;

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

            // Store original text
            if (!submitBtn.getAttribute('data-original-text')) {
                submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
            }
            const originalBtnText = submitBtn.getAttribute('data-original-text');

            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Real Backend Submission
            fetch("submit_contact.php", {
                method: "POST",
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error("Server error");
                    }
                })
                .then(data => {
                    // Show Success Modal
                    if (successModal) {
                        successModal.classList.remove("hidden");
                        successModal.classList.add("flex");
                    }
                    contactForm.reset();
                    if (otherInput) otherInput.style.display = "none";
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("There was an problem sending your message. Please try again.");
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    loadLanguage(currentLang);
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
    // ========== Mobile Footer Accordion Logic ==========
    const accordionToggles = document.querySelectorAll(".accordion-toggle");

    accordionToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            // 1. Toggle Content Visibility
            const content = toggle.nextElementSibling;
            content.classList.toggle("hidden");

            // 2. Rotate Icon
            const icon = toggle.querySelector("i");
            if (icon) {
                if (content.classList.contains("hidden")) {
                    icon.style.transform = "rotate(0deg)";
                } else {
                    icon.style.transform = "rotate(180deg)";
                }
            }
        });
    });
});
