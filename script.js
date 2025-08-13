function selectAnswer(choice) {
  const correct = 'C'; // Correct answer is C. 7
  const feedback = document.getElementById('feedback');

  if (choice === correct) {
    feedback.textContent = '✅ Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = '❌ Incorrect. Try again!';
    feedback.style.color = 'red';
  }
}
