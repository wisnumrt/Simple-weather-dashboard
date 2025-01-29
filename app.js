// app.js

const apiKey = "5dfef1cb7608afd346fdbf529e451cb1";

function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    console.log(city);
    if (!city) {
        alert("Silakan Masukkan Nama Kota");
        return;
    }

    // Resetkan animasi info-container
    const infoContainer = document.getElementById("info-container");
    infoContainer.style.animation = 'none'; // Hapus animasi lama
    infoContainer.offsetHeight; // Trigger reflow untuk memaksa browser menerapkan perubahan
    infoContainer.style.animation = 'slideIn 1s ease-out forwards'; 


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("Kota Tidak Ditemukan");
                return;
            }

            // Menampilkan informasi cuaca
            document.getElementById("info-container").style.display = "block";

            // Menampilkan nama kota di header informasi cuaca
            document.getElementById("city-name").textContent = data.name;

            // Mengisi data cuaca
            document.getElementById("temp").textContent = data.main.temp;
            document.getElementById("humidity").textContent = data.main.humidity;
            document.getElementById("condition").textContent = data.weather[0].description;
            document.getElementById("wind").textContent = data.wind.speed;
            document.getElementById("pressure").textContent = data.main.pressure;
            document.getElementById("visibility").textContent = data.visibility / 1000; 
        })
        .catch(error => {
            alert("Terjadi kesalahan saat mengambil data cuaca");
        });
}