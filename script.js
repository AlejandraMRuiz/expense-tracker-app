// Global variables 
const date = document.getElementById('date');
const category = document.getElementById('category');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');

class Expense {
  constructor(date, category, description, amount, currency) {
    this.date = date,
      this.category = category,
      this.description = description,
      this.amount = amount,
      this.currency = currency
  }
}

class UI {
  renderExpense(expense, currencySymbol) {

    const tr = document.createElement('tr');


    tr.innerHTML = `
        <td><input id="done-checkbox" type="checkbox"></td>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td><i class="${currencySymbol}"></td>
        <td><a id="delete-expense"><i class="fas fa-trash"></i></a>
      `
    document.getElementById('expense-list').appendChild(tr);
  }
  clearFields() {
    // date.value = ''
    // category.value = ''
    description.value = ''
    amount.value = ''
    // currency.value = ''
  }
}

// Add new expense event listener
document.querySelector('form').addEventListener('submit', function (e) {
  // Initiate Expense
  const newExpense = new Expense(date.value, category.value, description.value, amount.value, currency.value);

  
  let currencySymbol = currency.value;

   currencySymbol = currencySymbol === 'dollar' ? 'fas fa-dollar-sign'
  : currencySymbol === 'pound' ? 'fas fa-pound-sign'
  : currencySymbol === 'shekel' ? 'fas fa-shekel-sign'
  : currencySymbol === 'bitcoin' ? 'fab fa-bitcoin'
  : 'fas fa-question';

  // Initiate UI
  const ui = new UI();

  ui.renderExpense(newExpense, currencySymbol)

  ui.clearFields()

  e.preventDefault();
})

// Delete expense event listener
document.body.addEventListener('click', function (e) {
  if (e.target.parentElement.id === 'delete-expense') {
    e.target.parentElement.parentElement.parentElement.remove();
  }
})


// document.body.addEventListener('click', function (e) {
//   if (e.target.parentElement.id === 'done-checkbox') {
//     // e.target.parentElement.parentElement.parentElement.remove();
//     // -webkit-text-decoration-line: line-through; /* Safari */
//     // text-decoration-line: line-through; 
//     console.log('hey')
//     e.target.parentElement.parentElement.parentElement.style.textDecoration = 'line-through';
//   }
// })




// class Person {
//   constructor(name, last, age) {
//     this.last,
//       this.name = name,
//       this.age = age
//   }
//   hello(x) {
//     console.log('what is up ' + this.age + ' ' + x);
//   }
//   static greeting(y) {
//     console.log('I am greeting ' + y + ' ')
//   }
// }

// const amitay = new Person('amitay', 'last', 32)

// amitay.hello('soffer')

// Person.greeting('Marion');

