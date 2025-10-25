
# Yoomoney Widget

React компонент для формы оплаты через YooMoney со встроенными шрифтами Factor IO.

### Установка

```bash
npm install yoomoney-widget
```

## Использование

### Базовое использование
```jsx
import React from 'react';
import { Yoomoney } from 'yoomoney-widget';

function App() {
  return (
    <Yoomoney
        receiver="0000000000000000"
        label="Пополнение счета"
        successURL="https://kaurcev.dev/success"
        defaultSum={100}
        minSum={50}
    />
  );
}
```
### С выбором логотипа
```jsx
import React from 'react';
import { Yoomoney } from 'yoomoney-widget';

function App() {
  return (
    <Yoomoney
        receiver="0000000000000000"
        logo="white"
        defaultSum={500}
        minSum={100}
    />
  );
}
```
### Кастомизация стилей
```jsx
import React from 'react';
import { Yoomoney } from 'yoomoney-widget';

function App() {
  return (
    <Yoomoney
        receiver="0000000000000000"
        formStyle={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '20px'
        }}
        inputStyle={{
            background: '#ffffff',
            border: '1px solid #ddd'
        }}
        buttonStyle={{
            background: '#ff6b6b',
            fontWeight: 'normal'
        }}
    />
}
```

## Пропсы

| Пропс | Тип | Обязательный | По умолчанию | Описание |
|-------|-----|--------------|--------------|----------|
| `receiver` | `string` | ✓ | - | Номер счета получателя |
| `label` | `string` |  | `''` | Метка платежа |
| `successURL` | `string` |  | `''` | URL перенаправления после успешной оплаты |
| `defaultSum` | `number` |  | `50` | Сумма по умолчанию |
| `minSum` | `number` |  | `10` | Минимальная сумма |
| `className` | `string` |  | `''` | Дополнительные CSS классы |
| `logo` | `'black' \| 'white'` |  | `'black'` | Цвет логотипа |
| `formStyle` | `React.CSSProperties` |  | `{}` | Дополнительные стили для формы |
| `inputStyle` | `React.CSSProperties` |  | `{}` | Дополнительные стили для поля ввода |
| `buttonStyle` | `React.CSSProperties` |  | `{}` | Дополнительные стили для кнопки |


## Особенности
- Встроенные шрифты Factor IO (regular, medium, bold) 
- Автоматическая загрузка WOFF2 шрифтов   
- Программное создание скрытых полей формы    
- Поддержка TypeScript    
- Адаптивный дизайн   
- Кастомизируемые стили   

## Пример полной конфигурации
```jsx
import React from 'react';
import { Yoomoney } from 'yoomoney-widget';

function App() {
  return (
    <Yoomoney
        receiver="0000000000000000"
        label="Заказ #12345"
        successURL="https://kaurcev.dev/payment/success"
        defaultSum={1500}
        minSum={100}
        logo="white"
        className="my-custom-class"
        formStyle={{ maxWidth: '400px', margin: '0 auto' }}
        inputStyle={{ fontSize: '18px' }}
        buttonStyle={{ fontSize: '18px', padding: '15px' }}
    />
}
```
## Требования
- React >= 16.8.0
- TypeScript (опционально)

## Лицензия
[MIT](./LICENSE)
