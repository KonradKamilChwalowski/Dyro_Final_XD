const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'W końcu nadszedł upragniony moment. Masz plan jak pokonać Dy-Raa',
        tlo: 'url("img/Cel.png")',
        options: [
            {
                text: 'Sprawdź plan! (menu)',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Dy-Roo zabarykadował się w swoim biurze, trzeba go jakoś wykurzyć.',
        tlo: 'url("img/Mapa.png")',
        options: [
            {
                text: 'Sprawdź jak! (menu)',
                nextText: "Pytanie1"
            }
        ]
    },
    {
        id: "Pytanie1",
        text: 'Trzeba podstawić pod oknem jakieś fajne auto, Dy-Roo się nie powstrzyma, żeby wyjść i je obczaić! Tylko jakie?',
        tlo: 'url("img/Garaż.png")',
        options: [
            {
                text: 'Pontiac GTO!',
                nextText: "Źle1"
            },
            {
                text: 'Koenigsegg Agera R',
                nextText: "Źle1"
            },
            {
                text: 'Aston Martin Vantage',
                nextText: "Źle1"
            },
            {
                text: 'Mustang 390 GT Fastback',
                nextText: "Pytanie2"
            }
        ]
    },
    {
        id: "Pytanie2",
        text: 'Kiedy wyjdzie podrzucimy mu coś do jedzenia co uwielbia!',
        tlo: 'url("img/Bufet.png")',
        options: [
            {
                text: 'Schabowy',
                nextText: "Źle2"
            },
            {
                text: 'Marchew',
                nextText: "Źle2"
            },
            {
                text: 'Krówki',
                nextText: "Pytanie3"
            },
            {
                text: 'Zupkę serową',
                nextText: "Źle2"
            }
        ]
    },
    {
        id: "Pytanie3",
        text: 'Krówki będą zatrute! Zatrujemy je...',
        tlo: 'url("img/Trucizna.png")',
        options: [
            {
                text: 'W jedną wielką krówkę wsadzimy gołąbka!',
                nextText: "Sukces1"
            },
            {
                text: 'Nasączymy krówki wodą po ogórkach!',
                nextText: "Źle3"
            },
            {
                text: 'Krówki obsypiemy wysuszoną ostrą papryczką!',
                nextText: "Źle3"
            },
            {
                text: 'Krówki będą robaczywe!',
                nextText: "Źle3"
            }
        ]
    },
    {
        id: "Źle1",
        text: 'Raczej nie... Zastanów się, jakie jest ulubione auto Dy-Raa, w jakim filmie występowało?',
        tlo: 'url("img/Garaż.png")',
        options: [
            {
                text: 'Spróbuj ponownie',
                nextText: "Pytanie1"
            }
        ]
    },
    {
        id: "Źle2",
        text: 'Przecież Dy-Roo nie jada takich rzeczy! Może coś innego?',
        tlo: 'url("img/Bufet.png")',
        options: [
            {
                text: 'Spróbuj ponownie',
                nextText: "Pytanie2"
            }
        ]
    },
    {
        id: "Źle3",
        text: 'Bez sensu, przecięż to ogr, ogry lubią takie rzeczy!',
        tlo: 'url("img/Trucizna.png")',
        options: [
            {
                text: 'Spróbuj ponownie',
                nextText: "Pytanie3"
            }
        ]
    },
    {
        id: "Sukces1",
        text: 'Plan już mamy, czas go zrealizować!',
        tlo: 'url("img/Mapa.png")',
        options: [
            {
                text: 'Do dzieła!',
                nextText: "Sukces2"
            }
        ]
    },
    {
        id: "Sukces2",
        text: '<15 min później> Dyro pada martwy na ziemię, a urok został odczarowany! Gratulacje! Uratowałeś szkołę!',
        tlo: 'url("img/Fajerwerki.png")',
        options: [
        ]
    }
]

startGame()