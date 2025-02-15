import Sidebar from './components/Sidebar'
import Main from './components/Main'

const App = () => {
  return (
    <div className='flex h-full w-full'>
      <Sidebar />
      <main className='flex-grow bg-[#313341]'>
        <Main />
      </main>

    </div>
  )
}

export default App