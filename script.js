/* ==================================================
   BUMI BERSUARA
   JAVASCRIPT
================================================== */


/* ================= MOBILE NAV ================= */

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    if (nav) {

        nav.classList.toggle("show");

    }

}



/* ================= COASTAL SIMULATOR ================= */

function updateSimulator() {

    const mangrove =
        Number(document.getElementById("mangroveRange").value);

    const activity =
        Number(document.getElementById("activityRange").value);


    document.getElementById("mangroveValue").textContent =
        mangrove + "%";


    document.getElementById("activityValue").textContent =
        activity + "%";


    /*
        Semakin tinggi mangrove,
        risiko semakin kecil.

        Semakin tinggi aktivitas manusia,
        risiko semakin besar.
    */

    let risk =
        activity - (mangrove * 0.65);


    /*
        Tambahkan nilai dasar
        agar simulasi lebih masuk akal.
    */

    risk += 45;


    risk =
        Math.max(0, Math.min(100, Math.round(risk)));


    document.getElementById("riskScore").textContent =
        risk;


    document.getElementById("riskBar").style.width =
        risk + "%";


    const badge =
        document.getElementById("riskBadge");

    const title =
        document.getElementById("riskTitle");

    const description =
        document.getElementById("riskDescription");


    badge.className = "risk";


    if (risk < 35) {

        badge.classList.add("low");

        badge.textContent =
            "Risiko Rendah";

        title.textContent =
            "Pesisir relatif lebih terlindungi";

        description.textContent =
            "Kondisi mangrove yang baik dapat membantu mengurangi tekanan terhadap kawasan pesisir. Perlindungan dan pemulihan tetap perlu dilakukan.";

    }

    else if (risk < 65) {

        badge.classList.add("medium");

        badge.textContent =
            "Risiko Sedang";

        title.textContent =
            "Pesisir membutuhkan perhatian";

        description.textContent =
            "Tekanan terhadap pesisir mulai meningkat. Pengelolaan kawasan dan perlindungan ekosistem perlu diperkuat.";

    }

    else {

        badge.classList.add("high");

        badge.textContent =
            "Risiko Tinggi";

        title.textContent =
            "Pesisir berada dalam tekanan tinggi";

        description.textContent =
            "Kurangnya perlindungan alami dan tingginya tekanan aktivitas dapat meningkatkan kerentanan pesisir.";

    }


    updateTrees(mangrove);

}



/* ================= MANGROVE VISUAL ================= */

function updateTrees(value) {

    const trees =
        document.getElementById("mangroveTrees");

    if (!trees) return;


    let jumlah;


    if (value < 20) {

        jumlah = "🌱";

    }

    else if (value < 40) {

        jumlah = "🌱 🌱";

    }

    else if (value < 60) {

        jumlah = "🌳 🌱 🌳";

    }

    else if (value < 80) {

        jumlah = "🌳 🌳 🌳 🌱";

    }

    else {

        jumlah =
            "🌳 🌳 🌳 🌳 🌳";

    }


    trees.textContent =
        jumlah;

}



/* ================= ECO MISSION ================= */

function updateMission() {

    const checks =
        document.querySelectorAll(".mission-check");


    let checked = 0;


    checks.forEach(function(check) {

        if (check.checked) {

            checked++;

        }

    });


    const total =
        checks.length;


    const percentage =
        total === 0
            ? 0
            : Math.round((checked / total) * 100);


    const progress =
        document.getElementById("missionProgress");

    const bar =
        document.getElementById("missionBar");


    if (progress) {

        progress.textContent =
            percentage + "%";

    }


    if (bar) {

        bar.style.width =
            percentage + "%";

    }


    /*
        Simpan progress ke browser.
        Jadi ketika halaman dibuka kembali,
        checklist tetap tersimpan.
    */

    localStorage.setItem(
        "ecoMission",
        JSON.stringify(
            Array.from(checks).map(
                check => check.checked
            )
        )
    );

}



/* ================= LOAD ECO MISSION ================= */

