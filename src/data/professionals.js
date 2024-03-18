export const professionals = {
  george_mena: {
    id: "george_mena",
    firstName: "George",
    lastName: "Mena",
    displayName: "George Mena",
    phoneNumber: "+19097306555",
    email: "george@me.com",
    role: "user",
    schedule: {
      sunday: { start: "8:00 AM", end: "8:00 PM" },
      monday: { start: "8:00 AM", end: "8:00 PM" },
      tuesday: { start: "8:00 AM", end: "8:00 PM" },
      wednesday: { start: "8:00 AM", end: "8:00 PM" },
      thursday: { start: "8:00 AM", end: "8:00 PM" },
      friday: { start: "8:00 AM", end: "8:00 PM" },
      saturday: { start: "8:00 AM", end: "8:00 PM" },
    },
    socialMedia: {
      instagram: {
        label: "Instagram",
        handle: "george_the_barber",
      },
    },
  },
  kari_anderson: {
    id: "kari_anderson",
    firstName: "Kari",
    lastName: "Anderson",
    displayName: "Kari Anderson",
    phoneNumber: "+18583543893",
    email: "kari@me.com",
    role: "user",
    schedule: {
      tuesday: { start: "7:00 AM", end: "9:00 AM" },
      wednesday: { start: "4:00 PM", end: "8:00 PM" },
      thursday: { start: "2:00 PM", end: "5:00 PM" },
    },
  },
  samuel_anderson: {
    id: "samuel_anderson",
    firstName: "Samuel",
    lastName: "Anderson",
    displayName: "Samuel Anderson",
    phoneNumber: "+17602774923",
    email: "sam@me.com",
    role: "admin",
    socialMedia: {
      instagram: {
        label: "Instagram",
        handle: "pana_papito",
      },
    },
    schedule: {
      monday: null,
      tuesday: { start: "7:00 AM", end: "9:00 AM" },
      wednesday: { start: "4:00 PM", end: "8:00 PM" },
      thursday: { start: "2:00 PM", end: "5:00 PM" },
      friday: null,
    },
    services: {
      haircut: {
        id: "haircut",
        duration: 45,
      },
      lineup_neck: {
        id: "lineup_neck",
        duration: 30,
      },
      facial: {
        id: "facial",
        duration: 45,
      },
      eyebrows: {
        id: "eyebrows",
        duration: 30,
      },
    },
  },
};
