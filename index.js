const fs = require("fs");
const axios = require("axios");

async function fetchData() {
    try {
      const response = await axios.get("https://www.oyakyatirim.com.tr/piyasa-verileri/XUTUM");
      const html = response.data;
  
      // HTML'i analiz etmek için bir HTML ayrıştırma kütüphanesi kullanabilirsiniz (örneğin, cheerio).
  
      // Örnek bir cheerio kullanımı:
      const cheerio = require("cheerio");
      const $ = cheerio.load(html);
      const rows = $("div.green tbody tr");
  
      const rowData = rows.map((i, row) => {
        const cells = $(row).find("td");
        const [
          sembol,
          sembolad,
          sonFiyat,
          yuksekFiyat,
          dusukFiyat,
          hacim,
          gunluk,
          haftalik,
          aylik,
          yillik,
        ] = cells.map((i, cell) => $(cell).text()).get();
        
        return {
          sembol,
          hissAdi: sembolad,
          sonFiyat,
          yuksekFiyat,
          dusukFiyat,
          hisseHacim: hacim,
          gunluk,
          haftalik,
          aylik,
          yillik,
        };
      }).get();
  
      const jsonData = JSON.stringify(rowData, null, 2);
      const jsonWay = "hisselerop.json";
      fs.writeFileSync(jsonWay, jsonData);
    } catch (error) {
      console.error("Veri çekme hatası: " + error);
    }
  }
  
fetchData();