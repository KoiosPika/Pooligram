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
        label: 'My Profile',
        icon: '/assets/icons/profile.svg',
        route: '/profile/polls'
    },
    {
        label: 'Collections',
        icon: '/assets/icons/collection.svg',
        route: '/collections'
    },
    {
        label: 'Leaderboard',
        icon: '/assets/icons/trophy.svg',
        route: '/leaderboard/live-round/polls'
    },
    {
        label: 'Contact Us',
        icon: '/assets/icons/email.svg',
        route: '/contact-us'
    },
]

const Today = new Date();
const MaxDate = new Date(Today);
MaxDate.setDate(Today.getDate() + 7);

const collectionMaxDate = new Date(Today);
collectionMaxDate.setDate(Today.getDate() + 10);

export const pollDefaultValues = {
    startDateTime: new Date(),
    endDateTime: MaxDate,
    createdAt: new Date(),
    endSponsoredTime: new Date(),
    openList: false,
    openComments: false,
}

export const collectionDefaultValues = {
    endDateTime: collectionMaxDate,
    visibility: true
}