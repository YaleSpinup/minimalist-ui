import store from '../store/app'

/**
 * Create an HTMLElementObject from a passed in string
 *
 * @param {string|*} str
 * @param {boolean} first
 * @param {string} base
 *
 * @returns {HTMLObjectElement}
 */
const c = (str, first = true, base = 'div') => {
  if (typeof str !== 'string') {
    return str
  }

  const div = document.createElement(base)
  div.innerHTML = str.trim()

  return first ? div.childNodes[0] : div.childNodes
}

/**
 * Append n number of items as children onto the string|HTMLElementObject passed in arg slot 1
 *
 * @param {string|HTMLObjectElement} node
 * @param {*} str
 */
const ac = function (node, ...str) {
  if (arguments.length <= 1) {
    return
  }

  if (typeof node === 'string') {
    node = c(node)
  }

  const args = Array.from(arguments)
  args.shift()
  args.forEach(arg => node.appendChild(c(arg)))

  return node
}

/**
 * Return the current bootstrap environment
 *
 * @returns {string}
 */
const getBootstrapEnvironment = () => {
  const envs = ['xs', 'sm', 'md', 'lg', 'xl']

  const el = document.createElement('div')
  document.body.appendChild(el)

  let curEnv = envs.shift()

  for (const env of envs.reverse()) {
    el.classList.add(`d-${env}-none`)

    if (window.getComputedStyle(el).display === 'none') {
      curEnv = env
      break
    }
  }

  document.body.removeChild(el)
  return curEnv
}

/**
 * Returns whether or not the browser is in mobile mode or not
 *
 * @returns {boolean}
 */
const isMobile = () => {
  const bsEnv = getBootstrapEnvironment()
  const mobileEnv = ['xs', 'sm']

  return mobileEnv.indexOf(bsEnv) !== -1
}

export {
  c,
  ac,
  getBootstrapEnvironment,
  isMobile
}
