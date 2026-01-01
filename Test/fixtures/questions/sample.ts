export const mockQuestions = [
  {
    title: "Test Question - Easy",
    language: "Cpp",
    topic: "Language Knowledge",
    difficulty: "Easy",
    description: "// Test code\nint main() {\n    return 0;\n}",
    options: ["0", "1", "Undefined", "Compilation error"],
    correct_answer: "0"
  },
  {
    title: "Test Question - Medium",
    language: "Python",
    topic: "Algorithms",
    difficulty: "Medium",
    description: "def test():\n    return True",
    options: ["True", "False", "None", "Error"],
    correct_answer: "True"
  },
  {
    title: "Test Question - Hard",
    language: "Rust",
    topic: "Memory Management",
    difficulty: "Hard",
    description: "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
    options: ["5", "Compilation error", "Runtime error", "Undefined"],
    correct_answer: "5"
  }
];

export const mockQuestion = mockQuestions[0];

