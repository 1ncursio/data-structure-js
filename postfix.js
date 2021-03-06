const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');

const priority = {
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2,
  '(': 1,
};

const postfix = [];
const operator = [];
let exp = '';
let tokens = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(input.value);
  exp = input.value;
  tokens = exp.split(/[*/+\-()]/).filter((v) => v !== '');

  tokens.forEach((v) => {
    switch (v) {
      case '(':
        operator.push(v);
        break;
      case '*':
      case '/':
      case '+':
      case '-':
        if (operator.length === 0) operator.push(v);
        else {
          if (priority[operator[operator.length - 1]] >= priority[v]) {
            postfix.push(operator.pop());
            operator.push(v);
          } else {
            operator.push(v);
          }
        }
        break;
      case ')':
        while (true) {
          const temp = operator.pop();
          if (temp === '(') break;
          postfix.push(temp);
        }
        break;

      default:
        postfix.push(v);
        break;
    }
  });

  while (operator.length !== 0) {
    postfix.push(operator.pop());
  }
  console.log(postfix.join(' '));

  console.log(calc());
});

// 1) 피연산자가 들어오면 바로 출력합니다.
// 2) 연산자가 들어오면 자기보다 우선순위가 높거나 같은 것들을 빼고 자신을 스택에 담습니다.
// 3) 여는 괄호 '('를 만나면 무조건 스택에 담습니다.
// 4) 닫는 괄호 ')'를 만나면 '('를 만날 때까지 스택에서 출력합니다.

function calc() {
  let _postfix = postfix;
  let result = 0;
  while (_postfix.length > 1) {
    for (let i = 0; i < _postfix.length; i++) {
      if (!isNaN(_postfix[i]) && !isNaN(_postfix[i + 1]) && isNaN(_postfix[i + 2])) {
        const x = +_postfix[i];
        const y = +_postfix[i + 1];

        switch (_postfix[i + 2]) {
          case '*':
            result = x * y;
            break;
          case '/':
            result = x / y;
            break;
          case '+':
            result = x + y;
            break;
          case '-':
            result = x - y;
            break;
          default:
            break;
        }
        const front = _postfix.slice(0, i);
        const back = _postfix.slice(i + 3);
        _postfix = front.concat([result, ...back]);
        console.log(_postfix);
      }
    }
  }
  return result;
}
