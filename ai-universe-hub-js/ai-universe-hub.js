const LoadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}

LoadData()