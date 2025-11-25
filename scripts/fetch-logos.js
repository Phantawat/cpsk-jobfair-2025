const fs = require('fs');
const https = require('https');
const path = require('path');

const companies = [
  { name: 'FairPlay Studios', filename: 'fairplay-studios', domain: 'fairplaystudios.com' },
  { name: 'บริษัท ซิลิคอน คราฟท์ เทคโนโลยี จำกัด (มหาชน)', filename: 'silicon-craft', domain: 'sic.co.th' },
  { name: 'บริษัท อินโนเวทีฟ เอ็กซ์ตรีมิสต์ จำกัด', filename: 'innovative-extremist', domain: 'innovativeextremist.com' },
  { name: 'Betagro', filename: 'betagro', domain: 'betagro.com' },
  { name: 'T.N. Digital Solutions Co., Ltd.', filename: 'tn-digital-solutions', domain: 'tndigital.co.th' },
  { name: 'ATA IT Limited', filename: 'ata-it-limited', domain: 'ata.co.th' },
  { name: 'บริษัท มายออเดอร์ อินเทลลิเจนซ์', filename: 'myorder-intelligence', domain: 'myorder.co.th' },
  { name: 'Freewill Solutions Co., Ltd.', filename: 'freewill-solutions', domain: 'freewillsolutions.com' },
  { name: 'TCC Technology Group', filename: 'tcc-technology-group', domain: 'tcctechnology.com' },
  { name: 'บริษัท อีเอสพี เอเซียน เซ็นเตอร์ จำกัด', filename: 'esp-asian-centre', domain: 'espasia.com' },
  { name: 'ABACUS digital Co., Ltd.', filename: 'abacus-digital', domain: 'abacusdigital.co.th' },
  { name: 'บริษัท ทรูเวฟ (ประเทศไทย) จำกัด', filename: 'truewave', domain: 'truewave.co.th' },
  { name: 'บริษัท เมอร์ซิล โซลูชั่นส์ จำกัด', filename: 'mercil-solutions', domain: 'mercil.co.th' },
  { name: 'บริษัท เพลย์ทอเรียม โซลูชันส์ จำกัด (มหาชน)', filename: 'playtorium-solutions', domain: 'playtorium.com' },
  { name: 'บ. ลินเซ่นส์ (ประเทศไทย) จำกัด', filename: 'linxens', domain: 'linxens.com' },
  { name: 'บริษัท เก็ต ออน เทคโนโลยี จำกัด', filename: 'get-on-technology', domain: 'geton.co.th' },
  { name: 'SkillLane Technology Public Company Limited', filename: 'skilllane', domain: 'skilllane.com' },
  { name: 'บริษัท ลูลู่ เทคโนโลยี จำกัด', filename: 'luluz-technology', domain: 'luluz.com' },
  { name: 'บมจ.ซีพีเอฟ (ประเทศไทย)', filename: 'cpf', domain: 'cpfworldwide.com' },
  { name: 'ควอนเทียม เทคโนโลยี', filename: 'quantum-technology', domain: 'quantium.co.th' },
  { name: '1Moby Co.,Ltd', filename: '1moby', domain: '1moby.com' },
  { name: 'บริษัท ยานนิกซ์ จำกัด', filename: 'yannix', domain: 'yannix.com' },
  { name: 'บริษัท ไอโคเน็กซ์ จำกัด', filename: 'iconex', domain: 'iconex.co.th' },
  { name: 'C.J. Express Group Co., Ltd', filename: 'cj-express', domain: 'cjexpress.co.th' },
  { name: 'The Red Carbon', filename: 'the-red-carbon', domain: 'theredcarbon.com' },
  { name: 'บริษัท อักษรเจริญทัศน์ อจท. จำกัด', filename: 'aksorn-charoen-tat', domain: 'aksorn.co.th' },
  { name: 'Sunday Ins.', filename: 'sunday-ins', domain: 'sundayins.com' },
  { name: 'บริษัท เอ็ม เอฟ อี ซี จำกัด(มหาชน)', filename: 'mfec', domain: 'mfec.co.th' },
  { name: 'SCB TechX', filename: 'scb-techx', domain: 'scbtechx.io' },
  { name: 'บริษัท ไอทีวัน จำกัด', filename: 'it-one', domain: 'it-one.co.th' },
  { name: 'ธนาคารกรุงเทพ จำกัด (มหาชน)', filename: 'bangkok-bank', domain: 'bangkokbank.com' },
  { name: 'KASIKORN Business-Technology Group [KBTG]', filename: 'kbtg', domain: 'kbtg.tech' },
  { name: 'บริษัท โมทีฟ เทคโนโลยี จำกัด (มหาชน)', filename: 'motif-technology', domain: 'motiftech.com' },
  { name: 'Codefin Co., Ltd.', filename: 'codefin', domain: 'codefin.co.th' },
  { name: 'Nextwave (Thailand) Co., Ltd.', filename: 'nextwave', domain: 'nextwave.co.th' },
  { name: 'บริษัท สามารถเทลคอม จำกัด (มหาชน)', filename: 'samart-telcom', domain: 'samart.co.th' },
  { name: 'บริษัท ทรูเวฟ (ประเทศไทย) จำกัด', filename: 'throughwave', domain: 'truewave.co.th' },
  { name: 'LINE MAN Wongnai', filename: 'lineman-wongnai', domain: 'lmwn.com' },
];

const logosDir = path.join(__dirname, '../public/logos');

// Ensure logos directory exists
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Multiple sources to try
const logoSources = [
  (domain) => `https://logo.clearbit.com/${domain}`,
  (domain) => `https://img.logo.dev/${domain}?token=pk_X-WvS-FGRyuNf8яJvn-pQ`, // You'd need to get a free API key from logo.dev
  (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
  (domain) => `https://unavatar.io/${domain}?fallback=false`,
];

async function downloadLogo(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
        fileStream.on('error', reject);
      } else {
        resolve(false);
      }
    }).on('error', reject);
  });
}

async function fetchLogos() {
  console.log('Starting logo download...\n');
  
  for (const company of companies) {
    const filepath = path.join(logosDir, `${company.filename}.png`);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${company.name} - already exists`);
      continue;
    }

    console.log(`Fetching: ${company.name}`);
    let success = false;

    // Try each source
    for (const getUrl of logoSources) {
      try {
        const url = getUrl(company.domain);
        console.log(`  Trying: ${url}`);
        success = await downloadLogo(url, filepath);
        
        if (success) {
          // Check if file has content
          const stats = fs.statSync(filepath);
          if (stats.size > 100) {
            console.log(`  ✓ Success!\n`);
            break;
          } else {
            fs.unlinkSync(filepath);
            success = false;
          }
        }
      } catch (error) {
        // Try next source
      }
    }

    if (!success) {
      console.log(`  ✗ Failed to download\n`);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\nDone!');
}

fetchLogos();
