const LoadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => DisplayData(data.data.tools))
}

const DisplayData = (Tools) => {
    console.log(Tools)
    const DisplayContainer = document.getElementById('Show-Details')
    Tools.forEach(tool => {
        console.log(tool)
        const {image, features} = tool
        const ToolsDiv = document.createElement('div')
        ToolsDiv.classList = ('card w-96 bg-base-100 shadow-xl border-2')
        ToolsDiv.innerHTML = `
                <figure class="px-5 pt-5">
                  <img src="${image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body">
                <h1 class="text-2xl">Features:</h1>
                <ul class="list-decimal ml-5">
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2]}</li>
                </ul>
                
        `
        DisplayContainer.appendChild(ToolsDiv)
    });
}


LoadData()