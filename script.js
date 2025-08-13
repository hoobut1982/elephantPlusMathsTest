// --- Supabase Configuration ---
// Your Supabase project URL and anon key
const supabaseUrl = 'https://dsvpkrxakgsnhyiatdrk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdnBrcnhha2dzbmh5aWF0ZHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTcyMzcsImV4cCI6MjA3MDY5MzIzN30._iltjWd-Ou70lTcQ3qI3FGx8aM9jc9yVi-9Lx35YcNg';

// --- FIX: Initialize the client ---
// The 'supabase' object comes from the script loaded in your HTML.
// We create a new constant, '_supabase', to hold our client connection.
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log('Supabase client initialized.');


// Fetches questions and displays them on the page
async function loadQuestions() {
  console.log('Attempting to fetch questions from Supabase...');

  // --- FIX: Use the correctly initialized '_supabase' client ---
  const { data, error } = await _supabase
    .from('questions')
    .select('*')
    .limit(10); // Note: Random ordering requires a more complex function. This gets the 10 most recent.

  // --- DEBUG: Check for fetch errors ---
  if (error) {
    console.error('Error fetching questions:', error);
    // You might want to display a user-friendly error message on the page here
    return;
  }

  // --- DEBUG: Log the data to see what we received ---
  console.log('Successfully fetched data:', data);

  const container = document.getElementById('question-container');

  // --- DEBUG: Check if the container element exists ---
  if (!container) {
    console.error('Critical Error: The element with id="question-container" was not found in the HTML.');
    return;
  }

  container.innerHTML = ''; // Clear previous content

  data.forEach((question, index) => {
    // --- DEBUG: Log each question as it's being processed ---
    console.log(`Processing question ${index + 1}:`, question);

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
    if (question.choices && typeof question.choices === 'object') {
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
    }

    container.appendChild(questionBox);
  });

  // Render math formulas if MathJax is available
  if (window.MathJax) {
    console.log('MathJax found. Typesetting mathematical formulas...');
    MathJax.typesetPromise();
  }
}

// Load questions when the page's main content has loaded
window.addEventListener('DOMContentLoaded', loadQuestions);