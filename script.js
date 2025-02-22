
// Hide loader when page is fully loaded
window.addEventListener("load", function () {
  console.log("Page fully loaded"); // Debugging line
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

// Backup: Hide loader after 5 seconds
setTimeout(function () {
  const loader = document.getElementById("loader");
  if (loader) {
    console.log("Loader hidden by timeout"); // Debugging line
    loader.style.display = "none";
  }
}, 5000); // 5000 milliseconds = 5 seconds


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 100; // Adjust speed of counting

  counters.forEach(counter => {
      const animate = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = target / speed;

          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(animate, 10);
          } else {
              counter.innerText = target;
          }
      };
      animate();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  // Assuming lucide is available globally or imported elsewhere.
  // If not, you'll need to import it:
  // import * as lucide from 'lucide'; // Or the correct path to lucide

  lucide.createIcons()

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  
})

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', !isOpen);
  mobileMenuButton.setAttribute('aria-expanded', !isOpen);
});

// Image Carousel
const carousels = document.querySelectorAll('.image-carousel');

carousels.forEach((carousel) => {
  const images = carousel.querySelectorAll('img');
  let currentImageIndex = 0;

  // Initialize: Set the first image to be visible
  images[currentImageIndex].classList.add('active');

  setInterval(() => {
    // Fade out the current image
    images[currentImageIndex].classList.remove('active');

    // Calculate the next image index
    const nextImageIndex = (currentImageIndex + 1) % images.length;

    // Fade in the next image
    images[nextImageIndex].classList.add('active');

    // Update the current image index
    currentImageIndex = nextImageIndex;
  }, 5000); // Change image every 5 seconds
});

// Array to store reviews
// Array to store reviews
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// DOM Elements
const addReviewButton = document.getElementById('add-review-button');
const reviewPopup = document.getElementById('review-popup');
const closePopup = document.getElementById('close-popup');
const reviewForm = document.getElementById('review-form');
const reviewCards = document.getElementById('review-cards');
const stars = document.querySelectorAll('.star-rating .star');
const ratingInput = document.getElementById('review-rating');

// Open Popup
addReviewButton.addEventListener('click', () => {
  reviewPopup.classList.add('open');
});

// Close Popup
closePopup.addEventListener('click', () => {
  reviewPopup.classList.remove('open');
});

// Star Rating System
stars.forEach((star) => {
  star.addEventListener('click', () => {
    const rating = star.getAttribute('data-rating');
    ratingInput.value = rating; // Set the hidden input value

    // Highlight selected stars
    stars.forEach((s, index) => {
      if (index < rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
});

// Review Form Submission
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('review-name').value;
  const rating = ratingInput.value; // Get the rating from the hidden input
  const comment = document.getElementById('review-comment').value;

  // Validate rating
  if (!rating) {
    alert('Please select a rating.');
    return;
  }

  // Create a new review object
  const review = {
    name,
    rating,
    comment,
  };

  // Add the review to the array
  reviews.push(review);

  // Save the reviews to Local Storage
  localStorage.setItem('reviews', JSON.stringify(reviews));

  // Clear the form
  reviewForm.reset();

  // Reset stars
  stars.forEach((star) => star.classList.remove('active'));

  // Close the popup
  reviewPopup.classList.remove('open');

  // Display the reviews
  displayReviews();
});

// Function to display reviews
function displayReviews() {
  // Clear the existing reviews
  reviewCards.innerHTML = '';

  // Loop through the reviews array and create review cards
  reviews.forEach((review) => {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');

    // Add rating stars
    const ratingStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

    // Add review content
    reviewCard.innerHTML = `
      <div class="rating">${ratingStars}</div>
      <p>${review.comment}</p>
      <div class="author">- ${review.name}</div>
    `;

    // Append the review card to the container
    reviewCards.appendChild(reviewCard);
  });
}

// Load reviews from Local Storage when the page loads
window.addEventListener('load', () => {
  displayReviews();
});



// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);

  try {
    await emailjs.send(
      'service_hno02jo',
      'template_fm1oiza',
      {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      },
      'N81FOQih4FIfB5U5l'
    );
    alert('Message sent successfully!');
    contactForm.reset();
  } catch (error) {
    console.error('Failed to send message:', error);
    alert('Failed to send message. Please try again later.');
  }
});