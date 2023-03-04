const LoadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => DisplayData(data.data.tools))
}


const DisplayData = (Tools) => {
    // console.log(Tools)
    const DisplayContainer = document.getElementById('Show-Details')
    const SeeMore = document.getElementById('see-more')
    if(Tools.length > 6){
        Tools = Tools.slice(0, 6)
        SeeMore.classList.remove('hidden')
    }
    else{
        SeeMore.classList.add('hidden')
    }

    Tools.forEach(tool => {
        const {image, features, name, published_in, id} = tool
        console.log(published_in)
        const ToolsDiv = document.createElement('div')
        ToolsDiv.classList = ('card w-96 bg-base-100 shadow-xl border-2')
        ToolsDiv.innerHTML = `
                <figure class="px-5 pt-5 h-full">
                  <img src="${image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body">
                <h1 class="text-2xl">Features:</h1>
                <ol class="list-decimal pl-5">
                    <li class="${features[0] === undefined ? 'hidden' : ''}">${features[0]}</li>
                    <li class="${features[1] === undefined ? 'hidden' : ''}">${features[1]}</li>
                    <li class="${features[2] === undefined ? 'hidden' : ''}">${features[2]}</li>
                    <li class="${features[3] === undefined ? 'hidden' : ''}">${features[3]}</li>
                <ol>
                <div class="flex justify-between items-center mt-5">
                    <div>
                        <h1 class="text-xl font-semibold">${name}</h1>
                        <p><i class="fa-regular fa-calendar-days"></i> ${published_in}</p>
                    </div>
                    <label onclick="LoadDetails('${id}')" for="my-modal-3"><i class="fa-solid fa-arrow-right bg-red-200 p-3 rounded-full text-red-500"></i></label>                       
                </div>      
                `
        DisplayContainer.appendChild(ToolsDiv)
    });
    toggleSpinner(false)
}

const LoadDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch (url)
    .then (res => res.json())
    .then (data => ShowDetails(data.data))
}



const ShowDetails = (id) => {
    // const ModalTitle = document.getElementById('modal-title')
    console.log(id)
    const {description, pricing, features, integrations, image_link, input_output_examples, accuracy} = id
    const Title = document.getElementById('titles')
    Title.innerText = `${description}`

// Prices Items
    const Prices = document.getElementById('prices')
    Prices.innerHTML=`
        <p class="p-3 bg-white rounded text-green-700">${pricing[0].price} ${pricing[0].plan}</p>
        <p class="p-3 bg-white rounded text-orange-600">${pricing[1].price} ${pricing[1].plan}</p>
        <p class="p-3 bg-white rounded text-red-700">${pricing[2].price} ${pricing[2].plan}</p>
    `

// Features Items
    const Features = document.getElementById('Features')
    Features.innerHTML=`
    <h1 class="font-semibold">Features:</h1>
    <ol class="list-disc pl-5">
                    <li class="${features[1].feature_name === undefined ? 'hidden' : ''}">${features[1].feature_name}</li>
                    <li class="${features[2].feature_name === undefined ? 'hidden' : ''}">${features[2].feature_name}</li>
                    <li class="${features[3].feature_name === undefined ? 'hidden' : ''}">${features[3].feature_name}</li>
                <ol>
    `

// Integrations Items
    const Integrations = document.getElementById('Integrations')
    Integrations.innerHTML=`
    <h1 class="font-semibold">Integrations:</h1>
    <ol class="list-disc pl-5">
                    <li class="${integrations[0] === undefined ? 'hidden' : ''}">${integrations[0]}</li>
                    <li class="${integrations[1] === undefined ? 'hidden' : ''}">${integrations[1]}</li>
                    <li class="${integrations[2] === undefined ? 'hidden' : ''}">${integrations[2]}</li>
                    <li class="${integrations[3] === undefined ? 'hidden' : ''}">${integrations[3]}</li>
                <ol>
    `
// Modal Options
    const ModalImage = document.getElementById('modal-image')
    ModalImage.innerHTML=`
    <img src="${image_link[0]}" alt="Shoes" class="rounded-xl h-full w-full" />
    `

// Modal Questions Answer
    const QuestionAnswer = document.getElementById('Question-Answer')
    console.log(input_output_examples[0])
    QuestionAnswer.innerHTML= `
    <p class="font-semibold text-xl ${input_output_examples[0].input === undefined ? 'hidden' : ''}"> ${input_output_examples[0].input}</p>
    <p class="${input_output_examples[0].output === undefined ? 'hidden' : ''}"> ${input_output_examples[0].output}</p>
    `
    console.log(accuracy)


// Accuracy Button Option
    const AccuracyBtn = document.getElementById('accuracy')
    AccuracyBtn.innerHTML=`<a class="${accuracy.score !== null ?  'block' : 'hidden'}"> ${accuracy.score * 100}%  accuracy</a>`
}


document.getElementById('see-more').addEventListener('click', function(){
    toggleSpinner(true)
    LoadData()
})



const toggleSpinner = isLoading =>{
    const LoaderSection = document.getElementById('loader')
    if(isLoading){
        LoaderSection.classList.remove('hidden')
    }
    else{
        LoaderSection.classList.add('hidden')
    }
}

toggleSpinner(true)


LoadData()
