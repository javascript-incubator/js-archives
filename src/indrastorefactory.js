const IndraStoreFactory = (initialStore = {}) => {
  let IndraStore = initialStore
  const listeners = []

  const setIndraStore = arg => {
    IndraStore = { ...initialStore, ...arg }
    listeners.forEach(l => l())
  }

  const getIndraStore = () => IndraStore

  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners.filter(l => l !== listener)
    }
  }

  return { getIndraStore, setIndraStore, subscribe }
}

export default IndraStoreFactory
