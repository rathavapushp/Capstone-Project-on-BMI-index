const COLORS = {
  blue: '#5b8af0',
  red: '#e05c7a',
  teal: '#4ecdc4',
  gold: '#f7b731',
  purple: '#a29bfe',
  orange: '#fd9644',
  grid: 'rgba(255,255,255,0.05)'
};

if (window.Chart) {
  Chart.defaults.color = '#7a8099';
  Chart.defaults.font.family = "'Inconsolata', monospace";
  Chart.defaults.font.size = 11;
}

function baseOpts(yLabel = '%') {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#13161e',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#e8eaf0',
        bodyColor: '#7a8099',
        padding: 10,
        callbacks: {
          label: ctx => ` ${ctx.parsed.y.toFixed(1)}${yLabel}`
        }
      }
    },
    scales: {
      x: { grid: { color: COLORS.grid }, ticks: { maxTicksLimit: 8 } },
      y: { grid: { color: COLORS.grid }, ticks: { callback: v => `${v}${yLabel}` } }
    }
  };
}

function alignToYears(data, years) {
  const map = Object.fromEntries(data.map(d => [d.y, d.v]));
  return years.map(y => map[y] ?? null);
}

function initCharts() {
  if (!window.Chart) return;

  const owData = [
    {y:1990,v:25.2},{y:1995,v:28.0},{y:2000,v:31.0},{y:2005,v:33.8},{y:2010,v:36.6},{y:2015,v:39.5},{y:2020,v:42.4},{y:2022,v:43.5}
  ];
  const obData = [
    {y:2005,v:10.1},{y:2008,v:11.1},{y:2011,v:12.0},{y:2014,v:13.0},{y:2017,v:14.0},{y:2020,v:14.9},{y:2022,v:15.8}
  ];
  const allYears = [1990,1995,2000,2005,2010,2015,2020,2022];
  const afrData = [{y:1990,v:13.9},{y:1995,v:16.4},{y:2000,v:19.0},{y:2005,v:21.8},{y:2010,v:24.7},{y:2015,v:27.7},{y:2020,v:30.2},{y:2022,v:31.3}];
  const searData = [{y:1995,v:9.6},{y:2000,v:13.5},{y:2005,v:18.0},{y:2010,v:22.4},{y:2015,v:26.6},{y:2020,v:29.9},{y:2022,v:31.2}];
  const wprData = [{y:1990,v:14.6},{y:1995,v:17.0},{y:2000,v:20.0},{y:2005,v:24.0},{y:2010,v:28.5},{y:2015,v:32.5},{y:2020,v:35.0},{y:2022,v:36.3}];
  const maleData = [{y:1990,v:23.5},{y:1995,v:26.2},{y:2000,v:29.1},{y:2005,v:32.0},{y:2010,v:35.0},{y:2015,v:38.2},{y:2020,v:41.5},{y:2022,v:43.1}];
  const femaleData = [{y:1990,v:26.6},{y:1995,v:29.1},{y:2000,v:31.8},{y:2005,v:34.5},{y:2010,v:37.3},{y:2015,v:40.1},{y:2020,v:42.5},{y:2022,v:43.9}];

  const ids = ['chartOverweight','chartObesity','chartRegions','chartGender'];
  ids.forEach(id => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
  });

  const overweightEl = document.getElementById('chartOverweight');
  if (overweightEl) {
    new Chart(overweightEl, {
      type: 'line',
      data: { labels: owData.map(d => d.y), datasets: [{ data: owData.map(d => d.v), borderColor: COLORS.blue, backgroundColor: 'rgba(91,138,240,0.08)', fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2.5 }] },
      options: { ...baseOpts('%'), scales: { ...baseOpts('%').scales, y: { ...baseOpts('%').scales.y, min: 20, max: 50 } } }
    });
  }

  const obesityEl = document.getElementById('chartObesity');
  if (obesityEl) {
    new Chart(obesityEl, {
      type: 'line',
      data: { labels: obData.map(d => d.y), datasets: [{ data: obData.map(d => d.v), borderColor: COLORS.red, backgroundColor: 'rgba(224,92,122,0.08)', fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2.5 }] },
      options: { ...baseOpts('%'), scales: { ...baseOpts('%').scales, y: { ...baseOpts('%').scales.y, min: 8, max: 18 } } }
    });
  }

  const regionEl = document.getElementById('chartRegions');
  if (regionEl) {
    new Chart(regionEl, {
      type: 'line',
      data: {
        labels: allYears,
        datasets: [
          { label: 'W. Pacific', data: alignToYears(wprData, allYears), borderColor: COLORS.teal, tension: 0.4, pointRadius: 3, borderWidth: 2, fill: false },
          { label: 'Africa', data: alignToYears(afrData, allYears), borderColor: COLORS.blue, tension: 0.4, pointRadius: 3, borderWidth: 2.5, fill: false },
          { label: 'S-E Asia', data: alignToYears(searData, allYears), borderColor: COLORS.red, tension: 0.4, pointRadius: 3, borderWidth: 2, fill: false, borderDash: [4,4] }
        ]
      },
      options: {
        ...baseOpts('%'),
        plugins: { ...baseOpts('%').plugins, legend: { display: true, labels: { color: '#7a8099', boxWidth: 18, font: { size: 11 } } } },
        scales: { ...baseOpts('%').scales, y: { ...baseOpts('%').scales.y, min: 5, max: 45 } }
      }
    });
  }

  const genderEl = document.getElementById('chartGender');
  if (genderEl) {
    new Chart(genderEl, {
      type: 'line',
      data: {
        labels: allYears,
        datasets: [
          { label: 'Female', data: alignToYears(femaleData, allYears), borderColor: COLORS.red, backgroundColor: 'rgba(224,92,122,0.06)', fill: true, tension: 0.4, pointRadius: 4, borderWidth: 2.5 },
          { label: 'Male', data: alignToYears(maleData, allYears), borderColor: COLORS.blue, backgroundColor: 'rgba(91,138,240,0.06)', fill: true, tension: 0.4, pointRadius: 4, borderWidth: 2.5 }
        ]
      },
      options: {
        ...baseOpts('%'),
        plugins: {
          ...baseOpts('%').plugins,
          legend: { display: true, labels: { color: '#7a8099', boxWidth: 18, font: { size: 11 } } },
          tooltip: { ...baseOpts('%').plugins.tooltip, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%` } }
        },
        scales: { ...baseOpts('%').scales, y: { ...baseOpts('%').scales.y, min: 20, max: 50 } }
      }
    });
  }

  const bars = document.getElementById('regionBars');
  if (bars && !bars.dataset.loaded) {
    const regionData2022 = [
      { label: 'Europe', val: 50.0, color: COLORS.purple },
      { label: 'E. Mediterranean', val: 49.9, color: COLORS.gold },
      { label: 'Americas', val: 49.7, color: COLORS.orange },
      { label: 'W. Pacific', val: 36.3, color: COLORS.teal },
      { label: 'Africa', val: 31.3, color: COLORS.blue },
      { label: 'S-E Asia', val: 31.2, color: COLORS.red }
    ];
    bars.innerHTML = regionData2022.map(d => `
      <div class="bar-row">
        <div class="bar-label">${d.label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${d.val}%; background:${d.color};"></div></div>
        <div class="bar-val" style="color:${d.color}">${d.val}%</div>
      </div>
    `).join('');
    bars.dataset.loaded = 'true';
  }
}

function getDietPlan(bmi) {
  if (bmi < 18.5) {
    return {
      title: 'Underweight Diet Plan',
      badge: 'underweight',
      label: 'Underweight',
      message: 'You may benefit from a healthy calorie surplus plus more protein and strength training.',
      calories: 'Suggested intake: maintenance + 300 to 500 kcal/day',
      list: [
        'Breakfast: banana shake + oats + peanut butter (450–600 kcal)',
        'Snack: mixed nuts + dates + milk (250–350 kcal)',
        'Lunch: rice, dal, paneer or tofu, curd (600–800 kcal)',
        'Evening: smoothie with milk, banana, oats (300–450 kcal)',
        'Dinner: roti, potato sabji, chickpeas, yogurt (500–700 kcal)',
        'Best calorie-dense additions: nuts, seeds, paneer, avocado, olive oil'
      ],
      note: 'Aim for slow weight gain with protein-rich meals and resistance exercise.'
    };
  }
  if (bmi < 25) {
    return {
      title: 'Balanced Maintenance Plan',
      badge: 'normal',
      label: 'Normal',
      message: 'Your BMI is in the normal range. Focus on balanced meals and consistent activity.',
      calories: 'Suggested intake: maintenance calories',
      list: [
        'Breakfast: oats or eggs / paneer + fruit (300–450 kcal)',
        'Lunch: rice or roti + dal + vegetables + protein (450–650 kcal)',
        'Snack: fruit + yogurt or nuts (150–250 kcal)',
        'Dinner: light balanced meal with vegetables and protein (400–600 kcal)'
      ],
      note: 'Stay active, hydrated, and consistent with portion control.'
    };
  }
  if (bmi < 30) {
    return {
      title: 'Overweight Diet Plan',
      badge: 'overweight',
      label: 'Overweight',
      message: 'A calorie deficit with more fiber and protein can help reduce body fat.',
      calories: 'Suggested intake: maintenance - 300 to 500 kcal/day',
      list: [
        'Breakfast: oats with fruit or eggs / paneer (250–350 kcal)',
        'Snack: apple, orange, cucumber, or buttermilk (80–150 kcal)',
        'Lunch: salad + dal + 1–2 roti + tofu / paneer (350–500 kcal)',
        'Evening: green tea + roasted chana (100–180 kcal)',
        'Dinner: soup + sautéed vegetables + lean protein (250–400 kcal)',
        'Limit fried food, sugary drinks, sweets, and large late-night meals'
      ],
      note: 'Walking, cardio, and resistance training improve fat loss results.'
    };
  }
  return {
    title: 'Obesity Diet Plan',
    badge: 'obese',
    label: 'Obese',
    message: 'A structured calorie deficit and regular exercise are important for gradual weight reduction.',
    calories: 'Suggested intake: maintenance - 500 to 700 kcal/day',
    list: [
      'Breakfast: vegetable oats / egg whites / paneer with salad (220–320 kcal)',
      'Snack: low-sugar fruit or unsweetened yogurt (80–140 kcal)',
      'Lunch: large salad + dal + 1 roti + protein source (300–450 kcal)',
      'Evening: lemon water / green tea / sprouts (50–150 kcal)',
      'Dinner: soup + vegetables + tofu / paneer / lean protein (220–350 kcal)',
      'Avoid sugary drinks, refined flour snacks, fast food, and oversized portions'
    ],
    note: 'For obesity or medical conditions, personalized guidance from a doctor or dietitian is best.'
  };
}

function updateBMIOutput(bmi) {
  const resultScore = document.getElementById('bmiScore');
  const resultBadge = document.getElementById('bmiBadge');
  const resultMessage = document.getElementById('bmiMessage');
  const dietTitle = document.getElementById('dietTitle');
  const dietCalories = document.getElementById('dietCalories');
  const dietList = document.getElementById('dietList');
  const dietNote = document.getElementById('dietNote');

  if (!resultScore || !resultBadge || !resultMessage || !dietTitle || !dietCalories || !dietList || !dietNote) return;

  const plan = getDietPlan(bmi);
  resultScore.textContent = bmi.toFixed(1);
  resultBadge.className = `badge ${plan.badge}`;
  resultBadge.textContent = plan.label;
  resultMessage.textContent = plan.message;
  dietTitle.textContent = plan.title;
  dietCalories.textContent = plan.calories;
  dietList.innerHTML = plan.list.map(item => `<li>${item}</li>`).join('');
  dietNote.textContent = plan.note;
}

function calculateBMI() {
  const weightEl = document.getElementById('visitorWeight');
  const heightEl = document.getElementById('visitorHeight');
  if (!weightEl || !heightEl) return;
  const weight = parseFloat(weightEl.value);
  const heightCm = parseFloat(heightEl.value);

  const resultScore = document.getElementById('bmiScore');
  const resultBadge = document.getElementById('bmiBadge');
  const resultMessage = document.getElementById('bmiMessage');

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    if (resultScore) resultScore.textContent = '--';
    if (resultBadge) { resultBadge.className = 'badge obese'; resultBadge.textContent = 'Invalid input'; }
    if (resultMessage) resultMessage.textContent = 'Please enter valid height and weight values.';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  updateBMIOutput(bmi);
}

function initBMIForm() {
  const form = document.getElementById('bmiForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateBMI();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initBMIForm();
});

window.calculateBMI = calculateBMI;
