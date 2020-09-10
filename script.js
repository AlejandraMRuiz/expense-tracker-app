// Global variables 
const date = document.getElementById('date');
const category = document.getElementById('category');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');

class Expense {
  constructor(date, category, description, amount, currency, id) {
    this.date = date;
    this.category = category;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.id = id;
  }
}

class UI {
  renderExpense(expense) {
    console.log(expense);

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input id="done-checkbox" class="done-checkbox" type="checkbox"></td>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td><i class="${this.verifyCurrencySymbol(expense)}"></td>
        <td><a id="delete-expense"><i class="fas fa-trash"></i></a>
      `
    document.getElementById('expense-list').appendChild(tr);
  }
  verifyCurrencySymbol(expense) {
    let currencySymbol = expense.currency;

    currencySymbol = currencySymbol === 'dollar' ? 'fas fa-dollar-sign'
      : currencySymbol === 'pound' ? 'fas fa-pound-sign'
        : currencySymbol === 'shekel' ? 'fas fa-shekel-sign'
          : currencySymbol === 'bitcoin' ? 'fab fa-bitcoin'
            : 'fas fa-question';

    return currencySymbol;
  }
  clearFields() {
    // date.value = ''
    // category.value = ''
    // description.value = ''
    amount.value++
    // currency.value = ''
  }
}

class StoreLS {
  static getExpenseListFromLS() {
    let expenseList = !JSON.parse(localStorage.getItem('expense-list')) ? []
      : JSON.parse(localStorage.getItem('expense-list'));

    return expenseList;
  }
  static addExpenseToLS(expense) {

    let expenseList = this.getExpenseListFromLS();

    expenseList.push(expense);

    localStorage.setItem('expense-list', JSON.stringify(expenseList));

  }
  static renderLS() {
    let expenseList = this.getExpenseListFromLS();

    expenseList.forEach(expense => {
      const newUI = new UI()
      newUI.renderExpense(expense);
    });
  }
  static deleteLS(id) {

    let expenseList = this.getExpenseListFromLS();

    expenseList.filter(function (expense, index) {

      // console.log(id)
      // console.log(expenseList);
      // // console.log(index)

    })

    // questions.splice(index, 1);
    // localStorage.setItem('questions', JSON.stringify(questions));
  }
}

// Render LS expense-list on page load
window.addEventListener('DOMContentLoaded', (e) => {
  StoreLS.renderLS();
});

let id = 0
// Add new expense 
document.querySelector('form').addEventListener('submit', function (e) {
  const newExpense = new Expense(date.value, category.value, description.value, amount.value, currency.value, id);

  const ui = new UI();
  ui.renderExpense(newExpense)

  ui.clearFields()

  StoreLS.addExpenseToLS(newExpense);

  e.preventDefault();
})

// Delete expense 
document.body.addEventListener('click', function (e) {
  if (e.target.parentElement.id === 'delete-expense') {
    StoreLS.deleteLS(e.target.parentElement.parentElement.parentElement.firstElementChild.id);
    e.target.parentElement.parentElement.parentElement.remove();
  }
})

// Checkbox strikethrough expense
document.body.addEventListener('change', function (e) {
  if (e.target.id === 'done-checkbox') {
    if (e.target.checked) {
      e.target.parentElement.parentElement.children[6].firstElementChild.style.color = 'red';
      e.target.parentElement.parentElement.style.textDecoration = 'line-through';
    } else {
      e.target.parentElement.parentElement.style.textDecoration = 'none';
      e.target.parentElement.parentElement.children[6].firstElementChild.style.color = 'initial';
    }
  }
});
