import {
  parseCompaniesCsv,
  splitAndNormalize,
  parseYearLevels,
  parseParticipationTime,
  createSearchText,
} from '@/lib/parseCsv';

describe('CSV Parser - Helper Functions', () => {
  describe('splitAndNormalize', () => {
    it('splits by comma and trims whitespace', () => {
      const result = splitAndNormalize('Java, Python, JavaScript');
      expect(result).toEqual(['Java', 'Python', 'JavaScript']);
    });

    it('splits by semicolon', () => {
      const result = splitAndNormalize('Java; Python; JavaScript');
      expect(result).toEqual(['Java', 'Python', 'JavaScript']);
    });

    it('removes empty strings', () => {
      const result = splitAndNormalize('Java, , Python, ');
      expect(result).toEqual(['Java', 'Python']);
    });

    it('deduplicates case-insensitively while preserving casing', () => {
      const result = splitAndNormalize('Java, JAVA, java, Python');
      expect(result).toEqual(['Java', 'Python']);
    });

    it('handles undefined input', () => {
      expect(splitAndNormalize(undefined)).toEqual([]);
    });

    it('handles empty string', () => {
      expect(splitAndNormalize('')).toEqual([]);
    });
  });

  describe('parseYearLevels', () => {
    it('extracts single year', () => {
      const result = parseYearLevels('นิสิตปี 3');
      expect(result).toEqual([3]);
    });

    it('extracts multiple years', () => {
      const result = parseYearLevels('นิสิตปี 2,3,4');
      expect(result).toEqual([2, 3, 4]);
    });

    it('handles year+ notation', () => {
      const result = parseYearLevels('นิสิตปี 3+');
      expect(result).toEqual([3, 4]);
    });

    it('returns sorted unique array', () => {
      const result = parseYearLevels('4, 2, 3, 2, 4');
      expect(result).toEqual([2, 3, 4]);
    });

    it('ignores invalid year numbers', () => {
      const result = parseYearLevels('year 2, 5, 3');
      expect(result).toEqual([2, 3]);
    });

    it('handles undefined input', () => {
      expect(parseYearLevels(undefined)).toEqual([]);
    });
  });

  describe('parseParticipationTime', () => {
    it('parses HH:mm format', () => {
      const result = parseParticipationTime('9:30 - 17:00');
      expect(result).toBe(9 * 60 + 30); // 570
    });

    it('parses HH.mm format', () => {
      const result = parseParticipationTime('09.30 น.');
      expect(result).toBe(9 * 60 + 30); // 570
    });

    it('parses single digit hour', () => {
      const result = parseParticipationTime('9:00');
      expect(result).toBe(9 * 60); // 540
    });

    it('handles ranges', () => {
      const result = parseParticipationTime('13:00-15:00');
      expect(result).toBe(13 * 60); // 780 (first time)
    });

    it('returns Infinity for invalid format', () => {
      expect(parseParticipationTime('invalid')).toBe(Infinity);
    });

    it('returns Infinity for out-of-range time', () => {
      expect(parseParticipationTime('25:00')).toBe(Infinity);
      expect(parseParticipationTime('12:75')).toBe(Infinity);
    });

    it('handles undefined input', () => {
      expect(parseParticipationTime(undefined)).toBe(Infinity);
    });
  });

  describe('createSearchText', () => {
    it('concatenates and lowercases fields', () => {
      const result = createSearchText(
        'ABC Corp',
        'Software Development',
        ['Backend Developer', 'Frontend Developer'],
        ['Java', 'React']
      );
      expect(result).toContain('abc corp');
      expect(result).toContain('software development');
      expect(result).toContain('backend developer');
      expect(result).toContain('java');
    });

    it('handles empty arrays', () => {
      const result = createSearchText('Company', 'Type', [], []);
      expect(result).toBe('company type');
    });

    it('trims excess whitespace', () => {
      const result = createSearchText('  Company  ', 'Type', [], []);
      expect(result).toBe('company type');
    });
  });
});

