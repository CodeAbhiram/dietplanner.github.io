document.getElementById("submit").addEventListener('click', function(e) {
    e.preventDefault();
    const calories = document.getElementById('calories').value;
    const apiKey = '0d9ccc49f3f14e5ebb7b94e5c65c39e7';
  
    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories||result.result}`)
      .then(response => response.json())
      .then(data => {
        let resultHTML = '<h2>Your Meal Plan</h2>';
        data.meals.forEach(meal => {
          resultHTML += `<div class="meal">
            <h3>${meal.title}</h3>
            <p>Ready in: ${meal.readyInMinutes} minutes</p>
            <p>Servings: ${meal.servings}</p>
            <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
          </div>`;
        });
        document.getElementById('meal-plan-content').innerHTML = resultHTML;
        document.getElementById('mealPlanModal').style.display = 'block';
      })
      .catch(error => console.error('Error fetching meal plan:', error));
  });
  
  // popup
  const mealPlanModal = document.getElementById("mealPlanModal");
  const tdeeCalculatorModal = document.getElementById("tdeeCalculatorModal");
  
  // popup
  const closeMealPlanModal = document.getElementById("closeMealPlanModal");
  const closeTdeeCalculatorModal = document.getElementById("closeTdeeCalculatorModal");
  
  //close popup
  closeMealPlanModal.onclick = function() {
    mealPlanModal.style.display = "none";
  }
  closeTdeeCalculatorModal.onclick = function() {
    tdeeCalculatorModal.style.display = "none";
  }
  
  // closepopup
  window.onclick = function(event) {
    if (event.target == mealPlanModal) {
      mealPlanModal.style.display = "none";
    }
    if (event.target == tdeeCalculatorModal) {
      tdeeCalculatorModal.style.display = "none";
    }
  }
  
  // Show the TDEE Calculator Modal
  document.getElementById("not-sure").addEventListener('click', function(e) {
    e.preventDefault();
    tdeeCalculatorModal.style.display = 'block';
  });
  
  // Calculate TDEE
  document.getElementById("calculateTDEE").addEventListener("click", function() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const activity = document.getElementById("activity-level").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const res = document.getElementById("res");
  
    const url = `https://gym-fit.p.rapidapi.com/v1/calculator/tdee?activityLevel=${activity}&gender=${gender}&age=${age}&weight=${weight}&height=${height}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7faefdf719msh7d8d68820c8a714p191f74jsne8ca8bec1540',
        'x-rapidapi-host': 'gym-fit.p.rapidapi.com'
      }
    };
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        console.log(result);
        res.textContent = result.result; 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  