// Map company names to their logo filenames
export const companyLogoMap: Record<string, string> = {
  'LINE MAN Wongnai': 'lineman-wongnai',
  'FairPlay Studios': 'fairplay-studios',
  'บริษัท ซิลิคอน คราฟท์ เทคโนโลยี จำกัด (มหาชน)': 'silicon-craft',
  'บริษัท อินโนเวทีฟ เอ็กซ์ตรีมิสต์ จำกัด': 'inox',
  'Betagro ': 'betagro',
  'Betagro': 'betagro',
  'T.N. Digital Solutions Co., Ltd.': 'tn-digital-solutions',
  'ATA IT Limited': 'ata-it-limited',
  'บริษัท มายออเดอร์ อินเทลลิเจนซ์': 'myorder-intelligence',
  'Freewill Solutions Co., Ltd.': 'freewill-solutions',
  'TCC Technology Group ': 'tcc-technology-group',
  'TCC Technology Group': 'tcc-technology-group',
  'บริษัท อีเอสพี เอเซียน เซ็นเตอร์ จำกัด': 'esp-asian-centre',
  'ABACUS  digital Co., Ltd.': 'abacus-digital',
  'ABACUS digital Co., Ltd.': 'abacus-digital',
  'บริษัท เมอร์ซิล โซลูชั่นส์ จำกัด': 'mercil-solutions',
  'บริษัท เพลย์ทอเรียม โซลูชันส์ จำกัด (มหาชน)': 'playtorium-solutions',
  'บ. ลินเซ่นส์ (ประเทศไทย) จำกัด': 'linxens',
  'บริษัท เก็ต ออน เทคโนโลยี จำกัด ': 'get-on-technology',
  'บริษัท เก็ต ออน เทคโนโลยี จำกัด': 'get-on-technology',
  'SkillLane Technology Public Company Limited': 'skilllane',
  'บริษัท ลูลู่ เทคโนโลยี จำกัด': 'looloo-technology',
  'บมจ.ซีพีเอฟ (ประเทศไทย)': 'cpf',
  'ควอนเทียม เทคโนโลยี': 'quantum-technology',
  '1Moby Co.,Ltd': '1moby',
  'บริษัท ยานนิกซ์ จำกัด': 'yannix',
  'บริษัท ไอโคเน็กซ์ จำกัด': 'iconex',
  'C.J. Express Group Co., Ltd': 'cj-express',
  'The Red Carbon': 'the-red-carbon',
  'บริษัท อักษรเจริญทัศน์ อจท. จำกัด': 'aksorn-charoen-tat',
  'Sunday Ins.': 'sunday-ins',
  'บริษัท เอ็ม เอฟ อี ซี จำกัด(มหาชน)': 'mfec',
  'SCB TechX': 'scb-techx',
  ' บริษัท ไอทีวัน จำกัด': 'it-one',
  'บริษัท ไอทีวัน จำกัด': 'it-one',
  'ธนาคารกรุงเทพ จำกัด (มหาชน)': 'bangkok-bank',
  'KASIKORN Business-Technology Group [KBTG]': 'kbtg',
  'บริษัท โมทีฟ เทคโนโลยี จำกัด (มหาชน) ': 'motif-technology',
  'บริษัท โมทีฟ เทคโนโลยี จำกัด (มหาชน)': 'motif-technology',
  'Codefin Co., Ltd.': 'codefin',
  'Nextwave (Thailand) Co., Ltd.': 'nextwave',
  'บริษัท สามารถเทลคอม จำกัด (มหาชน)': 'samart-telcom',
  'บริษัท ทรูเวฟ (ประเทศไทย) จำกัด': 'throughwave',
};

export function getCompanyLogoFilename(companyName: string): string {
  // Try exact match first (with trimming)
  const trimmedName = companyName.trim();
  if (companyLogoMap[trimmedName]) {
    return companyLogoMap[trimmedName];
  }
  
  // Try without trailing space
  if (companyLogoMap[trimmedName.trimEnd()]) {
    return companyLogoMap[trimmedName.trimEnd()];
  }
  
  // Fallback: return empty string (will show initials)
  return '';
}
