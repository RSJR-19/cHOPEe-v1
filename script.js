
//Screen //
const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
const prepCoffeeScreen = document.getElementById('prep_coffee');
const returnCoffeeScreen = document.getElementById('return_coffee');
const coffeeReadyScreen = document.getElementById('coffee_ready');
const revealQuoteScreen = document.getElementById('quote_reveal');
const quoteContainerSize = parseFloat(getComputedStyle(document.getElementById('quote_container')).height);
const quoteContainer = document.getElementById('quote_container');

mainScreen.style.display = 'none';

//STATES//
const STATES =  {
    LOADING : 'loading_screen',
    COFFEE_EMPTY : 'coffee_empty',
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    COFFEE_READY : 'coffee_ready',
    QUOTE_REVEAL : 'quote_reveal'
}

//Cup, Hand, Designs, Text,s//
const cup = document.getElementById('cup');
const hand = document.getElementById('hand');
const coffeeFlow = document.getElementById('coffee-flow');
const letterFlow = document.getElementById('letter-flow');
const cupPrepScreen = document.getElementById('cup-prep');
const spinningLayer = document.getElementById('cup_content_display');
const handle = document.getElementById('handle');
const paws = document.getElementById('paws');
const middle = document.getElementById('middle');
const check = document.getElementById('check');


coffeeFlow.style.display = 'none';

//Music and Sound Effects//
const music = document.getElementById('bgm');
const click = document.getElementById('click');
const pour = document.getElementById('pour');
const order = document.getElementById('order');
const meow1 = document.getElementById('meow1');
const meow2 = document.getElementById('meow2');

//Boolean States and initially empty values variables//
let cupEmpty = true;
let toReveal = true;
let quotesFetched = false;
let initialCupBot = "";
let handCollisionPoint = '';
let installPrompt;


//Window Size//
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const spacer1 = document.getElementById('spacer1');
const spacer1Height = parseFloat(getComputedStyle(spacer1).height);
const spacer2 = document.getElementById('spacer2');


//For quote related variables//
let todayQuote;
let filteredtodayQuote;
const quote = document.getElementById('quote');

//For Date related variables at functiond//
const date = new Date();
const dayTodaySpan = document.getElementById('day_today');
const dateTodaySpan = document.getElementById('date_today');

const daysOfWeek = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday'

}

const months = {
    0 : 'Jan',
    1 : 'Feb',
    2 : 'Mar',
    3 : 'Apr',
    4 : 'May',
    5 : 'Jun',
    6 : 'Jul',
    7 : 'Aug',
    8 : 'Sep',
    9 : 'Oct',
    10 : 'Nov',
    11 : 'Dec'
}

const dayToday = daysOfWeek[date.getDay()];
const dateToday = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

const getDayOfYear = (date) =>{
    const start = new Date(date.getFullYear(), 0, 1);
    const difference = date - start;
    const oneDay = 1000 * 60 * 60 * 24
    return 1 + Math.floor(difference / oneDay);
}
const totalDay = getDayOfYear(new Date(date.getFullYear(), date.getMonth(), date.getDate()));

const savedQuotes = [
    "Today is a chance to be better than yesterday",
    'Today is a chance to be better than yesterday' ,
    "If you start now, you'll finish sooner than you think",
    "Every great achievement starts with a small step",
    "Don't just dream — do it with eyes open",
    "Defeat is a reminder to improve, not the end",
    "You deserve better — so grow into better",
    "A good life grows from good decisions",
    "Happiness can be found in simplicity.",
    "Why doubt yourself? You matter more than you think",
    "Your story is for you to write - make it a good one",
    'Small steps are better than no steps at all',
    'Consistency takes you further than perfection',
    'We all have our own pace — grow in your own time',
    'As long as you make a difference, there is progress',
    'Patience is believing that someday, things will make sense',
    'Good things take time and dedication',
    'Waking up is a gift and another chance to grow',
    'Believe in yourself first; others will follow',
    'Motivation reminds you. Discipline carries you forward',
    "Building yourself takes time — and that's okay",
    "Not every victory needs applause",
    "You've faced challenges before — you can do it again"
]

//Local Storage related//

const quotesJSONLink = "https://raw.githubusercontent.com/RSJR-19/cHOPEe-v1/refs/heads/main/json/quotes.json";
const quoteStorage = localStorage.getItem('quoteStorage');

 async function checkLocalStorage(){
    try{
        const response = await fetch(quotesJSONLink);
        const data = await response.json();
        
        localStorage.setItem('quoteStorage', JSON.stringify(data));
        
        const stored = JSON.parse(localStorage.getItem('quoteStorage'));

        todayQuote = stored[totalDay];
        filteredtodayQuote = [...todayQuote].filter(letter =>  /^[a-zA-Z]$/.test(letter));

        quotesFetched = true;

        return

    }
    catch(error){    
        console.error(error)

        localStorage.setItem('quoteStorage', JSON.stringify(savedQuotes));
        const stored = JSON.parse(localStorage.getItem('quoteStorage'));
        todayQuote = stored[totalDay];
        filteredtodayQuote = [...todayQuote].filter(letter =>  /^[a-zA-Z]$/.test(letter));

        quotesFetched = true;
    }
}

