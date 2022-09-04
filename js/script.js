window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
     tabsContent = document.querySelectorAll('.tabcontent'),
     tabsParent = document.querySelector('.tabheader__items');


     function hideTabContent(){
        tabsContent.forEach(item =>{
            item.classList.add('hide')
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
     }

     function showTabContent(i = 0){
        
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
     }

     hideTabContent();
     showTabContent();

     tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
     })

     //Timer 
     const deadline = '2022-08-17';
 

      function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date());
            days = Math.floor(t / (1000   * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60 ) % 60),
            seconds = Math.floor((t / 1000) % 60);

            return{
                'total': t,
                'days' : days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
            };
      }

      function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
      }

      function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
      }
      
      setClock('.timer', deadline);

      //Modal

      const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

            // modalTrigger.forEach(btn =>{
            //     btn.addEventListener('click', ()=>{
            //       //Variant 1 modal popup
            //       // modal.classList.add('show');
            //       // modal.classList.remove('hide');
            //       modal.classList.toggle('show');
            //       document.body.style.overflow = 'hidden';
            //     })
            // })
            function openModal(){
                modal.classList.toggle('show');
                  document.body.style.overflow = 'hidden';
                  clearInterval(modalTimerId)
            }

            modalTrigger.forEach(btn =>{
                btn.addEventListener('click', openModal)
            })

           

            function closeModal(){
                modal.classList.toggle('show'); 
                document.body.style.overflow = '';
            }

            modalCloseBtn.addEventListener('click', closeModal)
    //   modalCloseBtn.addEventListener('click', ()=>{
    //     //Variant 1 modal popup
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');
    //     modal.classList.toggle('show'); 
    //     document.body.style.overflow = '';
    //   })

      modal.addEventListener('click', (e)=>{
        if(e.target === modal){
            closeModal();
        }
      });

      document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
      });

      const modalTimerId = setTimeout(openModal, 5000)

      function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
      }

      window.addEventListener('scroll', showModalByScroll);

      //Clase pentru cards

      class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer
        }

        render(){
            const elem = document.createElement('div');
            if(this.classes.length === 0){
                this.elem = 'menu__item';
                element.classList.add(this.elem);
            }else {
                this.classes.forEach(className => elem.classList.add(className))
            }

            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Pret:</div>
                    <div class="menu__item-total"><span>${this.price}</span> RON/Zi</div>
                </div>
            `;
            this.parent.append(elem)
        }
      }

      new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      "Menu Fitness'",
      'Meniul „Fitness” este o nouă abordare a gătitului: mai multe legume și fructe proaspete. Pentru persoanele care sunt interesate de sport; activ și sănătos. Acesta este un produs nou-nouț cu cel mai bun preț și de înaltă calitate!\n',
        9,
        '.menu .container',
        'menu__item'
      ).render();

      new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Menu Premium”',
        'Meniul „Premium” - folosim nu numai un design frumos al ambalajului, ci și execuția de înaltă calitate a preparatelor. Pește roșu, fructe de mare, fructe - un meniu de restaurant fără a merge la restaurant!\n',
        9,
        '.menu .container',
        'menu__item'
      ).render()
       
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Menu de Post"',
        '„Meniul postului” nostru special este o selecție atentă de ingrediente: absența completă a produselor de origine animală. Armonie completă cu tine și natura în fiecare element!"\n',
        10,
        ".menu .container",
        'menu__item'
    ).render();
})  