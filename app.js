// grab values
const count = document.getElementById('count');

// define funcitons
const add = () => {
    const value = Number(count.innerText);
    const newValue = value + 1;
    count.innerText = newValue.toString();
};

// add event listeners
document.getElementById('btn').addEventListener('click', add);
