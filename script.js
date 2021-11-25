const formSectionElement = document.getElementById("form-section")

const urlParams = new URLSearchParams(window.location.search);
const friendParam = urlParams.get('f')

if (friendParam) {
  const secretSectionElement = document.getElementById("secret-section")
  const currentPersonElement = document.getElementById("current-person")
  const revealButtonElement = document.getElementById("reveal-button")
  const secretFriendElement = document.getElementById("secret-friend")

  formSectionElement.classList.add('d-none')
  secretSectionElement.classList.remove('d-none')

  const decodedFriendParam = window.atob(friendParam)
  const [current, friend] = decodedFriendParam.split(':')

  currentPersonElement.innerText = current
  revealButtonElement.addEventListener('click', () => {
    secretFriendElement.innerText = friend
  })
} else {
  let friends = []

  const getRandomFriendAndRemove = (exceptFriend) => {
    const possibleFriends = friends.filter(friend => friend !== exceptFriend)
    const randomNumber = Math.floor(Math.random() * possibleFriends.length)

    const randomFriend = possibleFriends[randomNumber]
    const randomFriendIndex = friends.indexOf(randomFriend)
    
    friends.splice(randomFriendIndex, 1)
    return randomFriend
  }

  const friendsElement = document.getElementById("participantes")
  const resultElement = document.getElementById("resultado")
  const sortFormElement = document.getElementById("sort-form")
  const resultSectionElement = document.getElementById("result-section")

  const sortFriends = () => {
    friends = friendsElement.value.split(',')
    const possibleFriends = [...friends]
    
    const chosenFriends = possibleFriends.map(getRandomFriendAndRemove)

    return {possibleFriends, chosenFriends}
  }

  sortFormElement.addEventListener('submit', (event) => {
    event.preventDefault()

    formSectionElement.classList.add('d-none')
    resultSectionElement.classList.remove('d-none')
    
    let lastChosenFriend = null
    let wPossibleFriends = null
    let wChosenFriends = null
    
    while(!lastChosenFriend) {
      const { possibleFriends, chosenFriends } = sortFriends()
      wPossibleFriends = possibleFriends
      wChosenFriends = chosenFriends
      lastChosenFriend = chosenFriends[chosenFriends.length - 1]
    }

    wPossibleFriends.forEach((friend, index) => {
      resultElement.innerHTML += `<tr><td>${friend}</td><td>${wChosenFriends[index]}</td></tr>`    
    })
  })
}