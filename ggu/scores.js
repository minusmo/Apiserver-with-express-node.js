const body = document.body;
const scoreBoard = document.createElement('div');
const orderedList = document.createElement('ol');

const scoreApi = 'http://localhost:3040/score';
fetch(scoreApi)
.then(res => {
    const json = res.json();
    
})
.catch(err => console.warn(err));
