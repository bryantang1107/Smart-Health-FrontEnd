import slide1 from "../../images/slide-1.jpg";
import slide2 from "../../images/slide-2.jpg";
import slide3 from "../../images/slide-3.jpg";
const reviews = [
  {
    id: 1,
    name: "susan smith",

    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text: "First time using Smart Health service. Face some problems and served by Janice this round and the appointment, feedback was done smoothly. Satisfied with the services provided. Professional doctor. Will use this service again. Thank you Smart Health team. Keep up the good service!",
  },
  {
    id: 2,
    name: "anna johnson",

    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "Very prompt and efficient service. Consulted doctor on phone almost immediately upon placing of orders.This is the third time that I am using this service. Customer service on the ball, and doctor professional. Recommend this, and yes medications are also reasonably priced",
  },
  {
    id: 3,
    name: "peter jones",

    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "Would like to thank Jason for helping me to connect with a Doctor about my mother's case. Thank you Dr YJ Liow for his advices about my mother's case. I greatly recommend this website which is a blessing especially for those who are difficult to access medical consultation in person.",
  },
  {
    id: 4,
    name: "bill anderson",

    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Great service by Smart Health who cleared up all my queries. Thanks to Jason for going out of his way to call me to clarify my concerns. Good job!",
  },
  {
    id: 5,
    name: "Marry Jane",

    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    text: "I have a very pleasant experience using Smart Health service for many times. The doctors are very professional and the support admin especially Ivan is also helpful and resourceful. Will always be my go-to digital clinic.",
  },
  {
    id: 6,
    name: "Tobey Maguire",

    image:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    text: "Very quick and efficient. Safe as I didnt need to go out to a clinic. Smart Health was efficient to ensure I got my medication asap",
  },
  {
    id: 7,
    name: "Wong Hock Meng",

    image:
      "https://images.unsplash.com/photo-1613289507732-039393fca68c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbmVzZSUyMHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    text: "Congratulations for your excellent service and well done DoctorOnCall. The doctor’s brief explanation is easily understood. It didn't take too long to contact me through phone call. 👍🏼👍🏼👍🏼",
  },
  {
    id: 8,
    name: "Ashley Chong",

    image:
      "https://images.unsplash.com/photo-1439778615639-28529f7628bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "Service is excellent and the customer service team is awesome and responsive. Ivan attended to me and he is friendly, detailed and knowledgeable. Thank you",
  },
  {
    id: 9,
    name: "Jason Gan",

    image:
      "https://images.unsplash.com/photo-1563521779750-d0bb67aa1d23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "I contacted doctoroncall about sinovac booster. The customer service was excellent. The staff called Ivan informed me as soon as they launched it. I was very impressed by the customer service that Ivan provided. Top notch! Thank you so much!",
  },
  {
    id: 10,
    name: "Mohammad Yusof",

    image:
      "https://images.unsplash.com/photo-1590323032067-5bd949a9b4b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "My thanks to all those who had assisted me. I don' t know all their names except for Sidra and Ivan...they were kind, understanding and patient with all my inquiries and requests. Continue the good work!",
  },
];

export const heroData = [
  {
    id: 1,
    image: slide1,
    header: "Welcome To Smart Health",
    description: "Your Life. Our Passion. Your Health Is Our Top Priority.",
    route: "/home/about",
    button: "About Us",
  },
  {
    id: 2,
    image: slide2,
    header: "Book An Appointment With Us Now",
    description:
      "We will connect you to the right Specialist. Consult Experienced Doctors & Let our medical concierge team assist you.",
    route: "/find-doctor",
    button: "Book Now",
  },
  {
    id: 3,
    image: slide3,
    header: "Free Doctor's Advice",
    description: "Get Your Medical Questions Answered Online.",
    route: "/heart-article",
    button: "View Health Forum",
  },
];

export default reviews;
