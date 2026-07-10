let scrollPosition = 0;
export const fixedBackgroundScroll = (isModalOpened: boolean) => {
    

    if(isModalOpened) {

        // 1. Сохраняем текущую позицию скролла
        scrollPosition = window.scrollY;
        // 2. Фиксируем body и сдвигаем его обратно на нужную позицию
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%'; // важно, чтобы не «уехала» ширина макета
    }
    else {

        document.body.style.position = 'unset';
        // На 200 px вниз
        window.scrollBy(0, scrollPosition);
    }
    
}
  
//   else {

//   }

// }