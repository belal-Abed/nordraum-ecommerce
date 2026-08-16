const state= {
  products:[],filtered:[],visible:8,cart:JSON.parse(localStorage.getItem('nordraum-cart')||'[]'),category:'all',query:'',sort:'featured'
};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fallback=[ {
  id:101,
  title:'Arc Wireless Headphones',
  price:189.9,
  rating:4.8,
  category:'smartphones',
  brand:'NORD Audio',
  thumbnail:'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp'
},
 {
  id:102,
  title:'Form Studio Laptop',
  price:1249,
  rating:4.7,
  category:'laptops',
  brand:'NORD Work',
  thumbnail:'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp'
},
 {
  id:103,
  title:'Element Phone Pro',
  price:799,
  rating:4.6,
  category:'smartphones',
  brand:'NORD Mobile',
  thumbnail:'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp'
},
 {
  id:104,
  title:'Quiet Daily Serum',
  price:42,
  rating:4.9,
  category:'beauty',
  brand:'NORD Care',
  thumbnail:'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
},
 {
  id:105,
  title:'Frame Ultrabook',
  price:899,
  rating:4.5,
  category:'laptops',
  brand:'NORD Work',
  thumbnail:'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp'
},
 {
  id:106,
  title:'Studio Pocket Phone',
  price:599,
  rating:4.4,
  category:'smartphones',
  brand:'NORD Mobile',
  thumbnail:'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp'
},
 {
  id:107,
  title:'Essential Skin Oil',
  price:34,
  rating:4.8,
  category:'beauty',
  brand:'NORD Care',
  thumbnail:'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp'
},
 {
  id:108,
  title:'Air Desk Computer',
  price:1099,
  rating:4.7,
  category:'laptops',
  brand:'NORD Work',
  thumbnail:'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp'
} ];
async function loadProducts() {
  try {
    const requests=['smartphones',
    'laptops',
    'beauty'].map(c=>fetch(`https://dummyjson.com/products/category/${c}?limit=8`).then(r=> {
      if (!r.ok)throw Error();return r.json()
    }));
    const data=await Promise.all(requests);
    state.products=data.flatMap(x=>x.products).map(p=>( {
      ...p,price:Math.round(p.price*1.08)
    }));
  } catch (e) {
    state.products=fallback
  }
  applyFilters()
}
function applyFilters() {
  let list=[...state.products];
  if (state.category!=='all')list=list.filter(p=>p.category===state.category);
  if (state.query)list=list.filter(p=>(p.title+' '+p.brand+' '+p.category).toLowerCase().includes(state.query));
  if (state.sort==='low')list.sort((a,b)=>a.price-b.price);
  if (state.sort==='high')list.sort((a,b)=>b.price-a.price);
  if (state.sort==='rating')list.sort((a,b)=>b.rating-a.rating);
  state.filtered=list;
  renderProducts()
}
function renderProducts() {
  const grid=$('#productGrid'),items=state.filtered.slice(0,state.visible);
  grid.innerHTML=items.length?items.map((p,i)=>`<article class="product-card reveal visible" style="transition-delay:${(i%4)*60}ms"><div class="product-image"><img src="${p.thumbnail}" alt="${p.title}" loading="lazy"><span class="product-badge">${p.rating>=4.7?'Editors’ pick':'New'}</span><button class="wish-btn" data-wish="${p.id}" aria-label="Save ${p.title}">♡</button><button class="quick-add" data-add="${p.id}">Quick add — €${Number(p.price).toFixed(2)}</button></div><div class="product-info"><div class="product-meta"><h3>${p.title}</h3><span class="product-price">€${Number(p.price).toFixed(2)}</span></div><p>${p.brand||'NORDRAUM'} · ${p.category}</p><span class="rating">★ ${p.rating} / 5</span></div></article>`).join(''):`<div class="loader"><p>No objects found. Try another search.</p></div>`;
  $('#loadMore').style.display=state.visible<state.filtered.length?'flex':'none'
}
function addToCart(id) {
  const p=state.products.find(x=>x.id===id)||fallback.find(x=>x.id===id);
  if (!p)return;
  const existing=state.cart.find(x=>x.id===id);
  existing?existing.qty++:state.cart.push( {
    ...p,qty:1
  });
  saveCart();
  showToast(`${p.title} added`)
}
function saveCart() {
  localStorage.setItem('nordraum-cart',JSON.stringify(state.cart));
  renderCart()
}
function renderCart() {
  const count=state.cart.reduce((n,x)=>n+x.qty,0),total=state.cart.reduce((n,x)=>n+x.price*x.qty,0);
  $$('.cart-count').forEach(x=>x.textContent=count);
  $('#cartItems').innerHTML=state.cart.map(x=>`<div class="cart-item"><img src="${x.thumbnail}" alt=""><div><h4>${x.title}</h4><small>Qty ${x.qty}</small><br><button data-remove="${x.id}">Remove</button></div><strong>€${(x.price*x.qty).toFixed(2)}</strong></div>`).join('');
  $('#cartEmpty').style.display=state.cart.length?'none':'block';
  $('#cartSummary').style.display=state.cart.length?'block':'none';
  $('#cartTotal').textContent=`€${total.toFixed(2)}`
}
function toggleCart(open=true) {
  $('#cartDrawer').classList.toggle('open',open);
  $('#cartDrawer').setAttribute('aria-hidden',!open);
  $('#overlay').classList.toggle('show',open);
  document.body.style.overflow=open?'hidden':''
}
function toggleSearch(open=true) {
  $('#searchPanel').classList.toggle('open',open);
  $('#overlay').classList.toggle('show',open);
  if (open)setTimeout(()=>$('#searchInput').focus(),350)
}
function showToast(text) {
  const t=$('#toast');
  t.textContent=text;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2200)
}
document.addEventListener('click',e=> {
  const add=e.target.closest('[data-add]'),remove=e.target.closest('[data-remove]'),wish=e.target.closest('[data-wish]');if (add)addToCart(+add.dataset.add);if (remove) {
    state.cart=state.cart.filter(x=>x.id!==+remove.dataset.remove);saveCart()
  }
  if (wish) {
    wish.classList.toggle('active');wish.textContent=wish.classList.contains('active')?'♥':'♡'
  }
  if (e.target.closest('.cart-toggle'))toggleCart();if (e.target.closest('.close-drawer')||e.target.closest('.close-and-shop'))toggleCart(false);if (e.target.closest('.search-toggle'))toggleSearch();if (e.target.closest('.close-search')||e.target.id==='overlay') {
    toggleCart(false);toggleSearch(false)
  }
});
$$('.filter').forEach(btn=>btn.addEventListener('click',()=> {
  $$('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');state.category=btn.dataset.category;state.visible=8;applyFilters()
}));
$('#sort').addEventListener('change',e=> {
  state.sort=e.target.value;applyFilters()
});
$('#loadMore').addEventListener('click',()=> {
  state.visible+=4;renderProducts()
});
$('#searchInput').addEventListener('input',e=> {
  state.query=e.target.value.toLowerCase();state.visible=8;applyFilters()
});
$('#newsletterForm').addEventListener('submit',e=> {
  e.preventDefault();showToast('Welcome to NORDRAUM');e.target.reset()
});
$('.checkout-btn').addEventListener('click',()=>showToast('Demo checkout — portfolio mode'));
const observer=new IntersectionObserver(entries=>entries.forEach(x=>x.isIntersecting&&x.target.classList.add('visible')), {
  threshold:.12
});
$$('.reveal').forEach(x=>observer.observe(x));
window.addEventListener('scroll',()=>$('#header').classList.toggle('scrolled',scrollY>120));
document.addEventListener('mousemove',e=> {
  const s=$('.product-sculpture');if (s&&innerWidth>800)s.style.transform=`rotate(${-7+(e.clientX/innerWidth-.5)*5}deg) translateY(${(e.clientY/innerHeight-.5)*6}px)`
});
renderCart();
loadProducts();
