function generateCV() {
    // 1. Personal Details
    document.getElementById('nameT').innerText = document.getElementById('nameField').value;
    document.getElementById('titleT').innerText = document.getElementById('titleField').value;
    document.getElementById('phoneT').innerText = document.getElementById('phoneField').value;
    document.getElementById('emailT').innerText = document.getElementById('emailField').value;
    document.getElementById('addressT').innerText = document.getElementById('addressField').value;
    document.getElementById('linkedinT').innerText = document.getElementById('linkedinField').value;

    // 2. Education & Experience
    document.getElementById('eduT').innerText = document.getElementById('eduField').value;
    document.getElementById('expT').innerText = document.getElementById('expField').value;

    // 3. Skills (Comma separated)
    let skillsInput = document.getElementById('skillsField').value;
    let skillsArray = skillsInput.split(',');
    let skillsHTML = '';
    skillsArray.forEach(skill => {
        if(skill.trim().length > 0) skillsHTML += `<li>${skill.trim()}</li>`;
    });
    document.getElementById('skillsT').innerHTML = skillsHTML;

    // ----------------------------------------
    // NEW: SIDEBAR SECTIONS
    // ----------------------------------------

    // A. Languages (Comma separated)
    let langInput = document.getElementById('langField').value;
    let langSec = document.getElementById('sec-languages');
    if (langInput.trim().length > 0) {
        let langArray = langInput.split(',');
        let langHTML = '';
        langArray.forEach(lang => {
            if(lang.trim().length > 0) langHTML += `<li>${lang.trim()}</li>`;
        });
        document.getElementById('langT').innerHTML = langHTML;
        langSec.classList.remove('d-none');
    } else {
        langSec.classList.add('d-none');
    }

    // B. Hobbies (Comma separated)
    let hobbyInput = document.getElementById('hobbyField').value;
    let hobbySec = document.getElementById('sec-hobbies');
    if (hobbyInput.trim().length > 0) {
        let hobbyArray = hobbyInput.split(',');
        let hobbyHTML = '';
        hobbyArray.forEach(hobby => {
            if(hobby.trim().length > 0) hobbyHTML += `<li>${hobby.trim()}</li>`;
        });
        document.getElementById('hobbyT').innerHTML = hobbyHTML;
        hobbySec.classList.remove('d-none');
    } else {
        hobbySec.classList.add('d-none');
    }

    // C. Achievements (New Line separated)
    let achieveInput = document.getElementById('achieveField').value;
    let achieveSec = document.getElementById('sec-achievements');
    if (achieveInput.trim().length > 0) {
        // We split by newline for achievements as they might be longer sentences
        let achieveArray = achieveInput.split('\n');
        let achieveHTML = '';
        achieveArray.forEach(ach => {
            if(ach.trim().length > 0) achieveHTML += `<li>${ach.trim()}</li>`;
        });
        document.getElementById('achieveT').innerHTML = achieveHTML;
        achieveSec.classList.remove('d-none');
    } else {
        achieveSec.classList.add('d-none');
    }

    // ----------------------------------------
    // AUTO-DETECT VISIBILITY (Projects/Pubs/Ref)
    // ----------------------------------------

    // Projects
    let projInput = document.getElementById('projField').value;
    let projSec = document.getElementById('sec-projects');
    if (projInput.trim().length > 0) {
        projSec.classList.remove('d-none');
        document.getElementById('projT').innerText = projInput;
    } else {
        projSec.classList.add('d-none');
    }

    // Publications
    let pubsInput = document.getElementById('pubsField').value;
    let pubsSec = document.getElementById('sec-publications');
    if (pubsInput.trim().length > 0) {
        pubsSec.classList.remove('d-none');
        document.getElementById('pubsT').innerText = pubsInput;
    } else {
        pubsSec.classList.add('d-none');
    }

    // References
    let r1Name = document.getElementById('ref1Name').value;
    let r1Job = document.getElementById('ref1Job').value;
    let r1Contact = document.getElementById('ref1Contact').value;
    let r2Name = document.getElementById('ref2Name').value;
    let r2Job = document.getElementById('ref2Job').value;
    let r2Contact = document.getElementById('ref2Contact').value;

    let refHTML = '';
    let hasRef = false;

    if (r1Name.trim().length > 0) {
        refHTML += `<div class="col-6"><p class="fw-bold mb-0">${r1Name}</p><p class="small fst-italic mb-0">${r1Job}</p><p class="small text-muted">${r1Contact}</p></div>`;
        hasRef = true;
    }
    if (r2Name.trim().length > 0) {
        refHTML += `<div class="col-6"><p class="fw-bold mb-0">${r2Name}</p><p class="small fst-italic mb-0">${r2Job}</p><p class="small text-muted">${r2Contact}</p></div>`;
        hasRef = true;
    }

    let refSec = document.getElementById('sec-references');
    if (hasRef) {
        refSec.classList.remove('d-none');
        document.getElementById('refsContainer').innerHTML = refHTML;
    } else {
        refSec.classList.add('d-none');
    }
}

function previewImage() {
    let file = document.getElementById('photoInput').files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        let img = document.getElementById('cv-photo');
        img.src = reader.result;
        img.style.display = "block";
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        document.getElementById('cv-photo').style.display = "none";
    }
}

function printCV() { window.print(); }

function changeTemplate() {
    let template = document.getElementById('templateSelector').value;
    let cvContainer = document.getElementById('cv-template');
    cvContainer.className = `cv-page shadow-lg ${template}`;
}