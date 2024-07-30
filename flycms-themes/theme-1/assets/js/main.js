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
