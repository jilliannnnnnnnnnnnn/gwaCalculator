const popupPictures = [
    "https://i.pinimg.com/736x/df/4c/e8/df4ce811e7df990d6d9c0d2859fb0f36.jpg",
    "https://i.pinimg.com/736x/cc/e7/10/cce7107d1dd4f4f42747728eeb0ede61.jpg",
    "https://i.pinimg.com/736x/c6/0e/0c/c60e0c21feacb3c66a0a584350695259.jpg",
    "https://i.pinimg.com/736x/74/45/eb/7445eb8f25cd9f0fb8e589ec881644d7.jpg",
    "https://i.pinimg.com/736x/bc/7c/64/bc7c647ca32d3a3b017e78a14ce355c4.jpg",
    "https://i.pinimg.com/736x/2d/ee/8c/2dee8ccc36ddc936d07f1e66eecd6190.jpg",
    "https://i.pinimg.com/736x/07/4f/1a/074f1a00bea26b7adae081273ab00443.jpg",
    "https://i.pinimg.com/736x/f9/72/75/f97275ed3b4642f2063f26e9bf641161.jpg"
];

function addbutton() {
    const calculator = document.getElementById("calculator");
    const newRow = document.createElement("div");

    newRow.className = "inputs";

    newRow.innerHTML = `
        <div class="courseName">
            <label>Course Name (Optional)</label>
            <input type="text" placeholder="Enter Course Name...">
        </div>

        <div class="units">
            <label>Units</label>
            <input type="number" min="0">
        </div>

        <div class="grade">
            <label>Grade</label>
            <select>
                <option value="" disabled selected>Select Grade</option>
                <option value="1.00">1.00</option>
                <option value="1.25">1.25</option>
                <option value="1.50">1.50</option>
                <option value="1.75">1.75</option>
                <option value="2.00">2.00</option>
                <option value="2.25">2.25</option>
                <option value="2.50">2.50</option>
                <option value="2.75">2.75</option>
                <option value="3.00">3.00</option>
            </select>
        </div>

        <div class="btns">
            <button type="button" class="addBtn"
                onclick="addbutton()" aria-label="Add course">+</button>

            <button type="button" class="deleteBtn"
                onclick="deleteRow(this)" aria-label="Delete course">-</button>
        </div>
    `;

    calculator.appendChild(newRow);
}

function deleteRow(button) {
    const row = button.closest(".inputs");
    const rows = document.querySelectorAll(".inputs");

    if (rows.length === 1) {
        alert("You should leave at least one row.");
        return;
    }

    row.remove();
}

function gradeCalculation() {
    let totalGrade = 0;
    let totalUnits = 0;

    const rows = document.querySelectorAll(".inputs");

    for (const row of rows) {
        const unitsInput = row.querySelector(".units input");
        const gradeInput = row.querySelector(".grade select");

        const units = Number(unitsInput.value);
        const grade = Number(gradeInput.value);

        if (
            unitsInput.value.trim() === "" ||
            units <= 0 ||
            gradeInput.value === "" ||
            grade <= 0
        ) {
            alert(
                "Please complete the units and grade for every course."
            );
            return;
        }

        totalGrade += grade * units;
        totalUnits += units;
    }

    if (totalUnits === 0) {
        alert("Please enter your course units and grades first.");
        return;
    }

    const gwa = totalGrade / totalUnits;

    document.getElementById("result").textContent =
        gwa.toFixed(2);

    if (gwa >= 1.00 && gwa <= 1.50) {
        showCongrats();
        showRandomPopups();
    }
}

function showRandomPopups() {
    document.querySelectorAll(".random-popup").forEach(
        popup => popup.remove()
    );

    const shuffledPictures = [...popupPictures];

    for (let i = shuffledPictures.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledPictures[i], shuffledPictures[j]] =
            [shuffledPictures[j], shuffledPictures[i]];
    }

    shuffledPictures.forEach((picture, index) => {
        setTimeout(() => {
            createImagePopup(picture);
        }, index * 250);
    });

    startConfetti();
}

function createImagePopup(imagePath) {
    const popup = document.createElement("div");
    popup.className = "random-popup";

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = "University Scholar celebration";

    image.onerror = function() {
        popup.remove();
        console.error(
            "Image could not load. Check the Base64 data:",
            imagePath
        );
    };

    const closeButton = document.createElement("button");
    closeButton.className = "close-image";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close picture");

    closeButton.onclick = function() {
        popup.remove();
    };

    popup.appendChild(image);
    popup.appendChild(closeButton);

    document.body.appendChild(popup);

    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    const maxX = Math.max(
        0, window.innerWidth - popupWidth
    );

    const maxY = Math.max(
        0, window.innerHeight - popupHeight
    );

    popup.style.left = Math.random() * maxX + "px";
    popup.style.top = Math.random() * maxY + "px";

    const rotation = Math.random() * 16 - 8;
    popup.style.transform = `rotate(${rotation}deg)`;
}

function startConfetti() {
    const container =
        document.getElementById("confettiContainer");

    container.innerHTML = "";

    const colors = [
        "#FF00AA", "#FFFF00", "#00FFFF",
        "#8A2BFF", "#00FF85", "#FF5C00", "#FFFFFF"
    ];

    for (let i = 0; i < 160; i++) {
        const piece = document.createElement("span");

        piece.className =
            Math.random() < 0.5
                ? "confetti"
                : "confetti circle";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.width =
            (Math.random() * 10 + 6) + "px";

        piece.style.height =
            (Math.random() * 15 + 7) + "px";

        piece.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        piece.style.animationDelay =
            (Math.random() * 1.5) + "s";

        container.appendChild(piece);
    }
}

function showCongrats() {
    document.getElementById("congratsOverlay").classList.add("show");
}

function closeCongrats() {
    document.getElementById("congratsOverlay").classList.remove("show");
}