const upperCaseWord= (str) => {
  const firstLetter = str.charAt(0).toUpperCase()
  const others = str.slice(1)
  return firstLetter + others
}

export {upperCaseWord}
