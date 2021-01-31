
// text limit function
const limitTitle = (text, value = 20) => {
  const result = []
  if (text.length > value) {
    text.split('').reduce((acc, cur) => {
      if (acc + cur.length <= value) {
        result.push(cur)
      }
      return acc += cur.length
    }, 0)

    return (result.join('') + ' ...')
  }
  return (text + ' ...')
}

export {limitTitle}