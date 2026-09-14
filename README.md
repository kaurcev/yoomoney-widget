# yoomoney-widget

React-компоненты для приёма платежей через YooMoney Quickpay. Полностью headless — стили подключаются отдельно и переопределяются через CSS-переменные или классы.

[![npm version](https://img.shields.io/npm/v/yoomoney-widget.svg)](https://www.npmjs.com/package/yoomoney-widget)
[![npm downloads](https://img.shields.io/npm/dm/yoomoney-widget.svg)](https://www.npmjs.com/package/yoomoney-widget)
[![license](https://img.shields.io/npm/l/yoomoney-widget.svg)](./LICENSE)

## Возможности

- Три готовых компонента: форма, модальное окно, боковая панель.
- Headless-архитектура: стили по умолчанию опциональны.
- Кастомизация через CSS-переменные (`--yw-*`), классы-слоты и inline-стили.
- Доступность: focus trap, `role="dialog"`, `aria-modal`, закрытие по Escape.
- Рендер в portal, блокировка скролла страницы.
- Поддержка React с 16.8 (hooks).
- Полная типизация, ESM + CJS, tree-shaking.
- Встроенные шрифты Factor IO.

## Установка

```bash
npm install yoomoney-widget
```

## Быстрый старт

```jsx
import { Yoomoney } from 'yoomoney-widget';
import 'yoomoney-widget/styles.css';

export function App() {
  return (
    <Yoomoney receiver="41001xxxxxxxxxxxx" label="Заказ #12345" defaultSum={500} minSum={100} />
  );
}
```

Импорт `'yoomoney-widget/styles.css'` необязателен — без него компоненты рендерят чистую семантическую разметку без единого стиля. Если вы используете Tailwind, CSS Modules или styled-components, стили можно не подключать вовсе.

## Компоненты

- `Yoomoney` — форма оплаты.
- `YoomoneyModal` — модальное окно с кнопкой открытия.
- `YoomoneyPanel` — боковая панель, выезжающая справа.

Все три используют один и тот же базовый компонент формы, поэтому принимают одинаковый набор пропсов для настройки платежа.

## Примеры

### Базовая форма

```jsx
import { Yoomoney } from 'yoomoney-widget';
import 'yoomoney-widget/styles.css';

<Yoomoney
  receiver="41001xxxxxxxxxxxx"
  label="Пополнение счёта"
  successURL="https://example.com/payment/success"
  defaultSum={100}
  minSum={50}
/>;
```

### Модальное окно

```jsx
import { YoomoneyModal } from 'yoomoney-widget';
import 'yoomoney-widget/styles.css';

<YoomoneyModal
  receiver="41001xxxxxxxxxxxx"
  buttonText="Оплатить заказ"
  modalTitle="Оформление платежа"
  defaultSum={1500}
  minSum={100}
/>;
```

Модальное окно рендерит кнопку открытия и открывает диалог по клику. Управление состоянием — внутри компонента, снаружи можно слушать `onOpen` и `onClose`.

### Боковая панель

```jsx
import { useState } from 'react';
import { YoomoneyPanel } from 'yoomoney-widget';
import 'yoomoney-widget/styles.css';

function Checkout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Открыть панель оплаты</button>

      <YoomoneyPanel
        receiver="41001xxxxxxxxxxxx"
        isOpen={open}
        onClose={() => setOpen(false)}
        panelTitle="Оплата"
        defaultSum={1000}
        minSum={50}
      />
    </>
  );
}
```

Состояние панели контролируется снаружи через проп `isOpen`.

### Тема через CSS-переменные

Стили используют переменные с префиксом `--yw-`. Их можно переопределить на уровне `:root`, на контейнере или через prop `theme`, если передаёте стили из JS.

```css
:root {
  --yw-color-primary: #ff6b6b;
  --yw-color-primary-hover: #e05252;
  --yw-radius-lg: 12px;
  --yw-font: 'Inter', sans-serif;
}
```

```jsx
<div style={{ '--yw-color-primary': '#ff6b6b' }}>
  <Yoomoney receiver="41001xxxxxxxxxxxx" />
</div>
```

Полный список переменных смотрите в `src/styles.css`.

### Кастомизация через классы

Каждый слот разметки принимает свой CSS-класс через проп `classNames`. Это удобно для Tailwind, CSS Modules и styled-components.

```jsx
<Yoomoney
  receiver="41001xxxxxxxxxxxx"
  classNames={{
    form: 'rounded-2xl bg-white shadow-lg p-6 max-w-md',
    input: 'w-full rounded-lg bg-slate-100 px-4 py-3',
    submit: 'w-full rounded-full bg-violet-600 text-white font-bold py-3',
    logo: 'mb-5 text-left',
  }}
/>
```

Доступные слоты:

- `Yoomoney`: `form`, `logo`, `label`, `input`, `sectionTitle`, `radios`, `radio`, `submit`.
- `YoomoneyModal`: слоты `Yoomoney` плюс `trigger`, `overlay`, `modal`, `title`, `close`.
- `YoomoneyPanel`: слоты `Yoomoney` плюс `overlay`, `panel`, `title`, `close`, `body`.

### Кастомизация текстов и методов оплаты

Все тексты и список методов оплаты можно переопределить пропсами — в коде не зашито ничего, кроме значений по умолчанию.

```jsx
<Yoomoney
  receiver="41001xxxxxxxxxxxx"
  sumLabel="Введите сумму пополнения"
  submitText="Оплатить"
  methodTitle={null}
  paymentMethods={[
    { value: 'AC', label: 'Банковская карта', defaultChecked: true },
    { value: 'PC', label: 'ЮMoney' },
  ]}
/>
```

`methodTitle={null}` полностью убирает заголовок блока методов оплаты.

### Свой логотип

Проп `renderLogo` позволяет заменить стандартное изображение на любой React-элемент.

```jsx
<Yoomoney
  receiver="41001xxxxxxxxxxxx"
  renderLogo={() => <img src="/my-logo.svg" alt="Logo" width={120} />}
/>
```

### Полностью без стилей

Не импортируйте `styles.css` и не передавайте классы — получите чистую форму без оформления. Полезно, когда вся вёрстка на Tailwind или собственной дизайн-системе.

```jsx
<Yoomoney receiver="41001xxxxxxxxxxxx" />
```

## Пропсы

### Yoomoney

| Пропс            | Тип                             | По умолчанию                      | Описание                                       |
| ---------------- | ------------------------------- | --------------------------------- | ---------------------------------------------- |
| `receiver`       | `string`                        | обязательный                      | Номер счёта получателя                         |
| `label`          | `string`                        | `''`                              | Метка платежа, попадает в уведомления YooMoney |
| `successURL`     | `string`                        | `''`                              | URL возврата после оплаты                      |
| `defaultSum`     | `number`                        | `50`                              | Предзаполненная сумма                          |
| `minSum`         | `number`                        | `10`                              | Минимально допустимая сумма                    |
| `logo`           | `'black' \| 'white'`            | `'black'`                         | Вариант логотипа                               |
| `logoAlign`      | `'left' \| 'center' \| 'right'` | `'center'`                        | Выравнивание логотипа                          |
| `className`      | `string`                        | —                                 | Класс на корневой форме                        |
| `classNames`     | `YoomoneyClassNames`            | `{}`                              | Классы для внутренних слотов                   |
| `sumLabel`       | `string`                        | `Сумма пополнения (От {minSum}₽)` | Подпись над полем суммы                        |
| `methodTitle`    | `string \| null`                | `'Способ пополнения'`             | Заголовок блока методов, `null` скрывает       |
| `submitText`     | `string`                        | `'Пополнить'`                     | Текст кнопки отправки                          |
| `paymentMethods` | `PaymentMethod[]`               | ЮMoney + Карта                    | Список методов оплаты                          |
| `renderLogo`     | `(src, alt) => ReactNode`       | —                                 | Кастомный рендер логотипа                      |
| `formStyle`      | `CSSProperties`                 | —                                 | Inline-стили формы (escape hatch)              |
| `inputStyle`     | `CSSProperties`                 | —                                 | Inline-стили поля суммы                        |
| `buttonStyle`    | `CSSProperties`                 | —                                 | Inline-стили кнопки                            |

### YoomoneyModal

Наследует все пропсы `Yoomoney` плюс:

| Пропс                 | Тип             | По умолчанию         | Описание                     |
| --------------------- | --------------- | -------------------- | ---------------------------- |
| `buttonText`          | `string`        | `'Оплатить'`         | Текст кнопки открытия        |
| `modalTitle`          | `string`        | `'Пополнение счета'` | Заголовок модального окна    |
| `onOpen`              | `() => void`    | —                    | Колбек при открытии          |
| `onClose`             | `() => void`    | —                    | Колбек при закрытии          |
| `closeOnOverlayClick` | `boolean`       | `true`               | Закрывать по клику на фон    |
| `closeOnEscape`       | `boolean`       | `true`               | Закрывать по Escape          |
| `lockBodyScroll`      | `boolean`       | `true`               | Блокировать скролл страницы  |
| `usePortal`           | `boolean`       | `true`               | Рендерить через React portal |
| `showCloseButton`     | `boolean`       | `true`               | Показывать крестик           |
| `trapFocus`           | `boolean`       | `true`               | Удерживать фокус внутри окна |
| `overlayStyle`        | `CSSProperties` | —                    | Inline-стили оверлея         |
| `modalStyle`          | `CSSProperties` | —                    | Inline-стили окна            |
| `buttonStyle`         | `CSSProperties` | —                    | Inline-стили кнопки открытия |
| `buttonClassName`     | `string`        | —                    | Класс кнопки открытия        |

### YoomoneyPanel

Наследует все пропсы `Yoomoney` плюс:

| Пропс                 | Тип             | По умолчанию | Описание                       |
| --------------------- | --------------- | ------------ | ------------------------------ |
| `isOpen`              | `boolean`       | `false`      | Открыта ли панель              |
| `panelTitle`          | `string`        | `'Оплата'`   | Заголовок панели               |
| `onClose`             | `() => void`    | —            | Колбек при закрытии            |
| `closeOnOverlayClick` | `boolean`       | `true`       | Закрывать по клику на фон      |
| `closeOnEscape`       | `boolean`       | `true`       | Закрывать по Escape            |
| `lockBodyScroll`      | `boolean`       | `true`       | Блокировать скролл страницы    |
| `usePortal`           | `boolean`       | `true`       | Рендерить через React portal   |
| `showCloseButton`     | `boolean`       | `true`       | Показывать крестик             |
| `trapFocus`           | `boolean`       | `true`       | Удерживать фокус внутри панели |
| `overlayStyle`        | `CSSProperties` | —            | Inline-стили оверлея           |
| `panelStyle`          | `CSSProperties` | —            | Inline-стили панели            |

### Вспомогательные типы

```ts
import type {
  YoomoneyBaseProps,
  YoomoneyModalProps,
  YoomoneyPanelProps,
  YoomoneyClassNames,
  YoomoneyModalClassNames,
  YoomoneyPanelClassNames,
  PaymentMethod,
  LogoAlign,
  LogoVariant,
} from 'yoomoney-widget';

interface PaymentMethod {
  value: string;
  label: string;
  defaultChecked?: boolean;
}
```

## Хуки

Все внутренние хуки экспортируются отдельно. Их можно использовать в своих компонентах.

| Хук                             | Назначение                               |
| ------------------------------- | ---------------------------------------- |
| `useEscapeKey(active, handler)` | Вызывает `handler` при нажатии Escape    |
| `useFocusTrap(ref, active)`     | Удерживает фокус внутри элемента         |
| `useLockBodyScroll(locked)`     | Блокирует скролл страницы                |
| `usePortal(enabled)`            | Создаёт и возвращает DOM-узел для portal |

```jsx
import { useEscapeKey, useLockBodyScroll } from 'yoomoney-widget';

function MyDialog({ open, onClose }) {
  useEscapeKey(open, onClose);
  useLockBodyScroll(open);
  // ...
}
```

## CSS-переменные

Все токены темы имеют префикс `--yw-`. Значения по умолчанию заданы в `styles.css` на `:root`. Переопределяйте на любом уровне.

Основные:

- Цвета: `--yw-color-primary`, `--yw-color-primary-hover`, `--yw-color-text`, `--yw-color-text-muted`, `--yw-color-bg`, `--yw-color-input-bg`, `--yw-color-overlay`.
- Скругления: `--yw-radius-sm`, `--yw-radius-md`, `--yw-radius-lg`, `--yw-radius-pill`.
- Отступы: `--yw-space-xs`, `--yw-space-sm`, `--yw-space-md`, `--yw-space-lg`.
- Типографика: `--yw-font`.
- Размеры: `--yw-modal-max-width`, `--yw-panel-width`, `--yw-form-max-width`.
- Анимация: `--yw-transition`.

Полный список — в исходном `src/styles.css`.

## Комбинированный пример

```jsx
import { useState } from 'react';
import { Yoomoney, YoomoneyModal, YoomoneyPanel } from 'yoomoney-widget';
import 'yoomoney-widget/styles.css';

export function Checkout() {
  const [panelOpen, setPanelOpen] = useState(false);

  const shared = {
    receiver: '41001xxxxxxxxxxxx',
    defaultSum: 1000,
    minSum: 100,
  };

  return (
    <div style={{ display: 'grid', gap: 40 }}>
      <Yoomoney {...shared} label="Заказ #12345" />

      <YoomoneyModal
        {...shared}
        buttonText="Оплатить картой"
        modalTitle="Быстрая оплата"
        defaultSum={2000}
      />

      <button onClick={() => setPanelOpen(true)}>Открыть панель</button>
      <YoomoneyPanel
        {...shared}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        panelTitle="Оплата заказа"
      />
    </div>
  );
}
```

## Работа со сборщиками

Пакет поставляется в ESM и CJS, поддерживает tree-shaking.

- `import { Yoomoney } from 'yoomoney-widget'` — современные сборщики (Vite, Webpack 5, Next.js, Rollup).
- `require('yoomoney-widget')` — Node.js и устаревшие сборщики.
- ESM-сборка содержит директиву `"use client"`, поэтому безопасна в Next.js App Router.

## Требования

- React 16.8 или новее.
- React DOM 16.8 или новее.
- Node 18 или новее (для разработки).

## Лицензия

[MIT](./LICENSE)
