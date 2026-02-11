// BRAIN//SPARK - QUIZ DATABASE
// 10 Questions per category

const quizDatabase = {
    technology: [
        {
            question: "What does CPU stand for in computing?",
            answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Utility"],
            correctAnswer: 0
        },
        {
            question: "Which programming language is primarily used for web frontend development?",
            answers: ["Python", "JavaScript", "C++", "Ruby"],
            correctAnswer: 1
        },
        {
            question: "What does 'HTTP' stand for?",
            answers: ["High Transfer Text Protocol", "HyperText Transfer Protocol", "Hybrid Text Transfer Process", "HyperText Technical Protocol"],
            correctAnswer: 1
        },
        {
            question: "Who is known as the father of the computer?",
            answers: ["Steve Jobs", "Bill Gates", "Charles Babbage", "Alan Turing"],
            correctAnswer: 2
        },
        {
            question: "What does 'AI' stand for in technology?",
            answers: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
            correctAnswer: 1
        },
        {
            question: "Which company developed the Android operating system?",
            answers: ["Apple", "Microsoft", "Google", "Samsung"],
            correctAnswer: 2
        },
        {
            question: "What is the main function of RAM in a computer?",
            answers: ["Long-term storage", "Temporary data storage", "Internet connectivity", "Graphics processing"],
            correctAnswer: 1
        },
        {
            question: "What does 'URL' stand for?",
            answers: ["Universal Resource Locator", "Uniform Resource Locator", "United Resource Link", "Universal Reference Link"],
            correctAnswer: 1
        },
        {
            question: "Which of these is NOT a programming paradigm?",
            answers: ["Object-Oriented", "Functional", "Procedural", "Sequential"],
            correctAnswer: 3
        },
        {
            question: "What does 'VPN' stand for?",
            answers: ["Virtual Private Network", "Very Personal Network", "Virtual Public Network", "Verified Private Node"],
            correctAnswer: 0
        }
    ],
    
    science: [
        {
            question: "What is the chemical symbol for gold?",
            answers: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: 2
        },
        {
            question: "How many planets are in our solar system?",
            answers: ["7", "8", "9", "10"],
            correctAnswer: 1
        },
        {
            question: "What is the speed of light?",
            answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
            correctAnswer: 0
        },
        {
            question: "What is the powerhouse of the cell?",
            answers: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            correctAnswer: 2
        },
        {
            question: "What is the chemical formula for water?",
            answers: ["H2O", "CO2", "O2", "H2O2"],
            correctAnswer: 0
        },
        {
            question: "What is the largest organ in the human body?",
            answers: ["Heart", "Liver", "Brain", "Skin"],
            correctAnswer: 3
        },
        {
            question: "What is the most abundant gas in Earth's atmosphere?",
            answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correctAnswer: 1
        },
        {
            question: "What is the smallest unit of life?",
            answers: ["Atom", "Molecule", "Cell", "Organ"],
            correctAnswer: 2
        },
        {
            question: "Who developed the theory of relativity?",
            answers: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
            correctAnswer: 1
        },
        {
            question: "What is the boiling point of water at sea level?",
            answers: ["90°C", "100°C", "110°C", "120°C"],
            correctAnswer: 1
        }
    ],
    
    arts: [
        {
            question: "Who painted the Mona Lisa?",
            answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        },
        {
            question: "Which artist cut off part of his own ear?",
            answers: ["Claude Monet", "Vincent van Gogh", "Salvador Dalí", "Pablo Picasso"],
            correctAnswer: 1
        },
        {
            question: "What is the art of beautiful handwriting called?",
            answers: ["Typography", "Calligraphy", "Lithography", "Orthography"],
            correctAnswer: 1
        },
        {
            question: "Which musical note is represented by a hollow oval with a stem?",
            answers: ["Whole note", "Half note", "Quarter note", "Eighth note"],
            correctAnswer: 1
        },
        {
            question: "Who composed the opera 'The Magic Flute'?",
            answers: ["Beethoven", "Mozart", "Bach", "Verdi"],
            correctAnswer: 1
        },
        {
            question: "What art movement was Salvador Dalí associated with?",
            answers: ["Impressionism", "Cubism", "Surrealism", "Expressionism"],
            correctAnswer: 2
        },
        {
            question: "Which instrument has 88 keys?",
            answers: ["Organ", "Harpsichord", "Piano", "Synthesizer"],
            correctAnswer: 2
        },
        {
            question: "Who sculpted 'The Thinker'?",
            answers: ["Auguste Rodin", "Michelangelo", "Donatello", "Bernini"],
            correctAnswer: 0
        },
        {
            question: "What is the primary color that is NOT red or blue?",
            answers: ["Green", "Yellow", "Orange", "Purple"],
            correctAnswer: 1
        },
        {
            question: "Which art period came before the Renaissance?",
            answers: ["Baroque", "Medieval", "Romantic", "Modern"],
            correctAnswer: 1
        }
    ],
    
    history: [
        {
            question: "In which year did World War II end?",
            answers: ["1943", "1944", "1945", "1946"],
            correctAnswer: 2
        },
        {
            question: "Who was the first President of the United States?",
            answers: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
            correctAnswer: 1
        },
        {
            question: "What year did the Berlin Wall fall?",
            answers: ["1987", "1988", "1989", "1990"],
            correctAnswer: 2
        },
        {
            question: "Which ancient civilization built the pyramids of Giza?",
            answers: ["Romans", "Greeks", "Egyptians", "Babylonians"],
            correctAnswer: 2
        },
        {
            question: "Who was known as the 'Iron Lady'?",
            answers: ["Margaret Thatcher", "Queen Elizabeth II", "Angela Merkel", "Indira Gandhi"],
            correctAnswer: 0
        },
        {
            question: "What year did the Titanic sink?",
            answers: ["1910", "1911", "1912", "1913"],
            correctAnswer: 2
        },
        {
            question: "Who discovered America in 1492?",
            answers: ["Amerigo Vespucci", "Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama"],
            correctAnswer: 1
        },
        {
            question: "What was the name of the first artificial satellite launched into space?",
            answers: ["Apollo 1", "Sputnik 1", "Explorer 1", "Vostok 1"],
            correctAnswer: 1
        },
        {
            question: "In which year did the French Revolution begin?",
            answers: ["1776", "1789", "1804", "1815"],
            correctAnswer: 1
        },
        {
            question: "Who wrote the Declaration of Independence?",
            answers: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
            correctAnswer: 2
        }
    ],
    
    geography: [
        {
            question: "What is the capital of Australia?",
            answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correctAnswer: 2
        },
        {
            question: "Which is the longest river in the world?",
            answers: ["Amazon", "Nile", "Mississippi", "Yangtze"],
            correctAnswer: 1
        },
        {
            question: "How many continents are there?",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 2
        },
        {
            question: "What is the smallest country in the world?",
            answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
            correctAnswer: 2
        },
        {
            question: "Which desert is the largest in the world?",
            answers: ["Sahara", "Arabian", "Gobi", "Antarctic"],
            correctAnswer: 3
        },
        {
            question: "What is the capital of Canada?",
            answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
            correctAnswer: 3
        },
        {
            question: "Which ocean is the largest?",
            answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
            correctAnswer: 2
        },
        {
            question: "Mount Everest is located in which mountain range?",
            answers: ["Alps", "Andes", "Himalayas", "Rockies"],
            correctAnswer: 2
        },
        {
            question: "Which country has the most natural lakes?",
            answers: ["United States", "Canada", "Russia", "Finland"],
            correctAnswer: 1
        },
        {
            question: "What is the largest island in the world?",
            answers: ["Madagascar", "Greenland", "New Guinea", "Borneo"],
            correctAnswer: 1
        }
    ],
    
    sports: [
        {
            question: "How many players are on a soccer team?",
            answers: ["9", "10", "11", "12"],
            correctAnswer: 2
        },
        {
            question: "In which sport would you perform a slam dunk?",
            answers: ["Volleyball", "Basketball", "Tennis", "Baseball"],
            correctAnswer: 1
        },
        {
            question: "How many rings are on the Olympic flag?",
            answers: ["4", "5", "6", "7"],
            correctAnswer: 1
        },
        {
            question: "What is the maximum score in a single frame of bowling?",
            answers: ["100", "200", "300", "400"],
            correctAnswer: 2
        },
        {
            question: "Which country has won the most FIFA World Cups?",
            answers: ["Germany", "Argentina", "Brazil", "Italy"],
            correctAnswer: 2
        },
        {
            question: "In tennis, what is a score of zero called?",
            answers: ["Nil", "Zero", "Love", "Nothing"],
            correctAnswer: 2
        },
        {
            question: "How many holes are played in a standard round of golf?",
            answers: ["9", "12", "18", "24"],
            correctAnswer: 2
        },
        {
            question: "What is the diameter of a basketball hoop in inches?",
            answers: ["16", "18", "20", "22"],
            correctAnswer: 1
        },
        {
            question: "In which sport is the term 'home run' used?",
            answers: ["Cricket", "Baseball", "Football", "Hockey"],
            correctAnswer: 1
        },
        {
            question: "How many Grand Slam tournaments are there in tennis?",
            answers: ["2", "3", "4", "5"],
            correctAnswer: 2
        }
    ]
};

// Make it available globally
window.quizDatabase = quizDatabase;