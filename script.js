const supabaseUrl = 'https://dsvpkrxakgsnhyiatdrk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdnBrcnhha2dzbmh5aWF0ZHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTcyMzcsImV4cCI6MjA3MDY5MzIzN30._iltjWd-Ou70lTcQ3qI3FGx8aM9jc9yVi-9Lx35YcNg';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch 10 random questions
async function loadQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  const container = document.getElementById('question-container');
  container.innerHTML = ''; // Clear previous content

  data.forEach((question, index) => {
    const questionBox = document.createElement('div');
    questionBox.className = 'question-box';

    // Question text
    const qText = document.createElement('p');
    qText.innerHTML = `<strong>Q${index + 1}:</strong> ${question.question_text}`;
    questionBox.appendChild(qText);

    // Optional image
    if (question.image_url) {
      const img = document.createElement('img');
      img.src = question.image_url;
      img.alt = 'Question image';
      img.style.maxWidth = '300px';
      questionBox.appendChild(img);
    }

    // Choices
    const choicesList = document.createElement('ul');
    for (const [key, value] of Object.entries(question.choices)) {
      const li = document.createElement('li');
      li.innerHTML = `
        <label>
          <input type="checkbox" name="q${question.id}" value="${key}" />
          ${key}. ${value}
        </label>
      `;
      choicesList.appendChild(li);
    }

    questionBox.appendChild(choicesList);
    container.appendChild(questionBox);
  });

  // Render math formulas
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

