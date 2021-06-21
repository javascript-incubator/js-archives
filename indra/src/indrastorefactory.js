const IndraStoreFactory = (initialStore = {}) => {
  let IndraStore = initialStore
  let listeners = []

  const setIndraStore = arg => {
    IndraStore = { ...IndraStore, ...arg }
    listeners.forEach(l => l())
  }

  const getIndraStore = () => IndraStore

  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  return { getIndraStore, setIndraStore, subscribe }
}

export default IndraStoreFactory
