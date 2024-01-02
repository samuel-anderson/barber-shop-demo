export const professionals = [
  {
    id: "george_mena",
    name: "George Mena",
    phoneNumber: "+19097306555",
    email: "george@me.com",
    role: "user",
    schedule: {
      sunday: [{ start: "8:00 AM", end: "8:00 PM" }],
      monday: [{ start: "8:00 AM", end: "8:00 PM" }],
      tuesday: [{ start: "8:00 AM", end: "8:00 PM" }],
      wednesday: [{ start: "8:00 AM", end: "8:00 PM" }],
      thursday: [{ start: "8:00 AM", end: "8:00 PM" }],
      friday: [{ start: "8:00 AM", end: "8:00 PM" }],
      saturday: [{ start: "8:00 AM", end: "8:00 PM" }],
    },
    socialMedia: [
      {
        id: "instagram",
        username: "george_the_barber",
      },
    ],
  },
  {
    id: "kari_anderson",
    name: "Kari Anderson",
    phoneNumber: "+18583543893",
    email: "kari@me.com",
    role: "user",
    schedule: {
      tuesday: [
        { start: "7:00 AM", end: "9:00 AM" },
        { start: "4:00 PM", end: "8:00 PM" },
      ],
      wednesday: [
        { start: "7:00 AM", end: "9:00 AM" },
        { start: "4:00 PM", end: "8:00 PM" },
      ],
      thursday: [
        { start: "7:00 AM", end: "9:00 AM" },
        { start: "4:00 PM", end: "8:00 PM" },
      ],
    },
  },
  {
    id: "samuel_anderson",
    name: "Samuel Anderson",
    phoneNumber: "+17602774923",
    email: "sam@sam.com",
    role: "admin",
    socialMedia: [
      {
        id: "instagram",
        username: "pana_papito",
      },
    ],
    schedule: {
      sunday: null,
      monday: null,
      tuesday: [
        { start: "7:00 AM", end: "9:00 AM" },
        { start: "4:00 PM", end: "8:00 PM" },
      ],
      wednesday: [{ start: "4:00 PM", end: "8:00 PM" }],
      thursday: null,
      friday: [
        { start: "12:00 PM", end: "3:00 PM" },
        { start: "6:00 PM", end: "7:00 PM" },
      ],
      saturday: null,
    },
    services: [
      {
        id: "haircut",
        duration: 45,
      },
      {
        id: "lineup_neck",
        duration: 30,
      },
      {
        id: "facial",
        duration: 45,
      },
      {
        id: "eyebrows",
        duration: 30,
      },
    ],
  },
];
