const weatherForm = document.querySelector('form');
const paragraphs = document.querySelectorAll('.paragraph');

weatherForm.addEventListener('submit', (_) => {
    _.preventDefault();
    const city = document.getElementById('input');
    fetch(`http://localhost:3000/weather?address=${city.value}`).then(
        (response) => {
            response.json().then((data) => {
                let i = 0;
                for (const [key, value] of Object.entries(data)) {
                    console.log(`${key}: ${value}`);
                    paragraphs[i].textContent = `${key}: ${value}`;
                    i++;
                }
            });
        }
    );
});
