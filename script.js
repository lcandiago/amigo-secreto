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
  let possibleFriends = []

  const getRandomFriendAndRemove = (exceptFriend) => {
    const exceptFriendIndex = friends.indexOf(exceptFriend)
    const currentPossibleFriends = [...friends].splice(exceptFriendIndex, 1)
    const randomNumber = Math.floor(Math.random() * currentPossibleFriends.length)

    const randomFriend = currentPossibleFriends[randomNumber]
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
    possibleFriends = [...friends]

    possibleFriends.forEach(friend => {
      const randomFriend = getRandomFriendAndRemove(friend)

      resultElement.innerHTML += `<tr><td>${friend}</td><td>https://secretoamigo.com.br?f=${window.btoa(friend + ':' + randomFriend)}</td></tr>`
    })
  }

  sortFormElement.addEventListener('submit', (event) => {
    event.preventDefault()

    formSectionElement.classList.add('d-none')
    resultSectionElement.classList.remove('d-none')

    sortFriends()
  })
}