function loadMission() {

    const saved =
        localStorage.getItem("ecoMission");


    if (!saved) {

        return;

    }


    try {

        const data =
            JSON.parse(saved);

        const checks =
            document.querySelectorAll(".mission-check");


        checks.forEach(function(check, index) {

            if (data[index] !== undefined) {

                check.checked =
                    data[index];

            }

        });


        updateMission();

    }

    catch (error) {

        console.log(
            "Progress mission tidak dapat dimuat."
        );

    }

}



/* ================= GALLERY FILTER ================= */

function filterGallery(category) {

    const items =
        document.querySelectorAll(".gallery-item");

    const buttons =
        document.querySelectorAll(".filter");


    buttons.forEach(function(button) {

        button.classList.remove(
            "active-filter"
        );

    });


    /*
        Tombol yang diklik
        akan menjadi active.
    */

    if (event && event.target) {

        event.target.classList.add(
            "active-filter"
        );

    }


    items.forEach(function(item) {

        if (
            category === "all" ||
            item.classList.contains(category)
        ) {

            item.style.display =
                "block";

        }

        else {

            item.style.display =
                "none";

        }

    });

}



/* ================= CONTACT FORM ================= */

function setupContactForm() {

    const form =
        document.getElementById("contactForm");


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nama =
                document.getElementById("nama").value;


            const email =
                document.getElementById("email").value;


            const topik =
                document.getElementById("topik").value;


            const pesan =
                document.getElementById("pesan").value;


            const message =
                document.getElementById("formMessage");


            if (
                nama.trim() === "" ||
                email.trim() === "" ||
                topik === "" ||
                pesan.trim() === ""
            ) {

                message.style.display =
                    "block";

                message.style.background =
                    "#fff0f0";

                message.style.color =
                    "#9b2c2c";

                message.textContent =
                    "Mohon lengkapi semua data.";

                return;

            }


            /*
                Karena website ini belum memakai
                backend/database, data belum dikirim
                ke email sungguhan.

                Untuk sekarang kita tampilkan
                notifikasi berhasil.
            */

            message.style.display =
                "block";

            message.style.background =
                "#e7f5ec";

            message.style.color =
                "#23613d";


            message.textContent =
                "Terima kasih, " +
                nama +
                "! Pesan kamu berhasil dicatat oleh website.";


            form.reset();

        }
    );

}



/* ================= ACTIVE NAV ================= */

function setActiveNav() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const links =
        document.querySelectorAll(
            ".navbar nav a"
        );


    links.forEach(function(link) {

        const href =
            link.getAttribute("href");


        if (
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}



/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateSimulator();

        loadMission();

        setupContactForm();

        setActiveNav();

    }
);

/* ==================================================
   FILTER GALERI
================================================== */

function filterGallery(category) {

    const items =
        document.querySelectorAll(".gallery-item");

    const buttons =
        document.querySelectorAll(".filter");


    buttons.forEach(button => {

        button.classList.remove(
            "active-filter"
        );

    });


    if (typeof event !== "undefined") {

        event.currentTarget.classList.add(
            "active-filter"
        );

    }


    items.forEach(item => {

        if (
            category === "all" ||
            item.classList.contains(category)
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}



/* ==================================================
   BUKA FOTO
================================================== */

function openGallery(item) {

    const modal =
        document.getElementById(
            "galleryModal"
        );

    const image =
        document.getElementById(
            "galleryImage"
        );

    const category =
        document.getElementById(
            "modalCategory"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );


    const originalImage =
        item.querySelector("img");

    const itemCategory =
        item.querySelector(
            ".gallery-overlay span"
        );

    const itemTitle =
        item.querySelector(
            ".gallery-overlay h3"
        );


    image.src =
        originalImage.src;

    image.alt =
        originalImage.alt;


    category.textContent =
        itemCategory.textContent;


    title.textContent =
        itemTitle.textContent;


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}



/* ==================================================
   TUTUP FOTO
================================================== */

function closeGallery() {

    const modal =
        document.getElementById(
            "galleryModal"
        );


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}



/* ==================================================
   ESC
================================================== */

document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key === "Escape"
        ) {

            closeGallery();

        }

    }
);