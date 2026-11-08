// Простой JS

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    if(id!=='#'){
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'})
    }
  })
})

// Плавное появление секций
document.querySelectorAll('section').forEach(s=>{
  s.style.opacity='0';
  s.style.transform='translateY(20px)';
  s.style.transition='opacity .4s,transform .4s'
})

new IntersectionObserver((e)=>{
  e.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity='1';
      entry.target.style.transform='translateY(0)'
    }
  })
}, {threshold:.1}).observe(document.querySelectorAll('section'))