//Responsiveness adjustments//
cup.style.width = `${windowHeight >= windowWidth ? 80 : 40}%`
hand.style.width = `${windowHeight >= windowWidth ? 20 : 10}%`;
paws.style.height = `${(Math.abs(windowWidth - windowHeight) * 2)/100}%`;

cupPrepScreen.style.height = `${(windowWidth >= windowHeight ? 75 : 25)+ (windowHeight/70)}%`;
cupPrepScreen.style.width = `${(windowWidth >= windowHeight ? 33 : 40)}%`;
coffeeFlow.style.width = `${(parseFloat(getComputedStyle(cupPrepScreen).width)*30)/100}%`;

const middleSize = (parseFloat(getComputedStyle(paws).width) * 5)/100;

middle.style.borderLeft = `${middleSize}px rgb(54, 54, 54) solid`;
middle.style.borderRight = `${middleSize}px rgb(54, 54, 54) solid`;

dayTodaySpan.style.fontSize = `${(spacer1Height * 25)/100}px`;
dateTodaySpan.style.fontSize = `${(spacer1Height * 35)/100}px`;


//Important Functions//
const checkMusic = async()=>{
    const musics = [
        document.getElementById('bgm'),
        document.getElementById('click'),
        document.getElementById('pour'),
        document.getElementById('order'),
        document.getElementById('meow1'),
        document.getElementById('meow2')
    ]

    return Promise.all(
        musics.map(audio => {
            return new Promise(resolve => {
                if (!audio) return resolve(); 
                if (audio.readyState >= 3) {
                    resolve();
                } else {
                    audio.addEventListener(
                        'canplaythrough',() => resolve(),{ once: true }
                    )}})}))
                }




const setStatus = (status)=>{
    document.querySelectorAll('.screenState').forEach(stateScreen => stateScreen.style.display ="none");
    status.style.display = 'flex';
    
}

const stateMachine = (currentState)=>{
    switch(currentState){
        case STATES.LOADING:
            setStatus(loadingScreen);
            
            break
        
        case STATES.COFFEE_EMPTY:
            setStatus(coffeeEmptyScreen);
            dayTodaySpan.innerHTML = dayToday;
            dateTodaySpan.innerHTML = dateToday;
            spinningLayer.style.display = 'none';
            hand.style.bottom = `${windowHeight}px`;
            initialCupBot = parseFloat(getComputedStyle(cup).bottom);

            

            break

        case STATES.PREP_COFFEE:
            setStatus(prepCoffeeScreen);
            setTimeout(()=>{
                cupPrepScreen.classList.add('upward')
                setTimeout(()=>{
                    requestAnimationFrame(flowingLetterEffect)
                    pour.play()
                    .catch(()=>{});
                    pour.volume = 1;
                },800);
            },50)
            spinningLayer.style.display = 'flex';
            returnCoffeeScreen.style.display = 'flex';
            quote.innerHTML = todayQuote;

            break

        case STATES.RETURN_COFFEE:
            setStatus(coffeeEmptyScreen);
            returnCoffeeScreen.style.display = 'flex';
            requestAnimationFrame(returnCupBack);

            break

        case STATES.COFFEE_READY:
            cupEmpty = false;
            spinningLayer.style.animationPlayState = 'running';
            returnCoffeeScreen.style.display = 'none';
            revealQuoteScreen.style.display = 'none';

            break

        case STATES.QUOTE_REVEAL:
            spinningLayer.style.animationPlayState = 'paused';
            quote.style.fontSize = `${(quoteContainer.clientHeight * 40)/100}%`
            revealQuoteScreen.style.display = "flex";
            
            if (toReveal ? requestAnimationFrame(ZoomIn) : requestAnimationFrame(ZoomOut));    
    }
}

const installApp = ()=>{
    if (installPrompt){
        installPrompt.prompt();
        installPrompt = null;
    }};

//Animation Functions//
const flowingLetterEffect = () =>{
    if (filteredtodayQuote.length > 0){
        const letter = document.createElement('h1');
        letter.textContent = filteredtodayQuote.length % 2 == 0 ? filteredtodayQuote.pop() : filteredtodayQuote.shift();
        letter.style.position = `absolute`;
        letter.className = 'letter';
        letter.style.transition = `top 0.5s ease-in-out`;
        letter.style.left = `${Math.floor(Math.random()* 15 + 1) * 5}%`;
        letter.style.animation = `letterFalling 1s linear forwards `;
        letterFlow.appendChild(letter);

        setTimeout(()=>{
            requestAnimationFrame(flowingLetterEffect)
        },100)
    }
    else{
        setTimeout(()=>{
        letterFlow.style.display = 'none';
        
            setTimeout(()=>{cupPrepScreen.classList.remove('upward')
                pour.pause();
                pour.currentTime = 0;
            }
                , 500);
            setTimeout(()=>{
                stateMachine(STATES.RETURN_COFFEE)
            }, 1000);
        }, 1000)
    }
}

