let friends = []
let possibleFriends = []

const getRandomFriendAndRemove = (exceptFriend) => {
  const randomNumber = Math.floor(Math.random() * friends.length)
  const randomFriend = friends[randomNumber]
  if (randomFriend === exceptFriend) {
    return getRandomFriendAndRemove(exceptFriend)
  }
  friends.splice(randomNumber, 1)
  return randomFriend
}

const friendsElement = document.getElementById("participantes")
const resultElement = document.getElementById("resultado")
const sortFormElement = document.getElementById("sort-form")

const sortFriends = () => {
  friends = friendsElement.value.split(',')
  possibleFriends = [...friends]

  possibleFriends.forEach(friend => {
    console.log({friend, possibleFriends})
    const randomFriend = getRandomFriendAndRemove(friend)

    resultElement.innerHTML += `<tr><td>${friend}</td><td>https://secretoamigo.com.br?f=${window.btoa(friend + '.' + randomFriend)}</td></tr>`
  })
}

sortFormElement.addEventListener('submit', (event) => {
  event.preventDefault()
  sortFriends()
})