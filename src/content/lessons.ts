export type Language = 'uk' | 'en'

export type QuizQuestion = {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export type LessonSection = {
  heading: string
  paragraphs: string[]
}

export type LessonContent = {
  title: string
  summary: string
  sections: LessonSection[]
  quiz: QuizQuestion[]
}

export type Lesson = {
  id: string
  level: 'beginner' | 'intermediate'
  minutes: number
  content: Record<Language, LessonContent>
}

export const passScore = 2

export const lessons: Lesson[] = [
  {
    id: 'budgeting-basics',
    level: 'beginner',
    minutes: 5,
    content: {
      uk: {
        title: 'Основи бюджету',
        summary: 'Як зрозуміти, куди йдуть гроші, і почати керувати ними замість того, щоб гадати.',
        sections: [
          {
            heading: 'Навіщо потрібен бюджет',
            paragraphs: [
              'Бюджет — це не заборона на витрати, а план: скільки грошей ви отримуєте, на що вони йдуть і скільки залишається.',
              'Без плану гроші зникають непомітно: дрібні покупки складаються у велику суму, а в кінці місяця незрозуміло, куди все поділось.',
            ],
          },
          {
            heading: 'Правило 50/30/20',
            paragraphs: [
              'Це простий орієнтир для старту: близько 50% доходу — на потреби (житло, їжа, транспорт, комунальні), 30% — на бажання (розваги, покупки), 20% — на заощадження та погашення боргів.',
              'Це не закон. Якщо житло займає більшу частину доходу, пропорції доведеться підлаштувати під вашу ситуацію.',
            ],
          },
          {
            heading: 'Як почати',
            paragraphs: [
              'Протягом місяця записуйте всі доходи та витрати. Потім згрупуйте їх за категоріями та подивіться, де витрати найбільші.',
              'Встановіть ліміти для категорій, які хочете контролювати, і щотижня звіряйтеся з ними.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Що таке бюджет?',
            options: [
              'Заборона витрачати гроші',
              'План доходів, витрат і заощаджень',
              'Список бажаних покупок',
            ],
            correct: 1,
            explanation: 'Бюджет — це план, який показує, звідки приходять гроші, куди вони йдуть і скільки залишається.',
          },
          {
            question: 'Яка частина доходу за правилом 50/30/20 іде на заощадження та борги?',
            options: ['10%', '20%', '50%'],
            correct: 1,
            explanation: 'За правилом 50/30/20 близько 20% доходу спрямовують на заощадження та погашення боргів.',
          },
          {
            question: 'З чого найкраще почати складання бюджету?',
            options: [
              'Купити програму за підпискою',
              'Зменшити всі витрати вдвічі',
              'Записувати доходи та витрати протягом місяця',
            ],
            correct: 2,
            explanation: 'Спершу потрібно побачити реальну картину: без обліку витрат будь-які ліміти будуть здогадками.',
          },
        ],
      },
      en: {
        title: 'Budgeting basics',
        summary: 'How to see where your money goes and start managing it instead of guessing.',
        sections: [
          {
            heading: 'Why you need a budget',
            paragraphs: [
              'A budget is not a ban on spending. It is a plan: how much money comes in, where it goes and how much is left.',
              'Without a plan, money disappears quietly: small purchases add up, and at the end of the month it is unclear where everything went.',
            ],
          },
          {
            heading: 'The 50/30/20 rule',
            paragraphs: [
              'A simple starting point: about 50% of income for needs (housing, food, transport, utilities), 30% for wants (entertainment, shopping) and 20% for savings and debt repayment.',
              'It is not a law. If housing takes a larger share of your income, adjust the proportions to your situation.',
            ],
          },
          {
            heading: 'How to start',
            paragraphs: [
              'For one month, record all income and expenses. Then group them by category and see where spending is highest.',
              'Set limits for the categories you want to control and check them every week.',
            ],
          },
        ],
        quiz: [
          {
            question: 'What is a budget?',
            options: [
              'A ban on spending money',
              'A plan for income, spending and savings',
              'A list of wanted purchases',
            ],
            correct: 1,
            explanation: 'A budget is a plan that shows where money comes from, where it goes and how much is left.',
          },
          {
            question: 'Under the 50/30/20 rule, what share of income goes to savings and debt?',
            options: ['10%', '20%', '50%'],
            correct: 1,
            explanation: 'The 50/30/20 rule directs about 20% of income to savings and debt repayment.',
          },
          {
            question: 'What is the best way to start building a budget?',
            options: [
              'Buy a subscription app',
              'Cut all spending in half',
              'Record income and spending for a month',
            ],
            correct: 2,
            explanation: 'First you need a real picture. Without tracking, any limits are guesses.',
          },
        ],
      },
    },
  },
  {
    id: 'pay-yourself-first',
    level: 'beginner',
    minutes: 4,
    content: {
      uk: {
        title: 'Спершу заплати собі',
        summary: 'Чому заощадження варто відкладати на початку місяця, а не з того, що залишилось.',
        sections: [
          {
            heading: 'У чому ідея',
            paragraphs: [
              'Якщо відкладати лише те, що залишилось наприкінці місяця, зазвичай не залишається нічого. Принцип «спершу заплати собі» змінює порядок: заощадження — перша стаття витрат.',
              'Ви визначаєте суму одразу після отримання доходу, а на решту живете.',
            ],
          },
          {
            heading: 'Автоматизуйте',
            paragraphs: [
              'Найнадійніше — налаштувати регулярний автоматичний переказ на окремий рахунок у день надходження доходу. Тоді рішення приймати не потрібно щоразу.',
              'Окремий рахунок допомагає не змішувати заощадження з повсякденними грошима.',
            ],
          },
          {
            heading: 'Починайте з малого',
            paragraphs: [
              'Навіть невелика сума, яку ви відкладаєте регулярно, важливіша за велику, яку відкладаєте раз на кілька місяців. Головне — виробити звичку.',
              'Збільшуйте суму, коли доходи зростають або зменшуються непотрібні витрати.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Що означає принцип «спершу заплати собі»?',
            options: [
              'Спершу витратити гроші на розваги',
              'Відкласти заощадження відразу після отримання доходу',
              'Платити за всі рахунки наперед',
            ],
            correct: 1,
            explanation: 'Заощадження стають першою статтею витрат, а не залишком наприкінці місяця.',
          },
          {
            question: 'Що допомагає заощаджувати регулярно?',
            options: [
              'Автоматичний переказ на окремий рахунок',
              'Надія на залишок наприкінці місяця',
              'Готівка вдома в кількох місцях',
            ],
            correct: 0,
            explanation: 'Автоматичний переказ прибирає потребу щоразу приймати рішення.',
          },
          {
            question: 'Яка сума заощаджень краща для початку?',
            options: [
              'Така, яку можна відкладати регулярно',
              'Лише велика, інакше немає сенсу',
              'Жодна, поки немає великого доходу',
            ],
            correct: 0,
            explanation: 'Регулярність важливіша за розмір: звичка формується з посильних сум.',
          },
        ],
      },
      en: {
        title: 'Pay yourself first',
        summary: 'Why savings should be set aside at the start of the month, not from what is left over.',
        sections: [
          {
            heading: 'The idea',
            paragraphs: [
              'If you only save what is left at the end of the month, usually nothing is left. "Pay yourself first" reverses the order: savings become the first expense.',
              'You decide the amount right after getting paid and live on the rest.',
            ],
          },
          {
            heading: 'Automate it',
            paragraphs: [
              'The most reliable way is a regular automatic transfer to a separate account on payday. Then you do not have to decide every time.',
              'A separate account also helps keep savings apart from everyday money.',
            ],
          },
          {
            heading: 'Start small',
            paragraphs: [
              'A small amount saved regularly beats a large amount saved once every few months. The goal is to build the habit.',
              'Increase the amount when your income grows or when you cut unneeded spending.',
            ],
          },
        ],
        quiz: [
          {
            question: 'What does "pay yourself first" mean?',
            options: [
              'Spend on entertainment first',
              'Set savings aside right after getting paid',
              'Pay all bills in advance',
            ],
            correct: 1,
            explanation: 'Savings become the first expense instead of the leftover at the end of the month.',
          },
          {
            question: 'What helps you save regularly?',
            options: [
              'An automatic transfer to a separate account',
              'Hoping something is left at month end',
              'Cash hidden around the house',
            ],
            correct: 0,
            explanation: 'An automatic transfer removes the need to decide every time.',
          },
          {
            question: 'Which savings amount is best to start with?',
            options: [
              'One you can set aside regularly',
              'Only a large one, otherwise it is pointless',
              'None until income is high',
            ],
            correct: 0,
            explanation: 'Consistency matters more than size: habits grow from manageable amounts.',
          },
        ],
      },
    },
  },
  {
    id: 'emergency-fund',
    level: 'beginner',
    minutes: 5,
    content: {
      uk: {
        title: 'Подушка безпеки',
        summary: 'Резерв на непередбачені ситуації: скільки потрібно, де тримати і як накопичити.',
        sections: [
          {
            heading: 'Що це і навіщо',
            paragraphs: [
              'Подушка безпеки — це запас грошей на непередбачені події: втрату роботи, хворобу, термінний ремонт. Вона допомагає не брати борги в складний момент.',
            ],
          },
          {
            heading: 'Скільки відкладати',
            paragraphs: [
              'Поширений орієнтир — від трьох до шести місяців обов\'язкових витрат. Якщо дохід нестабільний або на утриманні є люди, запас варто робити більшим.',
              'Рахуйте саме обов\'язкові витрати: житло, їжа, комунальні, транспорт, ліки, а не весь звичний рівень життя.',
            ],
          },
          {
            heading: 'Де тримати і як накопичувати',
            paragraphs: [
              'Гроші мають бути легкодоступними та з мінімальним ризиком: це не місце для інвестицій, вартість яких може впасти.',
              'Накопичуйте поступово: поставте першу ціль — одна місячна сума витрат, потім дві і так далі. Використовуйте подушку лише за справжньої потреби.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Для чого потрібна подушка безпеки?',
            options: [
              'Для купівлі техніки зі знижкою',
              'Для непередбачених ситуацій, щоб не брати борги',
              'Для інвестування в ризикові активи',
            ],
            correct: 1,
            explanation: 'Це резерв на непередбачені події, який допомагає обійтися без боргів.',
          },
          {
            question: 'Від чого рахують розмір подушки безпеки?',
            options: [
              'Від обов\'язкових місячних витрат',
              'Від бажаних покупок',
              'Від суми доходу за рік',
            ],
            correct: 0,
            explanation: 'Орієнтир — кілька місяців обов\'язкових витрат: житла, їжі, комунальних, транспорту, ліків.',
          },
          {
            question: 'Яким має бути місце зберігання подушки?',
            options: [
              'Високоризикові інвестиції',
              'Легкодоступне та з мінімальним ризиком',
              'Нерухомість',
            ],
            correct: 1,
            explanation: 'Гроші потрібні раптово, тому важливі доступність і збереження суми.',
          },
        ],
      },
      en: {
        title: 'Emergency fund',
        summary: 'A reserve for the unexpected: how much you need, where to keep it and how to build it.',
        sections: [
          {
            heading: 'What it is and why',
            paragraphs: [
              'An emergency fund is a cash reserve for unexpected events: job loss, illness, an urgent repair. It helps you avoid borrowing at a bad moment.',
            ],
          },
          {
            heading: 'How much to save',
            paragraphs: [
              'A common guideline is three to six months of essential expenses. If your income is irregular or you support other people, aim higher.',
              'Count essential expenses only: housing, food, utilities, transport, medicine, not your whole usual lifestyle.',
            ],
          },
          {
            heading: 'Where to keep it and how to build it',
            paragraphs: [
              'The money should be easy to access and low risk. This is not the place for investments that can lose value.',
              'Build it gradually: set a first goal of one month of expenses, then two, and so on. Use the fund only for real emergencies.',
            ],
          },
        ],
        quiz: [
          {
            question: 'What is an emergency fund for?',
            options: [
              'Buying gadgets on sale',
              'Unexpected events, so you do not have to borrow',
              'Investing in risky assets',
            ],
            correct: 1,
            explanation: 'It is a reserve for unexpected events that helps you avoid debt.',
          },
          {
            question: 'What is the size of an emergency fund based on?',
            options: [
              'Monthly essential expenses',
              'Wanted purchases',
              'Yearly income',
            ],
            correct: 0,
            explanation: 'The guideline is several months of essential expenses: housing, food, utilities, transport, medicine.',
          },
          {
            question: 'Where should an emergency fund be kept?',
            options: [
              'High-risk investments',
              'Somewhere easy to access with minimal risk',
              'Real estate',
            ],
            correct: 1,
            explanation: 'You may need the money suddenly, so access and keeping the amount safe matter most.',
          },
        ],
      },
    },
  },
  {
    id: 'debt-and-credit',
    level: 'intermediate',
    minutes: 6,
    content: {
      uk: {
        title: 'Борги й кредити',
        summary: 'Як оцінювати справжню вартість позики та погашати борги з меншими втратами.',
        sections: [
          {
            heading: 'Скільки коштує позика',
            paragraphs: [
              'Кредит — це не лише сума, яку ви отримуєте. Ви повертаєте її з відсотками та, можливо, комісіями, тому переплата може бути значною.',
              'Порівнюючи пропозиції, дивіться не на місячний платіж, а на загальну суму, яку заплатите за весь термін, і на реальну річну вартість кредиту.',
            ],
          },
          {
            heading: 'Стратегії погашення',
            paragraphs: [
              'За методом «лавини» додаткові гроші спрямовують на борг із найвищою ставкою: так сплачується менше відсотків загалом.',
              'За методом «снігової кулі» першим закривають найменший борг: це менш вигідно математично, але дає швидкі перемоги та мотивацію.',
            ],
          },
          {
            heading: 'Перш ніж брати кредит',
            paragraphs: [
              'Запитайте себе, чи це потреба, чи можете ви комфортно сплачувати щомісячний платіж, і що буде, якщо дохід на якийсь час зменшиться.',
              'Уважно читайте договір: штрафи за прострочення, комісії, умови дострокового погашення.',
            ],
          },
        ],
        quiz: [
          {
            question: 'На що важливо дивитись, порівнюючи кредити?',
            options: [
              'Лише на розмір місячного платежу',
              'На загальну суму виплат за весь термін',
              'На кольори логотипу банку',
            ],
            correct: 1,
            explanation: 'Низький місячний платіж може означати довший термін і більшу переплату.',
          },
          {
            question: 'Який метод погашення зменшує сплату відсотків найсильніше?',
            options: [
              'Спершу борг із найвищою ставкою (лавина)',
              'Спершу найстаріший борг',
              'Платити всім порівну',
            ],
            correct: 0,
            explanation: 'Додаткові гроші на борг із найвищою ставкою скорочують загальні відсотки.',
          },
          {
            question: 'Що варто зробити до оформлення кредиту?',
            options: [
              'Підписати договір одразу, щоб не втратити пропозицію',
              'Перевірити, чи зможете комфортно сплачувати платіж, і прочитати договір',
              'Позичити у знайомих на погашення першого платежу',
            ],
            correct: 1,
            explanation: 'Спокійна оцінка платоспроможності та уважне читання умов захищають від неприємних несподіванок.',
          },
        ],
      },
      en: {
        title: 'Debt and credit',
        summary: 'How to judge the true cost of a loan and pay down debt with fewer losses.',
        sections: [
          {
            heading: 'What a loan really costs',
            paragraphs: [
              'A loan is not just the amount you receive. You repay it with interest and possibly fees, so the overpayment can be significant.',
              'When comparing offers, look at the total you will pay over the whole term and at the effective annual cost, not just the monthly payment.',
            ],
          },
          {
            heading: 'Repayment strategies',
            paragraphs: [
              'With the "avalanche" method, extra money goes to the debt with the highest interest rate, so you pay less interest overall.',
              'With the "snowball" method, you close the smallest debt first. It is less efficient mathematically but gives quick wins and motivation.',
            ],
          },
          {
            heading: 'Before you borrow',
            paragraphs: [
              'Ask yourself whether it is a need, whether you can comfortably afford the monthly payment, and what happens if your income drops for a while.',
              'Read the contract carefully: late fees, charges and early repayment terms.',
            ],
          },
        ],
        quiz: [
          {
            question: 'What matters when comparing loans?',
            options: [
              'Only the monthly payment',
              'The total amount paid over the whole term',
              'The color of the bank logo',
            ],
            correct: 1,
            explanation: 'A low monthly payment can mean a longer term and a bigger overpayment.',
          },
          {
            question: 'Which repayment method reduces interest paid the most?',
            options: [
              'Highest interest rate first (avalanche)',
              'Oldest debt first',
              'Paying everything equally',
            ],
            correct: 0,
            explanation: 'Putting extra money on the highest-rate debt cuts total interest.',
          },
          {
            question: 'What should you do before taking a loan?',
            options: [
              'Sign right away so you do not lose the offer',
              'Check you can comfortably afford the payment and read the contract',
              'Borrow from friends to cover the first payment',
            ],
            correct: 1,
            explanation: 'A calm affordability check and careful reading protect you from unpleasant surprises.',
          },
        ],
      },
    },
  },
  {
    id: 'inflation-and-savings',
    level: 'intermediate',
    minutes: 5,
    content: {
      uk: {
        title: 'Інфляція та заощадження',
        summary: 'Чому гроші з часом знецінюються і як це враховувати, коли відкладаєте.',
        sections: [
          {
            heading: 'Що таке інфляція',
            paragraphs: [
              'Інфляція — це зростання цін з часом. Через неї за ту саму суму можна купити менше товарів: купівельна спроможність грошей знижується.',
            ],
          },
          {
            heading: 'Вплив на заощадження',
            paragraphs: [
              'Якщо гроші лежать без відсотків, їхня реальна вартість щороку зменшується. Якщо відсоток нижчий за інфляцію, реальна дохідність від\'ємна.',
              'Реальна дохідність — це приблизно різниця між відсотковою ставкою та інфляцією.',
            ],
          },
          {
            heading: 'Що робити',
            paragraphs: [
              'Порівнюйте ставки за вкладами та іншими інструментами з очікуваною інфляцією, а не лише між собою. Перевіряйте надійність установи та умови гарантування вкладів.',
              'Для довгих цілей розглядайте різні інструменти, розуміючи ризики. Кошти подушки безпеки залишайте доступними.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Що відбувається з купівельною спроможністю грошей під час інфляції?',
            options: ['Зростає', 'Знижується', 'Не змінюється'],
            correct: 1,
            explanation: 'Ціни ростуть, тому за ту саму суму купуєте менше.',
          },
          {
            question: 'Що означає від\'ємна реальна дохідність?',
            options: [
              'Відсоток за вкладом нижчий за інфляцію',
              'Банк втратив гроші',
              'Ви заплатили податок',
            ],
            correct: 0,
            explanation: 'Якщо ставка менша за інфляцію, реальна вартість заощаджень зменшується.',
          },
          {
            question: 'З чим варто порівнювати відсоток за вкладом?',
            options: [
              'Лише з відсотком в іншому банку',
              'Із очікуваною інфляцією та іншими варіантами',
              'З курсом валюти за вчора',
            ],
            correct: 1,
            explanation: 'Порівняння з інфляцією показує, чи справді зростає ваша купівельна спроможність.',
          },
        ],
      },
      en: {
        title: 'Inflation and savings',
        summary: 'Why money loses value over time and how to account for it when you save.',
        sections: [
          {
            heading: 'What inflation is',
            paragraphs: [
              'Inflation is the rise of prices over time. Because of it, the same amount buys fewer goods: the purchasing power of money falls.',
            ],
          },
          {
            heading: 'Effect on savings',
            paragraphs: [
              'If money sits without interest, its real value shrinks every year. If the interest rate is below inflation, the real return is negative.',
              'The real return is roughly the interest rate minus inflation.',
            ],
          },
          {
            heading: 'What to do',
            paragraphs: [
              'Compare deposit and other rates with expected inflation, not only with each other. Check the reliability of the institution and the deposit guarantee terms.',
              'For long-term goals, consider different instruments while understanding the risks. Keep your emergency fund accessible.',
            ],
          },
        ],
        quiz: [
          {
            question: 'What happens to the purchasing power of money during inflation?',
            options: ['It rises', 'It falls', 'It stays the same'],
            correct: 1,
            explanation: 'Prices rise, so the same amount buys less.',
          },
          {
            question: 'What does a negative real return mean?',
            options: [
              'The deposit rate is below inflation',
              'The bank lost money',
              'You paid a tax',
            ],
            correct: 0,
            explanation: 'If the rate is below inflation, the real value of savings shrinks.',
          },
          {
            question: 'What should you compare a deposit rate with?',
            options: [
              'Only a rate at another bank',
              'Expected inflation and other options',
              'Yesterday\'s exchange rate',
            ],
            correct: 1,
            explanation: 'Comparing with inflation shows whether your purchasing power really grows.',
          },
        ],
      },
    },
  },
  {
    id: 'compound-interest-and-investing',
    level: 'intermediate',
    minutes: 6,
    content: {
      uk: {
        title: 'Складний відсоток та основи інвестування',
        summary: 'Як працює складний відсоток, чому важливий час і чому не варто класти всі яйця в один кошик.',
        sections: [
          {
            heading: 'Складний відсоток',
            paragraphs: [
              'За складного відсотка прибуток нараховується не лише на початкову суму, а й на раніше нараховані відсотки. Тому зростання прискорюється з часом.',
              'Чим раніше ви починаєте і чим довше не чіпаєте накопичене, тим сильніший ефект. Спробуйте калькулятор у розділі «Інструменти».',
            ],
          },
          {
            heading: 'Ризик і прибуток',
            paragraphs: [
              'Зазвичай вища потенційна дохідність пов\'язана з вищим ризиком. Гарантованого високого прибутку без ризику не існує.',
              'Інвестуйте лише ті гроші, які не знадобляться найближчим часом, і ніколи — кошти подушки безпеки.',
            ],
          },
          {
            heading: 'Диверсифікація',
            paragraphs: [
              'Розподіл коштів між різними активами зменшує вплив невдачі одного з них. Не вкладайте все в одну компанію чи один інструмент.',
              'Цей урок навчальний і не є інвестиційною порадою: перед рішеннями вивчайте інструмент і оцінюйте власну ситуацію.',
            ],
          },
        ],
        quiz: [
          {
            question: 'У чому суть складного відсотка?',
            options: [
              'Відсотки нараховуються лише на початкову суму',
              'Відсотки нараховуються і на раніше нараховані відсотки',
              'Відсоток щороку зменшується',
            ],
            correct: 1,
            explanation: 'Прибуток додається до бази, і наступного разу відсоток нараховується на більшу суму.',
          },
          {
            question: 'Що таке диверсифікація?',
            options: [
              'Вкласти все в найприбутковіший актив',
              'Розподілити кошти між різними активами',
              'Продавати активи, коли ціна падає',
            ],
            correct: 1,
            explanation: 'Різні активи зменшують залежність від невдачі одного з них.',
          },
          {
            question: 'Чи варто інвестувати кошти подушки безпеки?',
            options: [
              'Так, щоб вони швидше зростали',
              'Ні, вони мають бути доступними та безпечними',
              'Так, але лише у криптовалюту',
            ],
            correct: 1,
            explanation: 'Подушка потрібна раптово, а вартість інвестицій може тимчасово впасти.',
          },
        ],
      },
      en: {
        title: 'Compound interest and investing basics',
        summary: 'How compound interest works, why time matters and why you should not put all eggs in one basket.',
        sections: [
          {
            heading: 'Compound interest',
            paragraphs: [
              'With compound interest, returns are earned not only on the initial amount but also on previously earned interest. Growth therefore accelerates over time.',
              'The earlier you start and the longer you leave the money alone, the stronger the effect. Try the calculator in the Tools section.',
            ],
          },
          {
            heading: 'Risk and return',
            paragraphs: [
              'Higher potential returns usually come with higher risk. A guaranteed high return without risk does not exist.',
              'Invest only money you will not need soon, and never your emergency fund.',
            ],
          },
          {
            heading: 'Diversification',
            paragraphs: [
              'Spreading money across different assets reduces the impact of one of them failing. Do not put everything into one company or one instrument.',
              'This lesson is educational and not investment advice: learn about an instrument and assess your own situation before deciding.',
            ],
          },
        ],
        quiz: [
          {
            question: 'What is the idea of compound interest?',
            options: [
              'Interest is earned only on the initial amount',
              'Interest is also earned on previously earned interest',
              'The interest rate falls each year',
            ],
            correct: 1,
            explanation: 'Returns are added to the base, so next time interest is earned on a larger amount.',
          },
          {
            question: 'What is diversification?',
            options: [
              'Putting everything into the highest-return asset',
              'Spreading money across different assets',
              'Selling assets when the price falls',
            ],
            correct: 1,
            explanation: 'Different assets reduce your dependence on one of them failing.',
          },
          {
            question: 'Should you invest your emergency fund?',
            options: [
              'Yes, so it grows faster',
              'No, it should stay accessible and safe',
              'Yes, but only in cryptocurrency',
            ],
            correct: 1,
            explanation: 'You may need the fund suddenly, and investments can temporarily lose value.',
          },
        ],
      },
    },
  },
  {
    id: 'scams-and-fraud',
    level: 'beginner',
    minutes: 5,
    content: {
      uk: {
        title: 'Фінансове шахрайство',
        summary: 'Як розпізнати популярні схеми та що робити, щоб не втратити гроші.',
        sections: [
          {
            heading: 'Типові схеми',
            paragraphs: [
              'Фішингові посилання та фальшиві сайти, дзвінки «зі служби безпеки банку», повідомлення про виграш чи «швидкий заробіток», фінансові піраміди з обіцянкою гарантованого високого прибутку.',
              'Спільне в них — тиск, поспіх і прохання повідомити дані або перерахувати гроші.',
            ],
          },
          {
            heading: 'Золоті правила',
            paragraphs: [
              'Ніколи не повідомляйте нікому PIN-код, CVV, повний пароль та одноразові коди з повідомлень. Справжньому працівнику банку вони не потрібні.',
              'Якщо вам телефонують від імені банку, завершіть розмову та самостійно зателефонуйте за номером із картки чи офіційного застосунку. Не переходьте за посиланнями з повідомлень.',
              'Перевіряйте, чи компанія є легальною фінансовою установою в офіційних реєстрах, зокрема Національного банку України.',
            ],
          },
          {
            heading: 'Якщо вас обманули',
            paragraphs: [
              'Негайно зателефонуйте до банку, щоб заблокувати картку та спробувати зупинити операції. Потім зверніться із заявою до поліції, зокрема до кіберполіції.',
              'Не соромтесь розповісти близьким: швидка реакція часто зменшує збитки.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Кому можна повідомити одноразовий код із SMS?',
            options: [
              'Працівнику банку, який телефонує',
              'Нікому',
              'Продавцю на сайті оголошень',
            ],
            correct: 1,
            explanation: 'Одноразові коди, PIN і CVV не потрібні нікому, навіть якщо дзвонять від імені банку.',
          },
          {
            question: 'Що робити, якщо вам дзвонять нібито з банку й тиснуть?',
            options: [
              'Виконати інструкції, щоб захистити кошти',
              'Завершити розмову та самому зателефонувати за офіційним номером',
              'Перейти за посиланням з повідомлення',
            ],
            correct: 1,
            explanation: 'Перевірте інформацію через офіційний номер чи застосунок, а не через дзвінок, що надійшов вам.',
          },
          {
            question: 'Що має насторожити в інвестиційній пропозиції?',
            options: [
              'Гарантований високий прибуток без ризику',
              'Детальний опис ризиків',
              'Наявність ліцензії в офіційному реєстрі',
            ],
            correct: 0,
            explanation: 'Гарантованого високого прибутку без ризику не буває — це типова ознака піраміди чи шахрайства.',
          },
        ],
      },
      en: {
        title: 'Financial scams',
        summary: 'How to recognize popular schemes and what to do so you do not lose money.',
        sections: [
          {
            heading: 'Common schemes',
            paragraphs: [
              'Phishing links and fake websites, calls from the "bank security team", messages about a prize or "easy money", and pyramid schemes promising guaranteed high returns.',
              'What they share is pressure, urgency and a request for your details or a money transfer.',
            ],
          },
          {
            heading: 'Golden rules',
            paragraphs: [
              'Never tell anyone your PIN, CVV, full password or one-time codes from messages. A real bank employee does not need them.',
              'If someone calls on behalf of your bank, end the call and phone the number on your card or in the official app yourself. Do not follow links from messages.',
              'Check in official registers, including the National Bank of Ukraine, that a company is a legitimate financial institution.',
            ],
          },
          {
            heading: 'If you were scammed',
            paragraphs: [
              'Call your bank immediately to block the card and try to stop transactions. Then file a report with the police, including the cyber police.',
              'Do not be ashamed to tell people close to you: a fast reaction often reduces the loss.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Who can you give a one-time SMS code to?',
            options: [
              'A bank employee who calls you',
              'Nobody',
              'A seller on a classifieds site',
            ],
            correct: 1,
            explanation: 'One-time codes, PINs and CVVs are not needed by anyone, even if they call on behalf of a bank.',
          },
          {
            question: 'What should you do if someone calls from "the bank" and pressures you?',
            options: [
              'Follow their instructions to protect your funds',
              'End the call and phone the official number yourself',
              'Follow the link from the message',
            ],
            correct: 1,
            explanation: 'Verify through an official number or app, not through a call that came to you.',
          },
          {
            question: 'What should raise suspicion in an investment offer?',
            options: [
              'A guaranteed high return with no risk',
              'A detailed description of risks',
              'A licence in an official register',
            ],
            correct: 0,
            explanation: 'A guaranteed high return without risk does not exist. It is a typical sign of a pyramid or scam.',
          },
        ],
      },
    },
  },
]

export function getLesson(id: string | undefined): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id)
}
