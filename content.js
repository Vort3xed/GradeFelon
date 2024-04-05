const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '20px';
container.style.right = '20px';
container.style.zIndex = '9999';

const pointInput = document.createElement('input');
pointInput.type = 'text';
pointInput.placeholder = 'Enter Points';
pointInput.style.marginRight = '10px';

const totalInput = document.createElement('input');
totalInput.type = 'text';
totalInput.placeholder = 'Total Points';
totalInput.style.marginRight = '10px';

const selectBox = document.createElement('select');
selectBox.style.marginRight = '10px';
const option1 = document.createElement('option');
option1.text = 'Practice / Preparation';
const option2 = document.createElement('option');
option2.text = 'All Tasks / Assessments';
selectBox.add(option1);
selectBox.add(option2);

const button = document.createElement('button');
button.textContent = 'Calculate Final Grade';

container.appendChild(pointInput);
container.appendChild(totalInput);
container.appendChild(selectBox);
container.appendChild(button);
document.body.appendChild(container);

function calculateFinalGrade(grades, maxPoints, weights) {
    let allTaskTotal = 0;
    let allTaskMaxTotal = 0;
    let pracPrepTotal = 0;
    let pracPrepMaxTotal = 0;

    for (let i = 0; i < grades.length; i++) {
        if (weights[i] === 0.9) {
            allTaskTotal += grades[i];
            allTaskMaxTotal += maxPoints[i];
        } else {
            pracPrepTotal += grades[i];
            pracPrepMaxTotal += maxPoints[i];
        }
    }

    const allTaskPercent = (allTaskTotal / allTaskMaxTotal) * 0.9;
    const pracPrepPercent = (pracPrepTotal / pracPrepMaxTotal) * 0.1;

    const final_grade = (allTaskPercent + pracPrepPercent) * 100;

    console.log(final_grade);
    return final_grade;
}

function handleButtonClick() {
    const gradeElements = document.querySelectorAll('td[aria-colindex="8"]');
    const weightElements = document.querySelectorAll('td[aria-colindex="4"]');

    const grades = [];
    const weights = [];
    const maxPoints = [];

    gradeElements.forEach(element => {
        let gradeText = element.textContent.trim();

        if (gradeText.includes("/")) {
            const parts = gradeText.split("/");
            const grade = parseFloat(parts[0]);
            if (!isNaN(grade)) {
                console.log("Parsed Grade:", grade);
                grades.push(grade);
            }
        } else {
            const grade = parseFloat(gradeText);
            if (!isNaN(grade)) {
                console.log("Parsed Grade:", grade);
                grades.push(grade);
            }
        }
    });

    weightElements.forEach(element => {
        console.log("Weight Text Content:", element.textContent);
        let weight = 0;
        if (element.textContent.trim() === 'Practice / Preparation') {
            weight = 0.1;
        } else if (element.textContent.trim() === 'All Tasks / Assessments') {
            weight = 0.9;
        }

        if (weight != 0) {
            weights.push(weight);
            console.log("Parsed Weight:", weight);
        }
    });

    gradeElements.forEach(element => {
        let gradeText = element.textContent.trim();

        if (gradeText.includes("/")) {
            const parts = gradeText.split("/");
            const maxPoint = parseFloat(parts[1]);
            if (!isNaN(maxPoint)) {
                console.log("Parsed Max Point:", maxPoint);
                maxPoints.push(maxPoint);
            }
        }
    });

    if (pointInput.value.trim() !== '' && totalInput.value.trim() !== '') {
        const newGrade = parseFloat(pointInput.value.trim());
        const newMaxPoint = parseFloat(totalInput.value.trim());
        
        if (!isNaN(newGrade) && !isNaN(newMaxPoint)) {
            grades.push(newGrade);
            maxPoints.push(newMaxPoint);
            const newWeight = selectBox.value === 'Practice / Preparation' ? 0.1 : 0.9;
            weights.push(newWeight);
        }
    }

    const finalGrade = calculateFinalGrade(grades, maxPoints, weights);

    console.log('Final Grade:', finalGrade);

    const existingNewGradeElement = container.querySelector('.new-grade');
    if (existingNewGradeElement) {
        container.removeChild(existingNewGradeElement);
    }

    const newGradeElement = document.createElement('div');
    newGradeElement.textContent = `New Grade: ${finalGrade.toFixed(2)}`;
    newGradeElement.classList.add('new-grade');
    newGradeElement.style.marginTop = '10px';
    newGradeElement.style.color = 'green';
    
    container.appendChild(newGradeElement);
}

button.addEventListener('click', handleButtonClick);