const grabCup=()=>{
    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);
    const cupHeight = cup.getBoundingClientRect().height;

    const target = cupRect.bottom - ((cupHeight * 10.5) / 100 );
    const distance = target - currentBottom;

    handCollisionPoint = target;
    

    if (Math.abs(distance)< 1){

        if (meow1){
            meow1.play().catch(()=>{});
        }
        requestAnimationFrame(takeCupBack);

        return;
    }
    const ease = 0.15;

    hand.style.bottom = `${currentBottom + (distance * ease)}px`;
    requestAnimationFrame(grabCup);
}

const takeCupBack = () =>{
    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);
    const cupCurrentBottom = parseFloat(getComputedStyle(cup).bottom);

    if (currentBottom >= windowHeight && cupCurrentBottom >= windowHeight){
        setTimeout(()=>{
        stateMachine(STATES.PREP_COFFEE)
        }, 50);
        return
    };

    hand.style.bottom = `${currentBottom + 10}px`;
    cup.style.bottom = `${cupCurrentBottom + 10}px`;

    requestAnimationFrame(takeCupBack);
}

const returnCupBack = () =>{
    const cupBottom = parseFloat(getComputedStyle(cup).bottom);
    const handBottom = parseFloat(getComputedStyle(hand).bottom);


    if (cupBottom <= initialCupBot && handBottom <= handCollisionPoint){
        setTimeout(()=>{
            order.play()
            .catch(()=>{});
            order.volume = 0.5;
            requestAnimationFrame(returnHand)
        }, 200);
        
        return

    }

    cup.style.bottom = `${cupBottom - 10}px`;
    hand.style.bottom = `${handBottom - 10}px`;
    
    requestAnimationFrame(returnCupBack);

}

const returnHand = ()=>{
    const handPosition = parseFloat(getComputedStyle(hand).bottom);
    
    if (windowHeight <= handPosition){
        stateMachine(STATES.COFFEE_READY);
        spinningLayer.style.display = 'flex';
       cup.style.pointerEvents = 'auto';
        return
    }

    hand.style.bottom = `${handPosition + 10}px`;
    requestAnimationFrame(returnHand);
}

const revealSize = 2.5;
let currentScale = 1;

const ZoomIn =()=>{
    toReveal = false;
    spacer1.classList.add('show');
    spacer2.classList.add('show');
    
    if (currentScale >= revealSize){
        spinningLayer.style.animationPlayState = 'running';
        setTimeout(()=>{
            quote.classList.add('display')
            if (meow2){
                meow2.play().catch(()=>{})
            }
        
        }, 100);
        setTimeout(()=>{
            localStorage.setItem('quoteRevealed' , true);
            revealQuoteScreen.style.display = "none";

        }, 1000);

        return
    }

    cup.style.transform = `scale(${currentScale})`;
    currentScale += 0.05;
    requestAnimationFrame(ZoomIn);
}

const ZoomOut =()=>{
    spacer1.classList.remove('show');
    spacer2.classList.remove('show');
    quote.classList.remove('display')
    revealQuoteScreen.style.display = "flex";
    if (currentScale <= 1){
        toReveal = true
        revealQuoteScreen.style.display = "none";
        stateMachine(STATES.COFFEE_READY);
        check.classList.add('reveal');
        installApp();
        return
    }
    cup.style.transform = `scale(${currentScale})`;
     currentScale -= 0.05;

    requestAnimationFrame(ZoomOut);
}

//Event Listeners//

window.addEventListener('load', async ()=>{
    
    const tapText = document.getElementById('tapText');
    
    loadingScreen.style.pointerEvents = 'none';
    tapText.textContent = "Loading...";
    

    await checkLocalStorage();
    await checkMusic();
    
    loadingScreen.style.pointerEvents = 'auto';
    tapText.textContent = "Tap to Continue";
    stateMachine(STATES.LOADING);
    
})

window.addEventListener('resize', ()=>location.reload());

window.addEventListener('beforeinstallprompt', event =>{
    event.preventDefault();
    installPrompt = event;
});

loadingScreen.addEventListener('click', ()=>{
    if (music){
    music.play().catch(()=>{});
    music.volume = 0.5;
    };
    mainScreen.style.display = 'flex';
    stateMachine(STATES.COFFEE_EMPTY);
});


cup.addEventListener('click', ()=>{
    if (click){
        click.play().catch(()=>{});
        click.volume = 0.2;
    }
    if (cupEmpty){
        cup.style.pointerEvents = 'none';
        requestAnimationFrame(grabCup);
    }
    else{
        stateMachine(STATES.QUOTE_REVEAL);

    }
});
