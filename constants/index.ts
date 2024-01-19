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
        label: 'Create Ad',
        icon: '/assets/icons/advert.svg',
        route: '/poll/create'
    },
    {
        label: 'Contact Us',
        icon: '/assets/icons/email-1.svg',
        route: '/poll/create'
    },
]

export const Polls = [
    {
        title: 'Do You Spend more time inside or outside?',
        image: '/assets/images/outside.png'
    },
    {
        title: 'Would you stay in your current job?',
        image: '/assets/images/Job.png'
    },
    {
        title: 'Would you stay in this forest?',
        image: '/assets/images/forest.png'
    },
    {
        title: 'Would you stay in this era? Would you stay in this era? Would you stay in this era?',
        image: '/assets/images/old-sm.png'
    },
    {
        title: 'Would you stay in this forest?',
        image: '/assets/images/forest.png'
    },
    {
        title: 'Would you stay in this era?',
        image: '/assets/images/old.png'
    },
    {
        title: 'Do You Spend more time inside or outside?',
        image: '/assets/images/outside.png'
    },
    {
        title: 'Would you stay in your current job?',
        image: '/assets/images/Job.png'
    },
    {
        title: 'Would you stay in this forest?',
        image: '/assets/images/phone.jpg'
    },
    {
        title: 'Would you stay in this era? Would you stay in this era? Would you stay in this era?',
        image: '/assets/images/old-sm.png'
    },
    {
        title: 'Would you stay in this forest?',
        image: '/assets/images/forest.png'
    },
    {
        title: 'Would you stay in this era?',
        image: '/assets/images/old.png'
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