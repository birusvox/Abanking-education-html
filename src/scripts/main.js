const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const tools = Array.from(document.querySelectorAll('.tool'));
const emptyNote = document.querySelector('.tools__empty');
const moreButton = document.querySelector('.tools__more');
const menu = document.querySelector('.header__menu');
const menuToggle = document.querySelector('.header__toggle');
const authDialog = document.querySelector('.auth');
const authTitle = document.querySelector('.auth__title');
const authStatus = document.querySelector('.auth__status');

const applyFilter = (query, tag) => {
    const needle = query.trim().toLowerCase();
    let visible = 0;

    tools.forEach((tool) => {
        const name = tool.dataset.name || '';
        const tags = tool.dataset.tags || '';
        const matchesText = !needle || name.includes(needle);
        const matchesTag = !tag || tags.split(' ').includes(tag);
        const isExtra = tool.classList.contains('tool_extra') && tool.dataset.expanded !== 'true';
        const show = matchesText && matchesTag && !isExtra;

        tool.hidden = !show;
        if (show) {
            visible += 1;
        }
    });

    emptyNote.hidden = visible !== 0;
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilter(searchInput.value, '');
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

searchInput.addEventListener('input', () => {
    applyFilter(searchInput.value, '');
});

moreButton.addEventListener('click', () => {
    tools.forEach((tool) => {
        if (tool.classList.contains('tool_extra')) {
            tool.dataset.expanded = 'true';
            tool.hidden = false;
        }
    });
    moreButton.hidden = true;
    applyFilter(searchInput.value, '');
});

document.querySelector('.tools__list').addEventListener('click', (event) => {
    const icon = event.target.closest('.tool__icon');
    if (!icon) {
        return;
    }

    icon.classList.toggle('tool__icon_active');
    const svgPath = icon.querySelector('path');
    if (icon.hasAttribute('data-like') && svgPath) {
        svgPath.setAttribute('fill', icon.classList.contains('tool__icon_active') ? 'currentColor' : 'none');
    }
});

menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('header__menu_open');
    menuToggle.setAttribute('aria-expanded', String(open));
});

menu.addEventListener('click', (event) => {
    const option = event.target.closest('.header__option');
    if (!option) {
        return;
    }

    menu.classList.remove('header__menu_open');
    menuToggle.setAttribute('aria-expanded', 'false');
    searchInput.value = '';
    applyFilter('', option.dataset.filter || '');
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.header__drop')) {
        menu.classList.remove('header__menu_open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

document.querySelectorAll('[data-auth]').forEach((button) => {
    button.addEventListener('click', () => {
        authTitle.textContent = button.dataset.auth === 'login' ? 'Login' : 'Sign Up';
        authStatus.textContent = '';
        authDialog.showModal();
    });
});

document.querySelector('[data-auth-close]').addEventListener('click', () => {
    authDialog.close();
});

authDialog.querySelector('form').addEventListener('submit', () => {
    authStatus.textContent = `${authTitle.textContent} form is ready. This demo does not create an account.`;
});
