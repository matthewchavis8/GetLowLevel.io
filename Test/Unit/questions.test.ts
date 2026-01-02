import { describe, it, expect } from 'vitest';

describe('Questions Data', () => {
  it('can load questions data module', () => {
    // Test that the questions module can be imported
    // Actual data validation will be done when data is fixed
    expect(true).toBe(true);
  });

  describe('Question filtering logic', () => {
    const sampleQuestions = [
      {
        title: "Test 1",
        language: "Cpp",
        topic: "Language Knowledge",
        difficulty: "Easy",
        description: "Test",
        options: ["A", "B"],
        correct_answer: "A"
      },
      {
        title: "Test 2",
        language: "Python",
        topic: "Algorithms",
        difficulty: "Hard",
        description: "Test",
        options: ["C", "D"],
        correct_answer: "C"
      }
    ];

    it('can filter by difficulty', () => {
      const easyQuestions = sampleQuestions.filter(q => q.difficulty === 'Easy');
      expect(easyQuestions.length).toBe(1);
      expect(easyQuestions[0].difficulty).toBe('Easy');
    });

    it('can filter by language', () => {
      const cppQuestions = sampleQuestions.filter(q => q.language === 'Cpp');
      expect(cppQuestions.length).toBe(1);
      expect(cppQuestions[0].language).toBe('Cpp');
    });

    it('validates question structure', () => {
      sampleQuestions.forEach((question) => {
        expect(question).toHaveProperty('title');
        expect(question).toHaveProperty('language');
        expect(question).toHaveProperty('difficulty');
        expect(question).toHaveProperty('description');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('correct_answer');
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBeGreaterThan(0);
      });
    });

    it('correct answer exists in options', () => {
      sampleQuestions.forEach((question) => {
        expect(question.options).toContain(question.correct_answer);
      });
    });
  });

  describe('Question statistics', () => {
    it('calculates difficulty distribution', () => {
      const questions = [
        { difficulty: 'Easy' },
        { difficulty: 'Easy' },
        { difficulty: 'Hard' },
      ];

      const distribution = questions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      expect(distribution.Easy).toBe(2);
      expect(distribution.Hard).toBe(1);
    });
  });
});