describe('parseCompaniesCsv', () => {
  it('parses valid CSV with all fields', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ,สถานประกอบการของท่านสะดวกเข้าร่วมกิจกรรมได้ตลอดทั้งวันหรือไม่,ตำแหน่งงานที่ต้องการรับ,ทักษะ/ความสามารถที่ต้องการ,ท่านต้องการรับพนักงานกลุ่มใด,หากท่านรับนิสิตฝึกงาน ต้องการรับนิสิตชั้นปีที่เท่าใดขึ้นไป
Tech Corp,Software Development,9:30 - 17:00,Backend Developer; Frontend Developer,Java; React,Full-time; Part-time,Year 3`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Tech Corp');
    expect(result[0].businessType).toBe('Software Development');
    expect(result[0].participationTime).toBe('9:30 - 17:00');
    expect(result[0].positions).toContain('Backend Developer');
    expect(result[0].positions).toContain('Frontend Developer');
    expect(result[0].skills).toContain('Java');
    expect(result[0].skills).toContain('React');
    expect(result[0].employmentTypes).toContain('Full-time');
    expect(result[0].employmentTypes).toContain('Part-time');
    expect(result[0].yearLevels).toContain(3);
    expect(result[0].startMinutes).toBe(570); // 9:30
  });

  it('handles missing optional fields', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ
Company A,Banking`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Company A');
    expect(result[0].businessType).toBe('Banking');
    expect(result[0].positions).toEqual([]);
    expect(result[0].skills).toEqual([]);
    expect(result[0].employmentTypes).toEqual([]);
    expect(result[0].yearLevels).toEqual([]);
    expect(result[0].participationTime).toBe('');
  });

  it('skips rows with missing required fields', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ
Company A,Banking
,Missing Name
Company B,Tech`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Company A');
    expect(result[1].name).toBe('Company B');
  });

  it('normalizes array fields (trim, dedupe)', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ,ทักษะ/ความสามารถที่ต้องการ
Company,Type,"  Java  ,  Python  ,  java  "`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(1);
    expect(result[0].skills).toEqual(['Java', 'Python']);
  });

  it('handles contact info exclusion', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ,email,phone,อีเมล,เบอร์โทร
Company A,Banking,test@example.com,0123456789,contact@test.com,081-234-5678
Company B,Tech,another@test.com,0987654321,another2@test.com,089-876-5432`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(2);
    // Verify no email or phone data in result
    expect(JSON.stringify(result)).not.toContain('@example.com');
    expect(JSON.stringify(result)).not.toContain('0123456789');
  });

  it('parses multiple rows', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ,สถานประกอบการของท่านสะดวกเข้าร่วมกิจกรรมได้ตลอดทั้งวันหรือไม่
Company A,Banking,9:30 - 17:00
Company B,Tech,10:00 - 16:00
Company C,Healthcare,8:00 - 18:00`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(3);
    expect(result.map((c) => c.name)).toEqual([
      'Company A',
      'Company B',
      'Company C',
    ]);
  });

  it('creates searchText for fast searching', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ,ตำแหน่งงานที่ต้องการรับ,ทักษะ/ความสามารถที่ต้องการ
Tech Solutions,Software Development,Backend Developer; QA,Java; JavaScript`;

    const result = parseCompaniesCsv(csv);

    expect(result[0].searchText).toContain('tech solutions');
    expect(result[0].searchText).toContain('software development');
    expect(result[0].searchText).toContain('backend developer');
    expect(result[0].searchText).toContain('java');
  });

  it('handles Thai characters correctly', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ
บริษัท ทดสอบ,การพัฒนาซอฟแวร์`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('บริษัท ทดสอบ');
    expect(result[0].businessType).toBe('การพัฒนาซอฟแวร์');
  });

  it('handles empty CSV', () => {
    const result = parseCompaniesCsv('');
    expect(result).toEqual([]);
  });

  it('handles CSV with only headers', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ`;
    const result = parseCompaniesCsv(csv);
    expect(result).toEqual([]);
  });

  it('handles English column names', () => {
    const csv = `company_name,business_type,employment_type
Company A,Banking,full-time`;

    const result = parseCompaniesCsv(csv);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Company A');
    expect(result[0].businessType).toBe('Banking');
    expect(result[0].employmentTypes).toContain('full-time');
  });

  it('parses time with various formats', () => {
    const csv = `ชื่อสถานประกอบการ,ลักษณะงานที่สถานประกอบการทำ,สถานประกอบการของท่านสะดวกเข้าร่วมกิจกรรมได้ตลอดทั้งวันหรือไม่
Company A,Banking,09:30 - 17:00
Company B,Tech,9.30 น.
Company C,Healthcare,invalid time`;

    const result = parseCompaniesCsv(csv);

    expect(result[0].startMinutes).toBe(570); // 9:30
    expect(result[1].startMinutes).toBe(570); // 9:30
    expect(result[2].startMinutes).toBe(Infinity); // invalid
  });
});
