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
        label: 'My Collections',
        icon: '/assets/icons/collection.svg',
        route: '/contact-us'
    },
    {
        label: 'Leaderboard',
        icon: '/assets/icons/trophy.svg',
        route: '/leaderboard/live-round'
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

export const pollDefaultValues = {
    startDateTime: new Date(),
    endDateTime: MaxDate,
    createdAt: new Date(),
    endSponsoredTime: new Date(),
    openList: false,
    openComments: false,
}

const colors = ['13AACB v','EA6126 v','F8A037 v','57C411 v','9B47E6','CD35E8','E41C55 v','10CD8E v','9DB711 v']