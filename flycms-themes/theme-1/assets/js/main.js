document.addEventListener('DOMContentLoaded', function () {
    // Drop down
    const navbarDropdowns = document.querySelectorAll('[data-collapse-toggle]');
    let currentOpenDropdown = null;
    let activeItems = {};
    let previousMenuId = null;
    const handleClick = (button, event) => {
        event.stopPropagation();
        const menuId = button.getAttribute('data-collapse-toggle');
        const dropdownMenu = document.getElementById(menuId);
        const dataValues = dropdownMenu.querySelectorAll('[data-value]');

        dataValues.forEach(dataValue => {

            dataValue.addEventListener('click', function (event) {
                event.stopPropagation();
                const dataValueId = dataValue.getAttribute('data-value');
                const placeholder = button.querySelector('.search-box-dropdown-placeholder');
                placeholder.textContent = dataValueId;

                if (!activeItems[menuId]) {
                    activeItems[menuId] = dataValueId;
                } else {
                    delete activeItems[menuId];
                    activeItems[menuId] = dataValueId;
                    dataValues.forEach(dataValue => dataValue.classList.remove('bg-quaternary'));
                }

                dataValue.classList.add('bg-quaternary');
                dropdownMenu.classList.add('hidden');

            });
        });

        dropdownMenu.classList.toggle('hidden');

        if (previousMenuId && previousMenuId !== menuId) {
            const previousDropdownMenu = document.getElementById(previousMenuId);
            previousDropdownMenu.classList.add('hidden');
        }

        currentOpenDropdown = dropdownMenu.classList.contains('hidden') ? null : dropdownMenu;
        previousMenuId = menuId;

    };

    const handleMouseOver = (button, event) => {
        const menuId = button.getAttribute('data-collapse-toggle');
        const dropdownMenu = document.getElementById(menuId);
        const onHover = button.getAttribute('onHover');

        if (dropdownMenu.classList.contains('hidden') && onHover === 'true') {
            dropdownMenu.classList.remove('hidden');
        }

        if (currentOpenDropdown && currentOpenDropdown !== dropdownMenu && onHover === 'true') {
            currentOpenDropdown.classList.add('hidden');
        }

        dropdownMenu.addEventListener('mouseleave', function (event) {
            const distanceThreshold = 380;
            const dropdownRect = dropdownMenu.getBoundingClientRect();
            const distanceToMenu = Math.sqrt(
                Math.pow(event.clientX - dropdownRect.left, 2) +
                Math.pow(event.clientY - dropdownRect.top, 2)
            );

            if (distanceToMenu > distanceThreshold && onHover === 'true') {
                dropdownMenu.classList.add('hidden');
            }
        });

        currentOpenDropdown = dropdownMenu.classList.contains('hidden') ? null : dropdownMenu;
    };

    navbarDropdowns.forEach(button => {
        button.addEventListener('click', handleClick.bind(null, button));
        button.addEventListener('mouseover', handleMouseOver.bind(null, button));
    });
});


// to top button

var toTopButton = document.getElementById("to-top-button");

if (toTopButton) {

    window.onscroll = function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            toTopButton.classList.remove("hidden");
        } else {
            toTopButton.classList.add("hidden");
        }
    };

    window.goToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}
async function fetchPosts(endpoint, page = 1, limit = 9, ajax = 1) {
    try {
        const url = window.location.origin + endpoint + (endpoint.includes('?') ? '&' : '?') + 'page=' + page + '&limit=' + limit + '&ajax=' + ajax;
        console.log(url);
        const response = await fetch(url);
        const data = await response.text();
        const dataStr = data.replaceAll('\n', '').replaceAll('&quot;', '"');
        const jsonData = JSON.parse(dataStr);
        console.log(jsonData);
        return jsonData;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return { data: [] };
    }
}

export { fetchPosts };