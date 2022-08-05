const navigationItemsData = [
    {
        path: '/',
        name: 'Home',
        subItems: [],
        isDisabled: false
    },
    {
        path: '/link',
        name: 'Link',
        subItems: [],
        isDisabled: false
    },
    {
        path: '/disable',
        name: 'Disable',
        subItems: [],
        isDisabled: true
    },
    {
        path: '/dropdown',
        name: 'Dropdown',
        subItems: [
            {
                path: '/sub1',
                name: 'sub1',
            }
        ],
        isDisabled: false
    },
]


const navContentElement = window.document.querySelector('#navbar-dynamic-item')

navigationItemsData.forEach(itemData => {
    const itemElement = window.document.createElement('li');
    const linkElement = window.document.createElement('a');
    const isDropDown = itemData?.subItems?.length;

    !!isDropDown ?
        itemElement.classList.add('nav-item', 'dropdown') :
        itemElement.classList.add('nav-item')

    linkElement.classList.add('nav-link');
    itemData.isDisabled && linkElement.classList.add('disabled');
    linkElement.textContent = itemData?.name

    !!isDropDown ?
        linkElement.setAttribute('href', '#') :
        linkElement.setAttribute('href', itemData.path)

    !!isDropDown && linkElement.setAttribute('data-toggle', 'dropdown');
    !!isDropDown && linkElement.classList.add('dropdown-toggle');
    itemElement.appendChild(linkElement)

    if (!!isDropDown) {
        const subItemsElement = window.document.createElement('div')
        subItemsElement.classList.add('dropdown-menu')
        subItemsElement.setAttribute('aria-labelledby', 'dropdown01')
        itemElement.appendChild(subItemsElement)

        itemData.subItems.forEach(subItem => {
            const subItemElement = window.document.createElement('a')
            subItemElement.classList.add('dropdown-item')
            subItemElement.setAttribute('href', subItem.path)
            subItemElement.textContent = subItem?.name
            subItemsElement.appendChild(subItemElement)
        })
    }

    navContentElement.appendChild(itemElement)
})

console.log('working')