export const Links = [
    {
        label: 'Home',
        icon: '/assets/icons/house-solid.svg',
        route: '/',
    },
    {
        label: 'Create Poll',
        icon: '/assets/icons/square-plus-solid.svg',
        route: '/poll/create'
    },
    {
        label: 'Live Poll',
        icon: '/assets/icons/stream.svg',
        route: '/live-poll'
    },
    {
        label: 'My Profile',
        icon: '/assets/icons/advert.svg',
        route: '/profile'
    },
    {
        label: 'Contact Us',
        icon: '/assets/icons/email-1.svg',
        route: '/poll/create'
    },
]

const Today = new Date();
const MaxDate = new Date(Today);
MaxDate.setDate(Today.getDate() + 7);

export const pollDefaultValues = {
    startDateTime: new Date(),
    endDateTime: MaxDate,
    createdAt: new Date(),
    sponsored: false,
    openList: false,
    openComments: false,
}