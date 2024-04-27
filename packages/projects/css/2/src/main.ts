
import './style.css'
import ewAlert from 'alert';

const createList = () => {
  let template = '';
  for (let i = 0; i < 7; i++) {
    template += `<li class="tn-li"><a href="javascript:void 0;"><img data-index="${i + 1}" src="img/${i + 1}.jpg" alt="图片加载中" class="tn-img"></a></li>`;
  }
  return `<div class="tn-wrap"><ul class="tn-banner">${template}</ul><div>`
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = createList();

/**
 * 调试功能用
 */
document.querySelector<HTMLUListElement>('.tn-banner')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target?.tagName.toLowerCase() === 'img') {

    const index = target?.getAttribute('data-index');
    ewAlert(`当前点击的是第${index}张图`);
  }
})

