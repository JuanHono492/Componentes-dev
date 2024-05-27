const tab = document.querySelector('.tab');
const itemsParent = document.querySelector('.tab__items');
const items = document.querySelectorAll('.tab__item');
const indicator = document.querySelector('.tab__indicator');

TweenMax.set(tab, { transformPerspective: 400, transformOrigin:'center center'});

const getActiveTabIndex = () => {
  return Array.from(items).findIndex(item => item.classList.contains('tab__item--active'));
}

const getIndicatorPos = () => {
  const { x: tabX } = tab.getBoundingClientRect();
  const { width: itemWidth, x: itemX } = items[getActiveTabIndex()].getBoundingClientRect();
  const { width: indicatorWidth } = indicator.getBoundingClientRect();
 
  const indicatorPosition = (itemX + itemWidth/2 - indicatorWidth/2) - tabX;
  
  return indicatorPosition;
}

const setIndicatorPos = () => {
  TweenMax.set(indicator, { x: getIndicatorPos()});  
}

const tilt = (e) => {
  if (e.target.classList.contains('tab__item')) {
    const pageX = e.pageX ? e.pageX : e.touches[0].pageX;
    const rotate = pageX - window.innerWidth/2; 
  
    TweenMax.to(e.target, .2, { scale: .8, ease: Power4.easeOut });
    TweenMax.to(tab, .5, { rotationY: 0.03 * rotate, rotationX: -Math.abs(0.015 * rotate), rotationZ: '-0.1' });
  }
}

const activateTab = (e) => {
  if (e.target.classList.contains('tab__item')) {
    items.forEach(item => item.classList.remove('tab__item--active'));
    e.target.classList.add('tab__item--active');
    
    TweenMax.to(indicator, .5, { x: getIndicatorPos() });
    TweenMax.to(e.target, .3, { scale: 1, ease: Back.easeOut.config(5) });
    TweenMax.to(tab, .5, { rotationY: 0, rotationX: 0, rotationZ: 0 }); 
  }
}

setIndicatorPos();

itemsParent.addEventListener('touchstart', tilt);
itemsParent.addEventListener('mousedown', tilt);

itemsParent.addEventListener('touchend', activateTab);
itemsParent.addEventListener('mouseup', activateTab);

window.addEventListener('resize', setIndicatorPos);