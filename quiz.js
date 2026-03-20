// Questions array
const questions = [
    {
        question: "You find a surprise package containing 4 gadgets, what do you do?", 
        options:[
            {choice:"Open each of them, one by one and find out how they work", skill: "logical_thinking"},
            {choice: "Read the user documentation to explore functionality", skill: "risk_awareness"},
            {choice:"Look for similarities or differences between them", skill: "data_analysis"},
            {choice: "Ask for suggestions from friends", skill: "teamwork"},
            {choice: "Not interested in gadgets", skill: "none"}
        ]  
    }, 
    {
        question: "When communicating thoughts/ideas, do you:", 
        options:[
            {choice:"Focus on providing systematic instructions", skill: "logical_thinking"},
            {choice: "Brainstorm risks and preventative measures", skill: "risk_awareness"},
            {choice:"Create visualisations such as graphs/charts", skill: "data_analysis"},
            {choice: "Plan towards the bigger picture", skill: "teamwork"},
        ]  
    }, 
    {
        question: "Your family is planning a birthday party for your sister. How are you most likely to contribute? ", 
        options:[
            {choice:"Handle decorations independently", skill: "logical_thinking"},
            {choice: "Look for potential problems and find solutions", skill: "risk_awareness"},
            {choice:"Review budget and attendance list", skill: "data_analysis"},
            {choice: "Assign roles to each member", skill: "teamwork"},
        ]  
    }, 
     {
        question: "Study the above pattern, what comes next?", 
        image:"pattern_question.png", 
        options:[
            {choice:"Pentagon", skill: "logical_thinking", correct:false},
            {choice: "Cloud", skill: "logical_thinking", correct:true},
            {choice:"Cube", skill: "logical_thinking", correct:false},
            {choice: "Don't have a clue", skill: "logical_thinking", correct:false},
        ]  
    }, 
       {
        question: "In a high pressure environment, you tend to:", 
        options:[
            {choice:"Implement solutions in a methodical way", skill: "logical_thinking"},
            {choice: "Investigate the root cause of the problem", skill: "risk_awareness"},
            {choice:"Conduct a thorough analysis of information before making decisions", skill: "data_analysis"},
            {choice: "Motivate the team to focus on achieving end goal", skill: "teamwork"},
        ]  
    }, 
       {
        question: "You recently bought a robotic vaccum but it continues to miss some areas in your room. What would you do?",  
        options:[
            {choice:"Observe its movement and adjust the path ", skill: "logical_thinking"},
            {choice: "Look for patterns in the missed spaces", skill: "risk_awareness"},
            {choice:"Experiment with different settings", skill: "data_analysis"},
            {choice: "Ask friends or family for help", skill: "teamwork"},
        ]  
    },
       {
        question: "There is an outing planned for your year group and the venue choices are: a museum, theme park or beach. The results need to be represented using a graph. What is the most appropriate? ",  
        options:[
            {choice:"Line graph", skill: "data_analysis", correct:false},
            {choice: "Bar chart", skill: "data_analysis", correct:false},
            {choice:"Pie chart", skill: "data_analysis", correct:true},
            {choice: "Box plot", skill: "data_analysis", correct:false},
        ]  
    },
      {
        question: "As a volunteer in your local library, you are organising activities for children. Two sessions will be held daily, and each session will contain 4 activities. How many different activities will be held in total?",  
        options:[
            {choice:"8", skill: "logical_thinking", correct:true},
            {choice: "5", skill: "logical_thinking", correct: false},
            {choice:"10", skill: "logical_thinking", correct:false},
            {choice: "Don't know", skill: "logical_thinking", correct:false},
        ]  
    },
    {
        question: "9.	Look at the graph above. In which month were the highest number of ice creams sold? ", 
        image:"icecream_graph.png", 
        options:[
            {choice:"May", skill: "data_analysis", correct:false},
            {choice: "August", skill: "data_analysis", correct:true},
            {choice:"February", skill: "data_analysis", correct: false},
            {choice: "Not sure", skill: "data_analysis", correct:false},
        ]  
    }, 
      {
        question: "Following the completion of a task, how do I evaluate performance?",  
        options:[
            {choice:"Examine the solution and propose further improvements to a system", skill: "logical_thinking"},
            {choice: "Suggest any emerging risks and potential mitigation", skill: "risk_awareness"},
            {choice:"Assess if the findings are supported by data", skill: "data_analysis"},
            {choice: "Reflect on team effort and suggest ideas for further work", skill: "teamwork"},
        ]  
    },  
]

// Variable to track question progress
let currentQuestion = 0;
let correctAnswers = 0; 

// Variable to store user response
let userResponse = new Array(questions.length); 
let scores = {
    logical_thinking:0, 
    risk_awareness:0,
    data_analysis:0,
    teamwork:0
}; 

const quizQuestion = document.getElementById("question");
const quizOptions = document.getElementById("options");
const quizProgress = document.getElementById("quiz-progress");
const quizImage = document.getElementById("question-image");

// Function to display questions
function displayQuestion(){
    let q = questions[currentQuestion];
    quizQuestion.innerText = q.question;

    // Used to show progress of quiz
    quizProgress.innerText = "Question " + (currentQuestion + 1) + " of "+ 
    questions.length;

    // If statement used to displays images for particular questions
    if(q.image){
        quizImage.src = q.image;
        quizImage.style.display = "block";    
    } else{
        quizImage.style.display = "none";
    }

    quizOptions.innerHTML = "";

    // Displays the options for each question
    q.options.forEach((option, index)=>{
        let selected = (userResponse[currentQuestion] == index) ? 
        "checked" : "";
        

         // Creates radio buttons
        let optionLabel = document.createElement("label");
        optionLabel.innerHTML = `<input type="radio" name="answer" 
        value="${index}" ${selected} > ${option.choice}`; 

        quizOptions.appendChild(optionLabel);
    });
    quizProgressBar();
}

// Display next question button
document.getElementById("nextQ").onclick = function(){
    let chosen = document.querySelector("input[name='answer']:checked");
    if(!chosen) {
        console.log("Please choose an option");
        return;
    }
    let selectedIndex = chosen.value;
    let selectedOption = questions[currentQuestion].options[selectedIndex];

    // Save the student's response
    userResponse[currentQuestion] = selectedIndex;

    // Skills score - based on all questions
    if(selectedOption.skill){
        scores[selectedOption.skill]++;
    }

    // Scores for correct answers - based on certain questions
    if(selectedOption.correct === true){
        correctAnswers++;
    }
    currentQuestion++;

    if(currentQuestion < questions.length){
        displayQuestion();
    }
};

// Display previous question button 
document.getElementById("previousQ").onclick = function(){
    if (currentQuestion > 0){
        currentQuestion--;
        displayQuestion();
    }
};

// Display progress bar 
function quizProgressBar(){
    let progress = (currentQuestion / questions.length) * 100;
    document.getElementById("progress-bar").style.width = 
    progress + "%";
}

// Quiz submission
 document.getElementById("submitQuiz").onclick = function(){
    scores = 
    logical_thinking = 0;
    risk_awareness = 0;
    data_analysis = 0;
    teamwork = 0
 }; 

 displayQuestion();






