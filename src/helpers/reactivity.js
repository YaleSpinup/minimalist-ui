const stripReactivity = (value) => {
  return JSON.parse(JSON.stringify(value))
}

export { stripReactivity }
