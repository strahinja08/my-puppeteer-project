const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrapeProduct(url, sixFigs) {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();
    await page.goto(url, {timeout: 0, waitUntil: 'networkidle2'})
    
    const targetXpath = '/html/body/div[12]/div/div/div/form/div[2]/div/div/div'
    
    // Tajp d nambas
    for (let i=0; i < sixFigs.length; i++) {
        const sixFig = sixFigs[i]
       
        // Numbers do not trigger the paragraph update, unless..
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        
        await page.type('#choose-number-input', sixFig);
        await page.waitForXPath(targetXpath, {visible:true});
       
        const [status] = await page.$x(targetXpath)
        const value = await (await status.getProperty('textContent')).jsonValue()

        // update array
        // outJson.push({sixFig, value})
        
        // file update -- better
        fs.appendFile('myphonenums.txt', JSON.stringify({sixFig, value})+'\n', function (err) {
            if (err) throw err;
            // console.log('Saved to file', {sixFig});
          })

    }

    browser.close()
}

// Create all 0 ... 999 999 
var up9 = [...Array(999999).keys()].map(String)

// append 0's function
function modify (el) {
  if (el.length < 6) {
    return "0".repeat(6 - el.length) + el;
  } 
  return el
}

// Apply 0's
sixFigs = up9.map(el => modify(el))

// run 
scrapeProduct('https://www.globaltel.rs/smisli-broj', sixFigs)

