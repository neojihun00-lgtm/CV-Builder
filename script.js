let photoData = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"; 
    let selectedTmpl = 'modern';

    function addItem(containerId, className) {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<input type="text" class="modern-input ${className}" oninput="render()"><button class="btn-del" onclick="this.parentElement.remove();render()">×</button>`;
        document.getElementById(containerId).appendChild(div);
        render();
    }

    function handlePhoto(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => { photoData = e.target.result; render(); };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const templates = {
        modern: `<div style="display:flex;min-height:297mm;font-family:Inter">
            <div style="width:35%;background:#1e293b;color:white;padding:30px">
                <img src="{{photo}}" style="width:{{size}}px;height:{{size}}px;border-radius:15px;border:4px solid #6366f1;display:block;margin:0 auto 20px;object-fit:cover">
                <h2 style="text-align:center">{{name}}</h2>
                <div style="margin-top:30px">
                    <h4 style="color:#6366f1">SKILLS</h4><ul>{{skills}}</ul>
                    <h4 style="color:#6366f1">LANGUAGES</h4><ul>{{languages}}</ul>
                </div>
            </div>
            <div style="width:65%;padding:40px">
                <h3 style="color:#6366f1">PROFILE</h3><p>{{summary}}</p>
                <h3 style="border-bottom:2px solid #6366f1;margin-top:30px">EXPERIENCE</h3><p style="white-space:pre-line">{{experience}}</p>
                <h3 style="border-bottom:2px solid #6366f1;margin-top:30px">EDUCATION</h3><ul>{{education}}</ul>
            </div>
        </div>`,

        corporate: `<div style="padding:50px;font-family:Inter;color:#334155">
            <div style="display:flex;gap:30px;align-items:center;border-bottom:5px solid #1e293b;padding-bottom:20px">
                <img src="{{photo}}" style="width:{{size}}px;height:{{size}}px;object-fit:cover">
                <div><h1 style="font-size:40px;margin:0;color:#1e293b">{{name}}</h1><p>{{contact}}</p></div>
            </div>
            <div style="margin-top:30px">
                <h3>EXECUTIVE SUMMARY</h3><p>{{summary}}</p>
                <h3>CORE EXPERTISE</h3><p>{{skills_plain}}</p>
                <h3>PROFESSIONAL HISTORY</h3><p style="white-space:pre-line">{{experience}}</p>
                <h3>ACADEMIC BACKGROUND</h3><ul>{{education}}</ul>
            </div>
        </div>`,

        midnight: `<div style="background:#111827;color:#f9fafb;min-height:297mm;padding:50px;font-family:Inter">
            <div style="text-align:center">
                <img src="{{photo}}" style="width:{{size}}px;height:{{size}}px;border-radius:50%;border:4px solid #a855f7">
                <h1 style="font-size:45px;margin:10px 0">{{name}}</h1>
                <p style="color:#a855f7">{{contact}}</p>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px">
                <div><h3>SUMMARY</h3><p>{{summary}}</p><h3>EXPERIENCE</h3><p style="white-space:pre-line">{{experience}}</p></div>
                <div><h3>TECHNICAL SKILLS</h3><ul>{{skills}}</ul><h3>EDUCATION</h3><ul>{{education}}</ul></div>
            </div>
        </div>`,

        slate: `<div style="font-family:Inter;display:flex;min-height:297mm">
            <div style="width:15px;background:#6366f1"></div>
            <div style="padding:50px;flex:1">
                <div style="display:flex;justify-content:space-between">
                    <div><h1 style="font-size:48px;margin:0">{{name}}</h1><p style="font-weight:700">{{contact}}</p></div>
                    <img src="{{photo}}" style="width:{{size}}px;height:{{size}}px;border-radius:20px">
                </div>
                <div style="margin-top:40px;background:#f8fafc;padding:30px;border-radius:15px">
                    <h4 style="color:#6366f1;margin-top:0">PROFILE</h4><p>{{summary}}</p>
                </div>
                <h3>EXPERIENCE</h3><p style="white-space:pre-line">{{experience}}</p>
                <div style="display:flex;gap:40px">
                    <div style="flex:1"><h3>SKILLS</h3><ul>{{skills}}</ul></div>
                    <div style="flex:1"><h3>EDUCATION</h3><ul>{{education}}</ul></div>
                </div>
            </div>
        </div>`,

        tech: `<div style="padding:40px;font-family:'Inter'">
            <div style="background:#000;color:#fff;padding:40px;display:flex;justify-content:space-between;align-items:center">
                <div><h1 style="margin:0;letter-spacing:2px">{{name}}</h1><p style="color:#4ade80">{{contact}}</p></div>
                <img src="{{photo}}" style="width:{{size}}px;height:{{size}}px;filter:grayscale(100%);border:2px solid #4ade80">
            </div>
            <div style="display:flex;gap:30px;margin-top:30px">
                <div style="width:30%"><h3>TECH STACK</h3><div style="display:flex;flex-wrap:wrap;gap:5px">{{skills_plain}}</div><h3>LANGUAGES</h3><ul>{{languages}}</ul></div>
                <div style="width:70%"><h3>SYSTEM SUMMARY</h3><p>{{summary}}</p><h3>LOGS / EXPERIENCE</h3><p style="white-space:pre-line">{{experience}}</p></div>
            </div>
        </div>`,

        academic: `<div style="padding:60px;font-family:'Playfair Display';line-height:1.6">
            <div style="text-align:center;border-bottom:1px solid #000;padding-bottom:20px">
                <h1 style="font-size:35px;text-transform:uppercase">{{name}}</h1>
                <p>{{contact}}</p>
            </div>
            <div style="margin-top:30px">
                <h3 style="text-decoration:underline">RESEARCH SUMMARY</h3><p>{{summary}}</p>
                <h3 style="text-decoration:underline">EDUCATION</h3><ul>{{education}}</ul>
                <h3 style="text-decoration:underline">PROFESSIONAL APPOINTMENTS</h3><p style="white-space:pre-line">{{experience}}</p>
                <h3 style="text-decoration:underline">CORE COMPETENCIES</h3><p>{{skills_plain}}</p>
            </div>
        </div>`
    };

    function render() {
        const size = document.getElementById('photoSize').value;
        
        // Dynamic List Collection
        const getList = (cls) => Array.from(document.querySelectorAll('.'+cls)).map(i => i.value).filter(v => v).map(v => `<li>${v}</li>`).join('');
        const getPlain = (cls) => Array.from(document.querySelectorAll('.'+cls)).map(i => i.value).filter(v => v).join(', ');

        const data = {
            name: document.getElementById('inName').value || "YOUR NAME",
            contact: document.getElementById('inContact').value || "email@domain.com | LinkedIn",
            summary: document.getElementById('inSummary').value || "Professional summary goes here...",
            experience: document.getElementById('inExp').value || "Your career highlights...",
            skills: getList('skill-in') || "<li>Communication</li>",
            skills_plain: getPlain('skill-in') || "Communication, Leadership",
            education: getList('edu-in') || "<li>Degree Name</li>",
            languages: getList('lang-in') || "<li>English</li>",
            photo: photoData,
            size: size
        };

        let html = templates[selectedTmpl] || templates.modern;
        Object.keys(data).forEach(key => {
            const reg = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(reg, data[key]);
        });

        document.getElementById('cv-paper').innerHTML = html;
    }

    function changeTmpl(id, btn) {
        selectedTmpl = id;
        document.querySelectorAll('.tmpl-card').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render();
    }

    function download() {
        const element = document.getElementById('cv-paper');
        html2pdf().from(element).set({
            margin: 0, filename: 'Elite_Resume_Pro.pdf',
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).save();
    }

    render();