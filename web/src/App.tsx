import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModel';


export interface Game {
  _count: {
    Ad: number;
  }
  bannerUrl: string;
  id: string;
  title: string;
}

function App() {
  const [game, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">

      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className=" text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>


      <div className="grid grid-cols-6 gap-6 mt-16">
        {game.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.Ad}
            />
          )
        })}

      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>

  )
}



export default App

