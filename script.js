let cities = [];

let users = [];

let specializations = [];

Promise.all([
  fetch("/cities.json"),
  fetch("/person.json"),
  fetch("/specializations.json"),
])
  .then(async ([citiesResponse, personResponse, specializationsResponse]) => {
    const citiesJson = await citiesResponse.json();
    const personJson = await personResponse.json();
    const specializationsJson = await specializationsResponse.json();
    return [citiesJson, personJson, specializationsJson];
  })
  .then((response) => {
    cities = response[0];
    users = response[1];
    specializations = response[2];

    // Решения:
    // console.log(getInfo.call(users[7]))
    // console.log(figmaDesigners())
    // console.log(reactDeveloper())
    // console.log(checkAge())
    // console.log(sortBackDeveloper());
    // console.log(hightLevelDesigner())
    console.log(findTheBestTeam());
  });

function getInfo() {
  const city = cities.find(
    (element) => element.id === this.personal.locationId
  );
  return `${this.personal.firstName} ${this.personal.lastName}, ${city.name}`;
}


const figmaDesigners = () => users.filter((user) =>
  user.skills.some((skill)=> skill.name === "Figma")
);


const reactDeveloper = () => users.find((user) =>
  user.skills.some((skill) => skill.name === "React")
);


const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();
const checkAge = () => users.every((user) => {
  const [day, month, year] = user.personal.birthday.split(".");
  if (currentYear - year > 18) {
    return true;
  } else if (currentYear - year === 18 && currentMonth - month > 2) {
    return true;
  } else if (
    currentYear - year === 18 &&
    currentMonth - month === 0 &&
    currentDay - day >= 0
  ) {
    return true;
  } else {
    return false;
  }
});


const sortBackDeveloper = () => users
  .filter((user) => {
    const userCity = cities.find(
      (city) => user.personal.locationId === city.id
    );
    const userSpecialization = specializations.find(
      (specializations) => user.personal.specializationId === specializations.id
    );
    if (
      userCity.name === "Москва" &&
      userSpecialization.name === "backend" &&
      user.request[1].value === "Полная"
    ) {
      return true;
    } else {
      return false;
    }
  })
  .sort((a, b) => a.request[0].value - b.request[0].value);


const hightLevelDesigner = () => users.filter((user) => {
  const skills = user.skills;
  for (let i = 0; i < skills.length; i++) {
    const currentSkills = skills.map((el) => el.name);
    if (
      ["Figma", "Photoshop"].every(
        (el, index) => currentSkills.includes(el) && skills[index].level >= 6
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
});


function findTheBestTeam() {
  const theBestDesigner = users
    .filter((designerUser) => {
      if (designerUser.skills.some((skill) => skill.name === "Figma")) {
        return true;
      } else {
        return false;
      }
    })
    .sort(
      (a, b) =>
        b.skills.find((skill) => skill.name === "Figma").level -
        a.skills.find((skill) => skill.name === "Figma").level
    )[0];

  const theBestFront = users
    .filter((frontUser) => {
      if (frontUser.skills.some((skill) => skill.name === "Angular")) {
        return true;
      } else {
        return false;
      }
    })
    .sort(
      (a, b) =>
        b.skills.find((skill) => skill.name === "Angular").level -
        a.skills.find((skill) => skill.name === "Angular").level
    )[0];

  const theBestBack = users
    .filter((backUser) => {
      if (backUser.skills.some((skill) => skill.name === "Go")) {
        return true;
      } else {
        return false;
      }
    })
    .sort(
      (a, b) =>
        b.skills.find((skill) => skill.name === "Go").level -
        a.skills.find((skill) => skill.name === "Go").level
    )[0];
  return [theBestDesigner, theBestFront, theBestBack];
}


