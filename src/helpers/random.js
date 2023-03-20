import _ from 'lodash'

/**
 * Note:
 * - If max <= start, max is start + 1
 * - step must be an int
 * @param {number} max
 * @param {number} start
 * @param {number} step
 * @returns {*}
 */
const getRandomIntFromMax = (max, start = 1, step = 1) => {
  if (max <= start) {
    max = start + 1
  }

  // Force int
  step = Math.ceil(step)

  return _.sample(_.range(start, max, step))
}

/**
 * @param {Function}  factory
 * @param {number}    max
 * @param {number}    start
 * @returns {*}
 */
const getRandomItems = (factory, max = 1, start = 1) => {
  const randomAmount = getRandomIntFromMax(max, start)

  return _.sampleSize(factory(randomAmount), randomAmount)
}

/**
 * @returns {string}
 */
const getRandomId = (length = 9) => {
  return Math.random()
    .toString(36)
    .substr(2, length)
}

export { getRandomId, getRandomIntFromMax, getRandomItems }
