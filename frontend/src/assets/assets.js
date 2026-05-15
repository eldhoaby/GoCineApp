import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Kochi",
    "Varkala",
    "Kottyam",
    "Idukki",
    
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Dashamoolam Damu", address: "Pollachi,Tamil Nadu", image: "data:image/jpeg;base64,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", rating: 5, review: "GoCine makes booking movie tickets super easy and fast!" },
    { id: 2, name: "Ramanan", address: "Ezhupunna, Kerala", image: "data:image/jpeg;base64,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", rating: 4, review: "I love the offers and the seat selection is very smooth." },
    { id: 3, name: "Shaji Pappan", address: "Thodupuzha,Kerala", image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EADkQAAIBAwMCBAMFBgYDAAAAAAECAwAEEQUSITFBBhNRYSJxgRQyQpHRFSNSscHwByQzU2KhcuHx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMEAQAF/8QAJBEAAgIBBAEFAQEAAAAAAAAAAAECEQMEEiExExQiMkFRcTP/2gAMAwEAAhEDEQA/AAuynKnNT7KbIREhZqdZKkc3CNNzceg9amt7X4BdXm0Bv9NG6kfKo9PiS8mj3sSTzgcAe9F5NNjumktpnxCI1kzu5DZJAz+dKcrKoQpAm8hkvt0u6PyVx5YQHPuD6ULu4pFcI0bAg8sByuegoxb2UguHntXLQRjZITxv/Wprv4Jd5RWRsKT156EfmKEZX6Za2mDXBgnRUkUgxM2CcHsaUqrcrJEp2suVaM9vlVnURC90DGuJFZgTnsGoVE0kc80soyCQTxgnOMVxhDFay2TELuaNh8Sk5GKfcQRSpHNblkfPb8Pr86JFnZAjDkkqeOcGqVlnD2hALA9GHUViCfQxnknt2huEYuoysi/iH9/yrtkXhT7NK37lhgSZ5U+pp6zSEFVY5Ugg+oqv5M0rhlkCxbgTkD1ogAtpUxDPFLzIp6jjNEkdWOAenWgVyQcLACkqtuQnuPSprS6YTRmTKueGz3oWag1inBRUW/vxThJisU6MeJMl2iltpgkzTw1GpipYqFspU7NKj3CdhNtFC9WmQHYz4CYJHuelFRWB8TXrHUbpFzsDbefYD/3WMbFcm1sbm2jtNsWQxJXdnJJHX+dXxeFpGycZXP0HFAfDNs13bi5OdrqGVT24H6Ubktm54wOlIeSmXQwtqx0V/HDGVfAHVVxwOP1z9KCahqZMZhjJCqAfm2cn/v8AnV2W0YtnbgE81X/ZhmPP8XA7UPlQfp5MCGUzS5jHTJ+fPIrr3BTyo3Xg4Iz7VoYNDChDjOAVYVX1LQXk8kR5LRgsdv8A1+dZ5lZ3pmkRmL90JpM5yFwexqje2EltOZVHz9+K2FnpJuhAsyFUjbzG3dyM8f36U7XtNMltIkSAOehHag8vI1adbWeetIFRHUkA8j25z+tR7nkUShwA5yCe1Gde0Y2mnRJED8CYrPwxMIkZ2yQWAxT4TtEuTFsZZibzIQkzbpUcnIPXJzXZ53TZ5nPbcOtQBGFv5kUYDt8TY9fSoluBJGFfIAPBPamCTRWUpkto2JycYqffVS0UJFwQQe4+QqbPNIfYxE6Pg81YRs1TU1KjYrlwcW80qgD0qLcDsQQWvMtZlc6tdoF3Bpzn5k8V6ap6ViLazVvErByG/wAyScfOnSdIRjVuj0LSoY7HToIeAQozx7VbSRGyDzUMyEgL3qSG1bgkj6V582e3jXB3yw3UYFOWJEPwr9asraSY4AP1rgtpc4IH50ptj0kKMKeNoqdIwrZCiuw24HLEA1ZVQBjINcrOY2DC9+tSvGj5qRIsjgU7ZjtRIwF39hFPEVdAykd6811nTPsLyBTmIHKj0r1a6XKECvPfFm9AxxlabifJPqI3GzMQT7rZF6Heeaob1Zy+MDOGHpVc3JjLIpwM5auefiTLLznI4qw8yjXWxX7PGUJIK96eWqtZkCzi2jAIzT8kmlnXRMHxUiEmoFXNWIu1ZRqZKucV2ujGK7XUcEE7UE8hYPFkRC8zMHH5YP8AKjSmlJbpLPbzn/Ugfcp9iMH+/anzXtEYn70HQiJEGdvjPaq/mvDKpH3D1rM6pqnkSsZ5CBnjnFBT4nljlwjyMpOANpqFwcuj11lUOz1NLlSAQ1cN6uEPqcCvPYPFEyShJU2sp5VuCa0mmNLqFmxAYDO5G9KnkpLsrhOMlwaBbmNlOXwfeo5L22hPxTg49Kyl/HdIGDScZ7Vm7r9oO8ot2LeWMqGHJ5ooQ3A5JuP0eqweIYQu2MBhVyPU4rkDHX25rzTwva6xeRea8ixomd5IBA6Y4/OjNlqd5BO8VxDlVOPNjyVNHODiLx5N5sZGVs81nPEGnpNAx25OKI205kUMxzmpLxRJbsPalKXI5q1R4brVt5E7Dbhge3cUQ0zwrq19Yvfwwr5Kc4dwGcY52jvRmTTxc60pYAojAkH8XtWku4JH+z/HwjDCqeF9KrlmcUkR4tKsjbbMzbpiCNfRRUuyrPlEdRjtXNlPPMk6ZAoxUqkZpMKhYkGhYUWWwwxXaqh+KVDbDsNA0y61WSwEKLEpimba8ncVwGodQtTeWbxqfjHxJ86fkTceBWlnGOVOXQP1TSpb28WTOEjbd04NJbKxjvmuRDmQ9UJG39a0um7bjSomk4cjDj0I4qk9o3m7IY1Lfx1Dva4PW8cW+QNc6d9uuPNIw54HbivRfC+niDSEUJ0XrQbTtL/erG5+Lq59P0rcaX5Edt5acqBihfPYyK28oyt/p/m5UHGTWdm0hoJiVwGz3HX616JfWi4zGhPy7UNa0hnPlScP1wf6UtXEe6fICsoZwm0gYPX4qMWVun3dnPc46106YYDmNmH1q1bI0fNc2zCdrSFIshQD7UPvkKxMF9DRBpGbgmobpVa3cn0ofs7owGnWpuprhicfFtPPPPFXNJEytNBMxaNMDd171WsTIdVuLaPC7zgk/hHrR67todP06SRJQU28Z6kngk0zIrkkDglWNv8ApmZWBkbHrXBg1WM2WJzThLir10eBLltj3FQMuTUu4N3pveubOSG+XXKnXpXKwMvCpkNQinq1PZMizYyBovh4BduB86JAxwRmQgcDNArMmDejfxll+R5/rVq7uCYdpOBjmvOyL3M9zBJPGjp8Sw2ixJLGyLKR5s23v7n0rT6Xqls8Z2yLjHBOK8p1vURcxtbQHbEq8n+I0Htpr21BSC8kER/CG4FH4W0Z6uKl1weq3vjm7trx7ez08yIpwsrOFDfIcmrgu7nVEiuTCYpFGQMYP/yvKoLhop90rMV9Seta7Q/EzQYQjcOepoZYXXAUNUr5N9Z3H2iICT7w4qXoKDafqMV04ePAY/eAolvz1zmkNNdlO5PlDmfAJFU7qfdGyZ61JNJgUNuHyTzQ0Y5AqC1hh1kyzyAq6kqBxz70P8VajFIyWto2UXlsHj5UQ1BPMgncf7ZA9uKyRQZAqrFHc9zI9Rk2Q8a+ziMc1MCTXEjA7VIFqg88StipA2aiIxTozWGk2a7XB0pVxxfPFNyc0/rTMYqkjZ2ViEDDqKEeINTMFrsjHxN1NE55VjhYv90DmsfqdwJ355wOlTyh77LcOR7NoOJkJONx56U9Zbm2ZibdtrDqRWh0W3QwmTaCTyARRVL+wjUicxqfcUueR3SRfhwwlH3SoxkP2udAqW7EDoTxRGKDUMENaOoAySPWtTa6np5YJbYZ2OFwKNQwgoS/LGlvLL8GvTYq4lZibHUJ4JUyzKQeRW9sNYM0KDcHOPlWP8Q2q2tz5iDAJyRimWN8I1BhYhepHcH1o6U1ZJueN0bt7xNuXyufah19qEESFi4PoPWh9vrG9XLYIUgtnuKBa7PFLMogJOeg70PgXYXqXRq1bz9LaTGN0ROPpWUI5rZ2MP8AkY4G/wBvafqKyc9tLECzYKBzHkEHkdQfQ1uH7B1l+1ijxintioQcV0scU8hs47VxGpjHmuZoWGiyHpVX3Uqw0M765moN9OU5quiGyLUYWnspUj+9jIHrWDlZonaNtwZT8Q759K311eR2cJkk5OPu5rH3LNrN6ZrC2Y+WpaXamdoHc0DKMdhnwxIJUaPIGOlWtV8OSXTmWBgrngg9DWX0/Ujp12rlWxnDD2raWusxzxK8b7h6jmpZpxlaL8UoyjtYvDnh2W3uEknlXjPGK1ixxxjg1nI9V2nqfpUh1cY60h23bKo1FUij4ufy5SAByKyYuSH/AISOetP8Qawb67Yr9wcDPehUMFxcyAwxO7N1x2qqCqPJDllulwEX1KWMApy24Ee/z9ua0XhTTZp7hb+4UiNVHlq46mmaH4fRWE17tlfjC9Qv6mtpaxgAADApWTKqpFGHT87pFmBd2Aaznia20qw1dJppTDPfIzbmyY0ZQMkj0PH1rWQRjIrP/wCIkXladZ3yyrDJbXCkSbctg9h/fNBhdSHaiFwZlby6uNMuRb6rYNblsFHUkq4PdT0Iq8lsbiISWzBgfwng1uFtbLxL4OUXFwL3CMDclNuXXOSPTBrE6NHMbXfDBNJEreX5iRkgsBnGR3xzVUWm6POyY9qT/SjKjxttkUqfcYqPJFaN3+PyJ4mD4yVkXt9ary2di/WNoz6qcD8q3aLAwNKin7Jj/Bcrt/5DmuVm1nCCkmoLm7WIbYzlx6VXvLqR/hGVX0H9aov8I54zVFk8Y0SCz/a9xFbSzGNGf4yOpHcD3r0DT7S002xFrYwJFFjnA5c+rHua8zSTMuUYjYeOfxVvNA1Vb+02yH/MRYD+/vSMqfZdpnHp9mD1vTIX8RtaQpcxB3b97NyCxBb4faoIdGlsp93n5x2UdaN+OWSDUbe786YuCCkWPhGOuD6kdqa06TqHXGGGcUucnt4DxwW5ohhaQcZzVoI5FNgC7hmjFrDGy8jrUtlkY2CrawgkbLRJnP8ACKLwWscSbUQAHrgYpSwJHIGXp8qsoy7OnOKxybGxgkSW6AY2ir8TYqnbvuyFxxVhNxPvQMYgpbzKMZoR4+k3+GJ9nl5DKQZB93BzmiNvAzc5oV45tZU8PzPgFT2k4BpmPtC8vxZdGp3Vv4Fm/e2k1xny1FquEQHHGPXBz9azWn70tCkUtzCrEs8ccrKN2MZ49qvMXt/C0KNbW9rm7z5cDhhjAOTjuevyxVT/AJDjcOlWwXLPKyO1H+ESTSecBdzzy9ViklcscZ+77ValAIz1NVHHwAdR3qGW4miPwHenv1FMFF1VyM8UqB3HipEcLBavIoHJ6c0q2zDu4nrVW5O2NiOoFKlRAFGLjbiiekTyQanEI2278q3uKVKgn8RkPmi74uuJU08FHK7nCsB0ZT1FAtMZjCQSSB09qVKp38Cxf6sIRMdw5o1p7tuAzXKVTMqh2FnRTHzVZ1C5xSpUA8l0r45XDdhWo06CN/vLXKVajGGYYY05VBkVnf8AEcKfC12zKGIA60qVMh2hM+mZS/toLLSbO3tIhFGZ2dgGJ3NsXk5J+X0FRbjsH/jSpVcjy2OHMVUpWIVz6A12lWgsrWtjA0ILKfzpUqVcCf/Z", rating: 5, review: "Great user interface and instant confirmation of tickets. Highly recommended!" }
];

export const asset = {
  starIconFilled: "path_to_star_icon.svg",
  locationIcon: "path_to_location_icon.svg",
  defaultRoomImage: "https://via.placeholder.com/300x200?text=No+Image"
};
// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Urbanza Suites",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 399,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 299,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 249,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelDummyData,
        "roomType": "Single Bed",
        "pricePerNight": 199,
        "amenities": ["Free WiFi", "Room Service", "Pool Access"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    }
]



// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/