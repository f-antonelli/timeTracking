const d = document;

d.addEventListener('DOMContentLoaded', e => {
   fetchData();
});

const fetchData = async () => {
   try{
      const res = await fetch ('data.json');
      const data = await res.json();
      console.log(data);
      printBoxes(data);
      dates(data);
   }
   catch (err) {
      console.log(err);
   }
};

// Rellenando cajas
const containerBoxes = d.querySelectorAll('.grid-item');
console.log(containerBoxes)

const printBoxes = (data) => {
   const template = d.getElementById('templateData').content;

   data.forEach( (item, index) => {
      template.querySelector('p').textContent = item.title;
      template.querySelector('h2').textContent = item.timeframes.daily.current + 'hrs';
      template.querySelector('span').textContent = `Last Day - ` + item.timeframes.daily.previous  + 'hrs';

      const clone = template.cloneNode(true);
      containerBoxes[index+1].appendChild(clone);
   })
}

// Agregando funcionalidad a los botones
const dates = (data) => {
   const dailyInfo = d.getElementById('btnDaily');
   const weeklyInfo = d.getElementById('btnWeekly');
   const monthlyInfo = d.getElementById('btnMonthly');

   const h2 = d.querySelectorAll('h2');
   const span = d.querySelectorAll('span');
   console.log(h2[3].textContent)

   dailyInfo.addEventListener('click', () => {

      data.forEach( (item, index) => {
         h2[index].textContent = item.timeframes.daily.current + 'hrs';
         span[index].textContent = `Last Day - ` + item.timeframes.daily.previous  + 'hrs';

      })
   });

   weeklyInfo.addEventListener('click', () => {

      data.forEach( (item, index) => {
         h2[index].textContent = item.timeframes.weekly.current + 'hrs';
         span[index].textContent = `Last Month - ` + item.timeframes.daily.previous  + 'hrs';

      })
   });

   monthlyInfo.addEventListener('click', () => {

      data.forEach( (item, index) => {
         h2[index].textContent = item.timeframes.monthly.current + 'hrs';
         span[index].textContent = `Last Week - ` + item.timeframes.monthly.previous  + 'hrs';

      })
   });
}