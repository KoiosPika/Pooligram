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
        route: '/profile'
    },
    {
        label: 'My Wallet',
        icon: '/assets/icons/wallet.svg',
        route: '/wallet'
    },
    {
        label: 'Contact Us',
        icon: '/assets/icons/email.svg',
        route: '/contact-us'
    }
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