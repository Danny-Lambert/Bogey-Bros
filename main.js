// Add JavaScript interactions or animations here
document.addEventListener('DOMContentLoaded', function () {
    console.log("Welcome to The Bogey Bros!");
    alert("Welcome gimps")
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('bg-dark', 'shadow');
      } else {
        navbar.classList.remove('bg-dark', 'shadow');
      }
    });
  });
  

  