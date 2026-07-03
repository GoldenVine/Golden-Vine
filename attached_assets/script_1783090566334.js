document.addEventListener("DOMContentLoaded", function () {
    // Piercings page carousel logic (existing code)
    let e = document.querySelectorAll("#piercings-page .carousel-slide"),
        t = document.querySelector("#piercings-page .carousel-button.next"),
        l = document.querySelector("#piercings-page .carousel-button.prev"),
        i = 0;
    if (e.length > 0 && t && l) {
        function s(t) {
            e.forEach((e, l) => {
                e.classList.remove("active"), l === t && e.classList.add("active")
            })
        }
        t.addEventListener("click", () => {
            s(i = (i + 1) % e.length)
        }), l.addEventListener("click", () => {
            s(i = (i - 1 + e.length) % e.length)
        }), s(i)
    }

    // Homepage carousel logic (modified to include 'active' class)
    let o = document.getElementById("carousel-track"),
        n = document.getElementById("carousel-container");

    if (o && n && null === o.closest("#piercings-page")) {
        let a = Array.from(o.children);
        if (a.length > 0) {
            let c = a[0].offsetWidth,
                r = a[0].cloneNode(!0);
            r.id = "first-clone";
            let d = a[a.length - 1].cloneNode(!0);
            d.id = "last-clone", o.appendChild(r), o.insertBefore(d, a[0]), a = Array.from(o.children);
            let g = 1,
                y = Math.round(n.offsetWidth / c);

            // Function to update active class and blur
            function updateHomepageCarouselClasses() {
                // Remove 'active' from all slides
                a.forEach(slide => slide.classList.remove('active'));

                // Add 'active' to the current visible slide (g is your current index)
                // We need to account for the cloned elements when mapping 'g' to actual content slides
                // Assuming content slides are at index 1 through a.length - 2
                if (g >= 1 && g <= a.length - 2) {
                    a[g].classList.add('active');
                } else if (g === 0) { // If it's the 'last-clone' (effectively the last real slide)
                    a[a.length - 2].classList.add('active');
                } else if (g === a.length - 1) { // If it's the 'first-clone' (effectively the first real slide)
                    a[1].classList.add('active');
                }
            }

            // Your existing opacity logic (keep this)
            function v() {
                a.forEach((e, t) => {
                    let l = Math.abs(t - g);
                    l > Math.floor(y / 2) ? e.style.opacity = "0.6" : e.style.opacity = "1"
                })
            }

            o.style.transform = `translateX(-${c*g}px)`, o.style.opacity = 1, v();
            updateHomepageCarouselClasses(); // Set initial active slide

            let f = !1;
            o.addEventListener("transitionend", e => {
                if ("transform" === e.propertyName) { // Listen for transform completion for slide change
                    f = false;
                    o.style.transition = "transform 0s";

                    if (a[g].id === "first-clone") {
                        g = 1;
                    } else if (a[g].id === "last-clone") {
                        g = a.length - 2;
                    }
                    o.style.transform = `translateX(-${c*g}px)`;

                    setTimeout(() => {
                        o.style.transition = "transform 0.6s ease-in-out"; // Restore transition for next actual slide move
                        updateHomepageCarouselClasses(); // Update active class after real position is set
                        v(); // Re-apply opacity logic
                    }, 0);
                } else if ("opacity" === e.propertyName) { // Your existing opacity transition end
                    f = !1;
                    o.style.transition = "transform 0s"; // This might reset transform transition if it's the dominant transition

                    // Original logic for cloning transition end
                    if (a[g].id === "first-clone") {
                        g = 1;
                    } else if (a[g].id === "last-clone") {
                        g = a.length - 2;
                    }
                    o.style.transform = `translateX(-${c*g}px)`;

                    setTimeout(() => {
                        o.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out"; // Ensure transform transition is also present
                        o.style.opacity = 1;
                        updateHomepageCarouselClasses(); // Update active class
                        v(); // Re-apply opacity logic
                    }, 0);
                }
            });

            setInterval(() => {
                if (!f) {
                    f = !0;
                    g++;
                    o.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out"; // Add transform transition
                    o.style.opacity = 0; // Starts the fade out
                    updateHomepageCarouselClasses(); // Update active class *before* the slide visually changes
                }
            }, 3e3);
        }
    }

    // Burger menu and lightbox logic (existing code)
    let p = document.getElementById("burger-menu"),
        m = document.getElementById("nav-overlay");
    p && m && (p.addEventListener("click", () => {
        m.classList.toggle("active"), p.classList.toggle("open")
    }), m.querySelectorAll("a").forEach(e => {
        e.addEventListener("click", () => {
            m.classList.contains("active") && (m.classList.remove("active"), p.classList.remove("open"))
        })
    }));
    let u = document.getElementById("lightbox-overlay"),
        h = document.getElementById("lightbox-image"),
        L = document.querySelector(".lightbox-close"),
        E = document.querySelectorAll(".collection-item img, #booking-images-section .booking-images img");
    u && h && L && E.length > 0 && (E.forEach(e => {
        e.addEventListener("click", () => {
            let t = e.getAttribute("data-lightbox-target");
            t && (h.src = t, u.classList.add("active"), document.body.style.overflow = "hidden")
        })
    }), L.addEventListener("click", () => {
        u.classList.remove("active"), document.body.style.overflow = ""
    }), u.addEventListener("click", e => {
        e.target === u && (u.classList.remove("active"), document.body.style.overflow = "")
    }))

    // Contact Form Pop-up and Redirection (New code)
    const contactForm = document.getElementById('contactForm');
    const customPopup = document.getElementById('customPopup');
    const closePopup = document.getElementById('closePopup');
    const popupButton = document.getElementById('popupButton');

    console.log('DOMContentLoaded fired.');
    console.log('contactForm element:', contactForm);
    console.log('customPopup element:', customPopup);

    if (contactForm && customPopup && closePopup && popupButton) {
        console.log('All contact form elements found. Attaching event listener.');
        contactForm.addEventListener('submit', async function(event) {
            console.log('Form submission detected!');
            event.preventDefault(); // THIS IS THE CRUCIAL LINE TO STOP DEFAULT REDIRECTION

            const formData = new FormData(this); // 'this' refers to the form

            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Request JSON response
                    }
                });

                const result = await response.json(); // Parse the JSON response
                console.log('Web3Forms response:', result);

                if (response.ok) { // Check if the HTTP status code is 2xx
                    console.log('Form submitted successfully to Web3Forms.');
                    customPopup.style.display = 'flex'; // Show pop-up
                    document.body.style.overflow = 'hidden'; // Prevent scrolling behind pop-up

                    // Add event listeners for closing and redirecting
                    closePopup.addEventListener('click', () => {
                        customPopup.style.display = 'none';
                        document.body.style.overflow = ''; // Restore scrolling
                        window.location.href = 'contact.html'; // Redirect to contact page
                    });

                    popupButton.addEventListener('click', () => {
                        customPopup.style.display = 'none';
                        document.body.style.overflow = ''; // Restore scrolling
                        window.location.href = 'contact.html'; // Redirect to contact page
                    });

                    // Also close and redirect if clicked outside the content
                    window.addEventListener('click', function(event) {
                        if (event.target == customPopup) {
                            customPopup.style.display = 'none';
                            document.body.style.overflow = ''; // Restore scrolling
                            window.location.href = 'contact.html'; // Redirect to contact page
                        }
                    });

                    // Optional: Clear the form fields after successful submission
                    this.reset();

                } else {
                    // Handle submission errors
                    console.error('Form submission failed:', result.message || 'Unknown error');
                    alert('There was an error sending your message. Please try again later.');
                }
            } catch (error) {
                console.error('Error during form submission (network or parsing):', error);
                alert('There was an error sending your message. Please check your internet connection and try again.');
            }
        });
    } else {
        console.error('One or more contact form/popup elements not found!');
        console.log('contactForm:', contactForm);
        console.log('customPopup:', customPopup);
        console.log('closePopup:', closePopup);
        console.log('popupButton:', popupButton);
    }
});