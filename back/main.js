import puppeteer from 'puppeteer';
import fs from 'fs';

let counter = 1;
console.log('LinkeBot Iniciado 🤖🔎')

async function pupper() {
  
    
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/jobs/front-end-jobs-brasil?geoId=106057199&countryRedirected=1&position=1&pageNum=0');
  await console.log("Atualizando vagas...🔎")

  const list = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('div a');
      const textArray = [...nodeList]
      const list = textArray.map( ({href, innerText}) => ({
          href, innerText
      }));
      return list
  }); 


  fs.writeFile('./data.json', JSON.stringify(list, null, 2), err => {
      if (err) throw new Error('Alguma coisa deu errada')

      console.log(`Vagas atualizadas 👌🏻${counter ++} vezes`);
  })

 
  await browser.close();
};

export function runBot (){
    setInterval(pupper, 19000)
}

runBot();

