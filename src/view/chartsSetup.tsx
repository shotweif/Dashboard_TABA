export function setupCharts() {
    // Insert the scripts dynamically
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com?plugins=forms,typography';
    document.head.appendChild(tailwindScript);
  
    const unlazyScript = document.createElement('script');
    unlazyScript.src = 'https://unpkg.com/unlazy@0.11.3/dist/unlazy.with-hashing.iife.js';
    unlazyScript.defer = true;
    unlazyScript.setAttribute('init', '');
    document.head.appendChild(unlazyScript);
  
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(chartScript);
  
    // Wait for scripts to load before executing the code
    chartScript.onload = () => {
      const ctxBar = document.getElementById('transaccionesChartBar') as HTMLCanvasElement;
      new (window as any).Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Aceptadas', 'Rechazadas'],
          datasets: [{
            label: 'Transacciones',
            data: [1234, 456],
            backgroundColor: ['rgba(63, 191, 63, 0.5)', 'rgba(34, 102, 3, 0.5)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  
      const ctxPie = document.getElementById('transaccionesChartPie') as HTMLCanvasElement;
      new (window as any).Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: ['A otros bancos', 'Locales'],
          datasets: [{
            label: 'Transacciones',
            data: [576, 456],
            backgroundColor: ['rgba(34, 102, 34, 1)', 'rgba(63, 191, 63, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
  
      const ctxDoughnut = document.getElementById('DesercionesGraficoMedidor') as HTMLCanvasElement;
      new (window as any).Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Valor', 'Restante'],
          datasets: [{
            label: 'Transacciones',
            data: [200, 90],
            backgroundColor: ['rgba(63, 191, 63, 1)', 'rgba(220, 220, 220, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          cutoutPercentage: 80,
          responsive: true,
          rotation: 270,
          circumference: 180,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
  
      const ctxLine = document.getElementById('usuariosActivosChartLine') as HTMLCanvasElement;
      new (window as any).Chart(ctxLine, {
        type: 'line',
        data: {
          labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          datasets: [{
            label: 'Usuarios Activos',
            data: [120, 115, 130, 110, 100, 105, 120, 140, 150, 160, 170, 180, 200, 220, 240, 230, 210, 190, 180, 170, 160, 150, 140, 130],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(63, 191, 63, 1)',
            borderWidth: 2,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };
  }
  
  export function initializeDefaultDates() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    (document.getElementById('dateInput') as HTMLInputElement).value = formatDate(yesterday);
    (document.getElementById('dateInput2') as HTMLInputElement).value = formatDate(today);
  }
  
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  