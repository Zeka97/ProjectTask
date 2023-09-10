const userPhoneNumberData = [
  {
    email: "marina@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0105",
      },
    ],
  },
  {
    email: "kip@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0168",
      },
    ],
  },
  {
    email: "lorie@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0162",
      },
    ],
  },
  {
    email: "jasmin@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0168",
      },
    ],
  },
  {
    email: "emma@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0187",
      },
    ],
  },
  {
    email: "elvia@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0164",
      },
    ],
  },
  {
    email: "liliana@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0161",
      },
    ],
  },
  {
    email: "florencio@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0127",
      },
    ],
  },
  {
    email: "delores@wiline.com",
    phoneNumbers: [
      {
        type: "primary",
        value: "202-555-0143",
      },
    ],
  },
];

const userEmailsData = [
  {
    email: "delores@wiline.com",
    firstName: "Delores",
    lastName: "Mind",
  },
  {
    email: "lorie@wiline.com",
    firstName: "Lorie",
    lastName: "Enak",
  },
  {
    email: "emma@wiline.com",
    firstName: "Emma",
    lastName: "Fisk",
  },
];

// Unique values by email //
// const CombineArrays = (array1, array2) => {
//   const map = [];
//   userPhoneNumberData.map(({ email, ...item }) => {
//     if (map[email]) {
//       map[email] = { ...map[email], ...item };
//     } else map[email] = item;
//   });
//   userEmailsData.map(({ email, ...item }) => {
//     if (map[email]) {
//       map[email] = { ...map[email], ...item };
//     } else map[email] = item;
//   });

//   const result = [];
//   for (const email in map) {
//     result.push({ email, ...map[email] });
//   }

//   console.log(result);
// };

// CombineArrays(userPhoneNumberData, userEmailsData);

const CombineArrays2 = (array1, array2) => {
  const map = [];
  const phoneNumber = [];
  userPhoneNumberData.map(({ email, ...item }) => {
    let numberExists = false;
    item.phoneNumbers.forEach((number) => {
      if (phoneNumber[number.value]) {
        numberExists = true;
      } else phoneNumber[number.value] = true;
    });
    if (!map[email] && !numberExists) map[email] = item;
  });
  userEmailsData.map(({ email, ...item }) => {
    if (map[email]) {
      map[email] = { ...map[email], ...item };
    } else map[email] = item;
  });

  const result = [];
  for (const email in map) {
    result.push({ email, ...map[email] });
  }

  console.log(result);
};

CombineArrays2(userPhoneNumberData, userEmailsData);
